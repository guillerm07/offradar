import postgres from "postgres";
import https from "https";
import fs from "fs";
import path from "path";

const DB_URL = "postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar";
const GEMINI_KEY = "AIzaSyDeJCd9ojfJ5pPMcDfxPXewKvbAsYRbEIk";
const IMG_DIR = "/Users/guillermodelpinohernandez/Documents/offroad/apps/web/public/images/projects";

const sql = postgres(DB_URL);

async function generateImage(prompt, filename) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_KEY}`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: `Generate an image: ${prompt}` }] }],
    generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
  });
  return new Promise((resolve) => {
    const req = https.request(url, { method: "POST", headers: { "Content-Type": "application/json" } }, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const d = JSON.parse(data);
          if (d.candidates) {
            for (const p of d.candidates[0].content.parts) {
              if (p.inlineData) {
                const buf = Buffer.from(p.inlineData.data, "base64");
                const ext = p.inlineData.mimeType.includes("png") ? "png" : "jpg";
                const fpath = path.join(IMG_DIR, `${filename}.${ext}`);
                fs.writeFileSync(fpath, buf);
                resolve(`/images/projects/${filename}.${ext}`);
                return;
              }
            }
          }
          resolve(null);
        } catch(e) { resolve(null); }
      });
    });
    req.on("error", () => resolve(null));
    req.write(body);
    req.end();
  });
}

async function main() {
  const rows = await sql`
    SELECT id, seo_slug, name
    FROM projects
    WHERE featured_image_url IS NULL AND status = 'published'
    ORDER BY interest_score DESC
  `;

  console.log(`Generando imágenes para ${rows.length} proyectos...\n`);

  for (let i = 0; i < rows.length; i++) {
    const p = rows[i];
    console.log(`[${i+1}/${rows.length}] ${p.name}...`);

    const prompt = `Modern tech illustration representing ${p.name}, minimalist design, dark purple background with glowing violet accents, professional and clean, 16:9`;
    const imgUrl = await generateImage(prompt, p.seo_slug);

    if (imgUrl) {
      await sql`UPDATE projects SET featured_image_url = ${imgUrl} WHERE id = ${p.id}`;
      console.log(`  ✓ ${imgUrl}`);
    } else {
      console.log(`  ⚠ No se pudo generar imagen`);
    }

    if (i < rows.length - 1) await new Promise(r => setTimeout(r, 3000));
  }

  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE featured_image_url IS NOT NULL AND status = 'published'`;
  console.log(`\n✅ Proyectos con imagen: ${count[0].n}`);
  await sql.end();
}

main().catch(e => { console.error(e); process.exit(1); });

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

const projects = [
  {
    source: "github", source_id: "Aider-AI/aider", url: "https://github.com/Aider-AI/aider",
    name: "Aider", stars: 42709, language: "Python", author: "Aider-AI", category_id: 1,
    difficulty: "facil", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "código", "pair-programming", "cli", "desarrollo"],
    seo_slug: "aider-pair-programming-ia-terminal",
    seo_title: "Aider: Pair programming con IA directamente en tu terminal",
    seo_description: "Aider es un asistente de programación con IA que edita tu código directamente. Compatible con GPT-4, Claude y modelos locales. 42k estrellas.",
    summary_es: `Aider es una herramienta de pair programming con IA que funciona directamente en tu terminal. Le hablas sobre cambios que quieres en tu código, y Aider los aplica directamente en tus archivos — no genera snippets que tienes que copiar y pegar, sino que edita tu código real, hace commits con mensajes descriptivos, y mantiene contexto de tu repositorio.

## La diferencia con chatear con ChatGPT sobre código

Con ChatGPT copias un trozo de código, lo pegas en el chat, esperas la respuesta, copias la sugerencia, la pegas en tu editor, y ruegas para que funcione en contexto. Con Aider:

\`\`\`bash
$ aider
> Añade validación de email al formulario de registro
\`\`\`

Aider lee los archivos relevantes de tu repo, aplica los cambios directamente, y hace un git commit. Si algo falla, le dices "no funciona, da este error" y corrige.

## Funcionalidades

- **Edición directa**: modifica tus archivos en disco, no genera snippets
- **Git-aware**: hace commits automáticos con mensajes descriptivos
- **Contexto del repo**: entiende la estructura de tu proyecto completo
- **Multi-archivo**: puede modificar varios archivos en una sola petición
- **Multi-modelo**: funciona con GPT-4, Claude, Gemini, DeepSeek, modelos locales vía Ollama
- **Chat persistente**: mantiene contexto a lo largo de la sesión
- **Modo arquitecto**: describe lo que quieres a alto nivel y Aider planifica los cambios
- **Linting automático**: ejecuta tu linter después de cada cambio y corrige errores

## Cuándo es más útil

- **Refactoring**: "renombra esta función y actualiza todas las referencias en el proyecto"
- **Tests**: "escribe tests unitarios para el módulo de autenticación cubriendo los edge cases"
- **Bugs**: "este endpoint devuelve 500 cuando el usuario no tiene avatar, aquí está el error log"
- **Features nuevas**: "añade un endpoint GET /api/users con paginación, filtros por rol, y ordenación"
- **Documentación**: "añade JSDoc a todas las funciones exportadas de src/lib/"
- **Migraciones**: "migra estos componentes de clase a componentes funcionales con hooks"

## Aider vs Claude Code vs Cursor

| | Aider | Claude Code | Cursor |
|---|---|---|---|
| Interfaz | Terminal | Terminal | IDE completo |
| Edición directa | Sí | Sí | Sí |
| Git integration | Commits automáticos | Commits automáticos | Manual |
| Multi-modelo | Sí (cualquiera) | Solo Claude | Múltiples |
| Precio | Gratis + coste del LLM | Suscripción Claude | 20$/mes |
| Modo offline | Con modelos locales | No | No |

## Instalación

\`\`\`bash
pip install aider-chat
cd tu-repo
aider --model claude-sonnet-4-20250514
\`\`\`

En 30 segundos estás programando con IA en tu terminal.`,
    image_prompt: "AI pair programming in terminal, split view with chat and code being edited in real-time, Git commit happening automatically, purple AI assistant glow, dark developer workspace",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "usebruno/bruno", url: "https://github.com/usebruno/bruno",
    name: "Bruno", stars: 42505, language: "JavaScript", author: "usebruno", category_id: 2,
    difficulty: "facil", interest_score: 87, is_oss_alternative: true, alternative_to: "Postman",
    tags: ["api", "testing", "devtools", "open-source", "git"],
    seo_slug: "bruno-cliente-api-git-friendly",
    seo_title: "Bruno: Cliente de API que guarda tus colecciones en Git, no en la nube",
    seo_description: "Bruno guarda colecciones de API como archivos de texto en tu filesystem. Versionable con Git. Alternativa a Postman sin cloud. 42k estrellas.",
    summary_es: `Bruno es un cliente de API open source con una filosofía que lo diferencia de todo lo demás: tus colecciones de API se guardan como **archivos de texto plano** en tu filesystem. No en la nube de Postman, no en un servidor de Insomnia — en TU disco duro, como archivos que puedes versionar con Git, revisar en pull requests, y compartir con tu equipo como código.

## Por qué importa dónde se guardan tus colecciones

Postman guarda tus colecciones en su nube. Un día Postman decide cambiar su API, subir precios, o (como pasó con Insomnia en 2023) los usuarios pierden datos en una migración forzosa. Con Bruno, tus colecciones son archivos \`.bru\` que están en tu repo — si Bruno desaparece mañana, tus colecciones siguen ahí.

## Formato de archivos .bru

\`\`\`
meta {
  name: Crear usuario
  type: http
  seq: 1
}

post {
  url: {{baseUrl}}/api/users
  body: json
}

body:json {
  {
    "name": "Guillermo",
    "email": "guillermo@ejemplo.com",
    "role": "admin"
  }
}

headers {
  Authorization: Bearer {{token}}
  Content-Type: application/json
}

assert {
  res.status: eq 201
  res.body.id: isNumber
}

script:post-response {
  bru.setVar("userId", res.body.id);
}
\`\`\`

Esto es un archivo de texto legible que cualquier desarrollador entiende, que va en Git, que se puede revisar en un PR, y que se puede diff-ear.

## Funcionalidades completas

- **REST y GraphQL**: soporte completo para ambos protocolos
- **Entornos como .env**: variables de entorno como archivos (no en la nube)
- **Tests y assertions**: valida respuestas con sintaxis declarativa
- **Scripts**: pre-request y post-response en JavaScript
- **Collection runner**: ejecuta todas las peticiones secuencialmente
- **Import**: desde Postman, Insomnia, OpenAPI, cURL
- **100% offline**: funciona sin internet, sin cuenta, sin servidores

## Bruno vs Postman vs Hoppscotch

| | Bruno | Postman | Hoppscotch |
|---|---|---|---|
| Almacenamiento | Filesystem (Git) | Cloud de Postman | Browser/Cloud |
| Offline | 100% | Parcial | Parcial |
| Git-friendly | Nativo | No | No |
| Peso | Ligero | 500MB+ | 0 (web) |
| Cuenta obligatoria | No | Sí | No |
| Open source | Sí | No | Sí |

**Bruno** para equipos que quieren colecciones versionadas. **Hoppscotch** para rapidez sin instalar nada. **Postman** solo si necesitas funciones enterprise específicas.

## Instalación

\`\`\`bash
brew install bruno
# o descarga desde usebruno.com
\`\`\``,
    image_prompt: "API client showing .bru file format in text editor alongside request/response view, Git version control integration, file tree with collection, purple developer elements, dark professional interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "sharkdp/fd", url: "https://github.com/sharkdp/fd",
    name: "fd", stars: 42287, language: "Rust", author: "sharkdp", category_id: 2,
    difficulty: "facil", interest_score: 84, is_oss_alternative: true, alternative_to: "find (Unix)",
    tags: ["cli", "búsqueda", "terminal", "rust", "archivos"],
    seo_slug: "fd-alternativa-find-rapida-intuitiva",
    seo_title: "fd: Alternativa moderna a 'find' — más rápida, más simple, más inteligente",
    seo_description: "fd es un reemplazo de find(1) escrito en Rust. Más rápido, sintaxis intuitiva, respeta .gitignore y con colores. 42k estrellas.",
    summary_es: `fd es un reemplazo moderno para el comando \`find\` de Unix — el comando que usas para buscar archivos por nombre. Si alguna vez has intentado usar \`find\` y te has rendido con su sintaxis arcaica (\`find . -name "*.js" -not -path "./node_modules/*" -mtime -7\`), fd es la solución.

## La diferencia de experiencia

**Con find:**
\`\`\`bash
find . -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*"
\`\`\`

**Con fd:**
\`\`\`bash
fd ".tsx$"
\`\`\`

Mismo resultado. fd ignora automáticamente node_modules, .git, .next y todo lo que esté en tu .gitignore. No necesitas excluir manualmente.

## Por qué es mejor que find

- **5-10x más rápido**: escrito en Rust, con búsqueda paralela
- **Sintaxis intuitiva**: \`fd patron\` en vez de \`find . -name "patron"\`
- **Respeta .gitignore**: ignora automáticamente lo que Git ignora
- **Colores**: los resultados se muestran con colores por tipo de archivo
- **Regex por defecto**: sin flags extra, busca con expresiones regulares
- **Unicode correcto**: busca archivos con acentos y caracteres especiales sin problemas

## Ejemplos útiles

\`\`\`bash
# Buscar archivos TypeScript
fd ".tsx$"

# Buscar por nombre exacto
fd -g "package.json"

# Buscar solo directorios
fd -t d "src"

# Buscar archivos modificados en las últimas 24h
fd --changed-within 1d

# Buscar y ejecutar un comando en cada resultado
fd ".test.ts$" -x npm test --

# Buscar archivos mayores de 10MB
fd --size +10m
\`\`\`

## Instalación

\`\`\`bash
# macOS
brew install fd

# Ubuntu
sudo apt install fd-find
# nota: en Ubuntu se instala como "fdfind"

# Cargo
cargo install fd-find
\`\`\``,
    image_prompt: "Terminal file search with colorful results organized by file type, fast parallel search visualization, .gitignore smart filtering, purple search elements, dark terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "Significant-Gravitas/AutoGPT", url: "https://github.com/Significant-Gravitas/AutoGPT",
    name: "AutoGPT", stars: 183062, language: "Python", author: "Significant-Gravitas", category_id: 1,
    difficulty: "medio", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "agentes", "autónomo", "automatización", "gpt"],
    seo_slug: "autogpt-agente-ia-autonomo",
    seo_title: "AutoGPT: El agente de IA autónomo que ejecuta tareas complejas por ti",
    seo_description: "AutoGPT es un agente de IA que descompone objetivos complejos en tareas, las ejecuta autónomamente, y se auto-corrige. 183k estrellas en GitHub.",
    summary_es: `AutoGPT fue el proyecto que popularizó el concepto de "agentes autónomos de IA" — sistemas que no solo responden preguntas, sino que persiguen objetivos de forma independiente. Le das un objetivo complejo ("investiga las tendencias del mercado de IA en España y genera un informe"), y AutoGPT lo descompone en subtareas, las ejecuta una por una, evalúa los resultados, y se auto-corrige si algo falla.

## La idea revolucionaria

Los chatbots tradicionales (ChatGPT, Claude) hacen una cosa: respondes una pregunta, dan una respuesta. AutoGPT hace algo fundamentalmente diferente:

1. **Recibe un objetivo** a alto nivel
2. **Planifica**: descompone el objetivo en subtareas concretas
3. **Ejecuta**: realiza cada subtarea (buscar en internet, escribir código, crear archivos, llamar APIs)
4. **Evalúa**: analiza si el resultado cumple con el objetivo
5. **Se auto-corrige**: si algo falla o el resultado no es satisfactorio, ajusta el plan
6. **Itera**: repite hasta completar el objetivo

## Qué puede hacer

- **Investigación**: busca información en internet, la sintetiza y genera informes
- **Programación**: crea proyectos de software de principio a fin
- **Análisis de mercado**: investiga competidores, tendencias y oportunidades
- **Creación de contenido**: escribe artículos, emails, documentación
- **Automatización de tareas**: cualquier tarea que puedas describir en lenguaje natural

## La realidad vs el hype

Seamos honestos: AutoGPT generó un hype enorme en 2023-2024, pero la realidad es más matizada:

**Funciona bien para:**
- Tareas de investigación que involucran buscar y sintetizar información
- Tareas repetitivas bien definidas
- Prototipos y exploraciones

**No funciona tan bien para:**
- Objetivos vagos o ambiguos
- Tareas que requieren juicio humano o creatividad profunda
- Proyectos de software complejos (tiende a entrar en bucles)
- Cualquier cosa que requiera interacción humana

## El ecosistema que ha creado

Aunque AutoGPT en sí mismo tiene limitaciones, el concepto que popularizó ha dado lugar a todo un ecosistema de agentes más especializados y maduros: CrewAI, MetaGPT, OpenHands, Claude Code... todos heredan la idea de "IA que actúa, no solo responde".

## Instalación

\`\`\`bash
git clone https://github.com/Significant-Gravitas/AutoGPT.git
cd AutoGPT
docker compose up -d
\`\`\`

Necesitas una API key de OpenAI (o compatible). La interfaz web se abre en localhost:3000 donde defines tus objetivos y ves cómo el agente los persigue.`,
    image_prompt: "Autonomous AI agent decomposing a complex goal into subtasks, task tree with checkmarks, web search and code execution happening autonomously, purple AI brain, dark futuristic background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "Raphire/Win11Debloat", url: "https://github.com/Raphire/Win11Debloat",
    name: "Win11Debloat", stars: 43126, language: "PowerShell", author: "Raphire", category_id: 8,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["windows", "privacidad", "rendimiento", "limpieza", "powershell"],
    seo_slug: "win11debloat-limpiar-windows-11",
    seo_title: "Win11Debloat: Limpia Windows 11 de bloatware, telemetría y apps inútiles",
    seo_description: "Win11Debloat elimina apps preinstaladas, desactiva telemetría, y optimiza Windows 11 con un solo script. 43k estrellas en GitHub.",
    summary_es: `Win11Debloat es un script de PowerShell que limpia Windows 11 (y 10) de todo el software preinstalado que no pediste, la telemetría que envía datos a Microsoft constantemente, y las configuraciones que ralentizan tu PC. Un solo comando y tu Windows queda limpio, rápido y respetuoso con tu privacidad.

## Qué elimina

### Apps preinstaladas que no pediste
- Xbox Game Bar, Cortana, Microsoft News, Solitaire Collection
- Clipchamp, Microsoft To Do, Movies & TV, People
- Spotify (la versión preinstalada que no puedes desinstalar normalmente)
- OneDrive (opcional, pero desinstalable con el script)
- Microsoft Edge-related bloatware

### Telemetría y tracking
- Desactiva el ID de publicidad de Windows
- Desactiva el envío de datos de diagnóstico
- Desactiva sugerencias de contenido y tips de Windows
- Desactiva Copilot integrado (si no lo quieres)
- Desactiva la búsqueda web desde el menú inicio

### Optimizaciones de rendimiento
- Desactiva widgets del escritorio (consumen recursos)
- Desactiva efectos visuales innecesarios
- Limpia tareas programadas de telemetría
- Desactiva servicios innecesarios que corren en segundo plano

## Cómo usarlo

\`\`\`powershell
# Abrir PowerShell como administrador y ejecutar:
irm "https://win11debloat.raphi.re/" | iex
\`\`\`

Se abre un menú interactivo donde eliges qué quieres hacer: puedes seleccionar categorías individuales (solo eliminar apps, solo desactivar telemetría) o aplicar todas las optimizaciones de golpe.

## ¿Es seguro?

El script es open source — puedes leer cada línea de código antes de ejecutarlo. No modifica archivos críticos del sistema, no desactiva Windows Update, y todo es reversible. Tiene 43.000 estrellas en GitHub y una comunidad activa que revisa cada cambio. Es probablemente la forma más segura de limpiar Windows porque sabes exactamente qué hace.

## Cuándo usarlo

- **PC nuevo**: ejecutar justo después de instalar Windows, antes de instalar tus apps
- **PC lento**: si tu Windows se ha ido llenando de basura con el tiempo
- **Privacidad**: si no quieres que Microsoft rastree todo lo que haces
- **PCs de empresa**: limpiar las máquinas de la oficina de bloatware

## Lo que NO hace

- No desactiva Windows Update (eso sería peligroso)
- No elimina Windows Defender (lo necesitas)
- No modifica el kernel ni drivers
- No hace root ni jailbreak del sistema`,
    image_prompt: "Windows 11 being cleaned of bloatware, apps being removed from a desktop, privacy shield icon, performance speedometer increasing, purple optimization elements, dark clean Windows interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "iina/iina", url: "https://github.com/iina/iina",
    name: "IINA", stars: 44276, language: "Swift", author: "iina", category_id: 8,
    difficulty: "facil", interest_score: 84, is_oss_alternative: true, alternative_to: "VLC",
    tags: ["vídeo", "reproductor", "macos", "multimedia", "open-source"],
    seo_slug: "iina-reproductor-video-macos-moderno",
    seo_title: "IINA: El reproductor de vídeo para macOS que VLC debería haber sido",
    seo_description: "IINA es un reproductor de vídeo nativo para macOS con interfaz moderna, Picture in Picture y soporte para todos los formatos. Open source.",
    summary_es: `IINA es un reproductor de vídeo diseñado específicamente para macOS que combina la compatibilidad de formatos de VLC con una interfaz que realmente parece una app de Mac moderna. Si usas macOS y estás harto de la interfaz anticuada de VLC (que parece una app de Linux de 2005), IINA es tu respuesta.

## Por qué es mejor que VLC en Mac

VLC es universal y potente, pero en macOS se siente fuera de lugar: la interfaz no sigue las convenciones de macOS, no soporta gestos del trackpad nativamente, no tiene Picture in Picture nativo, y el Dark Mode es inconsistente. IINA resuelve todo esto porque está hecho en Swift, específicamente para macOS.

## Funcionalidades

- **Todos los formatos**: reproduce cualquier formato de vídeo y audio (usa mpv/FFmpeg por debajo)
- **Interfaz nativa macOS**: Dark Mode, Force Touch, Picture in Picture, Touch Bar
- **Subtítulos online**: busca y descarga subtítulos automáticamente de OpenSubtitles
- **Music mode**: modo mini para reproducir audio sin ventana grande
- **Streaming**: reproduce URLs directas (YouTube con yt-dlp integrado)
- **Filtros de vídeo**: ajuste de color, deinterlacing, corrección de aspect ratio
- **Keyboard shortcuts**: atajos personalizables, compatible con atajos de mpv
- **Browser extension**: extensión para abrir vídeos del navegador directamente en IINA

## Instalación

\`\`\`bash
brew install --cask iina
\`\`\`

O descarga desde iina.io. Solo para macOS.`,
    image_prompt: "Modern macOS video player with sleek interface, Picture in Picture mode, subtitle overlay, dark elegant design matching macOS aesthetics, purple playback controls, dark cinema background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "getsentry/sentry", url: "https://github.com/getsentry/sentry",
    name: "Sentry", stars: 43487, language: "Python", author: "getsentry", category_id: 2,
    difficulty: "medio", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["errores", "monitorización", "devops", "debugging", "apm"],
    seo_slug: "sentry-monitorizar-errores-aplicacion",
    seo_title: "Sentry: Detecta y corrige errores en tu aplicación antes de que tus usuarios los reporten",
    seo_description: "Sentry monitoriza errores en producción en tiempo real. Stack traces, contexto de usuario, performance monitoring. Self-hosteable. 43k estrellas.",
    summary_es: `Sentry es una plataforma de monitorización de errores que te dice exactamente cuándo, dónde y por qué tu aplicación falla en producción — antes de que tus usuarios te escriban quejándose. Captura errores automáticamente, te muestra el stack trace completo, el contexto del usuario que lo experimentó, y cuántas personas están afectadas.

## El problema que resuelve

Tu aplicación está en producción. Un usuario en Sevilla con un iPhone 13 usando Safari experimenta un error al intentar completar una compra. Sin Sentry, nunca te enteras (o te enteras cuando el usuario se queja en Twitter). Con Sentry, recibes una notificación al instante con:

- El error exacto y el stack trace
- En qué navegador, dispositivo y versión de tu app ocurrió
- Qué estaba haciendo el usuario cuando falló (breadcrumbs)
- Cuántos usuarios están afectados
- Si es un error nuevo o uno que ya habías visto

## Qué soporta

- **Frontend**: JavaScript, React, Vue, Angular, Svelte
- **Backend**: Python, Node.js, Go, Java, Ruby, PHP, .NET, Rust
- **Mobile**: iOS (Swift/ObjC), Android (Kotlin/Java), React Native, Flutter
- **Game engines**: Unity, Unreal Engine
- **Performance monitoring**: no solo errores sino también transacciones lentas

## Self-hosting

Sentry es open source y self-hosteable. El servicio cloud de Sentry tiene un plan gratuito (5.000 errores/mes), pero si prefieres control total:

\`\`\`bash
git clone https://github.com/getsentry/self-hosted.git
cd self-hosted
./install.sh
docker compose up -d
\`\`\`

Necesita 4GB+ de RAM mínimo para self-hosting. El cloud es más cómodo para empezar.

## Por qué todo el mundo lo usa

Porque los logs no escalan. Cuando tu app tiene 10 usuarios, puedes leer los logs. Cuando tiene 10.000, necesitas algo que agrupe errores iguales, te avise de errores nuevos, y te diga cuáles son los más críticos. Eso es Sentry.`,
    image_prompt: "Error monitoring dashboard showing crash reports, stack traces, user impact metrics, real-time error stream, issue grouping visualization, purple alert elements, dark devops monitoring background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "scrapy/scrapy", url: "https://github.com/scrapy/scrapy",
    name: "Scrapy", stars: 61056, language: "Python", author: "scrapy", category_id: 2,
    difficulty: "medio", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["scraping", "python", "datos", "web", "automatización"],
    seo_slug: "scrapy-framework-web-scraping-python",
    seo_title: "Scrapy: El framework de web scraping más potente de Python",
    seo_description: "Scrapy es un framework completo para scraping web en Python. Spiders, pipelines, middlewares y exportación a JSON/CSV/DB. 61k estrellas.",
    summary_es: `Scrapy es el framework de web scraping más maduro y completo del ecosistema Python. No es un simple script que descarga HTML — es un framework profesional con spiders, pipelines de datos, middlewares, manejo de rate limiting, proxy rotation, y exportación a cualquier formato o base de datos.

## Cuándo usar Scrapy vs un script simple

Si necesitas scrapear una página y extraer un dato, \`requests + BeautifulSoup\` es suficiente. Si necesitas scrapear miles de páginas, manejar paginación, respetar rate limits, reintentar errores, y guardar los datos en una base de datos, necesitas Scrapy.

## Cómo funciona

\`\`\`python
import scrapy

class ProductSpider(scrapy.Spider):
    name = "productos"
    start_urls = ["https://tienda.com/categoria/ofertas"]

    def parse(self, response):
        for product in response.css("div.product-card"):
            yield {
                "nombre": product.css("h2::text").get(),
                "precio": product.css(".price::text").get(),
                "url": product.css("a::attr(href)").get(),
            }

        # Seguir a la siguiente página
        next_page = response.css("a.next-page::attr(href)").get()
        if next_page:
            yield response.follow(next_page, self.parse)
\`\`\`

\`\`\`bash
# Ejecutar y exportar a JSON
scrapy crawl productos -o productos.json
\`\`\`

Ese spider navega automáticamente todas las páginas, extrae los datos de cada producto, y los exporta a JSON. Scrapy se encarga de la concurrencia, los reintentos, y el rate limiting.

## Funcionalidades del framework

- **Spiders**: definen qué URLs visitar y cómo extraer datos
- **Selectors**: CSS y XPath para extraer datos del HTML
- **Pipelines**: procesan los datos extraídos (limpiar, validar, guardar en DB)
- **Middlewares**: interceptan peticiones/respuestas (añadir headers, rotar proxies, manejar cookies)
- **AutoThrottle**: ajusta automáticamente la velocidad de scraping para no sobrecargar el servidor
- **Feed exports**: exporta a JSON, CSV, XML, o directamente a bases de datos
- **Shell interactivo**: prueba selectores en tiempo real antes de escribir el spider
- **Integración con Splash/Playwright**: para webs que renderizan con JavaScript

## Scrapy vs BeautifulSoup vs Browser Use

- **BeautifulSoup**: para scripts simples de 1-2 páginas. No maneja concurrencia, paginación ni almacenamiento
- **Scrapy**: para proyectos de scraping serios con miles de páginas, pipelines de datos, y mantenimiento a largo plazo
- **Browser Use**: para webs que requieren interacción (login, clics, formularios) donde la IA decide qué hacer

## Instalación

\`\`\`bash
pip install scrapy
scrapy startproject mi_proyecto
\`\`\``,
    image_prompt: "Web scraping spider crawling through website pages, data extraction pipeline visualization, structured data output in JSON, concurrent requests flowing, purple spider web design, dark data engineering background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "usememos/memos", url: "https://github.com/usememos/memos",
    name: "Memos", stars: 58491, language: "Go", author: "usememos", category_id: 3,
    difficulty: "facil", interest_score: 86, is_oss_alternative: true, alternative_to: "Google Keep",
    tags: ["notas", "self-hosted", "minimalista", "markdown", "privacidad"],
    seo_slug: "memos-notas-rapidas-self-hosted",
    seo_title: "Memos: Notas rápidas self-hosted — como un Twitter privado para tus ideas",
    seo_description: "Memos es una herramienta de notas rápidas self-hosted en formato micro-blog. Markdown, tags, imágenes. Como Google Keep pero open source.",
    summary_es: `Memos es una herramienta de captura rápida de ideas, notas y pensamientos que funciona como un micro-blog privado. En vez de documentos largos y organizados (eso es para Notion/Obsidian), Memos es para lo que piensas ahora mismo: una idea que no quieres perder, un enlace interesante, un comando que siempre olvidas, una nota mental rápida.

## El concepto

Piensa en Twitter, pero privado y para ti solo. Abres Memos, escribes lo que sea en markdown, le pones un tag si quieres, y listo. Se guarda cronológicamente. Cuando necesitas encontrar algo, buscas por texto o tag. Sin carpetas, sin jerarquías, sin fricción.

## Por qué es genial para captura rápida

- **Zero fricción**: abres, escribes, envías. No hay que elegir carpeta, tipo de nota, template...
- **Markdown nativo**: texto enriquecido sin complejidad
- **Tags con #**: organización orgánica, como hashtags
- **Timeline**: tus notas en orden cronológico, como un feed
- **Imágenes**: arrastra y suelta fotos y capturas
- **Links**: pega una URL y se muestra con preview
- **Self-hosted**: tus notas en tu servidor, no en Google Keep

## Casos de uso reales

- **Diario de aprendizaje**: cada vez que aprendes algo, lo apuntas con un tag (#python, #devops)
- **Snippets de código**: comandos que siempre olvidas (\`docker system prune -a\`)
- **Ideas sueltas**: pensamientos que no son lo suficientemente maduros para un documento
- **Links interesantes**: artículos, vídeos, herramientas que quieres recordar
- **Notas de reuniones rápidas**: bullet points, decisiones, action items

## Memos vs Obsidian vs Notion

Memos no compite con ellos — los complementa. Obsidian/Notion son para conocimiento estructurado (documentos, wikis, bases de datos). Memos es para lo que NO necesita estructura: ideas sueltas, notas rápidas, cosas que capturas sobre la marcha. Muchos usuarios usan ambos: Memos para captura rápida y Obsidian para organizar.

## Instalación

\`\`\`bash
docker run -d -p 5230:5230 -v memos:/var/opt/memos neosmemo/memos:stable
\`\`\`

Una línea. Abre localhost:5230 y empieza a escribir.`,
    image_prompt: "Minimalist note-taking timeline feed with short markdown notes, hashtags, images, code snippets in a micro-blog format, quick capture UI, purple accent elements, dark clean personal journal interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "vllm-project/vllm", url: "https://github.com/vllm-project/vllm",
    name: "vLLM", stars: 75003, language: "Python", author: "vllm-project", category_id: 1,
    difficulty: "dificil", interest_score: 90, is_oss_alternative: true, alternative_to: "OpenAI API (inferencia)",
    tags: ["ia", "llm", "inferencia", "gpu", "servidor"],
    seo_slug: "vllm-servidor-llm-alto-rendimiento",
    seo_title: "vLLM: Sirve modelos de lenguaje hasta 24x más rápido que la competencia",
    seo_description: "vLLM es un motor de inferencia de alto rendimiento para LLMs. Hasta 24x más throughput que HuggingFace. PagedAttention y continuous batching.",
    summary_es: `vLLM es un motor de inferencia de alto rendimiento para modelos de lenguaje que permite servir LLMs con un throughput hasta 24 veces mayor que las implementaciones estándar de HuggingFace Transformers. Si necesitas servir un modelo de IA a muchos usuarios simultáneamente con baja latencia, vLLM es probablemente la mejor opción open source.

## El problema que resuelve

Ejecutar un LLM para un usuario es fácil. Servirlo a 100 usuarios simultáneamente con tiempos de respuesta aceptables es otro tema. Los frameworks estándar (HuggingFace Transformers) no están optimizados para servir a múltiples usuarios — procesan peticiones secuencialmente y desperdician memoria GPU.

vLLM resuelve esto con dos innovaciones clave:

### PagedAttention
En vez de reservar bloques de memoria contiguos para cada secuencia (lo que causa fragmentación y desperdicio), vLLM usa un sistema de paginación similar al de los sistemas operativos. Resultado: hasta 4x menos memoria GPU desperdiciada, lo que permite servir más usuarios simultáneamente con la misma GPU.

### Continuous Batching
En vez de esperar a que una petición termine para empezar la siguiente, vLLM procesa múltiples peticiones simultáneamente, insertando nuevas peticiones en el batch conforme otras terminan. El resultado es un throughput dramáticamente mayor.

## Rendimiento real

En benchmarks estándar, vLLM consigue:
- **2-24x más throughput** que HuggingFace Transformers
- **Latencia similar o menor** por petición individual
- **Soporta más usuarios simultáneos** con la misma GPU

## Modelos compatibles

Llama 3, Mistral, Mixtral, Phi, Qwen, DeepSeek, Gemma, Yi, Falcon, y prácticamente cualquier modelo de HuggingFace.

## API compatible con OpenAI

\`\`\`bash
# Servir un modelo
python -m vllm.entrypoints.openai.api_server \\
    --model meta-llama/Llama-3.1-8B-Instruct

# Usarlo como si fuera OpenAI
curl http://localhost:8000/v1/chat/completions \\
    -d '{"model": "meta-llama/Llama-3.1-8B-Instruct",
         "messages": [{"role": "user", "content": "Hola"}]}'
\`\`\`

## Para quién es

- **Empresas sirviendo IA a usuarios**: necesitas throughput alto y latencia baja
- **Startups con producto de IA**: quieres servir modelos propios sin pagar APIs externas
- **Investigadores**: experimentar con modelos grandes de forma eficiente
- **No es para uso personal casual**: para eso usa Ollama, que es más simple

## Instalación

\`\`\`bash
pip install vllm
\`\`\`

Requiere GPU NVIDIA con CUDA. Mínimo una GPU con 16GB VRAM para modelos de 7B.`,
    image_prompt: "High-performance LLM inference server processing multiple requests simultaneously, GPU utilization dashboard, PagedAttention memory visualization, throughput metrics, purple AI infrastructure, dark server room background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "hiyouga/LlamaFactory", url: "https://github.com/hiyouga/LlamaFactory",
    name: "LLaMA-Factory", stars: 69388, language: "Python", author: "hiyouga", category_id: 1,
    difficulty: "medio", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "fine-tuning", "llm", "entrenamiento", "lora"],
    seo_slug: "llama-factory-fine-tuning-llms-facil",
    seo_title: "LLaMA-Factory: Fine-tuning de modelos de lenguaje con interfaz visual, sin dolor",
    seo_description: "LLaMA-Factory permite hacer fine-tuning de +100 LLMs con una interfaz web. LoRA, QLoRA, RLHF y más. Sin experiencia en ML. 69k estrellas.",
    summary_es: `LLaMA-Factory es una plataforma que hace accesible el fine-tuning de modelos de lenguaje — el proceso de adaptar un modelo general (como Llama o Mistral) a tu caso de uso específico. Si quieres un modelo que hable como tu marca, que entienda la jerga de tu sector, o que se especialice en una tarea concreta, necesitas hacer fine-tuning. Y LLaMA-Factory lo hace sorprendentemente fácil.

## Por qué necesitas fine-tuning

Los modelos generales (GPT-4, Claude, Llama) son buenos en todo pero maestros de nada. Si necesitas:

- Un modelo que responda como tu departamento de atención al cliente (con tu tono, tus procesos, tus productos)
- Un modelo especializado en extraer datos de facturas en español
- Un modelo que genere código siguiendo las convenciones de tu empresa
- Un modelo que entienda terminología médica, legal o financiera específica

...necesitas fine-tuning. Y antes de LLaMA-Factory, hacerlo requería conocimientos profundos de ML, GPUs caras, y semanas de configuración.

## Qué hace LLaMA-Factory

### Interfaz visual (LLaMA Board)
Una interfaz web donde configuras todo con clics: seleccionas el modelo base, subes tu dataset, eliges el método de entrenamiento (LoRA, QLoRA, full fine-tuning), ajustas hiperparámetros, y le das a "Train". Sin escribir código de entrenamiento.

### Métodos de entrenamiento soportados
- **LoRA**: entrena adaptadores ligeros sobre el modelo congelado (eficiente en memoria)
- **QLoRA**: LoRA pero con el modelo cuantizado a 4 bits (aún menos memoria)
- **Full fine-tuning**: entrena todos los parámetros (mejor resultado pero más recursos)
- **RLHF**: entrenamiento con feedback humano (como se entrena ChatGPT)
- **DPO**: alternativa a RLHF más eficiente
- **PPO**: reinforcement learning from human feedback

### Modelos compatibles
Más de 100 modelos: Llama 3, Mistral, Mixtral, Phi, Qwen, DeepSeek, Gemma, Yi, ChatGLM, Baichuan, InternLM, y muchos más.

## Ejemplo práctico

Quieres un modelo que responda preguntas sobre tu producto. Preparas un dataset:

\`\`\`json
[
  {"instruction": "¿Cuánto cuesta el plan Pro?", "output": "El plan Pro cuesta 29€/mes e incluye acceso ilimitado a todas las funciones, soporte prioritario y API."},
  {"instruction": "¿Cómo cancelo mi suscripción?", "output": "Para cancelar, ve a Ajustes > Suscripción > Cancelar plan. Tu acceso continuará hasta el final del período facturado."},
  // ... 500-1000 ejemplos más
]
\`\`\`

Lo subes a LLaMA Board, seleccionas Llama 3.1 8B como base, LoRA como método, y le das a entrenar. En 30-60 minutos (en una GPU de consumo) tienes un modelo especializado en atención al cliente de tu producto.

## Requisitos

- **Mínimo**: GPU con 8GB VRAM (QLoRA con modelos de 7B)
- **Recomendado**: GPU con 24GB VRAM (LoRA con modelos de 13B)
- **Ideal**: múltiples GPUs de 48GB+ (full fine-tuning de modelos grandes)

## Instalación

\`\`\`bash
git clone https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory
pip install -e .
llamafactory-cli webui  # Abre la interfaz visual
\`\`\``,
    image_prompt: "AI model fine-tuning interface with training progress charts, dataset upload area, model selection grid, LoRA adapter visualization, GPU utilization meters, purple ML training elements, dark AI lab background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "unslothai/unsloth", url: "https://github.com/unslothai/unsloth",
    name: "Unsloth", stars: 58880, language: "Python", author: "unslothai", category_id: 1,
    difficulty: "medio", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "fine-tuning", "llm", "optimización", "gpu"],
    seo_slug: "unsloth-fine-tuning-llm-2x-rapido-mitad-memoria",
    seo_title: "Unsloth: Fine-tuning de LLMs 2x más rápido usando la mitad de memoria GPU",
    seo_description: "Unsloth optimiza el fine-tuning de modelos como Llama, Mistral y Gemma. 2x más rápido, 50% menos VRAM. Sin pérdida de calidad. 58k estrellas.",
    summary_es: `Unsloth hace que el fine-tuning de modelos de lenguaje sea 2x más rápido y use un 50% menos de memoria GPU — sin sacrificar nada de calidad. Esto es enorme porque significa que puedes entrenar modelos que antes necesitaban una GPU de 2.000€ en una GPU de 500€, o entrenar en la mitad de tiempo con el mismo hardware.

## El problema: fine-tuning es caro

Hacer fine-tuning de un modelo de 7B parámetros con HuggingFace Transformers + PyTorch estándar:
- Necesita ~24GB de VRAM (una RTX 4090 o A100)
- Tarda ~2 horas por epoch con un dataset mediano
- Si quieres 13B, necesitas 48GB+ de VRAM

Con Unsloth, el mismo entrenamiento:
- Necesita ~12GB de VRAM (una RTX 3060 o 4070 vale)
- Tarda ~1 hora por epoch
- 13B cabe en 24GB de VRAM

## Cómo lo consigue

Unsloth reescribe los kernels de entrenamiento en Triton (el compilador de GPU de OpenAI) con optimizaciones matemáticas que:

1. **Reducen el uso de memoria** con técnicas de gradient checkpointing inteligente
2. **Aceleran el forward/backward pass** con kernels fusionados optimizados
3. **Mantienen la precisión numérica** — no pierde calidad respecto al entrenamiento estándar

El resultado está verificado: modelos entrenados con Unsloth producen exactamente los mismos resultados que con HuggingFace estándar, pero en la mitad de tiempo.

## Unsloth Studio (interfaz visual)

Unsloth ahora tiene una interfaz web (Unsloth Studio) donde puedes hacer fine-tuning sin código, similar a LLaMA-Factory:

1. Seleccionas el modelo base
2. Subes tu dataset
3. Eliges el método (LoRA, QLoRA)
4. Ajustas parámetros
5. Le das a entrenar

## Uso en código

\`\`\`python
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.1-8B-Instruct",
    max_seq_length=2048,
    load_in_4bit=True,
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
)

# Entrenar con tu dataset...
\`\`\`

## Modelos soportados

Llama 3, Mistral, Phi, Qwen, DeepSeek, Gemma, y la mayoría de modelos populares de HuggingFace.

## Para quién es

- **Investigadores con GPU limitada**: entrena modelos que antes no podías por falta de VRAM
- **Startups**: reduce costes de cloud GPU a la mitad
- **Desarrolladores**: fine-tuning en tu RTX 3060/4070 de escritorio, sin necesidad de cloud
- **Cualquiera que haga fine-tuning**: mismos resultados, mitad de tiempo. No hay razón para no usarlo

## Instalación

\`\`\`bash
pip install unsloth
\`\`\``,
    image_prompt: "GPU memory optimization visualization showing 50% reduction, training speed comparison chart 2x faster, LLM model being fine-tuned efficiently, memory bars shrinking, purple optimization elements, dark AI computing background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "mem0ai/mem0", url: "https://github.com/mem0ai/mem0",
    name: "Mem0", stars: 51784, language: "Python", author: "mem0ai", category_id: 1,
    difficulty: "medio", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "memoria", "agentes", "personalización", "api"],
    seo_slug: "mem0-memoria-persistente-para-ia",
    seo_title: "Mem0: Dale memoria persistente a tus agentes de IA — que recuerden a cada usuario",
    seo_description: "Mem0 añade memoria persistente a cualquier LLM o agente. Tu IA recuerda preferencias, historial y contexto de cada usuario. 51k estrellas.",
    summary_es: `Mem0 resuelve uno de los problemas más frustrantes de los chatbots y agentes de IA: no tienen memoria. Cada conversación empieza de cero. Le dices a tu asistente de IA que prefieres respuestas concisas, que trabajas en marketing, que tu stack es React + PostgreSQL... y en la siguiente sesión lo ha olvidado todo.

Mem0 es una capa de memoria persistente que puedes añadir a cualquier LLM o agente. Tu IA recuerda las preferencias de cada usuario, su historial de interacciones, y el contexto relevante entre sesiones.

## Cómo funciona

\`\`\`python
from mem0 import Memory

memory = Memory()

# Añadir memorias
memory.add("El usuario prefiere respuestas concisas", user_id="guillermo")
memory.add("Trabaja en marketing digital", user_id="guillermo")
memory.add("Su stack principal es React + PostgreSQL + Tailwind", user_id="guillermo")

# Buscar memorias relevantes para una consulta
results = memory.search("¿Qué framework de CSS debería recomendar?", user_id="guillermo")
# Devuelve: "Su stack principal es React + PostgreSQL + Tailwind"
\`\`\`

Cuando tu chatbot recibe una nueva pregunta, consulta las memorias del usuario y las incluye en el contexto del LLM. El resultado: una IA que parece conocerte.

## Tipos de memoria

- **Memoria de usuario**: preferencias, datos personales, contexto profesional
- **Memoria de sesión**: lo que se ha hablado en esta conversación
- **Memoria de agente**: aprendizajes del agente que se aplican a todos los usuarios
- **Memoria de organización**: conocimiento compartido de un equipo

## Casos de uso reales

### Chatbot de soporte personalizado
En vez de que cada conversación empiece con "Hola, ¿en qué puedo ayudarle?", tu chatbot sabe que este usuario ya ha contactado 3 veces por el mismo problema de facturación y puede ir directo al grano.

### Asistente de código
Tu asistente de programación recuerda que usas TypeScript estricto, Tailwind v4, y que prefieres componentes funcionales con hooks. No tienes que repetirlo en cada sesión.

### Tutor educativo
Un tutor de IA que recuerda en qué nivel está el estudiante, qué temas ya domina, y cuáles le cuestan más. Adapta las explicaciones al conocimiento previo del alumno.

## API sencilla

\`\`\`python
# Añadir memoria (Mem0 extrae hechos automáticamente)
memory.add("Me llamo Guillermo, soy de Madrid y trabajo como desarrollador fullstack con React y Python", user_id="guillermo")

# Mem0 extrae automáticamente:
# - Nombre: Guillermo
# - Ciudad: Madrid
# - Profesión: desarrollador fullstack
# - Tecnologías: React, Python

# Buscar
memory.search("¿Qué experiencia tiene con frontend?", user_id="guillermo")
# → "Trabaja como desarrollador fullstack con React"

# Obtener todas las memorias de un usuario
memory.get_all(user_id="guillermo")
\`\`\`

## Instalación

\`\`\`bash
pip install mem0ai
\`\`\`

Funciona con cualquier LLM (OpenAI, Anthropic, Ollama) y cualquier vector store (Qdrant, ChromaDB, pgvector).`,
    image_prompt: "AI memory system showing user profile facts being stored and recalled, persistent memory layers connecting past and future conversations, personalization visualization, purple memory neural network, dark AI interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "charmbracelet/bubbletea", url: "https://github.com/charmbracelet/bubbletea",
    name: "Bubble Tea", stars: 41148, language: "Go", author: "charmbracelet", category_id: 2,
    difficulty: "medio", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["tui", "terminal", "go", "cli", "interfaz"],
    seo_slug: "bubbletea-framework-interfaces-terminal",
    seo_title: "Bubble Tea: Crea interfaces de terminal bonitas e interactivas con Go",
    seo_description: "Bubble Tea es un framework Go para construir TUIs (Terminal User Interfaces) bonitas, interactivas y modernas. Del equipo de Charm. 41k estrellas.",
    summary_es: `Bubble Tea es un framework de Go para construir interfaces de terminal (TUI) interactivas y visualmente atractivas. Si alguna vez has usado lazygit, gh (GitHub CLI), o cualquier app de terminal que tiene menús, listas, inputs, y se ve bien, probablemente está hecha con Bubble Tea o sus librerías hermanas.

## Por qué importa

Las apps de terminal no tienen que ser feas. Bubble Tea, junto con sus librerías complementarias (Lip Gloss para estilos, Bubbles para componentes), demuestra que puedes hacer interfaces de terminal que se ven genuinamente bonitas: con colores, bordes, alineación, animaciones, y una UX que rivaliza con apps gráficas.

## El ecosistema Charm

Bubble Tea no viene solo — es parte de un ecosistema:

- **Bubble Tea**: el framework core (modelo-vista-update, inspirado en Elm)
- **Lip Gloss**: estilos para el terminal (colores, padding, borders, alineación)
- **Bubbles**: componentes prediseñados (spinners, text input, lists, tables, progress bars)
- **Wish**: servidor SSH para apps TUI accesibles remotamente
- **Glow**: renderizado de Markdown en terminal
- **VHS**: genera GIFs de demos de terminal automáticamente

## Ejemplo: una app de lista de tareas

\`\`\`go
package main

import (
    "fmt"
    tea "github.com/charmbracelet/bubbletea"
)

type model struct {
    choices  []string
    cursor   int
    selected map[int]struct{}
}

func (m model) View() string {
    s := "¿Qué quieres hacer hoy?\\n\\n"
    for i, choice := range m.choices {
        cursor := " "
        if m.cursor == i { cursor = ">" }
        checked := " "
        if _, ok := m.selected[i]; ok { checked = "x" }
        s += fmt.Sprintf("%s [%s] %s\\n", cursor, checked, choice)
    }
    return s + "\\nPulsa q para salir.\\n"
}
\`\`\`

## Para quién es

- **Desarrolladores Go** que quieren hacer CLIs interactivas y bonitas
- **DevOps** que crean herramientas internas de terminal
- **Makers** que quieren que sus apps de terminal se vean profesionales
- **Cualquiera inspirado por lazygit, gh, o Charm tools** y quiera crear algo similar

## Instalación

\`\`\`bash
go get github.com/charmbracelet/bubbletea
\`\`\``,
    image_prompt: "Beautiful terminal user interface with colorful menus, interactive lists, progress bars, styled text components, Charm-style elegant TUI design, purple terminal elements, dark terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "dbeaver/dbeaver", url: "https://github.com/dbeaver/dbeaver",
    name: "DBeaver", stars: 49364, language: "Java", author: "dbeaver", category_id: 6,
    difficulty: "facil", interest_score: 87, is_oss_alternative: true, alternative_to: "DataGrip",
    tags: ["base-de-datos", "sql", "herramientas", "multiplataforma", "gui"],
    seo_slug: "dbeaver-cliente-base-datos-universal",
    seo_title: "DBeaver: El cliente de base de datos universal y gratuito",
    seo_description: "DBeaver se conecta a cualquier base de datos (PostgreSQL, MySQL, MongoDB, SQLite, Oracle...) con una interfaz visual completa. Open source.",
    summary_es: `DBeaver es un cliente de base de datos universal que se conecta a prácticamente cualquier base de datos del planeta — PostgreSQL, MySQL, MariaDB, SQLite, Oracle, SQL Server, MongoDB, Redis, Cassandra, ClickHouse, y más de 80 bases de datos más — con una interfaz gráfica completa para explorar datos, escribir queries, y administrar schemas.

## Por qué todo el mundo lo usa

### Es realmente universal
Con un solo programa te conectas a cualquier base de datos. No necesitas pgAdmin para PostgreSQL, phpMyAdmin para MySQL, Compass para MongoDB, y SQLite Browser para SQLite — DBeaver los reemplaza a todos.

### Es gratuito (Community Edition)
DataGrip (de JetBrains) es la alternativa de pago más conocida y cuesta 199€/año. DBeaver Community es gratuito y cubre el 90% de lo que necesitas.

## Funcionalidades

- **Editor SQL inteligente**: autocompletado, syntax highlighting, formateo automático, ejecución parcial
- **Explorador de datos visual**: navega por tablas como en una hoja de cálculo, filtra, ordena, edita inline
- **Diagrama ER**: genera diagramas de relaciones entre tablas automáticamente
- **Editor de datos**: edita datos directamente en la tabla visual, con validación
- **Import/Export**: importa y exporta datos en CSV, JSON, XML, SQL, Excel
- **SSH tunnel**: conéctate a bases de datos detrás de un firewall vía SSH
- **Múltiples conexiones**: ten abiertas 10 conexiones a diferentes bases de datos simultáneamente
- **Historial de queries**: todas las queries que ejecutas se guardan automáticamente
- **Comparación de schemas**: compara la estructura de dos bases de datos

## DBeaver vs DataGrip

| | DBeaver Community | DataGrip |
|---|---|---|
| Precio | Gratis | 199€/año |
| Bases soportadas | 80+ | 20+ |
| Autocompletado SQL | Bueno | Excelente |
| Refactoring de DB | Básico | Avanzado |
| Integración con IDEs | No | Sí (JetBrains) |
| Velocidad | Buena | Excelente |

Para la mayoría de usos — explorar datos, escribir queries, administrar schemas — DBeaver Community es más que suficiente. DataGrip justifica su precio si escribes SQL complejo todo el día y necesitas el mejor autocompletado y refactoring.

## Instalación

\`\`\`bash
# macOS
brew install --cask dbeaver-community

# Ubuntu
sudo snap install dbeaver-ce

# Windows
winget install dbeaver.dbeaver
\`\`\``,
    image_prompt: "Universal database client showing SQL editor, data grid, ER diagram, multiple database connections sidebar, query results, purple database elements, dark professional database administration interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "remotion-dev/remotion", url: "https://github.com/remotion-dev/remotion",
    name: "Remotion", stars: 41609, language: "TypeScript", author: "remotion-dev", category_id: 2,
    difficulty: "medio", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["vídeo", "react", "programático", "contenido", "automatización"],
    seo_slug: "remotion-crear-videos-con-react",
    seo_title: "Remotion: Crea vídeos programáticamente con React y TypeScript",
    seo_description: "Remotion permite crear vídeos con código React. Animaciones, gráficos, datos dinámicos, renderizado en servidor. Ideal para vídeos a escala.",
    summary_es: `Remotion permite crear vídeos usando React y TypeScript. En vez de abrir After Effects o Premiere y editar manualmente, escribes componentes React que definen cada frame del vídeo, y Remotion los renderiza a MP4. Es programar vídeos como programas webs.

## Para qué sirve de verdad

### Vídeos a escala
Si necesitas crear 100 vídeos personalizados (cada uno con el nombre de un cliente, sus métricas, o datos diferentes), hacerlo manualmente en Premiere es imposible. Con Remotion, creas un template en React y lo renderizas con diferentes datos:

\`\`\`tsx
export const WelcomeVideo: React.FC<{ userName: string; metrics: Stats }> = ({ userName, metrics }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0a10" }}>
      <Sequence from={0} durationInFrames={90}>
        <Title>Hola, {userName}</Title>
      </Sequence>
      <Sequence from={90} durationInFrames={120}>
        <MetricsAnimation data={metrics} />
      </Sequence>
    </AbsoluteFill>
  );
};
\`\`\`

### Vídeos con datos dinámicos
Gráficos animados, dashboards en vídeo, reportes visuales — cualquier cosa que hagas en React la puedes convertir en vídeo.

### Contenido para redes
Intros, outros, thumbnails animadas, stories, reels — todo programable y reproducible.

## El poder de React para vídeo

Como es React, tienes acceso a todo su ecosistema:
- **Animaciones**: framer-motion, react-spring, o las propias de Remotion
- **Gráficos**: recharts, d3, victory para visualizaciones de datos
- **Tipografía**: Google Fonts, custom fonts
- **Imágenes**: proceso de imágenes, overlays, composición
- **APIs**: datos en tiempo real desde cualquier API
- **Componentes**: reutiliza cualquier componente de tu web en un vídeo

## Rendering

\`\`\`bash
# Preview en el navegador (como dev server de React)
npx remotion preview

# Renderizar a MP4
npx remotion render src/index.ts MyVideo out/video.mp4

# Renderizar en servidor (Lambda, Cloud Run)
npx remotion lambda render ...
\`\`\`

## Para quién es

- **Equipos de marketing**: vídeos personalizados a escala (emails con vídeo, onboarding)
- **Creadores de contenido técnico**: tutoriales con animaciones de código, demos de producto
- **Data teams**: visualizaciones animadas de datos para presentaciones
- **SaaS**: generar vídeos resumen para usuarios (tipo Spotify Wrapped)

## Instalación

\`\`\`bash
npx create-video@latest
\`\`\``,
    image_prompt: "React code creating animated video frames, video timeline with React components as clips, code-to-video pipeline visualization, animated charts and text, purple creative elements, dark video production background",
    replicable_with_code: "Con Claude Code puedes crear templates de vídeo Remotion personalizados para tu marca: intros, resúmenes de datos, demos de producto animadas, todo programable en React.",
  },
  {
    source: "github", source_id: "saadeghi/daisyui", url: "https://github.com/saadeghi/daisyui",
    name: "daisyUI", stars: 40644, language: "Svelte", author: "saadeghi", category_id: 7,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["css", "tailwind", "componentes", "ui", "frontend"],
    seo_slug: "daisyui-componentes-tailwind-sin-complicaciones",
    seo_title: "daisyUI: Componentes bonitos para Tailwind CSS sin clases interminables",
    seo_description: "daisyUI añade componentes semánticos a Tailwind CSS. Botones, cards, modals con clases simples. 30+ temas incluidos. 40k estrellas.",
    summary_es: `daisyUI es una librería de componentes para Tailwind CSS que soluciona su mayor problema: las clases interminables. En vez de escribir \`class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"\` para un simple botón, con daisyUI escribes \`class="btn btn-primary"\`.

## El problema que resuelve

Tailwind es genial para control total del diseño, pero la realidad es que el 80% del tiempo escribes las mismas combinaciones de clases para los mismos componentes: botones, cards, inputs, modals, dropdowns... daisyUI encapsula esas combinaciones en clases semánticas.

## Antes vs después

**Tailwind puro (botón):**
\`\`\`html
<button class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
  Guardar
</button>
\`\`\`

**Con daisyUI:**
\`\`\`html
<button class="btn btn-primary">Guardar</button>
\`\`\`

Mismo resultado visual. Una fracción del código.

## Componentes incluidos

Botones, cards, alerts, badges, avatars, progress bars, tabs, accordions, breadcrumbs, drawers, dropdowns, modals, carousels, stats, timelines, tooltips, checkboxes, radios, selects, textareas, toggles, ratings, y muchos más.

## 30+ temas incluidos

daisyUI viene con más de 30 temas de color predefinidos (light, dark, cupcake, cyberpunk, retro, valentine, aqua, lofi...) y puedes crear los tuyos propios. Cambiar de tema es una línea en la config:

\`\`\`js
// tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
  daisyui: { themes: ["dark", "cyberpunk", "retro"] },
}
\`\`\`

## Por qué no shadcn/ui o Headless UI

- **shadcn/ui**: copia componentes en tu proyecto (más control, más código). daisyUI son clases CSS (más rápido, menos control)
- **Headless UI**: solo la lógica sin estilos. daisyUI incluye los estilos
- daisyUI es la opción más rápida cuando quieres un prototipo bonito SIN pasar horas en diseño

## Instalación

\`\`\`bash
npm i -D daisyui
\`\`\`

Añade el plugin a tu tailwind.config.js y ya tienes acceso a todos los componentes.`,
    image_prompt: "CSS component library showcase with buttons, cards, modals, inputs in various color themes, Tailwind CSS integration, clean component grid, purple design system elements, dark UI component library background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "ccxt/ccxt", url: "https://github.com/ccxt/ccxt",
    name: "CCXT", stars: 41618, language: "Python", author: "ccxt", category_id: 2,
    difficulty: "medio", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["crypto", "trading", "api", "exchanges", "finanzas"],
    seo_slug: "ccxt-libreria-trading-crypto-universal",
    seo_title: "CCXT: Una librería para conectar con 100+ exchanges de crypto",
    seo_description: "CCXT unifica la API de más de 100 exchanges de criptomonedas. Binance, Coinbase, Kraken... una sola interfaz. Python, JS, PHP. 41k estrellas.",
    summary_es: `CCXT (CryptoCurrency eXchange Trading Library) es una librería que unifica la API de más de 100 exchanges de criptomonedas bajo una sola interfaz. En vez de aprender la API de Binance, luego la de Coinbase, luego la de Kraken (cada una diferente), usas CCXT y el código es el mismo para todas.

## El problema

Cada exchange de crypto tiene su propia API con su propia documentación, sus propios formatos de datos, sus propias peculiaridades, y sus propios bugs. Si quieres construir un bot de trading que opere en múltiples exchanges, o simplemente quieres comparar precios entre exchanges, necesitas integrar cada uno por separado.

CCXT abstrae todo eso en una interfaz unificada.

## Ejemplo

\`\`\`python
import ccxt

# Mismo código, cualquier exchange
binance = ccxt.binance()
coinbase = ccxt.coinbase()
kraken = ccxt.kraken()

# Obtener precio de Bitcoin en cada exchange
for exchange in [binance, coinbase, kraken]:
    ticker = exchange.fetch_ticker('BTC/USDT')
    print(f"{exchange.name}: {ticker['last']:,.2f}")

# Obtener orderbook
orderbook = binance.fetch_order_book('ETH/USDT')

# Ejecutar una orden (requiere API keys)
order = binance.create_limit_buy_order('BTC/USDT', 0.001, 50000)
\`\`\`

## Funcionalidades

- **Market data**: precios, orderbooks, trades, OHLCV (velas), tickers
- **Trading**: órdenes limit, market, stop-loss, take-profit
- **Gestión de cuenta**: balances, posiciones, historial de trades
- **Funding**: depósitos, retiros, direcciones de wallet
- **100+ exchanges**: Binance, Coinbase, Kraken, OKX, Bybit, Bitfinex, KuCoin, Gate.io...
- **Multi-lenguaje**: Python, JavaScript/TypeScript, PHP, C#, Go

## Casos de uso

- **Bots de trading**: automatiza estrategias de trading en uno o múltiples exchanges
- **Arbitraje**: detecta diferencias de precio entre exchanges y aprovéchalas
- **Portfolio tracking**: monitoriza tus holdings en todos tus exchanges desde un solo dashboard
- **Análisis de mercado**: descarga datos históricos de velas para backtesting
- **Alertas de precio**: monitoriza precios y envía notificaciones

## Instalación

\`\`\`bash
pip install ccxt
# o
npm install ccxt
\`\`\`

**Nota importante**: hacer trading con crypto conlleva riesgo financiero. CCXT es una herramienta técnica — la responsabilidad de las decisiones de inversión es tuya.`,
    image_prompt: "Cryptocurrency trading dashboard connected to multiple exchanges, price charts, orderbook visualization, multi-exchange API unification, purple financial data elements, dark trading interface background",
    replicable_with_code: null,
  },
];

async function main() {
  console.log(`=== OffRadar: Lote 2 — ${projects.length} proyectos ===\n`);
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i+1}/${projects.length}] ${p.name}...`);
    console.log(`  📸 Imagen...`);
    const imgUrl = await generateImage(p.image_prompt, p.seo_slug);
    if (imgUrl) console.log(`  ✓ ${imgUrl}`);
    try {
      await sql`
        INSERT INTO projects (source, source_id, url, name, description, summary_es, category_id, tags, difficulty, interest_score, stars, language, is_oss_alternative, alternative_to, replicable_with_code, featured_image_url, status, priority, seo_slug, seo_title, seo_description, author, created_at, updated_at, published_at)
        VALUES (${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.seo_description}, ${p.summary_es}, ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars}, ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to}, ${p.replicable_with_code || null}, ${imgUrl}, 'published', 'high', ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author}, NOW(), NOW(), NOW())
        ON CONFLICT (source, source_id) DO UPDATE SET stars = EXCLUDED.stars, summary_es = EXCLUDED.summary_es, featured_image_url = COALESCE(EXCLUDED.featured_image_url, projects.featured_image_url), updated_at = NOW()
      `;
      console.log(`  ✓ DB`);
    } catch(e) { console.error(`  ✗ ${e.message}`); }
    if (i < projects.length - 1) await new Promise(r => setTimeout(r, 4000));
  }
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\n✅ Total: ${count[0].n} proyectos publicados`);
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });

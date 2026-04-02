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
    source: "github", source_id: "yt-dlp/yt-dlp", url: "https://github.com/yt-dlp/yt-dlp",
    name: "yt-dlp", stars: 154447, language: "Python", author: "yt-dlp", category_id: 2,
    difficulty: "facil", interest_score: 94, is_oss_alternative: false, alternative_to: null,
    tags: ["descarga", "vídeo", "cli", "youtube", "multimedia"],
    seo_slug: "yt-dlp-descarga-video-cualquier-web",
    seo_title: "yt-dlp: Descarga vídeo y audio de cualquier web desde el terminal",
    seo_description: "yt-dlp descarga vídeos de YouTube, Twitch, Twitter y miles de webs más. Open source, sin límites, con soporte para subtítulos y formatos.",
    summary_es: `yt-dlp es la herramienta de línea de comandos más potente para descargar vídeos y audio de internet. Soporta más de 1.000 sitios web — YouTube, Twitch, Twitter/X, Instagram, TikTok, Vimeo, y prácticamente cualquier web que tenga vídeo. Es el sucesor mejorado del legendario youtube-dl, con mejor rendimiento, más funciones y actualizaciones constantes.

## Por qué es tan popular

YouTube no quiere que descargues sus vídeos. Las herramientas online para descargar vídeos están llenas de anuncios, malware y limitaciones. yt-dlp resuelve esto de forma limpia: un comando en el terminal y tienes el vídeo en tu disco duro, en la calidad y formato que quieras.

## Qué puede hacer

- **Descargar vídeos** en la mejor calidad disponible (hasta 8K si está disponible)
- **Extraer solo el audio** (perfecto para descargar música o podcasts)
- **Descargar subtítulos** en cualquier idioma disponible
- **Descargar playlists enteras** o canales completos
- **Seleccionar formato**: MP4, MKV, WebM para vídeo; MP3, AAC, OPUS para audio
- **Limitar velocidad** para no saturar tu conexión
- **Continuar descargas** interrumpidas
- **Usar cookies** del navegador para contenido que requiere login
- **Incrustar metadatos**: thumbnails, subtítulos y capítulos en el archivo

## Ejemplos prácticos

\`\`\`bash
# Descargar un vídeo en la mejor calidad
yt-dlp "https://youtube.com/watch?v=..."

# Solo audio en MP3
yt-dlp -x --audio-format mp3 "URL"

# Descargar playlist completa
yt-dlp "https://youtube.com/playlist?list=..."

# Con subtítulos en español
yt-dlp --write-sub --sub-lang es "URL"

# Descargar de Twitter/X
yt-dlp "https://twitter.com/usuario/status/..."
\`\`\`

## Sitios soportados

La lista es absurda: YouTube, Twitch, Twitter, Instagram, TikTok, Facebook, Vimeo, Dailymotion, SoundCloud, Bandcamp, Reddit, Spotify (metadatos), y más de 1.000 sitios adicionales. Si una web tiene vídeo o audio, probablemente yt-dlp puede descargarlo.

## Instalación

\`\`\`bash
# macOS
brew install yt-dlp

# Windows
winget install yt-dlp

# Python (cualquier plataforma)
pip install yt-dlp
\`\`\`

## Consideraciones legales

Descargar contenido con copyright para redistribuirlo es ilegal en la mayoría de países. yt-dlp es una herramienta — usarla para descargar tu propio contenido, contenido con licencia libre, o para uso personal, es perfectamente legal. Úsala con responsabilidad.`,
    image_prompt: "Command line terminal downloading video content, progress bar, media files flowing from the internet to local storage, purple digital stream, dark tech background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "firecrawl/firecrawl", url: "https://github.com/firecrawl/firecrawl",
    name: "Firecrawl", stars: 102892, language: "TypeScript", author: "firecrawl", category_id: 2,
    difficulty: "facil", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["scraping", "ia", "api", "datos", "web"],
    seo_slug: "firecrawl-web-data-api-para-ia",
    seo_title: "Firecrawl: Convierte cualquier web en datos limpios para tu IA",
    seo_description: "Firecrawl es una API que convierte páginas web en markdown limpio listo para alimentar modelos de IA. Scraping inteligente sin configuración.",
    summary_es: `Firecrawl es una API que convierte cualquier página web en datos limpios y estructurados, listos para alimentar modelos de inteligencia artificial. En vez de lidiar con HTML sucio, selectores CSS y JavaScript renderizado, le das una URL a Firecrawl y te devuelve el contenido en markdown limpio.

## El problema que resuelve

Si quieres que tu IA conozca el contenido de una web (para RAG, para análisis, para extracción de datos), necesitas scraping. Pero scraping es un dolor:

- Muchas webs renderizan contenido con JavaScript (Firecrawl lo maneja)
- El HTML está lleno de basura (menús, footers, anuncios) — Firecrawl extrae solo el contenido relevante
- Los formatos son inconsistentes — Firecrawl normaliza todo a markdown limpio
- Algunas webs bloquean scrapers — Firecrawl usa técnicas anti-bloqueo

## Cómo funciona

\`\`\`python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="tu-api-key")

# Scrape una sola página
result = app.scrape_url("https://docs.ejemplo.com/guia-inicio")
print(result.markdown)  # Contenido limpio en markdown

# Crawl un sitio entero
result = app.crawl_url("https://docs.ejemplo.com", limit=100)
# Devuelve todas las páginas en markdown
\`\`\`

## Casos de uso

- **RAG para chatbots**: crawlea la documentación de tu producto y alimenta un chatbot que responda preguntas
- **Investigación**: extrae contenido de decenas de webs para análisis comparativo
- **Monitorización**: detecta cambios en webs de la competencia
- **Generación de datasets**: convierte webs en datos de entrenamiento para modelos

## Instalación

\`\`\`bash
pip install firecrawl-py
\`\`\`

Self-hosteable con Docker o usa su API cloud. El plan gratuito permite 500 páginas/mes.`,
    image_prompt: "Web pages being converted into clean structured data, HTML transforming into clean markdown text, fire/flame design element, purple data streams, dark tech background",
    replicable_with_code: "Con Claude Code puedes crear un scraper que use Playwright para renderizar webs con JavaScript y readability.js para extraer el contenido principal, obteniendo un resultado similar a Firecrawl para tus casos de uso específicos.",
  },
  {
    source: "github", source_id: "supabase/supabase", url: "https://github.com/supabase/supabase",
    name: "Supabase", stars: 100069, language: "TypeScript", author: "supabase", category_id: 6,
    difficulty: "facil", interest_score: 95, is_oss_alternative: true, alternative_to: "Firebase",
    tags: ["base-de-datos", "backend", "auth", "api", "postgresql"],
    seo_slug: "supabase-alternativa-firebase-open-source",
    seo_title: "Supabase: La alternativa open source a Firebase con PostgreSQL",
    seo_description: "Supabase ofrece base de datos PostgreSQL, autenticación, storage y API en tiempo real. Alternativa open source a Firebase con 100k estrellas.",
    summary_es: `Supabase es la alternativa open source a Firebase que ha conquistado al mundo del desarrollo web. En vez de la base de datos NoSQL de Firebase, Supabase usa PostgreSQL — una base de datos relacional seria y probada — y le añade todo lo que necesitas para construir una app moderna: autenticación, storage de archivos, funciones serverless, API REST y en tiempo real, todo listo para usar.

## Por qué la gente migra de Firebase a Supabase

Firebase (de Google) es potente pero tiene problemas que frustran:

- **NoSQL forzado**: Firestore te obliga a diseñar datos de formas extrañas. Con Supabase tienes SQL real
- **Vendor lock-in**: migrar de Firebase es una pesadilla. Con Supabase es PostgreSQL estándar
- **Pricing impredecible**: Firebase cobra por lecturas/escrituras, y la factura puede explotar. Supabase tiene pricing predecible
- **Queries limitadas**: en Firestore hacer un JOIN es imposible. En Supabase es un SQL normal

## Qué incluye

- **PostgreSQL**: base de datos relacional con toda su potencia (JOINs, triggers, funciones, extensiones)
- **Auth**: autenticación con email, magic links, OAuth (Google, GitHub, Apple...), SSO
- **Storage**: almacenamiento de archivos con políticas de acceso
- **Realtime**: suscríbete a cambios en la base de datos y recibe actualizaciones al instante
- **Edge Functions**: funciones serverless en Deno/TypeScript
- **API automática**: cada tabla genera automáticamente un endpoint REST y GraphQL
- **Vector store**: búsqueda semántica con pgvector para aplicaciones de IA

## Para quién es

- **Startups**: backend completo en minutos, plan gratuito generoso, escala cuando creces
- **Desarrolladores indie**: todo lo que necesitas para tu side project sin gestionar infraestructura
- **Equipos que vienen de Firebase**: migración a PostgreSQL sin perder velocidad de desarrollo
- **Aplicaciones con IA**: pgvector integrado para embeddings y búsqueda semántica

## Instalación

Self-hosteable con Docker o usa su plataforma cloud (plan gratuito con 500MB de DB y 1GB de storage).

\`\`\`bash
# Self-hosting
git clone https://github.com/supabase/supabase
cd supabase/docker
docker compose up -d
\`\`\``,
    image_prompt: "Modern database platform interface with connected services (auth, storage, realtime), PostgreSQL elephant logo stylized, purple connection lines, dark professional background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "neovim/neovim", url: "https://github.com/neovim/neovim",
    name: "Neovim", stars: 98127, language: "Vim Script", author: "neovim", category_id: 2,
    difficulty: "dificil", interest_score: 90, is_oss_alternative: true, alternative_to: "VS Code",
    tags: ["editor", "terminal", "vim", "desarrollo", "extensible"],
    seo_slug: "neovim-editor-codigo-terminal-extensible",
    seo_title: "Neovim: El editor de código en terminal que los desarrolladores adoran",
    seo_description: "Neovim es un editor de código ultrarrápido en terminal con ecosistema de plugins, LSP y IA. La evolución moderna de Vim con 98k estrellas.",
    summary_es: `Neovim es la evolución moderna de Vim — el editor de texto más eficiente jamás creado. Si alguna vez has visto a alguien editar código a una velocidad que parece sobrehumana, probablemente usaba Vim o Neovim. Es un editor de código que vive en el terminal, se controla enteramente con el teclado, y una vez que superas la curva de aprendizaje inicial, te hace exponencialmente más productivo.

## Por qué existe Neovim si ya existe Vim

Vim es legendario pero tiene problemas: código base antiguo y difícil de mantener, sin soporte nativo para ejecución asíncrona (los plugins bloqueaban el editor), y una comunidad que tenía dificultades para contribuir. Neovim es un fork que resuelve todo esto:

- **API extensible**: plugins pueden hacer cualquier cosa sin bloquear el editor
- **Lua nativo**: configura y extiende Neovim con Lua (mucho más limpio que Vimscript)
- **LSP integrado**: autocompletado, diagnósticos y navegación de código de primera clase
- **Terminal integrado**: terminal completo dentro del editor
- **Interfaz desacoplada**: GUIs externas pueden usar Neovim como backend

## El ecosistema que lo hace brillar

Lo que ha hecho explotar a Neovim es su ecosistema de plugins:

- **Telescope**: buscador fuzzy para archivos, texto, git, cualquier cosa
- **nvim-treesitter**: syntax highlighting inteligente basado en el AST del código
- **LSP config**: autocompletado y diagnósticos para cualquier lenguaje
- **lazy.nvim**: gestor de plugins ultrarrápido
- **nvim-cmp**: autocompletado con múltiples fuentes (LSP, snippets, paths, IA)
- **Copilot/Codeium**: IA integrada para sugerencias de código

Con estos plugins, Neovim compite directamente con VS Code en funcionalidad, pero consume una fracción de los recursos y es significativamente más rápido.

## La curva de aprendizaje: seamos honestos

Neovim NO es para todo el mundo. Los primeros días son frustrantes: no puedes seleccionar texto con el ratón, no sabes cómo salir del editor (literalmente el meme más famoso de programación), y cada acción requiere aprender un atajo de teclado. Pero si inviertes 2-3 semanas en aprenderlo, la productividad que ganas es real y medible.

## Instalación

\`\`\`bash
# macOS
brew install neovim

# Ubuntu/Debian
apt install neovim

# Windows
winget install Neovim.Neovim
\`\`\``,
    image_prompt: "Terminal code editor with syntax highlighted code, vim keybinding hints floating, split panes showing different files, purple terminal theme, dark developer workspace",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "fastapi/fastapi", url: "https://github.com/fastapi/fastapi",
    name: "FastAPI", stars: 96773, language: "Python", author: "fastapi", category_id: 2,
    difficulty: "facil", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["python", "api", "backend", "web", "async"],
    seo_slug: "fastapi-framework-python-apis-rapidas",
    seo_title: "FastAPI: El framework Python para crear APIs rápidas y modernas",
    seo_description: "FastAPI es el framework Python más popular para crear APIs REST. Rápido, con tipos, documentación automática y validación incluida.",
    summary_es: `FastAPI se ha convertido en el framework Python más popular para crear APIs, y hay buenas razones para ello. Combina la simplicidad de Python con rendimiento comparable a Node.js y Go, documentación automática que se genera sola, y validación de datos integrada que elimina bugs antes de que lleguen a producción.

## Por qué FastAPI ha desbancado a Flask y Django REST

- **Rendimiento**: gracias a Starlette y async/await, FastAPI es entre 5-10x más rápido que Flask
- **Tipos**: usa Pydantic para validar datos automáticamente con type hints de Python
- **Documentación automática**: genera Swagger UI y ReDoc sin escribir una línea de documentación
- **Autocompletado perfecto**: los editores entienden tu API y te ayudan con autocompletado real
- **Async nativo**: soporta async/await de forma natural, no como un añadido

## Ejemplo que habla por sí solo

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users")
async def create_user(user: User):
    return {"message": f"Usuario {user.name} creado", "user": user}
\`\`\`

Con esas 12 líneas tienes una API que:
- Valida que el body tenga name (string), email (string) y opcionalmente age (int)
- Devuelve error 422 automáticamente si los datos no son válidos
- Genera documentación interactiva en /docs
- Soporta peticiones asíncronas

## Cuándo usarlo

- **APIs REST y GraphQL**: el caso de uso principal
- **Microservicios**: rápido de arrancar, bajo consumo de recursos
- **Backend para apps de IA**: la mayoría de herramientas de ML están en Python
- **Webhooks**: recibir y procesar webhooks de servicios externos
- **MVPs rápidos**: de idea a API funcional en minutos

## Instalación

\`\`\`bash
pip install fastapi uvicorn
uvicorn main:app --reload
\`\`\``,
    image_prompt: "Python API framework visualization with endpoint routes, JSON data flowing, Swagger documentation interface, fast lightning bolt, purple code elements, dark developer background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "junegunn/fzf", url: "https://github.com/junegunn/fzf",
    name: "fzf", stars: 79188, language: "Go", author: "junegunn", category_id: 2,
    difficulty: "facil", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["cli", "búsqueda", "terminal", "productividad", "fuzzy"],
    seo_slug: "fzf-buscador-fuzzy-terminal",
    seo_title: "fzf: El buscador fuzzy que transforma tu experiencia en el terminal",
    seo_description: "fzf es un buscador fuzzy de línea de comandos que encuentra archivos, historial, procesos y cualquier cosa al instante. 79k estrellas.",
    summary_es: `fzf es una de esas herramientas de terminal que una vez que la pruebas, no puedes vivir sin ella. Es un buscador "fuzzy" — escribes unas pocas letras y encuentra lo que buscas al instante entre miles de opciones, tolerando errores de escritura.

## Para qué sirve en la práctica

### Buscar archivos
En vez de escribir la ruta completa de un archivo, pulsa \`Ctrl+T\` y escribe unas letras del nombre. fzf muestra coincidencias en tiempo real mientras escribes:

\`\`\`bash
# Escribes "compnav" y fzf encuentra:
# src/components/layout/Navigation.tsx
\`\`\`

### Buscar en el historial
Pulsa \`Ctrl+R\` y busca cualquier comando que hayas ejecutado:

\`\`\`bash
# Escribes "docker comp" y fzf muestra:
# docker compose up -d
# docker compose logs --tail 50
# docker compose restart web
\`\`\`

### Cambiar de directorio
\`\`\`bash
# Alt+C para buscar y navegar a cualquier directorio
\`\`\`

### Combinarlo con todo
fzf se puede combinar con cualquier comando que genere una lista:

\`\`\`bash
# Buscar y abrir un archivo en VS Code
code $(fzf)

# Kill un proceso por nombre
kill $(ps aux | fzf | awk '{print $2}')

# Checkout a una rama de Git
git checkout $(git branch | fzf)
\`\`\`

## Por qué cambia tu vida en el terminal

Sin fzf: recuerdas (o no) la ruta exacta, el nombre exacto del archivo, el comando exacto. Con fzf: escribes unas letras y lo encuentras. Es como tener Spotlight/Alfred pero en el terminal, para todo.

## Instalación

\`\`\`bash
# macOS
brew install fzf
$(brew --prefix)/opt/fzf/install

# Ubuntu
sudo apt install fzf
\`\`\``,
    image_prompt: "Terminal fuzzy finder searching through files and commands, real-time search results appearing, magnifying glass with code, purple highlighted matches, dark terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "netdata/netdata", url: "https://github.com/netdata/netdata",
    name: "Netdata", stars: 78291, language: "C", author: "netdata", category_id: 3,
    difficulty: "facil", interest_score: 91, is_oss_alternative: true, alternative_to: "Datadog",
    tags: ["monitorización", "self-hosted", "devops", "métricas", "dashboard"],
    seo_slug: "netdata-monitorizacion-servidores-tiempo-real",
    seo_title: "Netdata: Monitorización de servidores en tiempo real, gratis y bonita",
    seo_description: "Netdata monitoriza CPU, RAM, disco, red, procesos y servicios en tiempo real. Open source, se instala en 1 minuto, con dashboard espectacular.",
    summary_es: `Netdata es una herramienta de monitorización de servidores que te muestra en tiempo real qué está pasando en tu máquina con un nivel de detalle impresionante y un dashboard que es genuinamente bonito de ver.

## Lo que la hace especial

Mientras Uptime Kuma te dice SI tus servicios están vivos, Netdata te dice CÓMO están funcionando. CPU al 95%? Netdata te muestra qué proceso la está consumiendo. Disco lleno? Te muestra qué directorio está creciendo. Red saturada? Te muestra qué conexión está usando el ancho de banda.

## Qué monitoriza (todo, literalmente)

- **CPU**: uso por core, por proceso, temperaturas, frecuencias
- **Memoria**: RAM usada, caché, swap, por proceso
- **Disco**: lecturas/escrituras por segundo, IOPS, latencia, espacio por partición
- **Red**: ancho de banda por interfaz, conexiones activas, errores, paquetes
- **Procesos**: top procesos por CPU, RAM, I/O
- **Contenedores Docker**: métricas individuales por contenedor
- **Servicios**: MySQL, PostgreSQL, Redis, Nginx, Apache, systemd...
- **Hardware**: temperaturas, voltajes, ventiladores (si el hardware lo reporta)

## Instalación en 1 minuto (sin exagerar)

\`\`\`bash
curl https://get.netdata.cloud/kickstart.sh > /tmp/netdata-kickstart.sh && sh /tmp/netdata-kickstart.sh
\`\`\`

Abre \`http://tu-servidor:19999\` y ya tienes el dashboard corriendo con cientos de gráficas en tiempo real. Sin configurar nada.

## Por qué es mejor que Datadog para muchos casos

Datadog es el estándar enterprise pero cuesta 15-23$/host/mes. Para monitorizar tu servidor personal, tus 3 VPS, o la infraestructura de tu startup pequeña, pagar Datadog es absurdo. Netdata te da la misma (o más) información de forma gratuita.`,
    image_prompt: "Real-time server monitoring dashboard with CPU, RAM, disk and network graphs, beautiful data visualization, multiple metric panels, purple accent charts, dark monitoring interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "sherlock-project/sherlock", url: "https://github.com/sherlock-project/sherlock",
    name: "Sherlock", stars: 76797, language: "Python", author: "sherlock-project", category_id: 5,
    difficulty: "facil", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["osint", "seguridad", "investigación", "redes-sociales", "cli"],
    seo_slug: "sherlock-buscar-usuario-redes-sociales",
    seo_title: "Sherlock: Encuentra a cualquier persona en 400+ redes sociales por su username",
    seo_description: "Sherlock busca un nombre de usuario en más de 400 redes sociales simultáneamente. Herramienta OSINT open source con 76k estrellas.",
    summary_es: `Sherlock es una herramienta de OSINT (Open Source Intelligence) que dado un nombre de usuario, lo busca simultáneamente en más de 400 redes sociales y servicios online para encontrar en cuáles tiene cuenta. Escribes un username y en segundos sabes en qué plataformas existe esa persona.

## Cómo funciona

\`\`\`bash
sherlock nombreusuario
\`\`\`

Sherlock envía peticiones a más de 400 webs y comprueba si ese username existe. En segundos obtienes una lista de todos los perfiles encontrados con sus URLs directas.

## Para qué se usa

### Investigación legítima
- **Periodistas**: investigar fuentes o personajes públicos
- **Reclutadores**: verificar la presencia online de candidatos
- **Empresas**: auditar la huella digital de tu marca
- **Seguridad personal**: comprobar si alguien está suplantando tu identidad online

### Ciberseguridad
- **Pentest**: fase de reconocimiento en tests de penetración autorizados
- **Threat intelligence**: rastrear actores en foros y plataformas
- **Análisis de phishing**: investigar cuentas sospechosas

## Plataformas que comprueba

Instagram, Twitter/X, GitHub, Reddit, TikTok, YouTube, LinkedIn, Steam, Spotify, Pinterest, Telegram, Discord, Medium, y más de 380 servicios adicionales.

## Uso responsable

Sherlock es una herramienta de información pública — solo comprueba si un username existe en servicios públicos. No hackea nada, no accede a información privada. Pero como cualquier herramienta de investigación, debe usarse de forma ética y legal. No la uses para acosar, stalkerear o invadir la privacidad de nadie.

## Instalación

\`\`\`bash
pip install sherlock-project
sherlock nombreusuario
\`\`\``,
    image_prompt: "Digital detective magnifying glass scanning across multiple social media platform icons, search results appearing, OSINT investigation feel, purple detective theme, dark cyber background",
    replicable_with_code: "Con Claude Code puedes crear tu propio buscador de usernames adaptado a las plataformas que te interesen, con verificación más profunda y exportación a formatos personalizados.",
  },
  {
    source: "github", source_id: "jesseduffield/lazygit", url: "https://github.com/jesseduffield/lazygit",
    name: "lazygit", stars: 75458, language: "Go", author: "jesseduffield", category_id: 2,
    difficulty: "facil", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["git", "terminal", "cli", "desarrollo", "productividad"],
    seo_slug: "lazygit-git-interfaz-terminal",
    seo_title: "lazygit: Git con interfaz visual en el terminal — sin memorizar comandos",
    seo_description: "lazygit es una interfaz visual para Git en el terminal. Commits, branches, merges, rebases y resolución de conflictos sin memorizar comandos.",
    summary_es: `lazygit es una interfaz de usuario para Git que corre en el terminal y hace que gestionar repositorios sea visual e intuitivo, sin tener que memorizar docenas de comandos. Ves los cambios, los staged files, las ramas, los commits, todo en paneles organizados que navegas con el teclado.

## El problema que resuelve

Git es potente pero su interfaz de línea de comandos es hostil. Para hacer un rebase interactivo necesitas saber \`git rebase -i HEAD~5\`, editar un archivo temporal con comandos crípticos (\`pick\`, \`squash\`, \`fixup\`), y rezar para no romper nada. Con lazygit, seleccionas los commits con las flechas y eliges la acción con una tecla.

## Qué puedes hacer

- **Staging selectivo**: añade líneas individuales o hunks al staging area, no archivos enteros
- **Commits**: escribe mensajes y haz commit sin salir de la interfaz
- **Branches**: crea, cambia, fusiona y elimina ramas visualmente
- **Rebase interactivo**: reordena, squashea y edita commits arrastrando
- **Resolución de conflictos**: ve los conflictos lado a lado y elige qué versión mantener
- **Stash**: guarda y recupera cambios pendientes
- **Log visual**: historial de commits con gráfico de ramas en ASCII
- **Cherry-pick**: selecciona commits específicos de otras ramas
- **Push/Pull**: sincroniza con el remoto

## La experiencia de uso

Imagina tener el panel de Git de VS Code pero en el terminal, más rápido, más completo, y con atajos de teclado para todo. Eso es lazygit. Los paneles muestran:

- **Izquierda**: archivos modificados, staged, untracked
- **Derecha**: diff del archivo seleccionado
- **Abajo**: log de commits con gráfico de ramas
- **Menú de acciones**: pulsa \`?\` para ver todos los atajos disponibles

## Instalación

\`\`\`bash
# macOS
brew install lazygit

# Ubuntu (PPA)
sudo add-apt-repository ppa:lazygit-team/release
sudo apt install lazygit

# Go
go install github.com/jesseduffield/lazygit@latest
\`\`\`

Abre un terminal en cualquier repo git, escribe \`lazygit\`, y disfruta.`,
    image_prompt: "Terminal Git interface showing file changes, commit history graph, branch visualization, split pane diff view, purple highlighted UI elements, dark terminal developer workspace",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "strapi/strapi", url: "https://github.com/strapi/strapi",
    name: "Strapi", stars: 71754, language: "TypeScript", author: "strapi", category_id: 2,
    difficulty: "facil", interest_score: 89, is_oss_alternative: true, alternative_to: "Contentful",
    tags: ["cms", "headless", "api", "contenido", "backend"],
    seo_slug: "strapi-cms-headless-open-source",
    seo_title: "Strapi: El CMS headless open source más popular del mundo",
    seo_description: "Strapi es un CMS headless que genera APIs automáticamente. Crea tu backend de contenido sin código. Alternativa open source a Contentful.",
    summary_es: `Strapi es un CMS headless open source que te permite crear tu propio backend de contenido con una interfaz visual, sin escribir código. Defines tus tipos de contenido (artículos, productos, categorías, lo que necesites), y Strapi genera automáticamente la API REST y GraphQL para consumirlos desde tu frontend.

## Qué es un CMS headless (y por qué lo necesitas)

Un CMS tradicional (como WordPress) mezcla el contenido con la presentación. Un CMS headless separa ambos: tú gestionas el contenido en Strapi, y lo consumes desde cualquier frontend — React, Vue, Next.js, una app móvil, o incluso múltiples plataformas simultáneamente.

## Cómo funciona

1. **Defines tu estructura**: en el panel de admin, creas tipos de contenido (ej: "Artículo" con campos título, contenido, imagen, categoría)
2. **Añades contenido**: tus editores crean y gestionan contenido con un editor visual WYSIWYG
3. **Consumes la API**: tu frontend llama a la API REST o GraphQL que Strapi genera automáticamente

## Por qué es mejor que Contentful para muchos

Contentful (el CMS headless de pago más conocido) cuesta desde 300$/mes y tiene límites de contenido. Strapi es gratuito, self-hosteable, y sin límites. La diferencia es que tú gestionas la infraestructura.

## Casos de uso

- **Blogs y webs de contenido**: gestiona artículos, autores, categorías con API automática
- **E-commerce**: catálogo de productos con campos personalizados
- **Apps móviles**: backend de contenido para iOS y Android simultáneamente
- **Landing pages**: permite a marketing editar contenido sin tocar código
- **Documentación**: wikis y centros de ayuda con API para buscar

## Instalación

\`\`\`bash
npx create-strapi@latest my-project
cd my-project
npm run develop
\`\`\`

En 2 minutos tienes el panel de administración corriendo en \`localhost:1337/admin\`.`,
    image_prompt: "Headless CMS admin panel with content types, API endpoints flowing to multiple frontends (web, mobile, TV), content management interface, purple connection lines, dark professional background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "caddyserver/caddy", url: "https://github.com/caddyserver/caddy",
    name: "Caddy", stars: 71230, language: "Go", author: "caddyserver", category_id: 3,
    difficulty: "facil", interest_score: 88, is_oss_alternative: true, alternative_to: "Nginx",
    tags: ["web-server", "https", "proxy", "self-hosted", "devops"],
    seo_slug: "caddy-servidor-web-https-automatico",
    seo_title: "Caddy: El servidor web con HTTPS automático que simplifica todo",
    seo_description: "Caddy es un servidor web moderno con HTTPS automático via Let's Encrypt. Alternativa a Nginx más fácil de configurar. 71k estrellas.",
    summary_es: `Caddy es un servidor web moderno que hace algo que Nginx y Apache nunca consiguieron hacer bien: HTTPS automático sin configuración. Le dices tu dominio, Caddy obtiene el certificado de Let's Encrypt automáticamente, lo renueva solo, y sirve tu web con HTTPS. Sin editar archivos de configuración crípticos, sin cron jobs para renovar certificados, sin errores de SSL.

## Por qué la gente está dejando Nginx por Caddy

La configuración de Nginx es notoriamente difícil. Configurar un reverse proxy con HTTPS en Nginx requiere 30+ líneas de configuración, instalar Certbot, configurar un cron para renovar certificados, y debugging cuando algo falla.

Con Caddy, la misma configuración es:

\`\`\`
midominio.com {
    reverse_proxy localhost:3000
}
\`\`\`

Dos líneas. HTTPS automático incluido.

## Funcionalidades principales

- **HTTPS automático**: obtiene y renueva certificados de Let's Encrypt sin configurar nada
- **Reverse proxy**: redirige tráfico a tus aplicaciones backend
- **File server**: sirve archivos estáticos con alta performance
- **Load balancing**: distribuye tráfico entre múltiples backends
- **Compresión**: gzip y zstd automático
- **HTTP/3**: soporte nativo para el protocolo más moderno
- **Configuración recargable**: cambia la config sin reiniciar el servidor

## Cuándo elegir Caddy vs Nginx

**Elige Caddy si**: quieres simplicidad, HTTPS sin dolor, y no necesitas exprimir cada milisegundo de rendimiento.

**Elige Nginx si**: necesitas el rendimiento absoluto máximo para millones de peticiones por segundo, o necesitas módulos específicos de Nginx.

Para el 95% de webs y aplicaciones, Caddy es la mejor opción.

## Instalación

\`\`\`bash
# macOS
brew install caddy

# Ubuntu/Debian
sudo apt install caddy

# Docker
docker run -p 80:80 -p 443:443 caddy
\`\`\``,
    image_prompt: "Modern web server with automatic HTTPS lock icon, SSL certificate flowing automatically, reverse proxy arrows directing traffic, purple security elements, dark server infrastructure background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "OpenHands/OpenHands", url: "https://github.com/OpenHands/OpenHands",
    name: "OpenHands", stars: 70437, language: "Python", author: "OpenHands", category_id: 1,
    difficulty: "medio", interest_score: 92, is_oss_alternative: true, alternative_to: "Devin AI",
    tags: ["ia", "agente", "desarrollo", "código", "automatización"],
    seo_slug: "openhands-agente-ia-desarrollo-software",
    seo_title: "OpenHands: Agente de IA open source que escribe código como un desarrollador",
    seo_description: "OpenHands (antes OpenDevin) es un agente de IA que navega, codifica, ejecuta comandos y resuelve issues de GitHub autónomamente. 70k estrellas.",
    summary_es: `OpenHands (anteriormente conocido como OpenDevin) es un agente de inteligencia artificial open source que actúa como un desarrollador de software autónomo. Puede navegar por la web, escribir código, ejecutar comandos en el terminal, gestionar archivos, y resolver issues de GitHub — todo de forma autónoma.

## Qué lo hace diferente a un chatbot de código

ChatGPT o Claude pueden generar código, pero tú tienes que copiarlo, pegarlo, ejecutarlo, depurarlo, y volver a preguntar si falla. OpenHands ejecuta directamente: tiene acceso a un sandbox con terminal, sistema de archivos y navegador. Escribe el código, lo ejecuta, ve el error, lo corrige, y repite hasta que funciona.

## Capacidades

- **Escribe código**: crea archivos, funciones, tests, documentación
- **Ejecuta comandos**: instala dependencias, corre tests, compila proyectos
- **Navega por la web**: lee documentación, busca información, consulta APIs
- **Gestiona repos**: crea branches, hace commits, abre pull requests
- **Resuelve issues**: le das un issue de GitHub y produce un fix funcional
- **Depura**: ejecuta el código, lee los errores, y los corrige iterativamente

## Para qué es útil de verdad

- **Resolver bugs**: dale un issue con la descripción del bug y genera un fix
- **Implementar features sencillas**: "añade un endpoint POST /users que valide email"
- **Refactoring**: "migra estos componentes de class a functional components"
- **Tests**: "escribe tests unitarios para todos los métodos de UserService"
- **Documentación**: "genera JSDoc para todas las funciones exportadas"

## Limitaciones honestas

No es un reemplazo para un desarrollador senior. Funciona bien con tareas bien definidas y acotadas. Para arquitectura, decisiones de diseño, o problemas complejos que requieren entender el contexto del negocio, sigue necesitando un humano.

## Instalación

\`\`\`bash
docker run -it --rm -p 3000:3000 ghcr.io/openhands/openhands:latest
\`\`\``,
    image_prompt: "AI agent robot sitting at a developer desk with terminal, browser and code editor open, autonomously writing code, purple AI glow, dark futuristic developer workspace",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "nektos/act", url: "https://github.com/nektos/act",
    name: "act", stars: 69680, language: "Go", author: "nektos", category_id: 2,
    difficulty: "facil", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["github-actions", "ci", "devops", "testing", "local"],
    seo_slug: "act-github-actions-en-local",
    seo_title: "act: Ejecuta tus GitHub Actions en local sin hacer push",
    seo_description: "act te permite ejecutar GitHub Actions workflows localmente. Prueba tu CI/CD sin hacer push ni esperar runners. 69k estrellas.",
    summary_es: `act te permite ejecutar tus workflows de GitHub Actions en tu ordenador local, sin necesidad de hacer push al repo y esperar a que los runners de GitHub los ejecuten. Cambias tu workflow, ejecutas \`act\`, y en segundos sabes si funciona.

## El problema que resuelve

El ciclo de depuración de GitHub Actions es doloroso:
1. Cambias algo en el archivo .yml
2. Haces commit y push
3. Esperas 1-3 minutos a que un runner se asigne
4. Esperas 2-10 minutos a que el workflow se ejecute
5. Falla por un error tonto
6. Vuelves al paso 1

Con act, el ciclo es: cambias el .yml, ejecutas \`act\`, ves el resultado en segundos.

## Cómo funciona

act usa Docker para simular los runners de GitHub Actions localmente. Lee tu archivo \`.github/workflows/*.yml\` y ejecuta cada step en contenedores Docker que replican el entorno de GitHub.

\`\`\`bash
# Ejecutar el workflow por defecto (push event)
act

# Ejecutar un workflow específico
act -W .github/workflows/test.yml

# Ejecutar solo un job específico
act -j test

# Simular un pull_request event
act pull_request
\`\`\`

## Cuándo es imprescindible

- **Desarrollando workflows nuevos**: pruebas cada cambio al instante
- **Debugging de CI que falla**: reproduce el error localmente
- **Workflows complejos**: con múltiples jobs, matrices, conditions
- **Sin internet**: puedes trabajar en tu CI offline

## Instalación

\`\`\`bash
# macOS
brew install act

# Linux
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
\`\`\``,
    image_prompt: "GitHub Actions workflow running locally on a laptop, CI/CD pipeline visualization in terminal, Docker containers executing steps, purple automation elements, dark developer background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "meilisearch/meilisearch", url: "https://github.com/meilisearch/meilisearch",
    name: "Meilisearch", stars: 56916, language: "Rust", author: "meilisearch", category_id: 6,
    difficulty: "facil", interest_score: 90, is_oss_alternative: true, alternative_to: "Algolia",
    tags: ["búsqueda", "base-de-datos", "api", "self-hosted", "rust"],
    seo_slug: "meilisearch-motor-busqueda-instantanea",
    seo_title: "Meilisearch: Motor de búsqueda instantánea, open source y fácil de usar",
    seo_description: "Meilisearch es un motor de búsqueda ultrarrápido con tolerancia a typos, filtros y facetas. Alternativa open source a Algolia. 56k estrellas.",
    summary_es: `Meilisearch es un motor de búsqueda instantánea que puedes añadir a cualquier aplicación. Escribe una consulta y los resultados aparecen al instante — literalmente en milisegundos — con tolerancia a errores de escritura, filtros, facetas y ordenación relevante.

## Por qué necesitas un motor de búsqueda dedicado

La búsqueda con \`LIKE '%término%'\` en SQL es lenta, no tolera typos, no ordena por relevancia, y no soporta búsqueda facetada. Meilisearch resuelve todo esto:

- **Instantáneo**: resultados en <50ms incluso con millones de documentos
- **Typo-tolerant**: busca "iphon" y encuentra "iPhone"
- **Relevancia**: los resultados más relevantes primero, no los más recientes
- **Filtros y facetas**: filtra por categoría, precio, fecha... combinable con la búsqueda
- **Highlighting**: resalta las coincidencias en los resultados
- **Sinónimos**: configura que "portátil" = "laptop" = "notebook"

## Ejemplo rápido

\`\`\`bash
# Indexar datos
curl -X POST 'http://localhost:7700/indexes/products/documents' \\
  -H 'Content-Type: application/json' \\
  --data-binary @products.json

# Buscar
curl 'http://localhost:7700/indexes/products/search?q=auriculares+bluetooth'
\`\`\`

Respuesta en milisegundos con resultados relevantes, incluso si escribiste "auriculres" en vez de "auriculares".

## Meilisearch vs Algolia

Algolia es el servicio de búsqueda más conocido pero cuesta desde 35$/mes y el precio sube rápido con el volumen. Meilisearch es gratuito, self-hosteable, y el rendimiento es comparable para la mayoría de casos de uso.

## Instalación

\`\`\`bash
# Docker (recomendado)
docker run -p 7700:7700 getmeili/meilisearch

# macOS
brew install meilisearch
\`\`\``,
    image_prompt: "Instant search engine with search bar showing results appearing in real-time as user types, faceted filters on the side, typo tolerance visualization, purple search elements, dark tech background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "go-gitea/gitea", url: "https://github.com/go-gitea/gitea",
    name: "Gitea", stars: 54685, language: "Go", author: "go-gitea", category_id: 3,
    difficulty: "facil", interest_score: 89, is_oss_alternative: true, alternative_to: "GitHub",
    tags: ["git", "self-hosted", "código", "devops", "colaboración"],
    seo_slug: "gitea-github-self-hosted",
    seo_title: "Gitea: Tu propio GitHub self-hosted, ligero y gratuito",
    seo_description: "Gitea es un servidor Git self-hosted con interfaz tipo GitHub. Issues, PRs, CI/CD, wiki y packages. Consume mínimos recursos. 54k estrellas.",
    summary_es: `Gitea es un servicio Git self-hosted que te da tu propio "GitHub" en tu servidor. Con una interfaz familiar (muy parecida a GitHub), incluye repositorios, issues, pull requests, wiki, CI/CD integrado (Gitea Actions), registro de paquetes, y gestión de proyectos.

## Por qué self-hostear tu Git

- **Privacidad**: tu código no está en servidores de Microsoft (GitHub) ni Atlassian (Bitbucket)
- **Control**: tú decides las políticas, límites, y quién tiene acceso
- **Coste**: GitHub Teams cuesta 4$/usuario/mes. Gitea es gratis sin límite de usuarios
- **Compliance**: para empresas que necesitan que el código no salga de su infraestructura
- **Sin dependencia**: si GitHub cae (ha pasado), tu trabajo sigue disponible

## Lo que incluye

- **Repositorios Git**: push, pull, branches, tags, releases — como en GitHub
- **Issues y pull requests**: con labels, milestones, asignados, reviews
- **CI/CD**: Gitea Actions es compatible con el formato de GitHub Actions
- **Wiki**: documentación por repositorio
- **Packages**: registro de paquetes (npm, Docker, Maven, PyPI, etc.)
- **Organizaciones y equipos**: gestión de permisos por grupo

## Por qué Gitea y no GitLab

GitLab es más completo pero es un monstruo de recursos: necesita 4-8GB de RAM mínimo. Gitea funciona con 256MB de RAM. Para equipos pequeños y medianos, Gitea da todo lo que necesitas sin el peso de GitLab.

## Instalación

\`\`\`bash
docker run -d -p 3000:3000 -p 2222:22 \\
  -v gitea-data:/data \\
  gitea/gitea:latest
\`\`\`

En 1 minuto tienes tu propio GitHub corriendo.`,
    image_prompt: "Self-hosted Git platform interface showing repositories, pull requests, issues list, Git branch graph, purple GitHub-like design, dark professional background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "laurent22/joplin", url: "https://github.com/laurent22/joplin",
    name: "Joplin", stars: 54186, language: "TypeScript", author: "laurent22", category_id: 8,
    difficulty: "facil", interest_score: 87, is_oss_alternative: true, alternative_to: "Evernote",
    tags: ["notas", "markdown", "privacidad", "self-hosted", "multiplataforma"],
    seo_slug: "joplin-notas-privadas-alternativa-evernote",
    seo_title: "Joplin: Notas privadas en markdown, alternativa open source a Evernote",
    seo_description: "Joplin es una app de notas open source con markdown, cifrado end-to-end y sincronización. Alternativa a Evernote que respeta tu privacidad.",
    summary_es: `Joplin es una aplicación de notas y tareas open source que prioriza la privacidad. Soporta markdown, cifrado end-to-end, sincronización entre dispositivos (Dropbox, OneDrive, Nextcloud, o tu propio servidor), y está disponible en Windows, Mac, Linux, Android e iOS.

## Por qué la gente deja Evernote por Joplin

Evernote fue la app de notas referencia durante años, pero ha ido cuesta abajo:
- Subió precios mientras eliminaba funciones del plan gratuito
- Limitó el número de dispositivos conectados
- Cambió de dueños varias veces, generando incertidumbre
- El editor se ha vuelto pesado y lento

Joplin ofrece todo lo que Evernote hacía bien, con markdown nativo, cifrado real, y sin pagar.

## Funcionalidades

- **Editor markdown**: con vista previa en tiempo real, LaTeX, y plugins
- **Notebooks y tags**: organiza notas en cuadernos y etiquetas
- **Cifrado end-to-end**: tus notas se cifran antes de sincronizar — ni el servicio de sync puede leerlas
- **Sincronización flexible**: Dropbox, OneDrive, Nextcloud, WebDAV, S3, o Joplin Cloud
- **Web clipper**: extensión de navegador para guardar páginas web como notas
- **Búsqueda avanzada**: busca en todas tus notas al instante
- **Adjuntos**: imágenes, PDFs, archivos de cualquier tipo
- **To-do lists**: checkboxes integradas en notas, con alarmas
- **Plugins**: ecosistema de plugins para extender funcionalidades
- **Import**: importa desde Evernote, markdown, HTML

## Para quién es

- Usuarios de Evernote que quieren privacidad y control
- Personas que escriben en markdown y quieren una app que lo soporte nativamente
- Cualquiera que quiera notas sincronizadas entre dispositivos sin depender de servicios de terceros

## Instalación

Descarga desde joplinapp.org para cualquier plataforma. La sincronización se configura en 2 minutos con tu servicio de nube preferido.`,
    image_prompt: "Note-taking app with markdown editor, organized notebooks sidebar, encrypted sync between devices, privacy lock icon, purple notebook design, dark elegant interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "Mintplex-Labs/anything-llm", url: "https://github.com/Mintplex-Labs/anything-llm",
    name: "AnythingLLM", stars: 57429, language: "JavaScript", author: "Mintplex-Labs", category_id: 1,
    difficulty: "facil", interest_score: 91, is_oss_alternative: true, alternative_to: "ChatGPT Teams",
    tags: ["ia", "rag", "chatbot", "self-hosted", "documentos"],
    seo_slug: "anythingllm-chatbot-ia-privado-documentos",
    seo_title: "AnythingLLM: Chatbot de IA privado que habla con tus documentos",
    seo_description: "AnythingLLM es un chatbot de IA que consulta tus PDFs, webs y archivos. 100% privado, multi-modelo, con interfaz de usuario elegante.",
    summary_es: `AnythingLLM es la forma más fácil de tener un chatbot de IA privado que puede consultar tus documentos. Subes PDFs, archivos de texto, webs, o cualquier contenido, y AnythingLLM crea un asistente que responde preguntas basándose en esa información. Todo ejecutándose en tu ordenador o servidor, sin enviar datos a la nube.

## Por qué es diferente a simplemente chatear con ChatGPT

ChatGPT no conoce tus documentos internos. Si le preguntas "¿cuál es nuestra política de vacaciones?", no puede saberlo. AnythingLLM sí, porque has subido el manual de empresa y la IA lo consulta cuando respondes.

Esto se llama RAG (Retrieval Augmented Generation) y AnythingLLM lo hace extraordinariamente fácil:

1. Subes documentos (arrastrar y soltar)
2. AnythingLLM los indexa automáticamente
3. Preguntas en lenguaje natural
4. La IA responde basándose en tus documentos, citando las fuentes

## Lo que lo hace especial

- **Interfaz elegante**: no parece un proyecto open source — tiene la calidad visual de un producto SaaS
- **Multi-modelo**: funciona con OpenAI, Anthropic, Ollama, LM Studio, o cualquier API compatible
- **100% privado**: con modelos locales (Ollama), nada sale de tu ordenador
- **Multi-workspace**: crea espacios separados con diferentes documentos (uno para RRHH, otro para producto, otro para legal)
- **Agentes**: no solo responde preguntas — puede ejecutar acciones, buscar en web, y usar herramientas
- **Multi-usuario**: gestión de permisos para equipos
- **Embeddable**: widget de chat que puedes incrustar en tu web

## Casos de uso reales

- **Base de conocimiento interna**: sube manuales, procesos, políticas → los empleados preguntan en natural
- **Soporte al cliente**: sube FAQs y documentación → chatbot que responde consultas
- **Análisis de documentos**: sube contratos o informes → haz preguntas específicas sobre ellos
- **Investigación**: sube papers y artículos → resume y compara información

## Instalación

\`\`\`bash
docker pull mintplexlabs/anythingllm
docker run -d -p 3001:3001 mintplexlabs/anythingllm
\`\`\`

También tiene app de escritorio descargable para Windows, Mac y Linux si no quieres usar Docker.`,
    image_prompt: "AI chatbot interface with document upload area, conversation showing answers from uploaded PDFs, knowledge base visualization, private lock icon, purple AI elements, dark professional interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "sharkdp/bat", url: "https://github.com/sharkdp/bat",
    name: "bat", stars: 57923, language: "Rust", author: "sharkdp", category_id: 2,
    difficulty: "facil", interest_score: 85, is_oss_alternative: true, alternative_to: "cat (Unix)",
    tags: ["cli", "terminal", "rust", "productividad", "código"],
    seo_slug: "bat-cat-con-syntax-highlighting",
    seo_title: "bat: El comando cat mejorado con syntax highlighting y Git integration",
    seo_description: "bat es un clon de cat(1) con syntax highlighting, números de línea e integración con Git. Escrito en Rust. 57k estrellas.",
    summary_es: `bat es un reemplazo moderno para el comando \`cat\` de Unix que añade syntax highlighting automático, números de línea e integración con Git. Es como cat pero bonito — cada vez que muestras un archivo en el terminal, lo ves con colores, formateado y con indicadores de qué líneas han cambiado.

## Antes vs después

**Con cat:**
\`\`\`
$ cat script.py
import os
def main():
    path = os.getcwd()
    print(f"Current dir: {path}")
\`\`\`

**Con bat:**
El mismo archivo pero con syntax highlighting de Python, números de línea, separadores visuales, y marcas de Git indicando qué líneas son nuevas o modificadas. La diferencia es dramática.

## Funcionalidades

- **Syntax highlighting**: soporta cientos de lenguajes automáticamente (detecta el tipo de archivo)
- **Números de línea**: siempre visibles, configurables
- **Integración con Git**: marca líneas añadidas, modificadas y eliminadas
- **Paginación automática**: si el archivo es más largo que la pantalla, usa less/more
- **Temas**: múltiples temas de color (incluyendo los de VS Code)
- **Compatible con cat**: puedes hacer \`alias cat=bat\` y usarlo como reemplazo directo

## Instalación

\`\`\`bash
# macOS
brew install bat

# Ubuntu
sudo apt install bat
# nota: en Ubuntu se instala como "batcat" por conflicto de nombres

# Cargo (cualquier plataforma)
cargo install bat
\`\`\`

Después de instalarlo, muchos desarrolladores hacen \`alias cat=bat\` en su shell y nunca miran atrás.`,
    image_prompt: "Terminal showing file content with colorful syntax highlighting, line numbers, Git diff markers, before/after comparison with plain text, purple code theme, dark terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "BurntSushi/ripgrep", url: "https://github.com/BurntSushi/ripgrep",
    name: "ripgrep", stars: 61782, language: "Rust", author: "BurntSushi", category_id: 2,
    difficulty: "facil", interest_score: 88, is_oss_alternative: true, alternative_to: "grep",
    tags: ["cli", "búsqueda", "terminal", "rust", "productividad"],
    seo_slug: "ripgrep-busqueda-texto-rapida",
    seo_title: "ripgrep: Búsqueda de texto recursiva ultrarrápida (grep pero 10x más rápido)",
    seo_description: "ripgrep (rg) busca texto en archivos recursivamente más rápido que grep, ag o ack. Respeta .gitignore automáticamente. 61k estrellas.",
    summary_es: `ripgrep (comando \`rg\`) es una herramienta de búsqueda de texto que hace lo mismo que grep pero es significativamente más rápida — en muchos benchmarks es 2-10x más veloz que grep, ag (the silver searcher) o ack. Y no es solo velocidad: es más inteligente.

## Por qué es mejor que grep

- **Más rápido**: usa Rust y estrategias de búsqueda optimizadas
- **Respeta .gitignore**: automáticamente ignora archivos que están en .gitignore, node_modules, .git, etc.
- **Búsqueda recursiva por defecto**: no necesitas \`-r\`, busca en subdirectorios automáticamente
- **Unicode correcto**: maneja acentos y caracteres especiales bien
- **Syntax highlighting**: resalta las coincidencias en color

## Uso diario

\`\`\`bash
# Buscar "useState" en todo el proyecto
rg "useState"

# Buscar solo en archivos TypeScript
rg "useState" -t ts

# Buscar ignorando mayúsculas
rg -i "error"

# Buscar y reemplazar (con confirmación)
rg "oldFunction" --files-with-matches | xargs sed -i 's/oldFunction/newFunction/g'
\`\`\`

## Por qué lo usan millones de desarrolladores

Es una de esas herramientas que una vez que la pruebas, no vuelves a grep. Es más rápida, más inteligente con los archivos que ignora, y la salida es más legible. VS Code, Helix y muchos otros editores usan ripgrep internamente para su función de "buscar en archivos".

## Instalación

\`\`\`bash
# macOS
brew install ripgrep

# Ubuntu
sudo apt install ripgrep

# Cargo
cargo install ripgrep
\`\`\``,
    image_prompt: "Terminal search results with highlighted text matches across multiple files, recursive directory search visualization, speed bolt icon, purple search highlights, dark terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "infiniflow/ragflow", url: "https://github.com/infiniflow/ragflow",
    name: "RAGFlow", stars: 76909, language: "Python", author: "infiniflow", category_id: 1,
    difficulty: "medio", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "rag", "documentos", "self-hosted", "agentes"],
    seo_slug: "ragflow-motor-rag-open-source",
    seo_title: "RAGFlow: El motor RAG open source que entiende documentos complejos",
    seo_description: "RAGFlow es un motor RAG que procesa PDFs, tablas, imágenes y documentos complejos con precisión. OCR integrado y agentes. 76k estrellas.",
    summary_es: `RAGFlow es un motor de Retrieval-Augmented Generation (RAG) open source diseñado para entender documentos complejos — no solo texto plano, sino PDFs con tablas, imágenes, gráficos, layouts multi-columna y documentos escaneados. Es la solución para cuando necesitas que una IA entienda TUS documentos con precisión.

## El problema del RAG genérico

La mayoría de herramientas RAG tratan los documentos como texto plano. Pero los documentos reales tienen:
- Tablas con datos que pierden estructura al convertirse a texto
- Imágenes con información relevante
- Headers, footers y sidebars que confunden la extracción
- Layouts complejos (dos columnas, cajas laterales)
- PDFs escaneados que necesitan OCR

RAGFlow resuelve esto con un pipeline de procesamiento de documentos sofisticado que entiende la estructura visual del documento.

## Funcionalidades clave

- **Deep document understanding**: entiende la estructura visual de PDFs complejos
- **OCR integrado**: procesa documentos escaneados automáticamente
- **Extracción de tablas**: mantiene la estructura de tablas, no las aplana a texto
- **Chunking inteligente**: divide documentos respetando la estructura semántica
- **Multi-modelo**: compatible con OpenAI, Anthropic, Ollama, modelos locales
- **Agentes**: no solo busca y responde — puede ejecutar acciones complejas
- **Citación precisa**: cada respuesta incluye la fuente exacta (documento, página, párrafo)
- **Interfaz web completa**: upload de documentos, chat, gestión de bases de conocimiento

## Ideal para

- **Empresas con documentación técnica**: manuales, fichas técnicas, normativas
- **Legal**: contratos, regulaciones, jurisprudencia
- **Finanzas**: informes financieros, balances, memorias anuales
- **Investigación**: papers, estudios, informes con gráficos y tablas

## Instalación

\`\`\`bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow
docker compose up -d
\`\`\``,
    image_prompt: "AI processing complex documents with tables, images and multi-column layouts, document understanding visualization, knowledge extraction flow, purple AI processing elements, dark tech background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "logseq/logseq", url: "https://github.com/logseq/logseq",
    name: "Logseq", stars: 41812, language: "Clojure", author: "logseq", category_id: 8,
    difficulty: "facil", interest_score: 87, is_oss_alternative: true, alternative_to: "Roam Research",
    tags: ["notas", "knowledge-management", "grafos", "privacidad", "markdown"],
    seo_slug: "logseq-notas-con-grafos-privacidad",
    seo_title: "Logseq: Notas interconectadas con grafos, privacidad total y open source",
    seo_description: "Logseq es una herramienta de knowledge management con grafos de conocimiento y privacidad total. Alternativa open source a Roam Research.",
    summary_es: `Logseq es una herramienta de gestión de conocimiento personal que organiza tus notas como un grafo interconectado. En vez de carpetas jerárquicas (como Notion o Evernote), cada nota se vincula bidireccionalmente con otras, creando una red de conocimiento que refleja cómo piensa realmente tu cerebro.

## El concepto de notas interconectadas

En un sistema de notas tradicional, creas un documento y lo metes en una carpeta. Si ese documento es relevante para dos temas, tienes que duplicarlo o elegir una carpeta. Con Logseq, cada bloque de texto puede vincularse a otros bloques en cualquier nota, y esas conexiones son bidireccionales.

Ejemplo: escribes una nota sobre un libro. Mencionas un concepto que también aparece en otra nota de un proyecto. Logseq automáticamente detecta esa conexión y te la muestra. Con el tiempo, tu base de conocimiento se convierte en un grafo donde descubres conexiones que no habías visto.

## Funcionalidades principales

- **Bidirectional links**: cada mención crea un link bidireccional automáticamente
- **Grafo de conocimiento**: visualización visual de todas las conexiones entre tus notas
- **Outliner**: cada nota es una estructura jerárquica de bloques (como Workflowy)
- **Journal diario**: cada día tiene una página donde capturas ideas, tareas y notas rápidas
- **Local-first**: todo se guarda en archivos markdown en tu disco duro
- **Queries avanzadas**: busca y filtra notas con queries programáticas
- **Flashcards**: crea tarjetas de estudio directamente desde tus notas (spaced repetition)
- **Plugins**: ecosistema de plugins para extender funcionalidades
- **Whiteboard**: pizarra visual integrada para mapas mentales

## Logseq vs Obsidian

Ambos son herramientas de PKM (Personal Knowledge Management) con archivos locales. La diferencia principal: Logseq es un outliner (cada bloque es una unidad) mientras que Obsidian es un editor de documentos largos. Logseq es open source; Obsidian no.

Si piensas en bloques y bullets, Logseq. Si piensas en documentos largos, Obsidian.

## Instalación

Descarga desde logseq.com para Windows, Mac, Linux, Android e iOS. Tus datos se guardan como archivos markdown locales — sin cloud obligatoria.`,
    image_prompt: "Knowledge graph visualization with interconnected notes as nodes, bidirectional links between concepts, journal view with daily notes, purple graph connections, dark knowledge management interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "metabase/metabase", url: "https://github.com/metabase/metabase",
    name: "Metabase", stars: 46721, language: "Clojure", author: "metabase", category_id: 6,
    difficulty: "facil", interest_score: 90, is_oss_alternative: true, alternative_to: "Tableau / Power BI",
    tags: ["analytics", "dashboard", "base-de-datos", "bi", "self-hosted"],
    seo_slug: "metabase-business-intelligence-open-source",
    seo_title: "Metabase: Business Intelligence open source que cualquiera puede usar",
    seo_description: "Metabase conecta tu base de datos y crea dashboards sin saber SQL. Alternativa open source a Tableau y Power BI. Self-hosteable. 46k estrellas.",
    summary_es: `Metabase es una herramienta de business intelligence open source que permite a cualquier persona — sin saber SQL — hacer preguntas a tu base de datos y crear dashboards con gráficos. Conectas tu PostgreSQL, MySQL o cualquier base de datos, y Metabase genera una interfaz visual donde tu equipo de negocio, marketing o ventas puede explorar datos sin depender de un analista.

## El problema que resuelve

Tu empresa tiene datos valiosos en la base de datos: ventas, usuarios, conversiones, métricas de producto. Pero solo los desarrolladores pueden acceder a ellos con SQL. El equipo de marketing necesita un informe de conversiones, ventas quiere un dashboard de pipeline, producto quiere ver retención de usuarios. Cada petición es un ticket para el equipo de datos.

Metabase elimina esa dependencia: tu equipo de negocio hace sus propias preguntas visualmente.

## Cómo funciona

1. **Conectas tu base de datos**: PostgreSQL, MySQL, MongoDB, BigQuery, Redshift, y muchos más
2. **Metabase la escanea**: entiende las tablas, columnas y relaciones automáticamente
3. **Tu equipo pregunta**: con un editor visual de preguntas, sin escribir SQL
4. **Creas dashboards**: arrastra gráficos y filtros para crear paneles interactivos

## El editor visual de preguntas

Esto es lo que hace especial a Metabase. En vez de escribir:
\`\`\`sql
SELECT date_trunc('month', created_at) as mes, COUNT(*) as total
FROM orders WHERE status = 'completed'
GROUP BY 1 ORDER BY 1
\`\`\`

Tu compañero de marketing hace clic en: Tabla → Orders → Filtro → Status = completed → Agrupar por → Mes → Visualizar como → Gráfico de línea.

Mismo resultado, sin saber SQL.

## Para quién es

- **Startups**: dashboards de métricas sin contratar un analista de datos
- **PYMEs**: informes de ventas, inventario, clientes sin Excel
- **Equipos de producto**: métricas de uso, retención, conversión en tiempo real
- **Marketing**: campañas, conversiones, LTV, segmentación

## Instalación

\`\`\`bash
docker run -d -p 3000:3000 metabase/metabase
\`\`\``,
    image_prompt: "Business intelligence dashboard with interactive charts, bar graphs, line charts, data tables, visual query builder interface, purple data visualization elements, dark analytics background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "KRTirtho/spotube", url: "https://github.com/KRTirtho/spotube",
    name: "Spotube", stars: 45338, language: "Dart", author: "KRTirtho", category_id: 8,
    difficulty: "facil", interest_score: 88, is_oss_alternative: true, alternative_to: "Spotify Premium",
    tags: ["música", "streaming", "open-source", "multiplataforma", "privacidad"],
    seo_slug: "spotube-cliente-spotify-open-source-sin-anuncios",
    seo_title: "Spotube: Cliente de Spotify open source sin anuncios y sin premium",
    seo_description: "Spotube reproduce música de Spotify sin anuncios ni necesidad de premium. Open source, multiplataforma y respetuoso con tu privacidad.",
    summary_es: `Spotube es un cliente de música open source que usa el catálogo de Spotify (metadatos, playlists, artistas) pero reproduce el audio desde YouTube Music u otras fuentes gratuitas. El resultado: acceso a toda la música de Spotify, sin anuncios, sin necesidad de cuenta premium, y con privacidad.

## Cómo funciona

Spotube usa la API pública de Spotify para obtener la información de las canciones (nombres, artistas, álbumes, playlists) pero reproduce el audio desde fuentes alternativas gratuitas (YouTube Music, Piped, JioSaavn). Es como tener la interfaz y el catálogo de Spotify pero con reproducción gratuita.

## Funcionalidades

- **Catálogo de Spotify**: busca canciones, artistas, álbumes y playlists como en Spotify
- **Sin anuncios**: nunca. Ni audio ni visual
- **Sin cuenta premium necesaria**: funciona con cuenta gratuita de Spotify o sin cuenta
- **Descarga de música**: guarda canciones para escuchar offline
- **Letras sincronizadas**: muestra la letra de la canción en tiempo real
- **Multiplataforma**: Windows, Mac, Linux, Android, iOS
- **Sin telemetría**: no rastrea tu actividad de escucha
- **Ligero**: consume menos recursos que la app oficial de Spotify

## La pregunta legal

Spotube está en una zona gris legal. No infringe directamente copyright porque no descarga música de Spotify — solo usa sus metadatos públicos. El audio viene de YouTube Music, que es un servicio legítimo. Sin embargo, el uso puede ir contra los términos de servicio de Spotify.

## Instalación

Descarga desde la web del proyecto para cualquier plataforma. En Android está disponible en F-Droid.`,
    image_prompt: "Music streaming app interface with album art, playlist sidebar, playback controls, lyrics display, Spotify-like design, purple music visualization, dark elegant player interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "streamlit/streamlit", url: "https://github.com/streamlit/streamlit",
    name: "Streamlit", stars: 44089, language: "Python", author: "streamlit", category_id: 2,
    difficulty: "facil", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["python", "dashboard", "datos", "ia", "web"],
    seo_slug: "streamlit-apps-datos-python-sin-frontend",
    seo_title: "Streamlit: Crea apps de datos y dashboards en Python sin saber frontend",
    seo_description: "Streamlit convierte scripts de Python en apps web interactivas. Dashboards, visualizaciones y demos de IA sin HTML, CSS ni JavaScript.",
    summary_es: `Streamlit convierte scripts de Python en aplicaciones web interactivas sin que necesites saber nada de frontend — ni HTML, ni CSS, ni JavaScript. Escribes Python normal y Streamlit genera la interfaz automáticamente: sliders, botones, tablas, gráficos, inputs de texto, todo con unas pocas líneas.

## El superpoder de Streamlit

\`\`\`python
import streamlit as st
import pandas as pd

st.title("Dashboard de ventas")

# Carga de datos con upload
archivo = st.file_uploader("Sube tu CSV de ventas")
if archivo:
    df = pd.read_csv(archivo)

    # Filtro interactivo
    mes = st.selectbox("Filtrar por mes", df["mes"].unique())
    filtrado = df[df["mes"] == mes]

    # Métricas
    st.metric("Total ventas", f"{filtrado['total'].sum():,.0f}€")

    # Gráfico
    st.line_chart(filtrado.set_index("fecha")["total"])

    # Tabla
    st.dataframe(filtrado)
\`\`\`

Esas 15 líneas de Python generan una app web completa con upload de archivos, filtros, métricas, gráficos y tablas. Sin configurar un servidor web, sin escribir HTML, sin webpack ni build.

## Para qué lo usa la gente

- **Data science**: dashboards interactivos para explorar datos
- **Machine learning**: demos de modelos con inputs del usuario
- **Informes internos**: reportes que se actualizan en tiempo real
- **Prototipos**: MVP rápido para validar una idea con datos
- **Herramientas internas**: apps para equipo no técnico que interactúa con datos

## Instalación

\`\`\`bash
pip install streamlit
streamlit run tu_app.py
\`\`\`

Se abre automáticamente en el navegador con tu app funcionando.`,
    image_prompt: "Python data app with interactive charts, sliders, file upload, metrics dashboard, Streamlit-style clean interface, data visualization panels, purple accent elements, dark data science background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "mitmproxy/mitmproxy", url: "https://github.com/mitmproxy/mitmproxy",
    name: "mitmproxy", stars: 42930, language: "Python", author: "mitmproxy", category_id: 5,
    difficulty: "medio", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["seguridad", "proxy", "debugging", "red", "https"],
    seo_slug: "mitmproxy-interceptar-trafico-http",
    seo_title: "mitmproxy: Intercepta, inspecciona y modifica tráfico HTTP en tiempo real",
    seo_description: "mitmproxy es un proxy interactivo que intercepta tráfico HTTPS. Ideal para debugging de APIs, pentesting y reverse engineering. 42k estrellas.",
    summary_es: `mitmproxy es un proxy HTTP/HTTPS interactivo que intercepta, inspecciona y modifica el tráfico de red en tiempo real. Es la herramienta que usan los desarrolladores para depurar APIs, los pentesters para analizar tráfico, y los investigadores de seguridad para entender cómo se comunican las aplicaciones.

## Qué puedes hacer con mitmproxy

- **Ver todo el tráfico HTTP/HTTPS** que sale de tu ordenador o red
- **Inspeccionar peticiones y respuestas** con detalle (headers, body, cookies, timing)
- **Modificar peticiones al vuelo**: cambiar headers, body, URLs antes de que lleguen al servidor
- **Modificar respuestas**: cambiar lo que una API devuelve (para testing)
- **Grabar y reproducir**: guarda sesiones de tráfico para análisis posterior
- **Scripting con Python**: automatiza interceptación y modificación con scripts
- **Interceptar tráfico HTTPS**: con su propio certificado CA instalado

## Casos de uso

### Debugging de APIs
Tu app móvil no funciona y no sabes qué peticiones está haciendo. Configuras mitmproxy como proxy del móvil y ves todo el tráfico: qué endpoints llama, qué datos envía, qué responde el servidor, dónde falla.

### Testing
Quieres probar cómo se comporta tu app cuando la API devuelve un error 500. Con mitmproxy interceptas la respuesta y cambias el status code al vuelo, sin modificar el servidor.

### Seguridad
Analizas una app para encontrar vulnerabilidades: ¿envía contraseñas en texto plano? ¿Expone tokens en URLs? ¿Las cookies tienen los flags correctos? mitmproxy te muestra todo.

## Tres interfaces

- **mitmproxy**: interfaz de terminal interactiva (la más usada)
- **mitmweb**: interfaz web en el navegador
- **mitmdump**: solo línea de comandos para scripting y automatización

## Instalación

\`\`\`bash
# macOS
brew install mitmproxy

# pip
pip install mitmproxy

# Ejecutar
mitmproxy
\`\`\``,
    image_prompt: "Network traffic interception visualization, HTTP requests and responses flowing through a proxy, packet inspection, security analysis interface, purple network elements, dark cybersecurity background",
    replicable_with_code: null,
  },
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

- **Edición directa**: modifica tus archivos, no genera snippets
- **Git-aware**: hace commits automáticos con mensajes descriptivos
- **Contexto del repo**: entiende la estructura de tu proyecto, no solo un archivo
- **Multi-archivo**: puede modificar varios archivos en una sola petición
- **Multi-modelo**: funciona con GPT-4, Claude, Gemini, DeepSeek, modelos locales
- **Chat persistente**: mantiene contexto a lo largo de la sesión
- **Modo arquitecto**: describe lo que quieres a alto nivel y Aider planifica los cambios

## Cuándo es más útil

- **Refactoring**: "renombra esta función y actualiza todas las referencias"
- **Tests**: "escribe tests para el módulo de autenticación"
- **Bugs**: "este endpoint devuelve 500, aquí está el error log: [pega el error]"
- **Features nuevas**: "añade un endpoint GET /api/users con paginación"
- **Documentación**: "añade JSDoc a todas las funciones exportadas"

## Instalación

\`\`\`bash
pip install aider-chat
cd tu-repo
aider
\`\`\``,
    image_prompt: "AI pair programming in terminal, split view with chat and code editor, file changes being applied automatically, Git commit happening, purple AI assistant elements, dark developer workspace",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "usebruno/bruno", url: "https://github.com/usebruno/bruno",
    name: "Bruno", stars: 42505, language: "JavaScript", author: "usebruno", category_id: 2,
    difficulty: "facil", interest_score: 87, is_oss_alternative: true, alternative_to: "Postman",
    tags: ["api", "testing", "devtools", "open-source", "git"],
    seo_slug: "bruno-cliente-api-open-source-git-friendly",
    seo_title: "Bruno: Cliente de API open source que guarda colecciones en tu filesystem",
    seo_description: "Bruno es un cliente de API que guarda tus colecciones como archivos de texto en Git. Alternativa a Postman sin cloud. Open source. 42k estrellas.",
    summary_es: `Bruno es un cliente de API open source con una filosofía radical: tus colecciones de API se guardan como archivos de texto plano en tu filesystem, no en la nube de una empresa. Esto significa que van en Git con tu código, se versionan, se revisan en pull requests, y no dependen de ningún servicio externo.

## La filosofía que lo diferencia

Postman guarda tus colecciones en su nube. Insomnia hacía lo mismo hasta que lo vendieron y los usuarios perdieron datos. Bruno dice: tus colecciones son archivos en tu disco duro, formato de texto legible, que versionas con Git como cualquier otro código.

\`\`\`
# Así se ve una petición en Bruno (archivo .bru)
meta {
  name: Get Users
  type: http
  seq: 1
}

get {
  url: {{baseUrl}}/api/users
  params: { page: 1, limit: 20 }
}

headers {
  Authorization: Bearer {{token}}
}

assert {
  res.status: eq 200
  res.body.users: isArray
}
\`\`\`

## Funcionalidades

- **HTTP requests**: GET, POST, PUT, DELETE con toda la configuración
- **GraphQL**: editor con autocompletado de schemas
- **Entornos**: variables de entorno como archivos .env (versionables)
- **Tests y assertions**: valida respuestas con una sintaxis sencilla
- **Scripts**: pre-request y post-request scripts en JavaScript
- **Collection runner**: ejecuta todas las peticiones de una colección secuencialmente
- **Import**: importa desde Postman, Insomnia, OpenAPI
- **Offline**: funciona completamente sin internet

## Bruno vs Hoppscotch vs Postman

Bruno es la opción más "developer-friendly" porque tus colecciones son código versionable. Hoppscotch es la más rápida (funciona en el navegador). Postman es la más completa pero la más pesada y la que más depende de su cloud.

## Instalación

Descarga desde usebruno.com para Windows, Mac y Linux. También disponible con Homebrew: \`brew install bruno\`.`,
    image_prompt: "API client application showing request configuration, file-based collection in filesystem tree, Git version control integration, code-like API definitions, purple developer elements, dark professional interface",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "siyuan-note/siyuan", url: "https://github.com/siyuan-note/siyuan",
    name: "SiYuan", stars: 42263, language: "TypeScript", author: "siyuan-note", category_id: 8,
    difficulty: "facil", interest_score: 86, is_oss_alternative: true, alternative_to: "Notion + Obsidian",
    tags: ["notas", "knowledge-management", "self-hosted", "privacidad", "markdown"],
    seo_slug: "siyuan-notas-bloques-privacidad-total",
    seo_title: "SiYuan: Notas con bloques, grafos y privacidad total — lo mejor de Notion y Obsidian",
    seo_description: "SiYuan combina bloques tipo Notion con grafos tipo Obsidian, cifrado end-to-end y almacenamiento local. Open source. 42k estrellas.",
    summary_es: `SiYuan es una herramienta de knowledge management que intenta ser lo mejor de dos mundos: la flexibilidad de bloques de Notion (texto, tablas, código, embeds) con los grafos de conocimiento y la privacidad de Obsidian. Todo local-first, cifrado, open source, y con una interfaz que genuinamente se ve bien.

## Lo que lo hace único

- **Editor de bloques completo**: como Notion, cada bloque es independiente (texto, heading, lista, tabla, código, math, mermaid diagrams, embeds)
- **Backlinks y grafos**: como Obsidian, cada referencia crea un link bidireccional y puedes ver el grafo de conexiones
- **Base de datos integrada**: tablas tipo Airtable dentro de tus notas
- **Queries en SQL**: puedes hacer búsquedas avanzadas en tus notas con SQL
- **Flashcards integradas**: convierte cualquier bloque en una tarjeta de estudio con spaced repetition
- **Cifrado end-to-end**: tus notas se cifran antes de sincronizar
- **Almacenamiento local**: todo en tu disco duro, formato abierto
- **Self-hosteable**: monta tu propio servidor de sincronización
- **Temas y plugins**: ecosistema creciente de extensiones

## SiYuan vs Notion vs Obsidian

| | SiYuan | Notion | Obsidian |
|---|---|---|---|
| Editor de bloques | Sí | Sí | No (documento largo) |
| Grafos de conocimiento | Sí | No | Sí |
| Local-first | Sí | No | Sí |
| Open source | Sí | No | No |
| Cifrado E2E | Sí | No | Con plugin |
| Base de datos | Sí | Sí | Con plugin |
| Gratis | Sí (self-hosted) | Parcial | Parcial |

## Instalación

Descarga desde b3log.org/siyuan para Windows, Mac, Linux, Android e iOS. Para sincronización self-hosted, despliega el servidor con Docker.`,
    image_prompt: "Note-taking app combining block editor with knowledge graph, database tables embedded in notes, bidirectional links visualization, encrypted sync icon, purple knowledge elements, dark elegant interface",
    replicable_with_code: null,
  },
];

async function main() {
  console.log(`=== OffRadar: Generando ${projects.length} proyectos nuevos ===\n`);

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i+1}/${projects.length}] ${p.name}...`);

    // Generate image
    console.log(`  📸 Generando imagen...`);
    const imgUrl = await generateImage(p.image_prompt, p.seo_slug);
    if (imgUrl) console.log(`  ✓ Imagen: ${imgUrl}`);

    // Insert into DB
    try {
      await sql`
        INSERT INTO projects (
          source, source_id, url, name, description, summary_es,
          category_id, tags, difficulty, interest_score, stars,
          language, is_oss_alternative, alternative_to,
          replicable_with_code,
          featured_image_url, status, priority,
          seo_slug, seo_title, seo_description, author,
          created_at, updated_at, published_at
        ) VALUES (
          ${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.seo_description}, ${p.summary_es},
          ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars},
          ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to},
          ${p.replicable_with_code || null},
          ${imgUrl}, 'published', 'high',
          ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author},
          NOW(), NOW(), NOW()
        )
        ON CONFLICT (source, source_id) DO UPDATE SET
          stars = EXCLUDED.stars,
          summary_es = EXCLUDED.summary_es,
          featured_image_url = COALESCE(EXCLUDED.featured_image_url, projects.featured_image_url),
          updated_at = NOW()
      `;
      console.log(`  ✓ DB`);
    } catch(e) {
      console.error(`  ✗ DB: ${e.message}`);
    }

    // Rate limit
    if (i < projects.length - 1) await new Promise(r => setTimeout(r, 4000));
  }

  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\n✅ Total proyectos publicados: ${count[0].n}`);
  await sql.end();
}

main().catch(e => { console.error(e); process.exit(1); });

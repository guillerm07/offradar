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
    source: "github", source_id: "cli/cli", url: "https://github.com/cli/cli",
    name: "GitHub CLI", stars: 43511, language: "Go", author: "cli", category_id: 2,
    difficulty: "facil", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["github", "cli", "git", "devops", "productividad"],
    seo_slug: "github-cli-gh-terminal",
    seo_title: "GitHub CLI (gh): Gestiona GitHub completo desde tu terminal",
    seo_description: "gh es la CLI oficial de GitHub. Crea PRs, revisa issues, gestiona repos, ejecuta Actions, todo sin salir del terminal. 43k estrellas.",
    summary_es: `GitHub CLI (\`gh\`) es la herramienta oficial de GitHub para gestionar todo tu flujo de trabajo desde el terminal. Crear pull requests, revisar issues, gestionar repos, ejecutar workflows de Actions, ver notificaciones — todo sin abrir el navegador.

## Por qué no usar simplemente git + la web de GitHub

Git te da el control del repositorio local (commits, branches, push, pull). Pero para todo lo que es GitHub (issues, PRs, reviews, Actions, releases), tienes que ir al navegador. Con \`gh\`, haces todo desde el terminal:

\`\`\`bash
# Crear un PR desde el terminal
gh pr create --title "Add user validation" --body "Validates email format"

# Ver tus PRs pendientes de review
gh pr list --reviewer @me

# Revisar el diff de un PR
gh pr diff 42

# Mergear un PR
gh pr merge 42 --squash

# Crear un issue
gh issue create --title "Bug: login fails on Safari"

# Ver el estado de los Actions
gh run list
gh run view 12345 --log

# Clonar un repo (más fácil que git clone)
gh repo clone facebook/react
\`\`\`

## Funcionalidades principales

- **Pull Requests**: crear, listar, revisar, mergear, cerrar, ver diff
- **Issues**: crear, listar, asignar, etiquetar, cerrar, comentar
- **Repos**: crear, clonar, fork, archivar, ver info
- **Actions**: listar workflows, ver runs, re-ejecutar, ver logs
- **Releases**: crear, listar, descargar assets
- **Gists**: crear y gestionar gists
- **Codespaces**: crear y gestionar codespaces
- **API**: hacer cualquier llamada a la API de GitHub directamente
- **Aliases**: crea atajos para comandos que usas frecuentemente
- **Extensions**: instala extensiones de la comunidad

## El comando más útil: gh api

\`\`\`bash
# Cualquier endpoint de la API de GitHub
gh api repos/tu-user/tu-repo/pulls --jq '.[].title'

# Datos de tu perfil
gh api user --jq '.login, .public_repos'
\`\`\`

Acceso directo a toda la API de GitHub con autenticación automática.

## Instalación

\`\`\`bash
# macOS
brew install gh

# Ubuntu
sudo apt install gh

# Windows
winget install GitHub.cli
\`\`\`

Después de instalarlo: \`gh auth login\` para autenticarte y listo.`,
    image_prompt: "GitHub CLI terminal showing PR creation, issue management, Actions status, Git operations in command line, GitHub logo, purple terminal elements, dark developer workflow background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "run-llama/llama_index", url: "https://github.com/run-llama/llama_index",
    name: "LlamaIndex", stars: 48234, language: "Python", author: "run-llama", category_id: 1,
    difficulty: "medio", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "rag", "datos", "llm", "agentes"],
    seo_slug: "llamaindex-framework-rag-datos-ia",
    seo_title: "LlamaIndex: El framework para conectar tus datos con modelos de lenguaje",
    seo_description: "LlamaIndex es el framework Python líder para RAG. Conecta cualquier fuente de datos con LLMs. Documentos, APIs, bases de datos. 48k estrellas.",
    summary_es: `LlamaIndex es el framework Python de referencia para construir aplicaciones de RAG (Retrieval-Augmented Generation) — el patrón que permite a los modelos de lenguaje consultar TUS datos para dar respuestas fundamentadas. Si Langchain es el framework general para aplicaciones de IA, LlamaIndex es el especialista en conectar datos con LLMs.

## El problema que resuelve

Los LLMs (GPT-4, Claude, Llama) saben mucho sobre el mundo en general, pero no saben nada sobre TUS datos: tu documentación, tus contratos, tus emails, tus bases de datos. RAG es la técnica que soluciona esto: antes de que el LLM responda, busca información relevante en tus datos y la incluye en el contexto.

LlamaIndex hace que implementar RAG sea dramáticamente más fácil que hacerlo desde cero.

## Cómo funciona

### 1. Conectas tus datos
LlamaIndex tiene "connectors" para cientos de fuentes:
- **Documentos**: PDF, Word, Excel, CSV, Markdown, HTML
- **Bases de datos**: PostgreSQL, MySQL, MongoDB
- **APIs**: Notion, Slack, Google Drive, GitHub, Confluence
- **Web**: scraping, RSS, sitemaps

### 2. Indexa y vectoriza
LlamaIndex procesa tus documentos, los divide en chunks inteligentes, y crea embeddings (vectores) que se almacenan en un vector store (ChromaDB, Pinecone, Qdrant, Weaviate, pgvector...).

### 3. Tu app consulta
Cuando un usuario pregunta algo, LlamaIndex:
1. Convierte la pregunta en un vector
2. Busca los chunks más relevantes en el vector store
3. Los envía al LLM junto con la pregunta
4. El LLM responde basándose en tus datos

### Ejemplo básico

\`\`\`python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 1. Cargar documentos
documents = SimpleDirectoryReader("./mis_docs/").load_data()

# 2. Crear índice (vectoriza automáticamente)
index = VectorStoreIndex.from_documents(documents)

# 3. Consultar
query_engine = index.as_query_engine()
response = query_engine.query("Cual es nuestra politica de vacaciones?")
print(response)
\`\`\`

5 líneas de código para un sistema RAG funcional.

## LlamaIndex vs Langchain

- **Langchain**: framework general para apps de IA (chains, agents, tools, memory). Más flexible, más complejo
- **LlamaIndex**: especializado en indexación de datos y RAG. Más simple para este caso de uso, mejor resultado

Si tu objetivo principal es "quiero que mi IA consulte mis documentos", LlamaIndex es la mejor opción. Si necesitas agentes con herramientas, chains complejas, y lógica de negocio, Langchain.

## Agentes en LlamaIndex

LlamaIndex ya no es solo RAG — también soporta agentes:

\`\`\`python
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import QueryEngineTool

# Convierte tu índice RAG en una herramienta para el agente
tool = QueryEngineTool.from_defaults(query_engine, name="docs", description="Busca en la documentacion de la empresa")

agent = ReActAgent.from_tools([tool], llm=llm)
response = agent.chat("Busca nuestra politica de vacaciones y resumela en 3 puntos")
\`\`\`

## Instalación

\`\`\`bash
pip install llama-index
\`\`\``,
    image_prompt: "Data indexing pipeline connecting documents, databases and APIs to an LLM through vector search, RAG architecture diagram, knowledge retrieval flow, purple data connection lines, dark AI infrastructure background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "google-gemini/gemini-cli", url: "https://github.com/google-gemini/gemini-cli",
    name: "Gemini CLI", stars: 99996, language: "TypeScript", author: "google-gemini", category_id: 1,
    difficulty: "facil", interest_score: 92, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "cli", "google", "gemini", "desarrollo"],
    seo_slug: "gemini-cli-agente-ia-google-terminal",
    seo_title: "Gemini CLI: El agente de IA de Google directamente en tu terminal",
    seo_description: "Gemini CLI trae el poder de Gemini a tu terminal. Coding, análisis de archivos, automatización. Open source de Google. 99k estrellas.",
    summary_es: `Gemini CLI es la respuesta de Google a Claude Code — un agente de inteligencia artificial que vive en tu terminal, entiende tu codebase, y te ayuda a programar, analizar archivos y automatizar tareas. Usa los modelos Gemini de Google (incluyendo Gemini 2.5 Pro) y es completamente open source.

## Qué puede hacer

- **Programar**: genera, modifica y depura código en tu proyecto
- **Analizar archivos**: lee tu codebase y responde preguntas sobre él
- **Ejecutar comandos**: corre comandos en el terminal con tu permiso
- **Multimodal**: puede analizar imágenes (capturas de pantalla, diagramas, diseños)
- **Sandbox**: ejecuta código en un entorno aislado para probar cambios
- **Extensiones**: sistema de extensiones para añadir funcionalidades

## La comparación inevitable: Gemini CLI vs Claude Code

| | Gemini CLI | Claude Code |
|---|---|---|
| Modelo | Gemini 2.5 Pro | Claude Opus/Sonnet |
| Precio | Gratis (con cuenta Google) | Suscripción Claude |
| Open source | Sí | Parcial |
| Ventana de contexto | 1M tokens | 200K tokens |
| Calidad de código | Muy buena | Excelente |
| Velocidad | Rápido | Rápido |
| Multimodal | Imágenes nativas | Imágenes |

La ventana de contexto de 1M tokens de Gemini es una ventaja real: puede "ver" proyectos enteros de una vez, mientras que Claude Code necesita ser más selectivo con qué archivos incluir.

## Uso básico

\`\`\`bash
# Instalar
npm install -g @anthropic-ai/gemini-cli

# Usar
gemini

# Ejemplo de prompt
> Analiza este proyecto y sugiere mejoras de rendimiento
> Genera tests para el módulo de autenticación
> Explica qué hace la función processPayment en src/payments.ts
\`\`\`

## Por qué tiene 100k estrellas

Google abrió el código de Gemini CLI como respuesta al éxito de Claude Code. El hecho de que sea gratis (con la API gratuita de Gemini), open source, y con una ventana de contexto de 1 millón de tokens lo hace extremadamente atractivo. Para muchos desarrolladores, es "Claude Code pero gratis".

## Limitaciones

- La calidad de Gemini 2.5 Pro es muy buena pero Claude sigue siendo superior en razonamiento complejo y código difícil
- El ecosistema de extensiones es más nuevo y pequeño
- La integración con editores (VS Code, JetBrains) está menos madura

## Instalación

\`\`\`bash
npm install -g @anthropic-ai/gemini-cli
gemini auth login
\`\`\``,
    image_prompt: "Google Gemini AI agent in terminal analyzing code, large context window visualization showing entire project, Google AI branding, coding assistance, purple Gemini elements, dark developer terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "redis/redis", url: "https://github.com/redis/redis",
    name: "Redis", stars: 73627, language: "C", author: "redis", category_id: 6,
    difficulty: "facil", interest_score: 92, is_oss_alternative: false, alternative_to: null,
    tags: ["base-de-datos", "cache", "rendimiento", "colas", "real-time"],
    seo_slug: "redis-base-datos-en-memoria-rapida",
    seo_title: "Redis: La base de datos en memoria más rápida del mundo",
    seo_description: "Redis almacena datos en memoria para acceso ultrarrápido. Cache, sesiones, colas, pub/sub, rate limiting. El estándar de la industria.",
    summary_es: `Redis es una base de datos en memoria que almacena datos en RAM para acceso en microsegundos — literalmente 100-1000x más rápido que una base de datos tradicional en disco. Es el estándar de facto para caché, sesiones de usuario, colas de mensajes, rate limiting, y cualquier cosa donde la velocidad sea crítica.

## Por qué Redis está en todas partes

Prácticamente toda aplicación web seria usa Redis en algún punto:

- **Twitter/X**: almacena timelines en Redis
- **GitHub**: usa Redis para caching y colas de trabajos
- **Stack Overflow**: Redis para caching de queries frecuentes
- **Instagram**: almacena los feeds de los usuarios

Si tu app empieza a ir lenta porque hace las mismas queries a PostgreSQL 10.000 veces por minuto, poner Redis como caché entre tu app y la DB es probablemente la optimización más efectiva que puedes hacer.

## Qué es (y qué NO es)

Redis es un key-value store en memoria. Almacena pares clave-valor con tipos de datos ricos (strings, hashes, listas, sets, sorted sets, streams, HyperLogLog...). Los datos viven en RAM para acceso instantáneo, con persistencia opcional a disco.

**NO es** un reemplazo de PostgreSQL o MongoDB. Redis complementa tu base de datos principal — no la reemplaza.

## Casos de uso más comunes

### Caché
\`\`\`python
# Antes de consultar la DB, mira si está en Redis
cached = redis.get("user:123:profile")
if cached:
    return json.loads(cached)

# Si no, consulta la DB y guarda en Redis (expira en 5 min)
user = db.query("SELECT * FROM users WHERE id = 123")
redis.setex("user:123:profile", 300, json.dumps(user))
return user
\`\`\`

### Sesiones de usuario
\`\`\`python
# Guardar sesión
redis.setex(f"session:{session_id}", 3600, json.dumps(user_data))

# Verificar sesión
session = redis.get(f"session:{session_id}")
\`\`\`

### Rate limiting
\`\`\`python
# Limitar a 100 requests por minuto por IP
key = f"ratelimit:{ip}"
current = redis.incr(key)
if current == 1:
    redis.expire(key, 60)
if current > 100:
    return "Too Many Requests", 429
\`\`\`

### Cola de tareas
\`\`\`python
# Productor: añade trabajo a la cola
redis.lpush("email_queue", json.dumps({"to": "user@email.com", "subject": "Bienvenido"}))

# Consumidor: procesa trabajos
while True:
    task = redis.brpop("email_queue")
    send_email(json.loads(task))
\`\`\`

### Pub/Sub (mensajería en tiempo real)
\`\`\`python
# Chat, notificaciones en tiempo real, eventos
redis.publish("chat:room:42", "Hola a todos!")
\`\`\`

## Rendimiento

- **100.000+ operaciones por segundo** en un solo servidor
- **Latencia sub-milisegundo** (microsegundos en LAN)
- **Persistencia configurable**: solo memoria, snapshots periódicos, o append-only file

## Instalación

\`\`\`bash
# macOS
brew install redis

# Docker
docker run -p 6379:6379 redis

# Ubuntu
sudo apt install redis-server
\`\`\``,
    image_prompt: "In-memory database with lightning-fast data access, key-value pairs flowing at high speed, cache hit visualization, real-time pub/sub messages, purple speed elements, dark high-performance infrastructure background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "etcd-io/etcd", url: "https://github.com/etcd-io/etcd",
    name: "etcd", stars: 51673, language: "Go", author: "etcd-io", category_id: 6,
    difficulty: "medio", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["base-de-datos", "distribuida", "kubernetes", "configuración", "consenso"],
    seo_slug: "etcd-key-value-distribuido-kubernetes",
    seo_title: "etcd: El almacén key-value distribuido que hace funcionar Kubernetes",
    seo_description: "etcd es un almacén key-value distribuido y consistente. Es el cerebro de Kubernetes. Configuración distribuida fiable. 51k estrellas.",
    summary_es: `etcd es un almacén key-value distribuido que garantiza consistencia fuerte — si escribes un dato, todos los nodos del clúster lo ven al instante. Es el componente que hace funcionar Kubernetes (almacena todo el estado del clúster) y se usa ampliamente para configuración distribuida, service discovery y coordinación de sistemas distribuidos.

## Por qué es importante

Si Redis es la base de datos en memoria más rápida, etcd es la base de datos distribuida más **fiable**. La diferencia es crucial:

- **Redis**: velocidad máxima, consistencia eventual (puede perder datos si se cae)
- **etcd**: consistencia fuerte garantizada, tolerancia a fallos, datos siempre correctos

Cuando necesitas que múltiples servidores se pongan de acuerdo sobre un dato (quién es el líder, cuál es la configuración actual, qué servicios están vivos), necesitas etcd.

## Kubernetes depende de etcd

Todo el estado de un clúster de Kubernetes vive en etcd: qué pods hay corriendo, en qué nodos están, qué servicios existen, qué configuraciones hay... Si etcd muere, Kubernetes deja de funcionar. Por eso etcd está diseñado para ser extremadamente fiable.

## Casos de uso

### Configuración distribuida
Tu aplicación tiene 10 réplicas. Cambias una configuración (API key, feature flag, límite de rate). Con etcd, todas las réplicas ven el cambio al instante.

### Service discovery
Microservicio A necesita saber dónde está microservicio B. B se registra en etcd, A lo consulta. Si B se mueve o escala, etcd se actualiza y A se entera.

### Elección de líder
5 workers necesitan que solo uno sea el "líder". etcd garantiza que solo uno gana la elección y que si muere, otro toma el relevo automáticamente.

### Locks distribuidos
Dos procesos no deben ejecutar la misma tarea simultáneamente. etcd proporciona locks distribuidos que funcionan correctamente incluso con fallos de red.

## Instalación

\`\`\`bash
# Docker
docker run -p 2379:2379 -p 2380:2380 \\
  quay.io/coreos/etcd:v3.5.0

# macOS
brew install etcd
\`\`\`

## Para quién es

- **Platform engineers**: gestión de configuración distribuida
- **Equipos de Kubernetes**: entender el cerebro de su clúster
- **Arquitectos de microservicios**: service discovery y coordinación
- **NO es para**: almacenamiento general de datos (usa PostgreSQL o Redis)`,
    image_prompt: "Distributed key-value store with multiple nodes in consensus, Kubernetes connection, leader election visualization, configuration sync across servers, purple distributed elements, dark infrastructure background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "FFmpeg/FFmpeg", url: "https://github.com/FFmpeg/FFmpeg",
    name: "FFmpeg", stars: 58535, language: "C", author: "FFmpeg", category_id: 2,
    difficulty: "dificil", interest_score: 92, is_oss_alternative: false, alternative_to: null,
    tags: ["vídeo", "audio", "multimedia", "conversión", "cli"],
    seo_slug: "ffmpeg-herramienta-multimedia-universal",
    seo_title: "FFmpeg: La herramienta de línea de comandos que procesa cualquier audio o vídeo",
    seo_description: "FFmpeg convierte, edita, comprime y transmite cualquier formato de audio y vídeo. La navaja suiza multimedia. Usado por YouTube, Netflix, VLC.",
    summary_es: `FFmpeg es probablemente el software más importante que la mayoría de gente no sabe que usa. Es una herramienta de línea de comandos que puede convertir, editar, comprimir, recortar, fusionar y transmitir cualquier formato de audio y vídeo que exista. YouTube lo usa para transcodificar vídeos. Netflix para preparar su catálogo. VLC, HandBrake, OBS y prácticamente todo software multimedia usa FFmpeg por debajo.

## Qué puede hacer

### Conversiones
\`\`\`bash
# Convertir MKV a MP4
ffmpeg -i video.mkv video.mp4

# Extraer audio de un vídeo
ffmpeg -i video.mp4 -vn audio.mp3

# Convertir vídeo a GIF
ffmpeg -i video.mp4 -vf "fps=10,scale=480:-1" output.gif
\`\`\`

### Edición
\`\`\`bash
# Recortar vídeo (de 00:30 a 02:00)
ffmpeg -i video.mp4 -ss 00:00:30 -to 00:02:00 -c copy recortado.mp4

# Redimensionar
ffmpeg -i video.mp4 -vf scale=1280:720 hd.mp4

# Añadir subtítulos
ffmpeg -i video.mp4 -i subs.srt -c copy -c:s mov_text con_subs.mp4

# Unir varios vídeos
ffmpeg -f concat -i lista.txt -c copy unido.mp4
\`\`\`

### Compresión
\`\`\`bash
# Comprimir vídeo manteniendo buena calidad
ffmpeg -i video.mp4 -crf 23 -preset medium comprimido.mp4

# Reducir tamaño agresivamente
ffmpeg -i video.mp4 -crf 28 -preset slow -vf scale=1280:-1 pequeno.mp4
\`\`\`

### Streaming
\`\`\`bash
# Stream a RTMP (Twitch, YouTube Live)
ffmpeg -i input.mp4 -c copy -f flv rtmp://live.twitch.tv/app/tu_key
\`\`\`

## Por qué la sintaxis da miedo (pero vale la pena)

FFmpeg es poderoso pero su sintaxis es críptica. \`-crf 23 -preset medium -c:v libx264 -c:a aac -b:a 128k\` no es exactamente legible. Pero una vez que aprendes los patrones básicos, puedes hacer cosas que en software con interfaz gráfica serían imposibles o llevarían 10 clics.

**Tip**: usa Claude Code para generar comandos FFmpeg. Dile qué quieres hacer y te da el comando exacto.

## Formatos soportados

Literalmente todos. MP4, MKV, AVI, MOV, WebM, FLV, GIF, MP3, AAC, FLAC, WAV, OGG, OPUS, H.264, H.265/HEVC, AV1, VP9, ProRes... Si un formato de audio/vídeo existe, FFmpeg lo soporta.

## Instalación

\`\`\`bash
# macOS
brew install ffmpeg

# Ubuntu
sudo apt install ffmpeg

# Windows
winget install FFmpeg
\`\`\``,
    image_prompt: "Universal multimedia processing tool converting between video and audio formats, format icons flowing through a conversion pipeline, codec visualization, purple multimedia elements, dark processing background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "opencv/opencv", url: "https://github.com/opencv/opencv",
    name: "OpenCV", stars: 86885, language: "C++", author: "opencv", category_id: 1,
    difficulty: "medio", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["visión", "imágenes", "ia", "machine-learning", "procesamiento"],
    seo_slug: "opencv-vision-computador-python",
    seo_title: "OpenCV: La librería de visión por computador más usada del mundo",
    seo_description: "OpenCV procesa imágenes y vídeo en tiempo real. Detección de objetos, reconocimiento facial, OCR, realidad aumentada. 86k estrellas.",
    summary_es: `OpenCV (Open Computer Vision) es la librería de visión por computador más importante y usada del mundo. Si cualquier software detecta caras, lee matrículas, sigue objetos en vídeo, o procesa imágenes, probablemente usa OpenCV. Disponible en Python, C++, Java y JavaScript, es la base de miles de aplicaciones de visión artificial.

## Qué puede hacer

### Procesamiento de imágenes
- Redimensionar, rotar, recortar, transformar
- Filtros (blur, sharpen, edge detection)
- Conversión de color (RGB, HSV, escala de grises)
- Umbralización y segmentación
- Detección de contornos
- Corrección de perspectiva

### Detección y reconocimiento
- **Detección de caras**: encuentra caras en imágenes y vídeo
- **Reconocimiento facial**: identifica a quién pertenece cada cara
- **Detección de objetos**: coches, personas, animales, texto
- **Lectura de texto (OCR)**: extrae texto de imágenes
- **Lectura de QR/Barcode**: decodifica códigos QR y de barras
- **Detección de movimiento**: tracking de objetos en vídeo

### Vídeo en tiempo real
- Captura de webcam y procesamiento frame a frame
- Tracking de objetos en movimiento
- Optical flow (estimación de movimiento)
- Estabilización de vídeo
- Background subtraction

## Ejemplo: detectar caras con Python

\`\`\`python
import cv2

# Cargar el detector de caras
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Leer imagen
img = cv2.imread('foto.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detectar caras
faces = face_cascade.detectMultiScale(gray, 1.1, 4)

# Dibujar rectángulos
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)

cv2.imwrite('resultado.jpg', img)
print(f"Detectadas {len(faces)} caras")
\`\`\`

## Dónde se usa en el mundo real

- **Coches autónomos**: Tesla, Waymo y otros usan OpenCV para procesamiento de cámara
- **Seguridad**: cámaras de vigilancia con detección de personas
- **Medicina**: análisis de imágenes médicas (rayos X, resonancias)
- **Industria**: inspección de calidad visual en líneas de producción
- **Retail**: conteo de personas, análisis de flujo en tiendas
- **Agricultura**: detección de plagas, madurez de frutas

## Instalación

\`\`\`bash
pip install opencv-python
\`\`\``,
    image_prompt: "Computer vision processing showing face detection boxes, object recognition labels, image processing pipeline, camera feed analysis in real-time, purple vision elements, dark AI processing background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "streamlit/streamlit", url: "https://github.com/streamlit/streamlit",
    name: "Streamlit", stars: 44089, language: "Python", author: "streamlit", category_id: 2,
    difficulty: "facil", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["python", "dashboard", "datos", "ia", "web"],
    seo_slug: "streamlit-apps-datos-python",
    seo_title: "Streamlit: Crea apps de datos y dashboards en Python sin saber frontend",
    seo_description: "Streamlit convierte scripts de Python en apps web interactivas. Dashboards, visualizaciones y demos de IA sin HTML, CSS ni JavaScript.",
    // skip - already in batch 1
    summary_es: "",
  },
];

// Filter out empty entries
const filtered = projects.filter(p => p.summary_es !== "");

async function main() {
  console.log("=== OffRadar: Lote 4 — " + filtered.length + " proyectos ===\\n");
  for (let i = 0; i < filtered.length; i++) {
    const p = filtered[i];
    console.log("[" + (i+1) + "/" + filtered.length + "] " + p.name + "...");
    console.log("  📸 Imagen...");
    const imgUrl = await generateImage(p.image_prompt, p.seo_slug);
    if (imgUrl) console.log("  ✓ " + imgUrl);
    try {
      await sql`
        INSERT INTO projects (source, source_id, url, name, description, summary_es, category_id, tags, difficulty, interest_score, stars, language, is_oss_alternative, alternative_to, replicable_with_code, featured_image_url, status, priority, seo_slug, seo_title, seo_description, author, created_at, updated_at, published_at)
        VALUES (${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.seo_description}, ${p.summary_es}, ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars}, ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to}, ${p.replicable_with_code || null}, ${imgUrl}, 'published', 'high', ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author}, NOW(), NOW(), NOW())
        ON CONFLICT (source, source_id) DO UPDATE SET stars = EXCLUDED.stars, summary_es = EXCLUDED.summary_es, featured_image_url = COALESCE(EXCLUDED.featured_image_url, projects.featured_image_url), updated_at = NOW()
      `;
      console.log("  ✓ DB");
    } catch(e) { console.error("  ✗ " + e.message); }
    if (i < filtered.length - 1) await new Promise(r => setTimeout(r, 4000));
  }
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log("\\n✅ Total: " + count[0].n + " proyectos publicados");
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });

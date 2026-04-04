import postgres from "postgres";
import https from "https";
import fs from "fs";
import path from "path";

const DB_URL = "postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar";
const GEMINI_KEY = "AIzaSyBO_ZNnxtm_LY4JDgIdQEmG_XBtmi_SMcI";
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
    source: "github", source_id: "VectifyAI/PageIndex", url: "https://github.com/VectifyAI/PageIndex",
    name: "PageIndex", stars: 8500, language: "Python", author: "VectifyAI", category_id: 1,
    difficulty: "medio", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "rag", "documentos", "sin-vectores", "razonamiento"],
    seo_slug: "pageindex-rag-sin-vectores-razonamiento",
    seo_title: "PageIndex: RAG sin vectores — el LLM razona sobre documentos como un humano",
    seo_description: "PageIndex convierte documentos en árboles jerárquicos y deja que el LLM razone sección por sección. 98.7% de accuracy sin embeddings.",
    summary_es: `PageIndex representa un cambio de paradigma en cómo los modelos de lenguaje interactúan con documentos largos. En vez del enfoque tradicional de RAG (cortar el documento en trozos, convertirlos en vectores, buscar por similitud), PageIndex convierte el documento en un **árbol jerárquico** y deja que el LLM **navegue** por él sección a sección, como haría un analista humano leyendo un informe.

## Por qué el RAG tradicional tiene problemas

El RAG convencional funciona así: cortas un PDF de 200 páginas en fragmentos de 500 tokens, los conviertes en embeddings vectoriales, y cuando alguien hace una pregunta, buscas los fragmentos más "parecidos" matemáticamente. El problema es que:

- **Pierde contexto**: un fragmento aislado no tiene el contexto de la sección, el capítulo o el documento completo
- **Embeddings imperfectos**: la similitud matemática no siempre captura la relevancia semántica real
- **Tablas y datos estructurados**: los embeddings no manejan bien tablas numéricas, que son cruciales en documentos financieros o técnicos
- **Precisión limitada**: en benchmarks de documentos financieros (FinanceBench), el RAG tradicional ronda el 60-70% de accuracy

## Cómo funciona PageIndex

### 1. Parseo estructural
PageIndex analiza el documento y construye un árbol jerárquico que respeta su estructura real: título → secciones → subsecciones → párrafos → tablas. No trocea ciegamente — entiende la jerarquía.

### 2. Navegación por razonamiento
Cuando llega una pregunta, en vez de buscar por similitud vectorial, el LLM **razona** sobre la estructura del documento:
- "Esta pregunta es sobre ingresos del Q3 → necesito ir a la sección financiera → subsección de resultados trimestrales → tabla de Q3"
- Navega el árbol paso a paso, como un humano hojearía un informe

### 3. Resultado con trazabilidad
La respuesta incluye exactamente qué sección del documento usó, en qué página está, y cómo llegó a ella. Trazabilidad completa.

## Resultados

- **98.7% de accuracy en FinanceBench** — el benchmark estándar de comprensión de documentos financieros
- **Cero vectores**: no necesitas Pinecone, ChromaDB, ni ninguna base de datos vectorial
- **Cero chunking**: no fragmentas el documento, preservas su estructura
- **Especialmente potente con**: informes financieros, contratos legales, papers técnicos, documentación regulatoria

## Para quién es revolucionario

- **Analistas financieros**: pregunta sobre datos específicos de informes anuales y obtén respuestas precisas con referencia a la página exacta
- **Abogados**: consulta contratos largos sin perder matices por culpa del chunking
- **Investigadores**: navega papers científicos manteniendo el contexto de cada sección
- **Cualquiera que trabaje con documentos largos y complejos** donde la precisión importa más que la velocidad

## Instalación

\`\`\`bash
pip install pageindex
\`\`\`

## Por qué importa

PageIndex no es "otra herramienta de RAG". Es un cuestionamiento fundamental de si el enfoque vectorial es la mejor forma de que un LLM interactúe con documentos. Y los resultados sugieren que no — que dejar que el LLM razone sobre la estructura del documento, como haría un humano, produce resultados significativamente mejores.`,
    image_prompt: "Hierarchical document tree structure with AI navigating through sections, reasoning arrows between nodes, document analysis without vectors, purple knowledge tree, dark AI document processing background",
  },
  {
    source: "github", source_id: "LizardByte/Sunshine", url: "https://github.com/LizardByte/Sunshine",
    name: "Moonlight + Sunshine", stars: 25000, language: "C++", author: "LizardByte", category_id: 3,
    difficulty: "facil", interest_score: 90, is_oss_alternative: true, alternative_to: "NVIDIA GameStream / Steam Link",
    tags: ["gaming", "streaming", "self-hosted", "4k", "open-source"],
    seo_slug: "moonlight-sunshine-streaming-juegos-pc-tv",
    seo_title: "Moonlight + Sunshine: Juega desde tu PC en la tele con calidad 4K 120fps",
    seo_description: "Streaming de juegos de tu PC a la tele, móvil o Steam Deck con calidad 4K HDR 120fps. Open source, gratuito y sin lag perceptible.",
    summary_es: `Moonlight + Sunshine es la combinación open source que te permite jugar a los juegos de tu PC en cualquier otro dispositivo — la tele del salón, un móvil, una tablet, un Steam Deck, o incluso otro PC — con una calidad que parece magia: hasta 4K, 120fps, HDR, y con una latencia tan baja que no notas que estás jugando en streaming.

## El escenario perfecto

Tu PC gamer está en tu escritorio. La tele de 65 pulgadas está en el salón. Quieres jugar en la tele pero no quieres mover el PC, comprar otro, ni conformarte con la calidad mediocre de Steam Link. Moonlight + Sunshine resuelve esto de forma gratuita con calidad que rivaliza (y a menudo supera) las soluciones de pago.

## Cómo funciona

### Sunshine (el servidor)
Se instala en tu PC gamer. Captura la pantalla, la codifica en H.264/H.265/AV1 usando tu GPU (NVIDIA, AMD o Intel), y la transmite por tu red local.

### Moonlight (el cliente)
Se instala en el dispositivo donde quieres jugar: TV (Android TV, Apple TV), móvil, tablet, Steam Deck, Mac, Linux, o un PC secundario. Recibe el stream y muestra la imagen, enviando de vuelta los inputs del mando o teclado.

## Calidad real

- **Resolución**: hasta 4K (3840x2160) o la que soporte tu tele
- **Framerate**: hasta 120fps (si tu monitor/tele lo soporta)
- **HDR**: soporte nativo para HDR10
- **Latencia**: 5-15ms en red local (imperceptible para la mayoría de juegos)
- **Codec**: H.264 para compatibilidad, H.265 para calidad, AV1 para eficiencia

## Por qué es mejor que las alternativas

| | Moonlight + Sunshine | Steam Link | NVIDIA GameStream | Parsec |
|---|---|---|---|---|
| Precio | Gratis | Gratis | Discontinuado | Freemium |
| Open source | Sí | No | No | No |
| GPU necesaria | Cualquiera | Cualquiera | Solo NVIDIA | Cualquiera |
| Resolución máx. | 4K 120fps HDR | 4K 60fps | 4K 60fps | 4K 60fps |
| Juegos no-Steam | Sí (toda la pantalla) | Solo Steam | Solo GeForce Experience | Sí |
| Apps/escritorio | Sí | Limitado | Limitado | Sí |

## No solo juegos

Sunshine transmite toda la pantalla, no solo juegos. Puedes:
- Trabajar desde la tele con teclado y ratón
- Ver películas desde tu PC en la tele sin cables
- Presentar desde otro dispositivo en reuniones
- Usar apps de tu PC de escritorio remotamente

## Instalación

**En el PC (servidor):**
\`\`\`bash
# Windows: descarga desde github.com/LizardByte/Sunshine/releases
# Linux:
flatpak install dev.lizardbyte.sunshine
\`\`\`

**En el dispositivo cliente:**
Descarga Moonlight desde la store de tu dispositivo (Google Play, App Store, F-Droid, Steam Deck via Flatpak, etc.).

Configura la red local (idealmente ambos dispositivos conectados por cable Ethernet al mismo router), y en minutos estás jugando en la tele.`,
    image_prompt: "PC gaming streaming to multiple devices (TV, phone, Steam Deck), high quality 4K video stream flowing wirelessly, game controller, purple streaming elements, dark gaming setup background",
  },
  {
    source: "github", source_id: "onyx-dot-app/onyx", url: "https://github.com/onyx-dot-app/onyx",
    name: "Onyx", stars: 18000, language: "Python", author: "onyx-dot-app", category_id: 1,
    difficulty: "medio", interest_score: 92, is_oss_alternative: true, alternative_to: "ChatGPT Enterprise",
    tags: ["ia", "empresarial", "self-hosted", "rag", "privacidad"],
    seo_slug: "onyx-plataforma-ia-empresarial-self-hosted",
    seo_title: "Onyx: Monta un ChatGPT Enterprise privado para tu empresa",
    seo_description: "Onyx es la plataforma open source para IA empresarial self-hosted. Conecta Drive, Slack, Notion y más. Tu propio ChatGPT privado.",
    summary_es: `Onyx es lo que obtendrías si combinaras ChatGPT Enterprise con la posibilidad de instalarlo en tus propios servidores y conectarlo a todos los datos internos de tu empresa. Es una plataforma de IA open source diseñada específicamente para entornos corporativos donde la privacidad, el control de datos y la integración con herramientas internas son críticos.

## La oportunidad de negocio real

Esto no es solo un proyecto interesante de GitHub — es un modelo de negocio viable. Las empresas quieren IA pero les preocupa:

- Enviar documentos confidenciales a OpenAI/Google
- El coste de ChatGPT Enterprise (60$/usuario/mes mínimo)
- Que la IA no conozca sus procesos, productos y datos internos

Con Onyx puedes ofrecer a las empresas su propio ChatGPT privado:

1. **Instalación**: lo despliegas en su servidor o cloud privada
2. **Integración**: lo conectas a sus fuentes de datos (Google Drive, Notion, Slack, Confluence, SharePoint, bases de datos internas)
3. **Personalización**: configuras agentes especializados por departamento (RRHH, Legal, Ventas, Soporte)
4. **Mantenimiento**: cobras un fee mensual por soporte y actualizaciones

## Qué conecta

Onyx tiene conectores nativos para decenas de fuentes de datos empresariales:

- **Documentos**: Google Drive, SharePoint, Dropbox, OneDrive
- **Comunicación**: Slack, Microsoft Teams, Gmail, Outlook
- **Knowledge base**: Notion, Confluence, Guru, BookStack
- **Código**: GitHub, GitLab, Bitbucket
- **Tickets**: Jira, Linear, Zendesk, HubSpot
- **Bases de datos**: PostgreSQL, MySQL, y más
- **Web**: crawl de webs internas o externas
- **Archivos**: PDFs, Word, Excel, CSV, Markdown

## Funcionalidades

- **Chat con contexto**: los empleados preguntan en lenguaje natural y la IA responde basándose en los datos internos de la empresa
- **Agentes por departamento**: un agente para RRHH que conoce las políticas, otro para Legal que conoce los contratos, otro para Ventas que conoce los clientes
- **Citación de fuentes**: cada respuesta indica exactamente de qué documento o mensaje salió la información
- **Permisos integrados**: respeta los permisos de acceso existentes (si no tienes acceso a un documento en Drive, la IA tampoco lo usa)
- **Multi-modelo**: funciona con OpenAI, Anthropic, modelos locales via Ollama

## Para quién es especialmente interesante

### Consultoras de tecnología
Puedes ofrecer la instalación y personalización de Onyx como servicio a empresas. Cada empresa es un cliente recurrente.

### Departamentos de IT
Montar Onyx internamente para que todos los empleados tengan un asistente de IA que conoce la empresa.

### Empresas con datos sensibles
Bufetes de abogados, clínicas, empresas financieras — sectores donde los datos no pueden salir de la infraestructura propia.

## Instalación

\`\`\`bash
git clone https://github.com/onyx-dot-app/onyx.git
cd onyx/deployment/docker_compose
docker compose up -d
\`\`\`

En 10 minutos tienes la plataforma corriendo. La primera configuración te guía para conectar las fuentes de datos.`,
    image_prompt: "Enterprise AI platform connecting to multiple business tools (Drive, Slack, Notion, email), private cloud deployment, chat interface for employees, purple enterprise elements, dark corporate tech background",
  },
  {
    source: "github", source_id: "VSCodium/vscodium", url: "https://github.com/VSCodium/vscodium",
    name: "VSCodium", stars: 31000, language: "Shell", author: "VSCodium", category_id: 2,
    difficulty: "facil", interest_score: 88, is_oss_alternative: true, alternative_to: "VS Code",
    tags: ["editor", "privacidad", "open-source", "desarrollo", "telemetría"],
    seo_slug: "vscodium-vscode-sin-telemetria-microsoft",
    seo_title: "VSCodium: El VS Code que no envía tus datos a Microsoft",
    seo_description: "VSCodium es VS Code compilado sin telemetría ni tracking de Microsoft. Mismo editor, cero vigilancia. Open source real. 31k estrellas.",
    summary_es: `VSCodium es exactamente VS Code — mismo editor, mismas extensiones, misma interfaz — pero compilado sin la telemetría y el tracking que Microsoft añade al VS Code oficial. Cada línea que escribes en VS Code, cada archivo que abres, cada extensión que instalas, cada error que se produce: Microsoft lo sabe. Con VSCodium, ese flujo de datos simplemente no existe.

## Qué telemetría envía VS Code (y que VSCodium no)

Cuando instalas VS Code oficial de Microsoft, hay telemetría habilitada por defecto que envía:

- **Archivos que abres**: nombres de archivo, extensiones, rutas
- **Extensiones instaladas**: qué extensiones usas y cómo las usas
- **Hábitos de escritura**: cuánto escribes, cuándo, patrones de uso
- **Errores y crashes**: con contexto del archivo que tenías abierto
- **Rendimiento**: tiempos de carga, memoria, operaciones
- **Funciones que usas**: qué menús abres, qué atajos usas, con qué frecuencia

Sí, puedes desactivar la telemetría en Settings. Pero: (a) viene activada por defecto, (b) hay telemetría que no se puede desactivar completamente, y (c) ¿por qué confiar en que Microsoft respeta tu config cuando puedes usar un binario que directamente no tiene el código de telemetría?

## VSCodium vs VS Code

| | VS Code (Microsoft) | VSCodium |
|---|---|---|
| Editor | Idéntico | Idéntico |
| Interfaz | Idéntica | Idéntica |
| Extensiones | Marketplace de Microsoft | Open VSX Registry |
| Telemetría | Sí (por defecto) | Cero |
| Licencia | MIT + binarios propietarios | MIT puro |
| Branding | Logo y nombre de Microsoft | Logo alternativo |
| Updates | Auto-update de Microsoft | Auto-update independiente |

## La única diferencia real: extensiones

VS Code usa el marketplace de Microsoft. VSCodium usa Open VSX Registry (de la Eclipse Foundation). La mayoría de extensiones populares están en ambos. Algunas extensiones propietarias de Microsoft (como C# oficial, Remote SSH de Microsoft) solo están en el marketplace de Microsoft. Para la mayoría de desarrolladores, esto no es un problema — las alternativas open source cubren el 95% de los casos.

## Para quién tiene más sentido

- **Desarrolladores preocupados por la privacidad**: tu código, tus hábitos y tus archivos no son asunto de Microsoft
- **Empresas con políticas de datos estrictas**: en sectores regulados, enviar telemetría a terceros puede ser un problema de compliance
- **Cualquiera que prefiera software genuinamente open source**: VS Code es "source-available" pero los binarios que distribuye Microsoft incluyen código propietario. VSCodium es open source de verdad

## Instalación

\`\`\`bash
# macOS
brew install --cask vscodium

# Ubuntu/Debian
wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg | sudo apt-key add -
echo 'deb https://download.vscodium.com/debs vscodium main' | sudo tee /etc/apt/sources.list.d/vscodium.list
sudo apt update && sudo apt install codium

# Windows
winget install VSCodium
\`\`\`

Abre VSCodium y verás exactamente el mismo editor que VS Code. Tus settings, keybindings y la mayoría de extensiones funcionan igual. La diferencia es que Microsoft no sabe que existes.`,
    image_prompt: "Code editor identical to VS Code but with privacy shield, no telemetry data flowing out, crossed-out Microsoft tracking, clean coding environment, purple privacy elements, dark developer workspace background",
  },
  {
    source: "github", source_id: "Zackriya-Solutions/meetily", url: "https://github.com/Zackriya-Solutions/meetily",
    name: "Meetily", stars: 5200, language: "Python", author: "Zackriya-Solutions", category_id: 8,
    difficulty: "medio", interest_score: 89, is_oss_alternative: true, alternative_to: "Fireflies.ai / Otter.ai",
    tags: ["reuniones", "transcripción", "ia", "local", "privacidad"],
    seo_slug: "meetily-transcripcion-reuniones-local-ia",
    seo_title: "Meetily: Transcribe reuniones en tiempo real, 100% local y sin costes",
    seo_description: "Meetily transcribe reuniones 4x más rápido que Whisper, detecta hablantes, resume con IA. Todo en local, sin enviar audio a la nube.",
    summary_es: `Meetily es la alternativa local y gratuita a servicios como Fireflies.ai, Otter.ai o Notta para transcripción de reuniones. Transcribe en tiempo real 4x más rápido que Whisper estándar, detecta quién habla, y genera resúmenes inteligentes con IA — todo ejecutándose en tu ordenador, sin enviar ni un segundo de audio a ningún servidor externo.

## El problema con Fireflies, Otter y compañía

Estos servicios hacen un trabajo excelente de transcripción, pero:

- **Privacidad**: todo el audio de tus reuniones se sube a sus servidores. Si hablas de datos confidenciales de clientes, estrategia de negocio, o información sensible, estás confiando en que esas empresas la protejan
- **Coste**: Fireflies Pro cuesta 19$/mes, Otter Business 20$/mes. Para un equipo de 10 personas, son 200$/mes solo en transcripción
- **Dependencia**: si el servicio cae o cambia precios, pierdes acceso a tu historial

Meetily elimina estos tres problemas: es gratuito, es local, y tus datos son tuyos.

## Cómo funciona

### Transcripción en tiempo real
Meetily captura el audio de tu micrófono y del sistema (la voz de los demás participantes) y lo transcribe usando modelos optimizados de Whisper (Parakeet de NVIDIA para inglés, Whisper para otros idiomas). La transcripción aparece en tiempo real conforme habláis.

### Detección de hablantes (diarización)
No solo transcribe qué se dice — identifica QUIÉN lo dice. Separa las voces automáticamente y asigna cada fragmento al hablante correcto. Crítico para reuniones con múltiples personas.

### Resumen con IA
Al terminar la reunión, un LLM local (Ollama) genera:
- **Resumen ejecutivo**: los puntos más importantes en 3-5 frases
- **Action items**: tareas pendientes extraídas automáticamente ("Juan revisará el presupuesto antes del viernes")
- **Decisiones tomadas**: lo que se acordó en la reunión
- **Puntos de debate**: temas donde hubo desacuerdo

### Todo local
El procesamiento ocurre en tu máquina. El audio no sale de tu ordenador. Los modelos de transcripción y el LLM corren localmente con Ollama.

## Comparativa con los servicios de pago

| | Meetily | Fireflies.ai | Otter.ai |
|---|---|---|---|
| Precio | Gratis | 19$/mes | 20$/mes |
| Privacidad | 100% local | Cloud | Cloud |
| Transcripción en vivo | Sí | Sí | Sí |
| Diarización | Sí | Sí | Sí |
| Resumen IA | Sí (local) | Sí | Sí |
| Action items | Sí | Sí | Sí |
| Calidad transcripción | Muy buena | Excelente | Excelente |
| Idiomas | Multiidioma | Multiidioma | Solo inglés |

## Requisitos

- CPU moderna (la transcripción usa Parakeet/Whisper optimizado)
- 8GB+ RAM
- Ollama instalado para el resumen con IA
- Funciona en Mac, Windows y Linux

## Instalación

\`\`\`bash
git clone https://github.com/Zackriya-Solutions/meetily.git
cd meetily
pip install -r requirements.txt
python main.py
\`\`\``,
    image_prompt: "Meeting transcription interface with real-time text appearing, speaker identification labels, AI summary being generated, local processing indicators, purple meeting tech elements, dark professional workspace",
  },
  {
    source: "github", source_id: "leanstartpad/espanso", url: "https://github.com/leanstartpad/espanso",
    name: "Espanso", stars: 12000, language: "Rust", author: "espanso", category_id: 8,
    difficulty: "facil", interest_score: 87, is_oss_alternative: true, alternative_to: "TextExpander",
    tags: ["productividad", "texto", "automatización", "rust", "privacidad"],
    seo_slug: "espanso-text-expander-open-source-rust",
    seo_title: "Espanso: Escribe 3 letras y se convierten en un email completo — text expander open source",
    seo_description: "Espanso expande abreviaciones en texto, código, emails completos. Escrito en Rust, 100% local, open source. Alternativa a TextExpander.",
    summary_es: `Espanso es un text expander open source escrito en Rust que te permite definir abreviaciones que se expanden automáticamente cuando las escribes. Escribes \`:firma\` y aparece tu firma profesional completa. Escribes \`:hoy\` y aparece la fecha actual formateada. Escribes \`:email-presupuesto\` y aparece un email de 5 párrafos con plantilla de presupuesto.

Los profesionales que dominan un text expander ganan horas cada semana porque nunca escriben lo mismo dos veces.

## Ejemplos que cambian tu productividad

### Comunicación
- \`:saludo\` → "Hola, espero que estés bien. Te escribo respecto a..."
- \`:firma\` → Nombre completo + cargo + teléfono + web + disclamer legal
- \`:seguimiento\` → Email completo de seguimiento tras reunión
- \`:presupuesto\` → Template de propuesta con campos a rellenar

### Código
- \`:compfn\` → Template de componente React funcional con imports
- \`:apiroute\` → Boilerplate de endpoint API con error handling
- \`:testit\` → Estructura de test con describe/it/expect
- \`:dockercomp\` → docker-compose.yml base con DB y app

### Datos
- \`:hoy\` → 2026-04-04 (fecha actual)
- \`:hora\` → 14:35 (hora actual)
- \`:uuid\` → genera un UUID v4 al instante
- \`:lorem\` → párrafo de Lorem Ipsum

### Correcciones
- \`teh\` → the (autocorrección)
- \`pq\` → porque
- \`tb\` → también

## Por qué Espanso y no TextExpander

TextExpander cuesta 40$/año y sincroniza tus snippets en su nube (incluyendo tus emails, firmas y datos potencialmente sensibles). Espanso es gratuito, open source, y todo se queda en tu disco duro.

## Funcionalidades avanzadas

- **Variables dinámicas**: fecha, hora, portapapeles, output de scripts
- **Scripts**: ejecuta Python, Bash, o cualquier comando y usa el output como expansión
- **Formularios**: pide datos al expandir (nombre del cliente, cantidad, fecha)
- **Imágenes**: expande abreviaciones en imágenes
- **Regex triggers**: patrones avanzados como trigger
- **Sincronización**: sincroniza via Git o cualquier servicio de archivos
- **Multiplataforma**: Windows, macOS, Linux

## Instalación

\`\`\`bash
# macOS
brew install espanso

# Windows
winget install espanso

# Linux (Snap)
sudo snap install espanso
\`\`\`

Después de instalar, los snippets se definen en archivos YAML simples:

\`\`\`yaml
matches:
  - trigger: ":firma"
    replace: |
      Guillermo del Pino
      Desarrollador & Creador de OffRadar
      guillermo@offradar.es | offradar.es

  - trigger: ":hoy"
    replace: "{{date}}"
    vars:
      - name: date
        type: date
        params:
          format: "%Y-%m-%d"
\`\`\``,
    image_prompt: "Text being typed and magically expanding into full emails and code snippets, keyboard with expansion arrows, productivity shortcuts visualization, purple text expansion elements, dark productivity workspace",
  },
  {
    source: "github", source_id: "siddharthvaddem/openscreen", url: "https://github.com/siddharthvaddem/openscreen",
    name: "OpenScreen", stars: 9500, language: "TypeScript", author: "siddharthvaddem", category_id: 8,
    difficulty: "facil", interest_score: 88, is_oss_alternative: true, alternative_to: "Screen Studio",
    tags: ["grabación", "pantalla", "vídeo", "open-source", "productividad"],
    seo_slug: "openscreen-alternativa-screen-studio-gratis",
    seo_title: "OpenScreen: La alternativa gratuita y open source a Screen Studio",
    seo_description: "OpenScreen graba tu pantalla con zooms automáticos, fondos bonitos y anotaciones. Sin watermark, sin pagar 89$. Open source. 9.5k estrellas.",
    summary_es: `OpenScreen es la alternativa open source y completamente gratuita a Screen Studio — la app de Mac de 89$ que popularizó las grabaciones de pantalla con zoom automático al cursor, fondos bonitos y edición inteligente. OpenScreen te da todo eso sin pagar un céntimo y sin marca de agua.

## Qué hace Screen Studio (y por qué cuesta 89$)

Screen Studio grabó un nicho enorme porque sus grabaciones de pantalla parecen producidas por un equipo de vídeo profesional: zooms suaves que siguen tu cursor, la ventana de la app flotando sobre fondos con gradiente, movimientos fluidos, y exportación en formato perfecto para cada red social. Los vídeos de demos de producto que ves en Twitter que parecen super profesionales probablemente están hechos con Screen Studio.

## OpenScreen hace lo mismo, gratis

- **Grabación de pantalla y ventana**: captura toda la pantalla o ventanas específicas
- **Zooms automáticos y suaves**: como Screen Studio, sigue tus clics con zooms cinematográficos
- **Anotaciones**: añade flechas, texto, imágenes y formas sobre la grabación
- **Fondos personalizados**: la ventana flota sobre fondos elegantes con gradientes o imágenes
- **Motion blur**: efecto de desenfoque de movimiento para fluidez visual
- **Velocidad variable**: acelera o ralentiza secciones del vídeo
- **Exportación múltiple**: cualquier formato, cualquier resolución, sin watermark nunca

## Para quién es

- **Creadores de contenido tech**: demos de producto, tutoriales, showcases
- **Desarrolladores**: grabaciones de cómo funciona tu proyecto para el README o la documentación
- **Marketers**: vídeos de producto profesionales sin equipo de vídeo
- **Cualquiera que grabe pantalla**: si usas OBS para grabaciones simples, OpenScreen produce mejor resultado con menos esfuerzo

## OpenScreen vs Screen Studio

| | OpenScreen | Screen Studio |
|---|---|---|
| Precio | Gratis | 89$ (pago único) |
| Watermark | Nunca | No (versión de pago) |
| Open source | Sí | No |
| Plataformas | Windows, Mac, Linux | Solo Mac |
| Zoom automático | Sí | Sí |
| Fondos personalizados | Sí | Sí |
| Anotaciones | Sí | Limitadas |

## Instalación

Descarga desde las releases de GitHub para tu plataforma. No necesita configuración.`,
    image_prompt: "Screen recording software showing a floating app window over a beautiful gradient background, automatic zoom following cursor, recording controls, purple recording elements, dark content creation workspace",
  },
  {
    source: "github", source_id: "understudy-ai/understudy", url: "https://github.com/understudy-ai/understudy",
    name: "Understudy", stars: 4800, language: "Swift", author: "understudy-ai", category_id: 1,
    difficulty: "facil", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "automatización", "mac", "aprendizaje", "sin-código"],
    seo_slug: "understudy-ia-aprende-tareas-observando",
    seo_title: "Understudy: Una IA que aprende tareas repetitivas viéndote y las hace sola para siempre",
    seo_description: "Understudy observa cómo haces una tarea en tu Mac, la aprende, y la ejecuta sola para siempre. Sin código, 100% local, se adapta a cambios.",
    summary_es: `Understudy es una IA que corre en tu Mac y aprende tareas repetitivas **observándote**. Le enseñas una vez cómo hacer algo — por ejemplo, descargar un informe de una web, rellenar un formulario, o mover archivos entre carpetas — y Understudy lo memoriza y lo ejecuta por ti automáticamente de ahí en adelante. Sin código, sin configuración, sin APIs.

## Cómo funciona

### 1. Le enseñas
Activas la grabación, haces la tarea manualmente como siempre la harías (clics, escritura, navegación), y paras la grabación. Understudy observa exactamente qué hiciste.

### 2. Aprende
La IA analiza la grabación y crea un modelo interno de la tarea: qué elementos de la interfaz interactuaste, en qué orden, qué datos introdujiste, qué condiciones había.

### 3. Ejecuta
Le dices "hazlo" y Understudy repite la tarea. Pero no es una simple macro que repite clics en coordenadas fijas — la IA **entiende** la interfaz visualmente. Si la web cambia su diseño, si un botón se mueve, Understudy se adapta porque "ve" la pantalla como tú la ves.

## Por qué es diferente a Automator, Keyboard Maestro o macros

Las herramientas de automatización tradicionales graban clics en coordenadas de pantalla o usan selectores de elementos fijos. Si la web cambia un pixel de posición, se rompe todo. Understudy usa visión por computador y IA para entender QUÉ es cada elemento, no DÓNDE está. Es mucho más robusto.

## Casos de uso reales

- **Informes diarios**: "Cada mañana, abre esta web, descarga el CSV de ventas, y guárdalo en esta carpeta"
- **Data entry**: "Coge estos datos del Excel y rellénalos en este formulario web, uno por uno"
- **Social media**: "Abre esta herramienta, crea un post con este formato, y prográmalo"
- **Administración**: "Mueve los emails de este remitente a esta carpeta y márcalos como procesados"

## Limitaciones

- **Solo Mac**: por ahora solo funciona en macOS (Apple Silicon)
- **100% local**: toda la IA corre en tu Mac, lo que es genial para privacidad pero requiere un Mac moderno
- **Tareas visuales**: funciona con tareas que involucran interfaces gráficas, no con lógica de negocio compleja

## Instalación

Descarga desde la web del proyecto. Solo para Mac con Apple Silicon (M1/M2/M3/M4).

## Por qué importa

Understudy es una de las primeras herramientas que hace realidad la promesa de "IA que elimina trabajo repetitivo" de una forma que cualquier persona puede usar — sin programar, sin APIs, sin configuración. Le enseñas algo UNA VEZ y nunca más lo vuelves a hacer tú.`,
    image_prompt: "AI observing a user performing tasks on Mac screen, learning patterns, then autonomously repeating the task, robotic eyes watching screen actions, purple AI learning elements, dark Mac workspace background",
  },
  {
    source: "github", source_id: "useautumn/autumn", url: "https://github.com/useautumn/autumn",
    name: "Autumn", stars: 3800, language: "TypeScript", author: "useautumn", category_id: 2,
    difficulty: "medio", interest_score: 88, is_oss_alternative: true, alternative_to: "Stripe Billing",
    tags: ["saas", "billing", "pricing", "stripe", "open-source"],
    seo_slug: "autumn-billing-pricing-saas-open-source",
    seo_title: "Autumn: Pricing y billing para tu SaaS resuelto en 3 líneas de código",
    seo_description: "Autumn gestiona suscripciones, créditos, uso por consumo y planes custom entre Stripe y tu app. Self-hosteable y open source.",
    summary_es: `Si estás construyendo un SaaS, sabes que implementar billing es una pesadilla. Stripe es potente pero complejo: webhooks, upgrades, downgrades, proration, créditos, uso por consumo, planes custom, período de prueba... cada caso es un rabbit hole de código. Autumn se pone entre Stripe y tu app y resuelve todo con una API simple.

## El dolor del billing en SaaS

Implementar billing "bien" en un SaaS típico requiere:

- Crear productos y precios en Stripe
- Manejar webhooks de Stripe (checkout.session.completed, invoice.paid, customer.subscription.updated, customer.subscription.deleted...)
- Lógica de upgrade/downgrade con proration
- Feature flags por plan (quién puede usar qué)
- Límites de uso (cuotas, rate limits por plan)
- Período de prueba y conversión
- Facturación por uso (metered billing)
- Gestión de créditos
- UI de pricing page
- Portal de cliente para cambiar plan

Hacerlo bien lleva semanas de desarrollo. Autumn lo resuelve.

## Cómo funciona

### 1. Defines tus planes en el dashboard visual
Creas tus planes de pricing con todos los detalles: features incluidas, límites, precios, períodos de prueba.

### 2. Conectas con 3 líneas de código
\`\`\`javascript
import Autumn from '@useautumn/sdk';
const autumn = new Autumn('tu-api-key');

// Verificar si el usuario puede usar una feature
const canUse = await autumn.check('user-123', 'advanced-reports');

// Registrar uso (para billing por consumo)
await autumn.track('user-123', 'api-calls', 1);
\`\`\`

### 3. Autumn gestiona todo lo demás
Webhooks de Stripe, upgrades, downgrades, invoices, créditos, límites de uso — todo gestionado automáticamente.

## Modelos de pricing que soporta

- **Suscripciones**: planes mensuales/anuales con features por plan
- **Uso por consumo**: cobra por API calls, tokens, almacenamiento, etc.
- **Créditos**: paquetes de créditos que se gastan al usar features
- **Asientos**: precio por usuario/asiento
- **Planes custom**: combinaciones de todo lo anterior
- **Freemium + trials**: período de prueba con conversión automática

## Self-hosteable

\`\`\`bash
# Docker + Bun
git clone https://github.com/useautumn/autumn.git
cd autumn
docker compose up -d
\`\`\`

## Para quién es

- **Founders de SaaS**: implementa billing profesional en horas en vez de semanas
- **Desarrolladores indie**: no pierdas tiempo en billing, dedícalo a tu producto
- **Equipos pequeños**: billing enterprise sin equipo dedicado de billing

Si estás construyendo un SaaS y todavía no has implementado el billing, empieza con Autumn. Si ya lo tienes implementado a mano y te da dolores de cabeza, migrar a Autumn te va a simplificar la vida enormemente.`,
    image_prompt: "SaaS billing dashboard showing subscription plans, usage meters, Stripe integration, pricing configuration interface, payment flow visualization, purple SaaS elements, dark business application background",
  },
  {
    source: "github", source_id: "video-db/call.md", url: "https://github.com/video-db/call.md",
    name: "call.md", stars: 6200, language: "Python", author: "video-db", category_id: 8,
    difficulty: "medio", interest_score: 90, is_oss_alternative: true, alternative_to: "Fireflies.ai + Gong.io",
    tags: ["reuniones", "ia", "coach", "local", "ventas"],
    seo_slug: "call-md-asistente-ia-reuniones-tiempo-real",
    seo_title: "call.md: Un coach de IA que te susurra al oído durante reuniones en tiempo real",
    seo_description: "call.md transcribe reuniones localmente, te da consejos en tiempo real, genera resúmenes y action items. Open source, 100% privado.",
    summary_es: `call.md no es solo una herramienta de transcripción de reuniones — es un **coach de IA en tiempo real** que te asiste mientras hablas. Mientras estás en una videollamada con un cliente, call.md te susurra sugerencias: "Estás hablando de más", "Haz esta pregunta ahora", "El cliente está dudando aquí". Y cuando cuelgas, tienes un resumen perfecto con action items automáticos.

## Qué hace exactamente

### Durante la reunión (en tiempo real)
- **Transcripción en vivo**: separa tu voz de la del interlocutor
- **Coaching en directo**: la IA te da sugerencias basándose en la conversación
- **Detección de sentimiento**: identifica cuándo el interlocutor está dudando, interesado, o frustrado
- **Notas automáticas**: captura puntos clave mientras hablas

### Después de la reunión
- **Resumen inteligente**: los puntos más importantes en formato estructurado
- **Action items**: tareas extraídas automáticamente ("Juan enviará el presupuesto antes del viernes")
- **Momentos clave**: timestamps de los momentos más importantes de la conversación
- **Export**: a Notion, CRM, o cualquier herramienta vía API

### Privacidad total
Todo se procesa localmente. El audio no sale de tu ordenador. Los modelos de transcripción y el LLM corren con Ollama en tu máquina.

## Para quién es game-changer

### Equipos de ventas
Gong.io (la herramienta de "conversational intelligence" que usan los equipos de ventas top) cuesta miles de euros al mes. call.md te da funcionalidades similares — coaching en vivo, análisis de conversación, resúmenes — gratis y sin enviar las grabaciones de tus clientes a un tercero.

### Freelancers y consultores
Cada reunión con cliente genera automáticamente un resumen con los acuerdos y las tareas pendientes. No más "¿qué habíamos quedado?".

### Managers
Las reuniones one-on-one generan action items automáticos. El seguimiento se hace solo.

## La diferencia con Fireflies/Otter

| | call.md | Fireflies | Gong |
|---|---|---|---|
| Precio | Gratis | 19$/mes | Miles $/mes |
| Privacidad | 100% local | Cloud | Cloud |
| Coaching en vivo | Sí | No | Sí (caro) |
| Detección sentimiento | Sí | No | Sí |
| Resumen + action items | Sí | Sí | Sí |

## Instalación

\`\`\`bash
git clone https://github.com/video-db/call.md.git
cd call.md
pip install -r requirements.txt
python app.py
\`\`\`

Necesitas Ollama instalado para el LLM local. Funciona en Mac, Windows y Linux.`,
    image_prompt: "AI coaching assistant during a video call, real-time transcription text flowing, sentiment analysis indicators, meeting summary being generated, whispered suggestions, purple AI coach elements, dark meeting workspace",
  },
  {
    source: "github", source_id: "ChrisTitusTech/winutil", url: "https://github.com/ChrisTitusTech/winutil",
    name: "WinUtil", stars: 50600, language: "PowerShell", author: "ChrisTitusTech", category_id: 8,
    difficulty: "facil", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["windows", "optimización", "limpieza", "privacidad", "utilidades"],
    seo_slug: "winutil-optimizar-windows-herramienta-definitiva",
    seo_title: "WinUtil: La herramienta definitiva para optimizar Windows (50k estrellas)",
    seo_description: "WinUtil optimiza Windows 10/11 en 2 clics: elimina bloatware, desactiva telemetría, instala apps, configura tweaks. 50k estrellas en GitHub.",
    summary_es: `WinUtil (de Chris Titus Tech, uno de los YouTubers de tecnología más populares) es LA herramienta que todo usuario de Windows debería conocer. Con una interfaz visual simple, te permite optimizar tu Windows en minutos: eliminar bloatware, desactivar telemetría, instalar apps esenciales, y aplicar tweaks de rendimiento. 50.000 estrellas en GitHub — probablemente la utilidad de Windows más popular del open source.

## Qué puede hacer

### Instalación de apps
Un marketplace visual donde seleccionas las apps que quieres instalar y WinUtil las instala todas de golpe usando winget (el gestor de paquetes de Windows). Firefox, VLC, 7-Zip, VS Code, Python, Git... selecciona y dale a "Install". Sin ir web por web descargando instaladores.

### Tweaks de sistema
- **Desactivar telemetría de Microsoft**: deja de enviar datos a Microsoft
- **Desactivar Cortana**: si no la usas, libera recursos
- **Desactivar widgets**: ese panel de noticias que nadie pidió
- **Optimizar servicios**: desactiva servicios que no necesitas
- **Desactivar Game Bar**: si no juegas, consume recursos innecesariamente
- **DNS personalizado**: configura DNS de Cloudflare o Google con un clic
- **Activar modo de rendimiento**: prioriza rendimiento sobre efectos visuales

### Eliminación de bloatware
Un clic para eliminar todas las apps preinstaladas que no pediste: Clipchamp, Microsoft News, Solitaire Collection, Spotify preinstalado, etc.

### Actualización de drivers
Detecta y actualiza drivers desactualizados.

## Cómo usarlo

\`\`\`powershell
# Abrir PowerShell como Administrador y ejecutar:
irm "https://christitus.com/win" | iex
\`\`\`

Se abre una interfaz gráfica con pestañas: Install (instalar apps), Tweaks (optimizar), Config (configurar), y Updates (actualizar). Todo visual, todo con un clic.

## ¿Es seguro?

El código es open source y revisado por miles de personas. Chris Titus Tech es un creador de contenido establecido con millones de seguidores. Cada cambio que hace WinUtil es reversible y documentado. Dicho esto, como con cualquier herramienta que modifica el sistema, es recomendable tener un punto de restauración antes de hacer cambios agresivos.

## WinUtil vs Win11Debloat

Ambos son excelentes. Win11Debloat está más enfocado en limpieza y privacidad. WinUtil es más completo: además de la limpieza, incluye instalación de apps, tweaks avanzados, y configuración de sistema.

## Instalación

\`\`\`powershell
irm "https://christitus.com/win" | iex
\`\`\``,
    image_prompt: "Windows optimization tool interface with toggle switches for tweaks, app installation grid, system cleanup progress bar, performance metrics improving, purple Windows elements, dark system administration background",
  },
];

async function main() {
  console.log(`=== OffRadar: Repos de X — ${projects.length} proyectos ===\n`);
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i+1}/${projects.length}] ${p.name}...`);
    console.log(`  📸 Imagen...`);
    const imgUrl = await generateImage(p.image_prompt, p.seo_slug);
    if (imgUrl) console.log(`  ✓ ${imgUrl}`);
    else console.log(`  ⚠ Sin imagen`);
    try {
      await sql`
        INSERT INTO projects (source, source_id, url, name, description, summary_es, category_id, tags, difficulty, interest_score, stars, language, is_oss_alternative, alternative_to, replicable_with_code, featured_image_url, status, priority, seo_slug, seo_title, seo_description, author, created_at, updated_at, published_at)
        VALUES (${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.seo_description}, ${p.summary_es}, ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars}, ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to}, ${null}, ${imgUrl}, 'published', 'high', ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author}, NOW(), NOW(), NOW())
        ON CONFLICT (source, source_id) DO UPDATE SET stars = EXCLUDED.stars, summary_es = EXCLUDED.summary_es, featured_image_url = COALESCE(EXCLUDED.featured_image_url, projects.featured_image_url), updated_at = NOW()
      `;
      console.log(`  ✓ DB`);
    } catch(e) { console.error(`  ✗ ${e.message}`); }
    if (i < projects.length - 1) await new Promise(r => setTimeout(r, 8000));
  }
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\n✅ Total: ${count[0].n} proyectos publicados`);
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });

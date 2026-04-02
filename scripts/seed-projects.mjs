import postgres from "postgres";
import https from "https";
import fs from "fs";
import path from "path";

const DB_URL = "postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar";
const GEMINI_KEY = "AIzaSyDeJCd9ojfJ5pPMcDfxPXewKvbAsYRbEIk";
const IMG_DIR = "/Users/guillermodelpinohernandez/Documents/offroad/apps/web/public/images/projects";

const sql = postgres(DB_URL);

const projects = [
  {
    source: "github", source_id: "browser-use/browser-use",
    url: "https://github.com/browser-use/browser-use",
    name: "Browser Use",
    description: "Make websites accessible for AI agents. Automate tasks online with ease.",
    summary_es: "Browser Use permite que agentes de IA controlen un navegador web de forma autónoma. Imagina decirle a una IA \"busca vuelos baratos a Lisboa para mayo\" y que ella sola abra el navegador, navegue por Skyscanner, compare precios y te devuelva los resultados. Es exactamente lo que hace esta herramienta. Compatible con cualquier modelo de lenguaje (GPT-4, Claude, Gemini), Browser Use se ha convertido en una de las librerías más virales del momento porque abre la puerta a automatizar cualquier tarea que harías manualmente en un navegador: rellenar formularios, extraer datos, hacer compras, monitorizar precios... todo sin escribir selectores CSS ni lidiar con APIs.",
    tags: ["ia", "automatización", "navegador", "agentes", "scraping"],
    difficulty: "medio", interest_score: 94, stars: 85623, language: "Python",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: "Con Claude Code puedes crear tu propio agente que controle el navegador usando Playwright + la API de Claude para decidir qué hacer en cada paso.",
    seo_slug: "browser-use-ia-controla-tu-navegador",
    seo_title: "Browser Use: Deja que la IA controle tu navegador y automatice cualquier tarea",
    seo_description: "Browser Use permite que agentes de IA naveguen por internet de forma autónoma. Automatiza búsquedas, formularios, compras y más. Open source con 85k estrellas.",
    author: "browser-use", category_id: 1,
    image_prompt: "Minimalist tech illustration of an AI robot hand clicking on a modern web browser, glowing purple cursor trail, dark violet background, floating webpage elements, futuristic and clean design"
  },
  {
    source: "github", source_id: "langgenius/dify",
    url: "https://github.com/langgenius/dify",
    name: "Dify",
    description: "Production-ready platform for agentic workflow development.",
    summary_es: "Dify es una plataforma visual para construir aplicaciones de inteligencia artificial sin necesidad de ser un experto en código. Con su editor de flujos arrastrar y soltar, puedes crear chatbots, asistentes RAG (que consultan tus documentos), agentes autónomos y flujos de trabajo complejos que combinan múltiples modelos de IA. Lo que hace especial a Dify es que está pensado para producción: incluye gestión de prompts, evaluación de calidad, monitorización de costes y soporte para cientos de modelos. Es como tener un Zapier especializado en IA, pero open source y con control total sobre tus datos.",
    tags: ["ia", "agentes", "workflow", "llm", "nocode", "rag"],
    difficulty: "medio", interest_score: 96, stars: 135473, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Zapier AI + ChatGPT",
    replicable_with_code: null,
    seo_slug: "dify-plataforma-visual-agentes-ia",
    seo_title: "Dify: Crea agentes y flujos de IA de forma visual, sin código",
    seo_description: "Dify es la plataforma open source para construir aplicaciones de IA con flujos visuales. Alternativa a Zapier AI con 135k estrellas en GitHub.",
    author: "langgenius", category_id: 1,
    image_prompt: "Abstract flowing data streams connecting AI agent nodes in a visual workflow builder, purple and pink gradient connections, dark background, modern interface mockup, professional and clean"
  },
  {
    source: "github", source_id: "rustdesk/rustdesk",
    url: "https://github.com/rustdesk/rustdesk",
    name: "RustDesk",
    description: "An open-source remote desktop application designed for self-hosting.",
    summary_es: "RustDesk es la alternativa open source a TeamViewer que todo el mundo estaba esperando. Te permite controlar cualquier ordenador de forma remota con una interfaz limpia y rápida, y lo mejor: puedes montar tu propio servidor para que todo el tráfico pase por tu infraestructura, sin depender de terceros. Escrito en Rust, es extremadamente rápido y consume pocos recursos. Funciona en Windows, Mac, Linux, Android e iOS. Si alguna vez has sufrido las limitaciones del plan gratuito de TeamViewer o te preocupa la privacidad, RustDesk es tu solución.",
    tags: ["self-hosted", "escritorio-remoto", "privacidad", "multiplataforma", "rust"],
    difficulty: "facil", interest_score: 93, stars: 110419, language: "Rust",
    is_oss_alternative: true, alternative_to: "TeamViewer",
    replicable_with_code: null,
    seo_slug: "rustdesk-alternativa-teamviewer-open-source",
    seo_title: "RustDesk: La alternativa open source a TeamViewer que puedes self-hostear",
    seo_description: "RustDesk es una app de escritorio remoto open source, rápida y privada. Controla cualquier PC desde cualquier sitio sin depender de TeamViewer.",
    author: "rustdesk", category_id: 3,
    image_prompt: "Two modern computer monitors connected by a glowing purple beam, remote desktop visualization, dark background with subtle grid pattern, secure padlock icon, clean minimal tech design"
  },
  {
    source: "github", source_id: "localsend/localsend",
    url: "https://github.com/localsend/localsend",
    name: "LocalSend",
    description: "An open-source cross-platform alternative to AirDrop.",
    summary_es: "LocalSend hace algo que debería haber existido desde siempre: enviar archivos entre cualquier dispositivo de tu red local sin necesidad de internet, sin crear cuentas, sin instalar nada raro. Funciona como AirDrop, pero entre Android, iOS, Windows, Mac y Linux. Abres la app, ves los dispositivos cercanos, seleccionas el archivo y se envía al instante por WiFi. Es rápido, privado (todo se queda en tu red local) y no tiene límite de tamaño. Perfecto para pasar fotos del móvil al PC, compartir documentos en la oficina o enviar vídeos pesados sin subirlos a la nube.",
    tags: ["productividad", "compartir-archivos", "multiplataforma", "privacidad", "local"],
    difficulty: "facil", interest_score: 91, stars: 77534, language: "Dart",
    is_oss_alternative: true, alternative_to: "AirDrop",
    replicable_with_code: null,
    seo_slug: "localsend-airdrop-open-source-cualquier-dispositivo",
    seo_title: "LocalSend: El AirDrop open source que funciona entre cualquier dispositivo",
    seo_description: "Envía archivos entre Android, iOS, Windows, Mac y Linux sin internet. LocalSend es la alternativa open source a AirDrop con 77k estrellas.",
    author: "localsend", category_id: 8,
    image_prompt: "Multiple devices (smartphone, laptop, tablet) exchanging files with purple glowing wireless transfer arrows between them, dark background, clean modern icons, seamless sharing concept"
  },
  {
    source: "github", source_id: "AppFlowy-IO/AppFlowy",
    url: "https://github.com/AppFlowy-IO/AppFlowy",
    name: "AppFlowy",
    description: "AI collaborative workspace where you achieve more without losing control of your data.",
    summary_es: "AppFlowy es la alternativa open source a Notion que no sacrifica funcionalidad por privacidad. Tiene todo lo que esperas: documentos colaborativos, bases de datos con vistas de tabla, kanban, calendario, y ahora también integración con IA para generar contenido, resumir textos y organizar ideas. La diferencia clave con Notion es que tú controlas tus datos: puedes self-hostearlo o usar su nube. La interfaz es limpia y moderna, con una experiencia de usuario que compite directamente con el original. Si usas Notion pero te preocupa tener tus notas en servidores ajenos, AppFlowy es tu alternativa.",
    tags: ["productividad", "notas", "self-hosted", "ia", "colaboración"],
    difficulty: "facil", interest_score: 90, stars: 68887, language: "Dart",
    is_oss_alternative: true, alternative_to: "Notion",
    replicable_with_code: null,
    seo_slug: "appflowy-alternativa-notion-open-source",
    seo_title: "AppFlowy: La alternativa open source a Notion con IA integrada",
    seo_description: "AppFlowy ofrece documentos, bases de datos y kanban como Notion, pero open source y con control total de tus datos. 68k estrellas en GitHub.",
    author: "AppFlowy-IO", category_id: 8,
    image_prompt: "Modern workspace interface with organized notes, kanban boards and documents, AI sparkle icons, purple accent highlights, dark elegant theme, productivity and collaboration feel"
  },
  {
    source: "github", source_id: "OpenCut-app/OpenCut",
    url: "https://github.com/OpenCut-app/OpenCut",
    name: "OpenCut",
    description: "The open-source CapCut alternative.",
    summary_es: "OpenCut es el editor de vídeo open source que quiere destronar a CapCut. Con una interfaz moderna y familiar, permite editar vídeos con las herramientas que necesitas para contenido de redes sociales: cortes, transiciones, texto animado, filtros y efectos. Lo que lo hace especial es que es completamente gratuito sin marcas de agua, sin suscripciones y sin que una empresa china tenga acceso a tu contenido. Está creciendo a una velocidad impresionante en GitHub y la comunidad está añadiendo funciones nuevas cada semana. Ideal para creadores de contenido que quieren una alternativa profesional y privada.",
    tags: ["vídeo", "edición", "creadores", "open-source", "multimedia"],
    difficulty: "facil", interest_score: 89, stars: 47610, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "CapCut",
    replicable_with_code: null,
    seo_slug: "opencut-alternativa-capcut-open-source",
    seo_title: "OpenCut: El editor de vídeo open source que planta cara a CapCut",
    seo_description: "Edita vídeos gratis sin marcas de agua ni suscripciones. OpenCut es la alternativa open source a CapCut con 47k estrellas en GitHub.",
    author: "OpenCut-app", category_id: 8,
    image_prompt: "Video editing timeline with colorful clips and transitions, AI magic wand tool, film frames floating, purple neon accents on dark cinematic background, modern editor interface"
  },
  {
    source: "github", source_id: "louislam/uptime-kuma",
    url: "https://github.com/louislam/uptime-kuma",
    name: "Uptime Kuma",
    description: "A fancy self-hosted monitoring tool.",
    summary_es: "Uptime Kuma es la herramienta de monitorización más bonita que vas a encontrar. Con una interfaz elegante y clara, te permite vigilar que tus webs, APIs y servicios estén funcionando, y te avisa al instante por Telegram, Discord, Slack, email o decenas de canales más cuando algo falla. Configurarlo lleva literalmente 2 minutos con Docker, y desde ese momento tienes un dashboard en tiempo real con gráficas de uptime, tiempos de respuesta e historial de incidentes. Es la alternativa self-hosted perfecta a servicios de pago como UptimeRobot o Pingdom, con la ventaja de que es completamente gratis y tus datos no salen de tu servidor.",
    tags: ["monitorización", "self-hosted", "devops", "alertas", "dashboard"],
    difficulty: "facil", interest_score: 92, stars: 84759, language: "JavaScript",
    is_oss_alternative: true, alternative_to: "UptimeRobot",
    replicable_with_code: null,
    seo_slug: "uptime-kuma-monitorizacion-self-hosted",
    seo_title: "Uptime Kuma: Monitoriza tus webs con estilo desde tu propio servidor",
    seo_description: "Uptime Kuma es la herramienta de monitorización self-hosted más popular. Alternativa gratuita a UptimeRobot con 84k estrellas.",
    author: "louislam", category_id: 3,
    image_prompt: "Monitoring dashboard with green status dots, uptime percentage graphs, heartbeat pulse line, server health indicators, purple and green colors on dark background, professional DevOps feel"
  },
  {
    source: "github", source_id: "harry0703/MoneyPrinterTurbo",
    url: "https://github.com/harry0703/MoneyPrinterTurbo",
    name: "MoneyPrinterTurbo",
    description: "Generate short videos with one click using AI LLM.",
    summary_es: "MoneyPrinterTurbo genera vídeos cortos completos con un solo clic usando inteligencia artificial. Le das un tema (\"5 curiosidades sobre el espacio\"), y automáticamente genera el guión, selecciona imágenes y clips de stock, crea la narración con voz IA, añade subtítulos y monta el vídeo final listo para subir a TikTok, YouTube Shorts o Instagram Reels. Es la herramienta que está detrás de muchos canales de \"faceless content\" que ves en redes. Soporta múltiples idiomas (incluido español), diferentes estilos de voz, y puedes personalizar cada paso del proceso. Ideal para quien quiere crear contenido de forma masiva sin ponerse delante de una cámara.",
    tags: ["ia", "vídeo", "contenido", "tiktok", "automatización"],
    difficulty: "medio", interest_score: 91, stars: 54816, language: "Python",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: "Con Claude Code puedes crear un generador de vídeos similar combinando APIs de TTS, generación de imágenes y FFmpeg para el montaje.",
    seo_slug: "moneyprinterturbo-genera-videos-ia-automaticamente",
    seo_title: "MoneyPrinterTurbo: Genera vídeos virales con IA en un solo clic",
    seo_description: "Crea vídeos cortos para TikTok, YouTube Shorts e Instagram automáticamente con IA. Guión, voz, imágenes y montaje, todo automático.",
    author: "harry0703", category_id: 1,
    image_prompt: "AI generating short-form video content, multiple video frames flowing from a glowing neural network, social media icons (TikTok, YouTube), purple energy streams, dark futuristic background"
  },
  {
    source: "github", source_id: "twentyhq/twenty",
    url: "https://github.com/twentyhq/twenty",
    name: "Twenty",
    description: "Building a modern alternative to Salesforce, powered by the community.",
    summary_es: "Twenty es un CRM open source moderno que quiere ser la alternativa a Salesforce para equipos que no quieren pagar miles de euros al mes. Tiene una interfaz limpia y contemporánea (nada que ver con la pesadez de Salesforce), gestión de contactos, empresas, oportunidades de venta, pipeline visual, y todo lo que necesitas para gestionar relaciones comerciales. Lo que lo diferencia es su enfoque en la extensibilidad: puedes conectarlo con cualquier herramienta vía API, crear campos personalizados y adaptar los flujos a tu negocio. Perfecto para startups, freelancers y pymes que necesitan un CRM potente sin arruinarse.",
    tags: ["crm", "ventas", "self-hosted", "negocio", "open-source"],
    difficulty: "medio", interest_score: 87, stars: 43477, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Salesforce",
    replicable_with_code: null,
    seo_slug: "twenty-crm-open-source-alternativa-salesforce",
    seo_title: "Twenty: El CRM open source moderno que planta cara a Salesforce",
    seo_description: "Twenty es un CRM open source con interfaz moderna, pipeline visual y gestión completa de contactos. Alternativa gratuita a Salesforce.",
    author: "twentyhq", category_id: 8,
    image_prompt: "Modern CRM dashboard with contact cards, deal pipeline columns, business charts, clean purple interface elements, dark professional theme, sales management visualization"
  },
  {
    source: "github", source_id: "browserbase/stagehand",
    url: "https://github.com/browserbase/stagehand",
    name: "Stagehand",
    description: "The AI Browser Automation Framework.",
    summary_es: "Stagehand lleva la automatización de navegador al siguiente nivel con inteligencia artificial. En vez de escribir selectores CSS frágiles que se rompen cuando la web cambia, le dices a Stagehand en lenguaje natural qué quieres hacer: \"haz clic en el botón de iniciar sesión\", \"rellena el formulario con estos datos\", \"extrae todos los precios de la tabla\". La IA entiende la página visualmente y ejecuta las acciones de forma robusta. Construido sobre Playwright, es ideal para crear scrapers inteligentes, automatizar procesos repetitivos o construir agentes que interactúan con webs que no tienen API. Mucho más resistente a cambios en el HTML que los métodos tradicionales.",
    tags: ["automatización", "navegador", "ia", "scraping", "testing"],
    difficulty: "medio", interest_score: 86, stars: 21792, language: "TypeScript",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: "Con Claude Code puedes crear un agente de automatización web usando Playwright + visión de Claude para entender las páginas.",
    seo_slug: "stagehand-automatizacion-navegador-con-ia",
    seo_title: "Stagehand: Automatiza cualquier web hablándole en lenguaje natural",
    seo_description: "Stagehand usa IA para automatizar el navegador sin selectores CSS. Dile qué hacer en lenguaje natural y la IA lo ejecuta.",
    author: "browserbase", category_id: 4,
    image_prompt: "AI puppet master controlling a web browser with glowing purple strings, web page elements being manipulated automatically, dark theatrical stage background, futuristic automation concept"
  },
  {
    source: "github", source_id: "excalidraw/excalidraw",
    url: "https://github.com/excalidraw/excalidraw",
    name: "Excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn like diagrams.",
    summary_es: "Excalidraw es la pizarra virtual que ha conquistado al mundo tech por su sencillez y estilo único. Todo lo que dibujas parece hecho a mano, lo que le da un aspecto informal y atractivo perfecto para diagramas, wireframes, mapas mentales y explicaciones visuales. Es colaborativo en tiempo real, funciona directamente en el navegador sin instalar nada, y puedes exportar a PNG, SVG o compartir un enlace. Lo usan equipos de ingeniería en empresas como Meta y Google para explicar arquitecturas, diseñar flujos y hacer brainstorming. Es gratuito, open source, y tiene una librería enorme de iconos y formas compartidas por la comunidad.",
    tags: ["diseño", "diagramas", "colaboración", "pizarra", "productividad"],
    difficulty: "facil", interest_score: 93, stars: 120098, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Miro / Figma Whiteboard",
    replicable_with_code: null,
    seo_slug: "excalidraw-pizarra-virtual-diagramas-a-mano",
    seo_title: "Excalidraw: La pizarra virtual donde todo parece dibujado a mano",
    seo_description: "Crea diagramas, wireframes y mapas mentales con estilo dibujado a mano. Excalidraw es gratuito, colaborativo y open source. 120k estrellas.",
    author: "excalidraw", category_id: 8,
    image_prompt: "Hand-drawn style whiteboard with architectural diagrams, arrows, boxes and sketchy text, pencil-on-paper aesthetic, purple ink accents on dark canvas, collaborative creative workspace feel"
  },
  {
    source: "github", source_id: "hacksider/Deep-Live-Cam",
    url: "https://github.com/hacksider/Deep-Live-Cam",
    name: "Deep-Live-Cam",
    description: "Real time face swap and one-click video deepfake with only a single image.",
    summary_es: "Deep-Live-Cam permite hacer face swap en tiempo real y crear deepfakes de vídeo con una sola imagen de referencia. Solo necesitas una foto de un rostro y la herramienta lo aplica en tiempo real sobre tu cámara web o cualquier vídeo. La tecnología es impresionante (y un poco aterradora): funciona en tiempo real, con buena calidad y es sorprendentemente fácil de usar. Se ha convertido en uno de los repositorios más virales de GitHub por sus implicaciones en entretenimiento, creación de contenido y, inevitablemente, por el debate ético que genera. Importante: úsalo de forma responsable y con consentimiento.",
    tags: ["ia", "deepfake", "vídeo", "face-swap", "tiempo-real"],
    difficulty: "medio", interest_score: 92, stars: 87467, language: "Python",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: null,
    seo_slug: "deep-live-cam-face-swap-tiempo-real",
    seo_title: "Deep-Live-Cam: Face swap en tiempo real con una sola foto",
    seo_description: "Haz face swap en tiempo real con tu webcam usando una sola imagen. Deep-Live-Cam es la herramienta de deepfake más viral con 87k estrellas.",
    author: "hacksider", category_id: 1,
    image_prompt: "Face transformation with AI digital mesh overlay, real-time video processing visualization, split screen showing original and transformed face, purple neural network patterns, dark tech background"
  },
  {
    source: "github", source_id: "hoppscotch/hoppscotch",
    url: "https://github.com/hoppscotch/hoppscotch",
    name: "Hoppscotch",
    description: "Open-Source API Development Ecosystem.",
    summary_es: "Hoppscotch es el Postman que siempre quisiste: rápido, bonito y open source. Te permite probar APIs REST, GraphQL y WebSocket desde el navegador con una interfaz minimalista que carga al instante. Nada de apps pesadas de 500MB que tardan una eternidad en abrir. Tiene todo lo esencial: gestión de colecciones, variables de entorno, autenticación, tests automáticos y generación de documentación. Puedes usarlo online sin instalar nada o self-hostearlo en tu servidor para que tu equipo tenga su propia instancia privada. Es la herramienta favorita de los desarrolladores que están hartos de que Postman les pida cuenta, se actualice solo y consuma toda la RAM.",
    tags: ["devtools", "api", "testing", "desarrollo", "open-source"],
    difficulty: "facil", interest_score: 88, stars: 78750, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Postman",
    replicable_with_code: null,
    seo_slug: "hoppscotch-alternativa-postman-open-source",
    seo_title: "Hoppscotch: La alternativa open source a Postman que carga al instante",
    seo_description: "Prueba APIs REST, GraphQL y WebSocket desde el navegador. Hoppscotch es la alternativa rápida y open source a Postman. 78k estrellas.",
    author: "hoppscotch", category_id: 2,
    image_prompt: "API request and response data flowing between colorful endpoints, HTTP method badges (GET POST PUT), code snippets, purple data streams connecting services, dark developer environment"
  },
  {
    source: "github", source_id: "nocodb/nocodb",
    url: "https://github.com/nocodb/nocodb",
    name: "NocoDB",
    description: "A Free & Self-hostable Airtable Alternative.",
    summary_es: "NocoDB transforma cualquier base de datos en una hoja de cálculo inteligente al estilo de Airtable, pero completamente gratis y self-hosteable. Conéctalo a tu MySQL, PostgreSQL o SQLite existente y automáticamente genera una interfaz visual con vistas de tabla, galería, kanban y formularios. Es perfecto para equipos que necesitan gestionar datos de forma colaborativa sin pagar los precios abusivos de Airtable. Tiene API REST automática para cada tabla, webhooks, automatizaciones y soporte para roles y permisos. Si ya tienes una base de datos y quieres darle una cara bonita sin código, NocoDB es la respuesta.",
    tags: ["base-de-datos", "nocode", "self-hosted", "colaboración", "hojas-de-cálculo"],
    difficulty: "facil", interest_score: 89, stars: 62586, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Airtable",
    replicable_with_code: null,
    seo_slug: "nocodb-alternativa-airtable-open-source",
    seo_title: "NocoDB: Convierte cualquier base de datos en un Airtable gratuito",
    seo_description: "NocoDB transforma MySQL, PostgreSQL o SQLite en una interfaz tipo Airtable. Gratis, self-hosteable y con 62k estrellas en GitHub.",
    author: "nocodb", category_id: 6,
    image_prompt: "Spreadsheet grid transforming into a structured database with kanban and gallery views, data cells glowing and reorganizing, purple transformation effect, dark modern interface"
  },
  {
    source: "github", source_id: "FlowiseAI/Flowise",
    url: "https://github.com/FlowiseAI/Flowise",
    name: "Flowise",
    description: "Build AI Agents, Visually.",
    summary_es: "Flowise te permite construir agentes de IA y flujos de procesamiento con lenguaje natural arrastrando y soltando bloques visuales, sin escribir código. Quieres un chatbot que consulte tus PDFs, conecte con tu base de datos y responda preguntas de clientes? Con Flowise lo montas en minutos conectando nodos: un loader de documentos, un vector store, un modelo de lenguaje y un chat. Compatible con OpenAI, Anthropic, Ollama y docenas de modelos más. Es como el hermano visual de LangChain, pero accesible para gente que no programa. Perfecto para prototipar aplicaciones de IA rápidamente antes de invertir en desarrollo.",
    tags: ["ia", "nocode", "agentes", "chatbot", "rag"],
    difficulty: "facil", interest_score: 90, stars: 51406, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Relevance AI / Voiceflow",
    replicable_with_code: null,
    seo_slug: "flowise-construye-agentes-ia-sin-codigo",
    seo_title: "Flowise: Construye agentes de IA arrastrando y soltando bloques",
    seo_description: "Crea chatbots, agentes RAG y flujos de IA de forma visual sin programar. Flowise es open source y compatible con cualquier modelo. 51k estrellas.",
    author: "FlowiseAI", category_id: 1,
    image_prompt: "Visual flow builder canvas with connected AI nodes, drag and drop interface elements, chat bubble outputs, purple glowing node connections on dark background, low-code builder aesthetic"
  },
  {
    source: "github", source_id: "makeplane/plane",
    url: "https://github.com/makeplane/plane",
    name: "Plane",
    description: "Open-source Jira, Linear, Monday, and ClickUp alternative.",
    summary_es: "Plane es la alternativa open source a Jira y Linear que por fin hace que gestionar proyectos no sea un suplicio. Tiene todo lo que necesita un equipo de desarrollo: tableros kanban, sprints, backlog, roadmaps, ciclos de trabajo y seguimiento de issues con una interfaz moderna y rápida. A diferencia de Jira (que es lento y confuso), Plane apuesta por la simplicidad sin sacrificar potencia. Puedes self-hostearlo o usar su nube. Tiene integraciones con GitHub, Slack y más. Para equipos que están hartos de pagar por herramientas de gestión de proyectos hinchadas y quieren algo que simplemente funcione.",
    tags: ["gestión-proyectos", "self-hosted", "desarrollo", "kanban", "open-source"],
    difficulty: "facil", interest_score: 88, stars: 47214, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Jira / Linear",
    replicable_with_code: null,
    seo_slug: "plane-alternativa-jira-linear-open-source",
    seo_title: "Plane: Gestión de proyectos open source que le planta cara a Jira y Linear",
    seo_description: "Plane ofrece kanban, sprints, roadmaps y seguimiento de issues con una interfaz moderna. Alternativa open source a Jira con 47k estrellas.",
    author: "makeplane", category_id: 8,
    image_prompt: "Project management board with kanban columns, task cards moving between stages, sprint progress bar, purple accent indicators, dark clean professional interface"
  },
  {
    source: "github", source_id: "mudler/LocalAI",
    url: "https://github.com/mudler/LocalAI",
    name: "LocalAI",
    description: "The open-source AI engine. Run any model on any hardware.",
    summary_es: "LocalAI es un motor de IA local que te permite ejecutar cualquier modelo de lenguaje, visión, voz, imagen y vídeo en tu propio hardware sin enviar datos a la nube. Lo mejor es que expone una API compatible con OpenAI, así que cualquier aplicación que funcione con GPT funciona automáticamente con LocalAI sin cambiar una línea de código. Soporta LLMs, generación de imágenes (Stable Diffusion), text-to-speech, speech-to-text, embeddings y más, todo en un solo servicio. Funciona en CPU (no necesitas GPU), aunque con GPU va más rápido. Es la navaja suiza de la IA local: un solo punto de entrada para todos tus modelos.",
    tags: ["ia", "local", "privacidad", "api", "modelos"],
    difficulty: "medio", interest_score: 88, stars: 44720, language: "Go",
    is_oss_alternative: true, alternative_to: "OpenAI API",
    replicable_with_code: null,
    seo_slug: "localai-ejecuta-cualquier-modelo-ia-en-local",
    seo_title: "LocalAI: Ejecuta cualquier modelo de IA en local con API compatible con OpenAI",
    seo_description: "LocalAI ejecuta LLMs, imágenes, voz y vídeo en tu hardware con API compatible con OpenAI. Sin cloud, sin costes, total privacidad. 44k estrellas.",
    author: "mudler", category_id: 1,
    image_prompt: "AI brain running inside a glowing local server tower, no cloud symbol crossed out, multiple AI capability icons around it (text, image, voice), purple circuitry patterns, dark background"
  },
  {
    source: "github", source_id: "upscayl/upscayl",
    url: "https://github.com/upscayl/upscayl",
    name: "Upscayl",
    description: "#1 Free and Open Source AI Image Upscaler.",
    summary_es: "Upscayl es la app de escritorio que mejora la resolución de tus imágenes usando inteligencia artificial, y lo hace gratis. Arrastra una foto pixelada o de baja resolución y Upscayl la escala a 2x, 4x o incluso 8x con una calidad sorprendente, rellenando detalles que no existían en la original. Funciona en Windows, Mac y Linux sin necesidad de conexión a internet (todo se procesa en tu ordenador). Tiene varios modelos de IA para elegir según el tipo de imagen (fotos, ilustraciones, anime). Perfecto para rescatar fotos antiguas, mejorar imágenes para imprimir o preparar assets para redes sociales.",
    tags: ["ia", "imágenes", "mejora", "escritorio", "gratuito"],
    difficulty: "facil", interest_score: 89, stars: 44332, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Topaz Gigapixel AI",
    replicable_with_code: null,
    seo_slug: "upscayl-mejora-imagenes-ia-gratis",
    seo_title: "Upscayl: Mejora la resolución de cualquier imagen con IA, gratis",
    seo_description: "Escala tus imágenes a 2x, 4x u 8x con IA de forma gratuita y offline. Upscayl es el upscaler open source más popular. 44k estrellas.",
    author: "upscayl", category_id: 1,
    image_prompt: "Low resolution pixelated photo transforming into crystal clear high-res image, before and after split view, AI magnifying glass with purple enhancement glow, dark background"
  },
  {
    source: "github", source_id: "janhq/jan",
    url: "https://github.com/janhq/jan",
    name: "Jan",
    description: "Jan is an open source alternative to ChatGPT that runs 100% offline.",
    summary_es: "Jan es un ChatGPT que funciona 100% offline en tu ordenador. Sin cuentas, sin internet, sin que nadie lea tus conversaciones. Descarga el modelo que quieras (Llama, Mistral, Phi, DeepSeek...), y tienes una interfaz de chat idéntica a ChatGPT pero corriendo completamente en local. Es la forma más fácil de tener un asistente de IA privado: instalar, descargar modelo, chatear. Así de simple. Funciona en Windows, Mac y Linux, gestiona múltiples modelos, guarda historiales de conversación y permite importar modelos desde Hugging Face con un clic. Para quien quiere privacidad total sin sacrificar la experiencia de uso.",
    tags: ["ia", "chatbot", "offline", "privacidad", "local"],
    difficulty: "facil", interest_score: 88, stars: 41445, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "ChatGPT",
    replicable_with_code: null,
    seo_slug: "jan-chatgpt-offline-privado",
    seo_title: "Jan: Tu propio ChatGPT offline, 100% privado y sin cuenta",
    seo_description: "Jan es un ChatGPT que funciona sin internet en tu PC. Descarga modelos y chatea en total privacidad. Open source con 41k estrellas.",
    author: "janhq", category_id: 1,
    image_prompt: "ChatGPT-like interface running on a laptop with no WiFi symbol, private lock icon, cozy offline feel, chat bubbles with purple accents, dark warm interface theme"
  },
  {
    source: "github", source_id: "CorentinTh/it-tools",
    url: "https://github.com/CorentinTh/it-tools",
    name: "IT Tools",
    description: "Collection of handy online tools for developers, with great UX.",
    summary_es: "IT Tools es una colección de más de 80 herramientas útiles para desarrolladores reunidas en una sola web con una interfaz impecable. Necesitas encodear en Base64? Generar un UUID? Convertir JSON a YAML? Calcular un hash? Formatear SQL? Comparar textos? Todo está ahí, a un clic, sin anuncios ni registro. Cada herramienta está perfectamente diseñada con una UX cuidada al detalle. Lo mejor es que puedes self-hostearlo y tener tu propia instancia con todas las herramientas disponibles offline. Es el tipo de web que acabas usando cada día y te preguntas cómo vivías sin ella.",
    tags: ["devtools", "utilidades", "productividad", "web", "self-hosted"],
    difficulty: "facil", interest_score: 87, stars: 37918, language: "Vue",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: "Con Claude Code puedes crear tu propia colección de herramientas dev online adaptada a tus necesidades.",
    seo_slug: "it-tools-herramientas-desarrolladores-online",
    seo_title: "IT Tools: +80 herramientas para desarrolladores en una sola web",
    seo_description: "Base64, UUID, hash, JSON, regex y más de 80 herramientas dev con UX perfecta. IT Tools es gratuito, self-hosteable y open source. 37k estrellas.",
    author: "CorentinTh", category_id: 2,
    image_prompt: "Swiss army knife made of developer tool icons (hash, code brackets, gear, terminal), organized grid of utility cards, purple tool icons glowing, dark organized workspace background"
  },
  {
    source: "github", source_id: "ToolJet/ToolJet",
    url: "https://github.com/ToolJet/ToolJet",
    name: "ToolJet",
    description: "Open-source foundation for building internal tools and dashboards.",
    summary_es: "ToolJet te permite construir herramientas internas y dashboards para tu empresa sin código (o con muy poco). Conecta bases de datos, APIs y servicios, arrastra componentes visuales (tablas, formularios, gráficos, botones) y en minutos tienes un panel de administración, un dashboard de métricas o una herramienta de gestión interna lista para usar. Soporta PostgreSQL, MySQL, MongoDB, Google Sheets, Stripe, Slack y docenas de fuentes de datos más. Es la alternativa open source a Retool y Appsmith que muchas startups están usando para construir sus herramientas internas sin gastar meses de desarrollo.",
    tags: ["low-code", "herramientas-internas", "dashboard", "nocode", "self-hosted"],
    difficulty: "medio", interest_score: 86, stars: 37706, language: "JavaScript",
    is_oss_alternative: true, alternative_to: "Retool",
    replicable_with_code: null,
    seo_slug: "tooljet-herramientas-internas-sin-codigo",
    seo_title: "ToolJet: Construye herramientas internas y dashboards sin código",
    seo_description: "Crea paneles de admin, dashboards y herramientas internas arrastrando componentes. ToolJet es la alternativa open source a Retool. 37k estrellas.",
    author: "ToolJet", category_id: 2,
    image_prompt: "Low-code app builder interface with drag-drop UI components, database connections, dashboard widgets, purple builder elements on dark modern workspace background"
  },
  {
    source: "github", source_id: "umami-software/umami",
    url: "https://github.com/umami-software/umami",
    name: "Umami",
    description: "Modern, privacy-focused analytics alternative to Google Analytics.",
    summary_es: "Umami es la alternativa a Google Analytics que respeta la privacidad de tus visitantes. Sin cookies, sin rastreo invasivo, cumple con GDPR de serie y te da las métricas que realmente importan: visitantes, páginas vistas, fuentes de tráfico, dispositivos y eventos personalizados. Todo en un dashboard limpio y rápido que pesa una fracción de lo que pesa Google Analytics. Puedes self-hostearlo en tu servidor (una sola imagen Docker) y tener control total de los datos. Muchos desarrolladores y empresas están migrando a Umami porque no necesitan la complejidad monstruosa de GA4 para saber cuánta gente visita su web.",
    tags: ["analytics", "privacidad", "self-hosted", "web", "gdpr"],
    difficulty: "facil", interest_score: 87, stars: 35952, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Google Analytics",
    replicable_with_code: null,
    seo_slug: "umami-analytics-privacidad-alternativa-google-analytics",
    seo_title: "Umami: Analytics web privado y sin cookies, alternativa a Google Analytics",
    seo_description: "Umami es analytics web simple, privado y sin cookies. Alternativa self-hosted a Google Analytics que cumple GDPR de serie. 35k estrellas.",
    author: "umami-software", category_id: 3,
    image_prompt: "Privacy-focused analytics dashboard with clean visitor graphs, no-cookie shield icon, simple charts and metrics, purple minimal data visualization, dark elegant theme"
  },
  {
    source: "github", source_id: "sxyazi/yazi",
    url: "https://github.com/sxyazi/yazi",
    name: "Yazi",
    description: "Blazing fast terminal file manager written in Rust.",
    summary_es: "Yazi es un gestor de archivos de terminal ultrarrápido escrito en Rust que hace que navegar por archivos en la consola sea un placer. Tiene previsualización de imágenes, vídeos, PDFs y código directamente en el terminal, navegación con teclado fluida, búsqueda instantánea, y un sistema de plugins para extender sus funcionalidades. Es como tener un Finder/Explorador de archivos dentro de la terminal, pero mucho más rápido. Si pasas mucho tiempo en el terminal (y si estás leyendo esto, probablemente sí), Yazi va a cambiar cómo trabajas con archivos. La velocidad es absurda: abre directorios con miles de archivos al instante.",
    tags: ["terminal", "rust", "productividad", "archivos", "cli"],
    difficulty: "facil", interest_score: 85, stars: 35817, language: "Rust",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: null,
    seo_slug: "yazi-gestor-archivos-terminal-rust",
    seo_title: "Yazi: El gestor de archivos de terminal más rápido, escrito en Rust",
    seo_description: "Navega por archivos en la terminal a velocidad absurda con previsualización de imágenes y vídeos. Yazi está escrito en Rust. 35k estrellas.",
    author: "sxyazi", category_id: 2,
    image_prompt: "Blazing fast terminal file manager showing file tree with colorful icons, image preview panel, Rust flame speed effects, purple terminal text and borders on dark background"
  },
  {
    source: "github", source_id: "khoj-ai/khoj",
    url: "https://github.com/khoj-ai/khoj",
    name: "Khoj",
    description: "Your AI second brain. Self-hostable.",
    summary_es: "Khoj es tu segundo cerebro potenciado por IA. Conecta tus documentos, notas, emails y archivos, y luego pregúntale cualquier cosa en lenguaje natural. \"¿Qué decía el contrato que firmé el mes pasado sobre las penalizaciones?\" Khoj busca en toda tu información personal y te responde con contexto. Además, puede buscar en internet, programar automatizaciones (\"avísame si sale una oferta de vuelo a Japón\"), y crear agentes personalizados. Todo self-hosteable para que tus datos privados se queden en tu servidor. Es lo más cercano a tener un asistente personal de IA que realmente conoce tu vida y tu trabajo.",
    tags: ["ia", "productividad", "segundo-cerebro", "self-hosted", "rag"],
    difficulty: "medio", interest_score: 86, stars: 33816, language: "Python",
    is_oss_alternative: true, alternative_to: "Mem AI / Notion AI",
    replicable_with_code: null,
    seo_slug: "khoj-segundo-cerebro-ia-self-hosted",
    seo_title: "Khoj: Tu segundo cerebro con IA que busca en todos tus documentos",
    seo_description: "Conecta documentos, notas y emails. Pregúntale cualquier cosa y Khoj responde con contexto. Self-hosteable y open source. 33k estrellas.",
    author: "khoj-ai", category_id: 1,
    image_prompt: "AI second brain visualization with connected thoughts, documents, and knowledge nodes forming a neural network, search beam finding answers, purple neural connections, dark cosmic background"
  },
  {
    source: "github", source_id: "chatwoot/chatwoot",
    url: "https://github.com/chatwoot/chatwoot",
    name: "Chatwoot",
    description: "Open-source live-chat, email support, omni-channel desk.",
    summary_es: "Chatwoot es la alternativa open source a Intercom y Zendesk para atención al cliente. Centraliza todas tus conversaciones (chat en vivo, email, WhatsApp, Facebook, Instagram, Telegram, Twitter) en una sola bandeja de entrada para tu equipo. Incluye chatbots, respuestas predefinidas, asignación automática de conversaciones, informes de rendimiento y base de conocimiento. Lo que hace que muchas startups lo elijan sobre Intercom es el precio (gratis para self-hosting) y el hecho de que tus datos de clientes se quedan en tu infraestructura. La interfaz es limpia y profesional, y la experiencia para el usuario final es indistinguible de las soluciones de pago.",
    tags: ["atención-al-cliente", "chat", "self-hosted", "omnicanal", "negocio"],
    difficulty: "medio", interest_score: 85, stars: 28162, language: "Ruby",
    is_oss_alternative: true, alternative_to: "Intercom",
    replicable_with_code: null,
    seo_slug: "chatwoot-alternativa-intercom-open-source",
    seo_title: "Chatwoot: Chat en vivo y soporte omnicanal, alternativa open source a Intercom",
    seo_description: "Centraliza chat, email, WhatsApp y redes en una bandeja de entrada. Chatwoot es la alternativa self-hosted a Intercom. 28k estrellas.",
    author: "chatwoot", category_id: 3,
    image_prompt: "Customer support dashboard with multiple chat channels (WhatsApp, email, social media) flowing into unified inbox, message bubbles, purple accent elements, dark professional theme"
  },
  {
    source: "github", source_id: "karakeep-app/karakeep",
    url: "https://github.com/karakeep-app/karakeep",
    name: "Karakeep",
    description: "A self-hostable bookmark-everything app with AI-based automatic tagging.",
    summary_es: "Karakeep es un gestor de marcadores inteligente que guarda y organiza todo lo que encuentras en internet automáticamente con IA. Guarda enlaces, notas, imágenes y capturas completas de páginas web, y la IA se encarga de etiquetarlos, categorizarlos y hacerlos buscables. Tiene extensión de navegador, app móvil, búsqueda de texto completo (incluso dentro de las páginas guardadas), y una interfaz visual con miniaturas. Es como tener un Pinterest personal potenciado con IA para organizar toda tu investigación, inspiración y recursos. Self-hosteable, tus marcadores no dependen de ningún servicio que pueda cerrar mañana.",
    tags: ["productividad", "marcadores", "ia", "self-hosted", "organización"],
    difficulty: "facil", interest_score: 84, stars: 24439, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "Raindrop.io / Pocket",
    replicable_with_code: null,
    seo_slug: "karakeep-marcadores-inteligentes-ia",
    seo_title: "Karakeep: Guarda y organiza todo de internet con IA automática",
    seo_description: "Guarda enlaces, notas e imágenes. La IA los organiza automáticamente. Karakeep es self-hosteable y alternativa a Pocket/Raindrop. 24k estrellas.",
    author: "karakeep-app", category_id: 8,
    image_prompt: "Bookmarks being automatically organized and tagged by AI, floating link cards with thumbnails sorting into categories, purple bookmark icons and tags, dark organized library background"
  },
  {
    source: "github", source_id: "plausible/analytics",
    url: "https://github.com/plausible/analytics",
    name: "Plausible",
    description: "Simple, lightweight and privacy-friendly web analytics alternative to Google Analytics.",
    summary_es: "Plausible es analítica web como debería ser: simple, ligera y respetuosa con la privacidad. Todo lo que necesitas saber sobre el tráfico de tu web cabe en una sola página. Sin cookies (no necesitas banner de cookies), sin datos personales, cumple GDPR sin configurar nada. El script pesa menos de 1KB (Google Analytics pesa 45KB), así que no ralentiza tu web. Ves visitantes, fuentes de tráfico, páginas más vistas, países, dispositivos y eventos personalizados. Nada más, nada menos. Puedes usar su cloud de pago o self-hostearlo gratis. Es la opción favorita de desarrolladores y bloggers que quieren métricas sin comprometer la experiencia de sus visitantes.",
    tags: ["analytics", "privacidad", "web", "self-hosted", "ligero"],
    difficulty: "facil", interest_score: 85, stars: 24514, language: "Elixir",
    is_oss_alternative: true, alternative_to: "Google Analytics",
    replicable_with_code: null,
    seo_slug: "plausible-analytics-simple-privado",
    seo_title: "Plausible: Analítica web simple, ligera y sin cookies",
    seo_description: "Analytics que cabe en una página, pesa menos de 1KB y cumple GDPR sin cookies. Plausible es la alternativa simple a Google Analytics. 24k estrellas.",
    author: "plausible", category_id: 3,
    image_prompt: "Minimalist analytics dashboard with single-page clean graphs, no-cookie badge, visitor count counter, simple line charts, purple minimal accent colors, dark elegant clean design"
  },
  {
    source: "github", source_id: "Lissy93/dashy",
    url: "https://github.com/Lissy93/dashy",
    name: "Dashy",
    description: "A self-hostable personal dashboard with status-checking, widgets and themes.",
    summary_es: "Dashy es el dashboard personal definitivo para organizar todos tus servicios self-hosted, enlaces y herramientas en un solo lugar. Con una interfaz personalizable con temas, iconos y widgets, puedes tener tu propia página de inicio que muestra el estado de tus servidores, accesos directos a todas tus apps, el tiempo, consumo de recursos, notas rápidas y mucho más. Es configurable mediante un archivo YAML sencillo y tiene docenas de temas visuales incluidos. Es la herramienta favorita de la comunidad de homelab y self-hosting: tu centro de control personal donde todo está a un clic. Se instala con una sola línea de Docker.",
    tags: ["dashboard", "self-hosted", "homelab", "personalización", "productividad"],
    difficulty: "facil", interest_score: 83, stars: 24408, language: "Vue",
    is_oss_alternative: false, alternative_to: null,
    replicable_with_code: null,
    seo_slug: "dashy-dashboard-personal-self-hosted",
    seo_title: "Dashy: Tu dashboard personal para controlar todo desde un solo sitio",
    seo_description: "Organiza todos tus servicios, enlaces y herramientas en un dashboard personalizable. Dashy es self-hosted con docenas de temas. 24k estrellas.",
    author: "Lissy93", category_id: 3,
    image_prompt: "Personal dashboard with colorful service widgets, weather card, server status indicators, quick-access bookmarks grid, purple-dominant dark homelab aesthetic, organized and beautiful"
  },
  {
    source: "github", source_id: "novuhq/novu",
    url: "https://github.com/novuhq/novu",
    name: "Novu",
    description: "Open-source notification infrastructure for developers.",
    summary_es: "Novu es la infraestructura de notificaciones open source que todo desarrollador necesita. En vez de implementar por separado el envío de emails, SMS, push notifications y mensajes de Slack, Novu unifica todo en una sola API. Defines tus plantillas de notificación, configuras los canales y Novu se encarga del routing inteligente: si el usuario no abre el email, le manda un push; si no responde al push, le envía un SMS. Incluye un componente de bandeja de entrada (Inbox) que puedes incrustar en tu app con pocas líneas de código. Es lo que usan muchas startups para no tener que reinventar la rueda de las notificaciones cada vez.",
    tags: ["notificaciones", "devtools", "api", "infraestructura", "open-source"],
    difficulty: "medio", interest_score: 84, stars: 38752, language: "TypeScript",
    is_oss_alternative: true, alternative_to: "OneSignal / Customer.io",
    replicable_with_code: null,
    seo_slug: "novu-notificaciones-open-source",
    seo_title: "Novu: Infraestructura de notificaciones unificada para desarrolladores",
    seo_description: "Email, SMS, push y Slack en una sola API. Novu es la infraestructura de notificaciones open source con inbox integrable. 38k estrellas.",
    author: "novuhq", category_id: 2,
    image_prompt: "Notification bell with multiple channels flowing outward (email envelope, SMS phone, push bell, Slack icon), purple notification streams connecting channels, dark infrastructure background"
  },
  {
    source: "github", source_id: "PaddlePaddle/PaddleOCR",
    url: "https://github.com/PaddlePaddle/PaddleOCR",
    name: "PaddleOCR",
    description: "Turn any PDF or image into structured data. Powerful OCR toolkit.",
    summary_es: "PaddleOCR es el motor de reconocimiento óptico de caracteres (OCR) más potente del open source. Extrae texto de cualquier imagen, PDF, captura de pantalla o foto con una precisión impresionante, soportando más de 80 idiomas incluido español. Puede reconocer texto en documentos escaneados, tickets, facturas, matrículas de coches, menús de restaurantes... prácticamente cualquier cosa que tenga texto. Incluye detección de layout de documentos (sabe dónde están los títulos, tablas, párrafos), reconocimiento de tablas y extracción estructurada de datos. Desarrollado por Baidu con años de investigación, es la base de muchos productos comerciales de digitalización de documentos.",
    tags: ["ia", "ocr", "documentos", "python", "procesamiento"],
    difficulty: "medio", interest_score: 87, stars: 74679, language: "Python",
    is_oss_alternative: true, alternative_to: "ABBYY / Google Cloud Vision",
    replicable_with_code: null,
    seo_slug: "paddleocr-extraer-texto-imagenes-documentos",
    seo_title: "PaddleOCR: Extrae texto de cualquier imagen o documento con IA",
    seo_description: "OCR potente que extrae texto de imágenes, PDFs y documentos en +80 idiomas. PaddleOCR es open source con 74k estrellas en GitHub.",
    author: "PaddlePaddle", category_id: 1,
    image_prompt: "Document page being scanned by AI OCR beam, text characters being extracted and digitized, structured data output, purple scanning laser light, dark tech background"
  },
];

async function generateImage(prompt, filename) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_KEY}`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: `Generate an image: ${prompt}` }] }],
    generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
  });

  return new Promise((resolve, reject) => {
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
          console.error(`  ⚠ No image in response for ${filename}`);
          resolve(null);
        } catch(e) { console.error(`  ⚠ Parse error for ${filename}: ${e.message}`); resolve(null); }
      });
    });
    req.on("error", e => { console.error(`  ⚠ Network error for ${filename}: ${e.message}`); resolve(null); });
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log("=== OffRadar: Generando contenido para 30 proyectos ===\n");

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const slug = p.seo_slug;
    console.log(`[${i+1}/30] ${p.name}...`);

    // Generar imagen
    console.log(`  📸 Generando imagen con Nano Banana 2...`);
    const imgUrl = await generateImage(p.image_prompt, slug);
    if (imgUrl) console.log(`  ✓ Imagen: ${imgUrl}`);

    // Insertar en DB
    try {
      await sql`
        INSERT INTO projects (
          source, source_id, url, name, description, summary_es,
          category_id, tags, difficulty, interest_score, stars,
          language, is_oss_alternative, alternative_to,
          replicable_with_code, automatizable_with_n8n,
          featured_image_url, status, priority,
          seo_slug, seo_title, seo_description, author,
          created_at, updated_at, published_at
        ) VALUES (
          ${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.description}, ${p.summary_es},
          ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars},
          ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to},
          ${p.replicable_with_code}, ${null},
          ${imgUrl}, 'published', 'high',
          ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author},
          NOW(), NOW(), NOW()
        )
        ON CONFLICT (source, source_id) DO UPDATE SET
          stars = EXCLUDED.stars,
          summary_es = EXCLUDED.summary_es,
          featured_image_url = EXCLUDED.featured_image_url,
          updated_at = NOW()
      `;
      console.log(`  ✓ Insertado en DB`);
    } catch(e) {
      console.error(`  ✗ Error DB: ${e.message}`);
    }

    // Rate limit para Gemini
    if (i < projects.length - 1) {
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  // Verificar
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\n✅ Total proyectos publicados: ${count[0].n}`);

  await sql.end();
  console.log("\n=== Completado ===");
}

main().catch(e => { console.error(e); process.exit(1); });

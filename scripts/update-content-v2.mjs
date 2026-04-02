import postgres from "postgres";

const sql = postgres("postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar");

const updates = [
  {
    source_id: "browser-use/browser-use",
    summary_es: `Browser Use permite que agentes de inteligencia artificial controlen un navegador web real de forma completamente autónoma. No hablamos de simular clics con selectores CSS frágiles — hablamos de una IA que **ve** la pantalla como tú la ves, entiende lo que hay en ella, y decide qué hacer a continuación.

Imagina decirle: "Busca vuelos de Madrid a Lisboa para la primera semana de mayo, compara precios entre Skyscanner y Google Flights, y dime cuál es la mejor opción". La IA abre el navegador, navega a cada web, rellena los buscadores, espera los resultados, compara precios, y te devuelve un resumen con links directos. Todo sin que toques el ratón.

## Por qué es revolucionario

Hasta ahora, automatizar el navegador significaba escribir código con Selenium o Playwright lleno de selectores CSS (\`document.querySelector('#main > div:nth-child(3) > a.btn-primary')\`) que se rompen en cuanto la web cambia un pixel. Browser Use elimina todo eso. La IA interpreta la página visualmente, igual que haría una persona, así que funciona incluso cuando la web se rediseña.

Esto abre un mundo de posibilidades que antes eran impracticables:

- **Monitorizar precios** en webs que no tienen API (Amazon, Booking, tiendas online)
- **Rellenar formularios** complejos de forma automática (solicitudes, registros, trámites)
- **Extraer datos** de webs protegidas que bloquean scrapers tradicionales
- **Automatizar flujos de trabajo** que involucran múltiples webs y pasos

## Cómo funciona técnicamente

Browser Use actúa como un puente entre cualquier modelo de lenguaje y un navegador Chromium real a través de Playwright. El proceso es:

1. **Captura el estado de la página**: hace una screenshot y extrae el DOM accesible
2. **Envía al LLM**: el modelo recibe la imagen y/o el texto de la página
3. **El LLM decide la acción**: "hacer clic en el botón de búsqueda", "escribir 'Madrid' en el campo de origen"
4. **Ejecuta la acción**: Browser Use traduce la instrucción a comandos de Playwright
5. **Repite**: vuelve al paso 1 hasta completar la tarea

Compatible con GPT-4, Claude, Gemini, Llama y cualquier modelo que soporte function calling.

## Ejemplo práctico real

\`\`\`python
from browser_use import Agent
from langchain_openai import ChatOpenAI

agent = Agent(
    task="Ve a amazon.es, busca 'auriculares bluetooth con cancelación de ruido', "
         "filtra por precio de menor a mayor, y dame los 3 primeros resultados "
         "con su nombre, precio y valoración",
    llm=ChatOpenAI(model="gpt-4o"),
)

result = await agent.run()
print(result)
\`\`\`

Ese código funciona. Literalmente abre Amazon, busca, filtra y te devuelve los datos estructurados. Sin selectores CSS, sin parsear HTML, sin mantener scrapers que se rompen cada semana.

## Funcionalidades que lo hacen destacar

- **Visión por computador**: la IA ve la página como un humano, no como un parser de HTML
- **Memoria de sesión**: mantiene cookies, login y estado entre acciones
- **Multi-pestaña**: puede abrir varias pestañas y navegar entre ellas
- **Gestión de pop-ups**: cierra modales, acepta cookies, maneja overlays automáticamente
- **Retry inteligente**: si una acción falla, intenta de otra forma
- **Extracción estructurada**: devuelve datos en formato JSON limpio
- **Grabación de sesión**: puedes grabar en vídeo lo que hace el agente para depurar

## Para quién es especialmente útil

**Equipos de negocio y marketing** que necesitan datos de la competencia, monitorizar precios, o automatizar procesos manuales en webs sin API. Antes necesitabas un desarrollador para crear un scraper; ahora le dices a Browser Use qué quieres en español y él se encarga.

**Desarrolladores** que están hartos de mantener scrapers frágiles. Browser Use es resistente a cambios en el HTML porque no depende de selectores — la IA se adapta.

**Investigadores y analistas** que necesitan recopilar información de múltiples fuentes web de forma sistemática.

## Limitaciones a tener en cuenta

- **Coste**: cada interacción consume tokens del LLM (las screenshots son especialmente caras con GPT-4 Vision)
- **Velocidad**: más lento que un scraper tradicional porque necesita "pensar" en cada paso
- **CAPTCHAs**: puede manejar algunos simples, pero los complejos lo detienen
- **Fiabilidad**: no es 100% determinista — a veces la IA interpreta mal un elemento

## Cómo instalarlo

\`\`\`bash
pip install browser-use
playwright install chromium
\`\`\`

Y en 5 líneas de código tienes tu primer agente funcionando. La documentación es excelente, con ejemplos para cada caso de uso desde scraping básico hasta flujos multi-paso complejos.

## Por qué tiene 85.000 estrellas en GitHub

Porque resuelve un problema universal: hay miles de webs que no tienen API pero necesitas interactuar con ellas. Hasta ahora la solución era crear scrapers frágiles o contratar a alguien para hacer tareas manuales repetitivas. Browser Use elimina ambas opciones con una solución elegante que cualquiera puede usar.`
  },
  {
    source_id: "langgenius/dify",
    summary_es: `Dify es la plataforma que convierte la inteligencia artificial en algo que cualquier equipo puede usar en producción, sin necesidad de tener un departamento de machine learning. Con un editor visual de flujos, puedes construir chatbots, asistentes RAG, agentes autónomos y aplicaciones de IA complejas arrastrando y soltando bloques.

Pero lo que realmente diferencia a Dify de las decenas de herramientas similares que hay ahora mismo no es su editor visual — es que está pensado para **producción real**. No es un juguete para hacer demos: incluye gestión de prompts con versionado, evaluación de calidad de respuestas, monitorización de costes en tiempo real, y soporte para cambiar entre cientos de modelos de IA con un clic.

## El problema que resuelve

Imagina que diriges una empresa y quieres un chatbot que:
- Responda preguntas de clientes consultando tu documentación
- Escale a un humano cuando no sepa la respuesta
- Funcione con el modelo más barato posible sin sacrificar calidad
- Te dé métricas de cuánto cuesta cada conversación

Sin Dify, necesitas un equipo de ingenieros durante semanas. Con Dify, lo montas en una tarde.

## Cómo funciona

El corazón de Dify es su **editor de flujos visual**. Cada flujo se compone de nodos que conectas:

- **Nodos de entrada**: reciben la pregunta del usuario, un webhook, un trigger programado
- **Nodos de LLM**: envían texto a un modelo de IA (OpenAI, Anthropic, Ollama, modelos locales...)
- **Nodos de conocimiento**: consultan documentos que has subido (PDFs, webs, bases de datos)
- **Nodos de herramientas**: buscan en internet, llaman APIs, ejecutan código, envían emails
- **Nodos de lógica**: condiciones if/else, bucles, switches
- **Nodos de salida**: respuesta al usuario, webhook, guardar en base de datos

Los conectas visualmente y tienes una aplicación de IA funcional con API lista para integrar.

## Casos de uso que he visto funcionar

### Atención al cliente con RAG
Subes la documentación de tu producto (PDFs, guías, FAQ). Dify la indexa automáticamente. Cuando un cliente pregunta algo, el chatbot busca en tu documentación y responde con información precisa, citando las fuentes. Si no encuentra respuesta, dice "no lo sé" en vez de inventarse algo (un problema habitual con los LLMs).

### Análisis automático de documentos
Un despacho de abogados sube contratos y le pregunta: "¿Cuáles son las cláusulas de penalización?" o "Resume las obligaciones de la parte A". La IA lee el documento y responde con precisión, ahorrando horas de lectura manual.

### Generador de contenido con control de calidad
Un equipo de marketing crea un flujo que genera borradores de artículos, los evalúa automáticamente con otro LLM, y solo publica los que superan un umbral de calidad. Todo automatizado.

### Asistente interno de empresa
Un asistente que conoce las políticas internas, los procesos, los contactos de cada departamento, y puede responder preguntas de empleados tipo "¿Cuál es la política de vacaciones?" o "¿A quién contacto para problemas con la VPN?".

## La gestión de prompts es genial

Dify incluye un sistema de gestión de prompts profesional:

- **Versionado**: guarda cada versión de tu prompt y compara rendimiento
- **A/B testing**: prueba dos versiones del prompt con tráfico real
- **Variables**: usa plantillas con variables dinámicas
- **Evaluación**: mide la calidad de las respuestas automáticamente
- **Logs**: ve cada conversación, cada prompt enviado, cada respuesta recibida

Esto es lo que diferencia un proyecto de fin de semana de una aplicación de IA en producción.

## Modelos compatibles

La lista es absurda: OpenAI (GPT-4, GPT-4o, o1), Anthropic (Claude 3.5, Claude 4), Google (Gemini), Meta (Llama), Mistral, Cohere, DeepSeek, Qwen, y cualquier modelo compatible con la API de OpenAI. También soporta modelos locales a través de Ollama, LM Studio o LocalAI.

**Puedes cambiar de modelo sin cambiar tu flujo.** Si GPT-4 te sale caro, cambias a Claude Haiku o a un modelo local con un clic y todo sigue funcionando.

## Comparativa con las alternativas

| | Dify | Langchain (código) | Flowise | Zapier AI |
|---|---|---|---|---|
| Interfaz visual | Sí | No | Sí | Sí |
| Producción-ready | Sí | Depende de ti | Parcial | Sí |
| Self-hosteable | Sí | Sí | Sí | No |
| Gestión de prompts | Avanzada | Manual | Básica | No |
| Monitorización | Sí | Manual | No | Básica |
| Precio | Gratis (self-hosted) | Gratis | Gratis | Desde 20$/mes |

## Instalación

\`\`\`bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
docker compose up -d
\`\`\`

En 5 minutos tienes Dify corriendo con interfaz web, API, y todo listo. La documentación es excelente y la comunidad es muy activa (135.000 estrellas en GitHub no mienten).

## Mi opinión

Dify es probablemente la herramienta de IA más completa y madura del ecosistema open source. Si necesitas construir cualquier aplicación que involucre modelos de lenguaje — desde un chatbot simple hasta un sistema multi-agente complejo — empieza por aquí antes de escribir código desde cero. Te vas a ahorrar semanas de trabajo.`
  },
  {
    source_id: "excalidraw/excalidraw",
    summary_es: `Excalidraw es una pizarra virtual online donde todo lo que dibujas parece hecho a mano alzada. Suena simple, pero este detalle estético es lo que la ha convertido en la herramienta de diagramas favorita del mundo tech — la usan equipos de ingeniería en Meta, Google, Stripe y miles de startups para explicar ideas complejas de forma visual.

Y es que hay algo poderoso en que un diagrama parezca un boceto en vez de un diagrama perfecto: reduce la barrera de entrada ("no hace falta que sea bonito, es solo una idea"), invita a la colaboración ("esto es un borrador, añade lo que quieras"), y paradójicamente resulta más atractivo y memorable que un diagrama hecho con herramientas formales.

## Para qué la usa la gente en la práctica

### Arquitectura de software
Es el uso estrella. Cuando un equipo de ingeniería necesita explicar cómo funciona un sistema — microservicios, bases de datos, colas de mensajes, APIs — abren Excalidraw y en 5 minutos tienen un diagrama que todo el mundo entiende. Los diagramas formales (UML, C4) intimidan; los de Excalidraw invitan a preguntar y debatir.

### Wireframes rápidos
Antes de abrir Figma, muchos diseñadores y product managers bocetan ideas en Excalidraw. "¿Y si ponemos el filtro aquí?" "¿Y si el menú fuera así?" Es más rápido que cualquier herramienta de diseño y el aspecto de boceto deja claro que no es el diseño final (evitando el clásico "¿pero esto va a quedar así?").

### Documentación técnica
Cada vez más equipos incluyen diagramas de Excalidraw en su documentación. Al ser SVG, se ven nítidos a cualquier tamaño. Y al tener un aspecto informal, la gente los percibe como "explicaciones" en vez de "documentos formales que nadie lee".

### Explicar cosas en reuniones
Compartes tu pantalla, abres Excalidraw, y dibujas mientras explicas. Es como una pizarra pero digital, colaborativa, y se puede guardar. Ideal para retrospectivas, planning, brainstorming o debugging en equipo.

## Funcionalidades que no esperas

- **Colaboración en tiempo real**: comparte un link y tu equipo puede dibujar simultáneamente, con cursores visibles y cambios en tiempo real
- **Sin login**: abre excalidraw.com y empieza a dibujar. Sin registro, sin cuenta, sin fricción
- **Librería de componentes**: la comunidad ha creado miles de iconos y componentes reutilizables — desde logos de AWS hasta diagramas de red prediseñados
- **Cifrado end-to-end**: las sesiones colaborativas están cifradas, ni los servidores de Excalidraw pueden ver lo que dibujas
- **Modo presentación**: convierte tu pizarra en una presentación con zoom progresivo
- **Exportación versátil**: PNG, SVG, JSON (para reeditar), o copia directa al portapapeles
- **Funciona offline**: la versión PWA funciona sin internet

## Integraciones con todo

Excalidraw se ha convertido en un estándar informal y tiene integraciones con prácticamente todo:

- **Obsidian**: plugin nativo para incrustar diagramas en tus notas
- **Notion**: embed directo de pizarras
- **VS Code**: extensión para editar diagramas .excalidraw dentro del editor
- **Confluence/Jira**: plugin oficial
- **GitHub**: renderiza archivos .excalidraw directamente en los repos
- **Docusaurus, Nextra, GitBook**: plugins de documentación
- **Mermaid → Excalidraw**: convierte diagramas de texto a estilo dibujado a mano

## Por qué le gana a Miro y Figma para esto

**Miro** (8-16$/usuario/mes) es una herramienta de colaboración general — buena para workshops, no tan buena para diagramas técnicos rápidos. Tarda en cargar, la interfaz es compleja, y la barrera de entrada es alta.

**Figma/FigJam** (5$/usuario/mes) está más orientado a diseño. Para un diagrama de arquitectura rápido es como matar moscas a cañonazos.

**Excalidraw** es gratuito, carga en milisegundos, no necesita cuenta, y el resultado visual es superior para diagramas técnicos gracias a su estilo hand-drawn. Para este caso de uso específico — diagramas técnicos rápidos y colaborativos — no tiene rival.

## Self-hosting

Si tu empresa no quiere que los diagramas (que a veces contienen información sensible sobre arquitectura interna) pasen por servidores externos, puedes montar tu propia instancia con Docker. Todo el cifrado end-to-end se mantiene.

## Instalación

No necesitas instalar nada. Ve a **excalidraw.com** y empieza a dibujar. Si quieres la app de escritorio o self-hosting, están disponibles en el repo de GitHub.`
  },
  {
    source_id: "louislam/uptime-kuma",
    summary_es: `Si tienes una web, un servicio, una API, o cualquier cosa que debería estar funcionando 24/7, necesitas Uptime Kuma. Es la herramienta de monitorización más elegante del ecosistema self-hosted, y con razón se ha convertido en un imprescindible: es bonita, es fácil de configurar, y hace exactamente lo que promete sin complicaciones.

La propuesta es simple: Uptime Kuma comprueba periódicamente que tus servicios estén respondiendo. Si algo falla, te avisa al instante por el canal que prefieras — Telegram, Discord, email, Slack, o cualquiera de los más de 90 servicios de notificación que soporta.

## Configurarlo lleva 2 minutos. Literalmente.

\`\`\`bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data louislam/uptime-kuma
\`\`\`

Una línea. Abres el navegador, vas a \`localhost:3001\`, creas tu usuario, añades tu primera web a monitorizar, y ya está. No hay archivos de configuración que editar, no hay YAML que escribir, no hay documentación de 50 páginas que leer.

## Qué puede monitorizar

No solo comprueba si tu web responde con un 200 OK. Uptime Kuma soporta:

- **HTTP/HTTPS**: comprueba el código de respuesta, mide el tiempo de carga, verifica que contenga (o no) un texto específico
- **TCP/UDP**: verifica que puertos específicos estén abiertos y respondiendo
- **Ping (ICMP)**: la comprobación más básica — ¿el servidor está vivo?
- **DNS**: comprueba que tus registros DNS apuntan donde deben (crítico cuando migras servidores)
- **Certificados SSL**: te avisa X días antes de que tu certificado expire (evita el clásico "la web muestra un error de seguridad y no sabíamos")
- **Contenedores Docker**: monitoriza directamente si un contenedor está corriendo
- **Bases de datos**: comprueba que MySQL, PostgreSQL, Redis, MongoDB responden
- **Game servers**: monitoriza servidores de Minecraft, Rust, CS...
- **gRPC**: para microservicios que usan este protocolo

## El sistema de notificaciones es brutal

Aquí es donde Uptime Kuma brilla de verdad. Cuando algo falla, necesitas saberlo inmediatamente, no 20 minutos después. Soporta más de **90 canales de notificación**:

**Los más usados:**
- **Telegram**: un mensaje instantáneo en tu grupo de operaciones
- **Discord**: webhook directo a tu canal de alertas
- **Slack**: integración nativa con canales
- **Email (SMTP)**: el clásico que nunca falla
- **PagerDuty/OpsGenie**: para equipos con guardias de incidentes

**Otros útiles:**
- Pushover, Gotify, ntfy (push notifications al móvil)
- Microsoft Teams
- Webhooks personalizados (para integrar con cualquier cosa)
- SMS vía Twilio
- Rocket.Chat, Matrix
- Y muchos más...

Puedes configurar **diferentes notificaciones para diferentes monitores**. Tu web personal te avisa por Telegram. Los servicios del trabajo te avisan por Slack Y por email. La base de datos crítica te avisa por PagerDuty. Cada monitor, sus reglas.

## La página de estado pública

Una funcionalidad que mucha gente no conoce: Uptime Kuma puede generar una **página de estado pública** que puedes compartir con tus clientes. Tipo status.tuempresa.com. Muestra el estado actual de cada servicio, el historial de uptime de los últimos 90 días, y los incidentes pasados. Completamente personalizable (logo, colores, dominio propio).

## El dashboard en tiempo real

El panel principal muestra de un vistazo:
- **Estado actual** de todos tus monitores (verde = ok, rojo = caído)
- **Tiempo de respuesta** en milisegundos con gráfica histórica
- **Porcentaje de uptime**: 99.9%, 99.99%... cada decimal cuenta
- **Historial de incidentes**: cuándo cayó, cuánto duró, cuándo se recuperó
- **Certificados SSL**: días restantes hasta expiración

## Comparativa con la alternativa de pago

| | UptimeRobot (Pro) | Uptime Kuma |
|---|---|---|
| Precio | 7$/mes (50 monitores) | Gratis, sin límites |
| Intervalo mínimo | 60 segundos | 20 segundos |
| Página de estado | Sí (branding limitado) | Sí (personalizable al 100%) |
| Notificaciones | 10 canales | 90+ canales |
| Self-hosting | No | Sí |
| Datos | En sus servidores | En tu servidor |

## Mi recomendación

Si tienes cualquier tipo de presencia online — una web, un servidor, un servicio — pon Uptime Kuma. Es gratis, tarda 2 minutos en configurar, y el día que algo falle (y fallará) te vas a alegrar de tenerlo. Es de esas herramientas que una vez las pruebas, te preguntas cómo vivías sin ellas.`
  },
  {
    source_id: "rustdesk/rustdesk",
    summary_es: `Si alguna vez has usado TeamViewer y te ha salido el mensaje de "sesión comercial detectada, desconectando en 5 minutos", sabes exactamente por qué existe RustDesk. Es una aplicación de escritorio remoto open source que funciona tan bien como TeamViewer pero sin las restricciones, sin los costes y con la posibilidad de montar tu propio servidor.

Y cuando digo "funciona tan bien" no exagero. RustDesk está escrito en Rust (de ahí el nombre), lo que le da un rendimiento excepcional: baja latencia, consumo mínimo de recursos, y una fluidez en la transmisión de vídeo que a veces supera al propio TeamViewer.

## El problema con TeamViewer

TeamViewer se ha vuelto cada vez más agresivo:

- **Detección falsa de uso comercial**: usas TeamViewer para ayudar a un amigo y te marca como "uso comercial", bloqueándote las sesiones a 5 minutos
- **Precios prohibitivos**: la licencia comercial cuesta desde 50€/mes. Para una empresa con 10 técnicos de soporte, son 500€/mes solo en software de acceso remoto
- **Privacidad**: toda tu sesión pasa por los servidores de TeamViewer en Alemania. Para algunos sectores (salud, legal, finanzas) esto es un problema de compliance
- **Rendimiento inconsistente**: en conexiones internacionales, TeamViewer puede ir lento porque el tráfico da la vuelta por sus servidores

RustDesk soluciona cada uno de estos problemas.

## Cómo funciona

La experiencia de uso es idéntica a TeamViewer: instalas la app, te da un ID y una contraseña temporal, y alguien puede conectarse a tu ordenador (o tú al suyo) introduciendo esos datos. Puedes ver la pantalla, mover el ratón, escribir con el teclado, transferir archivos, y chatear con la otra persona.

La diferencia es lo que hay por debajo.

## Servidor propio: la killer feature

Puedes montar tu propio servidor relay con Docker:

\`\`\`bash
docker compose up -d
\`\`\`

A partir de ahí, todo el tráfico de tus conexiones pasa por TU servidor. Esto significa:

- **Velocidad máxima**: si el servidor está en tu red o cerca geográficamente, la latencia es mínima
- **Privacidad total**: nadie más ve tu tráfico
- **Sin restricciones**: no hay detección de "uso comercial", no hay límites de tiempo, no hay límites de dispositivos
- **Compliance**: ideal para empresas que necesitan que los datos no salgan de su infraestructura

## Funcionalidades completas

- **Control remoto total**: ratón, teclado, portapapeles compartido
- **Transferencia de archivos**: arrastra y suelta entre ordenadores
- **Chat de texto**: comunicación durante la sesión
- **Múltiples pantallas**: navega entre los monitores del equipo remoto
- **Audio remoto**: escucha el audio del ordenador remoto
- **Grabación de sesión**: graba las sesiones para auditoría
- **Acceso desatendido**: configura equipos para conectarte sin que nadie acepte
- **Cifrado end-to-end**: toda la comunicación cifrada, incluso con servidores públicos
- **Wake-on-LAN**: enciende equipos remotos que están apagados

## Plataformas soportadas

Windows, macOS, Linux, Android, iOS y **navegador web**. Sí, puedes controlar un ordenador desde el navegador del móvil si no tienes la app instalada. La versión portable funciona sin instalación — ejecutas el .exe y listo, ideal para soporte técnico puntual.

## Para quién es perfecto

**Empresas de soporte técnico**: en vez de pagar miles de euros al año en licencias de TeamViewer, montan RustDesk con su servidor propio. Ahorro brutal y mejor rendimiento.

**Departamentos de IT**: acceso a todos los ordenadores de la empresa desde un panel centralizado, con permisos por usuario y logs de acceso.

**Teletrabajadores**: accede a tu ordenador de la oficina desde casa con una latencia tan baja que puedes diseñar en Photoshop o editar vídeo remotamente.

**Familias tech**: "Mamá, instala esta app y dime el número". Así de fácil es dar soporte remoto a tu familia.

## Rendimiento

Al estar escrito en Rust:
- **Arranque instantáneo**: se abre en milisegundos, no en 10 segundos como TeamViewer
- **Consumo de RAM**: ~30MB vs los 200MB+ de TeamViewer
- **Fluidez**: soporta hasta 120fps en la transmisión de pantalla
- **CPU**: consumo mínimo incluso durante sesiones largas`
  },
  {
    source_id: "nocodb/nocodb",
    summary_es: `NocoDB hace algo brillante en su simplicidad: coge cualquier base de datos existente (PostgreSQL, MySQL, SQLite, MariaDB, SQL Server) y le pone encima una interfaz visual tipo Airtable. Sin modificar la base de datos, sin migrar datos, sin romper nada. Conectas, y en 5 minutos tu equipo tiene una interfaz visual para trabajar con los datos.

Esto resuelve un problema que tiene prácticamente toda empresa: hay datos importantes en bases de datos a los que solo pueden acceder los desarrolladores con SQL. Marketing necesita ver las métricas de campaña. Ventas necesita actualizar el estado de los deals. Operaciones necesita consultar el inventario. Todos dependen de que un dev les saque un CSV o les haga un panel. NocoDB elimina esa dependencia.

## La diferencia clave con Airtable

Airtable es genial, pero tiene tres problemas serios:

1. **Precio**: 20$/usuario/mes en el plan Pro. Para un equipo de 10 personas, son 200$/mes por lo que básicamente es una hoja de cálculo con superpoderes
2. **Límite de registros**: 50.000 registros por base en el plan Pro. Si tienes más datos, pagas más
3. **Tus datos viven en sus servidores**: no puedes conectarlo a tu base de datos existente

NocoDB soluciona los tres: es gratis, sin límite de registros, y SE CONECTA a tu base de datos existente. No duplica los datos — lee y escribe directamente en tu PostgreSQL o MySQL.

## Vistas disponibles

A partir de tus tablas, NocoDB genera automáticamente múltiples vistas:

### Vista de tabla (Grid)
La vista clásica tipo Excel. Cada fila es un registro, cada columna un campo. Puedes ordenar, filtrar, ocultar columnas, editar inline, y aplicar fórmulas. Pero a diferencia de Excel, está conectado a tu base de datos real.

### Vista Kanban
Arrastra tarjetas entre columnas. Perfecto para estados (En progreso → Revisión → Completado) o prioridades (Alta → Media → Baja).

### Vista de galería
Cada registro se muestra como una tarjeta con imagen. Ideal para catálogos de productos, portfolios, o cualquier dato visual.

### Vista de formulario
Genera formularios públicos que insertan datos directamente en tu base de datos. Para encuestas, feedback de clientes, solicitudes internas...

### Vista de calendario
Si tus datos tienen fechas, se visualizan automáticamente en un calendario.

## Funcionalidades que lo hacen potente

- **Campos avanzados**: además de texto y números, soporta relaciones entre tablas, lookups, rollups, fórmulas, adjuntos, checkboxes, ratings, y más
- **API REST automática**: cada tabla expone automáticamente endpoints REST y GraphQL. Cualquier desarrollador puede integrarla en su app
- **Webhooks**: dispara acciones cuando se crea, actualiza o elimina un registro. Ideal para automatizaciones
- **Roles y permisos**: define quién puede ver qué tabla, quién puede editar, quién solo leer
- **Importación masiva**: importa datos desde CSV, Excel, o directamente desde Airtable
- **Compartir vistas**: comparte una vista específica con un link, con o sin contraseña
- **Auditoría**: historial de todos los cambios realizados por cada usuario

## Casos de uso reales

**CRM ligero**: tabla de contactos con campos de empresa, email, teléfono, estado del deal. Vista kanban por estado. Formulario público para que leads se registren.

**Gestión de inventario**: tabla de productos con stock, proveedor, precio, foto. Alerta automática por webhook cuando el stock baja de un umbral.

**Tracking de bugs**: los testers reportan bugs a través de un formulario. Los devs los ven en kanban por prioridad. Todo conectado a la misma base de datos.

**Base de conocimiento**: artículos con título, contenido, categoría, autor, fecha. Búsqueda por texto completo. Vista de galería para navegar visualmente.

## Instalación

\`\`\`bash
docker run -d --name nocodb -p 8080:8080 nocodb/nocodb:latest
\`\`\`

Abre \`localhost:8080\`, conecta tu base de datos existente (o crea una SQLite nueva), y empieza a trabajar. La migración desde Airtable es directa: exportas tu base de Airtable e importas en NocoDB con un clic.`
  },
  {
    source_id: "localsend/localsend",
    summary_es: `LocalSend es una de esas apps que cuando la descubres piensas "¿cómo es posible que esto no existiera antes?". Hace algo extremadamente simple: enviar archivos entre cualquier dispositivo de tu red local, sin internet, sin cuentas, sin configuración. Funciona como AirDrop de Apple, pero entre **cualquier combinación** de Android, iOS, Windows, Mac y Linux.

## El dolor que resuelve

Quieres pasar las fotos del móvil (Android) al portátil (Mac). ¿Qué haces?

- **Cable USB**: buscas el cable, conectas, el Mac no reconoce el Android, instalas Android File Transfer, el programa se cuelga, te rindes
- **Google Drive**: subes 500MB de fotos a internet, esperas, abres Drive en el Mac, descargas, esperas otra vez. Has gastado datos móviles para enviar algo al ordenador que tienes al lado
- **Email/WhatsApp**: te envías las fotos a ti mismo. Pero solo puedes enviar 10 a la vez. Y se comprimen. Y pierdes calidad
- **Bluetooth**: lento, falla constantemente, y a veces ni encuentra el dispositivo

Con LocalSend: abres la app en los dos dispositivos, seleccionas las fotos, y en 3 segundos están en el Mac. A la velocidad máxima de tu WiFi. Sin comprimir. Sin subir nada a internet.

## Cómo funciona (y por qué es seguro)

LocalSend usa un protocolo propio que descubre dispositivos en tu red local via mDNS/DNS-SD. Cuando abres la app, automáticamente ve otros dispositivos con LocalSend en la misma red WiFi. Seleccionas el destinatario, eliges los archivos, y se envían directamente de dispositivo a dispositivo.

**Ningún dato sale de tu red local.** No hay servidores intermedios. No hay nube. No hay cuenta. El archivo va literalmente del WiFi de tu móvil al WiFi de tu ordenador a través de tu router. La transferencia está cifrada con TLS.

## Velocidades reales

En una red WiFi 5 (802.11ac), LocalSend transfiere a velocidades de **30-80 MB/s** dependiendo de tu router y dispositivos. Eso significa:

- 100 fotos (500MB) → **~8 segundos**
- Un vídeo de 2GB → **~30 segundos**
- Una carpeta con documentos (50MB) → **instantáneo**

Compara esto con subirlo a Google Drive (dependiente de tu velocidad de subida, que suele ser 10x más lenta que la de bajada) y la diferencia es abismal.

## Funcionalidades

- **Sin configuración**: abre la app y empieza a compartir
- **Multiplataforma**: Android, iOS, Windows, Mac, Linux
- **Sin límite de tamaño**: envía archivos de cualquier tamaño
- **Múltiples archivos**: selecciona varios archivos o carpetas enteras
- **Sin internet**: solo necesita que los dos dispositivos estén en la misma red WiFi
- **Cifrado TLS**: toda la transferencia está cifrada
- **Open source**: puedes auditar el código y verificar que no envía nada fuera
- **Modo "recibir de cualquiera"**: abre tu dispositivo para que otros cercanos te envíen sin necesidad de aprobación previa
- **Historial**: ve las transferencias pasadas

## Casos de uso cotidianos

- **Fotos del móvil al PC**: el caso más común y el que mejor resuelve
- **Documentos en la oficina**: pasa un PDF al compañero de al lado sin subirlo a ningún sitio
- **Presentaciones**: envía el PowerPoint al ordenador conectado al proyector
- **Backups rápidos**: copia carpetas importantes entre dispositivos
- **Música y vídeos**: pasa contenido multimedia sin compresión

## Disponibilidad

- **Android**: Google Play y F-Droid
- **iOS**: App Store
- **Windows**: Microsoft Store y portable
- **macOS**: Homebrew (\`brew install localsend\`) y DMG
- **Linux**: Flatpak, Snap, AUR, AppImage

Instalar y usar. No hay paso de configuración.`
  },
  {
    source_id: "harry0703/MoneyPrinterTurbo",
    summary_es: `MoneyPrinterTurbo es la herramienta que está detrás de miles de canales de YouTube y TikTok que publican vídeos sin que aparezca ninguna persona. Le das un tema — "5 lugares increíbles que no sabías que existían" — y automáticamente genera un vídeo corto completo: guión, imágenes de stock, narración con voz IA, subtítulos animados y montaje final. Listo para subir a TikTok, YouTube Shorts o Instagram Reels.

Es la herramienta más popular del fenómeno "faceless content" y, para bien o para mal, ha democratizado la creación de vídeo automatizado. Pero merece la pena entender qué hace realmente, cuáles son sus limitaciones, y cuándo tiene sentido usarla.

## El proceso completo, paso a paso

### 1. Le das un tema (o una idea)
Puede ser tan simple como "datos curiosos sobre el cerebro humano" o tan específico como "comparativa entre Samsung S26 y iPhone 18, enfocada en la cámara".

### 2. La IA escribe el guión
Usando GPT-4, Claude, o el LLM que configures, genera un guión estructurado para formato corto: intro gancho, desarrollo con puntos numerados, y cierre con call to action. El guión se adapta automáticamente a la duración que quieras (30s, 60s, 90s).

### 3. Selecciona contenido visual
Busca automáticamente en bancos de imágenes y vídeos gratuitos (Pexels, Pixabay) clips e imágenes relevantes para cada sección del guión. Si dices "5 playas paradisíacas", busca clips de playas reales.

### 4. Genera la narración
Convierte el guión en audio con voces de IA naturales. Soporta múltiples idiomas (incluido español con acento neutro, español de España, español de México...) y puedes elegir entre decenas de voces. Algunas suenan genuinamente humanas.

### 5. Añade subtítulos
Genera subtítulos animados automáticamente sincronizados con la narración. Puedes personalizar el estilo: tamaño, color, posición, efecto de aparición (fade, typing, highlight word by word...).

### 6. Monta el vídeo final
Combina todo: clips de fondo, narración superpuesta, subtítulos animados, transiciones entre secciones. Exporta en formato vertical (9:16) optimizado para redes sociales.

## Personalización real

No es solo darle a un botón. Puedes controlar cada aspecto:

- **Duración**: de 15 segundos a 3 minutos
- **Tono**: informativo, humor, motivacional, dramático
- **Voces**: decenas de opciones por idioma, masculina/femenina, velocidad ajustable
- **Subtítulos**: 10+ estilos predefinidos, o personalizado con CSS
- **Fuentes de vídeo**: Pexels, Pixabay, o tus propios clips
- **Modelo de IA**: GPT-4, Claude, modelos locales vía Ollama
- **Música de fondo**: opcional, con ajuste automático de volumen

## El fenómeno del "faceless content"

Hay canales de YouTube con cientos de miles de suscriptores que no muestran nunca a una persona. Solo vídeos de "Top 10 datos sobre...", "¿Sabías que...?", "Las 5 mejores..." con imágenes de stock y voz IA. Muchos usan MoneyPrinterTurbo o herramientas similares.

**¿Funciona económicamente?** Algunos canales generan ingresos significativos con AdSense, pero hay que ser honesto:

- Los algoritmos de YouTube y TikTok cada vez detectan mejor contenido genérico generado por IA
- La competencia es brutal — hay miles de canales haciendo lo mismo
- La calidad media es baja, lo que diluye el impacto
- YouTube ha empezado a penalizar contenido puramente generado por IA sin valor añadido

## Cuándo tiene sentido usarlo

**Sí tiene sentido:**
- Como **punto de partida** para un vídeo que luego editas y personalizas
- Para **prototipar ideas** rápidamente antes de producir el vídeo final
- Para **contenido interno** de empresa (formación, comunicados, demos)
- Para **experimentar** con diferentes nichos y formatos de vídeo

**No tiene mucho sentido:**
- Publicar el resultado tal cual esperando hacerte viral
- Crear cientos de vídeos genéricos sin ningún toque personal
- Pensar que es una "máquina de dinero automática" (el nombre es marketing, no promesa)

## Requisitos técnicos

- Python 3.10+
- API key de OpenAI (o Anthropic, o modelo local con Ollama)
- Opcionalmente: API de Azure/ElevenLabs para voces premium
- GPU no necesaria (todo se procesa en la nube o con CPU)

## Instalación

\`\`\`bash
git clone https://github.com/harry0703/MoneyPrinterTurbo.git
cd MoneyPrinterTurbo
pip install -r requirements.txt
python main.py
\`\`\`

Tiene una interfaz web donde configuras todo visualmente. En 10 minutos generas tu primer vídeo.`
  },
  {
    source_id: "upscayl/upscayl",
    summary_es: `Upscayl es probablemente la app de escritorio más satisfactoria que vas a usar este año. Arrastra una imagen de baja resolución, esperas unos segundos, y el resultado parece magia: una versión de la misma imagen a 2x, 4x u 8x la resolución original con detalles que simplemente no estaban ahí antes.

No es un simple reescalado que hace la imagen más grande y borrosa. La inteligencia artificial literalmente **inventa los detalles que faltan** de forma creíble. Bordes que eran pixelados se vuelven nítidos. Texturas que eran manchas de color se convierten en patrones definidos. Texto que era ilegible se vuelve claro.

## Cómo funciona la magia

Upscayl usa modelos de IA basados en ESRGAN (Enhanced Super-Resolution Generative Adversarial Network). Estos modelos han sido entrenados con millones de pares de imágenes alta-resolución/baja-resolución, y han aprendido a predecir qué detalles faltan cuando una imagen tiene pocos píxeles.

El resultado no es perfecto (a veces genera artefactos o inventa detalles que no existían), pero para la mayoría de casos el resultado es asombrosamente bueno.

## Modelos disponibles y cuándo usar cada uno

### General Photo (Ultrasharp)
El modelo por defecto y el mejor para **fotos reales**. Produce resultados nítidos sin artefactos visibles. Ideal para retratos, paisajes, fotos de productos.

### General Photo (Remacri)
Mejor para **fotos con ruido** o compresión JPEG agresiva. Es menos agresivo con el sharpening, así que produce resultados más naturales con fotos de baja calidad.

### Digital Art
Optimizado para **ilustraciones, anime, arte digital y logos**. Mantiene las líneas limpias y los colores planos que caracterizan este tipo de contenido.

### Ultrasharp
**Máxima nitidez**. Ideal para imágenes que contienen texto (capturas de pantalla, documentos escaneados, memes). El texto se vuelve legible incluso cuando en la original era imposible leerlo.

## Casos de uso prácticos

### Rescatar fotos familiares antiguas
Esas fotos de 640x480 de la cámara digital de 2003 que son los únicos recuerdos de un viaje especial. Upscayl las puede llevar a 2560x1920 con detalles que parecen recordados, no inventados.

### Preparar imágenes para imprimir
Quieres imprimir una foto de tu perfil de WhatsApp (que tiene 200x200 píxeles) en un marco de 20x20cm. Sin upscaling se vería horrorosa. Con Upscayl a 8x, tienes una imagen de 1600x1600 que se ve bien impresa.

### E-commerce y productos
Tienes fotos de productos sacadas con el móvil viejo. Necesitas que se vean profesionales en tu tienda online. Upscayl las mejora significativamente sin necesidad de repetir la sesión de fotos.

### Wallpapers y assets web
Un wallpaper que te encanta pero solo existe en 1080p y tu monitor es 4K. Upscayl lo escala manteniendo la calidad. Lo mismo con assets para web que necesitan ser más grandes sin perder nitidez.

## Por qué es mejor que las alternativas de pago

- **Topaz Gigapixel AI**: 100$ de licencia. Resultados similares. Upscayl es gratis
- **Waifu2x**: solo funciona bien con anime/ilustraciones. Upscayl funciona con todo
- **Servicios online (Let's Enhance, etc.)**: suben tu imagen a un servidor (privacidad). Tienen límites de uso. Y cuestan dinero. Upscayl procesa todo en tu ordenador
- **Photoshop Super Resolution**: necesitas suscripción a Adobe (26€/mes). Y el resultado no es mejor

## Rendimiento

Upscayl usa la GPU de tu ordenador para el procesamiento. Tiempos aproximados:

- **Con GPU dedicada (NVIDIA/AMD)**: 2-10 segundos por imagen
- **Con GPU integrada (Intel/Apple Silicon)**: 10-30 segundos por imagen
- **Solo CPU**: 1-5 minutos por imagen

El Mac con Apple Silicon (M1/M2/M3) funciona especialmente bien gracias al Neural Engine.

## Instalación

Descarga el instalador desde su web para Windows, Mac o Linux. No hay línea de comandos, no hay configuración. Instalar, abrir, arrastrar imagen, elegir modelo y escala, y dar al botón.`
  },
  {
    source_id: "hoppscotch/hoppscotch",
    summary_es: `Si eres desarrollador y usas Postman, hay una pregunta que deberías hacerte: ¿realmente necesitas una app de 500MB que tarda 15 segundos en abrir, te obliga a crear una cuenta, y consume 1GB de RAM para enviar una petición HTTP? Porque Hoppscotch hace exactamente lo mismo, pero carga en milisegundos, funciona desde el navegador, y es open source.

## La historia de Postman (y por qué la gente huye)

Postman empezó como una extensión de Chrome simple y querida por todos. Luego se convirtió en una app Electron pesada. Luego exigió crear cuenta para usarla. Luego empezó a sincronizar tus colecciones en su nube sin preguntar. Luego añadió inteligencia artificial, workspaces de equipo, y funcionalidades que el 90% de los usuarios no necesita. Cada actualización la hacía más grande, más lenta y más intrusiva.

Hoppscotch es lo que Postman era al principio: una herramienta ligera, rápida y centrada en lo que necesitas.

## Qué puedes hacer con Hoppscotch

### APIs REST
El uso principal. Selecciona el método (GET, POST, PUT, DELETE...), escribe la URL, añade headers, body, params, y envía. La respuesta se muestra con syntax highlighting, tiempos de respuesta, y opción de copiar o exportar.

### GraphQL
Editor de queries con autocompletado basado en el schema del servidor. Explorador de documentación integrado. Soporte para variables y fragments.

### WebSockets
Conexiones en tiempo real con visualización de mensajes entrantes y salientes. Puedes enviar y recibir mensajes en tiempo real mientras ves la conexión activa.

### Server-Sent Events (SSE)
Para APIs de streaming. Ve los eventos según llegan en tiempo real.

### MQTT
Para IoT y sistemas de mensajería publish/subscribe.

## Funcionalidades para el día a día

- **Colecciones**: organiza tus peticiones en carpetas. Las puedes exportar e importar (compatible con formato Postman)
- **Entornos**: define variables (URL base, token, API key) para cada entorno (desarrollo, staging, producción) y cambia con un clic
- **Autenticación**: Bearer Token, Basic Auth, OAuth2, API Key — todo integrado
- **Pre-request scripts**: ejecuta JavaScript antes de enviar la petición (generar tokens, calcular firmas)
- **Tests**: escribe scripts para validar que la respuesta es correcta
- **Historial**: todas las peticiones se guardan automáticamente
- **Generación de código**: convierte tu petición en código cURL, Python, JavaScript, Go, PHP...
- **Import/Export**: importa colecciones de Postman, OpenAPI/Swagger, cURL, HAR

## Cuatro formas de usarlo

### 1. Web (hoppscotch.io)
Abre el navegador, ve a hoppscotch.io, y empieza a enviar peticiones. Sin instalar nada, sin crear cuenta. Es la forma más rápida de probar una API.

### 2. App de escritorio
Para quien prefiera una app nativa. Disponible para Windows, Mac y Linux. Las mismas funcionalidades que la versión web pero como aplicación independiente.

### 3. Self-hosted
Despliega tu propia instancia para tu equipo. Todas las colecciones, entornos y datos se quedan en tu servidor. Ideal para empresas con datos sensibles en sus APIs.

### 4. CLI (hopp-cli)
Ejecuta colecciones desde la línea de comandos. Perfecto para integrar en pipelines de CI/CD y tests automatizados.

## Por qué la gente migra de Postman a Hoppscotch

| Lo que frustra de Postman | Cómo lo resuelve Hoppscotch |
|---|---|
| Tarda 15s en abrir | Carga en milisegundos |
| Obliga a crear cuenta | Sin cuenta necesaria |
| Consume 1GB+ de RAM | Funciona en el navegador |
| Sincroniza datos en su nube | Self-hosteable o solo local |
| Pop-ups constantes del plan Pro | Sin upselling |
| Pesa 500MB | Pesa 0 (es una web) |
| Actualizaciones que rompen cosas | Siempre disponible |

## Limitaciones honestas

Hoppscotch no tiene todas las funcionalidades de Postman. Si tu equipo depende de Mock Servers, Monitors avanzados, o la integración nativa con Newman para CI/CD empresarial, Postman sigue siendo más completo. Pero para el 90% de desarrolladores que simplemente necesitan enviar peticiones HTTP, probar APIs y compartir colecciones, Hoppscotch es más que suficiente y significativamente mejor en experiencia de uso.`
  },
];

async function main() {
  console.log("Actualizando contenido extendido v2 (artículos completos)...\n");

  for (const u of updates) {
    try {
      await sql`
        UPDATE projects
        SET summary_es = ${u.summary_es}, updated_at = NOW()
        WHERE source_id = ${u.source_id}
      `;
      console.log(`✓ ${u.source_id}`);
    } catch(e) {
      console.error(`✗ ${u.source_id}: ${e.message}`);
    }
  }

  console.log("\n✅ Contenido v2 actualizado");
  await sql.end();
}

main();

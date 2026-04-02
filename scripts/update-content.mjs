import postgres from "postgres";

const sql = postgres("postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar");

const updates = [
  {
    source_id: "browser-use/browser-use",
    summary_es: `Browser Use permite que agentes de inteligencia artificial controlen un navegador web de forma completamente autónoma. Imagina decirle a una IA "busca vuelos baratos a Lisboa para mayo" y que ella sola abra el navegador, navegue por Skyscanner, compare precios y te devuelva los resultados. Es exactamente lo que hace esta herramienta.

### Cómo funciona

Browser Use actúa como un puente entre cualquier modelo de lenguaje (GPT-4, Claude, Gemini, Llama) y un navegador real. La IA puede ver lo que hay en pantalla, hacer clic en elementos, rellenar formularios, navegar entre páginas y extraer información, todo de forma autónoma. No necesitas escribir selectores CSS ni lidiar con APIs: la IA entiende la página como lo haría un humano.

### Funcionalidades clave

- **Compatibilidad universal**: funciona con cualquier LLM que soporte function calling
- **Visión por computador**: la IA ve la página como tú la ves, no solo el HTML
- **Acciones complejas**: puede navegar entre varias páginas, rellenar formularios multi-paso, gestionar pop-ups
- **Extracción de datos**: scraping inteligente sin necesidad de definir la estructura de antemano
- **Modo persistente**: mantiene sesiones abiertas con cookies y login

### Para quién es útil

- **Desarrolladores** que quieren automatizar tareas web sin crear scrapers frágiles
- **Equipos de negocio** que necesitan extraer datos de webs sin API
- **Investigadores** que quieren monitorizar precios, ofertas o cambios en webs
- **Cualquiera** que haga tareas repetitivas en el navegador

### Instalación

Se instala con \`pip install browser-use\` y en pocas líneas de código ya puedes lanzar tu primer agente. La documentación es clara y tiene ejemplos para cada caso de uso.

### Por qué es importante

Browser Use ha explotado en popularidad porque resuelve un problema que todo el mundo tiene: hay miles de webs que no tienen API pero necesitas interactuar con ellas. En vez de contratar a alguien para hacer tareas repetitivas, un agente con Browser Use las hace en segundos.`
  },
  {
    source_id: "langgenius/dify",
    summary_es: `Dify es una plataforma de código abierto para construir aplicaciones de inteligencia artificial de forma visual, sin necesidad de ser un experto en programación. Con su editor de flujos arrastrar y soltar, puedes crear chatbots, asistentes RAG, agentes autónomos y flujos de trabajo complejos que combinan múltiples modelos de IA.

### Qué lo hace especial

A diferencia de otras herramientas similares, Dify está pensado para producción real. No es solo un juguete para prototipar: incluye gestión de prompts con versionado, evaluación de calidad de respuestas, monitorización de costes en tiempo real y soporte para cientos de modelos de IA (OpenAI, Anthropic, Ollama, modelos locales...).

### Funcionalidades principales

- **Editor visual de flujos**: arrastra y conecta nodos para crear workflows de IA complejos
- **RAG integrado**: sube documentos (PDFs, webs, bases de datos) y tu chatbot los consulta automáticamente
- **Agentes autónomos**: crea agentes que usan herramientas, buscan en internet y toman decisiones
- **API lista para usar**: cada app que crees tiene automáticamente una API que puedes integrar en cualquier producto
- **Gestión de prompts**: versiona, prueba y optimiza tus prompts en un entorno controlado
- **Multi-modelo**: cambia de GPT-4 a Claude o a un modelo local con un clic, sin cambiar código

### Casos de uso reales

- **Atención al cliente**: chatbot que consulta tu documentación y responde preguntas de clientes
- **Análisis de documentos**: sube contratos, facturas o informes y hazle preguntas en lenguaje natural
- **Generación de contenido**: flujos automatizados que generan artículos, emails o posts para redes
- **Asistentes internos**: herramientas de IA personalizadas para tu equipo

### Cómo se compara con la alternativa de pago

Dify es lo que obtendrías si combinaras Zapier, ChatGPT Plus y Langchain en una sola plataforma visual. La versión self-hosted es completamente gratuita y sin límites. También ofrecen una versión cloud de pago para quien no quiera gestionar infraestructura.

### Instalación

Con Docker Compose, en 5 minutos tienes Dify corriendo en tu servidor. La documentación es excelente y tiene una comunidad muy activa.`
  },
  {
    source_id: "rustdesk/rustdesk",
    summary_es: `RustDesk es la alternativa open source a TeamViewer que todo el mundo estaba esperando. Te permite controlar cualquier ordenador de forma remota con una interfaz limpia y rápida, y lo mejor: puedes montar tu propio servidor para que todo el tráfico pase por tu infraestructura, sin depender de terceros.

### Por qué elegir RustDesk sobre TeamViewer

TeamViewer tiene un plan gratuito cada vez más restrictivo (te bloquea si sospecha uso comercial), es lento en conexiones internacionales, y toda tu sesión pasa por sus servidores. RustDesk soluciona los tres problemas: es gratuito sin restricciones, ultrarrápido (escrito en Rust) y puedes self-hostear el servidor de relay para máxima privacidad.

### Funcionalidades principales

- **Escritorio remoto completo**: control de ratón y teclado, transferencia de archivos, chat integrado
- **Multiplataforma total**: Windows, macOS, Linux, Android, iOS, e incluso navegador web
- **Servidor propio**: monta tu servidor relay en minutos para que el tráfico no salga de tu red
- **Cifrado de extremo a extremo**: toda la comunicación está cifrada, incluso cuando usas sus servidores públicos
- **Sin instalación necesaria**: la versión portable funciona sin instalar nada
- **Gestión de dispositivos**: consola de administración para equipos de soporte técnico

### Para quién es perfecto

- **Soporte técnico**: empresas que dan soporte remoto a clientes y no quieren pagar licencias de TeamViewer
- **Teletrabajadores**: acceder a tu ordenador de la oficina desde casa
- **Sysadmins**: gestionar servidores y PCs remotos de forma segura
- **Familias tech**: ayudar a tus padres con el ordenador desde cualquier sitio

### Rendimiento

Al estar escrito en Rust, el rendimiento es excepcional. La latencia es baja incluso en conexiones internacionales, y el consumo de recursos es mínimo comparado con TeamViewer o AnyDesk. La transmisión de vídeo soporta hasta 120fps.

### Instalación

Descarga el ejecutable, ábrelo y ya puedes compartir tu ID con quien quieras que se conecte. Para el servidor propio, un simple \`docker run\` y listo.`
  },
  {
    source_id: "localsend/localsend",
    summary_es: `LocalSend hace algo que debería haber existido desde siempre: enviar archivos entre cualquier dispositivo de tu red local sin necesidad de internet, sin crear cuentas, sin instalar nada raro. Funciona como AirDrop de Apple, pero entre Android, iOS, Windows, Mac y Linux.

### Cómo funciona

Abres la app, ves automáticamente los dispositivos cercanos que también tienen LocalSend, seleccionas los archivos y se envían al instante a través de tu red WiFi local. No hace falta emparejar nada, no necesitas internet y no hay límite de tamaño. Todo se transmite cifrado por tu red local — nada sale a la nube.

### Por qué supera a las alternativas

- **AirDrop** solo funciona entre dispositivos Apple
- **Nearby Share** de Android solo funciona con Android (y a veces con Windows)
- **Servicios en la nube** (Google Drive, WeTransfer) requieren subir a internet y luego descargar — lento para archivos grandes
- **Cables USB** son incómodos y lentos para fotos del móvil

LocalSend los supera a todos porque funciona entre **cualquier combinación de dispositivos** y lo hace por red local — es decir, a la velocidad máxima de tu WiFi.

### Funcionalidades destacadas

- **Zero configuración**: abre la app y empieza a compartir
- **Sin internet**: todo va por red local
- **Sin límite de tamaño**: envía vídeos de gigas sin problema
- **Cifrado**: toda la transferencia está cifrada con TLS
- **Código abierto**: puedes auditar el código y verificar que no envía nada fuera de tu red
- **Rápido**: aprovecha la velocidad máxima de tu red WiFi

### Casos de uso cotidianos

- Pasar fotos del móvil al PC sin cables
- Compartir documentos en la oficina sin subirlos a la nube
- Enviar vídeos pesados entre dispositivos sin esperar
- Compartir archivos entre un Mac y un Android (algo que Apple no facilita)

### Instalación

Disponible en Google Play, App Store, Microsoft Store, Homebrew y como AppImage para Linux. Instalar y usar.`
  },
  {
    source_id: "AppFlowy-IO/AppFlowy",
    summary_es: `AppFlowy es la alternativa open source a Notion que no sacrifica funcionalidad por privacidad. Tiene todo lo que esperas de un workspace moderno: documentos colaborativos, bases de datos con múltiples vistas, kanban, calendario, y ahora también integración nativa con IA.

### Qué ofrece

AppFlowy replica las funciones principales de Notion con una interfaz limpia y moderna que funciona sorprendentemente bien:

- **Documentos ricos**: editor de bloques tipo Notion con markdown, imágenes, embeds, código y más
- **Bases de datos**: tablas, kanban, calendario y galería, con filtros, ordenación y fórmulas
- **Espacios de trabajo**: organiza documentos en carpetas y espacios compartidos
- **IA integrada**: genera contenido, resume textos, traduce y organiza ideas con modelos de IA
- **Plantillas**: decenas de plantillas listas para usar (gestión de proyectos, CRM personal, hábitos...)

### La diferencia clave con Notion

**Tú controlas tus datos.** Con Notion, tus notas, ideas y datos de negocio viven en servidores de una empresa americana. Con AppFlowy puedes:

- Self-hostearlo en tu propio servidor
- Usar almacenamiento local (tus notas nunca salen de tu ordenador)
- Elegir su nube si prefieres la comodidad

### Para quién es

- **Usuarios de Notion preocupados por la privacidad**: misma experiencia, tus datos bajo tu control
- **Equipos que necesitan colaboración**: documentos compartidos, bases de datos de equipo, gestión de proyectos
- **Desarrolladores**: extensible con plugins, código abierto, API disponible
- **Empresas con requisitos de compliance**: self-hosting para cumplir normativas de datos

### Estado actual

AppFlowy ha madurado enormemente en los últimos meses. Las apps de escritorio (Windows, Mac, Linux) y móvil (iOS, Android) funcionan bien, y la versión web está en desarrollo activo. La sincronización entre dispositivos funciona correctamente tanto en su cloud como en self-hosting.

### Instalación

Descarga la app de escritorio desde su web o instala con \`brew install appflowy\` en Mac. Para self-hosting, proporcionan imágenes Docker con guía paso a paso.`
  },
  {
    source_id: "OpenCut-app/OpenCut",
    summary_es: `OpenCut es el editor de vídeo open source que quiere destronar a CapCut. Con una interfaz moderna y familiar, permite editar vídeos con todas las herramientas que necesitas para contenido de redes sociales.

### Por qué existe OpenCut

CapCut (propiedad de ByteDance/TikTok) se ha convertido en el editor de vídeo más popular del mundo, pero tiene problemas: recopila enormes cantidades de datos, puede ser baneado en países que restringen TikTok, y añade marcas de agua en funciones premium. OpenCut nace como respuesta a todo esto.

### Funcionalidades

- **Timeline completo**: corta, recorta, divide y reorganiza clips con precisión
- **Texto y subtítulos**: texto animado, subtítulos automáticos con IA, múltiples estilos
- **Transiciones y efectos**: biblioteca de transiciones suaves y efectos visuales
- **Filtros y color**: corrección de color, LUTs, filtros creativos
- **Audio**: gestión de pistas de audio, ajuste de volumen, fade in/out
- **Exportación flexible**: múltiples formatos y resoluciones, optimizado para cada red social

### Qué lo diferencia

- **100% gratuito**: sin marcas de agua, sin suscripciones, sin funciones bloqueadas
- **Privacidad**: tu contenido no pasa por servidores de ByteDance
- **Open source**: puedes ver, modificar y contribuir al código
- **Sin censura**: no hay algoritmos que moderen tu contenido antes de exportarlo

### Para quién es

- **Creadores de contenido**: YouTubers, TikTokers, Instagramers que quieren una alternativa libre
- **Pequeños negocios**: crear contenido para redes sin pagar por software de edición
- **Educadores**: editar vídeos educativos sin restricciones de licencia

### Estado del proyecto

OpenCut está creciendo a una velocidad impresionante en GitHub. La comunidad es muy activa y añade funciones nuevas cada semana. Aunque todavía no tiene todas las funciones de CapCut (faltan algunos efectos avanzados), para el 80% de los casos de uso ya es perfectamente funcional.`
  },
  {
    source_id: "louislam/uptime-kuma",
    summary_es: `Uptime Kuma es la herramienta de monitorización más elegante del ecosistema self-hosted. Te permite vigilar que tus webs, APIs y servicios estén funcionando, y te avisa al instante cuando algo falla.

### Por qué todo el mundo lo usa

En la comunidad de self-hosting, Uptime Kuma es casi obligatorio. Y hay buenas razones: es bonito, es fácil de configurar, y hace exactamente lo que promete sin complicaciones. En 2 minutos con Docker tienes un dashboard profesional de monitorización.

### Tipos de monitorización

- **HTTP/HTTPS**: comprueba que tu web responde y mide el tiempo de respuesta
- **TCP/UDP**: verifica que puertos específicos estén abiertos
- **Ping**: monitoriza la disponibilidad de servidores
- **DNS**: comprueba que tus registros DNS apuntan donde deben
- **Docker**: monitoriza contenedores Docker directamente
- **Certificados SSL**: te avisa antes de que tus certificados expiren
- **Keywords**: verifica que una página contenga (o no) un texto específico

### Sistema de alertas

Lo que hace brillar a Uptime Kuma es su sistema de notificaciones. Soporta más de **90 servicios de notificación**:
- Telegram, Discord, Slack, Microsoft Teams
- Email (SMTP)
- Webhooks personalizados
- PagerDuty, OpsGenie
- Push notifications (Pushover, Gotify)
- Y muchos más

### Dashboard en tiempo real

El dashboard muestra de un vistazo el estado de todos tus servicios con gráficas de uptime, tiempos de respuesta históricos y un timeline de incidentes. También tiene una **página de estado pública** que puedes compartir con tus clientes para que vean la disponibilidad de tus servicios.

### Comparativa con la alternativa de pago

UptimeRobot cuesta 7$/mes por 50 monitores. Uptime Kuma es gratuito, sin límite de monitores, y tus datos se quedan en tu servidor. La única desventaja es que tienes que hostearlo tú, pero con Docker es trivial.

### Instalación

\`docker run -d -p 3001:3001 louislam/uptime-kuma\` — literalmente una línea y ya está corriendo.`
  },
  {
    source_id: "harry0703/MoneyPrinterTurbo",
    summary_es: `MoneyPrinterTurbo genera vídeos cortos completos con un solo clic usando inteligencia artificial. Le das un tema y automáticamente crea el guión, selecciona imágenes, genera la narración con voz IA, añade subtítulos y monta el vídeo final listo para publicar.

### Cómo funciona el proceso

1. **Le das un tema**: por ejemplo, "5 curiosidades sobre el fondo del océano"
2. **Genera el guión**: la IA escribe un guión atractivo y estructurado para formato corto
3. **Busca contenido visual**: selecciona clips e imágenes de stock relevantes automáticamente
4. **Crea la narración**: genera audio con voz natural en el idioma que elijas
5. **Monta el vídeo**: combina todo, añade subtítulos animados y transiciones
6. **Exporta**: vídeo final en formato vertical (9:16) listo para TikTok, YouTube Shorts o Reels

### Personalización

No es solo darle a un botón y esperar. Puedes controlar cada aspecto:

- **Idioma**: soporta español, inglés, chino, y muchos más
- **Voz**: elige entre decenas de voces IA naturales
- **Estilo visual**: minimalista, dinámico, informativo, humor...
- **Duración**: ajusta la longitud del vídeo resultante
- **Subtítulos**: diferentes estilos, colores y posiciones
- **Fuentes de vídeo**: usa Pexels, Pixabay o tus propios clips

### El fenómeno "faceless content"

MoneyPrinterTurbo es la herramienta que está detrás de muchos canales de YouTube y TikTok de "contenido sin rostro" — canales que publican vídeos informativos sin que aparezca ninguna persona. Estos canales pueden generar ingresos significativos con publicidad si consiguen tracción.

### Para quién es útil

- **Creadores de contenido**: generar ideas y borradores de vídeos rápidamente
- **Marketers**: crear vídeos promocionales de bajo coste
- **Experimentadores**: probar nichos de contenido sin invertir mucho tiempo
- **Educadores**: crear material didáctico en vídeo

### Consideraciones

El contenido generado 100% por IA tiene limitaciones: puede resultar genérico y los algoritmos de las plataformas cada vez detectan mejor este tipo de contenido. Lo ideal es usarlo como punto de partida y añadir tu toque personal.

### Requisitos

Necesitas una API key de OpenAI (u otro LLM compatible) para los guiones, y opcionalmente una de Azure/ElevenLabs para las voces premium. Se ejecuta en local con Python.`
  },
  {
    source_id: "twentyhq/twenty",
    summary_es: `Twenty es un CRM open source moderno que quiere ser la alternativa a Salesforce para equipos que no quieren pagar miles de euros al mes. Con una interfaz limpia y contemporánea, gestiona todo el ciclo de relación con clientes.

### El problema que resuelve

Salesforce es potente pero absurdamente caro (25-300€/usuario/mes), lento, y necesitas un consultor certificado para configurarlo. HubSpot es más amigable pero te atrapa en su ecosistema con precios que escalan rápido. Twenty ofrece un CRM completo, moderno y gratuito.

### Funcionalidades principales

- **Gestión de contactos y empresas**: base de datos completa de clientes con campos personalizables
- **Pipeline de ventas**: visualiza tus oportunidades en columnas arrastrables tipo kanban
- **Timeline de actividades**: historial completo de interacciones con cada contacto
- **Tareas y recordatorios**: no dejes escapar ningún seguimiento
- **Integración con email**: conecta tu correo y registra conversaciones automáticamente
- **Campos personalizados**: adapta la estructura de datos a tu negocio
- **API GraphQL**: integra Twenty con cualquier herramienta de tu stack

### Qué lo diferencia de otros CRM open source

Twenty no parece un proyecto open source. La interfaz tiene la calidad visual de un producto SaaS premium: animaciones suaves, diseño consistente, y una UX pensada por gente que ha usado (y sufrido) Salesforce. No es un clon feo de un CRM de pago — es un producto diseñado desde cero para ser mejor.

### Para quién es ideal

- **Startups**: CRM profesional desde el día 1 sin coste de licencias
- **Freelancers**: gestionar clientes y oportunidades sin sobrepagar
- **PYMEs**: alternativa real a Salesforce sin el dolor de la implementación
- **Equipos de ventas pequeños**: pipeline visual, seguimiento de deals, sin complejidad innecesaria

### Instalación

Docker Compose para self-hosting o su cloud gestionado para quien prefiere no gestionar infraestructura. La migración desde otros CRMs es posible a través de importación CSV.`
  },
  {
    source_id: "browserbase/stagehand",
    summary_es: `Stagehand lleva la automatización de navegador al siguiente nivel con inteligencia artificial. En vez de escribir selectores CSS frágiles que se rompen cuando la web cambia, le dices en lenguaje natural qué quieres hacer y la IA lo ejecuta.

### El problema de la automatización web tradicional

Si alguna vez has escrito un scraper o un test automatizado, sabes el dolor: \`document.querySelector('#main > div:nth-child(3) > a.btn-primary')\`. Ese selector funciona hoy, pero mañana la web cambia un div y se rompe todo. Stagehand resuelve esto porque la IA **ve** la página como un humano, no como un parser de HTML.

### Cómo funciona

Stagehand expone tres funciones principales:

- **\`act()\`**: ejecuta una acción en lenguaje natural — "haz clic en iniciar sesión", "rellena el email con test@ejemplo.com"
- **\`extract()\`**: extrae datos estructurados — "dame todos los precios de la tabla"
- **\`observe()\`**: observa el estado de la página — "¿hay algún mensaje de error?"

### Ejemplo real

\`\`\`javascript
const stagehand = new Stagehand();
await stagehand.init();
await stagehand.goto("https://amazon.es");
await stagehand.act("busca 'auriculares bluetooth'");
await stagehand.act("ordena por precio de menor a mayor");
const productos = await stagehand.extract("los primeros 5 productos con su nombre y precio");
\`\`\`

### Ventajas sobre scraping tradicional

- **Resistente a cambios**: si la web cambia su diseño, la IA se adapta
- **Sin selectores**: no necesitas inspeccionar el HTML ni escribir XPath
- **Interacciones complejas**: maneja pop-ups, modales, scroll infinito, CAPTCHAs simples
- **Más rápido de desarrollar**: escribes en lenguaje natural, no en código frágil

### Para quién es útil

- **Desarrolladores**: scrapers que no se rompen cada semana
- **QA engineers**: tests end-to-end que se adaptan a cambios de UI
- **Analistas de datos**: extraer información de webs sin API
- **Automatización de procesos**: tareas repetitivas en webs internas

### Construido sobre Playwright

Stagehand usa Playwright por debajo, así que tienes toda la potencia de un framework de automatización profesional (screenshots, grabación de vídeo, múltiples navegadores) con la inteligencia de la IA encima.`
  },
  {
    source_id: "excalidraw/excalidraw",
    summary_es: `Excalidraw es la pizarra virtual que ha conquistado al mundo tech por su sencillez y su estilo visual único. Todo lo que dibujas parece hecho a mano alzada, lo que le da un aspecto informal y atractivo perfecto para diagramas, wireframes y explicaciones visuales.

### Por qué ha ganado tanta tracción

Hay muchas herramientas de diagramas (Miro, Figma, draw.io), pero Excalidraw ha encontrado un nicho único: diagramas que parecen hechos en una servilleta. Este estilo "hand-drawn" hace que los diagramas técnicos sean menos intimidantes y más fáciles de entender. Es el motivo por el que equipos de ingeniería en Meta, Google y Stripe lo usan para sus documentos internos.

### Funcionalidades clave

- **Dibujo libre**: formas, flechas, texto, todo con aspecto dibujado a mano
- **Colaboración en tiempo real**: comparte un enlace y dibuja con tu equipo simultáneamente
- **Sin registro**: abre excalidraw.com y empieza a dibujar, sin cuentas ni login
- **Exportación versátil**: PNG, SVG, o copia directa para pegar en documentos
- **Librería de componentes**: miles de iconos y formas compartidas por la comunidad
- **Modo oscuro**: perfecto para presentaciones
- **Self-hosteable**: monta tu propia instancia para tu empresa
- **Cifrado end-to-end**: las sesiones colaborativas están cifradas

### Casos de uso habituales

- **Arquitectura de software**: diagramas de sistema, flujos de datos, arquitecturas cloud
- **Wireframes**: bocetos rápidos de interfaces de usuario
- **Explicaciones técnicas**: documentar procesos para el equipo
- **Brainstorming**: sesiones de ideación colaborativas
- **Clases y presentaciones**: explicar conceptos complejos de forma visual

### Integraciones

Excalidraw se integra con Notion, Obsidian, VS Code, Confluence y más. Muchas herramientas de documentación tienen plugins que permiten incrustar diagramas de Excalidraw directamente.

### Alternativa a Miro y Figma

Miro cuesta 8-16$/usuario/mes y Figma Whiteboard viene con FigJam a 5$/usuario/mes. Excalidraw es 100% gratuito, más rápido de cargar, y para diagramas técnicos ofrece una experiencia superior gracias a su estilo visual único.`
  },
  {
    source_id: "hacksider/Deep-Live-Cam",
    summary_es: `Deep-Live-Cam permite hacer face swap en tiempo real y crear deepfakes de vídeo con una sola imagen de referencia. La tecnología es impresionante: funciona en tiempo real sobre tu webcam con una calidad que hace difícil distinguir el resultado del original.

### Cómo funciona

1. Proporcionas una foto de un rostro (cualquier foto sirve)
2. Activas tu webcam
3. Deep-Live-Cam reemplaza tu cara por la de la foto en tiempo real
4. El resultado se ve en pantalla y puedes grabarlo o usarlo en videollamadas

### Capacidades técnicas

- **Tiempo real**: el intercambio de rostro ocurre con latencia mínima
- **Una sola imagen**: no necesitas un dataset de cientos de fotos
- **Expresiones faciales**: replica tus gestos y expresiones en la cara objetivo
- **Vídeo pregrabado**: también funciona sobre vídeos, no solo webcam en vivo
- **Múltiples rostros**: puede intercambiar varios rostros en la misma escena
- **Mejora de calidad**: incluye un módulo de upscaling facial para mayor realismo

### Aplicaciones legítimas

- **Entretenimiento**: efectos especiales caseros, contenido humorístico
- **Privacidad**: anonimizar tu rostro en videollamadas o grabaciones
- **Cine independiente**: efectos de face swap sin presupuesto de Hollywood
- **Educación**: demostrar las capacidades y riesgos de la IA generativa

### Consideraciones éticas importantes

Esta herramienta es poderosa y debe usarse con responsabilidad:
- **Nunca** crear contenido que suplante la identidad de alguien sin su consentimiento
- **Nunca** usar para fraude, acoso o desinformación
- El proyecto incluye filtros y salvaguardas contra el uso malintencionado
- En muchos países, crear deepfakes de personas sin su permiso es ilegal

### Requisitos

Funciona mejor con GPU (NVIDIA recomendada), aunque también soporta CPU con rendimiento reducido. Se instala con Python y tiene una interfaz gráfica sencilla.`
  },
  {
    source_id: "hoppscotch/hoppscotch",
    summary_es: `Hoppscotch es la alternativa open source a Postman que todo desarrollador debería conocer. Es rápido, ligero, bonito y hace exactamente lo que necesitas para probar y desarrollar APIs.

### El problema con Postman

Postman empezó como una extensión de Chrome sencilla y se ha convertido en una app de escritorio de 500MB que tarda en abrir, requiere cuenta obligatoria, y cada actualización añade más funciones que nadie pidió. Muchos desarrolladores están hartos y buscan alternativas.

### Por qué Hoppscotch es mejor para la mayoría

- **Carga instantánea**: funciona en el navegador, abre en milisegundos
- **Sin cuenta obligatoria**: puedes usarlo sin registrarte
- **Interfaz minimalista**: todo lo esencial, sin bloatware
- **Consumo de recursos**: no consume 1GB de RAM como Postman
- **Self-hosteable**: monta tu propia instancia para tu equipo

### Funcionalidades completas

- **REST API**: peticiones GET, POST, PUT, DELETE con todos los headers y body formats
- **GraphQL**: explorador de schemas, autocompletado de queries, variables
- **WebSockets**: conexiones en tiempo real con visualización de mensajes
- **Server-Sent Events**: soporte para streaming
- **Colecciones**: organiza tus peticiones en carpetas y colecciones compartibles
- **Entornos**: variables de entorno para cambiar entre desarrollo, staging y producción
- **Autenticación**: Bearer, Basic, OAuth2, API Key
- **Tests**: escribe scripts de test para validar respuestas
- **Historial**: todas las peticiones se guardan automáticamente
- **Importar/Exportar**: compatible con colecciones de Postman, OpenAPI, cURL

### Modos de uso

1. **Web**: abre hoppscotch.io y empieza a usarlo
2. **Desktop**: app de escritorio (Electron) para quien prefiera una app nativa
3. **Self-hosted**: despliega tu propia instancia con Docker para tu equipo
4. **CLI**: herramienta de línea de comandos para CI/CD

### Para quién es

Cualquier desarrollador que trabaje con APIs. Si usas Postman y estás contento, puede que no necesites cambiar. Pero si te frustra su peso, su obligación de crear cuenta, o sus constantes pop-ups para vender el plan pro, Hoppscotch te va a encantar.`
  },
  {
    source_id: "nocodb/nocodb",
    summary_es: `NocoDB transforma cualquier base de datos en una hoja de cálculo inteligente al estilo de Airtable, pero completamente gratis y self-hosteable. Es la forma más rápida de darle una interfaz visual a tus datos.

### La propuesta de valor

Tienes una base de datos PostgreSQL o MySQL con información de tu negocio. Ahora tu equipo de ventas necesita ver y editar esos datos sin tocar SQL. En vez de construir un panel de administración desde cero (semanas de desarrollo), conectas NocoDB a tu base de datos existente y en 5 minutos tu equipo tiene una interfaz tipo Excel para trabajar con los datos.

### Funcionalidades principales

- **Múltiples vistas**: tabla, kanban, galería, formulario, calendario
- **Filtros y ordenación**: como Excel pero conectado a tu base de datos real
- **Campos avanzados**: relaciones entre tablas, fórmulas, lookups, rollups, attachments
- **Formularios**: genera formularios públicos para recoger datos directamente en tu base de datos
- **API REST automática**: cada tabla expone automáticamente un API REST y GraphQL
- **Webhooks**: dispara acciones cuando se crean, actualizan o eliminan registros
- **Roles y permisos**: controla quién puede ver y editar qué datos
- **Importación**: importa datos desde CSV, Excel, Airtable con un clic

### Comparativa con Airtable

| Característica | Airtable | NocoDB |
|---|---|---|
| Precio | 20$/usuario/mes | Gratis |
| Registros por base | 50.000 (plan pro) | Sin límite |
| Self-hosting | No | Sí |
| Conectar DB existente | No | Sí |
| API | Sí | Sí (automática) |

### Casos de uso reales

- **CRM ligero**: gestiona contactos y empresas sin software pesado
- **Gestión de inventario**: tabla con productos, stock, proveedores
- **Tracking de proyectos**: kanban para tareas del equipo
- **Formularios de feedback**: recoge opiniones de clientes directamente en tu DB
- **Panel de administración**: dashboards para equipos no técnicos

### Instalación

Una línea de Docker Compose y ya está corriendo. Se conecta a tu base de datos existente sin modificar nada, solo lee el schema y genera la interfaz.`
  },
  {
    source_id: "FlowiseAI/Flowise",
    summary_es: `Flowise te permite construir agentes de IA y flujos de procesamiento arrastrando y soltando bloques visuales, sin escribir código. Es como tener un Lego de inteligencia artificial donde cada pieza es un componente (modelo de lenguaje, base de datos vectorial, herramienta, memoria...) y tú decides cómo conectarlos.

### Para qué sirve en la práctica

Imagina que quieres un chatbot que responda preguntas sobre la documentación de tu empresa. Con Flowise:

1. Arrastras un nodo "Document Loader" y le das tus PDFs
2. Conectas un "Vector Store" para indexar el contenido
3. Añades un "Chat Model" (GPT-4, Claude, Llama...)
4. Pones un nodo "Conversational Chain" que une todo
5. Listo: tienes un chatbot RAG funcional con API lista

### Funcionalidades principales

- **Más de 100 integraciones**: modelos de lenguaje, vector stores, herramientas, memoria, loaders
- **Agentes autónomos**: crea agentes que pueden usar herramientas (buscar en web, ejecutar código, llamar APIs)
- **RAG completo**: todo el pipeline de Retrieval Augmented Generation en bloques visuales
- **API automática**: cada flujo tiene automáticamente un endpoint API que puedes llamar desde tu app
- **Chat embebible**: componente de chat que puedes incrustar en tu web con un script
- **Variables y secretos**: gestiona API keys y configuración de forma segura
- **Marketplace**: flujos prediseñados que puedes importar y personalizar

### Modelos compatibles

OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), Ollama (modelos locales), HuggingFace, Cohere, Replicate, Azure OpenAI y muchos más. Puedes cambiar el modelo sin rehacer el flujo.

### Comparativa

- **Langchain**: Flowise es básicamente Langchain visual. Si no quieres escribir código Python/JS, usa Flowise
- **Dify**: Dify es más completo como plataforma, Flowise es más flexible para prototipar
- **n8n**: n8n es para automatización general, Flowise está especializado en IA

### Instalación

\`npx flowise start\` y ya tienes la interfaz corriendo en tu navegador. También disponible como imagen Docker para producción.`
  },
  {
    source_id: "makeplane/plane",
    summary_es: `Plane es la alternativa open source a Jira y Linear que por fin hace que gestionar proyectos no sea un suplicio. Tiene todo lo que necesita un equipo de desarrollo con una interfaz moderna y rápida.

### El dolor que resuelve

Jira es el estándar de la industria, pero también es el software que más frustra a los desarrolladores: lento, confuso, con una interfaz que parece de 2005. Linear es la alternativa moderna pero cuesta 8$/usuario/mes y no es self-hosteable. Plane ofrece la experiencia de Linear con la libertad del open source.

### Funcionalidades completas

- **Issues y tareas**: crea, asigna, comenta y trackea tareas con estados personalizables
- **Tableros kanban**: arrastra tarjetas entre columnas como en Trello
- **Sprints y ciclos**: planifica el trabajo en iteraciones con velocidad y burndown charts
- **Roadmaps**: visualiza el plan a largo plazo con timelines
- **Backlog**: gestiona y prioriza el trabajo pendiente
- **Filtros avanzados**: filtra por asignado, prioridad, etiqueta, estado, fecha...
- **Vistas personalizadas**: guarda combinaciones de filtros como vistas reutilizables
- **Módulos**: agrupa issues relacionados en módulos o epics

### Integraciones

- **GitHub/GitLab**: vincula commits y PRs automáticamente con issues
- **Slack**: notificaciones y creación de issues desde Slack
- **Importación**: migra desde Jira, Asana, GitHub Issues
- **API**: API REST completa para integrar con tu stack
- **Webhooks**: automatiza flujos cuando cambian los issues

### Comparativa rápida

| | Jira | Linear | Plane |
|---|---|---|---|
| Precio | 7.75$/usuario | 8$/usuario | Gratis |
| Velocidad | Lento | Rápido | Rápido |
| Self-hosting | Solo Server (caro) | No | Sí |
| Curva de aprendizaje | Alta | Baja | Baja |

### Para quién es ideal

- **Startups**: gestión de proyectos profesional desde el día 1 sin gastar en licencias
- **Equipos de desarrollo**: sprints, backlog, y tracking sin la complejidad de Jira
- **Equipos remotos**: colaboración asíncrona con notificaciones inteligentes

### Instalación

Docker Compose o un clic en su cloud gestionado. La migración desde Jira es sorprendentemente sencilla gracias a su importador integrado.`
  },
  {
    source_id: "mudler/LocalAI",
    summary_es: `LocalAI es un motor de IA que te permite ejecutar cualquier modelo de lenguaje, visión, voz, imagen y vídeo en tu propio hardware. Lo más potente: expone una API 100% compatible con OpenAI, así que cualquier app que use GPT funciona automáticamente con LocalAI sin cambiar código.

### La propuesta clave

Tienes una aplicación que usa la API de OpenAI. Por privacidad, costes o latencia, quieres que esos modelos corran en tu infraestructura. Con LocalAI cambias una URL (\`api.openai.com\` → \`localhost:8080\`) y todo sigue funcionando igual, pero los datos nunca salen de tu servidor.

### Capacidades

No es solo texto. LocalAI soporta:

- **LLMs**: Llama, Mistral, Phi, DeepSeek, Qwen y cualquier modelo GGUF
- **Generación de imágenes**: Stable Diffusion, SDXL
- **Text-to-Speech**: genera audio con voz natural
- **Speech-to-Text**: transcripción de audio a texto (como Whisper)
- **Embeddings**: vectorización de texto para RAG y búsqueda semántica
- **Visión**: modelos multimodales que entienden imágenes
- **Function Calling**: compatible con el formato de herramientas de OpenAI

### Ventajas sobre la nube

- **Privacidad total**: tus datos no salen de tu servidor
- **Sin costes por token**: paga una vez por el hardware y úsalo ilimitadamente
- **Sin rate limits**: no hay límites de peticiones por minuto
- **Latencia baja**: si el servidor está cerca, la respuesta es instantánea
- **Funciona offline**: no necesitas internet

### ¿Necesito GPU?

No obligatoriamente. LocalAI funciona en CPU (usando GGUF/llama.cpp), aunque con GPU el rendimiento es mucho mejor. Para modelos pequeños (7B parámetros), una CPU moderna es suficiente. Para modelos grandes (70B+), necesitarás GPU.

### Comparativa con Ollama

Ollama es más fácil de instalar y gestionar modelos individuales. LocalAI es más completo (soporta imágenes, voz, embeddings) y su compatibilidad con la API de OpenAI es más amplia. Para un uso simple, Ollama; para reemplazar completamente OpenAI, LocalAI.`
  },
  {
    source_id: "upscayl/upscayl",
    summary_es: `Upscayl es la aplicación de escritorio que mejora la resolución de tus imágenes usando inteligencia artificial, y lo hace completamente gratis. Arrastra una foto de baja resolución y Upscayl la escala hasta 8x con una calidad que parece magia.

### Cómo funciona

Upscayl usa modelos de IA (ESRGAN y variantes) entrenados para "inventar" los detalles que faltan en una imagen de baja resolución. No es un simple reescalado que hace la imagen borrosa — la IA genera texturas, bordes y detalles creíbles basándose en lo que ha aprendido de millones de imágenes.

### Resultado práctico

- Una foto de 640x480 pixels → se convierte en 2560x1920 (4x) con detalles nítidos
- Fotos antiguas borrosas → recuperan nitidez y detalle
- Capturas de pantalla pequeñas → se vuelven legibles a tamaño completo
- Ilustraciones y arte → se escalan sin perder el estilo

### Modelos disponibles

- **General Photo (Ultrasharp)**: el mejor para fotos reales
- **General Photo (Remacri)**: bueno para fotos con ruido
- **Digital Art**: optimizado para ilustraciones, anime y arte digital
- **Ultrasharp**: máxima nitidez, ideal para texto en imágenes

### Por qué es mejor que las alternativas

- **Topaz Gigapixel AI**: 100$ de licencia. Upscayl es gratis.
- **Waifu2x**: solo funciona bien con anime. Upscayl funciona con todo.
- **Servicios online**: suben tu imagen a un servidor. Upscayl procesa todo en local.

### Requisitos

Funciona en Windows, Mac y Linux. Usa la GPU de tu ordenador para el procesamiento, así que una GPU dedicada ayuda (aunque también funciona con la integrada, más lento). No necesita internet.

### Casos de uso

- Rescatar fotos familiares antiguas de baja resolución
- Preparar imágenes para imprimir en grande
- Mejorar thumbnails y assets para web
- Escalar wallpapers a la resolución de tu monitor
- Mejorar imágenes de productos para e-commerce`
  },
  {
    source_id: "janhq/jan",
    summary_es: `Jan es un ChatGPT que funciona 100% offline en tu ordenador. Sin cuentas, sin internet, sin que nadie lea tus conversaciones. Es la forma más sencilla de tener un asistente de IA completamente privado.

### La experiencia de uso

Abres Jan, eliges un modelo de la lista (Llama 3, Mistral, Phi, DeepSeek...), haces clic en "Descargar" y en unos minutos tienes un chatbot corriendo en tu máquina. La interfaz es prácticamente idéntica a ChatGPT: escribes, la IA responde, puedes crear conversaciones, cambiar de modelo sobre la marcha.

### Funcionalidades

- **Chat privado**: todas las conversaciones se guardan en tu disco duro, nunca en la nube
- **Gestión de modelos**: descarga, elimina y cambia entre modelos con un clic
- **Múltiples modelos**: soporta GGUF, los de Hugging Face, y modelos convertidos
- **Historial persistente**: tus conversaciones se guardan entre sesiones
- **Temas personalizables**: modo oscuro, claro, y personalización de la interfaz
- **API local**: expone una API compatible con OpenAI para conectar otras apps
- **Extensiones**: sistema de plugins para añadir funcionalidades
- **RAG básico**: puedes adjuntar documentos y preguntar sobre ellos

### Para quién es perfecto

- **Profesionales con datos sensibles**: abogados, médicos, contables que no pueden enviar datos de clientes a servidores externos
- **Personas preocupadas por la privacidad**: si no quieres que OpenAI o Google lean tus conversaciones
- **Viajeros**: funciona sin internet, ideal para aviones o zonas sin cobertura
- **Experimentadores**: prueba diferentes modelos y compáralos fácilmente
- **Estudiantes**: asistente de estudio gratuito e ilimitado

### Requisitos mínimos

- **Modelos pequeños** (1-3B): 4GB RAM, cualquier CPU moderna
- **Modelos medianos** (7-13B): 8-16GB RAM, funciona en CPU pero mejor con GPU
- **Modelos grandes** (70B+): 32GB+ RAM, GPU recomendada

### Comparativa con ChatGPT

| | ChatGPT | Jan |
|---|---|---|
| Precio | 20$/mes (Plus) | Gratis |
| Privacidad | Tus datos en servidores de OpenAI | Todo en tu ordenador |
| Internet | Necesario | No necesario |
| Calidad | GPT-4 es top | Depende del modelo elegido |
| Velocidad | Rápido | Depende de tu hardware |

La calidad de GPT-4 sigue siendo superior a los modelos locales, pero para muchas tareas cotidianas (escribir emails, resumir textos, programar), modelos como Llama 3 70B dan resultados muy competitivos.`
  },
  {
    source_id: "CorentinTh/it-tools",
    summary_es: `IT Tools es una colección de más de 80 herramientas útiles para desarrolladores reunidas en una sola web con una interfaz impecable. Es el tipo de recurso que acabas usando cada día.

### Herramientas incluidas (selección)

**Codificación y decodificación:**
- Base64 encode/decode (texto e imágenes)
- URL encode/decode
- JWT decode y verificación
- HTML entities encode/decode

**Generadores:**
- UUID v4
- Contraseñas seguras
- Lorem ipsum
- Hashes (MD5, SHA-1, SHA-256, SHA-512)
- QR codes

**Conversores:**
- JSON ↔ YAML ↔ TOML ↔ CSV
- Unix timestamp ↔ fecha legible
- Colores (HEX, RGB, HSL)
- Números (binario, octal, hexadecimal)
- Unidades de medida

**Texto:**
- Comparador de textos (diff)
- Contador de palabras y caracteres
- Markdown preview
- Slugify / camelCase / snake_case

**Red y web:**
- Verificador de IPv4/IPv6
- User-Agent parser
- Información de dominio
- MIME types

### Por qué es mejor que buscar en Google

Cada vez que necesitas convertir algo o generar un hash, abres Google, buscas "base64 encoder online", esquivas 5 sitios llenos de anuncios, y finalmente encuentras uno que funciona. Con IT Tools abres una sola web y todo está ahí, limpio, rápido, sin anuncios.

### Self-hosting

Puedes montar tu propia instancia con Docker y tener todas las herramientas disponibles para tu equipo, incluso sin internet. Perfecto para entornos corporativos donde no quieres que los desarrolladores usen webs externas para manejar datos sensibles.

### Contribuciones

La comunidad contribuye activamente con nuevas herramientas. Si necesitas algo que no está, puedes proponerlo o desarrollarlo tú mismo. El código está bien estructurado y añadir una nueva herramienta es relativamente sencillo.`
  },
  {
    source_id: "umami-software/umami",
    summary_es: `Umami es la alternativa a Google Analytics que respeta la privacidad de tus visitantes. Sin cookies, sin rastreo invasivo, cumple GDPR de serie y te da las métricas que realmente importan en un dashboard limpio y rápido.

### El problema con Google Analytics

GA4 es complejo, lento, y recoge más datos de los que necesitas (lo cual te obliga a mostrar banners de cookies). Muchas webs solo necesitan saber: cuántas visitas tengo, de dónde vienen, y qué páginas ven. Para eso no necesitas un monstruo como GA4.

### Lo que ofrece Umami

- **Visitantes únicos y páginas vistas**: las métricas básicas, bien presentadas
- **Fuentes de tráfico**: de dónde llegan tus visitantes (Google, Twitter, directo...)
- **Páginas más vistas**: qué contenido funciona mejor
- **Dispositivos y navegadores**: desktop vs. móvil, Chrome vs. Safari
- **Países y ciudades**: de dónde son tus visitantes (sin tracking personal)
- **Eventos personalizados**: rastrea clics en botones, conversiones, etc.
- **Tiempo real**: ve quién está en tu web ahora mismo
- **Múltiples webs**: gestiona todas tus webs desde un solo dashboard
- **Informes**: filtra y segmenta datos por cualquier dimensión

### Sin cookies = sin banner de cookies

Umami no usa cookies. Punto. Esto significa que no necesitas mostrar el molesto banner de consentimiento de cookies. Tus visitantes ven tu web limpia, sin pop-ups, y tú sigues teniendo las métricas que necesitas. Cumple GDPR, CCPA y PECR de serie.

### El script pesa menos de 1KB

El script de tracking de Google Analytics pesa ~45KB. El de Umami pesa menos de 1KB. Tu web carga más rápido, tus Core Web Vitals mejoran, y Google te posiciona mejor. Es una mejora de rendimiento real y medible.

### Instalación

Docker Compose con PostgreSQL o MySQL. En 10 minutos tienes tu instancia corriendo. Añades un script de una línea a tu web y ya estás rastreando visitas. También ofrecen un servicio cloud de pago (9$/mes) si no quieres gestionar el hosting.`
  },
  {
    source_id: "khoj-ai/khoj",
    summary_es: `Khoj es tu segundo cerebro potenciado por inteligencia artificial. Conecta tus documentos, notas, emails y archivos, y luego pregúntale cualquier cosa en lenguaje natural. La IA busca en toda tu información personal y te responde con contexto preciso.

### El problema que resuelve

Tienes información repartida en docenas de sitios: notas en Obsidian, documentos en Google Drive, emails en Gmail, PDFs en carpetas del ordenador, marcadores en el navegador... Cuando necesitas encontrar algo específico, pierdes minutos (u horas) buscando. Khoj centraliza toda esa información y la hace consultable con IA.

### Cómo funciona

1. **Conectas tus fuentes**: Obsidian, archivos locales, Gmail, Google Drive, GitHub, páginas web
2. **Khoj indexa todo**: vectoriza y almacena tu información de forma eficiente
3. **Preguntas en lenguaje natural**: "¿Qué decía el contrato de X sobre las penalizaciones?"
4. **Obtiene respuestas con contexto**: la IA busca en toda tu información y responde citando las fuentes

### Funcionalidades avanzadas

- **Búsqueda en internet**: si no encuentra la respuesta en tus datos, puede buscar en la web
- **Agentes personalizados**: crea asistentes especializados (legal, finanzas, investigación)
- **Automatizaciones**: "avísame si sale una oferta de vuelo a Japón por menos de 400€"
- **Chat con imágenes**: puedes compartir imágenes y Khoj las analiza
- **Generación de contenido**: escribe borradores basándose en tus notas y estilo
- **App móvil**: consulta tu segundo cerebro desde el teléfono
- **API**: integra Khoj en tus propios flujos de trabajo

### Self-hosting vs. cloud

Puedes usar la versión cloud (gratuita con límites, de pago para uso completo) o self-hostear en tu servidor para máxima privacidad. Con self-hosting, tus datos nunca salen de tu infraestructura.

### Para quién es ideal

- **Investigadores**: busca entre cientos de papers y notas al instante
- **Profesionales**: encuentra ese email, ese documento, esa nota que necesitas
- **Escritores**: consulta tu material de referencia mientras escribes
- **Estudiantes**: un compañero de estudio que ha leído todo tu material

### Comparativa

Khoj es como Notion AI o Mem AI, pero open source y self-hosteable. La diferencia es que puedes conectar fuentes que esas herramientas no soportan y tus datos permanecen bajo tu control.`
  },
  {
    source_id: "plausible/analytics",
    summary_es: `Plausible es analítica web como debería ser: simple, ligera y respetuosa con la privacidad. Todo lo que necesitas saber sobre el tráfico de tu web cabe en una sola página, sin complicaciones ni datos que no vas a mirar.

### Filosofía

Plausible nace de una premisa: la mayoría de webs no necesitan Google Analytics. Necesitan saber cuántas visitas tienen, de dónde vienen, y qué páginas funcionan mejor. Para eso no hace falta un monstruo de analytics que rastrea hasta el movimiento del ratón. Plausible te da exactamente eso y nada más.

### Dashboard de una sola página

Todo está en una pantalla:
- **Visitantes únicos** del día, semana, mes, año
- **Páginas vistas** totales y por página
- **Tasa de rebote** y **duración de visita**
- **Top fuentes de tráfico**: Google, redes sociales, directo, referrals
- **Top páginas**: las más visitadas
- **Dispositivos**: desktop, móvil, tablet
- **Navegadores**: Chrome, Safari, Firefox...
- **Países**: de dónde vienen tus visitantes
- **Sistema operativo**: Windows, Mac, Linux, Android, iOS

### Sin cookies, sin banner

El script de Plausible **no usa cookies** y **no rastrea datos personales**. Esto significa:
- No necesitas mostrar banner de cookies
- Cumples GDPR, CCPA y PECR automáticamente
- No estás alimentando el perfil publicitario de Google con los datos de tus visitantes

### Rendimiento

El script de tracking pesa **menos de 1KB** (45x más ligero que Google Analytics). Esto mejora tus Core Web Vitals y puede impactar positivamente en tu posicionamiento SEO.

### Comparativa con Google Analytics

| | Google Analytics | Plausible |
|---|---|---|
| Precio | "Gratis" (pagas con datos) | 9$/mes o self-hosted gratis |
| Cookies | Sí | No |
| Banner GDPR | Obligatorio | No necesario |
| Peso del script | 45KB+ | <1KB |
| Complejidad | Alta (GA4) | Mínima |
| Datos a terceros | Google los usa | Solo tuyos |

### Self-hosting

Docker Compose con ClickHouse como backend. En 15 minutos tienes tu instancia propia con todas las funcionalidades y cero costes recurrentes. La comunidad tiene guías detalladas para desplegar en cualquier proveedor de hosting.`
  },
  {
    source_id: "chatwoot/chatwoot",
    summary_es: `Chatwoot es la alternativa open source a Intercom y Zendesk para atención al cliente. Centraliza todas tus conversaciones en una sola bandeja de entrada para tu equipo, con soporte para chat en vivo, email, WhatsApp, redes sociales y más.

### Por qué existe

Intercom cuesta entre 74-132$/mes por asiento. Zendesk empieza en 55$/agente/mes. Para una startup con 5 personas de soporte, esto son 300-660$/mes solo en herramienta de chat. Chatwoot ofrece las mismas funcionalidades de forma gratuita si lo self-hosteas.

### Canales soportados

- **Chat en vivo**: widget que incrustas en tu web
- **Email**: gestiona emails de soporte como tickets
- **WhatsApp Business**: responde WhatsApp desde el mismo panel
- **Facebook Messenger**: mensajes de tu página de Facebook
- **Instagram**: DMs de Instagram
- **Telegram**: soporte vía Telegram
- **Twitter**: DMs y menciones
- **SMS**: vía Twilio
- **API**: integra cualquier canal personalizado

### Funcionalidades para equipos

- **Bandeja compartida**: todo tu equipo ve y responde conversaciones
- **Asignación automática**: distribuye conversaciones entre agentes por round-robin o carga
- **Respuestas predefinidas**: macros y templates para respuestas frecuentes
- **Chatbots**: crea bots de respuesta automática con lógica de flujos
- **SLA**: alertas cuando un cliente lleva demasiado tiempo sin respuesta
- **Base de conocimiento**: centro de ayuda para que los clientes se auto-atiendan
- **Informes**: métricas de rendimiento del equipo (tiempos de respuesta, satisfacción)
- **Notas internas**: comenta internamente sobre un cliente sin que él lo vea
- **Etiquetas y segmentación**: organiza conversaciones por tema, producto o urgencia

### Experiencia para el usuario final

El widget de chat se integra en tu web con un script. El visitante escribe su pregunta, ve cuándo el agente está escribiendo, puede adjuntar archivos, y recibe la respuesta por email si abandona la web antes de que le contesten.

### Instalación

Docker Compose o el instalador de un clic que proporcionan. Para un uso básico, un servidor pequeño (2GB RAM) es suficiente. También tienen una versión cloud de pago para quien prefiera no gestionar infraestructura.`
  },
  {
    source_id: "ToolJet/ToolJet",
    summary_es: `ToolJet te permite construir herramientas internas y dashboards para tu empresa arrastrando y soltando componentes, sin código. Conecta bases de datos, APIs y servicios, y en minutos tienes un panel de administración listo para usar.

### El problema que resuelve

Toda empresa necesita herramientas internas: un panel para ver pedidos, un dashboard de métricas, un formulario para que el equipo de ventas registre leads, una interfaz para que soporte busque clientes. Construir esto desde cero lleva semanas de desarrollo. Con ToolJet lo haces en horas.

### Cómo funciona

1. **Conecta tus datos**: PostgreSQL, MySQL, MongoDB, REST APIs, Google Sheets, Stripe, Slack, y docenas más
2. **Arrastra componentes**: tablas, formularios, gráficos, botones, calendarios, mapas...
3. **Define la lógica**: queries SQL, transformaciones de datos, condiciones
4. **Publica**: comparte la app con tu equipo con permisos por rol

### Componentes disponibles

- **Tablas**: con ordenación, filtros, paginación, edición inline
- **Formularios**: campos de texto, selects, date pickers, file uploads
- **Gráficos**: líneas, barras, pie, área, scatter
- **Botones y acciones**: ejecuta queries, abre modales, redirige
- **Contenedores y layouts**: tabs, modales, drawers, steps
- **Mapas**: visualización geoespacial
- **Código personalizado**: JavaScript para lógica compleja

### Casos de uso reales

- **Panel de pedidos**: tabla con los pedidos del día, filtros por estado, botón para actualizar
- **Dashboard de métricas**: gráficos de ingresos, usuarios, conversiones conectados a tu DB
- **CRM interno**: formulario de registro de leads + tabla de seguimiento
- **Gestión de inventario**: stock actual, alertas de bajo stock, formulario de entrada/salida
- **Herramienta de soporte**: buscar cliente por email, ver su historial, ejecutar acciones

### Comparativa con Retool

Retool es la alternativa de pago más conocida (10$/usuario/mes). ToolJet es gratuito para self-hosting y sus funcionalidades cubren el 90% de lo que ofrece Retool. La interfaz es igualmente intuitiva y la comunidad es muy activa.`
  },
  {
    source_id: "sxyazi/yazi",
    summary_es: `Yazi es un gestor de archivos de terminal ultrarrápido escrito en Rust que hace que navegar por archivos en la consola sea un placer visual. Si pasas mucho tiempo en el terminal, Yazi va a cambiar cómo trabajas con archivos.

### Qué lo hace especial

Los gestores de archivos de terminal no son nuevos (Midnight Commander, Ranger, lf...), pero Yazi está en otra liga:

- **Velocidad absurda**: abre directorios con miles de archivos al instante, sin lag
- **Previsualización de TODO**: imágenes, vídeos, PDFs, código con syntax highlighting, archivos comprimidos
- **Renderizado de imágenes real**: muestra imágenes directamente en el terminal (con terminales compatibles como Kitty, iTerm2, WezTerm)
- **Async nativo**: toda la I/O es asíncrona, la interfaz nunca se bloquea

### Funcionalidades

- **Navegación con teclado**: hjkl (vim-like) para moverse, Tab para seleccionar
- **Búsqueda instantánea**: fuzzy finding integrado para saltar a cualquier archivo
- **Operaciones masivas**: seleccionar múltiples archivos, copiar, mover, renombrar en lote
- **Pestañas**: múltiples directorios abiertos simultáneamente
- **Marcadores**: guarda ubicaciones frecuentes para acceso rápido
- **Papelera**: eliminar va a la papelera, no borra directamente (configurable)
- **Temas**: personaliza colores, iconos y layout
- **Plugins**: sistema de extensiones en Lua para añadir funcionalidades

### Previsualización de archivos

Esta es la killer feature. Sin salir del terminal puedes ver:
- **Imágenes**: JPG, PNG, GIF, WebP (se renderizan en el propio terminal)
- **Vídeos**: muestra el primer frame como miniatura
- **PDFs**: previsualiza páginas de documentos PDF
- **Código**: syntax highlighting para cientos de lenguajes
- **Markdown**: renderizado con formato
- **Archivos comprimidos**: ve el contenido de ZIP, TAR, 7z sin extraer

### Rendimiento vs alternativas

| | Ranger (Python) | lf (Go) | Yazi (Rust) |
|---|---|---|---|
| Apertura de dir grande | Lento | Rápido | Instantáneo |
| Previsualización | Básica | Básica | Completa |
| Consumo de memoria | Alto | Bajo | Muy bajo |
| Async | No | Parcial | Completo |

### Instalación

Disponible en Homebrew, Cargo, AUR, Nix y más: \`brew install yazi\` o \`cargo install yazi-fm\`.`
  },
  {
    source_id: "Lissy93/dashy",
    summary_es: `Dashy es el dashboard personal definitivo para organizar todos tus servicios, enlaces y herramientas en un solo lugar. Es la página de inicio perfecta para tu servidor casero o tu workflow diario.

### Para qué sirve

Si tienes varios servicios corriendo (Plex, Home Assistant, Pi-hole, NAS, monitorización...) o simplemente quieres una página de inicio organizada con tus apps y webs favoritas, Dashy centraliza todo en un dashboard visual y personalizable.

### Funcionalidades

- **Secciones organizables**: agrupa enlaces por categorías que tú defines
- **Status checks**: muestra en tiempo real si tus servicios están online (verde) o caídos (rojo)
- **Widgets integrados**: reloj, tiempo atmosférico, uso de CPU/RAM, ping, calendario, RSS
- **Más de 50 temas**: desde minimalista hasta cyberpunk, elige el que más te guste
- **Iconos automáticos**: detecta automáticamente el favicon de cada servicio
- **Búsqueda rápida**: busca entre todos tus enlaces al instante
- **Multi-usuario**: diferentes dashboards para diferentes personas
- **Autenticación**: protege tu dashboard con login
- **Editor visual**: configura todo desde la interfaz, sin tocar archivos
- **Configurable con YAML**: para los que prefieren editar un archivo de configuración

### Personalización

Lo que hace especial a Dashy es el nivel de personalización. Puedes:
- Cambiar el layout (grid, lista, sidebar)
- Ajustar tamaños, colores, fondos
- Añadir CSS personalizado
- Usar iconos de Font Awesome, Material Design o cualquier imagen
- Crear secciones colapsables

### Casos de uso

- **Homelab**: dashboard central para tu servidor casero con todos tus servicios
- **Equipo de trabajo**: página de inicio compartida con herramientas internas
- **Personal**: tu portal de inicio personalizado en el navegador
- **Monitorización ligera**: vista rápida del estado de tus servicios sin entrar en Grafana

### Instalación

\`docker run -p 4000:8080 lissy93/dashy\` y ya tienes el dashboard corriendo. La configuración se hace editando un archivo YAML o desde el editor visual integrado.`
  },
  {
    source_id: "novuhq/novu",
    summary_es: `Novu es la infraestructura de notificaciones open source que unifica email, SMS, push, in-app y chat en una sola API. En vez de implementar cada canal por separado, defines tus notificaciones una vez y Novu se encarga del resto.

### El problema

Cada vez que construyes una aplicación, necesitas enviar notificaciones: emails de bienvenida, confirmaciones de pedido, alertas de seguridad, recordatorios... Normalmente acabas con:
- SendGrid para emails
- Twilio para SMS
- Firebase para push
- Código personalizado para in-app

Cuatro integraciones, cuatro APIs diferentes, cuatro puntos de fallo. Novu unifica todo.

### Cómo funciona

1. **Define un workflow**: "Cuando un usuario se registra, envía email de bienvenida. Si no lo abre en 24h, envía push notification"
2. **Conecta proveedores**: SendGrid, Twilio, Firebase, o cualquiera de los 60+ proveedores soportados
3. **Configura plantillas**: diseña tus notificaciones con un editor visual
4. **Dispara desde tu código**: una llamada a la API de Novu y él gestiona todo

### Funcionalidades clave

- **Multi-canal**: email, SMS, push, in-app, chat (Slack, Discord, Teams)
- **Routing inteligente**: si el email no se abre, escala a push; si no hay push, envía SMS
- **Preferencias de usuario**: los usuarios eligen cómo quieren ser notificados
- **Componente Inbox**: bandeja de notificaciones in-app lista para incrustar en tu frontend
- **Digest**: agrupa notificaciones para no saturar al usuario
- **Delay**: programa notificaciones con retraso
- **Editor de plantillas**: diseña emails y mensajes visualmente
- **Analytics**: métricas de entrega, apertura y clics por canal

### Inbox embebible

Novu incluye un componente React (y otros frameworks) que puedes incrustar en tu aplicación para mostrar una bandeja de notificaciones in-app. Se instala con pocas líneas de código y se adapta al estilo de tu app.

### Para quién es útil

- **Startups**: implementa notificaciones profesionales desde el día 1
- **SaaS**: gestiona notificaciones complejas multi-canal
- **E-commerce**: confirmaciones, envíos, promociones, todo desde un sitio
- **Cualquier app**: si envías notificaciones, Novu te ahorra tiempo y código`
  },
  {
    source_id: "PaddlePaddle/PaddleOCR",
    summary_es: `PaddleOCR es el motor de reconocimiento óptico de caracteres (OCR) más potente del open source. Extrae texto de cualquier imagen, PDF, captura de pantalla o foto con una precisión impresionante, soportando más de 80 idiomas incluido español.

### Qué puede reconocer

- **Documentos escaneados**: facturas, contratos, informes
- **Fotos de texto**: carteles, etiquetas, menús de restaurantes, tarjetas de visita
- **Capturas de pantalla**: texto en imágenes de aplicaciones
- **Matrículas de coches**: lectura de placas en imágenes
- **Texto manuscrito**: reconocimiento de escritura a mano (con menor precisión)
- **Tablas**: extrae datos de tablas manteniendo la estructura
- **Documentos con layout complejo**: detecta títulos, párrafos, columnas, pies de página

### Pipeline completo

PaddleOCR no es solo un OCR. Es un pipeline completo:

1. **Detección de texto**: localiza dónde hay texto en la imagen (funciona con texto inclinado, curvo, vertical)
2. **Reconocimiento**: lee el texto detectado con alta precisión
3. **Análisis de layout**: entiende la estructura del documento (título, texto, tabla, imagen)
4. **Extracción de tablas**: convierte tablas en imágenes a Excel/CSV
5. **Key Information Extraction**: extrae campos específicos (nombre, fecha, total de una factura)

### Idiomas soportados

Más de 80 idiomas, incluyendo: español, inglés, francés, alemán, portugués, italiano, chino, japonés, coreano, árabe, hindi, y muchos más. Para cada idioma hay modelos optimizados.

### Rendimiento

Los benchmarks lo sitúan consistentemente entre los mejores OCR del mundo, a la par o por encima de Google Cloud Vision y AWS Textract, pero completamente gratis y ejecutable en local.

### Casos de uso empresariales

- **Digitalización de archivos**: convertir documentos en papel a texto buscable
- **Automatización de facturas**: extraer automáticamente proveedor, fecha, importe, conceptos
- **Validación de documentos**: leer DNIs, pasaportes, permisos de conducir
- **Accesibilidad**: convertir imágenes con texto en texto legible por lectores de pantalla
- **Indexación**: hacer buscable una biblioteca de PDFs escaneados

### Instalación

\`pip install paddleocr paddlepaddle\` y en 3 líneas de Python estás extrayendo texto de cualquier imagen. También tiene API REST, interfaz web, y SDKs para múltiples lenguajes.`
  },
  {
    source_id: "karakeep-app/karakeep",
    summary_es: `Karakeep es un gestor de marcadores inteligente que guarda y organiza automáticamente todo lo que encuentras en internet usando inteligencia artificial. Es como tener un Pinterest personal potenciado con IA.

### El problema de los marcadores

Todos guardamos marcadores y luego nunca los encontramos. Tienes cientos de enlaces en carpetas que no recuerdas haber creado, en favoritos del navegador, en notas, en chats... Karakeep soluciona esto con un sistema centralizado que organiza automáticamente.

### Cómo funciona

1. **Guardas algo**: desde la extensión del navegador, la app móvil, o compartiendo un enlace
2. **La IA analiza el contenido**: lee la página, extrae el contenido principal, genera una miniatura
3. **Etiquetado automático**: la IA asigna etiquetas relevantes (tecnología, diseño, cocina, viajes...)
4. **Búsqueda inteligente**: busca no solo en los títulos, sino en el contenido completo de las páginas guardadas

### Funcionalidades

- **Captura completa**: guarda no solo el enlace, sino una copia completa de la página
- **Búsqueda full-text**: encuentra páginas por cualquier texto que contengan
- **IA para etiquetado**: no tienes que organizar nada manualmente
- **Listas y colecciones**: agrupa marcadores manualmente cuando quieras
- **Notas adjuntas**: añade tus propias notas a cada marcador
- **Vista de galería**: navega visualmente por tus marcadores con miniaturas
- **Highlights**: resalta texto dentro de las páginas guardadas
- **Compartir**: comparte colecciones públicas con otros
- **API**: integra con otras herramientas

### Disponibilidad

- Extensión para Chrome, Firefox, Safari
- App móvil (iOS, Android)
- Interfaz web completa
- Self-hosting con Docker

### Para quién es

- **Investigadores**: guarda y organiza fuentes de información sin esfuerzo
- **Diseñadores**: colecciona inspiración visual organizada automáticamente
- **Desarrolladores**: guarda tutoriales, documentación y snippets
- **Content creators**: banco de ideas y referencias accesible desde cualquier dispositivo
- **Cualquiera**: si alguna vez has pensado "esto lo guardo para luego" y luego no lo encuentras`
  },
  {
    source_id: "Lissy93/dashy",
    summary_es: `Dashy es el dashboard personal definitivo para organizar todos tus servicios, enlaces y herramientas en un solo lugar. Es la página de inicio perfecta para tu servidor casero o tu workflow diario.

### Para qué sirve

Si tienes varios servicios corriendo (Plex, Home Assistant, Pi-hole, NAS, monitorización...) o simplemente quieres una página de inicio organizada con tus apps y webs favoritas, Dashy centraliza todo en un dashboard visual y personalizable.

### Funcionalidades

- **Secciones organizables**: agrupa enlaces por categorías que tú defines
- **Status checks**: muestra en tiempo real si tus servicios están online o caídos
- **Widgets integrados**: reloj, tiempo atmosférico, uso de CPU/RAM, ping, calendario, RSS
- **Más de 50 temas**: desde minimalista hasta cyberpunk
- **Iconos automáticos**: detecta automáticamente el favicon de cada servicio
- **Búsqueda rápida**: busca entre todos tus enlaces al instante
- **Editor visual**: configura todo desde la interfaz, sin tocar archivos
- **Configurable con YAML**: para quien prefiera editar archivos

### Instalación

\`docker run -p 4000:8080 lissy93/dashy\` — una línea y ya tienes el dashboard corriendo.`
  },
];

async function main() {
  console.log("Actualizando contenido extendido para 30 proyectos...\n");

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

  console.log("\n✅ Contenido actualizado");
  await sql.end();
}

main();

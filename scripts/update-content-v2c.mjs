import postgres from "postgres";

const sql = postgres("postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar");

const updates = [
  {
    source_id: "CorentinTh/it-tools",
    summary_es: `IT Tools es una colección de más de 80 herramientas online para desarrolladores reunidas en una sola web con una interfaz impecable. Necesitas codificar en Base64, generar un UUID, convertir JSON a YAML, calcular un hash SHA-256, formatear SQL, comparar dos textos, o validar un JWT? Todo está ahí, a un clic, sin anuncios, sin registro, y con una experiencia de usuario cuidada al milímetro.

Es el tipo de web que acabas fijando como pestaña permanente en tu navegador.

## Por qué es mejor que buscar en Google

Cada vez que necesitas una utilidad de este tipo, haces lo mismo: abres Google, buscas "base64 encode online", te salen 10 resultados, la mitad están llenos de anuncios, la otra mitad tienen interfaces horribles, y al final pierdes 2 minutos en algo que debería llevar 5 segundos.

Con IT Tools abres **una sola web** y todo está organizado, limpio, rápido. Sin anuncios, sin pop-ups, sin captchas, sin "regístrate para usar esta función". Buscas la herramienta, la usas, sigues con tu vida.

## Las herramientas más útiles (selección)

### Codificación y decodificación
- **Base64**: codifica y decodifica texto e imágenes
- **URL encoding**: codifica y decodifica URLs
- **HTML entities**: convierte caracteres especiales
- **JWT decoder**: decodifica tokens JWT y muestra header, payload y firma con formato
- **Unicode/ASCII**: conversiones entre formatos de texto

### Generadores
- **UUID v4/v1**: genera identificadores únicos
- **Contraseñas**: generador con control de longitud, caracteres especiales, etc.
- **Lorem Ipsum**: texto de relleno con control de párrafos
- **Hashes**: MD5, SHA-1, SHA-256, SHA-512, bcrypt
- **QR Code**: genera códigos QR desde texto o URLs
- **TOTP**: generador de códigos de autenticación de dos factores

### Conversores
- **JSON ↔ YAML ↔ TOML ↔ CSV**: conversión entre formatos de datos
- **Timestamp ↔ fecha**: convierte Unix timestamps a fechas legibles y viceversa
- **Colores**: entre HEX, RGB, HSL con preview visual
- **Números**: binario, octal, decimal, hexadecimal
- **Unidades**: bytes, temperatura, velocidad, presión...
- **Cronexpression**: traduce expresiones cron a lenguaje humano ("cada lunes a las 9:00")

### Texto
- **Diff**: compara dos textos y muestra las diferencias resaltadas
- **Contador de palabras**: palabras, caracteres, líneas, tiempo de lectura
- **Regex tester**: prueba expresiones regulares con texto de ejemplo
- **Case converter**: camelCase, snake_case, kebab-case, PascalCase, UPPER_CASE
- **Slugify**: convierte texto a formato slug para URLs
- **Markdown preview**: renderiza Markdown en tiempo real

### Red y web
- **IPv4/IPv6 calculator**: información de subredes, rango de IPs, wildcard
- **User-Agent parser**: descompone un User-Agent en sus partes
- **HTTP status codes**: referencia rápida de todos los códigos HTTP
- **MIME types**: búsqueda de tipos MIME por extensión
- **URL parser**: descompone una URL en protocolo, host, path, params...

### Seguridad y criptografía
- **RSA key generator**: genera pares de claves RSA
- **Hash calculator**: calcula hashes de archivos
- **HMAC generator**: genera códigos de autenticación de mensajes
- **Certificate parser**: analiza certificados SSL

## Self-hosting para tu equipo

Si trabajas en una empresa donde los datos no pueden ir a webs externas (y no deberían — imagina pegar un JWT de producción en una web random), puedes montar tu propia instancia:

\`\`\`bash
docker run -d -p 8080:80 corentinth/it-tools:latest
\`\`\`

Una línea de Docker y tienes IT Tools corriendo en tu red interna. Todos los desarrolladores del equipo la usan sin enviar datos a terceros.

## Contribuir es fácil

IT Tools es open source y la comunidad contribuye activamente. Si echas en falta una herramienta, puedes crearla. El proyecto está bien estructurado con Vue.js y añadir una nueva utilidad es relativamente sencillo. Cada herramienta es un componente independiente con su propia lógica.

## Mi opinión

Es de esas herramientas que no sabes que necesitas hasta que la descubres. Después, no puedes vivir sin ella. La calidad del diseño y la UX es excepcional para un proyecto open source — cada herramienta está pensada, cada interacción es fluida, cada resultado es claro. El desarrollador (Corentin Thomasset) ha hecho un trabajo increíble. 37.000 estrellas en GitHub bien merecidas.`
  },
  {
    source_id: "ToolJet/ToolJet",
    summary_es: `ToolJet resuelve un problema que tiene toda empresa: necesitas herramientas internas (paneles de administración, dashboards de métricas, formularios para el equipo) y construirlas desde cero lleva semanas de desarrollo. Con ToolJet, las montas en horas arrastrando y soltando componentes, sin código.

## El escenario típico

Tu equipo de operaciones necesita una herramienta para ver los pedidos del día, filtrar por estado, y poder marcarlos como enviados. Tu equipo de marketing necesita un dashboard con las métricas de conversión conectado a la base de datos. Tu equipo de soporte necesita un buscador de clientes que muestre su historial de compras.

Sin ToolJet, cada una de estas herramientas es un proyecto de desarrollo: frontend, backend, autenticación, deploy, mantenimiento. Semanas de trabajo.

Con ToolJet, conectas tu base de datos, arrastras una tabla, un par de filtros y un botón, y en una tarde tienes la herramienta funcionando. Sin tocar React, sin configurar APIs, sin deploy.

## Cómo funciona en la práctica

### 1. Conectas tus datos
ToolJet se conecta a prácticamente cualquier fuente de datos:

**Bases de datos:** PostgreSQL, MySQL, MongoDB, MariaDB, ClickHouse, DynamoDB, Firestore, CockroachDB, Elasticsearch...

**APIs:** REST API, GraphQL, cualquier endpoint HTTP

**SaaS:** Google Sheets, Airtable, Stripe, Slack, Twilio, SendGrid, Notion, HubSpot, Salesforce...

**Almacenamiento:** S3, Google Cloud Storage, MinIO

### 2. Escribes las queries
Para bases de datos, escribes SQL directamente:
\`\`\`sql
SELECT * FROM orders
WHERE status = {{components.statusFilter.value}}
AND created_at > {{components.dateRange.startDate}}
ORDER BY created_at DESC
\`\`\`

Las \`{{}}\` son referencias a componentes de la interfaz — el valor del filtro, la fecha seleccionada, etc. Todo es dinámico.

### 3. Arrastras componentes UI
La biblioteca de componentes es amplia:

- **Tabla**: con ordenación, filtros, paginación, edición inline, exportación a CSV
- **Formulario**: campos de texto, selects, date pickers, file uploads, switches, sliders
- **Gráficos**: líneas, barras, pie, área, scatter, funnel (basados en Chart.js y Plotly)
- **Botones**: con acciones vinculadas (ejecutar query, abrir modal, navegar)
- **Contenedores**: tabs, modales, drawers, accordions, steps
- **Mapas**: visualización geoespacial con Mapbox
- **Texto enriquecido**: editor WYSIWYG integrable
- **Calendario**: vista de eventos con drag & drop
- **Kanban**: tablero de arrastrar y soltar
- **QR/Barcode scanner**: para apps de inventario móviles
- **PDF viewer**: visualizar documentos embebidos

### 4. Defines la lógica
Los componentes se conectan entre sí:
- El filtro de estado cambia → la tabla se refresca con la query filtrada
- Click en "Aprobar pedido" → ejecuta UPDATE en la DB → muestra notificación → refresca tabla
- Seleccionar una fila → abre un modal con los detalles → permite editar campos

Para lógica compleja, puedes escribir JavaScript en "event handlers" y "queries de transformación".

## Casos de uso que he visto

### Panel de pedidos para e-commerce
Una tabla con todos los pedidos, filtros por estado y fecha, botón para cambiar estado, vista de detalle con productos y dirección. El equipo de logística deja de depender de "que un dev les saque los datos".

### Dashboard de métricas de marketing
Gráficos de conversión, coste por adquisición, ROI por canal, comparativa con el mes anterior. Conectado directamente a PostgreSQL y Google Sheets. El CMO deja de pedir informes semanales.

### Herramienta de soporte al cliente
Buscador de clientes por email o teléfono. Vista de historial de compras, tickets anteriores, y datos de facturación. El equipo de soporte resuelve incidencias más rápido.

### Control de inventario
Tabla de productos con stock actual. Alertas visuales cuando el stock baja de un umbral. Formulario para registrar entradas y salidas. Gráfico de evolución de stock.

## ToolJet vs Retool

Retool es la referencia del mercado (10$/usuario/mes). ToolJet es la alternativa open source:

| | Retool | ToolJet |
|---|---|---|
| Precio | 10$/usuario/mes | Gratis (self-hosted) |
| Self-hosting | Solo plan Enterprise | Sí, Docker |
| Componentes | ~90 | ~50 (creciendo) |
| AI features | Sí | En desarrollo |
| Mobile builder | Sí | Sí |
| Comunidad | Empresarial | Open source activa |

Para la mayoría de herramientas internas, ToolJet cubre el 90% de lo que necesitas. Donde Retool gana es en integraciones enterprise (SSO avanzado, audit logs, permissions granulares) y en la cantidad de componentes.

## Instalación

\`\`\`bash
git clone https://github.com/ToolJet/ToolJet.git
cd ToolJet
docker compose up -d
\`\`\`

En 5 minutos tienes la interfaz corriendo y puedes empezar a construir tu primera herramienta interna.`
  },
  {
    source_id: "umami-software/umami",
    summary_es: `Umami es la respuesta a una pregunta que cada vez más gente se hace: "¿De verdad necesito Google Analytics?". Para la mayoría de webs, la respuesta es no. No necesitas 500 informes que nunca miras, no necesitas rastrear a tus visitantes con cookies, y no necesitas un script de 45KB que ralentiza tu web. Necesitas saber cuántas visitas tienes, de dónde vienen, y qué páginas funcionan mejor. Umami te da exactamente eso.

## El dashboard de una sola pantalla

Abres Umami y ves todo de un vistazo:

- **Visitantes únicos**: cuántas personas diferentes han visitado tu web
- **Páginas vistas**: total de páginas cargadas
- **Tasa de rebote**: porcentaje de personas que se van sin interactuar
- **Duración media**: cuánto tiempo pasan en tu web
- **Top páginas**: qué contenido funciona mejor
- **Top fuentes de tráfico**: de dónde llegan (Google, Twitter, directo, newsletters...)
- **Dispositivos**: desktop vs móvil vs tablet
- **Navegadores**: Chrome, Safari, Firefox...
- **Países y ciudades**: de dónde son tus visitantes geográficamente
- **Sistemas operativos**: Windows, Mac, iOS, Android, Linux

Todo en una pantalla. Sin hacer clic en 5 submenús para encontrar un dato. Sin tutoriales de YouTube para aprender a usarlo.

## Sin cookies = sin banner

Esta es la killer feature para muchos. Umami **no usa cookies**. No las necesita. Identifica visitantes únicos mediante un hash de la IP + User-Agent que se calcula al vuelo y no se almacena.

Consecuencias prácticas:
- **No necesitas el molesto banner de "aceptar cookies"**: tu web se ve limpia, profesional
- **Cumples GDPR, CCPA y PECR automáticamente**: sin consultores legales, sin configuración
- **Mejor experiencia de usuario**: nadie tiene que hacer clic en "aceptar" antes de ver tu contenido
- **Google no recibe datos de tus visitantes**: con GA, estás regalando información de tu audiencia al mayor vendedor de publicidad del mundo

## El script pesa menos de 1KB

No es un detalle menor. Google Analytics carga un script de **~45KB** que además descarga más recursos. Umami carga un script de **menos de 1KB**. La diferencia en rendimiento es medible:

- Tu web carga más rápido
- Mejor puntuación en Lighthouse y PageSpeed Insights
- Mejores Core Web Vitals
- Potencialmente mejor posicionamiento SEO (Google mide la velocidad de carga)

Para una web que compite por cada milisegundo de LCP (Largest Contentful Paint), eliminar 45KB de JavaScript no deseado puede ser la diferencia entre un 90 y un 100 en PageSpeed.

## Eventos personalizados

Umami no solo trackea páginas vistas. Puedes rastrear acciones específicas:

\`\`\`javascript
// Cuando alguien hace clic en "Comprar"
umami.track('click-comprar', { producto: 'Plan Pro', precio: 29 });

// Cuando alguien se suscribe a la newsletter
umami.track('newsletter-signup', { fuente: 'homepage' });

// Cuando alguien completa un formulario
umami.track('form-complete', { tipo: 'contacto' });
\`\`\`

Luego puedes filtrar y analizar estos eventos en el dashboard. ¿Cuánta gente hace clic en "Comprar" desde la homepage vs desde la página de precios? ¿Qué fuente de tráfico genera más suscripciones a la newsletter?

## Múltiples webs en un solo panel

Si tienes varias webs (blog personal, web de la empresa, side project), las gestionas todas desde la misma instalación de Umami. Cada web tiene su propio dashboard y puedes cambiar entre ellas con un clic.

## Self-hosting: tus datos son tuyos

\`\`\`bash
git clone https://github.com/umami-software/umami.git
cd umami
docker compose up -d
\`\`\`

Umami se despliega con Docker + PostgreSQL (o MySQL). En 10 minutos tienes tu instancia corriendo. Añades un snippet de una línea al \`<head>\` de tu web:

\`\`\`html
<script defer src="https://tu-umami.com/script.js" data-website-id="xxx"></script>
\`\`\`

Y ya estás rastreando visitas. Sin crear cuenta en Google, sin aceptar términos de servicio, sin que nadie más tenga acceso a los datos de tus visitantes.

## ¿Cuándo NO usar Umami?

Si necesitas analytics avanzado de verdad — embudos de conversión complejos, segmentación de audiencia detallada, integración con plataformas de publicidad, attribution modeling — Umami se queda corto. Para eso necesitas GA4 o una herramienta enterprise como Mixpanel o Amplitude.

Pero seamos honestos: el 90% de las webs no necesitan nada de eso. Necesitan saber cuántas visitas tienen y de dónde vienen. Para eso, Umami es perfecto y superior a GA en experiencia de uso, privacidad y rendimiento.`
  },
  {
    source_id: "sxyazi/yazi",
    summary_es: `Si pasas mucho tiempo en el terminal — y si estás leyendo esto, probablemente sí — Yazi va a cambiar cómo trabajas con archivos. Es un gestor de archivos de terminal escrito en Rust que es tan rápido que parece que los directorios se abren antes de que hagas clic. Literalmente. La primera vez que lo usas, te preguntas por qué todos los file managers no funcionan así.

## Qué hace diferente a Yazi

### Velocidad absurda
Yazi abre un directorio con 10.000 archivos al instante. Sin lag, sin spinner, sin "cargando...". Esto parece un detalle menor hasta que vienes de usar Ranger (Python) que tarda 2-3 segundos en directorios grandes, o Finder de Mac que a veces decide pensar durante 5 segundos antes de mostrarte los archivos.

El secreto es Rust + async I/O. Todo el sistema de archivos se lee de forma asíncrona, la interfaz se renderiza independientemente de la I/O, y las previsualizaciones se generan en segundo plano sin bloquear la navegación.

### Previsualización de TODO
Esta es la killer feature. Sin salir del terminal puedes ver:

- **Imágenes**: JPG, PNG, GIF, WebP renderizados directamente en el terminal (con terminales modernos como Kitty, iTerm2, WezTerm, Ghostty)
- **Vídeos**: muestra el primer frame como miniatura
- **PDFs**: renderiza las páginas del documento
- **Código**: syntax highlighting automático para cientos de lenguajes
- **Markdown**: renderizado con formato
- **Archivos comprimidos**: ve el contenido de ZIP, TAR, 7z sin descomprimir
- **Directorios**: muestra una preview del contenido de subdirectorios
- **Audio**: muestra metadatos y duración

La previsualización se actualiza en tiempo real mientras navegas con las flechas. Mueves el cursor arriba/abajo y la preview cambia al instante.

## Navegación y operaciones

### Movimiento
Yazi usa atajos tipo Vim por defecto: \`h\` (ir al directorio padre), \`j/k\` (arriba/abajo), \`l\` (entrar en directorio/abrir archivo). Si vienes de Vim, te sientes como en casa. Si no, hay modos configurables.

### Selección y operaciones masivas
- \`Space\`: seleccionar/deseleccionar archivo
- \`V\`: modo de selección visual (como en Vim)
- \`y\`: copiar selección
- \`d\`: cortar selección (mover)
- \`p\`: pegar
- \`D\`: eliminar (a la papelera por defecto)
- \`r\`: renombrar
- \`a\`: crear archivo o directorio
- \`~\`: ir al home directory
- \`z\`: saltar a un directorio frecuente (zoxide integration)

### Búsqueda
- \`/\`: buscar archivos en el directorio actual
- \`f\`: filtrar archivos por nombre
- \`s\`: fuzzy search con fzf integrado — escribe parcialmente y encuentra al instante

### Pestañas
Puedes abrir múltiples pestañas (\`t\` para nueva, \`1-9\` para cambiar) y tener varios directorios abiertos simultáneamente. Como las pestañas de tu navegador, pero para el filesystem.

### Marcadores
Guarda ubicaciones frecuentes con \`m\` + letra. \`'d\` te lleva a ~/Documents, \`'p\` a ~/Projects, etc. Navegación instantánea.

## Sistema de plugins

Yazi tiene un sistema de extensiones en Lua que permite añadir funcionalidades:

- **Previsualización de formatos adicionales**: EPUB, office documents, diagramas
- **Integraciones con herramientas**: git status por archivo, Docker, SSH
- **Temas personalizados**: esquemas de color, iconos, layout
- **Comandos personalizados**: automatiza operaciones frecuentes

El ecosistema de plugins es activo y creciente.

## Rendimiento comparado

| | Ranger (Python) | lf (Go) | nnn (C) | Yazi (Rust) |
|---|---|---|---|---|
| Directorio 10k archivos | ~3s | ~0.5s | ~0.1s | ~0.05s |
| Previsualizaciones | Básicas | Básicas | No | Completas |
| Imágenes en terminal | Con ueberzug | Con ueberzug | No | Nativo |
| Async I/O | No | Parcial | No | Completo |
| RAM (idle) | ~50MB | ~10MB | ~3MB | ~8MB |
| Plugins | Python | Shell | No | Lua |

nnn es técnicamente más rápido y ligero pero no tiene previsualizaciones. Yazi es el mejor equilibrio entre velocidad, funcionalidades y experiencia de uso.

## Instalación

\`\`\`bash
# macOS
brew install yazi ffmpegthumbnailer poppler

# Arch Linux
pacman -S yazi

# Cargo (cualquier plataforma)
cargo install yazi-fm yazi-cli
\`\`\`

Abre un terminal, escribe \`yazi\`, y empieza a navegar. La experiencia out-of-the-box ya es excelente, y puedes personalizar todo editando archivos TOML.`
  },
  {
    source_id: "chatwoot/chatwoot",
    summary_es: `Chatwoot es lo que pasa cuando alguien mira el precio de Intercom (74-132$/asiento/mes), mira lo que ofrece, y piensa "puedo construir esto como open source y que sea gratis para todo el mundo". Y lo consigue. Chatwoot es una plataforma de atención al cliente completa que centraliza chat en vivo, email, WhatsApp, redes sociales y más en una sola bandeja de entrada.

## Por qué las empresas cambian de Intercom a Chatwoot

El cálculo es simple. Un equipo de soporte de 5 personas con Intercom: 5 × 74$ = **370$/mes** (y eso es el plan más básico). Con el plan Business: 5 × 132$ = **660$/mes**. Al año, entre 4.400$ y 7.920$.

Chatwoot self-hosted: **0$**. Para siempre. Sin límite de agentes, sin límite de conversaciones, sin límite de contactos.

Y no es que Chatwoot sea una versión recortada — tiene las funcionalidades que el 90% de los equipos de soporte usan de Intercom.

## Todos los canales en un solo lugar

Lo potente de Chatwoot es la **bandeja de entrada unificada**. Da igual por dónde te escriba el cliente — todo llega al mismo sitio:

### Chat en vivo
Un widget que incrustas en tu web con un snippet. El visitante hace clic, escribe su pregunta, y un agente de tu equipo responde en tiempo real. Si el visitante se va antes de recibir respuesta, Chatwoot le envía la respuesta por email automáticamente.

### Email
Conecta tu dirección de soporte (soporte@tuempresa.com) y todos los emails se convierten en conversaciones en Chatwoot. Los agentes responden desde Chatwoot y el cliente recibe un email normal. Para el cliente, es email. Para tu equipo, es una conversación unificada.

### WhatsApp Business
Integración con la API de WhatsApp Business. Los mensajes de WhatsApp llegan a Chatwoot, los agentes responden desde Chatwoot, y el cliente ve la respuesta en WhatsApp. Para empresas en España y Latinoamérica, donde WhatsApp es el canal dominante, esto es crítico.

### Redes sociales
- **Facebook Messenger**: mensajes de tu página
- **Instagram DMs**: mensajes directos
- **Twitter/X**: DMs y menciones
- **Telegram**: mensajes de tu bot

### SMS
Vía Twilio. Los SMS del cliente llegan como conversaciones.

### API y custom channels
Puedes crear canales personalizados vía API. ¿Tienes una app móvil con chat propio? Conéctala a Chatwoot y gestiona esas conversaciones junto con las demás.

## Funcionalidades para equipos de soporte

### Asignación inteligente
Cuando llega una conversación nueva, Chatwoot puede:
- Asignarla **round-robin** entre agentes disponibles
- Asignarla al agente con **menos carga**
- Asignarla a un **equipo específico** según el canal o las etiquetas
- Dejarla **sin asignar** para que alguien del equipo la tome

### Respuestas predefinidas (macros)
Define respuestas frecuentes: "Hola, su pedido está en camino y llegará en 24-48h. Puede ver el tracking aquí: {{tracking_url}}". Un clic y la respuesta se envía personalizada con los datos del cliente.

### Chatbots
Crea bots de respuesta automática que:
- Saludan al visitante y preguntan qué necesita
- Ofrecen opciones predefinidas (Ventas, Soporte, Facturación)
- Responden preguntas frecuentes automáticamente
- Escalan a un humano cuando no saben la respuesta

### Base de conocimiento
Centro de ayuda público donde los clientes pueden buscar respuestas antes de contactar soporte. Reduces el volumen de consultas y mejoras la experiencia del cliente.

### Informes
- **Tiempo medio de primera respuesta**: ¿cuánto tarda tu equipo en contestar?
- **Tiempo de resolución**: ¿cuánto tardan en cerrar una conversación?
- **Satisfacción del cliente**: encuesta CSAT al cerrar conversaciones
- **Conversaciones por agente**: distribución de carga del equipo
- **Horas punta**: cuándo llegan más consultas

### Notas internas
Los agentes pueden dejar notas en una conversación que solo ve el equipo. "Este cliente ya reclamó el mes pasado por lo mismo" o "Pendiente de confirmación del departamento de envíos".

## La experiencia del cliente

Para el cliente, la experiencia es indistinguible de Intercom o Zendesk:
- Widget de chat bonito y rápido en la web
- Puede adjuntar archivos y capturas
- Ve cuándo el agente está escribiendo
- Recibe la respuesta por email si se va de la web
- Puede retomar la conversación donde la dejó
- Puede valorar la atención recibida

## Instalación

\`\`\`bash
git clone https://github.com/chatwoot/chatwoot.git
cd chatwoot
docker compose up -d
\`\`\`

Requisitos mínimos para self-hosting: 2 vCPU, 4GB RAM. Para equipos grandes (20+ agentes, miles de conversaciones diarias), recomiendan 4 vCPU, 8GB RAM.

También ofrecen un **plan cloud de pago** para quien no quiera gestionar infraestructura, con precios bastante más bajos que Intercom.`
  },
  {
    source_id: "Lissy93/dashy",
    summary_es: `Dashy es el dashboard personal que todo fan del self-hosting acaba instalando. Si tienes un servidor casero con servicios corriendo (Pi-hole, Plex, Home Assistant, Nextcloud, Portainer, tu web, tu base de datos...), necesitas un sitio centralizado donde ver todo de un vistazo y acceder a cada servicio con un clic. Eso es Dashy.

## La necesidad real

Cuando tienes 5+ servicios self-hosted, acabas con una lista mental de URLs y puertos: "Pi-hole es :80, Portainer es :9443, Plex es :32400, Nextcloud es :443, Grafana es :3000...". Es incómodo, es fácil olvidar alguno, y si alguien más en tu casa quiere acceder a algo, tienes que darle la URL exacta.

Dashy es una página de inicio personalizada que muestra todos tus servicios con iconos bonitos, organizados por categorías, y con indicador de estado en tiempo real (verde = funciona, rojo = caído).

## Personalización a otro nivel

Lo que hace especial a Dashy frente a alternativas (Homer, Heimdall, Flame) es el nivel de personalización:

### Más de 50 temas incluidos
Desde minimalista blanco hasta cyberpunk neón, pasando por Material Design, Dracula, Nord, Catppuccin... Cada tema cambia completamente la apariencia del dashboard. Y si ninguno te convence, puedes crear el tuyo propio con CSS personalizado.

### Widgets integrados
No es solo una lista de enlaces. Dashy incluye widgets que muestran información en tiempo real:

- **Reloj y tiempo atmosférico**: hora local y pronóstico
- **Uso del sistema**: CPU, RAM, disco del servidor
- **Monitorización**: estado de servicios con tiempos de respuesta
- **Calendario**: próximos eventos
- **RSS feeds**: últimas noticias de fuentes que configures
- **Cotizaciones**: precio de criptomonedas, acciones
- **Speedtest**: velocidad de tu conexión a internet
- **IP info**: tu IP pública y localización

### Iconos automáticos
Cuando añades un servicio, Dashy intenta detectar automáticamente su favicon. Si es un servicio conocido (Plex, Nextcloud, Grafana...), usa un icono de alta calidad de su biblioteca. También puedes usar cualquier icono de Font Awesome, Material Design Icons, o una imagen personalizada.

### Layout flexible
- **Grid**: iconos en cuadrícula (tipo iOS)
- **Lista**: formato compacto para muchos servicios
- **Sidebar**: navegación lateral con categorías
- Puedes combinar secciones colapsables para organizar por tipo (Media, Monitoring, Network, Dev...)

## Status checks en tiempo real

Dashy comprueba periódicamente si cada servicio responde:
- **Verde**: el servicio responde correctamente
- **Rojo**: el servicio está caído o no responde
- **Naranja**: responde pero con errores o lento

Es una monitorización ligera — no reemplaza a Uptime Kuma para alertas, pero te da una visión rápida del estado de tu infraestructura cada vez que abres la pestaña del dashboard.

## Configuración

Dashy se configura con un archivo YAML intuitivo:

\`\`\`yaml
sections:
  - name: Media
    items:
      - title: Plex
        url: http://192.168.1.10:32400
        icon: hl-plex
      - title: Jellyfin
        url: http://192.168.1.10:8096
        icon: hl-jellyfin
  - name: Monitoring
    items:
      - title: Grafana
        url: http://192.168.1.10:3000
        icon: hl-grafana
      - title: Uptime Kuma
        url: http://192.168.1.10:3001
        icon: hl-uptime-kuma
\`\`\`

O si prefieres no tocar YAML, Dashy tiene un **editor visual** donde puedes añadir, mover y configurar servicios arrastrando y haciendo clic. Los cambios se guardan automáticamente.

## Seguridad

Si tu dashboard está expuesto a internet (o simplemente quieres privacidad en tu red local):
- **Autenticación**: login con usuario/contraseña
- **OAuth/SSO**: integración con Keycloak, Authelia, Authentik
- **Guest mode**: dashboard público con acceso limitado
- **Perfiles**: diferentes dashboards para diferentes usuarios

## Instalación

\`\`\`bash
docker run -d -p 4000:8080 -v /path/to/config.yml:/app/user-data/conf.yml lissy93/dashy
\`\`\`

Una línea y tienes el dashboard corriendo. La primera vez puedes usar el editor visual para añadir tus servicios, o editar el archivo YAML directamente. En 15 minutos tienes tu centro de control personalizado.`
  },
  {
    source_id: "novuhq/novu",
    summary_es: `Si alguna vez has implementado notificaciones en una aplicación, sabes que es un dolor silencioso. Empiezas con "solo necesito enviar un email de bienvenida" y acabas con código espagueti que gestiona emails, SMS, push notifications y mensajes de Slack repartidos por 15 archivos diferentes. Novu nace para acabar con eso: una API única que gestiona todos los canales de notificación.

## El problema real

Una aplicación típica necesita enviar notificaciones por múltiples canales:

- **Email**: bienvenida, confirmaciones, alertas, facturas, newsletters
- **Push notifications**: actividad en tiempo real, recordatorios
- **In-app**: bandeja de notificaciones dentro de la aplicación
- **SMS**: verificación, alertas urgentes, confirmaciones
- **Chat**: Slack, Discord, Teams para notificaciones de equipo

Sin Novu, cada canal es una integración separada:
- SendGrid/Resend para emails → su API, sus templates, su lógica
- Firebase/OneSignal para push → otra API, otra configuración
- Twilio para SMS → otra más
- Slack webhooks → y otra
- Notificaciones in-app → construidas a mano desde cero

Resultado: código duplicado, lógica de notificación repartida por toda la aplicación, difícil de mantener, imposible de monitorizar de forma unificada.

## Cómo funciona Novu

### 1. Define workflows
Un workflow es el "cuándo y cómo" de una notificación:

"Cuando un usuario se registra:
1. Envía email de bienvenida (inmediato)
2. Si no abre el email en 24h, envía push notification
3. Si tampoco interactúa, envía SMS recordatorio a los 3 días"

Todo esto se define visualmente en el editor de Novu o vía código.

### 2. Conecta proveedores
Novu soporta **60+ proveedores** de notificación. Puedes tener SendGrid para emails transaccionales, Resend para marketing, Twilio para SMS, Firebase para push, y Slack para alertas internas. Todo configurado en un sitio.

**Proveedores de email:** SendGrid, Resend, Postmark, Mailgun, Amazon SES, SparkPost, Brevo...
**SMS:** Twilio, Vonage, Plivo, MessageBird, Infobip...
**Push:** Firebase (FCM), Apple (APNs), OneSignal, Expo...
**Chat:** Slack, Discord, Microsoft Teams, Telegram...

### 3. Diseña templates
Cada notificación tiene un template por canal. El email tiene su diseño HTML, el push tiene título + cuerpo, el SMS tiene su texto. Puedes usar variables dinámicas:

"Hola {{firstName}}, tu pedido #{{orderNumber}} ha sido enviado. Puedes seguirlo aquí: {{trackingUrl}}"

### 4. Dispara notificaciones
Una sola llamada a la API:

\`\`\`javascript
import { Novu } from '@novu/node';

const novu = new Novu('tu-api-key');

await novu.trigger('order-shipped', {
  to: { subscriberId: 'user-123' },
  payload: {
    firstName: 'Carlos',
    orderNumber: '45678',
    trackingUrl: 'https://tracking.example.com/45678'
  }
});
\`\`\`

Novu se encarga de: buscar las preferencias del usuario (¿quiere email? ¿push? ¿ambos?), renderizar el template correcto para cada canal, enviarlo por el proveedor configurado, gestionar reintentos si falla, y registrar métricas de entrega.

## El componente Inbox (in-app)

Esta es una de las funcionalidades más valiosas. Novu proporciona un **componente React** (y otras frameworks) que añade una bandeja de notificaciones a tu aplicación:

\`\`\`jsx
import { Inbox } from '@novu/react';

function MyApp() {
  return <Inbox applicationIdentifier="tu-app-id" subscriberId="user-123" />;
}
\`\`\`

Con esas 3 líneas tienes una campana de notificaciones funcional en tu app: muestra las notificaciones recientes, marca como leídas, badge con contador de no leídas, y se actualiza en tiempo real. Personalizable con CSS para que encaje con tu diseño.

## Digest y batching

Si tu app genera muchas notificaciones (ej: "alguien comentó en tu post"), Novu puede agruparlas:

"En vez de enviar 15 emails diciendo 'X comentó en tu post', agrupa todo en un solo email: 'Tienes 15 nuevos comentarios en tu post'"

Esto se configura en el workflow y es crucial para no saturar a los usuarios.

## Preferencias de usuario

Novu gestiona las preferencias de notificación de cada usuario:
- "Quiero emails de pedidos pero no de marketing"
- "Quiero push para mensajes pero no para actualizaciones"
- "No quiero SMS nunca"

Puedes incrustar un panel de preferencias en tu app con otro componente de Novu, o gestionarlo vía API.

## Self-hosting vs cloud

**Novu Cloud**: plan gratuito con 30.000 eventos/mes. Planes de pago para más volumen. No necesitas gestionar infraestructura.

**Self-hosted**: Docker Compose con MongoDB, Redis y los workers de Novu. Gratis sin límites, pero necesitas mantener el servidor.

## Instalación (self-hosted)

\`\`\`bash
git clone https://github.com/novuhq/novu.git
cd novu/docker
docker compose up -d
\`\`\`

La primera vez accedes a la interfaz web, creas tu organización, configuras los proveedores de notificación, y ya puedes empezar a crear workflows y disparar notificaciones desde tu aplicación.`
  },
  {
    source_id: "PaddlePaddle/PaddleOCR",
    summary_es: `PaddleOCR es el motor de reconocimiento de texto en imágenes (OCR) más potente que puedes usar gratis. Desarrollado por Baidu con años de investigación en deep learning, extrae texto de cualquier imagen, PDF, foto de documento o captura de pantalla con una precisión que rivaliza (y a veces supera) con servicios de pago como Google Cloud Vision o AWS Textract.

## Qué significa esto en la práctica

Le das una foto de una factura → te devuelve el texto estructurado con el nombre del proveedor, la fecha, cada línea con concepto, cantidad y precio, el total, el número de factura...

Le das una captura de un menú de restaurante → te devuelve cada plato con su nombre y precio.

Le das una foto borrosa de una matrícula → te devuelve los caracteres de la placa.

Le das un documento escaneado de 50 páginas → te devuelve todo el texto con la estructura (títulos, párrafos, tablas) preservada.

Y todo esto en más de **80 idiomas**, incluido español con acentos y caracteres especiales.

## El pipeline completo

PaddleOCR no es "solo" un OCR. Es un pipeline de 5 etapas que procesa documentos de forma inteligente:

### 1. Detección de texto
Antes de leer texto, necesitas saber DÓNDE hay texto en la imagen. El modelo de detección localiza todas las regiones con texto, incluso cuando:
- El texto está inclinado o rotado
- Hay texto curvo (como en botellas o carteles)
- El texto es muy pequeño
- La imagen tiene baja resolución o está borrosa
- Hay texto superpuesto sobre fondos complejos

### 2. Reconocimiento de caracteres
Una vez detectadas las regiones, el modelo de reconocimiento lee el texto carácter a carácter. Soporta texto impreso y (con menor precisión) texto manuscrito.

### 3. Análisis de layout
Para documentos complejos, PaddleOCR entiende la estructura:
- Detecta títulos y los distingue del cuerpo de texto
- Identifica columnas y las lee en el orden correcto
- Localiza tablas y las separa del texto
- Detecta imágenes y figuras
- Identifica pies de página y encabezados

### 4. Extracción de tablas
Las tablas en documentos son especialmente difíciles de extraer. PaddleOCR:
- Detecta los bordes de la tabla (incluso si son invisibles)
- Identifica filas y columnas
- Extrae el contenido de cada celda
- Exporta el resultado como Excel, CSV o HTML

### 5. Extracción de información clave (KIE)
Para documentos con formato conocido (facturas, recibos, DNIs, pasaportes), PaddleOCR puede extraer campos específicos:
- **Factura**: proveedor, fecha, importe, IVA, total
- **Recibo**: tienda, productos, precios, total
- **DNI/Pasaporte**: nombre, fecha de nacimiento, número de documento
- **Tarjeta de visita**: nombre, empresa, teléfono, email

## Precisión: benchmarks reales

En los benchmarks estándar de la industria, PaddleOCR PP-OCRv4 consigue:

- **Texto impreso en inglés**: ~97% de precisión
- **Texto impreso en chino**: ~95% de precisión
- **Texto impreso en español**: ~96% de precisión
- **Texto en escena** (carteles, fotos): ~85-90% de precisión
- **Documentos escaneados de buena calidad**: ~98% de precisión

Estos números son comparables a Google Cloud Vision y superiores a la mayoría de alternativas open source (Tesseract, EasyOCR).

## Casos de uso empresariales reales

### Digitalización de archivos
Una empresa tiene 20 años de documentos en papel. Escanean todo y PaddleOCR convierte cada página en texto buscable. Lo que antes era un almacén de papel muerto se convierte en una base de datos consultable.

### Automatización de facturas
El departamento de contabilidad recibe 200 facturas al mes en PDF. En vez de introducir cada una manualmente en el ERP, PaddleOCR lee las facturas y extrae automáticamente: proveedor, fecha, conceptos, importes, IVA y total. El contable solo revisa y confirma.

### Validación de documentos de identidad
Un servicio online que necesita verificar la identidad de usuarios: el usuario sube una foto de su DNI, PaddleOCR lee los datos (nombre, fecha de nacimiento, número), y el sistema los compara con los datos del formulario de registro. Automatización completa del KYC básico.

### Accesibilidad
Convertir carteles, menús, señales y cualquier texto en imagen a texto legible por lectores de pantalla para personas con discapacidad visual.

### E-commerce
Extraer información de productos desde imágenes de catálogos de proveedores. En vez de copiar manualmente nombre, referencia y precio de cada producto, PaddleOCR los lee de la imagen del catálogo.

## Uso rápido

\`\`\`python
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang='es')
result = ocr.ocr('mi_documento.jpg', cls=True)

for line in result[0]:
    text = line[1][0]
    confidence = line[1][1]
    print(f"{text} (confianza: {confidence:.2%})")
\`\`\`

Con 4 líneas de código estás extrayendo texto de cualquier imagen. El parámetro \`lang='es'\` activa el modelo optimizado para español.

## Instalación

\`\`\`bash
pip install paddlepaddle paddleocr
\`\`\`

La primera ejecución descarga automáticamente los modelos necesarios (~100MB). También tiene una interfaz web, API REST, y SDKs para JavaScript, C++, y otros lenguajes.

## PaddleOCR vs alternativas

| | PaddleOCR | Tesseract | Google Vision | AWS Textract |
|---|---|---|---|---|
| Precio | Gratis | Gratis | 1.50$/1000 pág | 1.50$/1000 pág |
| Precisión | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Velocidad | Rápido | Lento | Rápido | Rápido |
| Tablas | Sí | No | Sí | Sí |
| Layout analysis | Sí | Básico | Sí | Sí |
| Local/offline | Sí | Sí | No | No |
| Idiomas | 80+ | 100+ | 50+ | 6 |

Tesseract es la alternativa open source clásica pero su precisión es significativamente inferior, especialmente con documentos complejos, texto en escena y tablas. PaddleOCR es la evolución que Tesseract nunca tuvo.`
  },
  {
    source_id: "karakeep-app/karakeep",
    summary_es: `Karakeep es un gestor de marcadores inteligente que resuelve un problema universal: guardas cientos de enlaces interesantes y luego nunca los encuentras. Con IA integrada, Karakeep no solo guarda tus enlaces — los etiqueta automáticamente, captura una copia completa de la página, y los hace buscables por su contenido. Es como tener un Pinterest personal potenciado con inteligencia artificial.

## El problema de los marcadores

Todos hacemos lo mismo: encontramos un artículo interesante, un tutorial útil, un recurso que "ya leeré después", y lo guardamos. ¿Dónde?

- Algunos van a los favoritos del navegador (que acaban siendo un caos de 500 enlaces sin organizar)
- Otros van a Pocket o Raindrop (que requieren organización manual que nunca haces)
- Otros a notas de Notion o Obsidian (que están mezcladas con el resto de notas)
- Algunos los envías por WhatsApp/Telegram a ti mismo (y se pierden en el scroll)

El resultado: cuando necesitas encontrar "ese artículo que leí hace 3 semanas sobre no sé qué de Kubernetes", pierdes 10 minutos buscando y a veces no lo encuentras.

## Cómo Karakeep soluciona esto

### 1. Guardar es instantáneo
Desde la extensión del navegador (Chrome, Firefox, Safari): un clic y el enlace se guarda. Desde el móvil: comparte el enlace a la app de Karakeep. Desde cualquier sitio: envía el URL al endpoint de la API.

### 2. Captura completa de la página
Karakeep no guarda solo el enlace — descarga y almacena una **copia completa** del contenido de la página. Si la web desaparece, si el artículo se borra, si la URL cambia, tú sigues teniendo el contenido. Esto es crucial: ¿cuántas veces has vuelto a un marcador y te has encontrado un 404?

### 3. La IA organiza por ti
Aquí está la magia. Cuando guardas un enlace, la IA:
- **Lee el contenido** de la página
- **Asigna etiquetas** automáticamente (tecnología, diseño, cocina, viajes, programación...)
- **Genera un resumen** del contenido
- **Extrae metadatos**: autor, fecha, tiempo de lectura
- **Crea una miniatura** representativa

No tienes que organizar nada. Guardas y la IA se encarga.

### 4. Búsqueda por contenido completo
La killer feature: puedes buscar no solo en los títulos de los enlaces, sino **en el contenido completo** de las páginas guardadas. "¿Dónde vi ese tutorial que explicaba cómo configurar Nginx con proxy inverso?" — buscas "nginx proxy inverso" y Karakeep encuentra el artículo aunque el título fuera "Guía avanzada de configuración web".

## Funcionalidades detalladas

### Vista de galería
Navega visualmente por tus marcadores con miniaturas. Es como Pinterest: ves la imagen de cada enlace y reconoces visualmente lo que buscas. Especialmente útil para guardar inspiración de diseño, referencia visual, o portfolios.

### Highlights
Puedes resaltar texto dentro de las páginas guardadas. Como un subrayador fluorescente digital. Cuando vuelves a un artículo largo, ves directamente las partes que te importaban.

### Notas personales
Añade tus propias notas a cada marcador. "Esto me lo recomendó Carlos" o "Aplicar en el proyecto X" o "La parte de la sección 3 es la más relevante".

### Listas y colecciones
Organiza marcadores manualmente cuando quieras: "Recursos para el proyecto de marketing", "Herramientas que quiero probar", "Artículos para leer el fin de semana".

### Compartir colecciones
Crea colecciones públicas que otros pueden ver. Ideal para compartir recursos con tu equipo, crear una lista de "mis herramientas favoritas" pública, o curar contenido para tu audiencia.

### Import y export
Importa marcadores desde Chrome, Firefox, Pocket, Raindrop, Pinboard y más. Exporta en formatos estándar si decides migrar.

## Disponibilidad

- **Extensión de navegador**: Chrome, Firefox, Safari
- **App móvil**: iOS y Android
- **Interfaz web**: accede desde cualquier navegador
- **API**: integra con tus flujos de trabajo
- **Self-hosting**: Docker, control total de tus datos

## Para quién es especialmente útil

### Investigadores y analistas
Si tu trabajo consiste en consumir y organizar grandes cantidades de información de internet (artículos, reports, papers, análisis), Karakeep es transformador. La búsqueda por contenido completo significa que puedes encontrar cualquier cosa que hayas guardado, incluso si no recuerdas el título.

### Diseñadores
Guardar inspiración visual es un caso de uso perfecto. La vista de galería con miniaturas te da un moodboard instantáneo de todo lo que has guardado.

### Desarrolladores
Tutoriales, documentación, snippets de código, Stack Overflow answers, blogs técnicos... todo organizado automáticamente y buscable por contenido.

### Content creators
Banco de ideas y referencias organizado automáticamente. Cuando necesitas inspiración para un artículo, un vídeo o un post, buscas en tu colección curada.

## Karakeep vs alternativas

| | Karakeep | Pocket | Raindrop.io | Obsidian Web Clipper |
|---|---|---|---|---|
| Etiquetado con IA | Sí | No | No | No |
| Captura completa | Sí | Parcial | Screenshot | Markdown |
| Búsqueda full-text | Sí | Premium | Sí | Sí |
| Self-hosting | Sí | No | No | N/A |
| Vista galería | Sí | No | Sí | No |
| Highlights | Sí | Sí | Sí | Sí |
| App móvil | Sí | Sí | Sí | No |

## Instalación (self-hosted)

\`\`\`bash
docker compose up -d
\`\`\`

Con Docker Compose, en 5 minutos tienes tu instancia corriendo con PostgreSQL, el backend, el worker de IA y la interfaz web. Los modelos de IA para etiquetado se descargan automáticamente la primera vez.`
  },
  {
    source_id: "plausible/analytics",
    summary_es: `Plausible es analítica web reducida a su esencia: simple, rápida, y respetuosa con la privacidad de tus visitantes. En un mundo donde Google Analytics se ha convertido en un monstruo de complejidad (GA4 tiene literalmente cursos de certificación), Plausible demuestra que se puede hacer analytics bien con una fracción de la complejidad.

## La filosofía

La mayoría de webs no necesitan analytics complejo. Necesitan respuestas a 5 preguntas:
1. ¿Cuánta gente visita mi web?
2. ¿De dónde vienen?
3. ¿Qué páginas ven?
4. ¿Desde qué dispositivos?
5. ¿Funciona mi último contenido/campaña?

Google Analytics puede responder estas preguntas... después de 20 minutos de configuración, 3 informes personalizados y un tutorial de YouTube. Plausible las responde en una sola pantalla, de un vistazo, sin configurar nada.

## El dashboard

Todo cabe en una página. Sin scrolls infinitos, sin submenús, sin "explorar más":

**Números principales**: visitantes únicos, páginas vistas, tasa de rebote, duración media de visita. Del periodo que selecciones (hoy, ayer, últimos 7 días, 30 días, año, rango personalizado).

**Gráfica de tendencia**: evolución temporal de visitantes. De un vistazo ves si tu tráfico sube, baja, o tiene picos.

**Top fuentes de tráfico**: Google, Twitter, Reddit, newsletters, directo... ves exactamente de dónde viene tu audiencia. Si publicas un tweet y quieres saber cuánto tráfico ha generado, lo ves aquí en tiempo real.

**Top páginas**: qué contenido funciona mejor. Si tienes un blog, ves qué artículos atraen más visitas. Si tienes un SaaS, ves qué landing pages convierten.

**Ubicaciones**: países y ciudades de tus visitantes. Mapa visual incluido.

**Dispositivos**: desktop, móvil, tablet. Y desglose por navegador y sistema operativo.

**En tiempo real**: cuánta gente está en tu web ahora mismo y en qué páginas.

## Sin cookies: la ventaja competitiva silenciosa

Plausible no usa cookies. No almacena datos personales. No rastrea usuarios entre sesiones. Identifica visitantes únicos con un hash temporal que se calcula al vuelo y no se guarda.

Las consecuencias prácticas son enormes:

### No necesitas banner de cookies
En Europa, si tu web usa Google Analytics, estás obligado por ley (GDPR, ePrivacy) a mostrar un banner de consentimiento de cookies antes de rastrear al visitante. Con Plausible, no necesitas banner. Tu web se carga limpia.

### No pierdes datos por rechazo de cookies
Con GA, entre el 30-50% de los visitantes rechaza las cookies o usa adblockers que bloquean GA. Esas visitas las pierdes. Con Plausible, como no usa cookies y su script es tan ligero que la mayoría de adblockers no lo bloquean, tu analytics es más preciso.

### No alimentas el negocio publicitario de Google
Google Analytics es "gratuito" porque Google usa los datos de navegación de tus visitantes para perfilarlos y venderles publicidad. Con Plausible, nadie más tiene acceso a los datos de tu audiencia.

## El peso importa: menos de 1KB

El script de tracking de Google Analytics pesa **~45KB** y descarga recursos adicionales. El de Plausible pesa **menos de 1KB**.

¿Por qué importa? Porque cada kilobyte cuenta para:
- **Core Web Vitals**: Google mide la velocidad de carga para el ranking SEO
- **First Contentful Paint**: cuanto menos JavaScript, más rápido carga
- **Experiencia móvil**: en conexiones 3G, 45KB se nota
- **Puntuación de Lighthouse**: ese script pesado puede costarte puntos

Eliminar Google Analytics y poner Plausible puede mejorar tu puntuación de PageSpeed entre 5-15 puntos.

## Eventos personalizados

No todo son páginas vistas. Puedes rastrear acciones específicas:

\`\`\`html
<button onclick="plausible('signup')">Crear cuenta</button>
\`\`\`

\`\`\`javascript
plausible('purchase', {props: {plan: 'pro', value: '29'}});
plausible('download', {props: {file: 'ebook.pdf'}});
\`\`\`

En el dashboard ves cuántas veces ocurrió cada evento, con desglose por propiedades. ¿Qué plan se compra más? ¿Qué archivo se descarga más? ¿Qué botón genera más signups?

## Filtros y segmentación

Puedes combinar cualquier dimensión como filtro:
- "Visitantes de España que llegaron desde Google y vieron la página de precios"
- "Usuarios de móvil que vinieron de Twitter la semana pasada"
- "Páginas más vistas por visitantes de Alemania"

## Self-hosting vs cloud

**Plausible Cloud (plausible.io):** desde 9$/mes. No necesitas gestionar nada. 30 días de prueba gratis.

**Self-hosted:** Docker Compose con ClickHouse como backend de datos. Gratis sin límites. Requiere un servidor con al menos 2GB de RAM.

\`\`\`bash
git clone https://github.com/plausible/community-edition.git
cd community-edition
docker compose up -d
\`\`\`

## ¿Cuándo usar Google Analytics en vez de Plausible?

Si necesitas:
- Embudos de conversión complejos con múltiples pasos
- Segmentación avanzada de audiencia por decenas de dimensiones
- Integración directa con Google Ads para attribution
- Análisis de cohortes y retención
- Predictive analytics

Para todo lo demás — que es el 90% de las webs — Plausible es más que suficiente y significativamente mejor en experiencia de uso, privacidad y rendimiento.`
  },
];

async function main() {
  console.log("Actualizando contenido extendido para proyectos 21-30...\n");

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

  console.log("\n✅ Lote 21-30 actualizado");
  await sql.end();
}

main();

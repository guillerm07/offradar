export type StackTool = {
  name: string;
  slug: string;
  role: string;
};

export type Stack = {
  slug: string;
  title: string;
  problem: string;
  tools: StackTool[];
  difficulty: "Fácil" | "Medio";
  time: string;
  keyBenefit: string;
  steps: string[];
  detailedGuide: string;
};

export const stacks: Stack[] = [
  {
    slug: "tu-chatgpt-privado",
    title: "Tu propio ChatGPT privado",
    problem:
      "Quieres un asistente de IA privado sin pagar 20$/mes ni enviar datos a OpenAI",
    tools: [
      {
        name: "Jan",
        slug: "jan-chatgpt-offline-privado",
        role: "Interfaz de chat de escritorio — tu \"ChatGPT\" local con soporte para múltiples modelos",
      },
      {
        name: "LocalAI",
        slug: "localai-ejecuta-cualquier-modelo-ia-en-local",
        role: "API compatible con OpenAI para servir modelos en local y conectar otras apps",
      },
    ],
    difficulty: "Fácil",
    time: "30 minutos",
    keyBenefit:
      "Conversaciones con IA 100% privadas, sin suscripción mensual y con modelos que puedes cambiar cuando quieras.",
    steps: [
      "Instala Jan en tu ordenador desde jan.ai (disponible para Windows, Mac y Linux).",
      "Descarga un modelo de lenguaje desde la sección de modelos de Jan. Llama 3 8B es ideal para empezar.",
      "Configura LocalAI como backend con Docker para tener una API REST compatible con OpenAI.",
      "Conecta tus apps favoritas (VS Code, scripts de Python, automatizaciones) a la API local en localhost:8080.",
    ],
    detailedGuide: `## Por qué ejecutar IA en local

La inteligencia artificial generativa ha cambiado la forma en que trabajamos, pero depender de servicios en la nube implica varios problemas: **tus datos viajan a servidores de terceros**, pagas una suscripción mensual que se acumula, y dependes de la disponibilidad y las políticas de empresas como OpenAI.

Ejecutar IA en local resuelve todo esto. Tus conversaciones **nunca salen de tu ordenador**, no hay límites de uso, no hay costes recurrentes y puedes elegir el modelo que mejor se adapte a cada tarea. Además, funciona sin conexión a internet.

## Paso 1: Instalar Jan

[Jan](https://jan.ai) es una aplicación de escritorio de código abierto que funciona como una interfaz de chat similar a ChatGPT, pero ejecutándose al 100% en tu máquina.

### Instalación

1. Ve a [jan.ai](https://jan.ai) y descarga la versión para tu sistema operativo.
2. Instala la aplicación como cualquier otra (arrastra a Aplicaciones en Mac, ejecuta el instalador en Windows).
3. Abre Jan. La primera vez te pedirá que configures la ubicación de los modelos.

\`\`\`bash
# En Linux también puedes instalar con AppImage
chmod +x jan-linux-x86_64.AppImage
./jan-linux-x86_64.AppImage
\`\`\`

### Configuración inicial

Jan tiene una interfaz limpia con tres secciones principales: **Chat** (para conversar), **Models** (para gestionar modelos) y **Settings** (para ajustar parámetros). La primera vez que abres la app, no tendrás ningún modelo descargado, así que el siguiente paso es elegir uno.

## Paso 2: Elegir y descargar un modelo

La elección del modelo es crucial y depende de tu hardware. Aquí tienes una guía según tus recursos:

| RAM disponible | Modelo recomendado | Tamaño | Calidad |
|---|---|---|---|
| 8 GB | Phi-3 Mini (3.8B) | ~2.3 GB | Buena para tareas simples |
| 16 GB | Llama 3 8B | ~4.7 GB | Muy buena para uso general |
| 32 GB | Llama 3 70B Q4 | ~40 GB | Excelente, cercana a GPT-3.5 |
| 64 GB+ | Mixtral 8x7B | ~26 GB | Excelente para código y razonamiento |

### Descarga desde Jan

1. Ve a la pestaña **Models** en Jan.
2. Busca el modelo que quieras (por ejemplo, "Llama 3 8B").
3. Haz clic en **Download**. La descarga puede tardar unos minutos dependiendo de tu conexión.
4. Una vez descargado, vuelve a **Chat**, selecciona el modelo y empieza a conversar.

> **Consejo**: Empieza con Llama 3 8B. Es el mejor equilibrio entre calidad y rendimiento para la mayoría de equipos. Si tu ordenador tiene una GPU con 8 GB+ de VRAM, el rendimiento mejorará considerablemente.

## Paso 3: Instalar LocalAI para compatibilidad con la API de OpenAI

Jan es perfecto para chatear directamente, pero si quieres **conectar otras aplicaciones** a tu IA local, necesitas una API. Aquí entra LocalAI.

[LocalAI](https://localai.io) levanta un servidor local que expone exactamente la misma API que OpenAI. Esto significa que cualquier herramienta que funcione con la API de OpenAI funcionará con LocalAI sin cambiar ni una línea de código, solo cambiando la URL.

### Instalación con Docker

\`\`\`bash
# Versión básica (CPU)
docker run -d --name localai -p 8080:8080 localai/localai:latest-cpu

# Con soporte para GPU NVIDIA
docker run -d --name localai -p 8080:8080 --gpus all localai/localai:latest-gpu-nvidia-cuda-12

# Verificar que funciona
curl http://localhost:8080/v1/models
\`\`\`

### Descargar un modelo en LocalAI

\`\`\`bash
# Instalar un modelo desde la galería de LocalAI
curl http://localhost:8080/models/apply -H "Content-Type: application/json" \\
  -d '{"id": "llama-3-8b-instruct"}'
\`\`\`

Una vez instalado, puedes probar la API directamente:

\`\`\`bash
curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3-8b-instruct",
    "messages": [{"role": "user", "content": "Hola, ¿cómo estás?"}]
  }'
\`\`\`

## Paso 4: Conectar apps vía la API compatible con OpenAI

Ahora que tienes LocalAI corriendo, puedes conectar **cualquier herramienta** que soporte la API de OpenAI.

### Ejemplo: extensión de VS Code (Continue)

1. Instala la extensión [Continue](https://continue.dev) en VS Code.
2. En la configuración, cambia el endpoint de OpenAI a \`http://localhost:8080\`.
3. Ya tienes autocompletado de código y chat de IA sin enviar tu código a la nube.

### Ejemplo: script de Python

\`\`\`python
from openai import OpenAI

# Apunta al servidor local en lugar de api.openai.com
client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="no-necesitas-clave"  # LocalAI no requiere API key
)

response = client.chat.completions.create(
    model="llama-3-8b-instruct",
    messages=[
        {"role": "system", "content": "Eres un asistente útil que responde en español."},
        {"role": "user", "content": "Explícame qué es Docker en tres frases."}
    ]
)

print(response.choices[0].message.content)
\`\`\`

### Modelos recomendados según el caso de uso

- **Chat general**: Llama 3 8B Instruct — respuestas fluidas, buen español, rápido.
- **Programación**: CodeLlama 13B o DeepSeek Coder — especializados en código.
- **Razonamiento**: Mixtral 8x7B — mezcla de expertos, excelente para tareas complejas.
- **Textos largos**: Llama 3 con contexto extendido — soporta documentos de miles de palabras.
- **Uso en móvil**: Phi-3 Mini — ligero, funciona hasta en dispositivos con poca RAM.

## Consejos de rendimiento

1. **Usa GPU siempre que puedas**. La diferencia entre CPU y GPU es de 5x a 20x en velocidad.
2. **Cuantización**: Los modelos Q4 (4 bits) ocupan mucha menos RAM con una pérdida de calidad mínima.
3. **Cierra otras apps pesadas** mientras usas la IA para liberar RAM.
4. **Ajusta el contexto**: Reducir el tamaño máximo de contexto de 4096 a 2048 tokens mejora la velocidad.
5. **Modelos GGUF**: Busca siempre la versión GGUF de los modelos, están optimizados para CPU.

## Qué esperar: calidad vs ChatGPT

Seamos honestos: **los modelos locales no igualan a GPT-4o** en todas las tareas. Pero sí son sorprendentemente buenos:

- **Tareas donde un modelo local brilla**: resúmenes, traducciones, generación de código sencillo, brainstorming, redacción de emails, explicación de conceptos.
- **Tareas donde GPT-4 todavía gana**: razonamiento matemático complejo, análisis de textos muy largos, tareas que requieren conocimiento muy actualizado.
- **El punto clave**: Para el 80% de las tareas cotidianas, un Llama 3 8B en local es **más que suficiente**. Y lo haces sin pagar suscripción, sin límites de uso y con total privacidad.

Con este stack tienes un asistente de IA completamente funcional, privado y gratuito. Jan te da la interfaz amigable para chatear día a día, y LocalAI te abre la puerta a integrar IA en cualquier herramienta que uses.`,
  },
  {
    slug: "monitoriza-tu-homelab",
    title: "Monitoriza y gestiona tu homelab",
    problem:
      "Tienes servicios self-hosted y no sabes si están funcionando",
    tools: [
      {
        name: "Uptime Kuma",
        slug: "uptime-kuma-monitorizacion-self-hosted",
        role: "Monitorización de uptime con alertas por Telegram, Discord, Slack, email y más",
      },
      {
        name: "Dashy",
        slug: "dashy-dashboard-personal-self-hosted",
        role: "Dashboard visual y configurable para organizar y acceder a todos tus servicios",
      },
      {
        name: "Umami",
        slug: "umami-analytics-privacidad-alternativa-google-analytics",
        role: "Analytics web privado y ligero — sabe cuánta gente usa tus servicios públicos",
      },
    ],
    difficulty: "Fácil",
    time: "1 hora",
    keyBenefit:
      "Dashboard centralizado con monitorización en tiempo real, alertas al móvil y analytics de uso — todo sin depender de servicios externos.",
    steps: [
      "Despliega Uptime Kuma con Docker y crea tu cuenta de administrador.",
      "Configura monitores para cada servicio de tu homelab con alertas por Telegram.",
      "Despliega Dashy como tu página de inicio centralizada con todos los servicios.",
      "Añade Umami para analytics de tus sitios públicos sin cookies.",
      "Conecta todo en Dashy como punto de entrada único a tu infraestructura.",
    ],
    detailedGuide: `## La importancia de monitorizar tu homelab

Si tienes servicios corriendo en tu homelab — un servidor de medios, un NAS, un blog, herramientas de productividad — sabes lo frustrante que es descubrir que algo dejó de funcionar hace días sin que te enteraras. Un amigo intenta acceder a tu Nextcloud y no funciona. Tu backup automático falló hace una semana. Tu Pi-hole se quedó sin memoria.

La monitorización no es un lujo, es una necesidad. Este stack te da tres cosas: **saber si todo funciona** (Uptime Kuma), **acceder a todo desde un sitio** (Dashy) y **medir cuánta gente usa tus servicios** (Umami).

## Paso 1: Desplegar Uptime Kuma

[Uptime Kuma](https://github.com/louislam/uptime-kuma) es una herramienta de monitorización elegante y potente que compite con servicios de pago como Pingdom o UptimeRobot.

### Instalación con Docker Compose

Crea un archivo \`docker-compose.yml\`:

\`\`\`yaml
version: "3.8"
services:
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    restart: always
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma-data:/app/data

volumes:
  uptime-kuma-data:
\`\`\`

\`\`\`bash
docker compose up -d
\`\`\`

Accede a \`http://tu-servidor:3001\` y crea tu cuenta de administrador.

### Configurar monitores

Para cada servicio de tu homelab, añade un monitor:

- **HTTP(s)**: Para webs y APIs. Uptime Kuma hace peticiones GET y verifica que el código de respuesta sea 200.
- **TCP Port**: Para bases de datos y servicios sin interfaz web. Comprueba que el puerto está abierto.
- **Ping**: Para servidores y dispositivos de red. Verifica que la máquina responde.
- **Docker Container**: Para monitorizar contenedores directamente a través del socket de Docker.

Configura cada monitor con un intervalo de **60 segundos** y un número de reintentos de **3** antes de marcar como caído.

### Configurar alertas por Telegram

1. Crea un bot en Telegram hablando con [@BotFather](https://t.me/BotFather). Usa \`/newbot\` y guarda el token.
2. Obtén tu Chat ID hablando con [@userinfobot](https://t.me/userinfobot).
3. En Uptime Kuma, ve a **Settings → Notifications → Setup Notification**.
4. Selecciona **Telegram**, pega el token del bot y tu Chat ID.
5. Haz clic en **Test** para verificar que llega el mensaje.

Ahora recibirás una notificación instantánea en tu móvil cada vez que un servicio caiga o se recupere.

> **Consejo**: Crea un grupo de Telegram dedicado a alertas e invita al bot. Así puedes añadir a otros administradores del homelab al grupo.

## Paso 2: Configurar Dashy como dashboard centralizado

[Dashy](https://dashy.to) es un dashboard de inicio altamente personalizable que te da un punto de acceso único a todos tus servicios.

### Instalación con Docker

\`\`\`bash
docker run -d \\
  --name dashy \\
  -p 4000:8080 \\
  -v /ruta/a/tu/conf.yml:/app/user-data/conf.yml \\
  --restart always \\
  lissy93/dashy:latest
\`\`\`

### Configuración del dashboard

Edita el archivo \`conf.yml\` para organizar tus servicios:

\`\`\`yaml
pageInfo:
  title: Mi Homelab
  description: Dashboard de servicios
  navLinks:
    - title: GitHub
      path: https://github.com

sections:
  - name: Infraestructura
    icon: fas fa-server
    items:
      - title: Uptime Kuma
        description: Monitorización de servicios
        url: http://tu-servidor:3001
        icon: hl-uptime-kuma
      - title: Portainer
        description: Gestión de contenedores Docker
        url: http://tu-servidor:9000
        icon: hl-portainer

  - name: Productividad
    icon: fas fa-briefcase
    items:
      - title: Nextcloud
        description: Almacenamiento y documentos
        url: http://tu-servidor:8081
        icon: hl-nextcloud

  - name: Analytics
    icon: fas fa-chart-bar
    items:
      - title: Umami
        description: Analytics de mis sitios
        url: http://tu-servidor:3000
        icon: hl-umami
\`\`\`

Dashy soporta cientos de iconos de servicios self-hosted, temas personalizables y widgets que muestran información en tiempo real (uso de CPU, estado de servicios, clima, etc.).

## Paso 3: Instalar Umami para analytics

[Umami](https://umami.is) es una alternativa ligera y privada a Google Analytics. No usa cookies, no necesita banner de consentimiento y es increíblemente rápida.

### Instalación con Docker Compose

\`\`\`yaml
version: "3.8"
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: umami
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://umami:tu-password-segura@umami-db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: genera-un-secreto-aleatorio-aqui
    depends_on:
      umami-db:
        condition: service_healthy

  umami-db:
    image: postgres:15-alpine
    container_name: umami-db
    restart: always
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: tu-password-segura
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  umami-db-data:
\`\`\`

### Añadir el script de tracking

1. Accede a Umami en \`http://tu-servidor:3000\` (usuario por defecto: \`admin\` / \`umami\`).
2. Ve a **Settings → Websites → Add website**.
3. Copia el snippet de tracking que genera Umami.
4. Pégalo en el \`<head>\` de tus sitios web públicos:

\`\`\`html
<script
  defer
  src="http://tu-servidor:3000/script.js"
  data-website-id="tu-id-de-sitio"
></script>
\`\`\`

Umami empezará a recopilar datos de visitas de forma anónima: páginas visitadas, referrers, dispositivos, países y eventos personalizados. Todo sin cookies.

## Paso 4: Configurar alertas avanzadas por Telegram

Además de las alertas básicas de Uptime Kuma (servicio caído/recuperado), puedes configurar alertas más sofisticadas:

- **Certificados SSL**: Uptime Kuma te avisa X días antes de que expire un certificado.
- **Tiempo de respuesta**: Alerta si un servicio tarda más de N milisegundos en responder.
- **Palabras clave**: Verifica que una página contiene (o no contiene) un texto específico.

Para cada tipo de alerta, puedes elegir canales diferentes: Telegram para alertas críticas, Discord para informativas, email para resúmenes semanales.

## Resultado final

Con este stack tienes:

1. **Uptime Kuma** monitorizando cada servicio con alertas en tiempo real a tu móvil.
2. **Dashy** como tu página de inicio personalizada donde accedes a todo con un clic.
3. **Umami** midiendo las visitas a tus sitios públicos sin comprometer la privacidad de nadie.

Todo corre en Docker, consume recursos mínimos y no depende de ningún servicio externo. Tu homelab pasa de ser un conjunto de servicios sueltos a una infraestructura profesional y monitorizada.`,
  },
  {
    slug: "crm-soporte-datos-negocio",
    title: "CRM + Soporte + Base de datos para tu negocio",
    problem:
      "Necesitas gestionar clientes, dar soporte y organizar datos sin pagar Salesforce + Intercom + Airtable",
    tools: [
      {
        name: "Twenty",
        slug: "twenty-crm-open-source-alternativa-salesforce",
        role: "CRM moderno para gestionar tu pipeline de ventas, contactos y oportunidades",
      },
      {
        name: "Chatwoot",
        slug: "chatwoot-alternativa-intercom-open-source",
        role: "Plataforma de soporte multicanal: chat en vivo, email, WhatsApp, redes sociales",
      },
      {
        name: "NocoDB",
        slug: "nocodb-alternativa-airtable-open-source",
        role: "Base de datos visual tipo hoja de cálculo para inventario, seguimiento y datos custom",
      },
    ],
    difficulty: "Medio",
    time: "2-3 horas",
    keyBenefit:
      "Suite completa de negocio (ventas, soporte, datos) por 0$/mes en tu propio servidor, sin límites de usuarios ni contactos.",
    steps: [
      "Despliega Twenty con Docker Compose y configura tu pipeline de ventas.",
      "Instala Chatwoot y configura el widget de chat en vivo para tu web.",
      "Lanza NocoDB y conéctalo a tu base de datos existente para tener una interfaz visual.",
      "Integra las tres herramientas mediante webhooks y APIs REST.",
    ],
    detailedGuide: `## El problema: herramientas de negocio que cuestan una fortuna

Si tienes un negocio pequeño o mediano, seguramente has visto los precios de las herramientas estándar:

- **Salesforce**: desde 25$/usuario/mes (y rápidamente sube a 150$+).
- **Intercom**: desde 39$/mes por un solo canal de soporte.
- **Airtable**: desde 20$/usuario/mes para funcionalidad seria.

Para un equipo de 5 personas, estamos hablando de **400-800$/mes** solo en estas tres herramientas. Y con límites: contactos máximos, registros máximos, canales máximos.

Con Twenty + Chatwoot + NocoDB puedes tener funcionalidad equivalente por **0$/mes** en tu propio servidor, sin límites artificiales. Veamos cómo montar cada pieza.

## Paso 1: Desplegar Twenty como tu CRM

[Twenty](https://twenty.com) es un CRM open source moderno que rivaliza con Salesforce en diseño y funcionalidad. Tiene gestión de contactos, pipeline de ventas, actividades, tareas y una API GraphQL completa.

### Instalación con Docker Compose

\`\`\`yaml
version: "3.8"
services:
  twenty-server:
    image: twentycrm/twenty:latest
    container_name: twenty-server
    restart: always
    ports:
      - "3000:3000"
    environment:
      SERVER_URL: http://tu-servidor:3000
      FRONT_BASE_URL: http://tu-servidor:3000
      PG_DATABASE_URL: postgresql://twenty:tu-password@twenty-db:5432/twenty
      ACCESS_TOKEN_SECRET: genera-un-secreto-aleatorio
      LOGIN_TOKEN_SECRET: genera-otro-secreto-aleatorio
      STORAGE_TYPE: local
    depends_on:
      - twenty-db

  twenty-db:
    image: twentycrm/twenty-postgres:latest
    container_name: twenty-db
    restart: always
    environment:
      POSTGRES_USER: twenty
      POSTGRES_PASSWORD: tu-password
      POSTGRES_DB: twenty
    volumes:
      - twenty-db-data:/var/lib/postgresql/data

volumes:
  twenty-db-data:
\`\`\`

\`\`\`bash
docker compose up -d
\`\`\`

### Configurar el pipeline de ventas

1. Accede a Twenty en \`http://tu-servidor:3000\` y crea tu cuenta.
2. Ve a **Settings → Pipeline** y personaliza las etapas de tu embudo:
   - **Nuevo Lead** → **Contactado** → **Propuesta enviada** → **Negociación** → **Cerrado ganado** / **Cerrado perdido**
3. Importa tus contactos existentes desde un archivo CSV en **Settings → Data → Import**.
4. Configura campos personalizados según tu negocio: sector, origen del lead, presupuesto estimado, etc.

> **Consejo**: Twenty tiene una vista Kanban espectacular para el pipeline. Arrastra oportunidades entre etapas y el CRM calcula automáticamente el valor de cada etapa.

## Paso 2: Configurar Chatwoot para atención al cliente

[Chatwoot](https://chatwoot.com) es una plataforma de atención al cliente multicanal: chat en vivo, email, WhatsApp, Facebook Messenger, Instagram, Telegram y más. Es la alternativa open source a Intercom y Zendesk.

### Instalación con Docker

La forma más sencilla es usar el script de instalación oficial:

\`\`\`bash
# Descargar e instalar Chatwoot con Docker
wget https://get.chatwoot.app/linux/install.sh
chmod +x install.sh
./install.sh --install
\`\`\`

O con Docker Compose manual (configuración simplificada):

\`\`\`bash
# Clonar el repositorio con la configuración de Docker
git clone https://github.com/chatwoot/chatwoot.git
cd chatwoot
cp .env.example .env
# Editar .env con tu configuración
docker compose -f docker-compose.production.yaml up -d
\`\`\`

### Configurar el widget de chat en vivo

1. Accede a Chatwoot y crea tu cuenta de administrador.
2. Ve a **Settings → Inboxes → Add Inbox → Website**.
3. Configura el nombre, color y mensaje de bienvenida del widget.
4. Copia el snippet de JavaScript que genera Chatwoot.
5. Pégalo antes del cierre de \`</body>\` en tu web:

\`\`\`html
<script>
  (function(d,t) {
    var BASE_URL="http://tu-servidor-chatwoot:3000";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: 'tu-token-aqui',
        baseUrl: BASE_URL
      })
    }
  })(document,"script");
</script>
\`\`\`

### Configurar canales adicionales

- **Email**: Conecta tu cuenta SMTP/IMAP en **Inboxes → Email**. Chatwoot convierte cada email en una conversación con historial completo.
- **WhatsApp**: Necesitas la API de WhatsApp Business (vía Twilio o 360dialog). Configúralo en **Inboxes → WhatsApp**.
- **Telegram**: Crea un bot con @BotFather y conecta el token en **Inboxes → Telegram**.

## Paso 3: Lanzar NocoDB como base de datos visual

[NocoDB](https://nocodb.com) convierte cualquier base de datos (MySQL, PostgreSQL, SQL Server) en una interfaz visual tipo hoja de cálculo, similar a Airtable pero sin límites ni costes.

### Instalación con Docker

\`\`\`bash
docker run -d \\
  --name nocodb \\
  -p 8080:8080 \\
  -v nocodb-data:/usr/app/data \\
  --restart always \\
  nocodb/nocodb:latest
\`\`\`

### Conectar a tu base de datos existente

Si ya tienes una base de datos PostgreSQL o MySQL, NocoDB se conecta directamente y te pone una interfaz visual encima **sin migrar datos**:

1. Accede a NocoDB en \`http://tu-servidor:8080\`.
2. Ve a **Create Project → Connect to External Database**.
3. Introduce los datos de conexión de tu base de datos existente.
4. NocoDB detecta automáticamente todas las tablas y sus relaciones.

Si no tienes una base de datos previa, NocoDB crea una SQLite internamente y puedes empezar a crear tablas desde cero.

### Crear tablas útiles para tu negocio

- **Inventario de productos**: nombre, SKU, precio, stock, proveedor, imagen.
- **Seguimiento de pedidos**: cliente, productos, estado, fecha de envío, tracking.
- **Base de conocimiento**: título, categoría, contenido, última actualización.
- **Registro de incidencias**: cliente, problema, prioridad, asignado a, estado.

NocoDB soporta vistas de cuadrícula, Kanban, galería, formulario y calendario sobre los mismos datos.

## Paso 4: Integrar las herramientas mediante webhooks

La verdadera potencia de este stack aparece cuando conectas las tres herramientas entre sí.

### Chatwoot → Twenty (nuevo cliente = nuevo contacto en CRM)

Configura un webhook en Chatwoot (**Settings → Integrations → Webhooks**) que dispara cuando se crea una nueva conversación. En tu servidor, crea un endpoint que reciba el webhook y use la API de Twenty para crear un contacto:

\`\`\`bash
# Ejemplo: crear contacto en Twenty desde un webhook de Chatwoot
curl -X POST http://tu-servidor-twenty:3000/api \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer tu-api-token" \\
  -d '{
    "query": "mutation { createPerson(data: { name: { firstName: \\"Nombre\\", lastName: \\"Apellido\\" }, email: \\"email@ejemplo.com\\" }) { id } }"
  }'
\`\`\`

### Twenty → NocoDB (oportunidad cerrada = registro en base de datos)

Usa los webhooks de Twenty para que, cuando una oportunidad se marque como "Cerrado ganado", se cree automáticamente un registro en NocoDB con los datos del pedido:

\`\`\`bash
# Crear registro en NocoDB via API REST
curl -X POST http://tu-servidor-nocodb:8080/api/v1/db/data/noco/tu-proyecto/tu-tabla \\
  -H "xc-auth: tu-token-nocodb" \\
  -H "Content-Type: application/json" \\
  -d '{"Cliente": "Nombre", "Producto": "Plan Pro", "Valor": 500, "Fecha": "2025-01-15"}'
\`\`\`

### NocoDB → Chatwoot (actualización de pedido = mensaje al cliente)

Cuando actualizas el estado de un pedido en NocoDB, un webhook puede disparar un mensaje automático al cliente a través de Chatwoot, informándole del progreso.

## Resultado final

Con este stack tienes:

- **Twenty** gestionando todo tu pipeline comercial: leads, oportunidades, contactos, actividades.
- **Chatwoot** atendiendo a tus clientes en todos los canales: web, email, WhatsApp, Telegram.
- **NocoDB** organizando todos los datos operativos: inventario, pedidos, incidencias.
- **Webhooks** conectando todo para que la información fluya automáticamente entre herramientas.

Coste total: **0$/mes** (solo el coste de tu servidor). Sin límites de usuarios, sin límites de contactos, con tus datos bajo tu control absoluto.`,
  },
];

export function getStackBySlug(slug: string): Stack | undefined {
  return stacks.find((s) => s.slug === slug);
}

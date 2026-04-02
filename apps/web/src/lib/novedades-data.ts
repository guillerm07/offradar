export type Novedad = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  url: string;
  clonableWithCode: boolean;
  summary: string;
  fullContent: string;
};

export const novedades: Novedad[] = [
  {
    slug: "bolt-new",
    name: "Bolt.new",
    tagline:
      "Construye apps full-stack desde un prompt, directamente en el navegador.",
    category: "IDE con IA",
    url: "https://bolt.new",
    clonableWithCode: true,
    summary:
      "Bolt.new combina un entorno de desarrollo web completo con modelos de lenguaje avanzados para generar, ejecutar y desplegar aplicaciones full-stack desde una sola instrucción en lenguaje natural. No necesitas instalar nada: todo ocurre en el navegador.\n\nEs especialmente interesante porque demuestra que el paradigma de \"prompt a app funcional\" ya es viable para prototipos y MVPs, reduciendo semanas de trabajo a minutos.\n\nDesarrollado por StackBlitz, el equipo detrás de WebContainers, la tecnología que permite ejecutar Node.js directamente en el navegador.",
    fullContent: `## Qué es Bolt.new

Bolt.new es un entorno de desarrollo impulsado por IA que permite crear aplicaciones web completas escribiendo instrucciones en lenguaje natural. Desarrollado por **StackBlitz**, la empresa pionera en entornos de desarrollo en el navegador, Bolt.new lleva el concepto de "prompt to app" al siguiente nivel.

A diferencia de herramientas que solo generan código y te dejan con la tarea de ejecutarlo, Bolt.new **genera, ejecuta, depura y despliega** la aplicación en tiempo real, directamente en tu navegador. No necesitas instalar Node.js, npm, ni ninguna herramienta local.

## Cómo funciona

La magia de Bolt.new se basa en dos tecnologías:

1. **WebContainers**: La tecnología propietaria de StackBlitz que ejecuta Node.js directamente en el navegador usando WebAssembly. Esto significa que puedes tener un servidor Express, una base de datos SQLite y un build de Vite corriendo sin salir de Chrome.

2. **Modelos de lenguaje**: Bolt.new usa modelos avanzados (Claude, GPT-4) para interpretar tus instrucciones, generar código, instalar dependencias y corregir errores automáticamente.

### El flujo de trabajo

1. Describes lo que quieres en lenguaje natural: "Crea una app de gestión de tareas con React, Tailwind y SQLite, con autenticación y panel de administración."
2. Bolt.new genera la estructura del proyecto, instala dependencias y crea los archivos.
3. Puedes ver el resultado en tiempo real en una preview integrada.
4. Si algo falla o quieres cambios, describes lo que necesitas y Bolt.new modifica el código.
5. Cuando estás satisfecho, puedes desplegar con un clic en Netlify o descargar el código fuente.

## Por qué es interesante

### Velocidad de prototipado

Lo que antes tomaba días (configurar proyecto, instalar dependencias, escribir boilerplate, configurar base de datos), ahora toma **minutos**. Bolt.new es extraordinariamente útil para:

- **Validar ideas rápidamente**: ¿Tienes una idea para una app? En 10 minutos tienes un prototipo funcional.
- **Crear MVPs**: Para startups que necesitan demostrar un concepto a inversores.
- **Aprender**: Si estás aprendiendo React o Next.js, puedes pedirle que genere ejemplos y modificarlos.

### Limitaciones

- **No es para producción directa**: El código generado necesita revisión y refinamiento para usar en producción.
- **Proyectos complejos**: Para apps con lógica de negocio elaborada, necesitarás iterar mucho con los prompts.
- **Coste**: El uso intensivo puede requerir una suscripción de pago.

## Cómo construir algo similar con Claude Code

Si te inspira Bolt.new y quieres crear tu propio flujo de "prompt to app", puedes hacer algo parecido con **Claude Code** en tu terminal:

\`\`\`bash
# Claude Code puede crear proyectos completos desde una descripción
claude "Crea una app de notas con Next.js 14, Tailwind CSS y SQLite.
Debe tener: login con email/password, CRUD de notas con markdown,
búsqueda por texto y modo oscuro. Usa Drizzle ORM."
\`\`\`

Claude Code generará la estructura completa del proyecto, instalará las dependencias y creará todos los archivos necesarios. La diferencia es que se ejecuta en tu máquina local, tienes control total del código y no dependes de un servicio en la nube.

### Ventajas de Claude Code sobre Bolt.new

- **Ejecución local**: Tu código nunca sale de tu máquina.
- **Sin límites**: No hay restricciones de tokens ni de despliegues.
- **Personalización total**: Puedes integrar tu propio stack, librerías y configuraciones.
- **Iteración natural**: Trabajas en tu editor habitual (VS Code, Cursor, etc.).

Bolt.new brilla para prototipos rápidos y demos. Claude Code brilla para proyectos reales donde necesitas control total.`,
  },
  {
    slug: "cursor-rules",
    name: "Cursor Rules",
    tagline:
      "Reglas comunitarias para Cursor IDE que mejoran las respuestas de la IA.",
    category: "Herramientas dev",
    url: "https://github.com/PatrickJS/awesome-cursorrules",
    clonableWithCode: true,
    summary:
      "Cursor Rules es un repositorio colaborativo de reglas y configuraciones para el editor Cursor que optimizan las sugerencias de IA según el stack, el lenguaje o el framework que uses.\n\nEn lugar de aceptar respuestas genéricas, puedes cargar reglas específicas que contextualizan al modelo: \"usa Tailwind v4\", \"prefiere server components\", \"sigue el patrón repository\". Ideal para equipos que quieren estandarizar cómo la IA les ayuda.\n\nEl repositorio es comunitario, con cientos de contribuciones de desarrolladores que comparten las reglas que mejor les funcionan.",
    fullContent: `## Qué son las Cursor Rules

Cuando usas Cursor (el editor de código con IA integrada), el modelo de lenguaje que genera sugerencias y código no tiene contexto sobre **tu proyecto específico**: qué convenciones sigues, qué versiones de librerías usas, qué patrones arquitectónicos prefieres. Las Cursor Rules resuelven esto.

Son archivos de texto (\`.cursorrules\`) que se colocan en la raíz de tu proyecto y le dan al modelo instrucciones específicas sobre cómo debe comportarse al generar código para ese repositorio.

## Por qué importan

### El problema de las respuestas genéricas

Sin reglas, si le pides a Cursor "crea un componente de botón", podría generar:
- Código con CSS modules cuando tú usas Tailwind.
- Un componente de clase cuando tú usas hooks.
- Imports de React 17 cuando tú usas React 19.
- Client components cuando tú prefieres server components.

Con reglas bien definidas, el modelo sabe exactamente qué convenciones seguir, y el código generado se integra limpiamente con tu proyecto existente.

### Ejemplo de archivo .cursorrules

\`\`\`markdown
# Reglas para este proyecto

## Stack
- Next.js 15 con App Router
- TypeScript estricto
- Tailwind CSS v4
- Drizzle ORM con PostgreSQL
- Shadcn/ui para componentes

## Convenciones
- Usa server components por defecto. Solo usa "use client" cuando sea necesario.
- Los archivos de datos van en src/lib/
- Los componentes reutilizables en src/components/ui/
- Usa path aliases: @/components, @/lib, @/app
- Nombra los archivos en kebab-case
- Los tipos van en el mismo archivo que los usa, no en archivos separados

## Estilo de código
- Prefiere funciones arrow para componentes
- Usa async/await, nunca .then()
- Usa early returns para reducir anidamiento
- Siempre tipifica los props como type, no interface
- Los textos de usuario van en español con tildes correctas

## Prohibiciones
- NO uses any
- NO uses enum (usa as const)
- NO uses default exports excepto en pages
- NO uses CSS-in-JS ni CSS modules
\`\`\`

## El repositorio comunitario

[awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) es un repositorio comunitario donde desarrolladores comparten las reglas que mejor les funcionan, organizadas por tecnología:

- **React / Next.js**: Reglas para server components, streaming, convenciones de App Router.
- **Python / FastAPI**: Convenciones de tipado, estructura de proyectos, manejo de errores.
- **Rust**: Lifetime annotations, error handling, cargo conventions.
- **Go**: Estructura de paquetes, manejo de errores, convenciones de naming.
- **Mobile (Swift / Kotlin)**: Convenciones de iOS/Android.

## Cómo crear tus propias reglas

### Paso 1: Analiza tu proyecto

Revisa tu codebase existente y documenta:
- Qué librerías y versiones usas.
- Qué patrones arquitectónicos sigues (repository, service, controller, etc.).
- Qué convenciones de naming tienes.
- Qué cosas nunca haces (y quieres que la IA tampoco haga).

### Paso 2: Escribe las reglas

Crea un archivo \`.cursorrules\` en la raíz de tu proyecto. Sé específico: cuanto más contexto le des al modelo, mejores serán las sugerencias.

### Paso 3: Itera

Las reglas no son estáticas. A medida que uses Cursor y veas patrones que la IA genera incorrectamente, añade reglas para corregirlos. Con el tiempo, tu archivo se convierte en un documento vivo que captura las convenciones de tu equipo.

## Más allá de Cursor: reglas para cualquier asistente de IA

El concepto de "reglas para asistentes de IA" no es exclusivo de Cursor. Puedes aplicar la misma idea con:

- **Claude Code**: Usa archivos \`CLAUDE.md\` en tu proyecto con las mismas instrucciones.
- **GitHub Copilot**: Configura instrucciones en \`.github/copilot-instructions.md\`.
- **Prompts de sistema**: En cualquier chat con IA, pega tus reglas como contexto.

La clave es que **un modelo de IA con contexto específico genera código 10x mejor** que uno sin contexto. Las Cursor Rules son simplemente la forma más organizada de proporcionar ese contexto.`,
  },
  {
    slug: "screen-studio-alternativa",
    name: "OBS + IA como alternativa a Screen Studio",
    tagline:
      "Grabación de pantalla con auto-zoom y edición automática, sin pagar 89$.",
    category: "Productividad",
    url: "https://obsproject.com",
    clonableWithCode: true,
    summary:
      "Screen Studio es una app de Mac de 89$ que graba tu pantalla y automáticamente añade zoom en los clics, transiciones suaves y un acabado profesional a tus vídeos. Ideal para demos de producto y tutoriales.\n\nAhora, combinando OBS (grabación) con herramientas de post-procesado basadas en IA, puedes lograr un resultado similar sin coste. El flujo es más manual, pero los resultados son comparables.\n\nEste enfoque es especialmente interesante para creadores de contenido técnico que ya usan OBS y quieren mejorar la calidad de sus grabaciones sin cambiar de herramienta.",
    fullContent: `## Qué hace Screen Studio (y por qué cuesta 89$)

[Screen Studio](https://screenstudio.com) es una aplicación de grabación de pantalla para Mac que se hizo viral por una razón: produce vídeos que parecen editados profesionalmente de forma automática. Sus funciones estrella:

- **Auto-zoom**: Cuando haces clic en un elemento, el vídeo hace zoom suave hacia esa zona.
- **Cursor embellecido**: Suaviza el movimiento del ratón y añade un halo visual.
- **Fondos dinámicos**: Enmarca la grabación en un fondo con gradiente o wallpaper.
- **Exportación optimizada**: Genera vídeos en formatos ideales para Twitter, YouTube o Product Hunt.

El problema: cuesta 89$ (pago único), solo funciona en Mac y es código cerrado. Para muchos creadores, especialmente los que están empezando, es un gasto difícil de justificar.

## La alternativa open source: OBS + post-procesado con IA

### Paso 1: Grabar con OBS

[OBS Studio](https://obsproject.com) es el estándar de facto para grabación de pantalla y streaming. Es gratuito, open source y funciona en Windows, Mac y Linux.

#### Configuración óptima para demos de producto

\`\`\`
Resolución: 1920x1080 (o la nativa de tu pantalla)
FPS: 60 (suavidad) o 30 (menor tamaño)
Encoder: x264 o NVENC (si tienes GPU NVIDIA)
Formato: MKV (más resistente a corrupciones que MP4)
Bitrate: 6000-8000 kbps para buena calidad
\`\`\`

Configura una escena específica para demos:
1. Añade una fuente de "Captura de pantalla" o "Captura de ventana".
2. Opcionalmente, añade una webcam en una esquina (picture-in-picture).
3. Configura atajos de teclado para iniciar/detener grabación sin que se vea en pantalla.

### Paso 2: Post-procesado con FFmpeg

[FFmpeg](https://ffmpeg.org) es la navaja suiza del procesamiento de vídeo. Puedes usarla para automatizar varias mejoras:

\`\`\`bash
# Recortar el vídeo (quitar los bordes del escritorio)
ffmpeg -i grabacion.mkv -vf "crop=1600:900:160:90" recortado.mp4

# Añadir fondo con gradiente
ffmpeg -i recortado.mp4 -vf "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#1a1a2e" con-fondo.mp4

# Suavizar el cursor (reducir sacudidas)
ffmpeg -i grabacion.mkv -vf "minterpolate=fps=60:mi_mode=mci" suavizado.mp4

# Combinar todo en un pipeline
ffmpeg -i grabacion.mkv \\
  -vf "crop=1600:900:160:90,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#0f0f23,minterpolate=fps=60" \\
  -c:v libx264 -crf 18 -preset slow \\
  resultado_final.mp4
\`\`\`

### Paso 3: Auto-zoom con scripts de IA

Esta es la parte más avanzada. Para replicar el auto-zoom de Screen Studio, necesitas detectar dónde ocurren los clics y generar keyframes de zoom. Hay varias opciones emergentes:

1. **Grabar los eventos del ratón** junto con el vídeo y usar un script de Python para generar los keyframes de zoom.
2. **Usar herramientas de detección de actividad** que analizan el vídeo y encuentran las zonas de interés.
3. **Scripts de FFmpeg con zoompan** para crear efectos de zoom programáticos.

\`\`\`bash
# Ejemplo: zoom gradual hacia una zona específica
ffmpeg -i video.mp4 -vf "zoompan=z='min(zoom+0.002,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'" -c:v libx264 zoom.mp4
\`\`\`

### Alternativas emergentes dedicadas

Además del enfoque manual con OBS + FFmpeg, están apareciendo herramientas open source que intentan replicar Screen Studio directamente:

- **Cap**: Grabador de pantalla open source con edición básica y compartición instantánea.
- **Screenity**: Extensión de Chrome para grabar la pantalla con anotaciones.
- **Kooha**: Grabador de pantalla para Linux con interfaz limpia.

## Cómo automatizarlo con Claude Code

Puedes crear un script que automatice todo el pipeline de post-procesado:

\`\`\`bash
claude "Crea un script en bash que tome un vídeo de grabación de pantalla
y le aplique: recorte centrado al 80%, fondo con gradiente oscuro,
suavizado a 60fps, y un efecto de zoom sutil en los primeros 3 segundos.
Usa FFmpeg. El script debe recibir el archivo de entrada como argumento
y generar el resultado en la misma carpeta con sufijo '_procesado'."
\`\`\`

El resultado no será tan pulido como Screen Studio con un clic, pero para la mayoría de demos de producto y tutoriales, es más que suficiente. Y lo mejor: es gratuito, funciona en cualquier sistema operativo y tienes control total del proceso.`,
  },
  {
    slug: "languine",
    name: "Languine",
    tagline:
      "Traduce tu app a 100 idiomas con un solo comando usando IA.",
    category: "i18n / Localización",
    url: "https://languine.ai",
    clonableWithCode: false,
    summary:
      "La internacionalización (i18n) es una de las tareas más tediosas del desarrollo de software: extraer cadenas, enviarlas a traductores, mantener archivos sincronizados, manejar plurales y contexto. Languine lo automatiza completamente.\n\nEjecuta un comando, y Languine analiza el contexto de cada cadena en tu código para producir traducciones naturales en más de 100 idiomas. Soporta JSON, YAML, .po y más.\n\nSe integra en tu pipeline de CI/CD para que las traducciones se actualicen automáticamente con cada deploy.",
    fullContent: `## El dolor de la internacionalización

Si alguna vez has tenido que traducir una aplicación, sabes lo tedioso que es el proceso:

1. **Extraer cadenas**: Reemplazar todos los textos hardcodeados por claves de traducción.
2. **Crear archivos de idioma**: Un archivo JSON/YAML por cada idioma soportado.
3. **Traducir**: Enviar los archivos a traductores humanos o usar Google Translate (con resultados mediocres).
4. **Mantener sincronizado**: Cada vez que añades una nueva cadena, tienes que actualizar TODOS los archivos de idioma.
5. **Manejar plurales y contexto**: "1 item" vs "2 items", formatos de fecha, moneda, etc.

Para una app con 500 cadenas de texto y soporte para 10 idiomas, estamos hablando de gestionar **5.000 traducciones** que deben mantenerse sincronizadas con cada cambio en el código.

## Qué hace Languine

[Languine](https://languine.ai) automatiza todo este proceso usando modelos de lenguaje avanzados. La diferencia clave con un simple "pegar en Google Translate" es que Languine **entiende el contexto** de cada cadena:

- Sabe que "Save" en un botón de formulario es "Guardar", pero "Save" en un contexto de descuentos es "Ahorro".
- Entiende formatos de pluralización de cada idioma (en árabe hay 6 formas de plural).
- Mantiene la consistencia terminológica a lo largo de toda la app.
- Respeta las variables y los placeholders: \`{name} tiene {count} mensajes\` se traduce correctamente manteniendo las variables intactas.

## Cómo funciona

### Instalación

\`\`\`bash
npm install -g languine
# o
pnpm add -g languine
\`\`\`

### Configuración

Crea un archivo \`languine.config.ts\` en la raíz de tu proyecto:

\`\`\`typescript
export default {
  locale: {
    source: "es",      // Idioma fuente
    targets: [         // Idiomas destino
      "en", "fr", "de", "pt", "it",
      "ja", "ko", "zh", "ar", "hi"
    ],
  },
  files: {
    json: {
      include: ["src/locales/[locale].json"],
    },
  },
};
\`\`\`

### Uso

\`\`\`bash
# Traducir todas las cadenas nuevas o modificadas
languine translate

# Traducir a un idioma específico
languine translate --locale fr

# Ver qué cadenas necesitan traducción
languine status
\`\`\`

Languine detecta automáticamente qué cadenas son nuevas o han cambiado desde la última traducción, y solo traduce esas. No retraduce todo el archivo cada vez.

## Formatos soportados

Languine soporta los formatos más comunes de i18n:

| Formato | Frameworks | Ejemplo |
|---|---|---|
| JSON | React (i18next), Vue (vue-i18n), Next.js | \`es.json\` |
| YAML | Ruby on Rails, Laravel | \`es.yml\` |
| .po / .pot | WordPress, Django, Gettext | \`es.po\` |
| .xliff | iOS (Xcode), Android | \`es.xliff\` |
| .properties | Java (Spring) | \`messages_es.properties\` |
| .strings | iOS nativo | \`Localizable.strings\` |

## Integración con CI/CD

La verdadera potencia de Languine aparece cuando lo integras en tu pipeline de CI/CD:

\`\`\`yaml
# GitHub Actions - .github/workflows/translate.yml
name: Translate
on:
  push:
    branches: [main]
    paths:
      - 'src/locales/es.json'  # Solo cuando cambia el idioma fuente

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install -g languine
      - run: languine translate
      - uses: peter-evans/create-pull-request@v6
        with:
          title: "Actualizar traducciones"
          body: "Traducciones generadas automáticamente por Languine"
\`\`\`

Con esta configuración, cada vez que un desarrollador modifica el archivo de español (el idioma fuente), se dispara automáticamente la traducción a los 10 idiomas configurados y se crea un Pull Request con los cambios.

## Calidad de las traducciones

La pregunta obvia es: ¿son buenas las traducciones generadas por IA? La respuesta corta: **sorprendentemente buenas para la mayoría de casos**.

- **Textos de interfaz** (botones, menús, mensajes de error): Calidad excelente, comparable a traducción humana.
- **Textos de marketing**: Buena calidad, aunque puede beneficiarse de una revisión humana para el tono.
- **Textos técnicos o legales**: Funciona como borrador, pero necesita revisión profesional.

Para la mayoría de aplicaciones SaaS, las traducciones de Languine son suficientes para lanzar en nuevos mercados rápidamente. Puedes iterar y mejorar traducciones específicas después, en lugar de esperar meses a tener todo perfecto.

## El ROI de la automatización

Pensemos en números. Para una app con 500 cadenas y 10 idiomas:

- **Traducción humana profesional**: ~0.08$/palabra × 2.000 palabras × 10 idiomas = **1.600$** por ronda de traducciones.
- **Languine**: Coste de la API de IA (~5-20$ por ronda) + la suscripción de Languine.
- **Tiempo ahorrado**: De semanas (coordinando traductores) a minutos (un comando).

Para startups y proyectos independientes, la diferencia es abismal. Languine no reemplaza a traductores humanos en todos los casos, pero para el 90% de las necesidades de i18n de una app, es más que suficiente.`,
  },
  {
    slug: "inbox-zero",
    name: "Inbox Zero",
    tagline:
      "Cliente de email open source con IA que categoriza, desuscribe y gestiona tu bandeja.",
    category: "Email / Productividad",
    url: "https://github.com/elie222/inbox-zero",
    clonableWithCode: true,
    summary:
      "El email sigue siendo una de las mayores fuentes de distracción y estrés digital. La persona promedio recibe más de 120 emails al día, y gestionar esa bandeja consume horas de trabajo productivo.\n\nInbox Zero es un cliente de correo electrónico open source que usa IA para alcanzar el mítico \"bandeja vacía\": auto-categoriza correos, identifica suscripciones innecesarias y te permite desuscribirte con un clic.\n\nAl ser open source, puedes alojarlo tú mismo y mantener tus datos de email completamente privados, algo que ninguna alternativa propietaria ofrece.",
    fullContent: `## El problema del email moderno

La persona promedio recibe **más de 120 emails al día**. De esos, solo una fracción requiere acción real. El resto son newsletters, notificaciones automáticas, emails de marketing, confirmaciones de compra y spam que sobrevivió al filtro.

El resultado: pasamos **28% de nuestra jornada laboral** gestionando email (según McKinsey). No leyendo emails importantes, sino clasificando, borrando y buscando entre el ruido.

Las soluciones existentes (Gmail, Outlook, Superhuman, Hey) intentan resolver esto, pero todas tienen el mismo problema: **tus datos de email están en sus servidores**. Para una herramienta que literalmente lee todo tu correo, la privacidad debería ser la prioridad número uno.

## Qué hace Inbox Zero

[Inbox Zero](https://github.com/elie222/inbox-zero) es un cliente de email open source que aplica IA para automatizar la gestión de tu bandeja. Sus funciones principales:

### Auto-categorización inteligente

Inbox Zero clasifica automáticamente cada email en categorías:
- **Requiere acción**: Emails que necesitan una respuesta o tarea tuya.
- **Informativo**: Emails que debes leer pero no requieren acción.
- **Newsletter**: Boletines y contenido suscrito.
- **Marketing**: Emails promocionales.
- **Notificaciones**: Alertas automáticas de servicios.

La clasificación no es por reglas estáticas, sino por **comprensión semántica**: el modelo de IA lee el contenido y entiende la intención del email.

### Desuscripción masiva

Inbox Zero escanea tu bandeja, identifica todas las newsletters y listas de correo a las que estás suscrito, y te muestra una lista unificada. Con un clic puedes desuscribirte de cada una. Es como Unroll.me, pero open source y sin vender tus datos.

### Respuestas sugeridas

Para emails que requieren respuesta, Inbox Zero genera borradores basados en el contexto de la conversación y tu historial de respuestas. No envía nada automáticamente: te muestra el borrador y tú decides si enviarlo, editarlo o descartarlo.

### Reglas automatizadas

Puedes crear reglas en lenguaje natural:
- "Archiva automáticamente los emails de GitHub que sean solo notificaciones de CI".
- "Marca como importante cualquier email de un cliente con la palabra 'urgente'".
- "Responde automáticamente a solicitudes de reunión con mi disponibilidad".

## Cómo instalarlo

### Opción 1: Usar la versión hospedada

La forma más rápida es usar [getinboxzero.com](https://getinboxzero.com), la versión hospedada por los creadores. Conectas tu cuenta de Gmail y empiezas a usarlo inmediatamente.

### Opción 2: Self-hosting

Si prefieres mantener tus datos bajo tu control:

\`\`\`bash
# Clonar el repositorio
git clone https://github.com/elie222/inbox-zero.git
cd inbox-zero

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Google OAuth,
# API key de OpenAI/Anthropic, y base de datos

# Instalar dependencias y ejecutar
pnpm install
pnpm dev
\`\`\`

Necesitarás:
- **Google OAuth credentials**: Para conectarte a Gmail.
- **API key de IA**: OpenAI o Anthropic, para la clasificación y las respuestas.
- **Base de datos**: PostgreSQL para almacenar las preferencias y el historial.

## La arquitectura

Inbox Zero está construido con un stack moderno:

- **Frontend**: Next.js con App Router y Tailwind CSS.
- **Backend**: Next.js API Routes + tRPC.
- **Base de datos**: Prisma ORM con PostgreSQL.
- **IA**: SDK de OpenAI (compatible con cualquier proveedor que use la misma API).
- **Email**: Google Gmail API para lectura y envío.

## Cómo construir algo similar con Claude Code

Si Inbox Zero te inspira y quieres crear tu propia herramienta de gestión de email con IA, puedes empezar con un clasificador:

\`\`\`bash
claude "Crea un script en TypeScript que se conecte a Gmail via API,
lea los últimos 50 emails no leídos, y use la API de Claude para
clasificar cada uno en: acción, informativo, newsletter, marketing
o notificación. Muestra el resultado en una tabla en la terminal.
Usa @google-cloud/local-auth para la autenticación."
\`\`\`

Desde ahí puedes ir añadiendo funcionalidades: desuscripción automática, respuestas sugeridas, reglas en lenguaje natural. La base es siempre la misma: leer email + clasificar con IA + actuar según la clasificación.

## Privacidad: por qué importa que sea open source

Tu email contiene información extraordinariamente sensible: contraseñas de recuperación, facturas, conversaciones personales, datos médicos, información financiera. Confiar todo esto a un servicio propietario que "lee tu email para ayudarte" requiere una confianza enorme.

Con Inbox Zero self-hosted:
- **Tus emails nunca tocan servidores de terceros** (excepto la API de IA para clasificación, que puedes reemplazar con un modelo local).
- **Puedes auditar el código** y verificar exactamente qué hace con tus datos.
- **No hay modelo de negocio basado en tus datos**: Es open source, no necesita monetizar tu información.

Para cualquiera que se tome en serio la privacidad de su email, Inbox Zero self-hosted es actualmente la mejor opción disponible.`,
  },
];

export function getNovedadBySlug(slug: string): Novedad | undefined {
  return novedades.find((n) => n.slug === slug);
}

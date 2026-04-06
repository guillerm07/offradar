import postgres from "postgres";
import https from "https";
import fs from "fs";
import path from "path";

const DB_URL = "postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar";
const GEMINI_KEY = fs.readFileSync("/Users/guillermodelpinohernandez/Documents/offroad/.gemini-key", "utf8").trim();
const IMG_DIR = "/Users/guillermodelpinohernandez/Documents/offroad/apps/web/public/images/projects";

const sql = postgres(DB_URL);

async function generateImage(prompt, filename) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_KEY}`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: `Generate an image: ${prompt}` }] }],
    generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
  });
  return new Promise((resolve) => {
    const timeout = setTimeout(() => { resolve(null); }, 60000);
    const req = https.request(url, { method: "POST", headers: { "Content-Type": "application/json" }, timeout: 60000 }, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        clearTimeout(timeout);
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
    req.on("timeout", () => { req.destroy(); clearTimeout(timeout); resolve(null); });
    req.on("error", () => { clearTimeout(timeout); resolve(null); });
    req.write(body);
    req.end();
  });
}

const projects = [
  // 1. Clawd Mochi
  {
    source: "github", source_id: "yousifamanuel/clawd-mochi", url: "https://github.com/yousifamanuel/clawd-mochi",
    name: "Clawd Mochi", stars: 2400, language: "C++", author: "yousifamanuel", category_id: 2,
    difficulty: "medio", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["hardware", "esp32", "claude", "iot", "diy", "open-source"],
    seo_slug: "clawd-mochi-cangrejito-claude-esp32",
    seo_title: "Clawd Mochi: El cangrejito con ESP32 que te muestra a Claude trabajando en tu escritorio",
    seo_description: "Clawd Mochi es un compañero físico de Claude impreso en 3D con ESP32, pantalla animada y control desde el móvil. Se ensambla en menos de una hora.",
    summary_es: `Clawd Mochi es un compañero físico para Claude en forma de cangrejito de escritorio. Combina una pieza impresa en 3D, un microcontrolador ESP32 y una pantalla animada para convertir a tu asistente de IA en una figura tangible que vive sobre tu mesa. Cuando Claude piensa, escribe o termina una tarea, Clawd Mochi reacciona con caritas, animaciones y mensajes en su pequeña pantalla.

## Qué resuelve un cangrejito en el escritorio

Pasamos horas esperando a que agentes de IA completen tareas. Miramos el terminal fijamente, revisamos notificaciones, cambiamos de ventana. Clawd Mochi traslada ese ciclo de atención al mundo físico: ves de reojo la pantalla del cangrejo y sabes si Claude está trabajando, esperando tu input o bloqueado. Es una sonda de estado ambiental, no una herramienta de productividad pura.

## Qué lleva dentro

### Hardware
- **ESP32** como cerebro, con Wi-Fi y Bluetooth integrados
- **Pantalla pequeña** para mostrar caritas animadas, un terminal en miniatura y un canvas para dibujar
- **Carcasa impresa en 3D** con forma de cangrejo (los archivos STL están en el repo)
- **Componentes comunes**: cables, batería opcional, botón de encendido

### Software
- Firmware open source que corre en el ESP32
- Aplicación de control desde el móvil mediante Bluetooth o red local
- Integración con los estados de Claude Code y otros agentes

## Cómo se ensambla

El repositorio documenta el proceso paso a paso. La promesa del creador es que se arma en menos de una hora si ya tienes a mano una impresora 3D y componentes electrónicos básicos. El firmware se carga desde un entorno Arduino o PlatformIO estándar, sin herramientas propietarias.

## Cosas que puedes hacer

- Ver caritas que cambian cuando Claude está trabajando, preguntando o libre
- Mostrar un terminal en vivo con las últimas líneas de output
- Dibujar en el canvas desde el móvil
- Personalizar las animaciones con tus propios sprites
- Usarlo como reloj ambiental cuando no hay tareas activas

## Limitaciones honestas

- Necesitas una impresora 3D o pagar un servicio de impresión externa
- Requiere conocimientos básicos de electrónica y soldadura ligera
- La pantalla es pequeña: no es para sustituir tu terminal, sino para complementarlo
- La duración de la batería depende del caso: conectado por USB no hay problema, portátil depende del modelo que elijas
- Es un juguete de hacker, no un producto pulido: espera bugs y tendrás que poner tu granito de arena

## Por qué llama la atención

En un ecosistema saturado de apps, dashboards y notificaciones digitales, Clawd Mochi regresa lo físico al workflow de un desarrollador. Es el tipo de proyecto DIY que te recuerda por qué entraste a esto: hacer cosas con las manos, aprender un poco de hardware y terminar con un objeto que te saca una sonrisa cada vez que lo miras.`,
    image_prompt: "Cute 3D printed crab desktop companion with animated LED screen showing happy faces, ESP32 microcontroller visible, tech desk setup with terminal output, dark purple background, violet accents, professional",
  },

  // 2. Notchy
  {
    source: "github", source_id: "adamlyttleapps/notchy", url: "https://github.com/adamlyttleapps/notchy",
    name: "Notchy", stars: 3200, language: "Swift", author: "adamlyttleapps", category_id: 2,
    difficulty: "medio", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["macos", "swift", "claude", "notch", "menubar", "productividad"],
    seo_slug: "notchy-notch-macbook-claude-terminal",
    seo_title: "Notchy: El notch de tu MacBook se convierte en un terminal vivo para Claude",
    seo_description: "Notchy reconvierte el notch del MacBook en un indicador de estado de Claude con sonidos, pausa automática de sleep e integración nativa con Xcode.",
    summary_es: `Notchy es una aplicación para macOS que transforma el notch del MacBook en un indicador vivo del estado de Claude Code y otros agentes de IA. En vez de mirar fijamente el terminal esperando a que el agente termine, ves en la muesca superior de la pantalla exactamente qué está haciendo: si necesita tu input, si está pensando o si acabó la tarea.

## El problema real que resuelve

Cuando corres un agente de IA durante minutos o incluso horas, necesitas saber cuándo requiere tu atención. Las opciones tradicionales son insuficientes: las notificaciones del sistema se acumulan y desaparecen, el Dock no da contexto suficiente y revisar el terminal constantemente mata tu concentración. Notchy convierte esa zona de píxeles muertos del notch en el único lugar donde siempre puedes ver el estado de tu agente con un solo vistazo.

## Qué hace

### Indicador de estado permanente
Mientras Claude trabaja, el notch muestra un indicador sutil pero claro. Cuando necesita tu input, cambia de color o animación. Cuando termina, te avisa con un sonido audible.

### Evita que el Mac se duerma
Mientras el agente está ejecutándose, Notchy impide que el sistema entre en modo reposo. Se acabó volver al ordenador y encontrar que la tarea de IA se detuvo a medio camino porque macOS decidió dormirse.

### Integración nativa con Xcode
Para desarrolladores iOS/macOS, Notchy añade capas extra:

- **Apertura automática de tabs**: detecta archivos que Claude modifica y los abre en Xcode
- **Detección de claude.md**: reconoce archivos de configuración de Claude y los trata de forma especial
- **Snapshots con Cmd+S**: al guardar, captura el estado del proyecto para poder revertir

### Sonidos contextuales
Diferentes sonidos para diferentes eventos: uno cuando termina, otro cuando necesita input, otro cuando falla. Puedes seguir trabajando en otra ventana sin perder el hilo.

## Stack técnico

- **Lenguaje**: Swift nativo
- **Plataforma**: macOS (requiere notch, o sea MacBook Pro M1/M2/M3/M4 o similares)
- **Licencia**: open source
- **Instalación**: clonar el repo, abrir en Xcode, compilar y ejecutar

## Para quién es

- Desarrolladores que usan Claude Code, Cursor u otros agentes de IA a diario
- Usuarios de MacBook con notch que querían darle una utilidad real
- Makers iOS que viven dentro de Xcode y quieren integración fluida
- Cualquiera que se haya quedado mirando el terminal esperando a que un agente termine

## Limitaciones honestas

- Solo funciona en MacBooks con notch (no sirve en iMacs ni MacBooks antiguos)
- Requiere permisos del sistema para impedir el sleep
- La integración con Xcode es específica: si trabajas con otros editores, sacas menos partido
- Necesitas Xcode para compilar e instalar: no hay instalador precompilado por el momento
- Todavía en desarrollo activo: alguna función puede cambiar

## Por qué importa

Notchy es uno de esos proyectos que te hacen pensar "cómo no existía esto ya". El notch del MacBook fue polémico desde el día uno, y durante años ha sido solo espacio muerto. Notchy demuestra que con una buena idea y algo de Swift se puede convertir un problema estético en una herramienta útil de verdad.`,
    image_prompt: "MacBook notch displaying a live terminal with status indicators, colorful activity display integrated into the display cutout, clean macOS interface, Xcode in background, dark purple background, violet accents, professional",
  },

  // 3. The One File
  {
    source: "github", source_id: "gelatinescreams/The-One-File", url: "https://github.com/gelatinescreams/The-One-File",
    name: "The One File", stars: 1600, language: "JavaScript", author: "gelatinescreams", category_id: 8,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["html", "offline-first", "portable", "diagramas", "encriptacion", "single-file"],
    seo_slug: "the-one-file-diagramas-html-portable",
    seo_title: "The One File: Diagramas de red y smart homes en un único HTML portable y encriptado",
    seo_description: "The One File guarda nodos, conexiones y datos dentro de un único archivo HTML offline, encriptado y portable. Ideal para infraestructuras y mapas de red.",
    summary_es: `The One File es una herramienta radicalmente simple con una promesa radical: todo lo que dibujes (nodos, conexiones, metadatos y hasta imágenes) vive dentro de un único archivo HTML. Ese archivo funciona offline, se puede encriptar con contraseña y lo puedes enviar por correo, guardar en Dropbox o llevar en un USB. Donde vaya el archivo, va tu diagrama completo.

## Qué problema ataca

Las herramientas para diagramar redes, smart homes e infraestructuras suelen caer en dos extremos. Por un lado están los SaaS cloud (Lucidchart, Miro, draw.io online) que exigen conexión y cuenta, y almacenan tus datos en servidores ajenos. Por otro están las herramientas pesadas de escritorio (Visio, OmniGraffle) que cuestan dinero, generan archivos propietarios y no son portables. The One File elimina esa disyuntiva: un HTML autónomo que abre cualquier navegador moderno.

## Cómo funciona

### Un único archivo HTML
Todo el estado del diagrama (nodos, aristas, posiciones, estilos, metadatos, incluso imágenes embebidas en base64) vive dentro del mismo archivo. No hay base de datos externa, no hay JSON aparte, no hay archivos de configuración. Abres el HTML, editas y guardas.

### Offline-first de verdad
No necesita servidor. No hace llamadas a APIs externas. Puedes trabajar en un avión, en un búnker o sin Wi-Fi, y todo funciona igual.

### Encriptación opcional
Si tu diagrama contiene información sensible (topología de red interna, credenciales anotadas, layout de una smart home), puedes proteger el archivo con contraseña. Al abrirlo, el navegador pide la clave antes de descifrar el contenido.

### Animaciones y estilo
No es un PDF estático. Los nodos y conexiones se animan, hay layouts dinámicos y puedes aplicar temas visuales distintos.

### Portabilidad extrema
Enviar un diagrama a un compañero es arrastrar un HTML al correo. Versionarlo es hacer copias o usar Git. Hacer backup es copiar el archivo. No hay nada más portable que esto.

## Casos de uso ideales

- **Mapas de red corporativa** que necesitan quedarse offline por políticas de seguridad
- **Diagramas de smart homes** con dispositivos, zonas y automatizaciones
- **Infraestructuras cloud** con servicios, conexiones y dependencias
- **Arquitecturas de software** que viven junto al código en el repo
- **Dossiers de investigación** con entidades y relaciones entre ellas

## Limitaciones honestas

- No es colaborativo en tiempo real: si dos personas editan el mismo archivo, hay conflicto
- El tamaño del archivo crece rápido si embebes muchas imágenes
- No reemplaza herramientas especializadas en diagramas UML o BPMN
- El autor trabaja en solitario: la cadencia de mejoras depende de su disponibilidad
- Sin sincronización cloud nativa (si la quieres, la haces con Git o Dropbox tú mismo)

## Por qué es interesante

The One File representa una filosofía que está resurgiendo: aplicaciones locales, sin cuentas, sin suscripciones, sin lock-in. Un archivo que puedes leer dentro de diez años con cualquier navegador. En un mundo donde todo quiere ser SaaS, esta simplicidad se siente casi disidente.`,
    image_prompt: "Single HTML file containing an interactive network diagram with animated nodes and connections, offline portability concept, encrypted padlock icon, dark purple background, violet accents, professional",
  },

  // 4. Kanba
  {
    source: "github", source_id: "Kanba-co/kanba", url: "https://github.com/Kanba-co/kanba",
    name: "Kanba", stars: 4200, language: "TypeScript", author: "Kanba-co", category_id: 3,
    difficulty: "medio", interest_score: 89, is_oss_alternative: true, alternative_to: "Trello",
    tags: ["kanban", "nextjs", "supabase", "self-hosted", "indie-hacker", "productividad"],
    seo_slug: "kanba-trello-open-source-nextjs-supabase",
    seo_title: "Kanba: El Trello open source construido con Next.js y Supabase para indie hackers",
    seo_description: "Kanba es una alternativa open source a Trello: kanban ligero, proyectos ilimitados, dark mode, self-hosted e integración con Stripe para monetizar.",
    summary_es: `Kanba es una alternativa open source y self-hosted a Trello construida con Next.js, Supabase y Tailwind CSS. Está diseñada para makers e indie hackers que quieren una herramienta kanban rápida, sin bloat y sin vendor lock-in, con la opción añadida de monetizarla ellos mismos gracias a la integración con Stripe incorporada de serie.

## Por qué otra herramienta Kanban

Trello fue revolucionario en su momento pero hoy se siente viejo, lento y cada vez más cargado de features que nadie pidió. Las alternativas modernas (Linear, Notion, ClickUp) son potentes pero complejas, caras y dependen de servidores ajenos. Kanba se posiciona en el hueco intermedio: moderno, rápido, self-hosted, y abierto.

## Qué trae de serie

### Kanban ultraligero
Columnas, tarjetas, drag and drop fluido. Sin animaciones innecesarias, sin panel lateral gigante, sin distracciones. Carga instantánea y la interacción se siente nativa.

### Proyectos ilimitados
No hay planes de suscripción que te limiten a 3 proyectos. Si lo montas en tu servidor, creas tantos tableros como quieras.

### Drag and drop que vuela
La experiencia de arrastrar tarjetas entre columnas está optimizada para sentirse instantánea incluso con cientos de tarjetas.

### Dark mode nativo
El dark mode no es un retoque: está pensado desde el diseño. Se ve igual de bien en ambos modos.

### Self-hosted con Supabase
Despliegas en tu infraestructura. Los datos se guardan en tu base de datos Supabase (o en tu Postgres propio). Eres el único dueño de la información.

### Integración con Stripe
Si quieres convertir tu instancia en un SaaS para vender a otros, ya tienes el plumbing listo. Planes, suscripciones, facturación: todo cableado.

## Stack técnico

- **Frontend**: Next.js con React Server Components
- **Backend**: Supabase (Postgres, Auth, Realtime)
- **Estilos**: Tailwind CSS
- **Pagos**: Stripe
- **Autenticación**: Supabase Auth (email, GitHub, Google)

## Para quién tiene sentido

### Indie hackers y makers
Quieres una herramienta propia para gestionar tus proyectos sin pagar a Trello o Linear. Kanba es tuya, la instalas y la adaptas.

### Equipos pequeños
Un equipo de tres a diez personas que necesitan coordinarse sin el peso de Jira ni la complejidad de Linear.

### Emprendedores que quieren clonar Trello
La base está hecha. Tú le pones el branding, ajustas features, conectas Stripe y lanzas tu propio producto.

### Estudiantes de Next.js
El código es un buen ejemplo de una aplicación real con Next.js + Supabase bien arquitecturada.

## Limitaciones honestas

- No hay app móvil nativa: funciona en el navegador del móvil
- Menos features avanzadas que Jira o Linear (automatizaciones complejas, reports profundos)
- Requiere configurar tu propia instancia de Supabase
- El proyecto es joven: algunas integraciones avanzadas aún no existen
- Si no quieres self-hostear, tienes que esperar una versión cloud oficial

## Por qué importa

Trello fue comprado por Atlassian, Airtable se volvió caro, Notion añade peso cada semana. Kanba representa la otra respuesta: herramientas sencillas, abiertas y controladas por el usuario. Si tienes un servidor, puedes tener tu propio Trello pagando cero euros al mes.`,
    image_prompt: "Clean Kanban board interface with draggable cards across columns, dark mode design, Next.js and Supabase branding, modern startup productivity tool, dark purple background, violet accents, professional",
  },

  // 5. Mex
  {
    source: "github", source_id: "theDakshJaitly/mex", url: "https://github.com/theDakshJaitly/mex",
    name: "Mex", stars: 2100, language: "TypeScript", author: "theDakshJaitly", category_id: 2,
    difficulty: "medio", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["ai-agents", "cli", "memoria", "claude", "cursor", "codebase"],
    seo_slug: "mex-memoria-agentes-codebase",
    seo_title: "Mex: Memoria persistente para agentes de IA con un skill graph vivo de tu codebase",
    seo_description: "Mex es un CLI open source que crea un skill graph de tu código con ROUTER.md inteligente para que Claude, Cursor y otros agentes no olviden tu arquitectura.",
    summary_es: `Mex es un CLI y sistema de scaffolding open source que resuelve el problema más silencioso de los agentes de IA de programación: cada sesión empieza en blanco. Cursor, Claude Code, Windsurf, Cline y todos los demás pierden el contexto de tu codebase cada vez que abres una nueva conversación. Mex crea un skill graph vivo de tu repositorio y un ROUTER.md inteligente que el agente puede consultar para no olvidar tus decisiones, tus convenciones y la arquitectura que ya construiste.

## El problema del "drift" en agentes de IA

Cada vez que arrancas una sesión nueva con Claude Code o Cursor, el agente:

- No recuerda las convenciones de nombres que decidiste hace tres semanas
- No sabe qué patrones arquitectónicos ya estableciste
- Redescubre desde cero qué módulos existen y cómo se relacionan
- Puede sugerir refactorizaciones que contradicen decisiones previas

Este fenómeno se llama "drift" y hace que cada sesión sea una lucha por re-explicarle al agente lo que ya sabía ayer. El resultado: gastas tokens innecesarios, la consistencia cae y el código acumula fricciones.

## Qué hace Mex

### Skill graph del codebase
Mex analiza tu repositorio y genera un grafo de "skills" (habilidades, módulos, componentes) con sus relaciones. Cada nodo describe qué hace, cómo se usa y con qué otros nodos se conecta. Es un mapa vivo del código.

### ROUTER.md inteligente
Un archivo central que el agente lee al inicio de cada sesión. ROUTER.md dirige al agente hacia los archivos y decisiones relevantes según lo que el usuario pida. No es documentación estática: es un router que indica "para esta tarea, lee estos archivos".

### Archivos conectados por YAML
Cada componente o skill se describe con un YAML que declara dependencias, APIs expuestas, convenciones propias y ejemplos de uso. El agente puede navegar el grafo siguiendo estas relaciones.

### Detección de drift automática
Mex detecta cuando el código diverge de las convenciones documentadas y lo reporta. Si decidiste que todos los handlers se llaman "handleX" y aparece un "doX", Mex te lo señala.

### Auto-corrección
Puede sugerir cambios o incluso aplicarlos para devolver el código a las convenciones pactadas.

## Cómo se integra en tu flujo

1. Instalas el CLI de Mex en tu proyecto
2. Ejecutas el scaffold inicial: analiza el repo y genera el skill graph + ROUTER.md
3. Tus agentes leen estos artefactos al iniciar cada sesión
4. Cuando haces cambios importantes, Mex actualiza el grafo
5. El agente siempre arranca con el contexto completo

## Beneficios medibles

- **Menos tokens consumidos**: el agente no tiene que releer todo el código cada vez
- **Mayor consistencia**: se respetan las convenciones entre sesiones
- **Menos drift**: las desviaciones se detectan antes de acumularse
- **Onboarding más rápido**: incluso nuevos devs usan el ROUTER.md

## Limitaciones honestas

- Requiere un esfuerzo inicial para anotar correctamente el skill graph
- La calidad del router depende de cuánto cuides las descripciones YAML
- En monorepos gigantes puede tardar en generar el grafo completo
- No sustituye tests ni revisiones humanas: es un asistente, no un guardián
- Todavía es joven: algunas integraciones con agentes específicos están en desarrollo

## Por qué importa

La siguiente gran frontera de los agentes de IA no es el modelo más listo, sino el contexto mejor servido. Mex ataca exactamente ese problema y lo hace de una forma abierta, reproducible y sin lock-in. Si trabajas a diario con agentes de IA en codebases medianas o grandes, merece la pena probarlo.`,
    image_prompt: "Codebase skill graph visualization with interconnected nodes, ROUTER.md file at center, AI agents reading context, YAML configuration files, dark purple background, violet accents, professional",
  },

  // 6. HoloVox
  {
    source: "github", source_id: "amal-sajeev/Holovox", url: "https://github.com/amal-sajeev/Holovox",
    name: "HoloVox", stars: 1400, language: "Python", author: "amal-sajeev", category_id: 8,
    difficulty: "medio", interest_score: 87, is_oss_alternative: true, alternative_to: "Audible",
    tags: ["audiolibros", "whisper", "offline", "karaoke", "transcripcion", "local-first"],
    seo_slug: "holovox-audiolibros-transcripcion-whisper-local",
    seo_title: "HoloVox: Reproductor de audiolibros con transcripción en vivo local con Whisper",
    seo_description: "HoloVox reproduce audiolibros con transcripción 100% local en tiempo real usando Whisper y modo karaoke que resalta cada palabra. Todo offline y open source.",
    summary_es: `HoloVox es un reproductor de audiolibros diseñado con una interfaz cuidada y una característica poco común en el mercado: transcripción en vivo 100% local usando Whisper. Escuchas el audiolibro mientras ves en pantalla cada palabra resaltarse en sincronía, como un karaoke, sin enviar nada a la nube.

## El problema con los audiolibros actuales

Los reproductores de audiolibros mainstream (Audible, Kobo, Libby) son cajas cerradas con limitaciones serias para quien consume mucho audio:

- No transcriben: si no escuchas bien una frase, tienes que rebobinar
- No están pensados para estudiar: no puedes buscar pasajes por texto
- Dependen de su ecosistema: los DRMs te atan
- No son accesibles del todo: personas con dificultades auditivas quedan fuera

HoloVox resuelve estos problemas con una idea simple: transcribir localmente con un buen modelo y mostrar ese texto en sincronía con el audio.

## Qué lo hace distinto

### Transcripción 100% local
Usa Whisper (el modelo open source de OpenAI) corriendo directamente en tu ordenador. Nada se sube a servidores externos. Tu libro, tu audio y tu texto no salen de tu máquina.

### Modo karaoke
Mientras escuchas, cada palabra se resalta en el momento exacto en que se pronuncia. Puedes seguir el texto aunque tengas el audio de fondo, y si pierdes el hilo un segundo, sabes inmediatamente dónde estás.

### Interfaz cuidada
El creador puso especial atención a la estética: no es el típico reproductor feo con mil botones. Se siente más como una app de diseño que como un utilitario.

### Funciona offline
Una vez que tienes el modelo descargado, puedes usarlo sin conexión. Ideal para viajes, aviones o simplemente para no depender de internet.

### Soporte para múltiples formatos
Admite los formatos de audio más comunes (MP3, M4B, AAC, FLAC) para que puedas cargar tu biblioteca existente.

## Casos de uso más allá del entretenimiento

### Aprender idiomas
Escuchas un audiolibro en inglés o alemán y ves la transcripción en vivo. Perfecto para comprensión auditiva y vocabulario.

### Estudiar con audio
Material académico en audio (conferencias, podcasts largos, cursos) con transcripción automática para repasar después.

### Accesibilidad
Personas con discapacidad auditiva pueden disfrutar de contenido audio con subtítulos generados automáticamente.

### Revisar entrevistas
Si grabas entrevistas para tu trabajo, HoloVox te da transcripción sincronizada para citar pasajes exactos.

## Limitaciones honestas

- La calidad de la transcripción depende del modelo de Whisper elegido: los más precisos requieren más recursos
- Idiomas menos comunes tienen peor precisión
- Procesar audios largos lleva tiempo la primera vez (aunque luego queda cacheado)
- Whisper puede cometer errores con acentos fuertes o nombres propios
- Requiere un ordenador con CPU o GPU decente para que la transcripción no vaya lenta

## Por qué importa

HoloVox demuestra que los modelos de IA local son suficientemente buenos para aplicaciones de consumo cotidianas. Ya no hace falta depender de servicios cloud para tener transcripción de calidad. Es un paso concreto hacia un futuro donde la privacidad y el control local sean el estándar, no la excepción.`,
    image_prompt: "Beautiful audiobook player UI with live transcription highlighted word by word karaoke style, Whisper AI logo, offline and privacy focused design, dark purple background, violet accents, professional",
  },

  // 7. Gearbox
  {
    source: "github", source_id: "hgayan7/gearbox", url: "https://github.com/hgayan7/gearbox",
    name: "Gearbox", stars: 2800, language: "Swift", author: "hgayan7", category_id: 2,
    difficulty: "facil", interest_score: 88, is_oss_alternative: true, alternative_to: "crontab",
    tags: ["macos", "cron", "automatizacion", "menubar", "swift", "productividad"],
    seo_slug: "gearbox-cron-manager-macos-lenguaje-natural",
    seo_title: "Gearbox: El gestor de cron para Mac que entiende lenguaje natural",
    seo_description: "Gearbox es un cron manager para macOS en la barra de menús que programa tareas en lenguaje natural, con logs en vivo y todo 100% local y ligero.",
    summary_es: `Gearbox es un gestor de tareas programadas para macOS que vive en la barra de menús y entiende lenguaje natural. En vez de pelearte con la sintaxis críptica de cron ("0 9 * * 1" para "todos los lunes a las 9"), escribes directamente "todos los lunes a las 9" y Gearbox lo traduce. Todo local, ligero y con una interfaz que parece hecha por Apple.

## El drama de cron

Cualquier desarrollador que haya escrito más de dos entradas en crontab conoce la mezcla de pánico y resignación de volver a buscar qué significa ese "0 0 * * 0" que dejaste hace dos años. La sintaxis de cron es potente pero poco amigable, y los managers existentes en Mac suelen ser apps pesadas, feas o de pago. Gearbox ocupa ese hueco: simple, nativo y gratuito.

## Qué ofrece

### Programación en lenguaje natural
Escribes "cada 5 minutos", "todos los lunes a las 9", "el primer día del mes a las 6 am" y Gearbox lo interpreta y lo convierte en cron. Nunca más abrir una cheat sheet para recordar si los minutos van antes o después del asterisco.

### Interfaz en la barra de menús
Un icono sencillo en la barra superior. Click y ves todas tus tareas: cuáles están activas, cuándo es la próxima ejecución, qué comandos corren. Sin ventanas flotantes, sin abrir apps, sin distracciones.

### Logs en vivo
Cuando una tarea se ejecuta, ves su output en tiempo real. Si algo falla, no tienes que buscar en /var/log ni redirigir manualmente stdout: todo está ahí, a un click.

### 100% local
No hay cloud, no hay cuentas, no hay suscripciones. Tus comandos y tus logs viven solo en tu Mac.

### Ligero de verdad
Consume poquísima RAM en segundo plano. No notas que está corriendo hasta que lo necesitas.

## Casos de uso típicos

- Backups automáticos (rsync a disco externo, sync con S3)
- Limpieza de descargas o carpetas temporales
- Scripts de desarrollo (restart de servicios locales, renovar tokens)
- Notificaciones recurrentes vía AppleScript o scripts propios
- Tareas de mantenimiento del Mac (limpiar caches, actualizar paquetes)

## Por qué se siente nativa

El creador cuidó la experiencia visual como si fuera una app oficial de Apple: tipografía correcta, espaciados, iconografía estándar, transiciones sutiles. No destaca por ser vistosa, sino por integrarse perfectamente con el resto del sistema.

## Limitaciones honestas

- Solo para macOS (no hay versión Linux ni Windows)
- No reemplaza orquestadores avanzados tipo Airflow para pipelines complejos con dependencias
- Las tareas se ejecutan como tu usuario, no como root (no sirve para tareas de sistema que requieran privilegios)
- Al ser local, si apagas el Mac, las tareas no corren
- Todavía joven: algunas features avanzadas (variables de entorno complejas, pipelines) pueden faltar

## Por qué importa

Cron es una de esas herramientas unix que lleva décadas sin cambiar. No necesita cambiar en el núcleo, pero sí merece una capa de usabilidad moderna encima. Gearbox le pone esa capa a macOS de forma elegante y gratuita. Si usas tu Mac como estación de desarrollo, probablemente te ahorre una hora la próxima vez que quieras programar una tarea.`,
    image_prompt: "macOS menu bar app showing cron task scheduler with natural language input, live logs streaming, clean native Apple design, dark purple background, violet accents, professional",
  },

  // 8. Kokraf
  {
    source: "github", source_id: "sengchor/kokraf", url: "https://github.com/sengchor/kokraf",
    name: "Kokraf", stars: 3600, language: "JavaScript", author: "sengchor", category_id: 7,
    difficulty: "medio", interest_score: 90, is_oss_alternative: true, alternative_to: "Blender",
    tags: ["3d", "threejs", "modelado", "webgl", "creative-coding", "navegador"],
    seo_slug: "kokraf-modelado-3d-navegador-threejs",
    seo_title: "Kokraf: Modelado 3D profesional corriendo 100% en el navegador con Three.js",
    seo_description: "Kokraf es un editor 3D completo en el navegador con loops, rings, extrusiones y colaboración en tiempo real. Construido con Three.js, sin instalar nada.",
    summary_es: `Kokraf es una aplicación web completa de modelado 3D que corre 100% en el navegador, construida sobre Three.js. Ofrece herramientas propias de un editor profesional (selección de loops, rings, elementos enlazados, extrusión, edición de mesh) con una fluidez que hace difícil creer que estás trabajando dentro de Chrome o Firefox, sin instalar nada.

## Por qué un Blender en el navegador

Blender es gratis y potente, pero descargar un instalador de varios gigas, configurar shortcuts y aprender su interfaz es una barrera enorme para muchos usuarios ocasionales. Las opciones web existentes (SketchUp Free, Tinkercad) son demasiado básicas para usuarios que ya saben modelar. Kokraf busca el punto medio: la potencia de un editor serio con la accesibilidad de una URL que abres y listo.

## Herramientas profesionales

### Selección avanzada
- **Loop select**: selecciona bucles completos de aristas o caras con un click
- **Ring select**: selecciona anillos de aristas paralelas
- **Linked select**: selecciona todos los elementos conectados al que clickeas
- Estas herramientas son el pan de cada día en Blender y Maya, y las tienes en el navegador

### Extrusión y edición de mesh
Extrusiones rápidas, movimientos precisos, subdivisión de geometría. Lo esencial para modelar objetos 3D sin salir del navegador.

### Modo colaborativo en tiempo real
Varios usuarios pueden editar la misma escena simultáneamente, como un Figma del 3D. Perfecto para clases, workshops o trabajo en equipo a distancia.

## Stack técnico

- **Three.js** como motor de render
- **WebGL** para aprovechar aceleración GPU del navegador
- **JavaScript vanilla** en el núcleo para máxima compatibilidad
- Sin dependencias de frameworks pesados que ralenticen la experiencia

## Casos de uso

### Creative coding
Prototipar escenas 3D rápidamente para experimentos visuales, arte generativo o instalaciones.

### Visualización de datos
Crear escenas 3D a medida para visualizar datos complejos en el navegador.

### Enseñanza de 3D
En un aula no necesitas que los alumnos instalen Blender: les mandas una URL y todos están modelando en minutos.

### Prototipos rápidos
Cuando necesitas una maqueta 3D simple para una reunión o un pitch, abrir Kokraf es más rápido que lanzar un programa pesado.

### Vibe-coded projects
Para esos proyectos donde lo importante es la estética y la velocidad de iteración, no el rigor técnico de producción.

## Limitaciones honestas

- No reemplaza a Blender para producción profesional (animación, rigging, simulaciones físicas)
- El rendimiento depende de la GPU del dispositivo: en laptops modestas puede ralentizarse con meshes complejos
- No tiene todas las features avanzadas (modificadores complejos, sculpting profesional)
- El formato de guardado es propio; la exportación a formatos estándar (OBJ, GLTF) es la forma canónica de integrarlo con otros pipelines
- Es un proyecto joven: algunos bugs persisten

## Por qué importa

Los navegadores modernos tienen tanta potencia que ya no hay razón técnica para que el 3D viva solo en apps de escritorio. Kokraf es parte de una ola de herramientas (Spline, SuperSplat, Figma 3D) que están desplazando flujos completos al navegador. Si pensabas que modelar en 3D requería un PC potente y software caro, este proyecto te va a sorprender.`,
    image_prompt: "3D modeling application running in a web browser with Three.js, mesh editing with loops and rings, real-time collaborative 3D workspace, dark purple background, violet accents, professional",
  },

  // 9. MachinaOS
  {
    source: "github", source_id: "trohitg/MachinaOS", url: "https://github.com/trohitg/MachinaOS",
    name: "MachinaOS", stars: 5800, language: "Python", author: "trohitg", category_id: 1,
    difficulty: "dificil", interest_score: 92, is_oss_alternative: false, alternative_to: null,
    tags: ["agentes-ia", "multi-agente", "automatizacion", "empresas", "24-7", "coordinacion"],
    seo_slug: "machinaos-ejercito-agentes-ia-24-7",
    seo_title: "MachinaOS: Un ejército de agentes de IA que trabajan 24/7 coordinándose solos",
    seo_description: "MachinaOS es un sistema multi-agente open source donde equipos de IA responden emails, crean documentos, escriben código y ejecutan procesos completos sin intervención humana.",
    summary_es: `MachinaOS es un sistema operativo multi-agente open source donde varios agentes de IA colaboran entre sí como si fueran un equipo de empleados humanos: se comunican, se coordinan, se asignan tareas y ejecutan procesos completos de forma autónoma. No es un solo chatbot gigante, es una orquesta de especialistas que trabajan en paralelo 24 horas al día.

## El salto conceptual

La mayoría de usuarios de IA conversan con un solo asistente: escribes, responde, escribes, responde. MachinaOS cambia la dinámica: tú describes objetivos de alto nivel ("responde los correos pendientes", "prepara el reporte mensual", "investiga estos tres leads") y el sistema descompone el trabajo entre varios agentes que se organizan solos. Uno redacta, otro revisa, un tercero valida con el cliente y un cuarto archiva.

## Qué hace cada "empleado"

### Comunicación entre agentes
Los agentes hablan entre sí en un protocolo interno. Negocian quién hace qué, se preguntan dudas, se pasan contexto. Se comportan más como un equipo humano que como un pipeline determinista.

### Acceso a herramientas reales
- **Email**: leen bandeja de entrada, redactan respuestas, archivan
- **WhatsApp / mensajería**: responden y escalan cuando es necesario
- **Creación de documentos**: preparan informes, contratos, propuestas
- **Código**: escriben, prueban, revisan
- **Procesos completos**: onboarding de clientes, seguimiento de pedidos, gestión de leads

### Trabajo continuo
Corren 24/7. No esperan tu prompt para empezar: ejecutan tareas recurrentes, monitorizan colas de trabajo y reaccionan a eventos del mundo real (un correo nuevo, una alerta, una fecha límite).

## Arquitectura por dentro

- **Orquestador central**: decide qué agente arranca para cada tarea
- **Agentes especializados**: cada uno con rol definido (escritor, revisor, coordinador, ejecutor)
- **Memoria compartida**: los agentes acceden a una base de conocimiento común
- **Interfaz humana**: un panel para supervisar, aprobar acciones críticas y dar objetivos de alto nivel

## Casos de uso reales

### Pequeñas empresas sin plantilla
Una tienda online con una sola persona al mando puede delegar atención al cliente, seguimiento de pedidos y redes sociales a agentes que trabajan mientras el dueño duerme.

### Equipos de marketing
Investigación de tendencias, redacción de copy, publicación en redes y seguimiento de métricas, todo coordinado entre agentes.

### Back office
Facturación, reconciliaciones, seguimiento de contratos y comunicaciones con proveedores.

### Desarrollo de software
Un agente escribe, otro testea, otro revisa y otro despliega, todos coordinándose sin que tú tengas que orquestarlos manualmente.

## Limitaciones honestas

- Los agentes pueden equivocarse de formas difíciles de predecir, y los errores se amplifican cuando varios actúan en cadena
- Requiere buena supervisión humana especialmente al principio (no es fire and forget)
- Los costes de API se multiplican cuando varios agentes hablan entre sí
- La configuración inicial es compleja y requiere definir roles, permisos y límites con cuidado
- No es magia: sigue dependiendo de los modelos subyacentes y sus limitaciones
- Las preocupaciones de seguridad son serias: un agente con acceso a email y código necesita controles estrictos

## Por qué llama la atención

Hablar de "agentes que trabajan 24/7" es ciencia ficción fácil de vender. Lo interesante de MachinaOS es que lo enseña como código real, reproducible y abierto. Puedes inspeccionar qué hace cada agente, definir límites y entender cómo se coordinan. Es un laboratorio abierto para ver hasta dónde llegan los sistemas multi-agente hoy, sin promesas vacías.`,
    image_prompt: "Army of AI agents working together in a command center, multi-agent coordination flow diagram, autonomous workflows across email chat and code, dark purple background, violet accents, professional",
  },

  // 10. FreeCAD
  {
    source: "github", source_id: "FreeCAD/FreeCAD", url: "https://github.com/FreeCAD/FreeCAD",
    name: "FreeCAD", stars: 19000, language: "C++", author: "FreeCAD", category_id: 3,
    difficulty: "medio", interest_score: 94, is_oss_alternative: true, alternative_to: "SolidWorks",
    tags: ["cad", "3d", "ingenieria", "open-source", "modelado-parametrico", "offline"],
    seo_slug: "freecad-1-1-cad-parametrico-open-source",
    seo_title: "FreeCAD 1.1: La nueva versión del CAD paramétrico open source que planta cara a SolidWorks",
    seo_description: "FreeCAD 1.1 trae previews transparentes, draggers interactivos, mejor iluminación, nueva librería CAM y Sketcher rediseñado. Gratuito, offline y sin suscripciones.",
    summary_es: `FreeCAD es el software CAD paramétrico open source más ambicioso del ecosistema. La versión 1.1 (lanzada en 2026) consolida años de trabajo con mejoras que modernizan la experiencia y lo acercan todavía más a los estándares que usuarios de SolidWorks, Fusion 360 o Inventor daban por sentados. Todo 100% gratuito, offline y sin suscripciones.

## Por qué FreeCAD importa

Las herramientas CAD comerciales son caras, muchas veces de suscripción obligatoria, y atan tus diseños a formatos propietarios. Para estudiantes, makers, pequeñas empresas y países con presupuestos limitados, FreeCAD representa la única alternativa seria que permite diseño mecánico paramétrico profesional sin pagar mil euros al año. La comunidad alrededor es enorme y las integraciones con fabricantes, CAM y simulación crecen cada versión.

## Novedades clave de la 1.1

### Previews transparentes en Part Design
Cuando creas una operación booleana, un fillet o una extrusión, ves una previsualización translúcida del resultado antes de confirmar. Esto acelera enormemente el flujo de trabajo y reduce errores.

### Draggers interactivos estilo SolidWorks
Los manipuladores visuales (flechas, arcos, planos) que arrastras para modificar parámetros directamente en el viewport. Es una característica que usuarios migrados desde SolidWorks echaban muchísimo de menos.

### Mejor iluminación del viewport
La escena 3D se ve significativamente más realista, con sombras y materiales que transmiten mejor la profundidad de los modelos.

### Nueva librería CAM
Herramientas mejoradas para generar trayectorias de mecanizado, exportar G-code y enlazar con máquinas reales. FreeCAD sigue siendo el CAD más fuerte del mundo open source en el área de fabricación.

### Sketcher rediseñado
El módulo de bocetos 2D (el corazón del modelado paramétrico) recibe una revisión profunda: mejor gestión de restricciones, menos bugs en el solver, interacción más fluida.

### Selección Clarify
Una nueva forma de filtrar y seleccionar elementos geométricos complejos sin tener que esconder capas ni aislar piezas manualmente.

### UX modernizada
Iconos, menús y paneles redibujados para sentirse menos de los 2000 y más acorde con herramientas actuales.

## Para quién es FreeCAD 1.1

- **Makers y hobbyistas**: imprimir en 3D, diseñar piezas a medida, modelar objetos físicos
- **Estudiantes de ingeniería**: aprender modelado paramétrico sin licencias caras
- **Pequeños talleres mecánicos**: diseñar piezas, generar planos técnicos y código CAM
- **Educadores**: enseñar CAD en aulas sin depender de licencias académicas limitadas
- **Empresas pequeñas**: evitar costes de suscripción en fases tempranas del negocio
- **Usuarios en países con presupuestos limitados**: acceso a herramientas CAD profesionales sin restricciones

## Limitaciones honestas

- La curva de aprendizaje sigue siendo pronunciada comparada con Fusion 360
- Para simulación avanzada (CFD, FEA profesional) aún no alcanza a ANSYS o Abaqus
- Algunos workbenches mantienen inconsistencias de interfaz entre sí
- La documentación oficial es dispersa: la comunidad suple con foros y vídeos
- El rendimiento con ensamblajes enormes puede resentirse frente a SolidWorks
- Importar archivos de CAD comerciales funciona, pero no siempre perfecto

## Por qué la 1.1 es un hito

FreeCAD 1.0, que salió hace relativamente poco, representó el salto a estabilidad. La 1.1 se siente como la primera versión que muchos usuarios de CAD comercial podrían adoptar sin sentir que están "bajando de nivel". Si te resististe a migrar en el pasado, esta es la versión que te va a hacer reconsiderar.`,
    image_prompt: "FreeCAD 1.1 parametric CAD interface with transparent previews, interactive draggers on 3D models, improved lighting and modern UX, dark purple background, violet accents, professional",
  },

  // 11. SwiftUI-Animations
  {
    source: "github", source_id: "Shubham0812/SwiftUI-Animations", url: "https://github.com/Shubham0812/SwiftUI-Animations",
    name: "SwiftUI Animations", stars: 4800, language: "Swift", author: "Shubham0812", category_id: 7,
    difficulty: "medio", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["swiftui", "ios", "animaciones", "swift", "prototipos", "ui"],
    seo_slug: "swiftui-animations-prototipos-avanzados",
    seo_title: "SwiftUI Animations: Colección de prototipos avanzados listos para copiar y pegar",
    seo_description: "SwiftUI Animations es una colección de prototipos y animaciones avanzadas para iOS que parecen de apps premium. Código limpio, listo para integrar.",
    summary_es: `SwiftUI Animations es una colección abierta de prototipos de interfaz y animaciones avanzadas para SwiftUI mantenida por Shubham Kumar. Cada ejemplo es una animación autocontenida que imita efectos vistos en apps de primer nivel (Airbnb, Stripe, Duolingo, Apple) y está lista para copiar, adaptar e integrar directamente en tus proyectos iOS.

## Por qué esta colección es distinta

Aprender animaciones en SwiftUI es frustrante porque la documentación oficial cubre lo básico pero se queda corta cuando quieres lograr efectos complejos: transiciones encadenadas, física convincente, interacciones con gestos sofisticados. Esta colección resuelve justo ese hueco: son recetas que ya funcionan, con código limpio y modular, pensadas para estudiarlas y adaptarlas.

## Qué tipo de animaciones incluye

### Transiciones entre pantallas
Efectos de hero transition, expansión de tarjetas a pantalla completa, morph de elementos entre vistas.

### Micro-interacciones
Botones que se deforman al presionarlos, tabs con indicadores fluidos, switches con retroalimentación táctil visual.

### Parallax y scroll
Headers que se colapsan suavemente, imágenes que se ajustan al scroll, efectos de profundidad al mover el dedo.

### Gestos avanzados
Drag and drop con física, cards deslizables tipo Tinder, pull-to-refresh personalizados.

### Loaders y skeletons
Indicadores de carga animados que sustituyen a los spinners aburridos, placeholders con shimmer.

### Transiciones de estado
Cambios entre vacío, cargando, contenido y error con animaciones fluidas.

## Cómo usarla

Cada animación vive en su propio archivo Swift con dependencias mínimas. Abres el repo, identificas el efecto que te interesa, copias el archivo a tu proyecto y adaptas colores, tamaños y datos. No hay frameworks externos en la mayoría de ejemplos.

## Quién saca más provecho

### Desarrolladores iOS intermedios
Ya conoces SwiftUI básico pero quieres subir el listón. Estudiar estos ejemplos te enseña patrones que no están en la documentación oficial.

### Freelancers y diseñadores iOS
Necesitas impresionar al cliente con prototipos pulidos antes de empezar el desarrollo serio.

### Estudiantes de desarrollo móvil
Código real, legible y bien estructurado para aprender cómo se construyen animaciones modernas.

### Equipos de producto
Inspiración visual para discutir con diseñadores qué es posible con el presupuesto actual.

## Limitaciones honestas

- No es un framework ni una librería: es una colección de snippets, por lo que mantener actualizaciones es tu responsabilidad
- Algunas animaciones requieren iOS recientes (iOS 16+ para ciertas APIs nuevas)
- El estilo visual es opinionado; a veces tendrás que desmenuzar y rediseñar para tu producto
- Las animaciones complejas pueden costar performance en dispositivos antiguos
- La documentación en cada ejemplo es ligera; hay que leer el código para entender los detalles

## Por qué merece un bookmark

Guardar este repo en tus marcadores es una decisión práctica: la próxima vez que un diseñador te pida una animación "que se sienta más viva" o "como la de Apple", entras al repo, buscas el efecto similar y tienes una base sólida en minutos en vez de horas. Es el tipo de recurso que ahorra tiempo real en proyectos reales.`,
    image_prompt: "iOS SwiftUI animation showcase with fluid card transitions, parallax scrolling effects, hero animations between screens, premium app interfaces, dark purple background, violet accents, professional",
  },

  // 12. Dither
  {
    source: "github", source_id: "Shpigford/dither", url: "https://github.com/Shpigford/dither",
    name: "Dither", stars: 2300, language: "JavaScript", author: "Shpigford", category_id: 7,
    difficulty: "facil", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["illustrator", "svg", "dithering", "retro", "diseno", "plugin"],
    seo_slug: "dither-illustrator-vectorial-retro",
    seo_title: "Dither: Dithering vectorial puro como plugin de Illustrator y app web",
    seo_description: "Dither aplica efecto dithering vectorial sobre SVG en Adobe Illustrator y en una web app. Exporta archivos escalables con look retro GameBoy y CGA.",
    summary_es: `Dither es un plugin para Adobe Illustrator (acompañado de una app web) que aplica efectos de dithering manteniendo la salida en vectores SVG puros. En vez de rasterizar una imagen para conseguir ese look pixelado estilo GameBoy, CGA o impresoras antiguas, Dither genera el patrón con formas vectoriales que puedes escalar hasta el infinito sin perder nitidez.

## Qué es el dithering y por qué está de moda otra vez

El dithering es una técnica antigua que simula colores o degradados en paletas limitadas usando patrones de puntos. Lo usaban las GameBoy, las consolas 8-bit, los periódicos impresos, las impresoras matriciales. Estéticamente transmite una cosa muy clara: crudo, retro, hecho a mano, honesto. Diseñadores e ilustradores lo están rescatando para proyectos que quieren escapar del look genérico de los degradados modernos.

El problema es que todos los dithers actuales generan píxeles. Y los píxeles no se escalan: amplías y pierdes calidad, las letras se deforman, los trazos se rompen.

## Lo que cambia con Dither

### Output 100% vectorial
Cada punto del patrón es una forma SVG: un círculo, un cuadrado, un triángulo. El resultado es un archivo que escala desde un icono diminuto hasta un mural gigante sin perder calidad.

### Plugin nativo en Illustrator
Abre Illustrator, seleccionas una imagen o una forma, aplicas el plugin y obtienes el dither directamente en tu lienzo, listo para editarlo como cualquier otro objeto vectorial.

### Web app gemela
¿No tienes Illustrator? La app web permite subir una imagen, aplicar el efecto y descargar el SVG resultante sin instalar nada.

### Export directo a SVG
El archivo exportado abre en cualquier editor vectorial, se imprime en cualquier calidad y se integra en cualquier pipeline de diseño sin conversiones raras.

### Control del estilo
Eliges el tamaño de los puntos, la paleta de colores, el tipo de patrón. Puedes lograr desde estéticas de 2 colores hasta composiciones con varios tonos.

## Casos de uso concretos

- **Pósteres grandes** con estética retro sin preocuparte por la resolución
- **Logos con textura crujiente** que se ven bien en cualquier tamaño
- **Portadas de disco o libro** con vibes analógicos
- **Assets para videojuegos** con look pixel art pero vectoriales
- **Ilustraciones editoriales** imprimibles en calidad profesional
- **Artículos de merch** que se vectorizan bien para serigrafía

## Limitaciones honestas

- El plugin requiere Adobe Illustrator (versión reciente)
- Los SVG resultantes con muchos puntos pueden pesar más que una imagen rasterizada equivalente
- El procesamiento de imágenes muy grandes puede tardar
- No reemplaza herramientas de ilustración completas: es un efecto concreto, no un ecosistema
- La app web es más simple que el plugin de Illustrator en opciones avanzadas

## Por qué mola

Es un proyecto que une dos mundos que no suelen converger: la nostalgia de estéticas pixeladas retro con la precisión técnica de los vectores modernos. El resultado es algo que se ve bien y además aguanta cualquier tamaño. Para cualquier diseñador que haya intentado conseguir este look antes, Dither se siente casi tramposo de lo bueno que es.`,
    image_prompt: "Adobe Illustrator plugin creating vector dithering effects, retro GameBoy pixelated patterns in SVG format, before and after comparison of image styling, dark purple background, violet accents, professional",
  },

  // 13. Context Hub
  {
    source: "github", source_id: "andrewyng/context-hub", url: "https://github.com/andrewyng/context-hub",
    name: "Context Hub", stars: 8200, language: "Python", author: "andrewyng", category_id: 1,
    difficulty: "medio", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "documentacion", "agentes", "apis", "versionado", "alucinaciones"],
    seo_slug: "context-hub-documentacion-versionada-agentes",
    seo_title: "Context Hub: Documentación versionada que evita que tu agente IA alucine APIs",
    seo_description: "Context Hub de Andrew Ng es un hub de documentación curada y versionada para agentes de IA con CLI simple y feedback loop automático.",
    summary_es: `Context Hub es un hub de documentación versionada y curada para agentes de IA, creado por el equipo de Andrew Ng. Resuelve una de las causas más comunes de alucinaciones en agentes: cuando un modelo escribe código usando APIs, flags o métodos que ya no existen porque su conocimiento está desactualizado. Context Hub se convierte en el Stack Overflow que los agentes de IA siempre necesitaron.

## El problema: APIs alucinadas

Los agentes de IA de programación (Cursor, Claude Code, Copilot) se entrenan con datos que tienen fecha de corte. Cuando usan librerías que han cambiado desde entonces, alucinan nombres de funciones, parámetros que ya no existen, patrones deprecados. El código se compila a veces, rompe en runtime otras, y genera bugs silenciosos en el peor caso.

Hacks típicos que no funcionan del todo:

- **RAG naive**: buscar en la web documentación actual, pero los agentes mezclan versiones
- **Copiar-pegar docs al prompt**: consume muchos tokens y el agente lo ignora a menudo
- **Confiar en su conocimiento**: lotería pura
- **Verificar cada línea a mano**: mata la productividad que la IA prometía

## Qué aporta Context Hub

### Documentación versionada
Cada entrada del hub está etiquetada con la versión de la librería a la que pertenece. Si usas React 19, el hub devuelve docs de React 19, no una mezcla de React 16, 17 y 18.

### Curada por humanos y la comunidad
No es scraping ciego de internet: las entradas se revisan, se estructuran y se actualizan activamente.

### CLI simple
Los agentes consultan el hub con un comando CLI estandarizado que devuelve exactamente el contexto que necesitan para escribir código correcto. Sin parsear HTML, sin scraper frágil.

### Feedback loop automático
Cuando un agente usa una entrada del hub y genera código que funciona (o que falla), el hub puede aprender de ese feedback y mejorar la curación.

### Plug-and-play con agentes
Se integra con los agentes populares del ecosistema sin configuración compleja.

## Cómo cambia el flujo de trabajo

1. Tu agente recibe una tarea: "añade autenticación con Clerk v5"
2. Antes de escribir código, consulta Context Hub: "dame docs de Clerk v5 sobre autenticación"
3. Recibe un resumen estructurado, actualizado y mínimo de lo que necesita
4. Escribe código basado en APIs reales, no en recuerdos desactualizados
5. El resultado compila la primera vez y funciona en producción

## Por qué Andrew Ng

Andrew Ng es uno de los referentes en el ámbito de la IA aplicada. Su equipo (DeepLearning.AI) ya tiene un catálogo de herramientas pensadas para agentes. Context Hub encaja con su visión: menos agentes gigantes que alucinan, más infraestructura sólida alrededor de modelos buenos.

## Limitaciones honestas

- Depende de que el hub mantenga actualizadas las librerías que usas (cobertura variable)
- Para librerías muy nichas o nuevas puede no haber entradas todavía
- Requiere que tu agente esté configurado para consultar el hub antes de generar código
- La curación humana tiene costes: no todas las librerías reciben la misma atención
- No elimina alucinaciones al 100%, solo reduce drásticamente las relacionadas con APIs

## Por qué es una pieza clave del ecosistema

La próxima frontera de los agentes de programación no es el modelo más inteligente, es la infraestructura de contexto que los rodea. Context Hub apunta a ser esa infraestructura. Si se consolida, podría convertirse en el "package registry para contexto de IA" que el ecosistema necesita.`,
    image_prompt: "Documentation hub connected to AI agents with versioned API references, CLI interface querying latest docs, feedback loop diagram, Stack Overflow replacement concept, dark purple background, violet accents, professional",
  },

  // 14. TerraInk
  {
    source: "github", source_id: "yousifamanuel/terraink", url: "https://github.com/yousifamanuel/terraink",
    name: "TerraInk", stars: 1900, language: "TypeScript", author: "yousifamanuel", category_id: 7,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["mapas", "diseno", "impresion", "arte", "minimalista", "ecommerce"],
    seo_slug: "terraink-mapas-minimalistas-arte-imprimir",
    seo_title: "TerraInk: Crea mapas minimalistas estilo galería listos para imprimir y vender",
    seo_description: "TerraInk genera mapas minimalistas con tipografías y paletas personalizables, descargables en calidad de impresión para MercadoLibre, Amazon o Etsy.",
    summary_es: `TerraInk es una herramienta web para crear mapas minimalistas con estética de galería de arte: topografías limpias, tipografías cuidadas, paletas personalizables y la opción de añadir puntos específicos (spots favoritos, lugares con significado personal). El resultado se descarga en calidad de impresión, listo para venderse en MercadoLibre, Amazon, Etsy o para regalar.

## De dónde viene la idea

Los mapas minimalistas impresos se volvieron un producto de nicho rentable: parejas que quieren el mapa de la ciudad donde se conocieron, corredores que imprimen la ruta de su maratón favorito, viajeros que recopilan sus destinos en un póster único. Las plataformas existentes son caras, bloquean personalización o venden productos genéricos. TerraInk democratiza el flujo: tú haces el mapa, tú lo vendes.

## Qué ofrece

### Editor visual simple
Buscas una ciudad, ajustas el encuadre, eliges el estilo y listo. Sin conocimientos de cartografía o diseño gráfico.

### Paletas de color curadas
Combinaciones elegidas con ojo de diseñador: tierras neutras, contrastes suaves, esquemas modernos que quedan bien imprimos grandes.

### Tipografías versátiles
Varias familias tipográficas para los títulos, subtítulos y leyendas. Desde serif clásicas hasta sans contemporáneas.

### Spots personalizados
Marcas con nombre, iconos y descripciones los puntos que importan: tu calle, el bar donde tuvisteis la primera cita, el restaurante de aniversario, el estadio de tu equipo.

### Export en calidad imprenta
Salida en alta resolución (300 DPI) con sangrado correcto, lista para subir a Printful, Gelato, imprenta local o imprimir en casa.

## Por qué funciona como producto

### Diferencial claro
Cada mapa es único. El comprador puede obsesionarse eligiendo colores, tipografías, lugares. Eso justifica precio y personalización.

### Escalable
Una vez montas el flujo (TerraInk + print-on-demand), atiendes a clientes de todo el mundo sin stock físico.

### Regalo de alto margen
Bodas, aniversarios, regalos corporativos. El coste material es bajo y el valor percibido es alto porque es personal.

### Nicho defendible
No compites con mapas genéricos de stock: cada pieza cuenta una historia específica.

## Flujo de trabajo para vender

1. Creas un diseño base con TerraInk (ciudad, estilo, paleta)
2. Subes el diseño a Etsy o MercadoLibre con variantes para otras ciudades
3. Cuando llega un pedido, personalizas el mapa con los spots del cliente
4. Envías el archivo a tu servicio de print-on-demand
5. El servicio imprime, empaqueta y envía

## Limitaciones honestas

- La calidad del mapa depende de los datos geográficos disponibles (ciudades pequeñas pueden tener menos detalle)
- No sustituye a un ilustrador humano para mapas muy artísticos o ilustrados a mano
- Requiere entender un poco de print-on-demand si quieres vender realmente
- La competencia en Etsy existe: tu diferenciación tiene que ser más que "yo también vendo mapas"
- Algunas zonas remotas del mundo tendrán peor cobertura

## Por qué vale la pena probarlo

Si buscas un side business accesible que no requiera programar desde cero ni invertir en stock, TerraInk es una de las bases más pulidas para arrancar en el mundo de la impresión personalizada. Y si ya vendes en Etsy o MercadoLibre, añadir mapas personalizados a tu catálogo puede abrir una línea de productos premium con márgenes sanos.`,
    image_prompt: "Minimalist art gallery style city map with elegant typography and custom color palette, print-ready design on wall art frame, modern poster aesthetic, dark purple background, violet accents, professional",
  },

  // 15. Agensic
  {
    source: "github", source_id: "Alex188dot/agensic", url: "https://github.com/Alex188dot/agensic",
    name: "Agensic", stars: 2600, language: "Rust", author: "Alex188dot", category_id: 5,
    difficulty: "dificil", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["seguridad", "observabilidad", "ed25519", "terminal", "agentes-ia", "auditoria"],
    seo_slug: "agensic-observabilidad-forense-agentes-ia",
    seo_title: "Agensic: Capa forense para saber si un comando lo ejecutó tu agente IA o tú",
    seo_description: "Agensic firma cada comando con Ed25519 distinguiendo AI_EXECUTED de HUMAN_TYPED, permite replay de sesiones y time travel con Git. Local y privado.",
    summary_es: `Agensic es una capa de observabilidad forense para terminales donde conviven humanos y agentes de IA. Firma criptográficamente cada comando ejecutado indicando si fue escrito por una persona o lanzado por un agente, permite replay de sesiones enteras, añade time travel sobre Git y bloquea comandos peligrosos. Todo 100% local y privado, sin telemetría externa.

## El problema que nadie quiere mirar de frente

Usas Claude Code, Cursor, Aider u otro agente que ejecuta comandos en tu terminal. Algo falla: un archivo borrado, una base de datos tocada, un despliegue prematuro. La pregunta incómoda: ¿lo hice yo distraído o lo hizo el agente? Sin un sistema de auditoría específico, no hay forma limpia de saberlo. Culpas al agente, culpas al becario, te culpas a ti mismo. Agensic mata la ambigüedad.

## Cómo funciona por dentro

### Firma Ed25519 en cada comando
Cada comando ejecutado se firma criptográficamente con claves distintas: una para AI_EXECUTED y otra para HUMAN_TYPED. La firma no se puede falsificar y queda registrada de manera verificable.

### Replay completo de sesiones
Puedes reproducir una sesión completa de terminal paso a paso, viendo exactamente qué comandos se ejecutaron, en qué orden, con qué variables de entorno y qué output generaron.

### Time travel con Git
Agensic se integra con Git para moverte a lo largo del historial de tu repositorio viendo qué comandos y qué cambios hubo en cada punto. Si algo rompió hace tres días, puedes volver justo ahí y ver qué pasó.

### Autocomplete inteligente
Además de la auditoría, Agensic añade autocompletado sobre el historial enriquecido: te sugiere comandos basándose en lo que realmente funcionó en contextos similares.

### Bloqueo de comandos peligrosos
Define una lista de comandos prohibidos (rm -rf /, drop table, reset --hard sin backup) y Agensic los bloquea antes de que se ejecuten, sea humano o agente quien los lance.

### 100% local y privado
Nada sale de tu máquina. Las claves, los logs y las firmas viven en tu sistema. Sin telemetría, sin cloud, sin dependencias externas.

## Por qué es crítico si usas agentes de IA

Un agente con acceso a tu terminal es enormemente poderoso, pero también enormemente peligroso. Agensic te da:

- **Accountability**: saber con certeza quién hizo qué
- **Defensa legal/contractual**: si trabajas en empresa, puedes demostrar auditorías
- **Sobriedad**: con la auditoría visible, tanto tú como el agente son más cuidadosos
- **Rescate post-mortem**: cuando algo falla, reproduces la secuencia exacta

## Casos de uso reales

- Desarrolladores enterprise que necesitan cumplir controles de auditoría
- Equipos que experimentan con agentes autónomos en entornos de staging
- Consultores que trabajan con código sensible de clientes
- Cualquier dev que quiera separar limpiamente sus acciones de las del agente

## Limitaciones honestas

- Añade fricción: cada comando pasa por una capa extra de firma y verificación
- La curva de aprendizaje inicial no es trivial: entender la criptografía y las firmas requiere tiempo
- Los logs crecen rápido en sesiones largas
- No protege contra un agente que ya tiene acceso root (solo audita lo que pasa)
- La integración con shells distintos de bash/zsh puede necesitar ajustes
- Built en Rust: compilar e instalar requiere toolchain propia

## Por qué importa ya

A medida que los agentes de IA asumen más responsabilidad en tareas reales (no solo escribir código, sino ejecutarlo, desplegar y tocar infraestructuras) la auditoría deja de ser un extra y se convierte en un mínimo civilizatorio. Agensic se adelanta a ese momento con una solución local, privada y rigurosa.`,
    image_prompt: "Forensic observability dashboard for AI agents with Ed25519 cryptographic signatures, terminal command audit trail distinguishing human from AI executions, time travel Git timeline, dark purple background, violet accents, professional",
  },

  // 16. Project AIRI
  {
    source: "github", source_id: "moeru-ai/airi", url: "https://github.com/moeru-ai/airi",
    name: "Project AIRI", stars: 36000, language: "TypeScript", author: "moeru-ai", category_id: 1,
    difficulty: "dificil", interest_score: 94, is_oss_alternative: true, alternative_to: "Character.AI",
    tags: ["ia", "waifu", "vrm", "live2d", "webgpu", "self-hosted"],
    seo_slug: "project-airi-waifu-cyber-self-hosted",
    seo_title: "Project AIRI: Tu waifu cyber self-hosted con memoria persistente y voz en tiempo real",
    seo_description: "Project AIRI es una waifu cyber-living open source con avatar VRM o Live2D, voz en tiempo real, memoria persistente y soporte para Minecraft. Todo local en WebGPU.",
    summary_es: `Project AIRI es una compañera de IA self-hosted con avatar 3D (VRM o Live2D), voz en tiempo real, memoria persistente y capacidad de interactuar con videojuegos como Minecraft. Inspirada en personajes como Neuro-sama pero completamente abierta, sin censura aplicada desde servidores externos, sin suscripciones y corriendo 100% en tu hardware mediante WebGPU.

## Por qué explotó en GitHub

AIRI alcanzó el repositorio número uno del día en GitHub con decenas de miles de estrellas en horas. La razón es una combinación de varios factores que el ecosistema estaba esperando:

- Avatares anime 3D reales, no solo chatbots de texto
- Local-first extremo: sin enviar tu voz ni tus conversaciones a nadie
- Voz en tiempo real, no turnos lentos de grabar-enviar-esperar
- Persistencia de memoria entre sesiones
- Capacidad de jugar videojuegos contigo en tiempo real

## Qué trae por dentro

### Avatar VRM o Live2D
VRM es el estándar abierto para avatares 3D estilo VTuber. Live2D es el formato de animación 2D articulada. AIRI soporta ambos, así que puedes usar avatares existentes o crear el tuyo propio.

### Voz en tiempo real
Habla con micrófono y la compañera te responde con voz en tiempo real. La latencia es la que permite una conversación fluida, no el clásico "graba, espera 10 segundos, escucha".

### Memoria persistente
Recuerda conversaciones anteriores, preferencias, cosas que le contaste hace semanas. No empieza desde cero cada vez que la enciendes.

### Juega Minecraft contigo
Con un bridge entre AIRI y Minecraft, puede observar el mundo, comentar lo que hace, ayudarte a construir o simplemente acompañarte mientras juegas.

### Corre en WebGPU
Usa la API WebGPU del navegador para aprovechar la GPU local sin cloud. Esto significa:
- Sin coste por tokens enviados a APIs externas
- Sin delays de red
- Sin filtros de contenido impuestos desde afuera
- Privacidad total de las conversaciones

## Arquitectura

- **Frontend**: interfaz web que renderiza el avatar VRM/Live2D
- **Backend local**: gestiona el LLM, la voz y la memoria
- **LLM backend**: puedes usar modelos locales (Llama, Mistral, etc.) o APIs si prefieres
- **TTS / STT local**: procesamiento de voz sin enviar audio fuera
- **Bridges opcionales**: integraciones con Minecraft, Discord y otros

## Para quién es

- **Usuarios de VTuber tools**: ya conoces VRM/Live2D y quieres una IA detrás del avatar
- **Entusiastas de LLMs locales**: tienes un setup con GPU y quieres experimentar
- **Fans de personajes AI**: quieres tu propia Neuro-sama sin depender de nadie
- **Investigadores**: estudiar interacción humano-IA con avatares encarnados
- **Streamers**: usar AIRI como copresentadora en directos

## Limitaciones honestas

- Requiere hardware potente (GPU decente, mínimo 16 GB de RAM, preferible más)
- La configuración inicial es compleja: no es "instala y juega", hay que tocar archivos
- La calidad del avatar depende del modelo VRM/Live2D que uses, no viene con uno "canon"
- Los modelos LLM locales siguen siendo menos potentes que los grandes cloud
- La voz local no siempre llega al nivel de servicios premium
- La integración con Minecraft está en desarrollo y puede ser inestable
- Las conversaciones sin censura son responsabilidad tuya: hay implicaciones éticas y legales

## Por qué importa culturalmente

Project AIRI representa un movimiento más amplio: la gente quiere IA personal, privada, controlable y con personalidad, no asistentes corporativos filtrados. Sea la primera "waifu cyber" open source en llegar a masas o no, marca un punto en el que este tipo de proyectos dejan de ser juguetes de nicho y entran al mainstream.`,
    image_prompt: "Anime style AI companion with VRM 3D avatar, real-time voice interaction interface, Minecraft integration, self-hosted local inference running on WebGPU, dark purple background, violet accents, professional",
  },

  // 17. Pituitary
  {
    source: "github", source_id: "dusk-network/pituitary", url: "https://github.com/dusk-network/pituitary",
    name: "Pituitary", stars: 1700, language: "TypeScript", author: "dusk-network", category_id: 2,
    difficulty: "medio", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "specs", "drift", "mcp", "documentacion", "auditoria"],
    seo_slug: "pituitary-ai-spec-drift-detector",
    seo_title: "Pituitary: Detecta y corrige el AI Spec Drift en tu repositorio automáticamente",
    seo_description: "Pituitary de Dusk Foundation escanea tu repo, encuentra contradicciones entre código, docs y specs y las corrige sola. Con servidor MCP y 100% open source.",
    summary_es: `Pituitary es una herramienta open source desarrollada por Dusk Foundation que detecta y corrige el AI Spec Drift: el fenómeno silencioso por el cual un agente de IA genera código que contradice las especificaciones y documentación del proyecto. Escanea el repo entero, encuentra contradicciones entre código, docs y specs, y las arregla de forma automatizada. Incluye servidor MCP integrado.

## Qué es el AI Spec Drift y por qué es peligroso

AI Spec Drift es la desviación progresiva entre tres artefactos que deberían estar alineados:

- **Specs**: lo que el equipo decidió que el sistema debe hacer
- **Docs**: lo que está escrito en los documentos del proyecto
- **Código**: lo que efectivamente está implementado

Cuando un agente de IA escribe código, a veces ignora specs, reinterpreta docs o introduce comportamientos que contradicen lo decidido. Al principio pasa desapercibido. Con el tiempo, el proyecto acumula contradicciones: la documentación dice una cosa, el código hace otra y los specs están olvidados. El resultado es código que parece correcto aislado pero que rompe el contrato del proyecto entero.

## Cómo lo detecta Pituitary

### Escaneo completo del repo
Pituitary analiza en paralelo las tres dimensiones (código fuente, documentación, specs) y construye un grafo de correspondencias entre ellas.

### Detección de contradicciones
Usa modelos de lenguaje para identificar incoherencias: funciones que se llaman distinto en docs vs código, parámetros que cambiaron de tipo, flujos descritos que ya no están implementados, endpoints sin documentar, specs que el código ignora.

### Corrección asistida
Para cada contradicción detectada, propone soluciones. Puede actualizar la documentación, proponer cambios al código o sugerir que se revisen los specs para resolver la ambigüedad.

### Servidor MCP incluido
Soporta el Model Context Protocol para integrarse directamente con Claude Code, Cursor y otros agentes. Los agentes pueden consultar Pituitary antes de escribir código para no reintroducir drift.

## Por qué es especialmente útil ahora

Los agentes de IA están acelerando el ritmo al que se escribe código, pero no necesariamente al que se mantiene coherente con specs y docs. Sin una herramienta como Pituitary, los repos que usan mucho IA acumulan drift silencioso hasta que algo importante falla en producción.

## Flujo de trabajo típico

1. Ejecutas pituitary scan en tu repo
2. Obtienes un reporte con todas las contradicciones detectadas
3. Revisas cada caso y decides si es un error del código, de los docs o de los specs
4. Aplicas las correcciones sugeridas (manual o automáticamente)
5. El servidor MCP evita que tus agentes reintroduzcan drift en futuras sesiones

## Limitaciones honestas

- La calidad del análisis depende del modelo LLM subyacente
- Puede generar falsos positivos: contradicciones aparentes que en realidad son intencionales
- Repos muy grandes pueden requerir tiempo y tokens significativos para escanear
- Las specs poco estructuradas dificultan la detección automática
- No sustituye revisiones humanas ni tests: complementa, no reemplaza
- Todavía es una herramienta temprana y en evolución rápida

## Por qué importa

Dusk Foundation, el equipo detrás de esto, entiende un problema real del desarrollo con IA y ofrece una solución concreta sin humo. En un momento donde "specs" vuelven a ser centrales (con prácticas como Spec Driven Development), Pituitary se posiciona como una herramienta clave para que la IA acelere sin romper la coherencia del proyecto a largo plazo.`,
    image_prompt: "AI Spec Drift detector scanning codebase with contradictions highlighted between specs docs and code, MCP server icon, automated repair workflow, dark purple background, violet accents, professional",
  },

  // 18. Cline Kanban
  {
    source: "github", source_id: "cline/kanban", url: "https://github.com/cline/kanban",
    name: "Cline Kanban", stars: 3400, language: "TypeScript", author: "cline", category_id: 2,
    difficulty: "medio", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["kanban", "agentes-ia", "worktrees", "claude", "cline", "orquestacion"],
    seo_slug: "cline-kanban-orquestacion-agentes-ia",
    seo_title: "Cline Kanban: El tablero que coordina a tus agentes de IA con worktrees aislados",
    seo_description: "Cline Kanban es un tablero open source para orquestar tareas entre agentes de IA con worktrees aislados, cadenas de dependencias y review de diffs.",
    summary_es: `Cline Kanban es un tablero open source diseñado para orquestar tareas entre múltiples agentes de IA trabajando en paralelo sobre el mismo repositorio. Usa worktrees de Git aislados para cada tarea, cadenas de dependencias para proyectos grandes, review de diffs con un click y un agente lateral que desglosa y enlaza automáticamente todo lo que pasa. Es agnóstico al agente: funciona con Claude, Codex, Cline y otros.

## Por qué un Kanban específico para agentes de IA

Los tableros Kanban tradicionales (Trello, Jira, Linear) están pensados para humanos. Los humanos trabajan a un ritmo predecible, no en paralelo masivo, y entienden el contexto de lo que hacen. Los agentes de IA son distintos: lanzan decenas de cambios en paralelo, entran en conflictos si tocan los mismos archivos y necesitan pistas claras de dependencias. Cline Kanban nació para esa nueva forma de trabajar.

## Qué trae que un Kanban normal no

### Worktrees aislados
Cada tarea abierta en el tablero corre en un worktree de Git propio. Esto significa que dos agentes pueden trabajar simultáneamente sobre la misma base de código sin pisarse. Adiós a merge conflicts inesperados y a estados de branch corruptos.

### Cadenas de dependencias
Defines qué tareas dependen de qué. El tablero solo permite avanzar a una tarea cuando sus dependencias están listas, orquestando automáticamente proyectos con docenas de pasos.

### Review de diffs con un solo click
Cada tarea completada presenta su diff en el tablero. Lo apruebas o lo rechazas con un click. Sin tener que saltar a GitHub, abrir la PR, esperar carga, comentar.

### Sidebar agent
Un agente lateral que observa todo lo que pasa en el tablero y:
- Desglosa tareas grandes en subtareas
- Enlaza tareas relacionadas automáticamente
- Resume el estado del proyecto
- Avisa de riesgos o bloqueos

### Agnóstico al agente
No te ata a un único proveedor. Conectas Claude, Codex, Cline u otros. Cada agente ejecuta sus tareas asignadas sin importar cuál sea.

## Contexto: por qué Cline lanzó esto

Cline es uno de los agentes de codificación open source más conocidos. Este tablero es la capa de orquestación que muchos usuarios pedían: un lugar donde manejar múltiples agentes corriendo en paralelo, con control humano claro. Incluso si no usas Cline directamente, el tablero es útil.

## Casos de uso concretos

- **Refactors gigantes**: divides el trabajo en 50 tareas pequeñas, los agentes las hacen en paralelo, tú apruebas en batch
- **Bug fixes masivos**: 20 issues pendientes, 5 agentes trabajando simultáneamente sin conflictos
- **Migraciones**: actualizar dependencias, renombrar APIs, reformatear código a escala
- **Documentación**: un agente genera docs por módulo sin bloquearse con los demás
- **Testing**: generar tests unitarios en paralelo por componentes

## Limitaciones honestas

- Requiere familiaridad con Git worktrees y branches
- La configuración inicial para un equipo puede tomar tiempo
- El review humano sigue siendo el cuello de botella: más agentes no significa review automático
- Los agentes pueden entrar en loops extraños si las dependencias no están bien definidas
- El proyecto es joven y la curva de mejoras será constante

## Por qué llama la atención

Si el futuro del desarrollo es humanos coordinando múltiples agentes en paralelo, necesitas nuevas herramientas para hacerlo bien. Cline Kanban es una apuesta concreta en esa dirección, y una que merece estar en el radar de cualquier equipo que ya está experimentando con flotas de agentes.`,
    image_prompt: "Kanban board with AI agent avatars working on parallel tasks, Git worktree branches visualization, dependency chains between tasks, diff review interface, dark purple background, violet accents, professional",
  },

  // 19. Icarus-Daedalus
  {
    source: "github", source_id: "esaradev/icarus-daedalus", url: "https://github.com/esaradev/icarus-daedalus",
    name: "Icarus-Daedalus", stars: 800, language: "Python", author: "esaradev", category_id: 1,
    difficulty: "dificil", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["agentes-ia", "multi-agente", "hermes", "memoria", "pareja", "estudiante-maestro"],
    seo_slug: "icarus-daedalus-pareja-agentes-hermes",
    seo_title: "Icarus-Daedalus: Pareja de agentes Hermes con memoria compartida entre plataformas",
    seo_description: "Icarus-Daedalus es una implementación lista de dos agentes Hermes con memoria persistente compartida: Icarus creativo e impulsivo, Daedalus preciso y crítico.",
    summary_es: `Icarus-Daedalus es una implementación concreta de dos agentes Hermes que trabajan en pareja con memoria persistente compartida entre plataformas. Representa un patrón arquitectónico poderoso para tareas complejas: un agente creativo y arriesgado (Icarus) y un agente preciso y crítico (Daedalus) que colaboran tomando decisiones complementarias.

## La metáfora detrás del diseño

La mitología griega inspira el reparto de roles:

- **Icarus** es el estudiante impulsivo, creativo y a veces caótico. Propone ideas arriesgadas, explora caminos no evidentes, rompe supuestos.
- **Daedalus** es el maestro preciso, arquitectónico y crítico. Evalúa lo que Icarus propone, filtra los errores, garantiza coherencia.

Esta dinámica imita la relación real entre equipos humanos que necesitan tanto creatividad desbocada como rigor técnico. Un solo agente tiende a ser demasiado conservador (se queda en lo seguro) o demasiado errático (propone y nunca valida). Una pareja bien diseñada compensa ambos extremos.

## Qué ofrece el repositorio

### Implementación lista para usar
No es solo teoría: está el código que corre y que puedes probar desde el primer commit.

### Memoria persistente compartida
Los dos agentes comparten un almacén de memoria común que persiste entre sesiones y entre plataformas. Lo que Icarus descubrió ayer lo recuerda Daedalus hoy, sin importar si trabajas en un portátil, un servidor o un entorno distinto.

### Comunicación estructurada
Los roles están codificados en los prompts base: Icarus siempre propone, Daedalus siempre evalúa. La conversación fluye como un debate constructivo donde cada turno aporta algo distinto.

### Arquitectura Hermes
Hermes es una familia de agentes con prompts y estructura de memoria específicos. Esta implementación instancia dos agentes Hermes configurados para complementarse.

## Casos de uso donde la pareja brilla

### Diseño de arquitectura de software
Icarus propone arquitecturas no obvias (event-driven, CQRS, serverless). Daedalus las tumba una a una hasta dejar la que realmente resuelve el problema sin sobrecomplicar.

### Brainstorming científico
Icarus dispara hipótesis locas. Daedalus verifica contra datos conocidos y marca las que tienen base real.

### Debugging de problemas complejos
Icarus lanza teorías de por qué algo falla. Daedalus descarta las imposibles y señala las prometedoras.

### Escritura creativa técnica
Icarus redacta borradores vívidos. Daedalus verifica precisión, corrige imprecisiones y tensa los argumentos.

## Limitaciones honestas

- El coste de API se duplica al menos (dos agentes corriendo en cada turno)
- Para tareas simples es exagerado: un solo agente basta
- La calidad depende mucho de lo bien afinados que estén los prompts de roles
- La memoria compartida añade complejidad operativa (gestión, persistencia, limpieza)
- Si ambos agentes usan el mismo modelo subyacente, la diversidad de pensamiento es limitada
- Requiere comodidad con arquitecturas multi-agente: no es plug-and-play para principiantes

## Por qué estudiar este repo

Icarus-Daedalus es un ejemplo pedagógico valioso de cómo se estructura un sistema multi-agente con roles complementarios y memoria compartida. Incluso si no lo usas en producción, leer su código te da patrones aplicables a tus propios experimentos con agentes. Es una de esas implementaciones pequeñas que enseñan más que documentos académicos.`,
    image_prompt: "Two AI agents collaborating with mythological theme, creative Icarus and precise Daedalus, shared memory cloud between them, multi-agent architecture diagram, dark purple background, violet accents, professional",
  },

  // 20. Nova YouTube Agent
  {
    source: "github", source_id: "sharbelxyz/nova-youtube-agent", url: "https://github.com/sharbelxyz/nova-youtube-agent",
    name: "Nova YouTube Agent", stars: 2200, language: "Python", author: "sharbelxyz", category_id: 1,
    difficulty: "medio", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["youtube", "agente-ia", "creadores", "automatizacion", "local", "video"],
    seo_slug: "nova-youtube-agent-creadores-automatizacion",
    seo_title: "Nova YouTube Agent: El agente que acelera la producción de vídeos sin salir de tu equipo",
    seo_description: "Nova YouTube Agent automatiza investigación, guion, thumbnails y SEO para creadores de YouTube. Se instala en 5 minutos con OpenClaw y corre 100% local.",
    summary_es: `Nova YouTube Agent es un agente de IA open source diseñado para acelerar la producción completa de vídeos de YouTube: investigación, guion, optimización SEO, generación de thumbnails y programación de publicaciones. Según su creador, reduce un flujo que tomaba 4-6 horas por vídeo a aproximadamente 1 hora, dejando a Nova el resto. Se instala en 5 minutos con OpenClaw y todo corre en local: tus datos nunca salen de tu máquina.

## Qué resuelve para creadores de YouTube

Crear un vídeo de YouTube "simple" lleva mucho más trabajo invisible del que parece:

- Investigar qué tema tiene demanda en el nicho
- Analizar qué están haciendo los competidores
- Escribir un guion claro y atractivo
- Preparar títulos, descripciones y tags SEO-optimizados
- Diseñar thumbnails que compitan visualmente
- Planificar cadencia de publicación

Cada tarea consume atención y tiempo, y muchas son repetitivas. Nova automatiza las partes mecánicas para que el creador se enfoque en grabar y editar.

## Qué hace Nova exactamente

### Investigación de tendencias
Analiza qué temas están creciendo en tu nicho, qué palabras clave están en alza, qué ángulos están funcionando para otros canales similares.

### Generación de guion
A partir de un tema, genera un borrador de guion estructurado: hook inicial, puntos principales, call to action. Tú editas y personalizas según tu estilo.

### SEO automatizado
Crea títulos optimizados, descripciones con keywords correctas y listas de tags relevantes basándose en lo que YouTube premia actualmente.

### Generación de thumbnails
Propone miniaturas con texto, colores y composiciones pensadas para maximizar clicks dentro de tu estilo de marca.

### Análisis de competidores
Te enseña qué están lanzando otros canales, qué funciona y qué no, para tomar decisiones informadas.

## Por qué ejecuta local

- **Privacidad**: tus scripts, tus estrategias y tu investigación no se comparten con terceros
- **Coste**: usas tus propios modelos o APIs propias sin intermediarios que marquen sobreprecio
- **Control**: puedes personalizar el agente a tu voz y estilo sin depender de permisos externos
- **Sin límites artificiales**: no hay plan "pro" ni "enterprise" que te limite funciones

## Instalación con OpenClaw

OpenClaw es el instalador que usa Nova para desplegar todas las dependencias (modelos, tools, scrapers) en minutos. Según el creador, bastan 5 minutos desde cero hasta tener el agente funcionando.

## Para quién tiene sentido

- **Creadores solos**: gestionan todo el canal sin equipo, Nova les quita horas repetitivas
- **Equipos pequeños de contenido**: el agente hace el primer borrador, los humanos pulen
- **Nichos en crecimiento**: donde la velocidad de publicación marca la diferencia
- **Canales educativos y tutoriales**: donde la investigación y el SEO son especialmente rentables

## Limitaciones honestas

- No reemplaza la creatividad humana: genera borradores, no obras maestras
- La calidad depende de tus modelos locales o tus propias API keys
- Los thumbnails automáticos rara vez son tan buenos como los de un diseñador humano
- YouTube cambia su algoritmo constantemente: el SEO óptimo requiere ajustes continuos
- La investigación automatizada puede sesgar hacia temas ya saturados
- No graba ni edita vídeos: la grabación sigue siendo tu responsabilidad

## Por qué merece probarse

Si eres creador de YouTube, el cuello de botella rara vez es "qué vídeo hacer": es "cuántas horas me va a llevar todo lo que rodea al vídeo". Nova ataca justamente ese coste oculto y lo hace en un formato abierto, local y gratuito. Es una de las formas más concretas de usar agentes de IA para un trabajo real y medible.`,
    image_prompt: "YouTube creator workflow automation dashboard with AI agent generating scripts thumbnails and SEO metadata, local processing indicator, content creation pipeline, dark purple background, violet accents, professional",
  },

  // 21. PlayCanvas SuperSplat
  {
    source: "github", source_id: "playcanvas/supersplat", url: "https://github.com/playcanvas/supersplat",
    name: "PlayCanvas SuperSplat", stars: 7400, language: "TypeScript", author: "playcanvas", category_id: 7,
    difficulty: "medio", interest_score: 92, is_oss_alternative: false, alternative_to: null,
    tags: ["gaussian-splatting", "3d", "webgl", "playcanvas", "fotorealismo", "navegador"],
    seo_slug: "playcanvas-supersplat-gaussian-splatting-navegador",
    seo_title: "PlayCanvas SuperSplat: Edita Gaussian Splatting fotorealista directamente en el navegador",
    seo_description: "SuperSplat de PlayCanvas es un editor y viewer de Gaussian Splatting que permite explorar escenas 3D fotorealistas como Versalles en el navegador.",
    summary_es: `PlayCanvas SuperSplat es un editor y viewer open source de Gaussian Splatting, la técnica que está revolucionando la captura 3D fotorrealista. Permite cargar escenas capturadas del mundo real (como el Hameau de la Reine de Versalles) y explorarlas en el navegador con calidad cinematográfica, sin plugins, sin instalaciones, solo una URL.

## Qué es Gaussian Splatting y por qué importa

Gaussian Splatting es una técnica de renderizado 3D que usa millones de "splats" gaussianos en vez de mallas tradicionales para representar una escena. A diferencia de los métodos clásicos:

- **Captura realidad directa**: conviertes fotos o vídeos del mundo real en escenas 3D explorables
- **Fotorrealismo sin modelar**: no necesitas artistas 3D modelando cada objeto
- **Render rápido**: se ejecuta bien en GPUs consumer
- **Resultados impresionantes**: agua, vegetación, telas, reflejos, todo lo que era difícil de modelar, se captura bien

## Qué ofrece SuperSplat

### Editor visual
Cargas un archivo .splat o .ply, navegas la escena, recortas zonas, eliminas artefactos de la captura original. Es el Blender del Gaussian Splatting.

### Viewer web ultra-rápido
El viewer carga escenas en el navegador aprovechando WebGL y optimizaciones de PlayCanvas. No requiere instalar nada para el espectador final.

### Exportación flexible
Exporta formatos estándar (.splat, .ply) para usarlos en Unity, Unreal, otros motores o tu propia web.

### Pensado para producción
No es solo una demo: es la herramienta que PlayCanvas usa internamente y que está madurando como pieza clave de su ecosistema.

## Ejemplo real impresionante

El Hameau de la Reine en Versalles, capturado en Gaussian Splatting y explorado con SuperSplat, permite literalmente caminar dentro de la aldea rústica de María Antonieta del siglo XVIII. No es un vídeo pregrabado: es una escena 3D real que puedes atravesar desde cualquier ángulo, con iluminación realista y detalles imposibles de modelar a mano en tiempo razonable.

## Casos de uso concretos

### Turismo virtual y cultura
Museos, monumentos, ruinas arqueológicas accesibles en 3D fotorrealista desde cualquier navegador.

### Real estate
Pisos, oficinas y locales capturados en 3D que los clientes exploran antes de visitar físicamente.

### Bodas y eventos
Conservar espacios memorables con una inmersión que las fotos no pueden replicar.

### Videojuegos y cine
Escenarios reales como fondos o referencias para producciones digitales.

### Arqueología y patrimonio
Documentar sitios frágiles con una fidelidad que los escaneos láser tradicionales no alcanzan.

### E-commerce premium
Mostrar productos de lujo (joyas, coches, obras de arte) con calidad casi presencial.

## Limitaciones honestas

- La captura original requiere conocimientos (fotogrametría, escaneo, etc.)
- Los archivos .splat pueden ser pesados (cientos de MB) según la escena
- El rendimiento en dispositivos con GPU modesta puede caer
- No reemplaza modelos 3D tradicionales para uso interactivo (colisiones, física, animación)
- La edición avanzada de splats sigue siendo un campo joven con menos tooling que el 3D tradicional
- Los artefactos de captura (flicker, holes) requieren limpieza manual

## Por qué es una pieza fundamental

PlayCanvas lleva años liderando el 3D en navegador. SuperSplat es una de sus apuestas más ambiciosas: llevar Gaussian Splatting al mainstream web. Si esta técnica se consolida (y todo apunta a que sí), herramientas como SuperSplat serán el equivalente al Photoshop para una nueva categoría visual.`,
    image_prompt: "Photorealistic Gaussian Splatting 3D scene of historical palace gardens rendered in web browser, point cloud visualization, immersive real-world capture, dark purple background, violet accents, professional",
  },

  // 22. UncommonRoute
  {
    source: "github", source_id: "CommonstackAI/UncommonRoute", url: "https://github.com/CommonstackAI/UncommonRoute",
    name: "UncommonRoute", stars: 1300, language: "Python", author: "CommonstackAI", category_id: 1,
    difficulty: "medio", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["proxy", "llm", "router", "ahorro", "local", "api"],
    seo_slug: "uncommonroute-proxy-llm-ahorro-costes",
    seo_title: "UncommonRoute: Proxy local que ahorra hasta 85% en APIs de LLM enrutando por dificultad",
    seo_description: "UncommonRoute analiza cada prompt en 0.5ms y lo envía al modelo más barato que pueda resolverlo. Hasta 85% de ahorro real. 100% local con tus API keys.",
    summary_es: `UncommonRoute es un proxy local que se coloca entre tu aplicación y las APIs de LLM (OpenAI, Anthropic, Google). Analiza cada prompt en medio milisegundo, estima su dificultad y lo enruta automáticamente al modelo más barato que pueda resolverlo con calidad suficiente. El ahorro reportado llega hasta el 85% sobre el coste de usar siempre el modelo top-of-the-line.

## El problema real de los costes de LLM

Muchos equipos y usuarios individuales caen en el mismo patrón: eligen el modelo más caro (GPT-4, Claude Opus, Gemini Ultra) porque "quieren calidad" y lo usan para absolutamente todo. El resultado es una factura de API que crece sin control, cuando la realidad es que muchos prompts podrían resolverse con modelos mucho más baratos sin pérdida de calidad real.

Los tres escenarios clásicos:

- **Prompts simples a modelos caros**: "¿Qué hora es?" no necesita GPT-4
- **Prompts ambiguos a modelos baratos**: "Refactoriza este archivo" puede necesitar un modelo grande
- **Todo al mismo modelo por comodidad**: el 95% de la factura se va en queries que no lo justifican

UncommonRoute arregla esto sin que cambies tu código.

## Cómo funciona

### Análisis en 0.5 ms
Cada prompt que pasa por el proxy se analiza con un clasificador ligero que estima la complejidad. La latencia añadida es despreciable frente al tiempo total de inferencia.

### Enrutado al modelo óptimo
Según la complejidad estimada, el proxy envía el prompt al modelo más barato que pueda resolverlo con calidad aceptable. Una pregunta trivial va a un modelo pequeño; una tarea compleja va a uno grande.

### 100% local
El proxy corre en tu máquina o tu infraestructura. No pasa nada por servidores externos, así que no hay riesgo de filtrado de datos ni tracking adicional.

### Tus propias API keys
Usas las claves que ya tienes con los proveedores. UncommonRoute no factura nada: solo optimiza el uso.

### Sin tracking
No envía telemetría, no registra tus prompts fuera, no construye perfiles. Lo que ocurre en tu proxy se queda en tu proxy.

## Casos de uso donde brilla

### Productos SaaS con miles de queries
Si tu app hace millones de llamadas al mes, ahorrar 60-85% en coste es literalmente la diferencia entre rentabilidad y pérdida.

### Agentes de IA intensivos
Un agente que hace docenas de llamadas por tarea gana muchísimo con un router inteligente.

### Desarrollo personal con presupuesto limitado
Desarrolladores individuales que experimentan sin querer gastar cientos al mes.

### Benchmarks y experimentación
Probar un mismo prompt en varios modelos automáticamente para comparar calidad.

## De dónde viene

Un investigador de la Northwestern University publicó UncommonRoute como respuesta al coste creciente de usar agentes de codificación con APIs. Es un proyecto académico con ambición práctica.

## Limitaciones honestas

- El clasificador puede equivocarse: a veces envía al modelo pequeño un prompt que necesitaba más potencia
- Calibrar la sensibilidad del router requiere trabajo inicial
- La latencia sigue siendo la del modelo destino: el proxy no acelera las llamadas
- No funciona bien si necesitas respuestas "siempre del mismo modelo" por consistencia de estilo
- El ahorro reportado depende del mix de queries: si todo es difícil, el ahorro baja
- Añadir un proxy implica un punto más de mantenimiento en tu stack

## Por qué es importante

A medida que los LLM se convierten en infraestructura básica, optimizar su coste es tan crítico como optimizar el coste de cloud hace diez años. UncommonRoute es una de las primeras soluciones open source serias en esta dirección, y un 85% de ahorro, aunque sea parcial, es una cifra que justifica invertir tiempo en integrarlo.`,
    image_prompt: "Smart LLM routing proxy visualization with prompts being analyzed and sent to different AI models, cost savings dashboard showing 85 percent reduction, local privacy shield, dark purple background, violet accents, professional",
  },

  // 23. TrendingContent
  {
    source: "github", source_id: "gabogabucho/trendingcontent-agent", url: "https://github.com/gabogabucho/trendingcontent-agent",
    name: "TrendingContent", stars: 1100, language: "Python", author: "gabogabucho", category_id: 1,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["marketing", "tendencias", "reddit", "tiktok", "skill", "contenido"],
    seo_slug: "trendingcontent-skill-marketing-tendencias",
    seo_title: "TrendingContent: La skill que rastrea tendencias y genera copy para marketing",
    seo_description: "TrendingContent es un skill para Claude/Hermes que rastrea tendencias en tiempo real en Reddit X TikTok y genera copy listo para marketing.",
    summary_es: `TrendingContent es una skill para agentes de IA (compatible con Claude, Hermes y OpenClaw) que rastrea tendencias en tiempo real en múltiples plataformas (Reddit, X, TikTok) y genera copy publicitario y de contenido listo para usar. Su propósito declarado es brutalmente directo: ahorrar horas de investigación manual a profesionales de marketing que siguen tendencias diariamente.

## El problema que ataca

Trabajar en marketing hoy significa dedicar una parte enorme del tiempo a tres tareas invisibles:

- Monitorear qué está explotando en redes sociales en este preciso momento
- Identificar qué ángulos están funcionando en cada plataforma
- Redactar copy inicial adaptado a cada audiencia

El resultado es un marketer que empieza el día con 50 pestañas abiertas y termina sin haber producido contenido porque se perdió investigando. TrendingContent automatiza la fase de investigación y la primera iteración de copy.

## Qué hace en concreto

### Rastreo multi-plataforma
Monitorea simultáneamente:
- **Reddit**: subreddits del nicho relevante
- **X (Twitter)**: trending topics, hashtags de sector
- **TikTok**: sonidos, retos y formatos en alza

### Análisis en tiempo real
No revisa tendencias de la semana pasada: trabaja sobre data actualizada, porque una tendencia de hace 72 horas en TikTok ya es vieja.

### Generación de copy adaptado
Produce borradores de posts, tweets, captions y scripts orientados a cada plataforma con el tono adecuado. No sirve una misma frase para LinkedIn y TikTok; TrendingContent lo adapta.

### Compatible con varios agentes
Funciona como skill dentro de Claude, Hermes u OpenClaw. Si ya usas alguno de esos agentes, lo añades a tu stack sin fricción.

## Flujo típico con TrendingContent

1. Abres tu agente (Claude, Hermes, OpenClaw)
2. Invocas la skill con tu tema o vertical (moda, fitness, tech, cripto...)
3. La skill rastrea las plataformas y devuelve tendencias relevantes
4. Genera copy para varias piezas adaptadas a cada canal
5. Tú revisas, editas con tu voz y publicas

## Para quién tiene sentido

- **Freelancers de marketing**: atienden varios clientes y no pueden dedicar horas a cada uno
- **Community managers**: necesitan ideas diarias y frescas
- **Equipos in-house pequeños**: marketing de startup con recursos limitados
- **Creadores de contenido propios**: youtubers, instagramers que buscan ángulos nuevos
- **Agencias pequeñas**: escalar atención sin sumar headcount

## Limitaciones honestas

- Las tendencias cambian rápido: un rastreo de hace 6 horas puede quedar obsoleto
- El copy generado necesita edición humana para sonar natural y específico del brand
- La cobertura de plataformas está limitada a lo que las APIs permiten
- Depende de que las integraciones (Reddit, X, TikTok) sigan funcionando
- Puede sesgar hacia tendencias virales saturadas si no afinas las fuentes
- No sustituye una estrategia editorial: acelera la ejecución táctica

## Por qué destaca

Hay miles de tools de marketing con IA. TrendingContent destaca por ser una skill modular que se integra en agentes que los profesionales ya usan, en vez de ser otro SaaS más que compitiera por tu suscripción. Como skill, es ligera, adaptable y combinable con otras automatizaciones que ya tengas.`,
    image_prompt: "Marketing dashboard tracking trends across Reddit X and TikTok in real time, copy generation workflow for multiple platforms, content creator analytics, dark purple background, violet accents, professional",
  },

  // 24. React Native Reanimated
  {
    source: "github", source_id: "software-mansion/react-native-reanimated", url: "https://github.com/software-mansion/react-native-reanimated",
    name: "React Native Reanimated", stars: 9200, language: "TypeScript", author: "software-mansion", category_id: 7,
    difficulty: "medio", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["react-native", "animaciones", "svg", "worklets", "mobile", "performance"],
    seo_slug: "react-native-reanimated-4-3-svg-animations",
    seo_title: "React Native Reanimated 4.3: Animaciones CSS en SVG y Shared Values en cualquier thread",
    seo_description: "Reanimated 4.3 trae CSS animations en SVG con path morphing, gradientes animados, Shared Values cross-thread y mejoras importantes de performance.",
    summary_es: `React Native Reanimated es la librería de animaciones más importante del ecosistema React Native, mantenida por Software Mansion. La versión 4.3 llega con cambios que tocan la fibra de cualquier desarrollador mobile: CSS animations sobre SVG, path morphing brutal, gradientes y texto animados en una línea, y Shared Values que funcionan sin drama entre cualquier thread. Además optimiza listas, estabiliza la web y apoya de serie la nueva arquitectura de React Native.

## Qué es Reanimated y por qué es crítica

En React Native, las animaciones mal hechas tienen un coste directo: bridge saturado, frames perdidos, apps que se sienten lentas. Reanimated nació para resolver ese problema ejecutando animaciones fuera del thread JavaScript, en nativo, con una API declarativa que se siente idiomática de React.

Hoy en día es infraestructura básica: proyectos React Native serios sin Reanimated son cada vez más raros.

## Novedades clave en 4.3

### CSS animations en SVG
Podías animar componentes, pero animar SVG era un dolor. Ahora escribes animaciones tipo CSS directamente sobre elementos SVG y funcionan en nativo con la performance de Reanimated.

### Path morphing real
Transformar un path SVG en otro (por ejemplo un icono de menú en una X) se hace con una línea. Antes requerías librerías adicionales o cálculos manuales. Ahora está en el core.

### Gradientes, texto e imágenes animados
Todos los elementos SVG comunes reciben soporte de animación en una API consistente. Puedes animar colores de gradientes, posiciones de texto, transformaciones de imágenes con la misma simpleza.

### Shared Values cross-thread
Los Shared Values (la unidad de estado compartido entre threads) ahora funcionan de forma fluida en cualquier worklet sin la gimnasia anterior. Adiós a los dolores de cabeza de worklets y bridges.

### Listas y scroll optimizados
Trabajos específicos para que listas largas con animaciones por ítem no sacrifiquen performance.

### Web más estable
Reanimated corre en React Native Web con un nivel de estabilidad nunca visto. Una sola base de código que anima igual en iOS, Android y web.

### Soporte para New Architecture
La nueva arquitectura de React Native (Fabric, TurboModules) está totalmente soportada por defecto. No es un modo experimental: es la ruta principal.

## Casos de uso que cambian con esta versión

### Iconos animados vectoriales
Transiciones fluidas entre iconos con path morphing nativo, sin hacks.

### Visualizaciones de datos
Gráficos SVG animados con gradientes que cambian, tooltips que se mueven y transiciones entre estados.

### Onboardings ricos
Animaciones encadenadas entre pantallas con SVGs como héroes narrativos.

### Logos y branding
Animar el logo de la app al arrancar con fidelidad visual y cero coste de performance.

## Limitaciones honestas

- Migrar desde versiones antiguas de Reanimated implica romper algún código
- La curva de aprendizaje de worklets y Shared Values no es trivial
- Algunos componentes third-party pueden no ser compatibles con la New Architecture todavía
- El rendimiento en dispositivos Android muy antiguos sigue siendo variable
- La documentación, aunque buena, cubre mejor iOS que Android en algunos casos
- Depende de ajustes de configuración cuidadosos para evitar bugs sutiles

## Por qué importa estar al día

Cuando Reanimated saca una versión mayor, el ecosistema React Native se mueve con ella: navegaciones, UI kits, librerías de gráficos. Estar en la última versión significa menos bugs, menos fricción con dependencias y acceso a APIs nuevas que aceleran desarrollo. Si tu app React Native todavía usa Reanimated 2, la 4.3 debería ser una conversación seria en tu roadmap.`,
    image_prompt: "React Native animation library showcase with SVG path morphing, animated gradients and smooth transitions across mobile screens, worklets running on native thread, dark purple background, violet accents, professional",
  },

  // 25. FilaWidgets
  {
    source: "github", source_id: "LaravelDaily/FilaWidgets", url: "https://github.com/LaravelDaily/FilaWidgets",
    name: "FilaWidgets", stars: 1500, language: "PHP", author: "LaravelDaily", category_id: 7,
    difficulty: "facil", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["filament", "laravel", "widgets", "dashboard", "php", "admin"],
    seo_slug: "filawidgets-widgets-premium-filamentphp",
    seo_title: "FilaWidgets: 5 widgets premium que transforman cualquier dashboard de Filament",
    seo_description: "FilaWidgets añade 5 widgets profesionales a FilamentPHP: SparklineTable, Breakdown, Progress, CompletionRate y HeatmapCalendar. Listos para copiar y pegar.",
    summary_es: `FilaWidgets es un paquete open source para FilamentPHP (la suite de paneles administrativos para Laravel) que añade cinco widgets profesionales listos para copiar y pegar. Transforma dashboards genéricos de Filament en interfaces visualmente indistinguibles de las que usan SaaS que facturan millones: gráficos sparkline, progreso, breakdowns, completion rates y calendarios heatmap estilo GitHub.

## Qué es FilamentPHP y por qué importa

FilamentPHP es uno de los frameworks más queridos del ecosistema Laravel: permite construir paneles administrativos, CRMs y dashboards en horas en vez de semanas, con componentes pre-diseñados en Livewire + Tailwind. Millones de desarrolladores Laravel lo usan a diario.

El problema es que los widgets por defecto de Filament son buenos pero básicos: tablas, gráficos simples, contadores. Si quieres que tu dashboard se vea como uno de Stripe, Linear o Notion, te toca fabricar widgets custom. Ahí entra FilaWidgets.

## Los 5 widgets incluidos

### SparklineTable Widget
Tabla con sparklines (mini-gráficos) por fila. Ves el historial de un KPI junto al KPI en sí, en una tabla compacta y elegante. Perfecto para listas de clientes, productos o métricas por segmento.

### BreakdownWidget
Visualización de desglose de un total en componentes: ingresos por producto, usuarios por plan, tráfico por fuente. Con animaciones suaves y estética de dashboard premium.

### ProgressWidget
Indicadores de progreso visuales para objetivos, goals, uso de cuota, funnels. Van más allá de la barra plana: muestran contexto, tendencia y estado.

### CompletionRateWidget
Específico para ratios de completitud (onboardings, checklists, procesos multi-paso). Da feedback inmediato del estado del flujo.

### HeatmapCalendarWidget
El clásico calendario heatmap estilo GitHub contributions. Visualiza actividad, uso o engagement por día a lo largo del tiempo. Es de los componentes que convierten un dashboard "funcional" en uno "memorable".

## Cómo se integra

1. Instalas el paquete vía Composer
2. Publicas los assets (si es necesario)
3. Añades los widgets a tus paneles Filament
4. Configuras data sources y estilos

No reescribes nada. Solo los enchufas donde Filament espera widgets y funcionan.

## Para quién es

### Agencias que desarrollan con Laravel
Entregas al cliente un panel que parece caro sin esfuerzo extra.

### SaaS que usan Filament como admin
Eleva la percepción de calidad del producto con un día de trabajo.

### Consultores que venden dashboards
Plantilla lista para adaptar a cada cliente sin empezar de cero.

### Productos internos de empresas
El panel del equipo se ve profesional, no un Frankenstein.

### Aprendices de Filament
Los widgets son buen código para estudiar cómo se hacen widgets custom sólidos.

## Limitaciones honestas

- Requiere FilamentPHP instalado (obviamente, pero conviene mencionarlo)
- Los estilos siguen la estética Filament: si tienes un design system muy específico, toca personalizar
- Algunos widgets necesitan JavaScript adicional cargado correctamente
- Las customizaciones profundas requieren entender Livewire y Alpine.js
- No todos los casos de visualización están cubiertos: son 5 widgets, no una librería completa
- Mantenimiento alineado con versiones de Filament: actualizar Filament a veces requiere ajustes

## Por qué es una victoria rápida

Si tienes un proyecto Laravel+Filament y quieres que tu dashboard luzca como los de las empresas serias, FilaWidgets es una de las inversiones más baratas en relación valor/tiempo. Una tarde instalando y ajustando te deja un panel con diferencia visual notable.`,
    image_prompt: "Laravel Filament admin dashboard with premium widgets including sparkline tables, progress bars, heatmap calendars and breakdown charts, modern SaaS aesthetic, dark purple background, violet accents, professional",
  },

  // 26. analyze-new-repo
  {
    source: "github", source_id: "johnlee6511/analyze-new-repo", url: "https://github.com/johnlee6511/analyze-new-repo",
    name: "analyze-new-repo", stars: 900, language: "Python", author: "johnlee6511", category_id: 2,
    difficulty: "facil", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["agentes-ia", "skill", "analisis", "repositorios", "onboarding", "arquitectura"],
    seo_slug: "analyze-new-repo-skill-onboarding-repos",
    seo_title: "analyze-new-repo: La skill que analiza cualquier repo antes de que toques una línea",
    seo_description: "analyze-new-repo es una skill para agentes de IA que genera un análisis completo de qué hace un repo, cómo corre, riesgos y arquitectura clave.",
    summary_es: `analyze-new-repo es una skill para agentes de IA diseñada para una tarea simple pero repetitiva en la vida de un desarrollador: analizar un repositorio nuevo antes de tocar una sola línea de código. Ejecutas un comando y el skill te devuelve un informe estructurado que explica qué hace el proyecto, cómo se corre localmente, qué decisiones de diseño lo caracterizan, qué riesgos esconde y cuál es su centro de gravedad arquitectónico.

## El ritual de llegar a un repo nuevo

Todo desarrollador ha hecho esto cien veces:

1. Clonar un repo nuevo (tuyo, de un compañero, de internet)
2. Abrir README y documentación dispersa
3. Mirar package.json / requirements.txt / go.mod para adivinar el stack
4. Buscar el main / entry point
5. Intentar correrlo localmente y chocarse con errores
6. Ir desmenuzando directorio por directorio hasta entenderlo
7. Quince minutos después, seguir sin tener una foto clara

Este proceso se repite continuamente y consume tiempo valioso. analyze-new-repo lo automatiza.

## Qué genera la skill

### Descripción funcional
Qué hace el proyecto en una explicación clara. No "esto es una app hecha en React", sino "esto es un dashboard de métricas para e-commerce que conecta a Shopify y genera alertas de stock".

### Instrucciones de ejecución
Comandos concretos para instalarlo, configurarlo y correrlo localmente. Incluye variables de entorno esperadas y dependencias externas.

### Decisiones de diseño
Por qué está estructurado como está: decisiones visibles en la arquitectura (monorepo vs polyrepo, estado global vs local, elecciones de librerías).

### Riesgos identificados
Qué partes son frágiles, están desactualizadas o podrían romperse. Zonas de "aquí hay dragones" que te ahorrarán horas de debug más adelante.

### Centro de gravedad arquitectónico
Cuál es el módulo, clase o abstracción central de la que depende todo lo demás. Entender eso es la diferencia entre quedarse flotando y tener ganchos mentales concretos.

## Casos de uso típicos

### Onboarding en nuevo trabajo
Llegas al repo principal el primer día. En vez de perder una semana leyendo todo, tienes un mapa desde el minuto cero.

### Evaluación de librerías open source
Antes de adoptar una dependencia, entiendes su arquitectura interna para valorar riesgo.

### Auditoría de código heredado
Rescatas un proyecto viejo que nadie ha tocado en meses. La skill te explica lo que el equipo original ya no está para contarte.

### Revisión de PR grandes
Cuando llega un PR que refactoriza mucho, puedes analizar primero el repo para tener contexto antes de revisar los diffs.

### Aprendizaje
Estudiar repos ajenos acelera si sabes dónde mirar. La skill te lleva directo al núcleo.

## Limitaciones honestas

- La calidad del análisis depende del modelo LLM de fondo
- Repos muy grandes consumen muchos tokens para analizar en profundidad
- La skill no sustituye leer código real: acelera la primera pasada
- Puede fallar detectando riesgos muy específicos o ocultos en detalles sutiles
- El informe es punto de partida, no verdad absoluta
- Necesita estar integrada en un agente compatible para usarse

## Por qué el patrón "skill + comando único" funciona

La mayoría de desarrolladores no quieren otra app ni otro dashboard. Quieren comandos que les ahorren trabajo concreto. analyze-new-repo encarna esa filosofía: un comando, una tarea, un resultado útil. Es el tipo de skill que, una vez la usas una vez, queda instalada para siempre en tu workflow.`,
    image_prompt: "Repository analysis dashboard showing architecture diagram, risk assessment, design decisions and entry points, AI agent summarizing codebase, developer onboarding flow, dark purple background, violet accents, professional",
  },

  // 27. last30days-skill
  {
    source: "github", source_id: "mvanhorn/last30days-skill", url: "https://github.com/mvanhorn/last30days-skill",
    name: "last30days-skill", stars: 1200, language: "Python", author: "mvanhorn", category_id: 1,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["skill", "tendencias", "investigacion", "reddit", "youtube", "hackernews"],
    seo_slug: "last30days-skill-tendencias-30-dias",
    seo_title: "last30days-skill: Escanea 10 plataformas y te devuelve lo que pasó en un tema en 30 días",
    seo_description: "last30days es un skill que rastrea Reddit X Bluesky YouTube TikTok Instagram Hacker News Polymarket y te devuelve un resumen narrativo de 30 días.",
    summary_es: `last30days es una skill para agentes de IA que rastrea ocho plataformas (Reddit, X, Bluesky, YouTube, TikTok, Instagram, Hacker News y Polymarket) y devuelve un resumen narrativo de todo lo que ocurrió sobre un tema en los últimos 30 días. Ejecutas un solo comando con tu tema y te ahorras horas de buscar manualmente en cada red.

## El trabajo que automatiza

Cualquiera que necesite estar informado sobre un tema que evoluciona rápido (investigadores, analistas, periodistas, founders, inversores) conoce el mismo ritual agotador:

- Revisar subreddits relevantes
- Filtrar búsquedas en X por fecha
- Buscar vídeos recientes en YouTube
- Mirar tendencias de TikTok
- Chequear posts en Instagram
- Seguir discusiones en Hacker News
- Revisar mercados de predicción en Polymarket
- Tratar de juntar todo en una foto coherente

Hacer esto para un tema lleva una tarde entera. Hacerlo para varios temas semanalmente es insostenible. last30days lo reduce a un solo prompt.

## Qué plataformas cubre

### Redes sociales tradicionales
- **Reddit**: discusiones y debates de comunidades especializadas
- **X (Twitter)**: hilos, opiniones y noticias
- **Bluesky**: alternativa emergente con comunidades más pequeñas pero activas

### Video y visual
- **YouTube**: vídeos explicativos, entrevistas, análisis largos
- **TikTok**: contenido viral y nuevas narrativas emergentes
- **Instagram**: visuales y perspectivas de influencers

### Comunidades técnicas y predictivas
- **Hacker News**: noticias tech y debate profesional
- **Polymarket**: mercados de predicción con dinero real en juego

## Qué devuelve la skill

Un resumen narrativo (no solo links) que conecta lo que pasó en cada plataforma en los últimos 30 días:

- Los eventos principales del período
- Las narrativas dominantes en cada red
- Las discrepancias entre plataformas (qué dice la comunidad técnica vs el público general)
- Las señales de mercado (Polymarket) vs el sentimiento público
- Los puntos de inflexión que marcaron el mes

El formato narrativo es clave: no recibes un PDF con 200 links, recibes una historia contada con citas y enlaces a las fuentes.

## Casos de uso donde se vuelve imprescindible

### Inversores y analistas
Entender el pulso de un sector o empresa antes de una decisión importante.

### Investigadores académicos
Mantenerse al día en un campo que se mueve tan rápido que las revistas van tarde.

### Periodistas
Preparar artículos con contexto real de lo que la gente está conversando, no solo lo que dicen las notas de prensa.

### Founders y product managers
Saber qué discute tu audiencia sobre un problema antes de construir la solución.

### Educadores
Llevar a clase discusiones actualizadas y variadas sobre temas complejos.

## Limitaciones honestas

- Las APIs de cada plataforma tienen límites y cambios constantes
- La cobertura de temas en idiomas distintos del inglés es variable
- Algunas plataformas (TikTok, Instagram) son más cerradas y la data disponible es limitada
- El modelo puede sesgar el resumen según sus datos de entrenamiento
- 30 días es mucho: puede perder eventos menores pero relevantes
- La calidad depende del agente subyacente que ejecute la skill

## Por qué es valiosa

Vivimos en exceso de información. Lo caro ya no es acceder a datos, es sintetizarlos. last30days encarna exactamente esa idea: sintetizar a lo largo de 8 fuentes y 30 días en minutos. Es el tipo de herramienta que, una vez la pruebas, te cuesta volver a buscar manualmente.`,
    image_prompt: "Cross-platform trend analysis dashboard scanning Reddit X YouTube TikTok and Hacker News, narrative timeline of last 30 days with insights and citations, dark purple background, violet accents, professional",
  },

  // 28. system-design-101
  {
    source: "github", source_id: "ByteByteGoHq/system-design-101", url: "https://github.com/ByteByteGoHq/system-design-101",
    name: "System Design 101", stars: 81000, language: "Markdown", author: "ByteByteGoHq", category_id: 2,
    difficulty: "medio", interest_score: 95, is_oss_alternative: false, alternative_to: null,
    tags: ["system-design", "arquitectura", "entrevistas", "learning", "diagramas", "backend"],
    seo_slug: "system-design-101-guia-bytebytego",
    seo_title: "System Design 101: La guía visual con 81k estrellas para entender arquitectura de sistemas",
    seo_description: "System Design 101 de ByteByteGo es la guía visual más completa de arquitectura de sistemas con 81k estrellas. Explicaciones con diagramas claros.",
    summary_es: `System Design 101 es un repositorio de ByteByteGo que se ha convertido en la referencia visual más popular del mundo para aprender diseño de sistemas. Con más de 81.000 estrellas en GitHub, es un compendio de diagramas, explicaciones concisas y casos reales que desglosan cómo funcionan los sistemas que usamos todos los días. Si trabajas en backend, infraestructura o te preparas para entrevistas técnicas, este repo es una de esas referencias que no pueden faltar.

## Por qué importa el System Design

System Design es la disciplina que une la ingeniería de software con la ingeniería de infraestructura: cómo diseñas sistemas que sirven a millones de usuarios, cómo eliges entre SQL y NoSQL, cómo tolerar fallos, cómo escalar horizontalmente, cómo modelar colas, caches, replicación, CDNs.

Dominarlo es la diferencia entre un desarrollador que implementa lo que le dicen y un ingeniero que diseña soluciones que sobreviven al éxito. Además, es lo que evalúan las entrevistas de FAANG y empresas top: system design rounds deciden ofertas.

## Qué contiene el repositorio

### Cientos de diagramas visuales
Diagramas limpios, consistentes y claros que explican cada concepto. ByteByteGo se distingue por su estilo visual característico.

### Temas cubiertos
- **Fundamentos**: balanceo de carga, replicación, particionado, caches, CDNs
- **Bases de datos**: SQL vs NoSQL, consistencia, transacciones, índices
- **Colas y streams**: Kafka, Pulsar, RabbitMQ, eventos y pipelines
- **APIs**: REST, GraphQL, gRPC, WebSockets, y cuándo usar cada uno
- **Microservicios**: descomposición, comunicación, descubrimiento, circuit breakers
- **Almacenamiento**: S3, bases de datos distribuidas, sistemas de archivos
- **Observabilidad**: logs, métricas, tracing distribuido
- **Seguridad**: autenticación, autorización, OAuth, JWT
- **Casos reales**: cómo funcionan arquitecturas de sistemas famosos

### Explicaciones concisas
No son tratados académicos: son explicaciones directas que van al grano. Ideales para repasar antes de una entrevista o refrescar un concepto durante el trabajo.

### Casos de sistemas reales
Explicaciones de cómo están construidas arquitecturas conocidas: YouTube, Netflix, Uber, WhatsApp, Instagram. Ver sistemas reales diseccionados es mucho más útil que teoría aislada.

## Para quién es oro puro

### Desarrolladores backend intermedios
Ya sabes programar pero quieres entender cómo se diseñan sistemas a escala.

### Candidatos a entrevistas FAANG
Las rondas de system design son específicas y este repo es la mejor guía gratis disponible.

### Arquitectos de software
Refresco constante de patrones y decisiones de diseño.

### Estudiantes universitarios de informática
Complemento visual y concreto a la teoría de libros de texto.

### Bootcamps y educadores
Material didáctico gratuito con calidad editorial seria.

## Cómo sacar el máximo al repo

- **No lo leas de una sentada**: es para consultar por temas
- **Dibuja los diagramas tú**: copiar un diagrama a mano fija el concepto
- **Aplica a problemas reales**: al leer sobre caches, piensa en tu sistema
- **Hazte preguntas**: cierra el repo y pregúntate qué harías en X escenario
- **Discute con pares**: los debates sobre trade-offs son donde más se aprende

## Limitaciones honestas

- No profundiza mucho en cada tema: es introducción visual, no libro completo
- Por su naturaleza visual, matices complejos quedan fuera
- No cubre la implementación real en código
- Los temas muy específicos (ej. arquitectura de un DB concreto) tienen menos cobertura
- Se actualiza regularmente pero tecnologías nuevas pueden tardar en aparecer
- Está en inglés principalmente

## Por qué es imprescindible

Hay libros masivos sobre system design (Designing Data-Intensive Applications, Building Microservices). Son imprescindibles pero densos. System Design 101 es el complemento visual que fija los conceptos rápido y los deja accesibles para consulta. Es el tipo de recurso que acompaña a un desarrollador durante años.`,
    image_prompt: "System design architecture diagrams showing load balancers databases caches and microservices, educational infographics with clean visual style, backend engineering concepts, dark purple background, violet accents, professional",
  },

  // 29. Feynman
  {
    source: "github", source_id: "getcompanion-ai/feynman", url: "https://github.com/getcompanion-ai/feynman",
    name: "Feynman", stars: 2900, language: "Python", author: "getcompanion-ai", category_id: 1,
    difficulty: "dificil", interest_score: 92, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "investigacion", "meta-analisis", "papers", "runpod", "ciencia"],
    seo_slug: "feynman-meta-analisis-cientifico-ia",
    seo_title: "Feynman: IA que genera meta-análisis científicos replicando experimentos en Runpod",
    seo_description: "Feynman toma una pregunta y en 30 minutos devuelve un meta-análisis citado que replica experimentos en Runpod, audita código y simula peer review.",
    summary_es: `Feynman es un sistema de IA open source que automatiza la generación de meta-análisis científicos rigurosos. Le das una pregunta de investigación y en aproximadamente 30 minutos devuelve un reporte completo con citas apropiadas, experimentos replicados en Runpod, auditoría de claims contra código publicado y una simulación de peer review. Está diseñado para acortar drásticamente el ciclo de investigación manteniendo el rigor científico.

## El problema que ataca

La investigación científica moderna se enfrenta a varios cuellos de botella:

- Se publican cientos de papers al día en cualquier campo
- Reproducir experimentos de papers suele tomar semanas
- Verificar que los claims corresponden al código publicado es opcional y raro
- El peer review es lento y desigual
- Los meta-análisis son trabajo de meses o años

Feynman ataca cada uno de estos cuellos de botella con automatización.

## Cómo funciona

### 1. Entiende la pregunta
Recibe tu pregunta de investigación y la descompone en sub-preguntas investigables.

### 2. Busca y filtra literatura
Rastrea papers relevantes de bases como arXiv, Semantic Scholar, Google Scholar. Filtra por relevancia, calidad y reciencia.

### 3. Replica experimentos reales en Runpod
Aquí está la magia: no solo lee papers, corre sus experimentos. Identifica el código publicado, lo despliega en Runpod (infraestructura cloud con GPUs) y reproduce los resultados para verificar.

### 4. Audita claims contra código
Para cada afirmación del paper, verifica si el código publicado realmente la soporta. Detecta discrepancias entre lo que el paper dice y lo que el código hace.

### 5. Simula peer review
Genera un peer review sintético del paper desde perspectivas distintas (metodología, resultados, significancia) para detectar debilidades antes de que un humano las encuentre.

### 6. Genera el meta-análisis
Consolida todo en un reporte citado, listo para servir como base de un paper, una revisión sistemática o una decisión informada.

## Casos de uso reales

### Investigadores académicos
Acelerar revisiones sistemáticas que antes tomaban meses.

### Venture capital y análisis tech
Evaluar el estado del arte en un área (LLMs, robótica, biotech) antes de invertir.

### Empresas de I+D
Decidir qué líneas de investigación seguir basándose en evidencia actual.

### Educación avanzada
Preparar clases y cursos con el estado real del arte, no con textbooks desactualizados.

### Journalism científico
Producir artículos de divulgación con rigor técnico y citas auténticas.

## Por qué Runpod

Runpod permite desplegar entornos con GPUs potentes a precios razonables y por horas. Es la infraestructura ideal para replicar experimentos de machine learning sin invertir en hardware propio.

## Limitaciones honestas

- Replicar experimentos complejos puede fallar por problemas de entorno, dependencias o código roto
- El coste de Runpod aplica: experimentos largos cuestan dinero real
- La auditoría automática no reemplaza la revisión humana experta
- Los 30 minutos son ideal: en la práctica pueden ser horas según la complejidad
- No todos los papers publican código reproducible
- Los meta-análisis generados son punto de partida serio, no verdad absoluta
- Los sesgos de los modelos LLM se trasladan al análisis

## Por qué podría cambiar la investigación

Si Feynman (y proyectos similares) maduran, la velocidad de la investigación científica podría acelerarse órdenes de magnitud. No porque los agentes de IA vayan a descubrir teoremas solos, sino porque el tiempo de sintetizar, replicar y verificar lo existente se desploma, dejando a los investigadores humanos concentrados en generar hipótesis nuevas y criticar el trabajo que realmente importa.`,
    image_prompt: "AI scientific research agent replicating experiments in cloud GPU environments, meta-analysis synthesis with citations and peer review simulation, academic paper workflow, dark purple background, violet accents, professional",
  },

  // 30. Carbonyl
  {
    source: "github", source_id: "fathyb/carbonyl", url: "https://github.com/fathyb/carbonyl",
    name: "Carbonyl", stars: 12500, language: "Rust", author: "fathyb", category_id: 2,
    difficulty: "dificil", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["navegador", "terminal", "chromium", "rust", "cli", "ligereza"],
    seo_slug: "carbonyl-navegador-chromium-terminal",
    seo_title: "Carbonyl: Chromium completo corriendo dentro de tu terminal al 0% CPU en idle",
    seo_description: "Carbonyl es un navegador Chromium completo que renderiza páginas web en la terminal. Ultra-ligero, rápido, idle a 0% CPU y construido en Rust.",
    summary_es: `Carbonyl es un navegador web Chromium que corre íntegramente dentro de tu terminal. No es un lector de texto simplificado: renderiza páginas web reales con su motor Chromium completo directamente en la consola, manteniendo 0% de CPU cuando está idle y ofreciendo velocidad casi imposible para algo que vive dentro de una emulación de terminal.

## Por qué esto parece imposible

Terminales y navegadores son mundos opuestos: una terminal muestra caracteres en una rejilla de texto, un navegador moderno renderiza gráficos vectoriales, imágenes, vídeos, animaciones, con aceleración GPU. Parece incompatible.

Carbonyl lo resuelve con un truco técnico fascinante: toma el motor Chromium, redirige su salida gráfica a un renderer que traduce píxeles a caracteres Unicode aprovechando capacidades modernas de terminal (colores de 24 bits, bloques Unicode densos, secuencias de escape optimizadas). El resultado: una terminal que muestra páginas web reales con fidelidad sorprendente.

## Qué trae de serie

### Motor Chromium completo
No es un cliente HTTP simplificado: es Chromium. Significa que corre HTML5, CSS moderno, JavaScript, Web APIs y todo lo que se espera de un navegador actual.

### Idle a 0% CPU
Una vez cargada una página, el consumo en idle es exactamente 0% de CPU. Esto es poco común incluso en navegadores de escritorio tradicionales.

### Ultra-ligero
Sorprendentemente rápido y eficiente dado que está haciendo algo aparentemente imposible.

### Nativo del terminal
Los controles (flechas, keyboard shortcuts) son los que esperas de una aplicación de terminal. No una GUI translocada.

### Escrito en Rust
La capa de integración y render está escrita en Rust, lo que explica parte de la eficiencia y la solidez.

## Para qué sirve realmente

Hay que ser honestos: Carbonyl es una demostración técnica impresionante más que una herramienta de uso diario. Pero tiene nichos reales:

### Desarrolladores en servidores remotos
SSH a una máquina sin X11 ni escritorio y necesitas navegar web para buscar docs, probar un endpoint o revisar un dashboard. Carbonyl lo permite.

### Entornos limitados
Contenedores mínimos, VMs sin GUI, sistemas embebidos potentes. Carbonyl te da navegación web sin instalar un escritorio completo.

### Accesibilidad no convencional
Terminales son más accesibles que GUIs en ciertos setups (lectores de pantalla, entornos de solo texto avanzados).

### Curiosidad y aprendizaje
El repo es un ejemplo brillante de qué se puede hacer cuando combinas tecnología madura (Chromium), ingeniería creativa y un lenguaje moderno (Rust).

### Screenshot memorable
Mostrarle a un compañero que estás corriendo YouTube dentro de iTerm tiene su valor puramente hacker.

## Limitaciones honestas

- La experiencia visual, por bueno que sea el renderer, no rivaliza con un navegador gráfico en calidad
- El video y contenido multimedia tienen limitaciones obvias en terminal
- El texto y elementos pequeños pueden ser difíciles de leer según la tipografía de la terminal
- No sustituye a un navegador real para tareas cotidianas
- Configurarlo correctamente requiere una terminal con buen soporte Unicode y colores 24-bit
- Algunos sitios con JavaScript muy pesado pueden rendir menos fluido

## Por qué importa

Carbonyl es el tipo de proyecto que hace avanzar al ecosistema completo: demuestra que terminales modernas pueden hacer cosas que pensábamos imposibles, empuja los límites de Rust como lenguaje de sistemas creativos y recuerda que las herramientas de texto no son obsoletas sino infrainvestigadas.

Aunque no lo uses a diario, merece estar en tu radar: es ingeniería demostrando que las categorías "terminal" y "navegador" no son fronteras absolutas, solo convenciones que alguien pudo romper.`,
    image_prompt: "Chromium browser rendering actual web pages inside a terminal using Unicode characters, ultra-lightweight text-mode web browsing, Rust engineering demo, dark purple background, violet accents, professional",
  },
];

async function main() {
  console.log(`=== OffRadar: Repos de X Batch 4 — ${projects.length} proyectos ===\n`);
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i+1}/${projects.length}] ${p.name}...`);
    console.log(`  Imagen...`);
    const imgUrl = await generateImage(p.image_prompt, p.seo_slug);
    if (imgUrl) console.log(`  OK ${imgUrl}`);
    else console.log(`  Sin imagen`);
    try {
      await sql`
        INSERT INTO projects (source, source_id, url, name, description, summary_es, category_id, tags, difficulty, interest_score, stars, language, is_oss_alternative, alternative_to, replicable_with_code, featured_image_url, status, priority, seo_slug, seo_title, seo_description, author, created_at, updated_at, published_at)
        VALUES (${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.seo_description}, ${p.summary_es}, ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars}, ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to}, ${null}, ${imgUrl}, 'published', 'high', ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author}, NOW(), NOW(), NOW())
        ON CONFLICT (source, source_id) DO UPDATE SET stars = EXCLUDED.stars, summary_es = EXCLUDED.summary_es, featured_image_url = COALESCE(EXCLUDED.featured_image_url, projects.featured_image_url), updated_at = NOW()
      `;
      console.log(`  DB OK`);
    } catch(e) { console.error(`  ERR ${e.message}`); }
    if (i < projects.length - 1) await new Promise(r => setTimeout(r, 12000));
  }
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\nTotal: ${count[0].n} proyectos publicados`);
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });

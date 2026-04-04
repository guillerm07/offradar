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
  // 1. Interview Agent
  {
    source: "github", source_id: "Luckman-Khan/Interview_Agent", url: "https://github.com/Luckman-Khan/Interview_Agent",
    name: "Interview Agent", stars: 1800, language: "Python", author: "Luckman-Khan", category_id: 1,
    difficulty: "medio", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "entrevistas", "voz", "carrera-profesional", "preparacion", "agente"],
    seo_slug: "interview-agent-entrevistas-tecnicas-ia",
    seo_title: "Interview Agent: Practica entrevistas técnicas con una IA que te escucha y te destroza",
    seo_description: "Interview Agent es un agente de IA con voz que simula entrevistas técnicas reales. Sube tu CV, recibe preguntas adaptativas y un informe brutal de mejora.",
    summary_es: `Interview Agent es un agente de inteligencia artificial con capacidad de voz que simula entrevistas técnicas reales de forma adaptativa. Subes tu currículum y la descripción del puesto al que aspiras, y la IA te somete a una entrevista que se adapta en tiempo real según tus respuestas: si contestas bien, sube la dificultad; si respondes con vaguedades, te presiona hasta que demuestres que sabes de lo que hablas.

## Por qué es diferente a estudiar con listas de preguntas

La mayoría de desarrolladores se preparan para entrevistas repasando listas de preguntas de LeetCode o leyendo "Top 50 React interview questions". El problema es que una entrevista real no funciona así. Un entrevistador humano:

- **Hace follow-ups**: si dices "usaría un hash map", te pregunta por qué, qué complejidad tiene, y qué alternativas consideraste
- **Detecta inseguridad**: si dudas, profundiza exactamente en ese punto
- **Cambia de tema**: si dominas algo, pasa a otra área para encontrar tus debilidades
- **Evalúa comunicación**: no solo qué dices, sino cómo lo explicas

Interview Agent replica este comportamiento de un entrevistador real porque es un agente de IA conversacional con voz, no un cuestionario estático.

## Cómo funciona

### 1. Preparación del contexto
Subes tu CV en PDF y pegas la descripción del puesto. El agente analiza ambos documentos para crear preguntas personalizadas que crucen tu experiencia con los requisitos del puesto.

### 2. Entrevista con voz
El agente te habla y tú le respondes hablando. Nada de escribir respuestas cómodamente: la presión de responder en voz alta, en tiempo real, es parte del entrenamiento. Es lo más cercano a una entrevista real que vas a encontrar sin un humano al otro lado.

### 3. Adaptación en tiempo real
Si demuestras dominio en un tema, el agente sube la dificultad o cambia de área. Si detecta debilidad, profundiza ahí. Cada entrevista es única porque se adapta a ti.

### 4. Informe de evaluación
Al terminar, recibes un reporte detallado con:
- Puntuación por área técnica
- Respuestas donde fallaste y por qué
- Sugerencias específicas de mejora
- Comparación con el nivel esperado para el puesto

## Limitaciones honestas

- Requiere buena conexión para el procesamiento de voz en tiempo real
- La calidad depende del modelo de IA que uses como backend
- No reemplaza la práctica con humanos reales, pero es el mejor complemento que existe
- Funciona mejor para entrevistas técnicas de software que para roles no técnicos

## Para quién es imprescindible

Si estás a una entrevista de conseguir el trabajo que cambia tu carrera, practicar con Interview Agent puede marcar la diferencia entre quedarte en blanco cuando te pregunten algo inesperado y responder con confianza porque ya te enfrentaste a preguntas similares bajo presión.`,
    image_prompt: "AI-powered interview simulation with voice waves, a virtual recruiter asking technical questions on screen, adaptive difficulty meter, candidate evaluation report, dark purple background, violet accents, professional",
  },

  // 2. Scuttlebot
  {
    source: "github", source_id: "ConflictHQ/scuttlebot", url: "https://github.com/ConflictHQ/scuttlebot",
    name: "Scuttlebot", stars: 1200, language: "Python", author: "ConflictHQ", category_id: 1,
    difficulty: "dificil", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "agentes", "irc", "coordinacion", "multi-agente", "infraestructura"],
    seo_slug: "scuttlebot-coordinacion-agentes-irc",
    seo_title: "Scuttlebot: Coordina flotas de agentes IA sobre IRC con transparencia total",
    seo_description: "Scuttlebot es un backplane de coordinación de agentes IA construido sobre IRC. Tus agentes colaboran en canales visibles, sin dashboards opacos.",
    summary_es: `Scuttlebot es un backplane de coordinación de agentes de IA construido enteramente sobre el protocolo IRC. En vez de depender de dashboards propietarios o sistemas de orquestación complejos, tus agentes de IA se comunican, coordinan y reportan su estado a través de canales de IRC donde puedes ver todo lo que ocurre en tiempo real.

## El problema de la coordinación multi-agente

Cuando tienes múltiples agentes de IA trabajando en paralelo (uno investigando, otro escribiendo código, otro revisando, otro desplegando), necesitas un sistema que los coordine. Las soluciones actuales suelen ser:

- **Frameworks propietarios**: cajas negras donde no ves qué hacen tus agentes internamente
- **Dashboards complejos**: interfaces gráficas pesadas que añaden otra capa de complejidad
- **APIs custom**: cada equipo reinventa la rueda para que sus agentes se comuniquen

Scuttlebot propone algo radicalmente simple: usar IRC, un protocolo de chat que lleva décadas funcionando de forma fiable, como canal de comunicación entre agentes.

## Cómo funciona

### Canal compartido
Todos tus agentes se conectan a un canal de IRC. Cada agente tiene su propio nick y publica sus acciones, descubrimientos y resultados en el canal. Tú puedes conectarte con cualquier cliente IRC y ver exactamente qué está haciendo cada agente.

### Transparencia total
No hay magia negra. Si un agente decide investigar un bug, lo anuncia en el canal. Si otro agente encuentra una solución, la comparte. Si hay un conflicto entre dos agentes, lo ves en el chat y puedes intervenir directamente.

### Control humano
Puedes enviar mensajes al canal para redirigir agentes, pausarlos, o darles nuevas instrucciones. Es como estar en un chat grupal con tu equipo, excepto que tu equipo son agentes de IA.

## Por qué IRC y no Slack, Discord o un protocolo custom

- **Simplicidad extrema**: IRC es texto plano sobre TCP. Sin JSON, sin autenticación OAuth, sin rate limits agresivos
- **Décadas de fiabilidad**: el protocolo IRC existe desde 1988 y sigue funcionando
- **Clientes infinitos**: cualquier cliente IRC del mundo puede conectarse y monitorear tus agentes
- **Self-hosted trivial**: montar un servidor IRC es cuestión de minutos
- **Sin dependencias externas**: no dependes de que Slack o Discord estén online

## Casos de uso

- **Equipos de desarrollo con IA**: múltiples agentes de codificación trabajando en paralelo en un repositorio
- **Pipelines de investigación**: agentes que buscan, filtran y analizan información coordinándose en tiempo real
- **Monitoreo y operaciones**: agentes que vigilan servicios y se coordinan para resolver incidentes

## Limitaciones

- Requiere familiaridad con IRC y conceptos de multi-agente
- La documentación es todavía temprana, ya que es un proyecto emergente
- No incluye agentes prediseñados: tú construyes los agentes, Scuttlebot solo proporciona la coordinación
- Mejor para equipos técnicos que para usuarios no técnicos`,
    image_prompt: "Multiple AI agents communicating through IRC chat channels, text flowing between bot avatars, coordination diagram, network of interconnected agents, dark purple background, violet accents, professional",
  },

  // 3. CoBRA
  {
    source: "github", source_id: "trailofbits/CoBRA", url: "https://github.com/trailofbits/CoBRA",
    name: "CoBRA", stars: 2500, language: "C++", author: "trailofbits", category_id: 5,
    difficulty: "dificil", interest_score: 83, is_oss_alternative: false, alternative_to: null,
    tags: ["seguridad", "ingenieria-inversa", "mba", "ofuscacion", "llvm", "malware"],
    seo_slug: "cobra-simplificador-expresiones-mba",
    seo_title: "CoBRA: Simplifica expresiones MBA ofuscadas para ingeniería inversa con 99.86% de precisión",
    seo_description: "CoBRA de Trail of Bits simplifica expresiones Mixed Boolean-Arithmetic que protegen malware y binarios. CLI, plugin LLVM y verificación con Z3.",
    summary_es: `CoBRA (Compiler-Based Rewriting Approach) es una herramienta de Trail of Bits para simplificar expresiones Mixed Boolean-Arithmetic (MBA) — una de las técnicas de ofuscación más difíciles de revertir en ingeniería inversa. Si alguna vez has analizado malware o binarios protegidos y te has encontrado con expresiones que parecen escritas por un demonio matemático, CoBRA es tu nuevo mejor aliado.

## Qué son las expresiones MBA y por qué importan

Las expresiones MBA combinan operaciones aritméticas (suma, resta, multiplicación) con operaciones booleanas (AND, OR, XOR, NOT) de formas deliberadamente complejas para ofuscar código. Los atacantes y los protectores de software las usan para que algo tan simple como "x + y" se convierta en una expresión de 50 caracteres imposible de leer.

Por ejemplo, una expresión MBA puede convertir:
- "x + y" en algo como "(x & y) * 2 + (x ^ y) + ((~x | y) - (~x)) * 0 + ..."

Los ofuscadores comerciales como Themida, VMProtect y técnicas de malware avanzado usan MBAs extensivamente porque las herramientas tradicionales de decompilación no pueden simplificarlas.

## Qué hace CoBRA

CoBRA toma estas expresiones infernales y las simplifica a su forma original, manejando 4 tipos diferentes de ofuscación MBA donde la mayoría de herramientas existentes fallan.

### Resultados impresionantes
- **99.86% de éxito** en más de 73.000 expresiones ofuscadas del dataset estándar
- Maneja expresiones lineales, polinómicas, con variables bit a bit, y combinaciones mixtas
- Verificación formal con Z3 para garantizar que la simplificación es correcta

## Componentes

- **CLI**: línea de comandos para simplificar expresiones individuales o en lote
- **Librería C++**: para integrar en tus propias herramientas de análisis
- **Plugin LLVM**: se integra directamente en el compilador para análisis a nivel de IR
- **Verificación Z3**: cada simplificación se verifica formalmente para garantizar equivalencia

## Para quién es

- **Analistas de malware**: desofusca código protegido con MBAs para entender qué hace realmente
- **Investigadores de seguridad**: análisis de binarios protegidos comercialmente
- **Desarrolladores de compiladores**: optimización de expresiones complejas
- **CTF players**: resolver challenges de reversing que usan ofuscación MBA

## Limitaciones

- Requiere conocimientos sólidos de ingeniería inversa y compiladores
- Las expresiones MBA más exóticas o personalizadas pueden resistir la simplificación
- Es una herramienta especializada: si no trabajas con binarios ofuscados, no la necesitarás
- La instalación requiere compilar C++ y opcionalmente LLVM

## Por qué importa

Trail of Bits es una de las empresas de seguridad más respetadas del mundo. Que liberen CoBRA como open source significa que la comunidad de seguridad tiene ahora acceso a técnicas de deofuscación que antes solo estaban al alcance de equipos con presupuestos de investigación enormes.`,
    image_prompt: "Complex mathematical obfuscated expression being simplified into clean code, reverse engineering workflow, binary analysis tools, security research, dark purple background, violet accents, professional",
  },

  // 4. Cabinet
  {
    source: "github", source_id: "hilash/cabinet", url: "https://github.com/hilash/cabinet",
    name: "Cabinet", stars: 1500, language: "TypeScript", author: "hilash", category_id: 3,
    difficulty: "medio", interest_score: 87, is_oss_alternative: false, alternative_to: null,
    tags: ["knowledge-base", "ia", "agentes", "self-hosted", "markdown", "productividad"],
    seo_slug: "cabinet-knowledge-base-agentes-ia",
    seo_title: "Cabinet: Tu knowledge base con agentes IA, self-hosted y basada en archivos markdown",
    seo_description: "Cabinet combina knowledge base, agentes IA con heartbeats y web apps inline. Todo en archivos markdown en tu disco, git-backed y sin lock-in.",
    summary_es: `Cabinet es una knowledge base self-hosted que combina la simplicidad de archivos markdown en tu disco con el poder de agentes de IA que trabajan sobre tus datos. No es solo un wiki ni solo un chatbot: es un sistema completo donde tus documentos, tus agentes y tus aplicaciones viven juntos en archivos que tú controlas.

## Qué lo hace diferente de Notion, Obsidian o un wiki

La mayoría de knowledge bases te obligan a elegir: o usas una plataforma cloud (Notion, Coda) donde tus datos viven en servidores ajenos, o usas archivos locales (Obsidian) donde no tienes capacidades de IA ni aplicaciones interactivas. Cabinet te da todo junto:

### Archivos markdown en tu disco
Todo es un archivo markdown en una carpeta de tu ordenador. Puedes abrirlos con cualquier editor, versionarlos con Git, hacer backup con rsync, y migrar cuando quieras. Cero lock-in.

### Agentes IA integrados
Cabinet incluye un sistema de agentes con heartbeats y jobs programados. Puedes configurar agentes que:
- Resuman automáticamente documentos nuevos que añadas
- Monitoreen cambios en tus notas y sugieran conexiones
- Ejecuten tareas programadas sobre tu base de conocimiento
- Respondan preguntas basándose en el contexto de todos tus documentos

### Web apps inline
Dentro de tus documentos markdown puedes incrustar aplicaciones interactivas: dashboards con datos vivos, visualizaciones, formularios, y componentes dinámicos. Tu knowledge base no es solo texto estático — es una plataforma activa.

### PDFs, CSVs y más
Importa PDFs, CSVs, hojas de cálculo y otros formatos. Cabinet los procesa e integra en tu base de conocimiento para que los agentes puedan trabajar con ellos.

## Arquitectura

- **Backend**: archivos markdown en disco, versionados con Git
- **Agentes**: sistema de heartbeats que mantiene los agentes vivos y monitoreados
- **Jobs**: tareas programadas que los agentes ejecutan automáticamente
- **Frontend**: interfaz web para navegar, editar y interactuar con tu knowledge base

## Para quién es ideal

- **Investigadores**: base de conocimiento con IA que conecta papers, notas y datos
- **Equipos pequeños**: wiki interno con agentes que mantienen la documentación actualizada
- **Desarrolladores**: documentación técnica con componentes interactivos y agentes que la enriquecen
- **Cualquiera harto del lock-in**: si has perdido datos por cerrar una cuenta en Notion o Coda, Cabinet te da control total

## Limitaciones

- Es un proyecto relativamente nuevo y en desarrollo activo
- La configuración inicial de agentes requiere conocimientos técnicos
- No tiene la interfaz pulida de Notion (pero compensa con control y flexibilidad)
- Requiere self-hosting: necesitas un servidor o tu propio ordenador para ejecutarlo`,
    image_prompt: "Knowledge base with markdown files, AI agents with heartbeat monitors, interactive dashboards embedded in documents, self-hosted server, dark purple background, violet accents, professional",
  },

  // 5. Shimmer from Structure
  {
    source: "github", source_id: "darula-hpp/shimmer-from-structure", url: "https://github.com/darula-hpp/shimmer-from-structure",
    name: "Shimmer from Structure", stars: 2200, language: "TypeScript", author: "darula-hpp", category_id: 7,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["frontend", "skeleton-loader", "react", "vue", "ux", "componentes"],
    seo_slug: "shimmer-from-structure-skeleton-loaders",
    seo_title: "Shimmer from Structure: Skeleton loaders automáticos que se actualizan solos al cambiar el diseño",
    seo_description: "Genera skeleton loaders automáticos desde la estructura real de tus componentes. React, Next.js, Vue, Svelte, Angular y SolidJS. Sin duplicar código.",
    summary_es: `Shimmer from Structure elimina una de las tareas más tediosas del desarrollo frontend: crear y mantener skeleton loaders (esos placeholder animados que aparecen mientras carga el contenido). En vez de duplicar manualmente cada componente para crear su versión skeleton, esta librería genera los skeletons automáticamente a partir de la estructura real de tus componentes.

## El problema que resuelve

Si alguna vez has implementado skeleton loaders en una app, conoces el dolor:

1. Tienes un componente (por ejemplo, una tarjeta de usuario con avatar, nombre y descripción)
2. Necesitas crear un skeleton loader que tenga la misma forma pero con bloques grises animados
3. Duplicas el componente, reemplazas el contenido por divs grises con animación shimmer
4. Cuando cambias el diseño del componente original, tienes que actualizar también el skeleton
5. Multiplica esto por cada componente de tu app que necesite skeleton loader

El resultado: código duplicado, skeletons que se desacoplan del diseño real, y horas perdidas en mantenimiento.

## Cómo funciona

Shimmer from Structure analiza la estructura de tu componente (detecta flex, grid, bordes, tamaños, espaciados) y genera automáticamente un skeleton loader que replica esa estructura con las animaciones shimmer correspondientes.

### Lo que detecta automáticamente
- **Layout**: flexbox, CSS grid, posiciones absolutas/relativas
- **Dimensiones**: anchos, altos, aspect ratios
- **Formas**: bordes redondeados para avatares, esquinas rectas para textos
- **Jerarquía**: componentes anidados, listas repetidas
- **Espaciado**: márgenes, paddings, gaps entre elementos

### Se actualiza solo
Cuando cambias el diseño de tu componente, el skeleton se actualiza automáticamente porque se genera desde la estructura real, no desde una copia estática.

## Frameworks soportados

- **React** y **Next.js**
- **Vue** 3
- **Svelte**
- **Angular**
- **SolidJS**

## Instalación y uso

Instala el paquete para tu framework, envuelve tu componente con el wrapper de Shimmer, y automáticamente tendrás un skeleton loader que replica su estructura. Sin código extra, sin duplicación, sin mantenimiento.

## Limitaciones

- Los skeletons generados automáticamente a veces necesitan ajustes finos para componentes muy complejos
- Componentes con contenido dinámico muy variable pueden generar skeletons que no representen bien todos los estados
- Es una librería relativamente nueva y algunas integraciones son más maduras que otras

## Por qué importa

Los skeleton loaders mejoran significativamente la percepción de velocidad de una app. Los usuarios perciben que una interfaz con skeletons carga más rápido que una con spinners, aunque el tiempo real sea el mismo. Shimmer from Structure hace que implementarlos sea trivial en vez de tedioso.`,
    image_prompt: "UI components transforming into shimmer skeleton loaders automatically, React and Vue logos, animated placeholder blocks, frontend development workflow, dark purple background, violet accents, professional",
  },

  // 6. Supersonic
  {
    source: "github", source_id: "dweymouth/supersonic", url: "https://github.com/dweymouth/supersonic",
    name: "Supersonic", stars: 3500, language: "Go", author: "dweymouth", category_id: 3,
    difficulty: "facil", interest_score: 89, is_oss_alternative: true, alternative_to: "Spotify",
    tags: ["musica", "self-hosted", "navidrome", "jellyfin", "streaming", "escritorio"],
    seo_slug: "supersonic-spotify-self-hosted",
    seo_title: "Supersonic: Tu propio Spotify self-hosted con Navidrome o Jellyfin, sin suscripciones",
    seo_description: "Supersonic es un cliente de escritorio nativo para tu servidor de música self-hosted. Waveform, EQ de 15 bandas, lyrics y gapless playback.",
    summary_es: `Supersonic convierte tu servidor de música self-hosted (Navidrome, Jellyfin, Airsonic o cualquier servidor Subsonic) en tu propio Spotify privado con una interfaz de escritorio nativa, bonita y fluida. Sin suscripciones mensuales, sin algoritmos que deciden qué escuchas, sin que tu biblioteca de música desaparezca porque un sello discográfico decidió retirar un álbum.

## Por qué self-hostear tu música

Si tienes una colección de música en archivos (FLAC, MP3, etc.), guardarla en un servidor con Navidrome o Jellyfin te da acceso desde cualquier dispositivo. Pero los clientes web que incluyen estos servidores suelen ser funcionales pero básicos. Supersonic llena ese hueco con un cliente de escritorio que rivaliza en experiencia con Spotify.

## Qué ofrece

### Interfaz nativa y rápida
Escrito en Go con toolkit nativo, no es una app de Electron pesada. Se abre en un instante, consume poca RAM, y la interfaz es fluida y responsiva.

### Funciones de audiófilo
- **Waveform visual**: visualización de la onda de audio de cada canción
- **Ecualizador de 15 bandas**: ajusta el sonido a tu gusto con precisión
- **Gapless playback**: las canciones fluyen sin pausas entre ellas (esencial para álbumes en vivo o conceptuales)
- **Soporte FLAC**: reproduce audio sin pérdida de calidad
- **ReplayGain**: normalización de volumen entre canciones

### Funciones de streaming
- **Lyrics sincronizadas**: letra de las canciones sincronizada con la reproducción
- **Scrobbling**: envía lo que escuchas a Last.fm
- **Listas de reproducción**: crea y gestiona playlists
- **Búsqueda rápida**: encuentra cualquier canción, álbum o artista al instante
- **Favoritos y calificaciones**: marca tus canciones favoritas

### Compatibilidad
Funciona con cualquier servidor compatible con el protocolo Subsonic:
- **Navidrome** (el más popular para self-hosting de música)
- **Jellyfin** (con plugin Subsonic)
- **Airsonic**, **Gonic**, **LMS** y otros

## Supersonic vs Spotify

| | Supersonic + Navidrome | Spotify Premium |
|---|---|---|
| Precio | Gratis | 11\u20ac/mes |
| Tu música | Siempre tuya | Pueden retirarla |
| Calidad | FLAC sin pérdida | 320kbps (lossy) |
| Privacidad | 100% tuyo | Tracking completo |
| Algoritmos | Tú decides | Spotify decide |
| Offline | Tu servidor | Solo Premium |
| EQ 15 bandas | Sí | No |

## Para quién es

- **Coleccionistas de música**: si tienes una biblioteca de FLACs, Supersonic es el mejor cliente para disfrutarla
- **Hartos de suscripciones**: 132\u20ac al año por Spotify cuando ya tienes la música es dinero tirado
- **Audiófilos**: EQ de 15 bandas, gapless, FLAC nativo
- **Defensores de la privacidad**: Spotify sabe exactamente qué escuchas, cuándo y durante cuánto tiempo

## Instalación

Descarga el binario desde las releases de GitHub para Windows, macOS o Linux. Configura la conexión a tu servidor Navidrome o Jellyfin y empieza a escuchar.`,
    image_prompt: "Native desktop music player with waveform visualization, equalizer bands, album art grid, self-hosted music server connection, dark purple background, violet accents, professional",
  },

  // 7. Goey Toast
  {
    source: "github", source_id: "anl331/goey-toast", url: "https://github.com/anl331/goey-toast",
    name: "Goey Toast", stars: 1400, language: "TypeScript", author: "anl331", category_id: 7,
    difficulty: "facil", interest_score: 84, is_oss_alternative: false, alternative_to: null,
    tags: ["frontend", "notificaciones", "toast", "animacion", "react", "ux"],
    seo_slug: "goey-toast-notificaciones-animadas",
    seo_title: "Goey Toast: Las notificaciones toast más bonitas y fluidas para tu app web",
    seo_description: "Goey Toast es un componente de notificaciones toast con animaciones suaves, rebotes, promise toasts, swipe para cerrar y temas light/dark.",
    summary_es: `Goey Toast es una librería de notificaciones toast para aplicaciones web que prioriza la estética y la experiencia de usuario por encima de todo. Mientras que la mayoría de librerías de toast se conforman con un rectángulo con texto que aparece y desaparece, Goey Toast ofrece animaciones fluidas con rebotes suaves, variantes adorables para cada tipo de notificación, y una atención al detalle visual que eleva la percepción de calidad de tu app.

## Por qué importa la calidad de los toasts

Las notificaciones toast son uno de los micro-componentes más visibles de cualquier aplicación. Cada vez que un usuario guarda algo, cada vez que hay un error, cada vez que se completa una operación, aparece un toast. Si ese toast se ve genérico y aburrido, la app se siente genérica y aburrida. Si el toast tiene personalidad y animaciones cuidadas, toda la app se siente más profesional.

## Qué incluye

### Variantes con personalidad
- **Success**: confirmación con animación satisfactoria
- **Error**: alerta visual clara pero no agresiva
- **Warning**: aviso intermedio que capta atención sin alarmar
- **Info**: notificación neutral para información general
- **Loading**: indicador de proceso en curso
- Cada variante tiene iconos y colores únicos que transmiten el estado al instante

### Promise Toasts
Los promise toasts cambian su estado automáticamente según el resultado de una promesa:
- Mientras se ejecuta: muestra loading
- Si se resuelve: cambia a success con el mensaje de éxito
- Si falla: cambia a error con el mensaje de error

Esto es ideal para operaciones asíncronas como guardar datos, enviar formularios o hacer llamadas API.

### Interacciones fluidas
- **Rebotes suaves**: las notificaciones aparecen con una animación de rebote que se siente natural
- **Hover pausa**: al pasar el ratón sobre un toast, se pausa su temporizador de desaparición
- **Swipe para cerrar**: desliza el toast para descartarlo en dispositivos táctiles
- **Stacking inteligente**: múltiples toasts se apilan de forma ordenada y compacta

### Personalización
- **Light/Dark mode**: soporte nativo para ambos temas
- **Posicionamiento**: esquina superior, inferior, centro, donde prefieras
- **Duración**: configurable por toast o globalmente
- **Estilo custom**: CSS variables para adaptar colores, bordes y sombras a tu marca

## Instalación

Se instala como paquete npm y se integra en React, Vue o cualquier framework con un wrapper sencillo.

## Limitaciones

- Es una librería enfocada en estética: si buscas funcionalidad enterprise como colas de notificaciones complejas, hay opciones más robustas
- Las animaciones más elaboradas pueden no ser ideales para apps que necesiten un estilo ultraminimalista
- Relativamente nueva, por lo que la comunidad es todavía pequeña

## Por qué elegir Goey Toast

Si tu app ya funciona bien pero le falta ese "algo" que la haga sentir premium, los microdetalles como toasts con animaciones cuidadas marcan la diferencia. Goey Toast es de esas librerías que instalas en 2 minutos y tu app se siente inmediatamente más pulida.`,
    image_prompt: "Beautiful animated toast notifications floating on a web interface, success and error variants with smooth bounce animations, light and dark mode, dark purple background, violet accents, professional",
  },

  // 8. Liquid Glass
  {
    source: "github", source_id: "callstack/liquid-glass", url: "https://github.com/callstack/liquid-glass",
    name: "Liquid Glass", stars: 3200, language: "TypeScript", author: "callstack", category_id: 7,
    difficulty: "medio", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["react-native", "ios", "efecto-visual", "apple", "blur", "glassmorphism"],
    seo_slug: "liquid-glass-efecto-react-native",
    seo_title: "Liquid Glass: El efecto Liquid Glass de Apple en React Native para tu app",
    seo_description: "Liquid Glass de Callstack trae el efecto glassmorphism premium de Apple a React Native. Blur dinámico, tint adaptable y reacción al tacto.",
    summary_es: `Liquid Glass es una librería de Callstack (uno de los contribuidores más importantes del ecosistema React Native) que implementa el efecto Liquid Glass de Apple en React Native. Si has visto las interfaces de iOS/macOS con ese vidrio translúcido y dinámico que deja ver lo que hay detrás con un blur suave y un tinte que se adapta al contenido, eso es exactamente lo que esta librería te permite crear en tu app.

## Qué es el efecto Liquid Glass

El Liquid Glass (o glassmorphism avanzado) es el lenguaje de diseño que Apple ha refinado en sus últimas versiones de iOS y macOS. No es un simple blur estático: es un efecto de vidrio dinámico que:

- **Se adapta al contenido**: el tinte del vidrio cambia según lo que hay debajo
- **Reacciona al movimiento**: el blur y la refracción se ajustan cuando el contenido se desplaza
- **Transmite profundidad**: crea una sensación real de capas y profundidad en la interfaz
- **Responde al tacto**: los elementos de vidrio reaccionan visualmente cuando los tocas

## Qué ofrece la librería

### Blur dinámico premium
No es un blur CSS estático. Es un blur que se recalcula en tiempo real según el contenido que está debajo del componente de vidrio. Cuando haces scroll, el vidrio cambia dinámicamente.

### Tint adaptable
El tinte de color del vidrio se ajusta automáticamente al contenido subyacente, tal como lo hace Apple en sus interfaces nativas.

### Modo clear
Un modo ultra transparente que maximiza la claridad del contenido detrás del vidrio, ideal para overlays y modales.

### LiquidGlassContainer
Un componente contenedor que fusiona automáticamente múltiples elementos de vidrio que se superponen, creando un efecto cohesivo en vez de vidrios independientes que compiten visualmente.

### Reacción al tacto
Los componentes de vidrio responden visualmente cuando el usuario los toca, añadiendo un feedback táctil que eleva la percepción de calidad.

## Ejemplo de uso

Envuelve tus componentes con LiquidGlassView para aplicar el efecto. La librería se encarga del blur, el tinte, y las animaciones automáticamente.

## Para quién es

- **Desarrolladores React Native** que quieren interfaces con aspecto nativo de Apple
- **Apps premium** donde la calidad visual es parte de la propuesta de valor
- **Cualquiera que quiera glassmorphism de verdad**, no el efecto plano con un backdrop-filter que no se parece en nada al real

## Limitaciones

- El rendimiento del blur dinámico puede impactar en dispositivos más antiguos
- El efecto se ve espectacular en iOS pero la fidelidad en Android depende del dispositivo
- Es un efecto visual: no añade funcionalidad, solo estética (pero qué estética)
- Requiere React Native con la nueva arquitectura para mejor rendimiento

## Por qué importa

Callstack no es un desarrollador random publicando un paquete npm. Son una empresa de consultoría React Native que contribuye al core del framework. Cuando ellos publican una librería, suele convertirse en estándar del ecosistema.`,
    image_prompt: "Liquid glass UI effect on a mobile phone screen, translucent blur panels, glassmorphism design, Apple-style interface with depth and refraction, dark purple background, violet accents, professional",
  },

  // 9. Unistyles
  {
    source: "github", source_id: "jpudysz/react-native-unistyles", url: "https://github.com/jpudysz/react-native-unistyles",
    name: "React Native Unistyles", stars: 6500, language: "TypeScript", author: "jpudysz", category_id: 7,
    difficulty: "medio", interest_score: 87, is_oss_alternative: true, alternative_to: "StyleSheet de React Native / Styled Components",
    tags: ["react-native", "estilos", "temas", "responsive", "typescript", "css-in-js"],
    seo_slug: "unistyles-estilos-react-native",
    seo_title: "Unistyles: La librería definitiva de estilos para React Native que quieres en todos tus proyectos",
    seo_description: "Unistyles ofrece estilos tipados, temas dinámicos, breakpoints y media queries para React Native. Más rápida que StyleSheet, con API elegante.",
    summary_es: `React Native Unistyles es la librería de estilos que los desarrolladores de React Native llevan años necesitando. Mientras que el StyleSheet nativo de React Native es limitado y las alternativas como Styled Components son lentas, Unistyles ofrece una API elegante y tipada con TypeScript que incluye temas dinámicos, breakpoints responsivos, media queries, y un rendimiento superior al StyleSheet nativo.

## El problema de los estilos en React Native

El sistema de estilos de React Native tiene varias carencias:

- **Sin temas dinámicos**: cambiar entre light/dark mode requiere código manual en cada componente
- **Sin breakpoints**: no hay forma nativa de adaptar estilos según el tamaño de pantalla
- **Sin media queries**: lo que en CSS es trivial, en React Native requiere hooks y lógica custom
- **TypeScript limitado**: el autocompletado de estilos es básico y los errores de tipado son frecuentes
- **Sin variables de diseño**: no hay un sistema de design tokens integrado

## Qué resuelve Unistyles

### Temas dinámicos
Define temas (light, dark, custom) con design tokens tipados, y los componentes se actualizan automáticamente cuando cambias de tema. Sin re-renders manuales, sin Context providers, sin boilerplate.

### Breakpoints responsivos
Define breakpoints una vez y usa estilos condicionales según el tamaño de pantalla. Tu app se adapta desde un iPhone SE hasta un iPad Pro sin lógica condicional en cada componente.

### Media queries
Consultas de medios similares a CSS pero dentro del sistema de estilos de React Native. Orientación, tamaño de pantalla, plataforma, y más.

### TypeScript nativo
Todo está tipado de principio a fin. El autocompletado te muestra las propiedades de estilo disponibles, tus tokens de diseño, y detecta errores en tiempo de compilación.

### Rendimiento superior
Unistyles procesa los estilos a nivel nativo (C++), no en el bridge de JavaScript. Esto significa que es más rápido que el propio StyleSheet de React Native en muchos casos.

## Versión 3.x

La última versión mayor (3.x) incluye mejoras significativas:
- API simplificada con menos boilerplate
- Sistema de variantes (similar a Tailwind)
- Soporte para la nueva arquitectura de React Native
- Plugins para extender la funcionalidad
- Mejor integración con React Native Web

## Para quién es

- **Cualquier proyecto React Native serio**: si estás construyendo una app real (no un prototipo), Unistyles debería ser tu primera dependencia
- **Equipos con design systems**: los design tokens tipados facilitan mantener consistencia visual
- **Apps multiplataforma**: los breakpoints y media queries hacen que una sola base de código se vea bien en cualquier dispositivo

## Limitaciones

- Requiere configuración inicial para definir temas y breakpoints (pero es una inversión que se amortiza rápido)
- La migración desde StyleSheet o Styled Components requiere refactorizar los estilos existentes
- La documentación, aunque buena, asume familiaridad con React Native y TypeScript
- Algunas funciones avanzadas requieren la nueva arquitectura de React Native`,
    image_prompt: "React Native styling system with design tokens, theme switching between light and dark mode, responsive breakpoints on different device sizes, TypeScript code, dark purple background, violet accents, professional",
  },

  // 10. Supply Chain Monitor
  {
    source: "github", source_id: "elastic/supply-chain-monitor", url: "https://github.com/elastic/supply-chain-monitor",
    name: "Supply Chain Monitor", stars: 2800, language: "Python", author: "elastic", category_id: 5,
    difficulty: "medio", interest_score: 91, is_oss_alternative: false, alternative_to: null,
    tags: ["seguridad", "supply-chain", "npm", "pypi", "llm", "dependencias"],
    seo_slug: "supply-chain-monitor-seguridad-dependencias",
    seo_title: "Supply Chain Monitor: Detecta ataques supply-chain en PyPI y npm con LLMs en tiempo real",
    seo_description: "Supply Chain Monitor de Elastic monitorea PyPI y npm en vivo, usando LLMs para detectar paquetes maliciosos antes de que infecten tu proyecto.",
    summary_es: `Supply Chain Monitor es una herramienta del equipo de seguridad de Elastic (Elastic Security Labs) que monitorea los registros de paquetes de PyPI y npm en tiempo real para detectar ataques de supply chain — paquetes maliciosos que se disfrazan de dependencias legítimas para infectar tu proyecto.

## Por qué los ataques supply-chain son la amenaza más subestimada

Un ataque supply-chain en software funciona así: un atacante publica un paquete en npm o PyPI con un nombre muy similar a uno popular (por ejemplo, "reqeusts" en vez de "requests"), o compromete un paquete legítimo existente inyectando código malicioso en una nueva versión. Cuando tú haces "pip install" o "npm install", el código malicioso se ejecuta en tu máquina.

Estos ataques han crecido exponencialmente:
- El hack de Axios en 2025 comprometió una de las librerías más usadas del ecosistema JavaScript
- Paquetes typosquatting en PyPI que robaban credenciales de AWS y enviaban datos a servidores remotos
- Ataques que inyectan mineros de criptomonedas o backdoors en dependencias transitivas

## Qué hace Supply Chain Monitor

### Monitoreo en tiempo real
Vigila los registros de PyPI y npm en vivo, analizando cada nuevo paquete y cada nueva versión publicada.

### Análisis con LLM
Usa modelos de lenguaje para analizar el código fuente de los paquetes y detectar patrones sospechosos:
- Conexiones a URLs desconocidas
- Acceso a variables de entorno (donde suelen estar las credenciales)
- Ejecución de código en el install hook
- Código ofuscado que intenta esconder su verdadera intención
- Nombres de paquete sospechosamente similares a paquetes populares

### Alertas tempranas
Cuando detecta un paquete sospechoso, genera alertas para que la comunidad pueda reaccionar antes de que el paquete acumule descargas.

## Por qué Elastic

Elastic Security Labs es uno de los equipos de investigación de seguridad más reconocidos del mundo. Son los creadores de Elasticsearch y tienen décadas de experiencia analizando amenazas. Que hayan abierto esta herramienta al público significa que la comunidad open source tiene ahora acceso a la misma tecnología de detección que usan internamente.

## Cómo usarlo

Puedes ejecutar el monitor localmente para vigilar las dependencias de tus propios proyectos, o contribuir al proyecto para mejorar la detección de la comunidad.

## Limitaciones

- Los LLMs no son infalibles: pueden generar falsos positivos o no detectar ataques muy sofisticados
- El monitoreo en tiempo real consume recursos computacionales significativos
- Se centra en PyPI y npm — otros registros (RubyGems, Crates, Maven) aún no están cubiertos
- No reemplaza buenas prácticas de seguridad como lock files, auditorías regulares y dependencias mínimas

## Para quién es crítico

Si mantienes proyectos open source con muchas dependencias, si eres responsable de seguridad en una empresa, o si simplemente quieres dormir tranquilo sabiendo que tus dependencias no están comprometidas, Supply Chain Monitor es una capa de defensa que deberías conocer.`,
    image_prompt: "Security monitoring dashboard scanning npm and PyPI packages, threat detection with AI, supply chain attack visualization, malicious package alerts, dark purple background, violet accents, professional",
  },

  // 11. Matrix-Game
  {
    source: "github", source_id: "SkyworkAI/Matrix-Game", url: "https://github.com/SkyworkAI/Matrix-Game",
    name: "Matrix-Game", stars: 4500, language: "Python", author: "SkyworkAI", category_id: 1,
    difficulty: "dificil", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "mundo-3d", "generativo", "juegos", "open-source", "tiempo-real"],
    seo_slug: "matrix-game-mundo-3d-generado-ia",
    seo_title: "Matrix-Game: Un mundo 3D interactivo generado por IA en tiempo real que controlas como un juego",
    seo_description: "Matrix-Game genera mundos 3D completos con IA en tiempo real a 40fps en 720p. Controla con WASD como un videojuego. Open source y gratuito.",
    summary_es: `Matrix-Game es un modelo de IA que genera mundos 3D interactivos en tiempo real. Lo que ves no es un vídeo pregrabado ni un mundo modelado por artistas: es un entorno tridimensional que la IA genera sobre la marcha mientras lo controlas con las teclas WASD como si fuera un videojuego. A 720p y 40 frames por segundo.

## Por qué es revolucionario

Hasta ahora, la IA generativa de vídeo producía clips pasivos: le pedías una escena y te daba un vídeo de unos segundos que no podías controlar. Matrix-Game cambia eso fundamentalmente:

- **Interactivo**: tú controlas la cámara y te mueves por el mundo generado
- **Tiempo real**: no es renderizado previo, se genera al instante mientras juegas
- **3D coherente**: el mundo mantiene consistencia espacial — si giras 360 grados, lo que ves es coherente
- **Memoria**: el sistema recuerda lo que ya generó, así que puedes volver atrás y el paisaje sigue ahí

## Cómo funciona

### Generación frame a frame
El modelo recibe tu input de movimiento (avanzar, girar, retroceder) y genera el siguiente frame del mundo 3D en tiempo real. No calcula todo el mundo de una vez — lo genera según lo necesitas, como un sueño que se materializa mientras lo exploras.

### Consistencia espacial
A diferencia de los generadores de vídeo que producen secuencias sin coherencia 3D real, Matrix-Game mantiene un modelo interno del espacio. Si hay una montaña a tu derecha, cuando gires a la derecha, la montaña estará ahí.

### Memoria de largo alcance
El sistema recuerda las áreas que ya visitaste. Si caminas hacia el norte durante un minuto y luego vuelves al sur, encontrarás el mismo paisaje que dejaste atrás.

## Especificaciones técnicas

- **Resolución**: 720p (1280x720)
- **Framerate**: ~40 FPS
- **Control**: teclado (WASD) para movimiento
- **Hardware recomendado**: GPU moderna con bastante VRAM
- **Licencia**: open source y gratuito

## Para qué sirve (más allá de la demo)

### Prototipado de videojuegos
Imagina poder describir un mundo y explorarlo interactivamente para decidir si la estética funciona antes de que un equipo de artistas trabaje durante meses.

### Entrenamiento de robots
Generar entornos 3D simulados al instante para entrenar agentes de IA en navegación y percepción espacial.

### Entretenimiento generativo
El concepto de "juegos infinitos" donde cada partida genera un mundo nuevo que nunca existió antes.

### Investigación
Estudiar cómo los modelos de IA entienden y representan el espacio 3D, la física y la coherencia visual.

## Limitaciones

- Requiere hardware potente (GPU de gama alta)
- La calidad visual, aunque impresionante para ser generada en tiempo real, no compite con motores como Unreal Engine
- El mundo generado es visual — no tiene física real ni colisiones
- Es un proyecto de investigación: funcional pero no pulido como un producto comercial

## Por qué importa

Matrix-Game es una ventana al futuro de los videojuegos y la simulación. Si hoy puede generar mundos explorables a 720p 40fps, imagina lo que será posible cuando el hardware y los modelos sigan mejorando. Es el primer paso hacia mundos generados por IA que son indistinguibles de los modelados a mano.`,
    image_prompt: "AI-generated 3D world being explored in real-time, procedural landscape creation, WASD controls visible, immersive virtual environment, real-time rendering, dark purple background, violet accents, professional",
  },

  // 12. EmDash CMS
  {
    source: "github", source_id: "emdash-cms/emdash", url: "https://github.com/emdash-cms/emdash",
    name: "EmDash", stars: 2000, language: "TypeScript", author: "emdash-cms", category_id: 2,
    difficulty: "medio", interest_score: 88, is_oss_alternative: true, alternative_to: "WordPress",
    tags: ["cms", "cloudflare", "astro", "typescript", "ia", "seguridad"],
    seo_slug: "emdash-cms-cloudflare-astro",
    seo_title: "EmDash: El CMS de Cloudflare en Astro que resuelve los 3 grandes problemas de WordPress",
    seo_description: "EmDash es un CMS full-stack de Cloudflare en Astro + TypeScript. Plugins en sandbox, pensado para agentes IA, y despliegue en 1 comando.",
    summary_es: `EmDash es un CMS full-stack desarrollado por Cloudflare construido con Astro y TypeScript que aborda directamente los tres problemas más dolorosos de WordPress: la seguridad de plugins, la compatibilidad con IA, y la complejidad del despliegue.

## Los 3 problemas de WordPress que EmDash resuelve

### 1. Plugins en sandbox (nunca más te hackean por un plugin)
En WordPress, un plugin tiene acceso completo a tu base de datos, tus archivos, y tu servidor. Un solo plugin comprometido puede tumbar tu sitio entero o robar datos de usuarios. En EmDash, los plugins corren en un sandbox aislado: si un plugin tiene una vulnerabilidad, no puede afectar al resto del sistema.

### 2. Pensado para agentes de IA
EmDash fue diseñado desde el principio para ser controlado por agentes de IA. Incluye:
- **CLI completo**: cada operación del CMS se puede ejecutar desde línea de comandos
- **Servidor MCP (Model Context Protocol)**: los agentes de IA pueden crear contenido, gestionar páginas, actualizar configuración y administrar el sitio directamente
- Esto significa que puedes decirle a tu agente de IA "crea una entrada de blog sobre X" y el agente lo hace directamente en tu CMS

### 3. Despliegue en 1 comando
Mientras que WordPress requiere configurar PHP, MySQL, un servidor web, y rezar para que todo funcione junto, EmDash se despliega en Cloudflare (o Node.js) con un solo comando. Sin infraestructura que mantener, sin bases de datos que administrar, sin actualizaciones de seguridad que aplicar manualmente.

## Stack técnico

- **Framework**: Astro (uno de los frameworks web más rápidos del momento)
- **Lenguaje**: TypeScript de principio a fin
- **Hosting principal**: Cloudflare Workers + D1 (base de datos SQLite distribuida)
- **Alternativa**: también funciona con Node.js para self-hosting
- **Rendimiento**: páginas estáticas por defecto, dinámicas solo cuando es necesario

## Para quién tiene sentido

### Desarrolladores hartos de WordPress
Si cada actualización de WordPress te da ansiedad porque algo puede romperse, EmDash es un soplo de aire fresco: moderno, seguro, y predecible.

### Agencias web
Desplegar sitios para clientes en Cloudflare es más barato, más rápido y más seguro que gestionar hosting compartido con WordPress.

### Creadores de contenido técnicos
Si ya usas Astro o Cloudflare, EmDash se integra nativamente en tu stack.

## Limitaciones

- El ecosistema de plugins es minúsculo comparado con WordPress (que tiene miles)
- No tiene la madurez de 20 años de WordPress: habrá casos edge que aún no cubre
- Menos themes y templates disponibles
- Requiere comodidad con la terminal y conceptos de despliegue (no es "instalar con un clic" como WordPress en hosting compartido)

## Por qué importa

Cloudflare no es un actor menor: son la infraestructura que sirve un porcentaje enorme de Internet. Que estén apostando por un CMS moderno construido sobre Astro y diseñado para IA indica hacia dónde se dirige la gestión de contenido web.`,
    image_prompt: "Modern CMS interface built on Cloudflare infrastructure, Astro framework logo, sandboxed plugins, AI agent managing content, one-click deployment, dark purple background, violet accents, professional",
  },

  // 13. Math Curve Loaders
  {
    source: "github", source_id: "Paidax01/math-curve-loaders", url: "https://github.com/Paidax01/math-curve-loaders",
    name: "Math Curve Loaders", stars: 1300, language: "CSS", author: "Paidax01", category_id: 7,
    difficulty: "facil", interest_score: 82, is_oss_alternative: false, alternative_to: null,
    tags: ["frontend", "animaciones", "css", "matematicas", "loaders", "diseno"],
    seo_slug: "math-curve-loaders-animaciones-matematicas",
    seo_title: "Math Curve Loaders: Animaciones de carga hipnóticas basadas en curvas matemáticas puras",
    seo_description: "Galería de animaciones de carga basadas en espirales, cardioides e hipocicloides. Solo CSS + JS, sin librerías pesadas. Elegantes y ligeras.",
    summary_es: `Math Curve Loaders es una colección de animaciones de carga (loading spinners) creadas exclusivamente con CSS y JavaScript vanilla, basadas en curvas matemáticas reales: espirales, cardioides, hipocicloides, lemniscatas y más. El resultado son loaders hipnóticos, elegantes y completamente únicos que no se parecen a nada que hayas visto en una librería de componentes estándar.

## Por qué son especiales

La mayoría de loading spinners que ves en la web son variaciones del mismo tema: un círculo que gira, unos puntos que rebotan, una barra que se llena. Math Curve Loaders rompe con eso usando ecuaciones matemáticas reales como base de las animaciones:

### Curvas disponibles
- **Espiral logarítmica**: la curva que aparece en conchas marinas y galaxias
- **Cardioide**: la forma de corazón generada por un punto en un círculo que rueda sobre otro
- **Hipocicloide**: las figuras que dibujaría un Spirograph
- **Lemniscata de Bernoulli**: la curva en forma de infinito (∞)
- **Espiral de Arquímedes**: la espiral más "perfecta" y uniforme
- **Curvas de Lissajous**: los patrones que se forman al combinar dos oscilaciones

### Solo CSS + JS
No hay librerías externas, no hay Lottie, no hay SVGs animados importados. Todo es código puro que puedes leer, entender y modificar. El peso es mínimo comparado con librerías de animación.

## Cómo usarlos

Cada loader es un archivo CSS con su animación correspondiente. Copias el código, lo pegas en tu proyecto, y tienes un loader único funcionando. También puedes personalizar colores, velocidad y tamaño modificando las variables CSS.

## Casos de uso ideales

- **Landing pages**: un loader que impresione mientras carga tu aplicación por primera vez
- **Apps de ciencia/datos**: loaders matemáticos que encajan con la estética de una herramienta analítica
- **Portafolios creativos**: demuestra atención al detalle con animaciones que no son genéricas
- **Proyectos educativos**: loaders que son literalmente lecciones de geometría animada

## Limitaciones

- No es una librería "instala y usa con un import": requiere copiar el código CSS/JS
- Las animaciones más complejas pueden consumir más CPU que un spinner simple en dispositivos muy antiguos
- El catálogo es limitado comparado con librerías masivas como Lottie (pero cada animación es una joya)
- No tiene componentes wrapper para React, Vue, etc. — es CSS puro que tú integras

## Por qué importa

En un mundo donde todo el frontend se ve igual porque todos usan los mismos design systems y las mismas librerías de componentes, Math Curve Loaders te permite añadir un detalle visual que nadie más tiene. Y lo hace con pura matemática, sin dependencias, sin peso adicional.`,
    image_prompt: "Mathematical curves animating as loading spinners, spiral and cardioid shapes in motion, geometric animation gallery, pure CSS art, dark purple background, violet accents, professional",
  },

  // 14. HolyCode
  {
    source: "github", source_id: "CoderLuii/HolyCode", url: "https://github.com/CoderLuii/HolyCode",
    name: "HolyCode", stars: 1600, language: "Shell", author: "CoderLuii", category_id: 2,
    difficulty: "medio", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["devtools", "ia", "docker", "opencode", "claude", "mcp"],
    seo_slug: "holycode-workstation-ia-coding",
    seo_title: "HolyCode: Workstation de IA para coding con persistencia real y soporte multi-agente",
    seo_description: "HolyCode es una workstation de coding con IA que combina OpenCode + Claude con persistencia real. Sessions, plugins y config MCP sobreviven a rebuilds.",
    summary_es: `HolyCode es una workstation de desarrollo con IA basada en Docker que combina OpenCode (y opcionalmente Claude) en un entorno preconfigurado con una característica clave que los desarrolladores agradecen: persistencia real. Tus sesiones, settings, plugins y configuración de MCP sobreviven a rebuilds, updates y cualquier cambio en el contenedor.

## El problema que resuelve

Si usas herramientas de coding con IA en contenedores Docker, conoces la frustración: cada vez que rebuild el contenedor, pierdes tu configuración, tus sesiones previas, tus plugins instalados y tu historial. Es como empezar de cero cada vez. HolyCode resuelve esto con bind mounts inteligentes que mantienen tu progreso intacto.

## Características principales

### Persistencia real
Todo lo que importa vive en un bind mount:
- Sesiones de trabajo previas
- Configuración personalizada
- Plugins y extensiones instaladas
- Configuración de servidores MCP
- Historial de conversaciones con la IA

Puedes hacer rebuild, actualizar la imagen Docker, o incluso destruir y recrear el contenedor: tu progreso no se pierde nunca.

### Modo Claude-Auth opcional
Si tienes acceso a Claude, puedes activar un modo que conecta HolyCode directamente con la API de Claude para tener un asistente de coding de primer nivel integrado.

### Modo oh-my-openagent opcional
Para flujos de trabajo multi-agente más potentes, HolyCode incluye un modo opcional que permite orquestar múltiples agentes de IA trabajando en tu código simultáneamente.

### Entorno preconfigurado
HolyCode viene con un entorno de desarrollo completo ya configurado: editores, herramientas de terminal, linters, formatters, y todo lo necesario para empezar a trabajar con IA desde el momento en que levantas el contenedor.

## Para quién es

- **Desarrolladores que usan IA para codificar**: si OpenCode o Claude son parte de tu workflow diario, HolyCode te da un entorno dedicado y estable
- **Equipos que quieren estandarizar**: todos los desarrolladores trabajan con el mismo entorno, misma configuración, mismas herramientas
- **Experimentadores**: si pruebas diferentes configuraciones de MCP y agentes, la persistencia te permite iterar sin perder lo que funciona

## Instalación

Se despliega como un contenedor Docker con un docker-compose.yml que configura los bind mounts automáticamente.

## Limitaciones

- Requiere Docker y familiaridad con contenedores
- Es un entorno de terminal (no tiene IDE gráfico integrado, aunque puedes conectar VS Code remotamente)
- La calidad de la experiencia depende de la IA que uses como backend (Claude, OpenCode, etc.)
- Es relativamente opinionated en su configuración: funciona genial si te alineas con sus decisiones, pero puede requerir ajustes si tienes un workflow muy diferente

## Por qué importa

El workflow de "coding con IA" se está consolidando rápidamente, pero el tooling alrededor (entornos, persistencia, configuración de MCP) todavía es inmaduro. HolyCode proporciona una base sólida y probada para el día a día.`,
    image_prompt: "Docker-based AI coding workstation with persistent sessions, terminal interface with AI assistant, bind mount diagram, container rebuild without data loss, dark purple background, violet accents, professional",
  },

  // 15. Sem
  {
    source: "github", source_id: "Ataraxy-Labs/sem", url: "https://github.com/Ataraxy-Labs/sem",
    name: "Sem", stars: 2100, language: "Rust", author: "Ataraxy-Labs", category_id: 2,
    difficulty: "medio", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["devtools", "git", "diffs", "code-review", "semantico", "rust"],
    seo_slug: "sem-control-versiones-semantico",
    seo_title: "Sem: Control de versiones semántico que muestra diffs a nivel de funciones, no de líneas",
    seo_description: "Sem transforma git diff en diffs semánticos: funciones modificadas, clases renombradas, métodos movidos. 21 lenguajes. Code review 10x más rápido.",
    summary_es: `Sem es una herramienta que transforma los diffs de Git de un volcado de líneas añadidas y eliminadas en diffs semánticos que te dicen exactamente qué cambió a nivel de código: qué funciones se modificaron, qué clases se renombraron, qué métodos se movieron de archivo. En vez de descifrar 300 líneas verdes y rojas, Sem te dice la verdad en lenguaje que un desarrollador entiende.

## El problema de git diff

Cuando ejecutas "git diff" en un cambio grande, obtienes cientos de líneas con "+" y "-" que te fuerzan a reconstruir mentalmente qué pasó. ¿Se renombró una función o se borró una y se creó otra? ¿Este bloque de código se movió o se reescribió? ¿Los 50 archivos cambiados son un refactor simple o 50 cambios independientes?

Git diff opera a nivel de texto. No entiende código. No sabe qué es una función, una clase, un módulo. Solo ve líneas que aparecieron y líneas que desaparecieron.

## Qué hace Sem diferente

### Diffs a nivel de funciones
En vez de mostrarte líneas cambiadas, Sem te dice:
- "La función login() fue modificada" (con el diff específico dentro de esa función)
- "La clase UserService fue renombrada a AuthService"
- "El método validateToken() se movió del archivo auth.ts a tokens.ts"
- "Se añadió la función resetPassword() en user-actions.ts"

### 21 lenguajes soportados
Python, JavaScript, TypeScript, Rust, Go, Java, C, C++, Ruby, PHP, Swift, Kotlin, y más. Sem entiende la sintaxis de cada lenguaje para extraer las unidades semánticas correctas.

### Integración con Git
Se integra directamente como un comando de Git. Donde antes escribías "git diff", ahora escribes "sem diff" y obtienes la versión semántica.

## Impacto en code review

El code review es donde Sem brilla especialmente:
- **Pull requests grandes**: en vez de scrollear 500 líneas de diff, ves un resumen de "12 funciones modificadas, 3 renombradas, 1 movida"
- **Refactors**: cuando alguien renombra una variable en 30 archivos, Sem lo detecta como un renombrado, no como 30 cambios independientes
- **Detección de cambios reales**: distingue cambios cosméticos (formato, imports) de cambios de lógica real

## Para quién es

- **Cualquier equipo que haga code review**: los reviews son más rápidos cuando entiendes qué cambió de verdad
- **Repos grandes**: en monorepos o proyectos con muchos archivos, los diffs semánticos son una salvación
- **Senior developers**: en vez de leer cada línea, puedes enfocarte en las funciones que realmente importan

## Limitaciones

- No reemplaza git diff completamente: para cambios a nivel de configuración o texto plano, el diff tradicional sigue siendo necesario
- La calidad del análisis semántico depende del lenguaje (algunos tienen mejor soporte que otros)
- Es una herramienta de línea de comandos: no tiene integración visual en GitHub/GitLab (todavía)
- Proyecto en desarrollo activo: las versiones iniciales pueden tener rough edges

## Por qué importa

Sem representa la evolución natural del control de versiones: de operar sobre texto a operar sobre código. Es la diferencia entre saber que "cambiaron 47 líneas en auth.ts" y saber que "se refactorizó la función login() para usar OAuth2 en vez de JWT".`,
    image_prompt: "Semantic code diff showing function-level changes instead of line-by-line, renamed classes highlighted, code review interface, Git integration, dark purple background, violet accents, professional",
  },

  // 16. Video Object Removal
  {
    source: "github", source_id: "aastha-malik/video-object-removal", url: "https://github.com/aastha-malik/video-object-removal",
    name: "Video Object Removal", stars: 3200, language: "Python", author: "aastha-malik", category_id: 1,
    difficulty: "dificil", interest_score: 90, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "video", "sam2", "edicion", "eliminacion-objetos", "open-source"],
    seo_slug: "video-object-removal-borrar-objetos-video",
    seo_title: "Video Object Removal: Borra objetos de cualquier vídeo con IA y el resultado es impecable",
    seo_description: "Herramienta open source con SAM2 + ProPainter que elimina objetos de vídeos manteniendo coherencia perfecta entre frames. Gratis y local.",
    summary_es: `Video Object Removal es una herramienta open source que usa SAM2 (Segment Anything Model 2 de Meta) junto con ProPainter para eliminar cualquier objeto de un vídeo manteniendo una coherencia visual impecable entre frames. Seleccionas el objeto que quieres borrar, la IA lo segmenta, lo elimina, y rellena el espacio con el fondo reconstruido de forma que parece que el objeto nunca estuvo ahí.

## Cómo funciona

### 1. Segmentación con SAM2
SAM2 es el modelo de segmentación de Meta que puede identificar y seguir cualquier objeto a lo largo de un vídeo. Le señalas el objeto en un frame y SAM2 lo rastrea automáticamente por todo el vídeo, generando una máscara precisa frame a frame.

### 2. Inpainting con ProPainter
Una vez que SAM2 ha identificado el objeto en cada frame, ProPainter entra en acción para rellenar el espacio vacío. No pinta un color plano: reconstruye el fondo usando información temporal (frames anteriores y posteriores) y espacial (los píxeles circundantes), produciendo un resultado visualmente coherente.

### 3. Coherencia temporal
Lo más impresionante es la coherencia entre frames. No procesa cada frame independientemente (lo que produciría flickering), sino que analiza la secuencia completa para que la reconstrucción sea fluida y consistente.

## Resultados reales

Los vídeos de demostración muestran eliminaciones de objetos donde la coherencia es asombrosa: una mariposa eliminada de un vídeo donde el fondo floral se reconstruye perfectamente, una manzana que desaparece de una mesa manteniendo las sombras y reflejos correctos. El resultado final parece genuinamente que el objeto nunca estuvo en la escena.

## Para qué sirve

- **Edición de vídeo profesional**: eliminar elementos no deseados de grabaciones (personas pasando por detrás, objetos fuera de lugar, marcas)
- **Creación de contenido**: limpiar vídeos para redes sociales eliminando distracciones
- **Post-producción**: efectos de desaparición o eliminación de elementos de escena
- **Privacidad**: eliminar caras, matrículas o información identificable de grabaciones

## Requisitos

- GPU con VRAM suficiente para SAM2 y ProPainter (recomendado 8GB+ VRAM)
- Python con PyTorch
- Los modelos preentrenados de SAM2 y ProPainter (se descargan automáticamente)

## Limitaciones

- Requiere hardware potente (GPU con buena VRAM)
- Objetos que ocupan gran parte del frame son más difíciles de eliminar limpiamente
- La velocidad de procesamiento depende de la resolución y duración del vídeo
- Escenas con mucho movimiento o fondos complejos pueden producir artefactos sutiles
- No es procesamiento en tiempo real: necesita procesar todo el vídeo

## Por qué importa

Hace pocos años, eliminar un objeto de un vídeo de forma limpia requería horas de trabajo manual de un editor profesional frame a frame. Ahora una herramienta open source lo hace automáticamente con resultados que rivalizan con el trabajo manual. La democratización de estas capacidades de edición es transformadora.`,
    image_prompt: "Object being erased from a video frame with AI, before and after comparison, SAM2 segmentation mask, seamless background reconstruction, dark purple background, violet accents, professional",
  },

  // 17. Nothing Design Skill
  {
    source: "github", source_id: "dominikmartn/nothing-design-skill", url: "https://github.com/dominikmartn/nothing-design-skill",
    name: "Nothing Design Skill", stars: 1100, language: "Markdown", author: "dominikmartn", category_id: 2,
    difficulty: "facil", interest_score: 85, is_oss_alternative: false, alternative_to: null,
    tags: ["devtools", "claude-code", "ui", "diseno", "nothing", "skill"],
    seo_slug: "nothing-design-skill-ui-premium",
    seo_title: "Nothing Design Skill: Dile a Claude 'Nothing style' y genera interfaces de nivel unicornio",
    seo_description: "Un skill de Claude Code que genera interfaces UI en el estilo limpio y premium de Nothing. Dark/light mode, tokens de diseño y componentes listos.",
    summary_es: `Nothing Design Skill es un skill (plugin de instrucciones) para Claude Code que transforma la forma en que la IA genera interfaces de usuario. En vez de producir las UI genéricas y aburridas que los modelos de IA generan por defecto, este skill entrena a Claude para crear interfaces con el estilo visual limpio, obsesivo y premium de Nothing (la empresa de Carl Pei, co-fundador de OnePlus).

## El problema de las UIs generadas por IA

Cuando le pides a una IA que genere una interfaz, el resultado suele ser funcional pero genéricamente feo: los mismos colores aburridos, el mismo layout predecible, los mismos componentes sin personalidad. Es "UI de IA" y se nota a kilómetros.

Nothing Design Skill soluciona esto dándole a Claude un sistema de diseño completo y coherente como referencia.

## Qué incluye el skill

### Tokens de diseño perfectos
Colores, tipografía, espaciado, bordes, sombras — todo definido con la precisión obsesiva que caracteriza a Nothing. No son valores genéricos: son tokens de diseño cuidadosamente calibrados para producir interfaces que se ven premium.

### Componentes listos para usar
Botones, tarjetas, inputs, modales, navegación — cada componente diseñado siguiendo el lenguaje visual de Nothing con su estética minimalista y su atención al detalle.

### Dark + Light mode automático
Los dos temas están diseñados como un sistema coherente, no como "invierte los colores y ya". Cada tema tiene sus propias sombras, opacidades y acentos optimizados.

## Cómo se usa

Añades el skill a tu configuración de Claude Code y, cuando quieras una interfaz con este estilo, simplemente mencionas "nothing style" en tu prompt. Claude genera código con el sistema de diseño de Nothing aplicado automáticamente.

## Para quién es

- **Desarrolladores que usan Claude Code para generar UI**: si generas interfaces con IA regularmente, este skill eleva dramáticamente la calidad visual del output
- **Desarrolladores sin ojo para el diseño**: obtén interfaces con aspecto profesional sin necesidad de ser diseñador
- **Prototipos rápidos**: genera mockups funcionales que se ven lo bastante bien como para presentar a un cliente

## Limitaciones

- Es un estilo específico (Nothing/minimalismo tech premium): no sirve si necesitas una estética completamente diferente
- Solo funciona con Claude Code, no con otros asistentes de IA
- Los componentes son referencias de diseño, no una librería de componentes real instalable
- El resultado final puede necesitar ajustes para adaptarse a tu marca o producto específico

## Por qué importa

La calidad visual de las interfaces generadas por IA es uno de los mayores cuellos de botella para usar IA en desarrollo frontend de forma seria. Nothing Design Skill demuestra que con las instrucciones correctas, la IA puede generar interfaces que realmente se ven bien — no "bien para ser generadas por IA", sino genuinamente bien.`,
    image_prompt: "Premium minimalist UI design in Nothing style, clean interface components, dark and light mode, obsessive typography and spacing, design tokens visualization, dark purple background, violet accents, professional",
  },

  // 18. SentrySearch
  {
    source: "github", source_id: "ssrajadh/sentrysearch", url: "https://github.com/ssrajadh/sentrysearch",
    name: "SentrySearch", stars: 1800, language: "Python", author: "ssrajadh", category_id: 1,
    difficulty: "dificil", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "video", "busqueda-semantica", "dashcam", "gopro", "local"],
    seo_slug: "sentrysearch-busqueda-semantica-videos",
    seo_title: "SentrySearch: Busca en tus vídeos de dashcam o GoPro describiendo lo que pasó en español",
    seo_description: "SentrySearch permite buscar en vídeos de dashcam o GoPro con lenguaje natural. Describe la escena y encuentra el clip exacto. 100% local.",
    summary_es: `SentrySearch es una herramienta que permite hacer búsquedas semánticas sobre vídeos usando lenguaje natural. Escribes una descripción de lo que buscas — por ejemplo, "el coche rojo que se saltó el semáforo" o "la persona con paraguas cruzando la calle" — y SentrySearch encuentra el clip exacto en tus grabaciones de dashcam, GoPro u otros vídeos. Sin ver horas de metraje. Directo al momento.

## Cómo funciona

### 1. Indexación del vídeo
SentrySearch procesa tus vídeos usando modelos de visión por computador (Gemini o Qwen3-VL) que analizan el contenido visual y generan descripciones semánticas de cada segmento del vídeo. Es como si un humano viera el vídeo entero y tomara notas de todo lo que pasa.

### 2. Búsqueda en lenguaje natural
Una vez indexado, puedes buscar describiendo lo que buscas en tu idioma, con tus palabras. No necesitas tags, no necesitas timestamps, no necesitas haber marcado nada previamente. Simplemente describes la escena y SentrySearch la encuentra.

### 3. Procesamiento local
Todo el procesamiento ocurre en tu ordenador. Los vídeos no se suben a ningún servidor. Tus grabaciones de dashcam (que pueden contener matrículas, ubicaciones, y momentos privados) se quedan en tu máquina.

## Casos de uso reales

### Dashcam
- "El motorista que me cerró el paso en la avenida principal"
- "El momento en que el peatón cruzó en rojo"
- "El coche blanco que frenó de golpe delante de mí"

Ideal para encontrar clips específicos si necesitas evidencia para un parte de accidente o simplemente quieres revisar un momento concreto.

### GoPro / Cámaras de acción
- "La ola grande que surfee al atardecer"
- "El salto de bici en la segunda bajada"
- "El momento en que apareció el ciervo en el sendero"

Si grabas aventuras con GoPro, encontrar ese clip perfecto entre horas de grabación es una pesadilla. SentrySearch lo resuelve.

### Cámaras de seguridad
- "La persona que dejó el paquete en la puerta"
- "El momento en que se encendió la luz del jardín"

## Requisitos técnicos

- GPU moderna (idealmente RTX 5070 o superior) para procesamiento local eficiente
- Python con los modelos de visión instalados
- Espacio en disco para el índice semántico de los vídeos

## Limitaciones

- El hardware requerido es significativo: necesitas una GPU potente para que el procesamiento sea razonable
- La indexación inicial de vídeos largos toma tiempo
- La calidad de la búsqueda depende de la calidad del vídeo (vídeos nocturnos o de baja resolución son más difíciles)
- Es un proyecto relativamente nuevo y en desarrollo

## Por qué importa

Tenemos cada vez más vídeos grabados (dashcams, GoPros, cámaras de seguridad, reuniones grabadas) y cada vez menos tiempo para revisarlos. La búsqueda semántica sobre vídeo transforma archivos pasivos de metraje en bases de datos activas y consultables.`,
    image_prompt: "Semantic video search interface with dashcam and GoPro footage, natural language query finding specific clip, AI vision analysis of video frames, dark purple background, violet accents, professional",
  },

  // 19. Videofy Minimal
  {
    source: "github", source_id: "schibsted/videofy_minimal", url: "https://github.com/schibsted/videofy_minimal",
    name: "Videofy Minimal", stars: 1500, language: "Python", author: "schibsted", category_id: 1,
    difficulty: "medio", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "video", "articulos", "tiktok", "contenido", "automatizacion"],
    seo_slug: "videofy-articulos-a-videos-cortos",
    seo_title: "Videofy: Convierte artículos de noticias en vídeos cortos listos para TikTok o Reels",
    seo_description: "Videofy Minimal transforma artículos en vídeos cortos con voz en off, imágenes relevantes y edición profesional. Local, con OpenAI + ElevenLabs.",
    summary_es: `Videofy Minimal es una herramienta de Schibsted (el grupo mediático detrás de marcas como Blocket, Finn.no y VG) que convierte artículos de texto en vídeos cortos listos para publicar en TikTok, Instagram Reels, YouTube Shorts o pantallas informativas. Tomas cualquier artículo de noticias y en minutos tienes un vídeo con voz en off natural, imágenes relevantes y edición profesional.

## Cómo funciona el pipeline

### 1. Análisis del artículo
La IA (OpenAI) lee el artículo completo y genera:
- Un guion condensado para voz en off (optimizado para la duración del vídeo)
- Puntos clave visuales (qué imágenes deben acompañar cada sección del guion)
- Estructura narrativa (introducción, desarrollo, cierre)

### 2. Generación de voz
ElevenLabs genera la voz en off con calidad profesional. No es una voz robótica: es una narración natural que suena como un presentador de noticias real.

### 3. Selección de imágenes
El sistema selecciona o genera imágenes relevantes para cada sección del guion, creando una composición visual que acompaña la narración.

### 4. Composición del vídeo
Todo se ensambla automáticamente: la narración, las imágenes, las transiciones, los textos superpuestos. El resultado es un vídeo corto (30 segundos a 2 minutos) listo para publicar.

## Para quién es

### Medios de comunicación
Schibsted lo usa internamente para sus propias publicaciones. Cualquier redacción puede convertir sus artículos escritos en vídeos para redes sociales sin equipo de vídeo dedicado.

### Creadores de contenido
Si publicas newsletters, blogs o artículos, Videofy te permite reutilizar ese contenido en formato vídeo con mínimo esfuerzo.

### Marketing de contenidos
Transforma case studies, posts de blog y comunicados de prensa en vídeos para redes sociales.

### Pantallas informativas
Genera vídeos de noticias para pantallas en lobbies, salas de espera o dashboards informativos.

## Stack técnico

- **OpenAI**: análisis de texto y generación de guion
- **ElevenLabs**: voz en off de alta calidad
- **Python**: pipeline de procesamiento y composición de vídeo
- **CMS integrado**: sistema de revisión para aprobar vídeos antes de publicar
- **100% local**: corre en tu laptop (necesitas API keys de OpenAI y ElevenLabs)

## Limitaciones

- Requiere API keys de pago (OpenAI + ElevenLabs), con sus costes asociados
- La calidad del vídeo depende de la calidad del artículo original
- Los vídeos generados son informativos, no cinematográficos: funcionales pero no espectaculares
- El proceso no es instantáneo: generación de voz y composición toman algunos minutos
- La selección automática de imágenes no siempre es perfecta

## Por qué importa

Los vídeos cortos son el formato dominante en redes sociales, pero producir vídeo es significativamente más costoso que escribir texto. Videofy cierra esa brecha permitiendo que cualquier equipo editorial produzca vídeos a partir de su contenido existente.`,
    image_prompt: "Article text transforming into a short video with AI voiceover, TikTok and Reels format, news article becoming video content, media production pipeline, dark purple background, violet accents, professional",
  },

  // 20. OpenFootManager
  {
    source: "github", source_id: "openfootmanager/openfootmanager", url: "https://github.com/openfootmanager/openfootmanager",
    name: "OpenFootManager", stars: 1200, language: "Rust", author: "openfootmanager", category_id: 8,
    difficulty: "facil", interest_score: 84, is_oss_alternative: true, alternative_to: "Football Manager (Sports Interactive)",
    tags: ["juegos", "futbol", "open-source", "simulacion", "rust", "react"],
    seo_slug: "openfootmanager-alternativa-football-manager",
    seo_title: "OpenFootManager: La alternativa open source a Football Manager que todo hincha estaba esperando",
    seo_description: "OpenFootManager es un simulador de fútbol open source con motor en Rust e interfaz React + Tailwind. Offline, moddable y totalmente gratuito.",
    summary_es: `OpenFootManager es la alternativa open source al legendario Football Manager de Sports Interactive. Si has querido jugar a gestionar tu equipo de fútbol pero no quieres pagar los 40 euros que cuesta Football Manager cada año, o si eres un desarrollador al que le encantaría poder modificar y personalizar cada aspecto del juego, OpenFootManager es tu proyecto.

## Qué es Football Manager y por qué importa una alternativa

Football Manager (FM) es el simulador de gestión de fútbol más popular del mundo. Gestionas un club de fútbol: fichas jugadores, diseñas tácticas, negociar traspasos, gestionas el presupuesto, y ves cómo tu equipo juega partidos simulados. Es adictivo y tiene millones de jugadores en todo el mundo.

El problema: FM cuesta 40 euros al año, es código cerrado, y no puedes modificar el motor de simulación ni añadir funcionalidades que quieras.

## Qué ofrece OpenFootManager

### Motor de simulación en Rust
El corazón del juego — el motor que simula los partidos y calcula estadísticas — está escrito en Rust, lo que lo hace extremadamente rápido y eficiente. Las simulaciones que en otros lenguajes tardarían segundos, en Rust son instantáneas.

### Interfaz moderna con React + Tailwind
La interfaz de usuario está construida con React y Tailwind CSS: moderna, responsiva, y familiar para cualquier desarrollador web que quiera contribuir o personalizar.

### Totalmente offline
No necesita conexión a Internet. Instala y juega. Tu progreso se guarda localmente.

### Modding total
Al ser open source, puedes:
- Añadir ligas y equipos de cualquier país
- Modificar las fórmulas de simulación de partidos
- Crear tus propias funcionalidades (scout automatizado, análisis de datos, etc.)
- Personalizar la interfaz a tu gusto

## Estado actual

OpenFootManager está en desarrollo activo. Las funcionalidades básicas (gestión de equipo, simulación de partidos, sistema de ligas) están implementadas, pero es un proyecto en crecimiento. No tiene (todavía) la profundidad de Football Manager que lleva más de 20 años de desarrollo, pero la base es sólida y la comunidad está creciendo.

## Para quién es

- **Fans de Football Manager con presupuesto limitado**: un simulador de fútbol gratuito y de calidad
- **Desarrolladores gamers**: contribuye al proyecto, añade funcionalidades, aprende Rust con un proyecto real y divertido
- **Modders**: personaliza absolutamente todo, desde datos hasta mecánicas
- **Comunidades de fútbol**: crea versiones con las ligas locales de tu país o tu liga amateur

## Limitaciones

- No tiene la profundidad de 20+ años de desarrollo de Football Manager
- La base de datos de jugadores no es tan completa (pero la comunidad puede contribuir)
- Todavía faltan funciones avanzadas (agentes, conferencias de prensa, relaciones con la directiva)
- Es un proyecto comunitario: el ritmo de desarrollo depende de los contribuidores

## Por qué importa

Football Manager ha sido un monopolio efectivo en su género durante décadas. Una alternativa open source no solo ofrece una opción gratuita, sino que abre la puerta a innovaciones que FM nunca implementará porque no encajan con su modelo de negocio.`,
    image_prompt: "Football management simulation game interface showing squad tactics board, player stats, match simulation, transfer market, Rust and React logos, dark purple background, violet accents, professional",
  },

  // 21. Loop
  {
    source: "github", source_id: "tadaspetra/loop", url: "https://github.com/tadaspetra/loop",
    name: "Loop", stars: 2800, language: "TypeScript", author: "tadaspetra", category_id: 8,
    difficulty: "facil", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["video", "ia", "screencasts", "tutoriales", "edicion", "productividad"],
    seo_slug: "loop-editor-video-ia-screencasts",
    seo_title: "Loop: El editor de vídeo con IA que hace que crear screencasts y tutoriales sea ridículamente fácil",
    seo_description: "Loop graba pantalla + micrófono + cámara, transcribe con IA, y te deja editar el vídeo editando texto. Elimina silencios y muletillas al instante.",
    summary_es: `Loop es un editor de vídeo pensado específicamente para screencasts y tutoriales que usa IA para hacer que la edición sea tan fácil como editar un documento de texto. Grabas tu pantalla, micrófono y cámara, la IA transcribe todo en tiempo real, y después editas el vídeo simplemente editando la transcripción: borras una frase del texto y desaparece del vídeo.

## El problema de crear screencasts

Crear un buen screencast o tutorial en vídeo tiene dos fases: grabar y editar. La grabación es fácil — enciendes la cámara y hablas. La edición es la parte dolorosa:

- **Silencios**: esos momentos incómodos donde te quedas pensando
- **Muletillas**: los "ehmm", "a ver", "vale" que se cuelan constantemente
- **Errores**: cuando dices algo mal y tienes que repetirlo
- **Secciones lentas**: partes donde explicas algo que se podría condensar

En un editor de vídeo tradicional (Premiere, DaVinci, Camtasia), eliminar estos problemas requiere localizar cada momento en la línea de tiempo, cortar, ajustar transiciones, y repetir decenas de veces. En un vídeo de 20 minutos, la edición puede llevar horas.

## Cómo Loop cambia todo

### Grabación integrada
Loop captura simultáneamente pantalla, micrófono y cámara web en una sola interfaz. No necesitas OBS + un editor separado.

### Transcripción con IA en tiempo real
Mientras grabas, la IA transcribe todo lo que dices. Cuando terminas, tienes el vídeo Y su transcripción completa sincronizada.

### Edición basada en texto
Aquí está la magia: ves tu vídeo como texto. Cada palabra de la transcripción corresponde a un momento del vídeo. Para eliminar un silencio, una muletilla o una sección entera, simplemente la seleccionas en el texto y la borras. Loop ajusta el vídeo automáticamente.

### Eliminación automática de silencios
Un botón para detectar y eliminar todos los silencios del vídeo. Lo que en un editor tradicional te tomaría 30 minutos de cortar y pegar, Loop lo hace en un clic.

## Para quién es

- **Creadores de contenido tech**: tutoriales, demos de producto, explicaciones técnicas
- **Educadores**: graba lecciones y edítalas en minutos
- **Desarrolladores que documentan**: crea vídeos de documentación sin sufrir la edición
- **Cualquiera que grabe presentaciones**: limpia silencios y errores al instante

## El flujo completo

1. Abres Loop, seleccionas pantalla + micro + cámara
2. Grabas tu screencast hablando normalmente (con errores, silencios y todo)
3. Al terminar, Loop te muestra la transcripción
4. Borras las partes que sobran del texto
5. Exportas un vídeo limpio, profesional y sin tiempos muertos

## Limitaciones

- Es un editor pensado para screencasts, no para edición de vídeo general (no esperes efectos de After Effects)
- La calidad de la transcripción depende de tu pronunciación y del idioma
- Todavía en desarrollo: puede faltar alguna función avanzada de edición
- La transición entre cortes puede no ser siempre perfecta en grabaciones con mucho movimiento

## Por qué importa

El contenido en vídeo es cada vez más importante para desarrolladores, educadores y creadores. El cuello de botella nunca fue grabar — fue editar. Loop elimina ese cuello de botella haciendo que editar sea tan natural como editar texto.`,
    image_prompt: "Video editor showing transcript-based editing, text being deleted causing video cuts, screen recording with webcam overlay, silence removal, AI transcription, dark purple background, violet accents, professional",
  },
];

async function main() {
  console.log(`=== OffRadar: Repos de X Batch 2 — ${projects.length} proyectos ===\n`);
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
    if (i < projects.length - 1) await new Promise(r => setTimeout(r, 10000));
  }
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\n✅ Total: ${count[0].n} proyectos publicados`);
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });

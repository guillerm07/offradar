import fs from "fs";

// Read and fully replace the novedades data file with much richer content
const content = `export type Novedad = {
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
    tagline: "Construye apps full-stack desde un prompt, directamente en el navegador.",
    category: "IDE con IA",
    url: "https://bolt.new",
    clonableWithCode: true,
    summary: "Bolt.new es un entorno de desarrollo impulsado por IA donde describes lo que quieres y obtienes una aplicación funcionando en minutos. Sin instalar nada. Todo en el navegador. Desarrollado por StackBlitz, la empresa detrás de WebContainers.\\n\\nEs la demostración más convincente hasta la fecha de que el paradigma 'prompt → app funcional' ya es viable para prototipos, MVPs y demos. Lo que antes eran días de configuración, ahora son minutos de conversación con una IA.",
    fullContent: \`## Qué es Bolt.new y por qué está en todas partes

Si has estado en Twitter tech en los últimos meses, habrás visto a gente compartiendo vídeos de apps creadas en minutos con Bolt.new. Y no son demos de juguete — son apps reales con autenticación, base de datos, rutas, componentes, y despliegue incluido.

Bolt.new es un entorno de desarrollo web completo que corre en el navegador, potenciado por modelos de lenguaje (Claude, GPT-4). Le describes lo que quieres — "una app de gestión de tareas con React, Tailwind, autenticación y base de datos" — y genera toda la aplicación, la ejecuta en directo, y te la deja lista para desplegar.

La magia está en **WebContainers**, la tecnología propietaria de StackBlitz que permite ejecutar Node.js completo dentro del navegador usando WebAssembly. No es una simulación — es un entorno real con npm, sistema de archivos y servidor funcionando en tu pestaña de Chrome.

## El flujo de trabajo real

### 1. Describe tu app
Escribes en lenguaje natural qué quieres construir. Puedes ser tan vago o específico como quieras:

- **Vago**: "Una app para gestionar listas de la compra"
- **Específico**: "Una app de notas con Next.js 14, Tailwind CSS, SQLite con Drizzle ORM, autenticación por email/password con bcrypt, editor markdown con vista previa, búsqueda por texto completo, modo oscuro, y diseño responsive"

Cuanto más específico, mejor resultado.

### 2. Bolt genera y ejecuta
En tiempo real ves cómo genera los archivos, instala dependencias con npm, y ejecuta el servidor de desarrollo. Una preview integrada te muestra la app funcionando conforme se va creando.

### 3. Itera conversando
"Cambia el color del header a violeta." "Añade un botón de exportar a CSV." "La página de login no funciona bien en móvil, arréglala." Bolt modifica el código y ves el resultado al instante.

### 4. Despliega o descarga
Cuando estás contento, puedes desplegarlo en Netlify con un clic o descargar todo el código fuente para seguir trabajando en tu editor habitual.

## Para qué sirve de verdad (y para qué no)

### Funciona increíblemente bien para:

**Prototipos rápidos**: tienes una idea para una app, quieres validarla antes de invertir semanas de desarrollo. En 30 minutos tienes algo funcional que enseñar.

**Demos para clientes/inversores**: necesitas mostrar cómo sería un producto antes de construirlo de verdad. Bolt genera una demo convincente en minutos.

**Aprender frameworks**: quieres ver cómo se estructura una app con Next.js, Svelte o Remix. Le pides un ejemplo y ves el código completo, no solo snippets.

**Landing pages y webs estáticas**: crear una web corporativa, una landing de producto o un portfolio es casi instantáneo.

### No funciona tan bien para:

**Apps de producción complejas**: el código generado necesita revisión. Para lógica de negocio elaborada, integraciones complejas o escala, necesitas un equipo de desarrollo de verdad.

**Backend complejo**: APIs con lógica de negocio profunda, colas de mensajes, microservicios — esto va más allá de lo que Bolt puede generar de forma fiable.

**Apps con datos sensibles**: todo se ejecuta en el navegador. No es el sitio para manejar datos médicos o financieros.

## Bolt.new vs Claude Code: ¿cuándo usar cada uno?

| Aspecto | Bolt.new | Claude Code |
|---|---|---|
| Dónde se ejecuta | Navegador | Tu terminal local |
| Instalación | Ninguna | Instalar Claude Code |
| Velocidad para prototipar | Extremadamente rápido | Rápido |
| Control sobre el código | Limitado (en el navegador) | Total (tu filesystem) |
| Proyectos existentes | Solo nuevos | Nuevos y existentes |
| Privacidad del código | En servidores de StackBlitz | En tu máquina |
| Despliegue | Netlify integrado | Tú decides |
| Precio | Gratis limitado / 20\$/mes | Incluido en la suscripción de Claude |

**Mi recomendación**: usa Bolt.new cuando quieras prototipar una idea nueva rápidamente sin configurar nada. Usa Claude Code cuando trabajes en un proyecto real que va a crecer, necesitas control total, o trabajas con código existente.

## Cómo replicar la experiencia con Claude Code

\\\`\\\`\\\`bash
# Claude Code puede hacer lo mismo en tu terminal
claude "Crea una app de gestión de contactos con Next.js 15,
Tailwind CSS, SQLite con Drizzle ORM, autenticación con
email/password, listado con búsqueda y filtros, formulario
de creación/edición, y modo oscuro."
\\\`\\\`\\\`

Claude Code genera la estructura completa, instala dependencias, crea todos los archivos, y puedes ejecutar \\\`npm run dev\\\` inmediatamente. La diferencia es que el código está en tu disco duro, puedes usar tu editor favorito, y tienes control total sobre cada archivo.

## Precio

- **Gratis**: límite de mensajes y funcionalidades básicas
- **Pro (20\$/mes)**: mensajes ilimitados, modelos premium, despliegue incluido
- **Enterprise**: para equipos, con SSO y gestión de permisos

## Veredicto

Bolt.new es impresionante como demostración tecnológica y genuinamente útil para prototipos rápidos. No reemplaza a un equipo de desarrollo, pero reduce drásticamente el tiempo de "tengo una idea" a "tengo algo funcional". Si combinas Bolt.new para el prototipo inicial con Claude Code para el desarrollo serio, tienes un flujo de trabajo potentísimo.\`
  },
  {
    slug: "cursor-rules",
    name: "Cursor Rules",
    tagline: "Reglas comunitarias que hacen que la IA de Cursor entienda tu proyecto.",
    category: "Herramientas dev",
    url: "https://github.com/PatrickJS/awesome-cursorrules",
    clonableWithCode: true,
    summary: "Las Cursor Rules son archivos de configuración que le dicen a la IA de Cursor cómo debe generar código en TU proyecto: qué convenciones seguir, qué versiones usar, qué patrones respetar. La comunidad ha creado cientos de reglas optimizadas por stack.\\n\\nEs la diferencia entre una IA que genera código genérico y una que genera código que encaja perfectamente en tu proyecto.",
    fullContent: \`## El problema que resuelven

Cuando usas Cursor (o cualquier editor con IA), el modelo de lenguaje no sabe nada sobre tu proyecto específico. No sabe que usas Tailwind v4, que prefieres Server Components, que tu equipo nombra las variables en camelCase, o que tu API sigue el patrón Repository. El resultado: código genérico que tienes que adaptar manualmente cada vez.

Las Cursor Rules solucionan esto con un archivo \\\`.cursorrules\\\` en la raíz de tu proyecto que contextualiza al modelo. Es como darle un manual de estilo a un nuevo desarrollador que se une al equipo.

## Cómo funcionan

### El archivo .cursorrules

Creas un archivo \\\`.cursorrules\\\` en la raíz de tu proyecto con instrucciones en lenguaje natural:

\\\`\\\`\\\`
# Stack
- Next.js 15 con App Router
- Tailwind CSS v4 (usar @theme en vez de tailwind.config)
- TypeScript estricto
- Drizzle ORM para base de datos
- PostgreSQL

# Convenciones
- Componentes: PascalCase, un componente por archivo
- Funciones: camelCase, preferir arrow functions
- Archivos: kebab-case
- No usar "any" en TypeScript jamás
- Preferir Server Components. Solo usar "use client" cuando sea estrictamente necesario

# Patrones
- Queries a DB en /lib/queries.ts
- Componentes UI reutilizables en /components/ui/
- Cada página es un Server Component async
- Usar export const dynamic = "force-dynamic" para páginas con datos de DB

# Estilo
- Modo oscuro obligatorio
- Usar las CSS variables del tema (--accent, --muted, --surface, etc.)
- Espaciado consistente: py-8 sm:py-12 para páginas
- Contenedor: mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
\\\`\\\`\\\`

Con esto, cada vez que le pidas a Cursor que genere código, lo hará siguiendo estas reglas. En vez de código genérico, obtienes código que encaja en tu proyecto.

### El repositorio awesome-cursorrules

La comunidad ha creado un repositorio con **cientos de reglas predefinidas** organizadas por stack:

- **Next.js + TypeScript**: reglas optimizadas para App Router, Server Components, metadata
- **React + Tailwind**: convenciones de componentes, hooks, estilos
- **Python + FastAPI**: typing estricto, Pydantic models, async patterns
- **Go**: convenciones del lenguaje, error handling, packages
- **Rust**: ownership patterns, error handling, cargo conventions
- **Vue + Nuxt**: Composition API, auto-imports, Nuxt modules
- **Svelte + SvelteKit**: stores, load functions, form actions
- Y muchos más...

Descargas el que se ajuste a tu stack, lo personalizas con las convenciones de tu equipo, y lo añades al repo.

## Por qué es más importante de lo que parece

### La IA genera código que pasa code review
Sin rules, el código generado por IA suele necesitar ajustes manuales para cumplir las convenciones del equipo. Con rules bien definidas, el código generado ya sigue las convenciones desde el primer momento.

### Estandarización del equipo
Si todo tu equipo usa las mismas Cursor Rules, la IA genera código consistente sin importar quién lo pida. Es como tener un linter inteligente que entiende tu contexto.

### Mejora con el tiempo
A medida que añades reglas ("no uses esta librería, usa esta otra", "siempre maneja errores así"), la calidad del código generado mejora progresivamente.

## Cómo crear las tuyas propias con Claude Code

No necesitas Cursor para beneficiarte de esta idea. Puedes crear el equivalente para Claude Code:

\\\`\\\`\\\`bash
# Crea un archivo CLAUDE.md en la raíz de tu proyecto
claude "Analiza este proyecto y genera un CLAUDE.md con:
- Stack técnico detectado
- Convenciones de código que observas
- Patrones arquitectónicos que se usan
- Reglas específicas para generar código consistente"
\\\`\\\`\\\`

Claude Code lee el archivo CLAUDE.md automáticamente y lo usa como contexto. Es el equivalente exacto de las Cursor Rules pero para Claude Code.

## Reglas que recomiendo para cualquier proyecto

\\\`\\\`\\\`
# Obligatorias
- Ortografía española perfecta en todos los textos (tildes, eñes, ¿, ¡)
- Slugs sin acentos ni caracteres especiales
- TypeScript estricto, nunca "any"
- Siempre manejar errores, nunca silenciarlos
- Comentarios solo cuando el código no es auto-explicativo

# Recomendadas
- Preferir composición sobre herencia
- Funciones pequeñas que hacen una cosa
- Nombres descriptivos (getUserById en vez de getUsr)
- Tests para lógica de negocio crítica
- Variables de entorno para configuración
\\\`\\\`\\\`

## Veredicto

Las Cursor Rules (y su equivalente CLAUDE.md para Claude Code) son una de esas cosas pequeñas que tienen un impacto enorme en la productividad. Pasas 30 minutos definiendo las reglas y ahorras horas de ajustes manuales en cada sesión de código con IA. Si usas cualquier editor con IA y no tienes un archivo de reglas, estás dejando dinero en la mesa.\`
  },
  {
    slug: "screen-studio-alternativa",
    name: "OBS + IA para grabación de pantalla",
    tagline: "Alternativa open source a Screen Studio con zoom automático y edición con IA.",
    category: "Productividad",
    url: "https://obsproject.com",
    clonableWithCode: false,
    summary: "Screen Studio revolucionó la grabación de pantalla con zoom automático al cursor, fondos bonitos y edición inteligente. Pero cuesta 89\$ (pago único). Con OBS (gratuito) + herramientas de IA + un poco de post-producción, puedes conseguir un resultado muy similar sin pagar nada.\\n\\nEsta guía te enseña el setup completo para grabar tutoriales y demos con calidad profesional usando solo herramientas gratuitas.",
    fullContent: \`## Qué hace Screen Studio (y por qué la gente paga 89\$)

Screen Studio es una app de Mac que graba tu pantalla y automáticamente:

- **Hace zoom al cursor**: cuando haces clic en algo, la grabación hace zoom suave a esa zona
- **Añade fondos bonitos**: tu ventana de app flotando sobre un fondo con gradiente
- **Suaviza movimientos**: el cursor se mueve de forma fluida, no a saltos
- **Exporta en formatos optimizados**: vertical para TikTok, cuadrado para Instagram, 16:9 para YouTube

El resultado son esos vídeos de demos de producto que ves en Twitter que parecen super profesionales. Y la verdad es que Screen Studio es genial. Pero 89\$ es mucho para muchos creadores, y solo funciona en Mac.

## La alternativa gratuita: OBS + post-producción con IA

### Paso 1: Grabar con OBS (gratuito, multiplataforma)

OBS es el software de grabación de pantalla más usado del mundo. Es gratuito, open source, y funciona en Windows, Mac y Linux.

Configuración recomendada para grabaciones tipo Screen Studio:

- **Resolución**: graba a 1920x1080 o 2560x1440
- **FPS**: 60fps para fluidez
- **Formato**: MP4 con codec H.264
- **Audio**: captura el audio del sistema + tu micrófono

\\\`\\\`\\\`
OBS → Settings → Output:
  Output Mode: Advanced
  Encoder: x264 (o NVENC si tienes GPU NVIDIA)
  Rate Control: CRF
  CRF: 18 (buena calidad)
\\\`\\\`\\\`

### Paso 2: Zoom automático con herramientas de IA

Aquí es donde entra la IA. Hay varias opciones:

**Opción A: FFmpeg + detección de cursor (gratuito)**

Puedes procesar el vídeo con un script que detecta dónde está el cursor y hace zoom automático:

\\\`\\\`\\\`python
# Concepto: detectar posición del cursor en cada frame
# y aplicar crop + scale dinámico con FFmpeg
import subprocess

def apply_auto_zoom(input_video, cursor_positions):
    for segment in cursor_positions:
        # Crop alrededor del cursor y escalar a resolución completa
        subprocess.run([
            'ffmpeg', '-i', input_video,
            '-vf', f'crop=960:540:{segment.x-480}:{segment.y-270},scale=1920:1080',
            '-ss', str(segment.start), '-t', str(segment.duration),
            f'segment_{segment.id}.mp4'
        ])
\\\`\\\`\\\`

**Opción B: ScreenToGif + edición manual (gratuito, Windows)**

ScreenToGif permite añadir zoom manual frame a frame. Más trabajo pero control total.

**Opción C: DaVinci Resolve (gratuito, profesional)**

DaVinci Resolve es un editor de vídeo profesional completamente gratuito. Con keyframes puedes recrear el efecto de zoom al cursor de Screen Studio, aunque requiere más trabajo manual.

### Paso 3: Fondos y post-producción

Para el efecto de "ventana flotando sobre fondo bonito":

\\\`\\\`\\\`bash
# FFmpeg: añadir padding y fondo de color
ffmpeg -i grabacion.mp4 \\
  -vf "scale=1600:-1,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=1a1030" \\
  -c:a copy resultado.mp4
\\\`\\\`\\\`

O usa Canva (gratuito) para crear un fondo con gradiente, exportar como imagen, y componer en DaVinci Resolve.

### Paso 4: Exportar para cada plataforma

\\\`\\\`\\\`bash
# YouTube (16:9)
ffmpeg -i resultado.mp4 -vf "scale=1920:1080" youtube.mp4

# TikTok / Reels (9:16)
ffmpeg -i resultado.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" tiktok.mp4

# Instagram post (1:1)
ffmpeg -i resultado.mp4 -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=1080:1080" instagram.mp4
\\\`\\\`\\\`

## ¿Merece la pena Screen Studio?

Seamos honestos: Screen Studio hace en 1 clic lo que esta guía hace en 30 minutos de post-producción. Si grabas demos de producto regularmente y tu tiempo vale dinero, los 89\$ se amortizan rápido.

La alternativa OBS + IA tiene sentido si:
- No puedes (o no quieres) pagar 89\$
- Usas Windows o Linux (Screen Studio es solo Mac)
- Quieres control total sobre el resultado
- Grabas esporádicamente, no cada día

## Herramientas mencionadas

- **OBS Studio**: [obsproject.com](https://obsproject.com) — gratuito, open source
- **DaVinci Resolve**: [blackmagicdesign.com](https://www.blackmagicdesign.com/products/davinciresolve) — gratuito, profesional
- **FFmpeg**: herramienta de línea de comandos para procesar vídeo
- **Canva**: para crear fondos y gráficos — plan gratuito suficiente\`
  },
  {
    slug: "languine",
    name: "Languine",
    tagline: "Traduce tu app a 100 idiomas con un solo comando usando IA.",
    category: "DevTools",
    url: "https://languine.ai",
    clonableWithCode: true,
    summary: "Languine automatiza la internacionalización (i18n) de aplicaciones usando IA. En vez de contratar traductores o pasar semanas con archivos JSON de traducciones, ejecutas un comando y tu app está traducida a decenas de idiomas manteniendo el contexto técnico.\\n\\nEs especialmente útil para startups que quieren lanzar en múltiples mercados sin invertir miles de euros en traducción profesional.",
    fullContent: \`## El dolor de la internacionalización

Si alguna vez has internacionalizado una aplicación web, conoces el infierno:

1. Extraes todas las cadenas de texto del código a archivos JSON/YAML
2. Envías esos archivos a un traductor (o los traduces tú con Google Translate)
3. Las traducciones vuelven con errores de contexto ("Log in" traducido como "Registro" en vez de "Iniciar sesión")
4. Las variables dinámicas se rompen (\\\`{count} items\\\` → \\\`{count} artículos\\\` pero en alemán el orden es diferente)
5. Cada vez que añades una nueva cadena de texto, el ciclo se repite
6. Mantener 20 idiomas sincronizados es una pesadilla logística

El resultado: la mayoría de startups lanzan solo en inglés y español "para empezar" y nunca llegan a traducir a más idiomas porque el coste en tiempo y dinero es enorme.

## Qué hace Languine

Languine conecta con los archivos de traducción de tu proyecto (JSON, YAML, .po, .xliff, .ts...) y usa modelos de lenguaje para traducir manteniendo el contexto:

\\\`\\\`\\\`bash
npx languine translate --target=fr,de,ja,ko,pt,it,zh
\\\`\\\`\\\`

Un comando. Tu app traducida a 7 idiomas. En minutos, no en semanas.

### Lo que hace diferente a Google Translate

Languine no es un traductor genérico. Entiende que está traduciendo una **aplicación**:

- **Contexto técnico**: sabe que "Dashboard" en una app no se traduce literalmente
- **Variables**: mantiene \\\`{userName}\\\` y \\\`{count}\\\` intactos en todas las traducciones
- **Pluralizaciones**: maneja las reglas de plural de cada idioma (en ruso hay 3 formas de plural, en árabe hay 6)
- **Longitud**: intenta mantener traducciones de longitud similar para que la UI no se rompa
- **Consistencia**: traduce "Save" siempre como "Guardar" en toda la app, no a veces como "Salvar"
- **Tono**: mantiene el tono de tu app (formal, informal, técnico)

### Flujo de trabajo real

\\\`\\\`\\\`
1. Desarrollas tu app en inglés (o español)
2. Tus cadenas de texto están en archivos i18n estándar
3. Ejecutas \`languine translate\`
4. Languine genera los archivos de traducción para cada idioma
5. Revisas las traducciones (o las envías a un nativo para revisión rápida)
6. Commit y deploy — tu app es multiidioma
\\\`\\\`\\\`

Cuando añades nuevas cadenas de texto, ejecutas \\\`languine translate\\\` de nuevo y solo traduce lo nuevo, manteniendo lo existente intacto.

## Números que importan

**Coste de traducción profesional**: 0.10-0.20€ por palabra. Una app media tiene ~5.000 palabras. Traducir a 10 idiomas = 5.000-10.000€.

**Coste con Languine**: la herramienta + el coste del LLM. Para 5.000 palabras × 10 idiomas ≈ 5-15€ en tokens de IA.

**Tiempo de traducción profesional**: 2-4 semanas por idioma (enviar, esperar, revisar, corregir). 10 idiomas = meses.

**Tiempo con Languine**: minutos de ejecución + horas de revisión.

La calidad no es idéntica a un traductor nativo profesional, especialmente para idiomas con matices culturales fuertes. Pero para el 90% de las startups, la calidad de Languine es suficiente para lanzar, y siempre puedes contratar traductores para pulir los idiomas clave después.

## Cómo hacer lo mismo con Claude Code

Si no quieres usar Languine específicamente, puedes replicar el concepto con Claude Code:

\\\`\\\`\\\`bash
claude "Lee todos los archivos de traducción en /locales/en/.
Para cada archivo, genera la traducción a español (es), francés (fr),
alemán (de) y japonés (ja). Mantén las claves exactas, las variables
entre llaves, y adapta el tono al contexto de una aplicación web.
Guarda cada traducción en /locales/{idioma}/ con el mismo nombre de archivo."
\\\`\\\`\\\`

Claude Code leerá tus archivos, entenderá el contexto y generará las traducciones. No tiene la integración automatizada de Languine (detección de cambios, CI/CD, etc.) pero el resultado de traducción es comparable o mejor, porque Claude es excelente con idiomas.

## ¿Para quién es?

- **Startups** que quieren lanzar en múltiples mercados sin gastar miles en traducción
- **Desarrolladores indie** que quieren que su side project llegue a más gente
- **Equipos pequeños** que no pueden justificar un presupuesto de localización
- **Apps con actualizaciones frecuentes** donde mantener traducciones al día es costoso

## Veredicto

Languine no reemplaza a un traductor profesional para contenido marketing o legal donde cada palabra importa. Pero para la UI de una aplicación — botones, menús, mensajes, formularios — produce traducciones perfectamente usables en una fracción del tiempo y coste. Es la diferencia entre lanzar en 2 idiomas o en 20.\`
  },
  {
    slug: "inbox-zero",
    name: "Inbox Zero",
    tagline: "Cliente de email con IA que limpia, categoriza y gestiona tu bandeja por ti.",
    category: "Productividad",
    url: "https://getinboxzero.com",
    clonableWithCode: true,
    summary: "Inbox Zero es un cliente de email open source que usa IA para lo que todos queremos pero nadie ha conseguido de verdad: mantener la bandeja de entrada a cero. Auto-categoriza emails, se desuscribe de newsletters que no lees, responde emails rutinarios, y te presenta solo lo que necesita tu atención.\\n\\nEs open source, se conecta a Gmail, y puedes self-hostearlo para que ninguna IA externa lea tus correos.",
    fullContent: \`## El problema universal

Todo el mundo tiene el mismo problema con el email: recibes 50-200 emails al día, el 80% son irrelevantes (newsletters que no lees, notificaciones automáticas, CC en hilos que no te afectan, spam que pasa el filtro), y los emails que SÍ importan se pierden entre el ruido.

Las soluciones existentes no funcionan:
- **Filtros de Gmail**: requieren configuración manual y se quedan obsoletos
- **Superhuman**: 30\$/mes por un cliente de email bonito (sí, treinta dólares por leer correo)
- **SaneBox**: 7\$/mes por filtrado inteligente, pero tus emails pasan por sus servidores
- **La fuerza de voluntad**: "Esta vez sí que voy a mantener mi bandeja a cero" (spoiler: no)

Inbox Zero quiere resolver esto con IA, de forma open source y transparente.

## Qué hace concretamente

### Auto-categorización
Cada email que llega se categoriza automáticamente en:
- **Requiere acción**: emails que necesitan una respuesta o acción tuya
- **Informativo**: emails útiles que solo necesitas leer (no responder)
- **Newsletter**: contenido periódico de suscripciones
- **Notificación**: alertas automáticas de servicios (GitHub, Stripe, etc.)
- **Spam/irrelevante**: lo que no debería estar en tu bandeja

### Auto-desuscripción
Inbox Zero detecta newsletters que nunca abres y te ofrece desuscribirte con un clic. No simplemente archivarlas — desuscribirte de verdad para que no lleguen más.

### Respuestas automáticas
Para emails rutinarios ("¿A qué hora es la reunión?" "¿Puedes enviarme el documento X?"), Inbox Zero puede generar borradores de respuesta que tú apruebas con un clic. No envía nada sin tu permiso.

### Resumen diario
Cada mañana recibes un resumen de lo que llegó durante la noche categorizado por importancia. En 30 segundos sabes qué necesita tu atención y qué puedes ignorar.

### Reglas con IA
En vez de crear filtros con condiciones rígidas ("de: amazon.com → archivar"), puedes crear reglas en lenguaje natural:

- "Si es una factura, etiquétala como 'Contabilidad' y archívala"
- "Si es de un cliente mencionando un problema, márcalo como urgente"
- "Si es un email de networking genérico, responde amablemente que no tengo disponibilidad"

## Arquitectura técnica

Inbox Zero se conecta a Gmail vía OAuth (permisos estándar de Google). Tus emails se procesan con un LLM (OpenAI por defecto, configurable) para la categorización y generación de respuestas.

**Self-hosting**: si no quieres que tus emails pasen por la API de OpenAI, puedes self-hostear Inbox Zero y conectar un modelo local (Ollama + Llama) para que todo se procese en tu infraestructura.

## El dilema de la privacidad

Seamos directos: darle acceso a una IA a tu correo electrónico es una decisión de privacidad importante. Inbox Zero aborda esto de varias formas:

- **Open source**: puedes auditar exactamente qué hace con tus emails
- **Self-hosteable**: puedes ejecutarlo en tu servidor con modelos locales
- **No almacena contenido**: procesa emails al vuelo, no guarda copias
- **Permisos granulares**: puedes limitar qué carpetas puede acceder

Aun así, si manejas información muy sensible (legal, médica, financiera), piénsatelo dos veces antes de conectar cualquier IA a esa cuenta de correo.

## Cómo construir algo similar con Claude Code

La idea de Inbox Zero es replicable a menor escala con un script:

\\\`\\\`\\\`python
# Concepto: script que categoriza tu email cada mañana
import imaplib
import anthropic

def categorize_inbox():
    # 1. Conectar a Gmail por IMAP
    mail = imaplib.IMAP4_SSL('imap.gmail.com')
    mail.login('tu@gmail.com', 'app_password')
    mail.select('inbox')

    # 2. Leer emails no leídos
    _, messages = mail.search(None, 'UNSEEN')

    # 3. Para cada email, categorizar con Claude
    client = anthropic.Anthropic()
    for msg_id in messages[0].split():
        # Obtener asunto y remitente
        # Categorizar con Claude
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=100,
            messages=[{"role": "user", "content":
                f"Categoriza este email: De: {sender}, Asunto: {subject}. "
                "Responde solo con: ACCION / INFORMATIVO / NEWSLETTER / IGNORAR"
            }]
        )
        category = response.content[0].text.strip()

        # 4. Mover a carpeta según categoría
        if category == "IGNORAR":
            mail.store(msg_id, '+FLAGS', '\\\\Seen')
            mail.move(msg_id, 'Archivo')
\\\`\\\`\\\`

Con Claude Code puedes construir esto en una tarde y ejecutarlo con un cron cada mañana. No tendrás la interfaz bonita de Inbox Zero pero sí la funcionalidad core.

## Veredicto

Inbox Zero es uno de esos proyectos que atacan un problema que todos tenemos. El enfoque open source + IA es correcto, y la posibilidad de self-hosting lo hace viable para gente preocupada por la privacidad. ¿Es perfecto? No — la IA todavía se equivoca clasificando emails ambiguos, y las respuestas automáticas necesitan supervisión. Pero como asistente que pre-procesa tu bandeja y reduce el ruido, funciona sorprendentemente bien.\`
  },
];

export function getNovedadBySlug(slug: string) {
  return novedades.find((n) => n.slug === slug) ?? null;
}
`;

fs.writeFileSync("/Users/guillermodelpinohernandez/Documents/offroad/apps/web/src/lib/novedades-data.ts", content);
console.log("✅ novedades-data.ts reescrito con contenido extenso");

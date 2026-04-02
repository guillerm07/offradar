import postgres from "postgres";

const sql = postgres("postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar");

const updates = [
  {
    source_id: "hacksider/Deep-Live-Cam",
    summary_es: `Deep-Live-Cam es una de esas herramientas que te deja con la boca abierta la primera vez que la ves funcionar. Con una sola foto de un rostro — cualquier foto, incluso sacada de Google — la herramienta reemplaza tu cara por esa otra en tiempo real sobre tu webcam. Mueves la cabeza, sonríes, hablas, y la cara reemplazada replica tus expresiones con una fidelidad que da escalofríos.

No necesitas un dataset de cientos de fotos, no necesitas entrenar ningún modelo, no necesitas horas de procesamiento. Una foto, un clic, y el face swap está funcionando en vivo.

## Qué puede hacer exactamente

### Face swap en tiempo real (webcam)
El uso más impactante. Activas tu webcam, cargas una foto de referencia, y tu cara se transforma en la de la foto en directo. La latencia es mínima — parece magia. Tus gestos, movimientos de cabeza, parpadeos y expresiones se replican fielmente.

### Face swap en vídeo pregrabado
Puedes aplicar el face swap sobre cualquier vídeo. Cargas el vídeo, la foto de referencia, y Deep-Live-Cam procesa cada frame reemplazando el rostro. El resultado es un vídeo donde la persona original tiene otra cara.

### Múltiples caras en la misma escena
Si hay varias personas en el vídeo o la webcam, puedes reemplazar cada una por una cara diferente. El sistema detecta y trackea cada rostro de forma independiente.

### Mejora de calidad facial
Incluye un módulo de upscaling específico para caras que mejora la resolución del rostro reemplazado, haciéndolo más convincente incluso a resoluciones altas.

## La tecnología detrás

Deep-Live-Cam combina varias técnicas de IA:

1. **Detección facial**: localiza caras en cada frame usando InsightFace
2. **Extracción de landmarks**: mapea los puntos clave del rostro (ojos, nariz, boca, contorno)
3. **Swap neural**: una red neuronal reemplaza el rostro manteniendo la iluminación, el ángulo y la expresión del original
4. **Blending**: fusiona los bordes del rostro reemplazado con el fondo para que no se note el corte
5. **Post-procesamiento**: ajuste de color, corrección de iluminación y opcionalmente upscaling

Todo esto sucede en milisegundos por frame, permitiendo el funcionamiento en tiempo real.

## Aplicaciones legítimas y creativas

- **Creación de contenido**: efectos especiales caseros para vídeos de YouTube, sketches cómicos
- **Privacidad en vídeo**: anonimizar tu rostro en grabaciones o videollamadas
- **Doblaje visual**: hacer que una persona "hable" en otro idioma con labios sincronizados
- **Cine independiente**: efectos de rejuvenecimiento/envejecimiento o dobles digitales sin presupuesto de Hollywood
- **Educación**: demostrar las capacidades y riesgos de la IA generativa
- **Arte digital**: instalaciones artísticas interactivas con transformación facial

## El debate ético que genera

Seamos directos: esta tecnología es peligrosa si se usa mal. Y hay que hablar de ello.

**Riesgos reales:**
- Suplantación de identidad en videollamadas
- Creación de contenido íntimo falso sin consentimiento
- Desinformación política con vídeos falsos
- Fraude y estafas usando la cara de otra persona

**Salvaguardas del proyecto:**
- El software incluye filtros que detectan y bloquean ciertos usos malintencionados
- Los frames procesados incluyen marcas digitales invisibles (watermarks) para detectar deepfakes
- La comunidad mantiene una política estricta contra el uso para suplantar, acosar o defraudar

**Legalidad:**
En la mayoría de países europeos (incluido España), crear deepfakes de personas sin su consentimiento explícito es ilegal. En EEUU la legislación varía por estado pero la tendencia es hacia la regulación estricta. Usar esta herramienta con caras de personas reales sin su permiso puede tener consecuencias legales serias.

## Requisitos técnicos

**Mínimos:**
- Python 3.10+
- 8GB de RAM
- Funciona en CPU (lento, ~2-5 fps)

**Recomendados:**
- GPU NVIDIA con 6GB+ VRAM (RTX 3060 o superior)
- 16GB de RAM
- Con GPU: 20-30 fps en tiempo real

**También funciona en:**
- AMD GPU (con ROCm)
- Apple Silicon (M1/M2/M3, con CoreML)
- Solo CPU (funcional pero lento)

## Instalación

\`\`\`bash
git clone https://github.com/hacksider/Deep-Live-Cam.git
cd Deep-Live-Cam
pip install -r requirements.txt
python run.py
\`\`\`

Se abre una interfaz gráfica donde cargas la foto de referencia, eliges la fuente de vídeo (webcam o archivo) y controlas el proceso. La primera ejecución descarga los modelos necesarios (~300MB).

## Mi opinión personal

Es una herramienta fascinante desde el punto de vista tecnológico — el hecho de que un PC doméstico pueda hacer esto en tiempo real es impresionante. Pero es una de esas tecnologías que requieren un uso responsable. Experimenta, aprende, entiende las capacidades de la IA, pero respeta a los demás. El "puedo" no implica "debo".`
  },
  {
    source_id: "FlowiseAI/Flowise",
    summary_es: `Flowise es lo que pasa cuando coges toda la potencia de LangChain (el framework de IA más popular) y le pones una interfaz visual donde cualquiera puede construir aplicaciones de inteligencia artificial arrastrando y soltando bloques. Sin escribir una sola línea de código, puedes montar chatbots, asistentes RAG, agentes autónomos y pipelines de procesamiento de datos con IA.

## El problema que resuelve

LangChain es increíblemente potente pero tiene una curva de aprendizaje brutal. Necesitas saber Python o JavaScript, entender conceptos como chains, agents, vector stores, embeddings, retrievers... Para un desarrollador experimentado, genial. Para el resto del mundo, inaccesible.

Flowise democratiza todo eso. Cada concepto de LangChain se convierte en un bloque visual que puedes arrastrar al canvas y conectar con otros bloques. ¿Quieres un chatbot que consulte PDFs? Arrastra un "PDF Loader", conéctalo a un "Vector Store", luego a un "Chat Model", y por último a un "Conversational Chain". Hecho. Sin código.

## Un ejemplo real paso a paso

Quieres un chatbot para tu web que responda preguntas sobre tu producto usando la documentación existente:

### 1. Carga de documentos
Arrastras un nodo "PDF Loader" y subes tus PDFs de documentación. O usas un "Web Scraper" para que Flowise lea directamente tu web de docs.

### 2. Procesamiento de texto
Conectas un "Text Splitter" que divide los documentos en fragmentos manejables (chunks) — esto es crítico para que el RAG funcione bien.

### 3. Vectorización
Los chunks pasan a un "Embeddings" (OpenAI, Ollama, HuggingFace...) que los convierte en vectores numéricos, y se almacenan en un "Vector Store" (Pinecone, Qdrant, Chroma, FAISS...).

### 4. Modelo de lenguaje
Añades un nodo de "Chat Model" (GPT-4, Claude, Gemini, Llama via Ollama...) que será el cerebro que genera las respuestas.

### 5. Cadena conversacional
Un nodo "Conversational Retrieval Chain" une todo: cuando el usuario pregunta algo, busca en los documentos vectorizados, encuentra los fragmentos relevantes, y los envía al LLM junto con la pregunta para generar una respuesta contextualizada.

### 6. API y chat
Flowise genera automáticamente un endpoint API y un widget de chat que puedes incrustar en tu web con un snippet de HTML.

**Tiempo total: 15-30 minutos.** Sin código.

## Más de 100 integraciones

La biblioteca de nodos es enorme:

**Modelos de lenguaje:** OpenAI, Anthropic (Claude), Google (Gemini), Ollama, HuggingFace, Cohere, Replicate, Azure OpenAI, AWS Bedrock, Groq, Together AI, Fireworks...

**Vector stores:** Pinecone, Qdrant, Chroma, FAISS, Weaviate, Milvus, Supabase, PostgreSQL (pgvector), Redis...

**Cargadores de documentos:** PDF, Word, Excel, CSV, JSON, Web scraping, GitHub repos, Notion, Confluence, S3, Google Drive...

**Herramientas para agentes:** búsqueda web (SerpAPI, Google), calculadora, ejecución de código, llamadas a API, base de datos SQL, Wolfram Alpha...

**Memoria:** buffer, window, summary, vector store memory, Zep, Motorhead...

## Agentes autónomos

Flowise no solo hace chatbots RAG — también puede crear agentes que:

- **Buscan en internet** cuando no saben algo
- **Ejecutan código Python** para resolver problemas matemáticos o de datos
- **Llaman APIs externas** para obtener información en tiempo real
- **Consultan bases de datos SQL** escribiendo y ejecutando queries
- **Usan herramientas personalizadas** que tú defines

Los agentes toman decisiones sobre qué herramienta usar en cada momento, como lo haría un humano. "El usuario pregunta por el tiempo en Madrid → voy a usar la herramienta de búsqueda web para obtener el pronóstico actual."

## Marketplace de flujos

La comunidad comparte flujos prediseñados que puedes importar con un clic:
- Chatbot de atención al cliente con RAG
- Asistente de escritura con diferentes tonos
- Analizador de sentimiento para reseñas
- Generador de resúmenes de reuniones
- Bot de Telegram/WhatsApp con IA

## Comparativa con alternativas

| | Flowise | Dify | n8n + IA | Langchain (código) |
|---|---|---|---|---|
| Sin código | Sí | Sí | Parcial | No |
| Especializado en IA | Sí | Sí | No | Sí |
| Agentes | Sí | Sí | Limitado | Sí |
| RAG visual | Sí | Sí | No | No |
| Marketplace | Sí | Sí | Sí | No |
| Self-hosting | Sí | Sí | Sí | N/A |
| Complejidad | Baja | Media | Media | Alta |

**Flowise vs Dify**: Flowise es más flexible y tiene más integraciones a nivel de componentes. Dify es más completo como plataforma de producción (gestión de prompts, evaluación, monitorización). Para prototipar rápido, Flowise. Para producción empresarial, Dify.

## Instalación

\`\`\`bash
npx flowise start
\`\`\`

Una línea y tienes Flowise corriendo en \`localhost:3000\`. Para producción, usa Docker:

\`\`\`bash
docker run -d -p 3000:3000 flowiseai/flowise
\`\`\`

La documentación es clara y la comunidad en Discord es muy activa para resolver dudas.`
  },
  {
    source_id: "AppFlowy-IO/AppFlowy",
    summary_es: `AppFlowy es la respuesta a una pregunta que muchos usuarios de Notion se hacen en silencio: "¿Realmente quiero que todas mis notas, ideas y datos de negocio vivan en los servidores de una empresa americana que puede cambiar sus términos de servicio cuando quiera?". La respuesta de AppFlowy es: no tienes por qué. Puedes tener exactamente la misma experiencia, pero con tus datos bajo tu control.

## Qué ofrece (y qué tal funciona de verdad)

### Editor de documentos
El editor de bloques es sorprendentemente bueno. Soporta todo lo que esperas: texto enriquecido, headings, listas, checkboxes, toggles, bloques de código con syntax highlighting, embeds de vídeo, imágenes, tablas, callouts, dividers, y fórmulas matemáticas. El atajo \`/\` abre un menú de comandos idéntico al de Notion.

La experiencia de escritura es fluida — no hay lag perceptible al escribir, los bloques se arrastran suavemente, y el markdown inline funciona bien (escribe \`**negrita**\` y se convierte al instante).

### Bases de datos
Como en Notion, puedes crear bases de datos con múltiples vistas:

- **Tabla**: la vista Excel con filtros, ordenación y campos calculados
- **Kanban**: arrastra tarjetas entre columnas (perfecto para gestión de tareas)
- **Calendario**: visualiza registros por fecha
- **Grid avanzado**: con relaciones entre tablas, rollups y lookups

Los tipos de campo incluyen: texto, número, select, multi-select, fecha, checkbox, URL, email, relación, y fórmulas.

### IA integrada
AppFlowy ha integrado IA de forma nativa (no como plugin, sino como parte del producto):

- **/ai** en cualquier documento para generar, resumir, traducir o mejorar texto
- Preguntas sobre el contenido de tus documentos
- Generación automática de resúmenes
- Traducción entre idiomas
- Extracción de tareas y action items de notas de reuniones

Puedes conectar tu propia API key de OpenAI o usar el servicio cloud de AppFlowy.

## La diferencia real con Notion

### Control de datos
Con Notion, tus datos están en sus servidores en AWS. No puedes exportar fácilmente (el export de Notion es famosamente malo), no puedes hacer backup incremental, y si Notion cierra o cambia precios, estás atrapado.

Con AppFlowy:
- **Local first**: por defecto, todo se guarda en tu disco duro. Funciona sin internet
- **Self-hosting**: monta tu propio servidor de sincronización para tu equipo
- **Cloud opcional**: si prefieres la comodidad, AppFlowy Cloud sincroniza entre dispositivos
- **Export real**: tus datos están en formato abierto que puedes leer con cualquier herramienta

### Rendimiento
Notion en navegador es lento, especialmente con documentos grandes. La app de escritorio es un Electron pesado. AppFlowy usa Flutter, lo que le da un rendimiento nativo real en escritorio y móvil. Abrir un documento grande es instantáneo.

### Precio
Notion: gratis con limitaciones, 10$/usuario/mes para equipos. AppFlowy self-hosted: gratis sin límites. AppFlowy Cloud: plan gratuito generoso + planes de pago competitivos.

## Para quién tiene más sentido

**Profesionales con datos sensibles:** abogados, médicos, contables que manejan información de clientes y no pueden (o no deberían) almacenarla en servidores de terceros en EEUU.

**Equipos técnicos:** que quieren control total sobre su infraestructura y la posibilidad de extender la herramienta con plugins personalizados.

**Usuarios de Notion frustrados:** con la lentitud, el precio creciente, o la falta de control sobre sus datos.

**Fans del open source:** que prefieren herramientas transparentes y auditables.

## Limitaciones honestas

- **Integraciones**: Notion tiene más integraciones con terceros (Slack, Google Calendar, etc.). AppFlowy está creciendo pero aún le falta
- **Colaboración en tiempo real**: funciona pero no es tan pulida como la de Notion
- **Comunidad y templates**: Notion tiene un ecosistema enorme de templates. AppFlowy es más pequeño
- **API**: la API de AppFlowy es más limitada que la de Notion

## Instalación

**Escritorio:** descarga desde appflowy.io para Windows, Mac o Linux. Abre y empieza a usar — no necesita cuenta.

**Móvil:** disponible en App Store y Google Play.

**Self-hosting:**
\`\`\`bash
git clone https://github.com/AppFlowy-IO/AppFlowy-Cloud.git
cd AppFlowy-Cloud
docker compose up -d
\`\`\`

La documentación de self-hosting es detallada y la comunidad responde rápido en Discord y GitHub.`
  },
  {
    source_id: "OpenCut-app/OpenCut",
    summary_es: `OpenCut quiere ser el editor de vídeo que CapCut debería haber sido: potente, gratuito, sin marcas de agua, sin suscripciones, y sin que una empresa china tenga acceso a tu contenido y tus datos de uso. Es uno de los proyectos open source de más rápido crecimiento en GitHub, y por buenas razones.

## El contexto: por qué la gente quiere una alternativa a CapCut

CapCut se ha convertido en el editor de vídeo más popular del mundo, especialmente entre creadores de contenido para TikTok, Instagram y YouTube Shorts. Es rápido, intuitivo y tiene efectos muy buenos. Pero tiene problemas serios:

- **Propiedad de ByteDance** (la empresa detrás de TikTok): toda la telemetría y datos de uso van a servidores chinos
- **Puede ser baneado**: si tu país restringe TikTok (como ya ha pasado en EEUU e India), CapCut también cae
- **Marcas de agua en funciones premium**: para quitar la marca de agua necesitas la suscripción Pro
- **Funciones que desaparecen**: CapCut ha ido moviendo funciones del plan gratuito al de pago progresivamente
- **Dependencia**: todo tu workflow de edición depende de una empresa que puede cambiar las reglas cuando quiera

## Qué ofrece OpenCut hoy

### Editor de timeline
Timeline multi-pista completo donde puedes:
- Cortar, recortar, dividir y reorganizar clips con precisión de frame
- Múltiples pistas de vídeo para composición (picture-in-picture, overlays)
- Pistas de audio independientes
- Zoom y scroll en el timeline para edición precisa
- Atajos de teclado para flujo de trabajo rápido

### Texto y subtítulos
- Texto animado con múltiples estilos y fuentes
- Subtítulos automáticos generados por IA (speech-to-text)
- Personalización completa: color, tamaño, sombra, contorno, posición, animación
- Templates de texto prediseñados para redes sociales

### Efectos y transiciones
- Biblioteca de transiciones entre clips (fade, slide, zoom, glitch...)
- Filtros de color y LUTs para dar estilo cinematográfico
- Efectos de velocidad (slow motion, speed ramp)
- Corrección básica de color (brillo, contraste, saturación, temperatura)

### Audio
- Ajuste de volumen por clip y por pista
- Fade in / fade out automático
- Separación de audio y vídeo
- Biblioteca de música libre de derechos (en desarrollo)

### Exportación
- Múltiples resoluciones: 720p, 1080p, 4K
- Formatos optimizados por plataforma: TikTok (9:16), YouTube (16:9), Instagram (1:1, 4:5)
- Control de bitrate y calidad
- **Sin marca de agua** — nunca, en ningún caso

## Lo que NO tiene todavía (pero está en desarrollo)

Siendo honestos, OpenCut todavía no reemplaza al 100% a CapCut. Algunas funciones que faltan o están en desarrollo:

- Keyframes avanzados para animaciones
- Chroma key (pantalla verde) — en desarrollo
- Algunos efectos de texto de CapCut que son muy populares
- Tracking de movimiento
- Estabilización de vídeo avanzada
- App móvil (de momento solo escritorio)

Sin embargo, para el **80% de los casos de uso** (cortar vídeos, añadir subtítulos, transiciones, texto y música), ya es completamente funcional.

## La velocidad de desarrollo es impresionante

OpenCut tiene una comunidad de contribuidores muy activa. Cada semana se fusionan decenas de pull requests con nuevas funciones, correcciones y mejoras. El ritmo de desarrollo es más rápido que el de muchos editores comerciales. Al ser open source, cualquiera puede proponer o implementar la función que necesita.

## Para quién es ideal ahora mismo

- **Creadores de contenido** que editan vídeos cortos para redes y no quieren depender de CapCut
- **Pequeños negocios** que necesitan crear contenido de redes sin presupuesto para Adobe Premiere
- **Educadores** y creadores de tutoriales que quieren un editor libre y gratuito
- **Personas preocupadas por la privacidad** que no quieren enviar su contenido a servidores de ByteDance

## Instalación

Descarga desde la web del proyecto o desde las releases de GitHub. Disponible para Windows, Mac y Linux. No necesita cuenta ni registro.`
  },
  {
    source_id: "makeplane/plane",
    summary_es: `Si alguna vez has tenido que usar Jira y has pensado "tiene que haber algo mejor que esto", Plane es tu respuesta. Es un gestor de proyectos open source que ofrece la experiencia moderna de Linear (rápido, limpio, intuitivo) pero sin el precio de 8$/usuario/mes y con la libertad de poder self-hostearlo.

## El dolor real que resuelve

La gestión de proyectos de software está dominada por herramientas que frustran:

**Jira** es el estándar de la industria, pero también es sinónimo de lentitud, complejidad absurda y una interfaz que parece de otra década. Configurar un proyecto nuevo en Jira es un trabajo de medio día. Encontrar una tarea puede llevar más tiempo que hacerla.

**Linear** solucionó la UX y es rápido y bonito, pero cuesta 8$/usuario/mes, no es self-hosteable, y no tienes control sobre tus datos.

**Trello** es simple pero demasiado básico para equipos de desarrollo — no tiene sprints, backlog, roadmaps ni ciclos.

Plane coge lo mejor de cada uno: la potencia de Jira, la UX de Linear, y la simplicidad de Trello. Y es gratis.

## Funcionalidades de verdad

### Issues con superpoderes
Cada issue tiene: título, descripción rica (markdown), asignado, prioridad (urgent, high, medium, low, none), etiquetas, estado personalizable, fechas de inicio y fin, estimación de puntos, y sub-issues. Puedes vincular issues entre sí (bloquea, está bloqueado por, duplicado de, relacionado con).

### Vistas múltiples
- **Lista**: la vista compacta para ver muchos issues de un vistazo
- **Kanban**: tablero de columnas arrastrables por estado, prioridad, asignado o etiqueta
- **Spreadsheet**: vista tipo Excel con edición inline de cualquier campo
- **Gantt chart**: timeline visual de las tareas y sus dependencias

### Ciclos (sprints)
Planifica el trabajo en iteraciones. Define la duración, arrastra issues al ciclo, y trackea el progreso con:
- Burndown chart
- Velocidad del equipo
- Issues completadas vs. pendientes
- Comparativa con ciclos anteriores

### Módulos (epics)
Agrupa issues relacionados en módulos. "Rediseño de la landing page" puede ser un módulo que contiene 15 issues. Ves el progreso del módulo como un todo, sin perder el detalle de cada tarea.

### Roadmap
Visualiza el plan a largo plazo con un timeline. Los módulos y ciclos se representan como bloques en el tiempo. Ideal para comunicar al equipo (o a stakeholders) qué se va a hacer y cuándo.

### Vistas personalizadas guardadas
Crea combinaciones de filtros ("Mis issues de alta prioridad en el ciclo actual que están en progreso") y guárdalas como vistas reutilizables. Cada miembro del equipo puede tener sus propias vistas.

## Integraciones

- **GitHub**: vincula commits y pull requests con issues automáticamente. Cuando un PR menciona "fixes PLANE-123", el issue se actualiza solo
- **GitLab**: misma integración que GitHub
- **Slack**: recibe notificaciones de cambios en issues y crea issues desde Slack
- **Importación**: migra tu proyecto completo desde Jira, Asana o GitHub Issues con el importador integrado

## Comparativa directa

| | Jira | Linear | Plane |
|---|---|---|---|
| Precio | 7,75$/usuario | 8$/usuario | **Gratis** |
| Velocidad de carga | 3-5 segundos | <1 segundo | <1 segundo |
| Configuración inicial | Horas | Minutos | Minutos |
| Self-hosting | Datacenter (carísimo) | No | **Sí, Docker** |
| Curva de aprendizaje | Alta (certificaciones Jira) | Baja | Baja |
| Sprints | Sí (complejo) | Ciclos | Ciclos |
| Roadmap | Con plugins | Sí | Sí |
| Git integration | Sí | Sí | Sí |
| Custom fields | Sí (complejo) | Limitado | Sí |

## Para quién es Plane

**Startups** que quieren gestión de proyectos profesional desde el día 1 sin gastar dinero. A medida que crecen, el coste de herramientas como Jira o Linear se convierte en un gasto significativo. Con Plane, ese coste es cero.

**Equipos remotos** que necesitan un punto central donde todo el mundo sepa qué se está haciendo, qué está bloqueado y cuál es el plan.

**Empresas con requisitos de compliance** que necesitan self-hosting para que los datos de proyectos no salgan de su infraestructura.

## Instalación

\`\`\`bash
git clone https://github.com/makeplane/plane.git
cd plane
docker compose up -d
\`\`\`

En 5 minutos tienes Plane corriendo. La primera vez te guía con un setup wizard para crear tu workspace y tu primer proyecto. También tienen un cloud gestionado si prefieres no self-hostear.`
  },
  {
    source_id: "mudler/LocalAI",
    summary_es: `LocalAI es la navaja suiza de la inteligencia artificial local. Un solo servicio que te permite ejecutar modelos de lenguaje, generar imágenes, convertir texto a voz, transcribir audio, crear embeddings y más — todo en tu propio hardware, sin enviar datos a la nube, y con una API 100% compatible con la de OpenAI.

Esa última parte es la clave: si tienes una app que funciona con la API de OpenAI, cambias la URL de \`api.openai.com\` a \`localhost:8080\` y todo sigue funcionando. Sin cambiar una línea de código en tu aplicación.

## El caso de uso killer

Imagina que tu empresa tiene una aplicación interna que usa GPT-4 para procesar documentos de clientes. Funciona bien, pero:

- Los datos de tus clientes viajan a los servidores de OpenAI en EEUU
- El departamento legal dice que eso viola las políticas de privacidad de la empresa
- El coste de la API de OpenAI es de 2.000€/mes y creciendo
- A veces la API de OpenAI está lenta o caída y tu aplicación falla

Con LocalAI: instalas el servicio en un servidor interno, descargas un modelo open source (Llama 3, Mistral, Qwen...), apuntas tu aplicación a \`http://servidor-interno:8080\` en vez de \`api.openai.com\`, y resuelves los cuatro problemas de golpe.

## Todo lo que puede hacer

### Modelos de lenguaje (LLMs)
Ejecuta cualquier modelo en formato GGUF (el estándar para modelos optimizados): Llama 3, Mistral, Phi, DeepSeek, Qwen, Gemma... Soporta chat completions, text completions, function calling, JSON mode, y streaming.

### Generación de imágenes
Ejecuta Stable Diffusion y SDXL localmente. Genera imágenes a partir de texto con la misma API que DALL-E (\`/v1/images/generations\`).

### Text-to-Speech (TTS)
Convierte texto en audio con voces naturales. Compatible con la API de OpenAI TTS. Soporta múltiples idiomas y voces.

### Speech-to-Text (STT)
Transcribe audio a texto usando modelos tipo Whisper. Compatible con la API de OpenAI Whisper (\`/v1/audio/transcriptions\`).

### Embeddings
Vectoriza texto para búsqueda semántica y RAG. Compatible con la API de OpenAI Embeddings (\`/v1/embeddings\`).

### Visión (multimodal)
Modelos que entienden imágenes: LLaVA, BakLLaVA, etc. Envía una imagen con un prompt y obtén una descripción o respuesta sobre ella.

## ¿Necesito GPU?

**No obligatoriamente.** LocalAI usa llama.cpp por debajo, que está optimizado para CPU. Los resultados:

| Modelo | CPU (16 cores) | GPU (RTX 3060) |
|---|---|---|
| 7B parámetros | ~10-15 tokens/s | ~60-80 tokens/s |
| 13B parámetros | ~5-8 tokens/s | ~30-40 tokens/s |
| 70B parámetros | ~1-2 tokens/s | ~10-15 tokens/s |

Para un chatbot interno que responde preguntas de documentos (donde no necesitas respuestas instantáneas), 10-15 tokens/segundo en CPU con un modelo de 7B es más que suficiente. Para aplicaciones que necesitan respuestas rápidas o procesan mucho volumen, GPU es recomendable.

## LocalAI vs Ollama

La comparación más habitual:

| | Ollama | LocalAI |
|---|---|---|
| Facilidad de uso | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Tipos de modelo | Solo LLMs | LLMs + imágenes + audio + embeddings |
| Compatibilidad API OpenAI | Parcial | Casi completa |
| Function calling | Básico | Avanzado |
| Modelos propios | Formato propio | GGUF estándar |
| Rendimiento LLM | Excelente | Excelente |

**Mi recomendación**: si solo necesitas chatear con un LLM local, usa Ollama — es más simple. Si necesitas reemplazar múltiples APIs de OpenAI (texto + imágenes + audio + embeddings) con una sola solución local, usa LocalAI.

## Instalación

\`\`\`bash
docker run -p 8080:8080 --name local-ai localai/localai:latest-cpu
\`\`\`

Para GPU NVIDIA:
\`\`\`bash
docker run --gpus all -p 8080:8080 localai/localai:latest-gpu-nvidia-cuda-12
\`\`\`

Luego descargas los modelos que quieras y ya tienes tu propia API de IA corriendo en local.`
  },
  {
    source_id: "janhq/jan",
    summary_es: `Jan es probablemente la forma más fácil de tener un ChatGPT privado funcionando en tu ordenador. Sin cuentas, sin internet, sin suscripciones, sin que ninguna empresa lea tus conversaciones. Descargas la app, eliges un modelo, y chateas. Así de simple.

## La experiencia de uso

La primera vez que abres Jan, te recibe una interfaz que es prácticamente una copia de ChatGPT — y eso es exactamente lo que quieres. La barra de chat está abajo, las conversaciones en el lateral izquierdo, y la respuesta de la IA aparece con el mismo formato de markdown que conoces.

La diferencia es lo que pasa por debajo: **todo corre en tu ordenador**. El modelo de IA está descargado en tu disco duro, el procesamiento se hace con tu CPU o GPU, y las conversaciones se guardan como archivos locales que puedes leer con cualquier editor de texto.

### Descargar un modelo
Jan tiene un "Model Hub" integrado. Haces clic en "Explore", ves una lista de modelos populares con su tamaño y requisitos, y le das a "Download". En unos minutos tienes el modelo listo.

Modelos recomendados para empezar:
- **Llama 3.1 8B** (~5GB): el mejor equilibrio calidad/velocidad. Para la mayoría de personas, es suficiente
- **Mistral 7B** (~4GB): rápido y bueno para instrucciones y código
- **Phi-3 Mini** (~2GB): si tienes poca RAM, este modelo pequeño funciona sorprendentemente bien
- **DeepSeek Coder** (~4GB): especializado en programación
- **Qwen 2.5 7B** (~4GB): excelente en español

### Chatear
Seleccionas el modelo, escribes tu mensaje, y la IA responde. Puedes:
- Crear múltiples conversaciones separadas por tema
- Cambiar de modelo a mitad de conversación
- Ajustar temperatura y otros parámetros
- Copiar respuestas con formato markdown

## Funcionalidades avanzadas

### RAG básico (documentos)
Puedes adjuntar documentos a una conversación y preguntar sobre ellos. Subes un PDF de un contrato y preguntas "¿Cuáles son las cláusulas de penalización?". El modelo lee el documento y responde basándose en su contenido.

### API local compatible con OpenAI
Jan expone una API local en \`localhost:1337\` compatible con el formato de OpenAI. Esto significa que cualquier aplicación diseñada para OpenAI (Cursor, Continue, LangChain, etc.) puede conectarse a Jan cambiando la URL. Tu editor de código con IA, funcionando 100% en local.

### Extensiones
Jan tiene un sistema de extensiones que permite añadir funcionalidades. La comunidad ha creado extensiones para conectar con modelos remotos (OpenAI, Anthropic), añadir TTS (text-to-speech), y más.

### Importar modelos
Si ya tienes modelos GGUF descargados (de HuggingFace u otra fuente), puedes importarlos directamente a Jan sin volver a descargar nada.

## Para quién es perfecto

### Profesionales con datos sensibles
Un abogado que quiere usar IA para revisar contratos pero no puede enviar documentos de clientes a OpenAI. Un médico que quiere resumir historiales pero no puede compartir datos de pacientes con servicios en la nube. Un contable que quiere analizar números pero los datos son confidenciales. Con Jan, nada sale de su ordenador.

### Personas preocupadas por la privacidad
Si te incomoda que OpenAI entrene sus modelos con tus conversaciones, o que Google lea tus chats con Gemini, Jan es la alternativa. Cero telemetría, cero envío de datos. Puedes desconectar el WiFi y sigue funcionando.

### Viajeros y personas con conexión inestable
En un avión, en una zona rural, en un tren con WiFi malo: Jan funciona perfectamente sin internet. Es tu asistente de IA portátil.

### Desarrolladores experimentando con modelos
Quieres probar Llama vs Mistral vs Phi para tu proyecto. Con Jan descargas los tres, los pruebas con los mismos prompts, y comparas resultados. Sin pagar tokens, sin rate limits.

## Calidad vs ChatGPT: seamos honestos

GPT-4 (el modelo detrás de ChatGPT Plus) sigue siendo superior a cualquier modelo local para la mayoría de tareas complejas. Pero para tareas cotidianas — escribir emails, resumir textos, responder preguntas, generar ideas, ayudar con código — modelos como Llama 3.1 70B o Qwen 2.5 72B dan resultados muy competitivos. Y con modelos más pequeños (7-8B), la calidad es buena para el 70% de los usos diarios.

La pregunta no es "¿es tan bueno como GPT-4?" sino "¿es suficientemente bueno para lo que necesito, teniendo en cuenta que es gratis, privado e ilimitado?". Para muchas personas, la respuesta es sí.

## Requisitos

- **Mínimo**: 8GB RAM, cualquier CPU moderna → modelos de 1-3B parámetros
- **Recomendado**: 16GB RAM → modelos de 7-8B parámetros con buena velocidad
- **Ideal**: 32GB RAM y/o GPU dedicada → modelos de 13-70B parámetros

Disponible para **Windows, Mac y Linux**. Los Mac con Apple Silicon (M1/M2/M3/M4) funcionan especialmente bien gracias al Neural Engine.`
  },
  {
    source_id: "twentyhq/twenty",
    summary_es: `Twenty es lo que pasa cuando un equipo de gente que ha sufrido Salesforce decide construir un CRM desde cero, sin la deuda técnica de 20 años, sin la complejidad absurda y sin el precio abusivo. El resultado es un CRM open source moderno, bonito y funcional que puede reemplazar a Salesforce para la mayoría de empresas.

## El elefante en la habitación: Salesforce

Salesforce domina el mercado de CRM con un ~23% de cuota global. Y todo el mundo lo odia. Es caro (25-300€/usuario/mes según el plan), lento, complejo de configurar (hay una industria entera de "consultores Salesforce certificados"), y la interfaz parece diseñada para maximizar el sufrimiento del usuario.

¿Por qué lo sigue usando todo el mundo? Porque migrar es un dolor. Y porque "nadie fue despedido por elegir Salesforce". Pero para una empresa que empieza de cero, o una PYME que quiere dejar de pagar 500€/mes por algo que le frustra, Twenty es una alternativa real.

## Qué ofrece

### Gestión de contactos y empresas
La base de cualquier CRM. Cada contacto tiene nombre, email, teléfono, empresa, cargo, notas, y tantos campos personalizados como necesites. Cada empresa tiene sus datos, contactos asociados, historial de interacciones, y oportunidades de venta vinculadas.

La **búsqueda es excelente**: escribe el nombre de un contacto y lo encuentras al instante, con preview de su información sin tener que abrir la ficha completa.

### Pipeline de ventas
El pipeline visual es donde gestionas tus oportunidades de negocio. Cada deal es una tarjeta que vas moviendo entre columnas: Prospecto → Contactado → Propuesta enviada → Negociación → Ganado/Perdido. Arrastras las tarjetas con el ratón, ves el valor total de cada etapa, y tienes una visión clara de cuánto dinero hay en juego en cada fase.

### Timeline de actividades
Cada contacto y empresa tiene un timeline cronológico con todas las interacciones: emails enviados, llamadas registradas, notas añadidas, tareas completadas, cambios de estado en deals. Es la "memoria" de tu relación con cada cliente.

### Email integrado
Conecta tu cuenta de correo (Gmail, Outlook, SMTP) y los emails con clientes se registran automáticamente en su ficha. No necesitas ir a "registrar" manualmente cada interacción — Twenty lo hace solo.

### Tareas y recordatorios
"Llamar a este cliente el jueves". "Enviar propuesta antes del viernes". Las tareas se crean vinculadas a contactos o deals, con fechas y recordatorios. Un mini sistema de productividad integrado en el CRM.

### Campos personalizados
Cada negocio es diferente. Una inmobiliaria necesita campos como "zona de interés" y "presupuesto". Una agencia de marketing necesita "tipo de servicio" y "presupuesto mensual". Con Twenty, creas los campos que tu negocio necesita sin limitación.

### API GraphQL
Para desarrolladores, Twenty expone una API GraphQL completa. Puedes integrar el CRM con tu web (que los leads del formulario de contacto se creen automáticamente), con tu herramienta de facturación, con tu sistema de email marketing, o con cualquier otra herramienta de tu stack.

## La interfaz: esto no parece open source

Una de las cosas que más sorprende de Twenty es el nivel de diseño. No es un proyecto open source con interfaz amateur. Tiene:
- Animaciones suaves en cada interacción
- Diseño consistente y moderno
- Modo oscuro cuidado
- Atajos de teclado para todo (\`Cmd+K\` para búsqueda global)
- Loading states elegantes, no spinners genéricos

Parece un producto SaaS premium de 50€/usuario/mes. Y es gratis.

## Para quién tiene sentido

**Startups y PYMEs**: necesitas un CRM pero no quieres pagar Salesforce ni quedar atrapado en HubSpot. Twenty te da todo lo esencial gratis, y si necesitas más adelante, tienes el código para adaptarlo.

**Freelancers y consultores**: gestionar tus clientes, propuestas y seguimientos en una herramienta profesional sin coste.

**Equipos de ventas pequeños (2-10 personas)**: pipeline visual, seguimiento de deals, historial de interacciones. Lo que necesitas, sin la complejidad de Jira.

**Empresas con datos sensibles**: self-hosting para que los datos de tus clientes nunca salgan de tu infraestructura.

## Instalación

**Docker (self-hosting):**
\`\`\`bash
git clone https://github.com/twentyhq/twenty.git
cd twenty
make docker-compose-up
\`\`\`

**Cloud gestionado:** también ofrecen una versión cloud si no quieres gestionar infraestructura.

La migración desde otros CRMs es posible vía importación CSV. No tienen importador directo de Salesforce todavía, pero la comunidad está trabajando en ello.`
  },
  {
    source_id: "browserbase/stagehand",
    summary_es: `Stagehand es un framework de automatización web que usa inteligencia artificial para entender las páginas como un humano, en vez de depender de selectores CSS que se rompen cada vez que la web cambia. Le dices en lenguaje natural qué quieres hacer y la IA lo ejecuta.

Si alguna vez has mantenido un scraper o un test end-to-end, conoces el dolor: pasas más tiempo arreglando selectores rotos que usando los datos extraídos. Stagehand quiere acabar con ese ciclo.

## El problema del scraping/testing tradicional

Un scraper típico se ve así:

\`\`\`javascript
// Esto se rompe cada semana
await page.click('#search-form > div.input-wrapper > button.submit-btn');
await page.waitForSelector('.results-container > .product-card:first-child .price');
const price = await page.$eval('.results-container > .product-card:first-child .price', el => el.textContent);
\`\`\`

¿Qué pasa cuando el equipo de la web cambia \`.submit-btn\` a \`.search-submit\`? ¿O cuando mueven \`.price\` dentro de otro div? Se rompe. Y tú tienes que abrir el inspector, encontrar el nuevo selector, actualizarlo, probar que funciona, y rezar para que no lo cambien de nuevo el mes que viene.

Con Stagehand:

\`\`\`javascript
await stagehand.act("haz clic en el botón de buscar");
const data = await stagehand.extract("el precio del primer producto");
\`\`\`

Este código funciona hoy, mañana, y dentro de 6 meses. Porque la IA entiende qué es un "botón de buscar" independientemente de su selector CSS.

## Las tres funciones clave

### \`act(instruction)\` — Hacer algo
Le dices qué hacer en lenguaje natural y lo hace:

\`\`\`javascript
await stagehand.act("escribe 'auriculares bluetooth' en el buscador");
await stagehand.act("haz clic en el primer resultado");
await stagehand.act("añade al carrito");
await stagehand.act("ve al carrito de compra");
\`\`\`

Stagehand ve la página, identifica el elemento que corresponde a tu instrucción, y ejecuta la acción.

### \`extract(instruction)\` — Sacar datos
Le dices qué datos quieres y los devuelve estructurados:

\`\`\`javascript
const products = await stagehand.extract(
  "una lista de los primeros 5 productos con nombre, precio y valoración"
);
// Devuelve: [{ name: "Sony WH-1000XM5", price: "279€", rating: "4.7" }, ...]
\`\`\`

No necesitas definir de antemano dónde está cada dato en el HTML. La IA lo encuentra por ti.

### \`observe(instruction)\` — Observar el estado
Pregúntale sobre la página actual:

\`\`\`javascript
const hasError = await stagehand.observe("¿hay algún mensaje de error en la página?");
const isLoggedIn = await stagehand.observe("¿el usuario está logueado?");
const itemCount = await stagehand.observe("¿cuántos productos hay en el carrito?");
\`\`\`

## Un caso de uso completo: monitorizar precios

\`\`\`javascript
import { Stagehand } from "@browserbase/stagehand";

const stagehand = new Stagehand({ modelName: "gpt-4o" });
await stagehand.init();

// Ir a Amazon
await stagehand.goto("https://amazon.es");

// Buscar el producto
await stagehand.act("busca 'MacBook Air M3'");

// Extraer precios
const prices = await stagehand.extract(
  "los primeros 3 resultados con su nombre exacto, precio y si tiene envío Prime"
);

console.log(prices);
// [
//   { name: "Apple MacBook Air 2024 M3...", price: "1.199€", prime: true },
//   { name: "Apple MacBook Air 13 pulgadas...", price: "1.149€", prime: true },
//   ...
// ]

await stagehand.close();
\`\`\`

Ese script funciona sin que tú sepas nada sobre la estructura HTML de Amazon. Y seguirá funcionando cuando Amazon cambie su diseño.

## Construido sobre Playwright

Stagehand no reinventa la rueda — usa Playwright por debajo. Esto significa que tienes acceso a toda su potencia:

- **Screenshots y grabación de vídeo** de las sesiones
- **Múltiples navegadores**: Chromium, Firefox, WebKit
- **Modo headless**: ejecución sin ventana visible (para servidores)
- **Network interception**: interceptar y modificar peticiones HTTP
- **Geolocalización y viewport**: simular dispositivos y ubicaciones

Stagehand añade la capa de IA encima de Playwright, pero puedes combinar ambos en el mismo script.

## Limitaciones reales

- **Coste por tokens**: cada \`act()\`, \`extract()\` y \`observe()\` consume tokens del LLM. Con GPT-4o, un scraping de 10 páginas puede costar 0.10-0.50€ en tokens
- **Velocidad**: más lento que Playwright puro porque cada acción requiere una llamada al LLM (1-3 segundos extra por paso)
- **No es determinista**: la IA puede interpretar de forma diferente la misma instrucción en diferentes ejecuciones
- **CAPTCHAs avanzados**: puede con los simples pero no con reCAPTCHA v3 o hCaptcha complejo

## Para quién tiene más sentido

Stagehand brilla cuando la **resiliencia** es más importante que la **velocidad**. Si necesitas un scraper que funcione sin mantenimiento durante meses, Stagehand. Si necesitas procesar 10.000 páginas por minuto, Playwright puro.

## Instalación

\`\`\`bash
npm install @browserbase/stagehand
\`\`\`

Necesitas una API key de OpenAI o Anthropic para el modelo de IA. La documentación tiene ejemplos para cada caso de uso.`
  },
  {
    source_id: "khoj-ai/khoj",
    summary_es: `Khoj es tu segundo cerebro potenciado con inteligencia artificial. Conectas tus documentos, notas, emails y archivos, y luego le preguntas cualquier cosa en lenguaje natural. "¿Qué decía aquel contrato sobre las penalizaciones?" "¿Cuándo es la reunión que mencionó Laura en su email?" "Resume todo lo que he escrito sobre el proyecto X". Khoj busca en toda tu información personal y te responde con precisión, citando las fuentes.

## El problema real que resuelve

Tu información está repartida en docenas de sitios:

- Notas en Obsidian o Notion
- Documentos en Google Drive
- Emails en Gmail
- PDFs en carpetas del ordenador
- Marcadores en el navegador
- Mensajes en Slack
- Repos en GitHub

Cuando necesitas encontrar algo específico, la búsqueda de Google no sirve (es tu información privada), la búsqueda de cada app es limitada (solo busca dentro de ella), y tu memoria es falible. Pierdes 10-30 minutos buscando algo que sabes que "está por ahí en algún sitio".

Khoj centraliza todo. Indexa todas esas fuentes, las entiende semánticamente (no solo busca palabras exactas), y te da respuestas contextualizadas cuando preguntas.

## Cómo funciona paso a paso

### 1. Conectas tus fuentes de información
Khoj se integra con:
- **Obsidian**: plugin nativo que indexa todas tus notas
- **Archivos locales**: PDFs, documentos Word, Markdown, texto plano de cualquier carpeta
- **Gmail**: indexa tus emails (solo los lee, no los modifica)
- **Google Drive**: documentos y hojas de cálculo
- **GitHub**: repos, issues y documentación
- **Páginas web**: dale URLs y las indexa
- **Notion**: tus páginas y bases de datos (en desarrollo)

### 2. Khoj indexa y vectoriza
Todo tu contenido se procesa, se divide en fragmentos, se convierte en vectores semánticos y se almacena. Este proceso ocurre automáticamente y se actualiza cuando tus archivos cambian.

### 3. Preguntas en lenguaje natural
Abres el chat de Khoj (web, móvil o integrado en Obsidian) y preguntas lo que quieras:

**Consultas de hechos:** "¿Cuál era el presupuesto que acordamos para el proyecto de marketing?"

**Síntesis:** "Resume todas mis notas de reuniones de la última semana"

**Búsqueda temporal:** "¿Qué emails recibí de Carlos en marzo sobre la propuesta?"

**Análisis:** "¿Cuáles son los temas recurrentes en mis notas de los últimos 3 meses?"

### 4. Respuestas con fuentes
Khoj no solo responde — te dice exactamente de dónde sacó la información. "Según tu nota del 15 de marzo titulada 'Reunión con cliente X', el presupuesto acordado fue de 15.000€ [enlace a la nota]".

## Funcionalidades avanzadas que lo hacen potente

### Búsqueda en internet
Si Khoj no encuentra la respuesta en tus datos personales, puede buscar en internet. "¿Cuál es el precio actual de Bitcoin?" — Khoj busca en la web y te responde con datos actuales.

### Agentes personalizados
Puedes crear asistentes especializados:
- **Agente legal**: entrenado con tus contratos y normativas, responde preguntas legales sobre tus documentos
- **Agente de investigación**: busca en tus papers y notas académicas
- **Agente financiero**: analiza tus hojas de cálculo y presupuestos

### Automatizaciones programadas
"Avísame si mañana hay previsión de lluvia y tengo alguna reunión fuera de la oficina" — Khoj puede ejecutar tareas programadas que combinan tus datos (calendario) con información externa (tiempo).

### Chat con imágenes
Puedes enviar capturas de pantalla o fotos y Khoj las analiza. "¿Qué dice este recibo?" o "Organiza la información de esta captura en una tabla".

### API para integraciones
Khoj expone una API REST que puedes usar para integrarlo en tus propios flujos de trabajo. Crea un shortcut de iOS que pregunte a Khoj, integra Khoj en tu script de Python, o conéctalo a n8n.

## Self-hosting vs cloud

**Khoj Cloud (khoj.dev):**
- Plan gratuito con límites de consultas
- Planes de pago para uso intensivo
- No necesitas gestionar infraestructura

**Self-hosting:**
- Gratis sin límites
- Tus datos nunca salen de tu servidor
- Requiere un servidor con al menos 4GB de RAM
- Puede usar modelos locales (Ollama) o APIs de OpenAI/Anthropic

## Para quién es especialmente valioso

**Investigadores y académicos:** tienen cientos de papers, notas de laboratorio y borradores. Khoj los convierte en una base de conocimiento consultable. "¿Qué papers he leído que mencionan el método X?"

**Profesionales del conocimiento:** consultores, abogados, analistas — cualquiera cuyo trabajo depende de encontrar información en montañas de documentos.

**Personas con Obsidian/PKM:** si ya tienes un sistema de notas personales (Personal Knowledge Management), Khoj le añade una capa de IA que lo convierte en algo exponencialmente más útil.

**Equipos pequeños:** montas una instancia compartida y todos pueden consultar la documentación común, los procesos internos y las notas de reuniones.

## La diferencia con Notion AI, Mem, etc.

Notion AI solo busca dentro de Notion. Mem solo dentro de Mem. Khoj busca en **todo**: tus archivos locales, tu email, tu Obsidian, tu Drive, y la web. Y puedes self-hostearlo para que ninguna empresa tenga acceso a tu información personal.

## Instalación

\`\`\`bash
pip install khoj
khoj --anonymous-mode
\`\`\`

O con Docker:
\`\`\`bash
docker run -p 42110:42110 ghcr.io/khoj-ai/khoj:latest
\`\`\`

La primera vez te guía para conectar tus fuentes de datos. En 15 minutos tienes tu segundo cerebro funcionando.`
  },
];

async function main() {
  console.log("Actualizando contenido extendido para proyectos 11-20...\n");

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

  console.log("\n✅ Lote 11-20 actualizado");
  await sql.end();
}

main();

import postgres from "postgres";
import https from "https";
import fs from "fs";
import path from "path";

const DB_URL = "postgres://offradar:offradar_2026_prod@138.199.201.46:5444/offradar";
const GEMINI_KEY = "AIzaSyDeJCd9ojfJ5pPMcDfxPXewKvbAsYRbEIk";
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
  {
    source: "github", source_id: "google/zx", url: "https://github.com/google/zx",
    name: "zx", stars: 45325, language: "JavaScript", author: "google", category_id: 2,
    difficulty: "facil", interest_score: 86, is_oss_alternative: false, alternative_to: null,
    tags: ["scripts", "bash", "node", "cli", "automatización"],
    seo_slug: "zx-scripts-bash-en-javascript",
    seo_title: "zx: Escribe scripts de sistema en JavaScript en vez de Bash",
    seo_description: "zx de Google permite escribir scripts de sistema en JavaScript con la facilidad de Bash. Combina lo mejor de ambos mundos. 45k estrellas.",
    summary_es: `zx es una herramienta de Google que te permite escribir scripts de sistema en JavaScript (o TypeScript) en vez de Bash. Si alguna vez has sufrido con la sintaxis de Bash para algo que no sea trivial — condicionales, arrays, manipulación de strings, manejo de errores — zx es la liberación.

## El problema con Bash

Bash está bien para comandos simples (\`ls | grep .txt\`), pero cuando necesitas lógica real — leer un JSON, iterar sobre un array, hacer peticiones HTTP, manejar errores con gracia — se convierte en un infierno de \`$?\`, \`[[ ]]\`, \`IFS\`, y trucos arcanos que hay que googlear cada vez.

## La solución: JavaScript + comandos de sistema

\`\`\`javascript
#!/usr/bin/env zx

// Combina JavaScript con comandos de terminal
const branch = await $\`git branch --show-current\`
console.log(\`Rama actual: \${branch}\`)

// Lógica real con JavaScript
const files = (await $\`find src -name "*.ts"\`).stdout.split('\\n').filter(Boolean)
console.log(\`Encontrados \${files.length} archivos TypeScript\`)

// Peticiones HTTP nativas
const response = await fetch('https://api.github.com/repos/google/zx')
const data = await response.json()
console.log(\`Stars: \${data.stargazers_count}\`)

// Preguntas interactivas
const name = await question('¿Cómo te llamas? ')

// Manejo de errores real
try {
  await $\`docker compose up -d\`
} catch (e) {
  console.error('Docker falló:', e.stderr)
  process.exit(1)
}
\`\`\`

## Funcionalidades incluidas

- **\`$\\\`command\\\`\`**: ejecuta cualquier comando de terminal y captura stdout/stderr
- **\`fetch()\`**: peticiones HTTP nativas
- **\`question()\`**: input interactivo del usuario
- **\`cd()\`**: cambiar de directorio
- **\`fs\`**: sistema de archivos (leer, escribir, copiar archivos)
- **\`path\`**: manipulación de rutas
- **\`chalk\`**: colores en la terminal
- **\`glob()\`**: buscar archivos por patrón
- **\`sleep()\`**: esperar X milisegundos
- **TypeScript nativo**: sin configuración extra

## Casos de uso

- **Scripts de deploy**: en vez de un deploy.sh críptico, un deploy.mjs legible
- **Automatización de tareas**: backups, limpieza, generación de archivos
- **Scripts de CI/CD**: lógica compleja que en Bash sería un dolor
- **Herramientas de desarrollo**: scripts personalizados para tu workflow

## Instalación

\`\`\`bash
npm install -g zx
# o ejecutar directamente
npx zx script.mjs
\`\`\``,
    image_prompt: "JavaScript code replacing Bash scripts, terminal showing JS syntax executing system commands, Google logo subtly, shell commands in JS template literals, purple code elements, dark scripting background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "WerWolv/ImHex", url: "https://github.com/WerWolv/ImHex",
    name: "ImHex", stars: 53027, language: "C++", author: "WerWolv", category_id: 5,
    difficulty: "medio", interest_score: 84, is_oss_alternative: false, alternative_to: null,
    tags: ["hex-editor", "reverse-engineering", "seguridad", "análisis", "binarios"],
    seo_slug: "imhex-editor-hexadecimal-moderno",
    seo_title: "ImHex: El editor hexadecimal moderno para reverse engineering y análisis",
    seo_description: "ImHex es un editor hexadecimal con pattern language, visualizaciones de datos, bookmarks y temas. Para análisis de binarios y reverse engineering.",
    summary_es: `ImHex es un editor hexadecimal moderno diseñado para reverse engineers, analistas de malware, y cualquiera que necesite entender datos binarios. A diferencia de los editores hex clásicos que solo muestran bytes crudos, ImHex te ayuda a **entender** qué significan esos bytes.

## Para qué se usa un editor hexadecimal

Cuando necesitas analizar un archivo a nivel de bytes — un ejecutable, un firmware, una imagen corrupta, un formato de archivo propietario, o un protocolo de red desconocido — necesitas ver los datos crudos y darles estructura. ImHex hace esto de forma visual e inteligente.

## Funcionalidades que lo hacen especial

### Pattern Language
La killer feature. ImHex tiene su propio lenguaje de patrones que te permite definir la estructura de un archivo binario y visualizarla:

\`\`\`
struct PNGHeader {
    u32 magic;
    u32 width;
    u32 height;
    u8 bitDepth;
    u8 colorType;
};

PNGHeader header @ 0x00;
\`\`\`

ImHex parsea el archivo usando tu definición y te muestra los valores con nombres, colores y estructura — en vez de una ristra de bytes sin sentido.

### Otras funcionalidades
- **Visualizaciones**: representa los datos como gráficos, imágenes, texto, valores numéricos
- **Bookmarks**: marca regiones del archivo para referencia
- **Data processor**: nodos visuales para transformar y analizar datos
- **Hash calculator**: calcula hashes de regiones seleccionadas
- **Diff**: compara dos archivos byte a byte
- **String finder**: encuentra cadenas de texto en binarios
- **Yara rules**: busca patrones de malware
- **Temas**: interfaz personalizable con múltiples temas

## Para quién es

- **Reverse engineers**: analizar ejecutables, firmware, protocolos
- **Analistas de malware**: examinar binarios sospechosos
- **Desarrolladores de games**: analizar formatos de archivo de juegos
- **Forense digital**: examinar evidencias digitales a nivel de bytes
- **Curiosos**: entender cómo se estructuran los archivos por dentro

## Instalación

Descarga desde imhex.werwolv.net para Windows, macOS y Linux. También disponible en Flatpak.`,
    image_prompt: "Hexadecimal editor with colored byte patterns, structured data visualization, pattern language definitions, binary analysis interface, purple hex values, dark reverse engineering workspace",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "OpenBB-finance/OpenBB", url: "https://github.com/OpenBB-finance/OpenBB",
    name: "OpenBB", stars: 65067, language: "Python", author: "OpenBB-finance", category_id: 2,
    difficulty: "medio", interest_score: 88, is_oss_alternative: true, alternative_to: "Bloomberg Terminal",
    tags: ["finanzas", "datos", "análisis", "trading", "open-source"],
    seo_slug: "openbb-terminal-financiero-open-source",
    seo_title: "OpenBB: Terminal financiero open source — el Bloomberg de los mortales",
    seo_description: "OpenBB es una plataforma de análisis financiero open source. Acciones, crypto, ETFs, macroeconomía. Alternativa a Bloomberg Terminal.",
    summary_es: `OpenBB es una plataforma de datos financieros open source que quiere democratizar el acceso a información financiera de calidad. Un Bloomberg Terminal cuesta 24.000$/año. OpenBB es gratuito y ofrece datos de acciones, criptomonedas, ETFs, forex, opciones, economía y más, con herramientas de análisis y visualización.

## Qué es un Bloomberg Terminal (y por qué es importante)

Bloomberg Terminal es la herramienta que usan los profesionales de finanzas — traders, analistas, gestores de fondos — para acceder a datos de mercado en tiempo real, noticias, y herramientas de análisis. Es el estándar del sector. Y cuesta 24.000 dólares al año por usuario.

OpenBB quiere que esa misma información esté disponible para todo el mundo.

## Qué puedes hacer

### Análisis de acciones
- Datos históricos de precios, volumen, dividendos
- Análisis técnico (medias móviles, RSI, MACD, Bollinger Bands)
- Análisis fundamental (P/E ratio, revenue, earnings, balance sheet)
- Comparativa entre empresas del mismo sector
- Estimaciones de analistas y price targets

### Criptomonedas
- Precios en tiempo real de miles de tokens
- Datos on-chain (transacciones, direcciones activas, TVL de DeFi)
- Sentimiento de mercado
- Comparativas y correlaciones

### Macroeconomía
- GDP, inflación, desempleo, tipos de interés por país
- Datos del BCE, Fed, y otros bancos centrales
- Indicadores adelantados

### ETFs y fondos
- Holdings, performance, ratios de gasto
- Comparativas entre fondos

## Plataforma de datos y agentes de IA

OpenBB no es solo una terminal de texto — se ha convertido en una plataforma de datos financieros con API que permite construir agentes de IA especializados en finanzas. Puedes conectar un LLM a los datos de OpenBB y preguntarle en lenguaje natural: "¿Cuáles son las empresas del S&P 500 con menor P/E ratio que han subido más de un 20% este año?"

## Instalación

\`\`\`bash
pip install openbb
\`\`\`

O usa la interfaz web OpenBB Platform que se instala con Docker.

## Importante

OpenBB es una herramienta de análisis, no un consejo de inversión. Los datos que proporciona son para investigación y análisis. Las decisiones de inversión son responsabilidad tuya.`,
    image_prompt: "Financial data terminal showing stock charts, candlestick patterns, market indicators, economic data dashboard, Bloomberg-style multi-panel interface, purple financial data elements, dark trading terminal background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "localstack/localstack", url: "https://github.com/localstack/localstack",
    name: "LocalStack", stars: 64836, language: "Python", author: "localstack", category_id: 2,
    difficulty: "medio", interest_score: 88, is_oss_alternative: true, alternative_to: "AWS Cloud (desarrollo)",
    tags: ["aws", "cloud", "desarrollo", "testing", "local"],
    seo_slug: "localstack-aws-en-local-para-desarrollo",
    seo_title: "LocalStack: Tu propio AWS corriendo en local para desarrollo y testing",
    seo_description: "LocalStack simula servicios de AWS en tu ordenador. S3, Lambda, DynamoDB, SQS... sin pagar ni un céntimo. Para desarrollo y tests.",
    summary_es: `LocalStack simula los servicios de AWS en tu ordenador local. S3, Lambda, DynamoDB, SQS, SNS, API Gateway, CloudFormation, IAM... los servicios de AWS más usados corriendo en tu máquina sin necesidad de una cuenta de AWS, sin costes, y sin latencia de red.

## El problema que resuelve

Desarrollar contra AWS es caro y lento:

- **Costes**: cada invocación de Lambda, cada request a S3, cada mensaje en SQS cuesta dinero. En desarrollo, donde pruebas cientos de veces, los costes se acumulan
- **Latencia**: cada petición viaja a internet y vuelve. En local es instantáneo
- **Compartir entornos**: en un equipo de 5 desarrolladores, cada uno necesita sus propios recursos de AWS, lo que complica la gestión
- **CI/CD**: los tests de integración que dependen de AWS son lentos y frágiles

LocalStack resuelve todo: tus servicios de AWS corren en Docker, en tu máquina, gratis.

## Servicios soportados

**Community (gratuito):**
- S3 (almacenamiento)
- SQS/SNS (colas de mensajes)
- DynamoDB (base de datos NoSQL)
- Lambda (funciones serverless)
- API Gateway
- CloudWatch Logs
- IAM (permisos)
- CloudFormation / SAM / CDK

**Pro (de pago):**
- RDS (bases de datos relacionales)
- ECS/EKS (contenedores)
- Cognito (autenticación)
- Step Functions
- Y muchos más

## Cómo funciona

\`\`\`bash
# Arrancar LocalStack
docker run -d -p 4566:4566 localstack/localstack

# Usar exactamente igual que AWS, pero apuntando a localhost
aws --endpoint-url=http://localhost:4566 s3 mb s3://mi-bucket
aws --endpoint-url=http://localhost:4566 s3 cp archivo.txt s3://mi-bucket/

# O configura el CLI para usar LocalStack por defecto
export AWS_ENDPOINT_URL=http://localhost:4566
aws s3 ls  # Ahora apunta a LocalStack automáticamente
\`\`\`

Tu código de aplicación no cambia — solo cambias la URL del endpoint de AWS.

## Para quién es

- **Desarrolladores que usan AWS**: desarrolla y prueba sin gastar dinero
- **Equipos**: cada dev tiene su propio "AWS" local
- **CI/CD**: tests de integración rápidos y reproducibles
- **Aprendizaje**: experimenta con servicios de AWS sin crear cuenta ni configurar nada

## Instalación

\`\`\`bash
docker run -d -p 4566:4566 localstack/localstack
\`\`\``,
    image_prompt: "AWS cloud services logos (S3, Lambda, DynamoDB) running inside a local Docker container on a laptop, cloud-to-local migration visualization, purple cloud elements, dark development environment background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "gradio-app/gradio", url: "https://github.com/gradio-app/gradio",
    name: "Gradio", stars: 42240, language: "Python", author: "gradio-app", category_id: 2,
    difficulty: "facil", interest_score: 88, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "demo", "python", "interfaz", "machine-learning"],
    seo_slug: "gradio-demos-ia-python-facil",
    seo_title: "Gradio: Crea demos interactivas de modelos de IA en 5 líneas de Python",
    seo_description: "Gradio genera interfaces web para modelos de ML con pocas líneas de Python. Upload de imágenes, chat, audio. Lo que usa Hugging Face. 42k estrellas.",
    summary_es: `Gradio es la forma más rápida de crear una interfaz web para tu modelo de machine learning. En 5 líneas de Python tienes una demo interactiva donde la gente puede probar tu modelo — subir una imagen, escribir texto, hablar al micrófono — y ver el resultado al instante. Es la herramienta que Hugging Face usa para todos sus Spaces.

## Ejemplo: demo de un clasificador de imágenes

\`\`\`python
import gradio as gr
from transformers import pipeline

classifier = pipeline("image-classification")

def classify(image):
    results = classifier(image)
    return {r["label"]: r["score"] for r in results}

demo = gr.Interface(fn=classify, inputs="image", outputs="label")
demo.launch()
\`\`\`

5 líneas de Python y tienes una web donde subes una foto y el modelo te dice qué hay en ella. Con una URL que puedes compartir con cualquiera.

## Componentes de interfaz

Gradio tiene componentes para todo tipo de entrada y salida de ML:

**Entradas:** texto, imagen, audio, vídeo, archivo, slider, checkbox, dropdown, chat
**Salidas:** texto, imagen, audio, gráfico, tabla, JSON, etiquetas, galería

## Casos de uso reales

- **Demos de modelos**: la forma estándar de presentar un modelo en un paper o blog
- **Hugging Face Spaces**: cada Space de HuggingFace es una app Gradio
- **Prototipos internos**: prueba un modelo con tu equipo antes de integrarlo en producción
- **Herramientas internas**: crea una interfaz para que tu equipo no-técnico use modelos de ML
- **Chatbots**: interfaz de chat para probar LLMs con streaming

## Gradio vs Streamlit

Ambos crean apps web con Python. La diferencia:
- **Gradio**: especializado en demos de ML, componentes de I/O, integrado con Hugging Face
- **Streamlit**: más general, mejor para dashboards de datos, más flexible en layout

Si tu objetivo es "quiero que la gente pruebe mi modelo", Gradio. Si tu objetivo es "quiero un dashboard de métricas", Streamlit.

## Instalación

\`\`\`bash
pip install gradio
\`\`\``,
    image_prompt: "Machine learning demo interface with image upload, text input, model output visualization, Hugging Face integration, interactive AI demo components, purple ML elements, dark AI demo background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "milvus-io/milvus", url: "https://github.com/milvus-io/milvus",
    name: "Milvus", stars: 43577, language: "Go", author: "milvus-io", category_id: 6,
    difficulty: "medio", interest_score: 87, is_oss_alternative: true, alternative_to: "Pinecone",
    tags: ["base-de-datos", "vectores", "ia", "búsqueda", "rag"],
    seo_slug: "milvus-base-datos-vectorial-ia",
    seo_title: "Milvus: Base de datos vectorial cloud-native para aplicaciones de IA",
    seo_description: "Milvus es una base de datos vectorial open source para búsqueda semántica, RAG y recomendaciones. Alternativa a Pinecone. 43k estrellas.",
    summary_es: `Milvus es una base de datos diseñada específicamente para almacenar y buscar vectores — los embeddings que generan los modelos de IA. Si estás construyendo una aplicación de RAG (chatbot que consulta documentos), búsqueda semántica, sistema de recomendaciones, o detección de duplicados, necesitas una base de datos vectorial. Y Milvus es la opción open source más madura.

## Qué es una base de datos vectorial (y por qué la necesitas)

Los modelos de IA no entienden texto — entienden vectores: arrays de números que representan el significado semántico de un texto, imagen o audio. Cuando conviertes "Cómo instalar Docker en Ubuntu" en un vector, ese vector está cercano a "Docker setup en Linux" pero lejos de "receta de paella".

Una base de datos vectorial almacena millones de estos vectores y permite buscar los más similares a una consulta en milisegundos. Esto es la base de:

- **RAG**: buscar los fragmentos de tus documentos más relevantes para una pregunta
- **Búsqueda semántica**: buscar por significado, no por palabras exactas
- **Recomendaciones**: "usuarios que compraron esto también compraron..."
- **Detección de duplicados**: encontrar contenido similar

## Milvus vs Pinecone

| | Milvus | Pinecone |
|---|---|---|
| Precio | Gratis (self-hosted) | Desde 70$/mes |
| Self-hosting | Sí | No |
| Rendimiento | Excelente | Excelente |
| Escalabilidad | Horizontal | Automática |
| Índices | HNSW, IVF, DiskANN, GPU | Serverless |
| Open source | Sí | No |

Para proyectos que empiezan, Pinecone es más fácil de configurar (es serverless). Para producción seria donde quieres control y no pagar por vector almacenado, Milvus.

## Ejemplo con RAG

\`\`\`python
from pymilvus import MilvusClient

client = MilvusClient("milvus.db")

# Crear colección
client.create_collection("documents", dimension=768)

# Insertar embeddings de tus documentos
client.insert("documents", [
    {"id": 1, "vector": embedding_1, "text": "Docker es una plataforma..."},
    {"id": 2, "vector": embedding_2, "text": "Kubernetes orquesta contenedores..."},
])

# Buscar documentos similares a una pregunta
results = client.search("documents", query_embedding, limit=5)
\`\`\`

## Instalación

\`\`\`bash
# Milvus Lite (embebido, para desarrollo)
pip install pymilvus

# Milvus standalone (Docker, para producción)
docker compose up -d
\`\`\``,
    image_prompt: "Vector database visualization with embedding space, similarity search arrows connecting similar vectors, high-dimensional data clusters, semantic search interface, purple vector elements, dark AI database background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "deepfakes/faceswap", url: "https://github.com/deepfakes/faceswap",
    name: "Faceswap", stars: 55106, language: "Python", author: "deepfakes", category_id: 1,
    difficulty: "dificil", interest_score: 83, is_oss_alternative: false, alternative_to: null,
    tags: ["deepfake", "ia", "vídeo", "face-swap", "machine-learning"],
    seo_slug: "faceswap-herramienta-deepfake-original",
    seo_title: "Faceswap: La herramienta de deepfake open source original",
    seo_description: "Faceswap es el software de face swap con deep learning original. Entrena modelos para intercambiar caras en vídeos. 55k estrellas.",
    summary_es: `Faceswap es la herramienta de deepfake open source original — el proyecto que popularizó el concepto de intercambio de caras con deep learning. A diferencia de Deep-Live-Cam (que funciona en tiempo real con una sola foto), Faceswap entrena un modelo personalizado con cientos de fotos de dos personas para producir resultados de altísima calidad.

## Cómo se diferencia de Deep-Live-Cam

| | Faceswap | Deep-Live-Cam |
|---|---|---|
| Enfoque | Entrenamiento de modelo personalizado | Una sola foto, tiempo real |
| Calidad | Muy alta (tras entrenamiento) | Buena (instantáneo) |
| Tiempo | Horas/días de entrenamiento | Instantáneo |
| Datos necesarios | 500-5000 fotos de cada persona | 1 sola foto |
| Uso principal | Post-producción de vídeo | Demos en vivo |

## El proceso

1. **Extracción**: Faceswap detecta y extrae las caras de los vídeos/fotos de las dos personas
2. **Entrenamiento**: entrena un autoencoder que aprende a reconstruir ambas caras
3. **Conversión**: aplica el modelo entrenado al vídeo objetivo, reemplazando una cara por otra
4. **Post-procesamiento**: ajuste de color, blending de bordes, corrección de iluminación

## Resultados

Con suficientes datos de entrenamiento y horas de GPU, Faceswap produce resultados que son genuinamente difíciles de distinguir del original. Los vídeos deepfake más convincentes que has visto probablemente se hicieron con esta herramienta o sus derivados.

## La conversación ética obligatoria

Faceswap incluye un disclaimer extenso y la comunidad tiene reglas estrictas:

- **NUNCA** crear contenido que suplante a alguien sin su consentimiento explícito
- **NUNCA** crear contenido íntimo falso
- **NUNCA** usar para fraude o desinformación
- El uso legítimo incluye: efectos especiales, entretenimiento, arte, investigación, educación

En muchos países europeos (incluido España), crear deepfakes de personas sin su consentimiento es un delito. Usa esta herramienta de forma responsable.

## Requisitos

- GPU NVIDIA con 6GB+ VRAM (recomendado 8-12GB)
- Cientos de fotos de alta calidad de las personas involucradas
- Horas (a veces días) de entrenamiento en GPU

## Instalación

Descarga desde faceswap.dev. Tiene un instalador gráfico para Windows, Mac y Linux que configura todo automáticamente.`,
    image_prompt: "Deep learning face transformation process, autoencoder architecture visualization, training progress, face extraction and conversion pipeline, purple neural network, dark AI processing background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "langflow-ai/langflow", url: "https://github.com/langflow-ai/langflow",
    name: "Langflow", stars: 146505, language: "Python", author: "langflow-ai", category_id: 1,
    difficulty: "facil", interest_score: 93, is_oss_alternative: false, alternative_to: null,
    tags: ["ia", "agentes", "workflow", "visual", "llm"],
    seo_slug: "langflow-agentes-ia-flujos-visuales",
    seo_title: "Langflow: Construye y despliega agentes de IA con flujos visuales",
    seo_description: "Langflow permite crear agentes de IA y workflows con un editor visual drag-and-drop. 146k estrellas. El builder de agentes más popular.",
    summary_es: `Langflow es una plataforma visual para construir y desplegar agentes de inteligencia artificial y workflows sin escribir código. Con 146.000 estrellas en GitHub, es el constructor de agentes de IA más popular del momento — y con razón: la interfaz es intuitiva, los componentes son potentes, y el resultado se puede desplegar directamente en producción.

## Qué lo diferencia de Flowise y Dify

Los tres permiten construir apps de IA visualmente, pero Langflow destaca en:

- **Escala**: es el más popular y activo (146k estrellas vs 51k de Flowise y 135k de Dify)
- **Componentes**: la biblioteca de componentes es más amplia y se actualiza más rápido
- **Multi-agente**: soporte nativo para sistemas donde varios agentes colaboran
- **Deployment**: genera una API lista para producción con un clic
- **Python nativo**: si necesitas código personalizado, se integra directamente con Python

## Cómo funciona

El editor visual tiene nodos que arrastras y conectas:

### Nodos de entrada
- **Chat Input**: recibe mensajes del usuario
- **File Upload**: acepta documentos para procesamiento
- **Webhook**: recibe datos de servicios externos

### Nodos de procesamiento
- **LLM**: OpenAI, Anthropic, Ollama, HuggingFace, Google, Groq...
- **RAG**: Document Loaders, Text Splitters, Vector Stores, Retrievers
- **Agentes**: agentes con herramientas que deciden qué acción tomar
- **Herramientas**: búsqueda web, ejecución de código, APIs, calculadora, SQL

### Nodos de salida
- **Chat Output**: respuesta al usuario
- **API endpoint**: resultado para tu aplicación
- **Webhook**: enviar datos a servicios externos

## Ejemplo: chatbot que consulta PDFs

1. Arrastra un nodo **File Loader** y subes tu PDF
2. Conectas un **Text Splitter** que divide el documento en chunks
3. Conectas un **Vector Store** (ChromaDB, Pinecone, Qdrant)
4. Añades un nodo **LLM** (Claude, GPT-4, Llama)
5. Conectas un **RAG Chain** que une busqueda y generación
6. Añades **Chat Input** y **Chat Output**

10 minutos de arrastrar y soltar = chatbot RAG funcional con API.

## Playground integrado

Langflow incluye un playground donde puedes probar tu flujo en tiempo real antes de desplegarlo. Escribes un mensaje, ves cómo cada nodo lo procesa, y verificas la respuesta. Ideal para depurar y ajustar prompts.

## Instalación

\`\`\`bash
pip install langflow
langflow run
\`\`\`

Se abre automáticamente en el navegador. También disponible como Docker para producción.`,
    image_prompt: "Visual AI agent builder with drag-and-drop nodes connected by data flow lines, LLM and RAG components, playground chat testing, purple workflow connections, dark AI builder background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "ClickHouse/ClickHouse", url: "https://github.com/ClickHouse/ClickHouse",
    name: "ClickHouse", stars: 46666, language: "C++", author: "ClickHouse", category_id: 6,
    difficulty: "medio", interest_score: 87, is_oss_alternative: true, alternative_to: "BigQuery / Redshift",
    tags: ["base-de-datos", "analytics", "olap", "big-data", "rendimiento"],
    seo_slug: "clickhouse-base-datos-analitica-rapida",
    seo_title: "ClickHouse: La base de datos analítica más rápida del mundo (open source)",
    seo_description: "ClickHouse procesa billones de filas en milisegundos. Base de datos columnar para analytics en tiempo real. Alternativa a BigQuery/Redshift.",
    summary_es: `ClickHouse es una base de datos columnar diseñada para consultas analíticas sobre cantidades masivas de datos — estamos hablando de billones de filas procesadas en milisegundos. Es la base de datos que usan Cloudflare (para analytics de tráfico), Uber (para análisis de viajes), y GitLab (para métricas de CI/CD) cuando necesitan velocidad extrema sobre datos masivos.

## Cuándo necesitas ClickHouse

PostgreSQL es excelente para datos operacionales (CRUD, transacciones). Pero cuando necesitas:

- Analizar 100 millones de logs de acceso agrupados por país, hora y endpoint
- Calcular métricas en tiempo real sobre un stream de eventos
- Hacer aggregations sobre billones de filas en menos de un segundo

...PostgreSQL se asfixia. ClickHouse está diseñado exactamente para eso.

## Por qué es tan rápido

### Almacenamiento columnar
En vez de guardar cada fila completa (como PostgreSQL), ClickHouse guarda cada columna por separado. Cuando haces \`SELECT AVG(price) FROM orders\`, solo lee la columna \`price\` — no toda la tabla. Para queries analíticas, esto es entre 10-100x más eficiente.

### Compresión extrema
Los datos columnar se comprimen mucho mejor que los row-based. Una tabla de 1TB en PostgreSQL puede ocupar 100-200GB en ClickHouse. Menos datos = lecturas más rápidas = queries más rápidas.

### Vectorización
Las operaciones se ejecutan en lotes de vectores, aprovechando al máximo las instrucciones SIMD de la CPU. Es como la diferencia entre procesar datos uno a uno y procesarlos 256 a la vez.

## Ejemplo

\`\`\`sql
-- Contar visitas por país en los últimos 7 días
-- sobre una tabla de 500 millones de filas
SELECT country, count() as visits
FROM page_views
WHERE timestamp > now() - INTERVAL 7 DAY
GROUP BY country
ORDER BY visits DESC
LIMIT 10

-- Resultado en 0.3 segundos. En PostgreSQL: 45+ segundos.
\`\`\`

## ClickHouse vs BigQuery vs Redshift

| | ClickHouse | BigQuery | Redshift |
|---|---|---|---|
| Precio | Gratis (self-hosted) | Por query (caro a escala) | Desde 180$/mes |
| Latencia | Milisegundos | Segundos | Segundos |
| Real-time | Sí | No (batch) | Limitado |
| Self-hosting | Sí | No | No |

## Para quién es

- **Empresas con muchos datos**: logs, eventos, métricas, time-series
- **Analytics en tiempo real**: dashboards que se actualizan al segundo
- **Data engineering**: procesar y agregar datos masivos
- **NO es para**: aplicaciones CRUD normales (usa PostgreSQL)

## Instalación

\`\`\`bash
# Docker
docker run -d -p 8123:8123 -p 9000:9000 clickhouse/clickhouse-server

# macOS
brew install clickhouse
\`\`\``,
    image_prompt: "Columnar database processing billions of rows, data compression visualization, lightning-fast query results, analytical dashboard with massive datasets, purple data elements, dark big data infrastructure background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "Kong/kong", url: "https://github.com/Kong/kong",
    name: "Kong", stars: 43088, language: "Lua", author: "Kong", category_id: 2,
    difficulty: "medio", interest_score: 86, is_oss_alternative: true, alternative_to: "AWS API Gateway",
    tags: ["api-gateway", "microservicios", "proxy", "devops", "cloud"],
    seo_slug: "kong-api-gateway-open-source",
    seo_title: "Kong: El API Gateway open source más popular para microservicios",
    seo_description: "Kong gestiona, asegura y monitoriza tus APIs. Rate limiting, auth, logging, transformaciones. Alternativa a AWS API Gateway. 43k estrellas.",
    summary_es: `Kong es un API Gateway que se sitúa entre tus clientes y tus servicios backend, gestionando todo el tráfico de APIs: autenticación, rate limiting, logging, transformaciones, balanceo de carga, y más. Es como un portero inteligente que controla quién entra, cuántas veces puede entrar, y registra cada entrada.

## Por qué necesitas un API Gateway

Si tienes una sola API simple, no lo necesitas. Pero cuando tienes:

- Múltiples servicios/microservicios que exponen APIs
- Clientes que necesitan autenticación y rate limiting
- Necesidad de logging centralizado y métricas
- Versiones diferentes de la misma API
- Necesidad de transformar requests/responses al vuelo

Un API Gateway centraliza toda esa lógica en un solo punto en vez de implementarla en cada servicio.

## Qué hace Kong

### Plugins (el poder de Kong)
Kong funciona con plugins que se activan por ruta, servicio o globalmente:

- **Autenticación**: API Key, JWT, OAuth2, Basic Auth, LDAP, OpenID Connect
- **Rate Limiting**: limita peticiones por IP, por usuario, por API key
- **Logging**: envía logs a Elasticsearch, Datadog, Splunk, stdout
- **Transformaciones**: modifica headers, body, query params al vuelo
- **CORS**: gestión centralizada de Cross-Origin
- **Cache**: cachea respuestas para reducir carga en backend
- **Seguridad**: IP restriction, bot detection, ACME (SSL automático)

### Ejemplo

\`\`\`bash
# Añadir un servicio
curl -X POST http://localhost:8001/services \\
  --data name=mi-api \\
  --data url=http://mi-backend:3000

# Añadir rate limiting
curl -X POST http://localhost:8001/services/mi-api/plugins \\
  --data name=rate-limiting \\
  --data config.minute=100

# Añadir autenticación por API key
curl -X POST http://localhost:8001/services/mi-api/plugins \\
  --data name=key-auth
\`\`\`

Ahora tu API tiene rate limiting de 100 requests/minuto y requiere API key para acceder. Sin cambiar una línea de código en tu backend.

## Kong vs AWS API Gateway

| | Kong | AWS API Gateway |
|---|---|---|
| Precio | Gratis (self-hosted) | Por request (~3.50$/millón) |
| Self-hosting | Sí | No |
| Plugins | 100+ | Limitados |
| Vendor lock-in | No | Sí (AWS) |
| Rendimiento | Excelente (OpenResty/Nginx) | Bueno |

## Para quién es

- **Equipos con microservicios**: un punto único para gestionar todas las APIs
- **Startups con API pública**: autenticación, rate limiting y documentación
- **Empresas que quieren salir de AWS**: alternativa self-hosted a API Gateway

## Instalación

\`\`\`bash
docker run -d --name kong -p 8000:8000 -p 8001:8001 kong:latest
\`\`\``,
    image_prompt: "API Gateway handling multiple service requests, authentication shield, rate limiting visualization, request/response flow through plugins, purple gateway elements, dark microservices architecture background",
    replicable_with_code: null,
  },
  {
    source: "github", source_id: "prisma/prisma", url: "https://github.com/prisma/prisma",
    name: "Prisma", stars: 45643, language: "TypeScript", author: "prisma", category_id: 2,
    difficulty: "facil", interest_score: 89, is_oss_alternative: false, alternative_to: null,
    tags: ["orm", "base-de-datos", "typescript", "backend", "node"],
    seo_slug: "prisma-orm-typescript-moderno",
    seo_title: "Prisma: El ORM de TypeScript que hace que las bases de datos no den miedo",
    seo_description: "Prisma es un ORM moderno para TypeScript/Node.js. Type-safe, migraciones automáticas, y queries intuitivas. PostgreSQL, MySQL, SQLite. 45k estrellas.",
    summary_es: `Prisma es un ORM (Object-Relational Mapping) para TypeScript y Node.js que hace que trabajar con bases de datos sea seguro, intuitivo y productivo. Define tu schema en un archivo declarativo, Prisma genera el cliente TypeScript con types automáticos, y cada query tiene autocompletado perfecto — es imposible escribir una query con un campo que no existe.

## Por qué Prisma ha ganado el mercado de ORMs en TypeScript

Los ORMs anteriores (Sequelize, TypeORM, Knex) tenían problemas:

- **Sequelize**: sintaxis verbose, types malos, documentación confusa
- **TypeORM**: types basados en decoradores, breaking changes frecuentes
- **Knex**: no es realmente un ORM, es un query builder

Prisma resolvió todo con un enfoque diferente: **schema-first** con generación de types automática.

## Cómo funciona

### 1. Defines tu schema

\`\`\`prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
\`\`\`

### 2. Prisma genera el cliente

\`\`\`bash
npx prisma generate
npx prisma db push  # Sincroniza con la base de datos
\`\`\`

### 3. Queries con autocompletado perfecto

\`\`\`typescript
// TypeScript sabe que user.name es string | null
// y que user.posts es Post[]
const user = await prisma.user.findUnique({
  where: { email: "guillermo@ejemplo.com" },
  include: { posts: true },
});

// Esto DA ERROR en TypeScript (columna no existe)
// const user = await prisma.user.findUnique({ where: { nombre: "..." } })
\`\`\`

## Migraciones

\`\`\`bash
# Crea una migración automática basada en los cambios del schema
npx prisma migrate dev --name add-user-role

# Aplica migraciones en producción
npx prisma migrate deploy
\`\`\`

## Prisma Studio

Un GUI incluido para explorar y editar datos visualmente:

\`\`\`bash
npx prisma studio
\`\`\`

Se abre en el navegador con una interfaz tipo Airtable donde puedes ver, filtrar, editar y crear registros.

## Bases de datos soportadas

PostgreSQL, MySQL, MariaDB, SQLite, SQL Server, MongoDB, CockroachDB, PlanetScale.

## Instalación

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\``,
    image_prompt: "TypeScript ORM with schema definition file, auto-generated types flowing to code editor with perfect autocomplete, database migration timeline, purple TypeScript elements, dark backend development background",
    replicable_with_code: null,
  },
];

async function main() {
  console.log(`=== OffRadar: Lote 3 — ${projects.length} proyectos ===\n`);
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i+1}/${projects.length}] ${p.name}...`);
    console.log(`  📸 Imagen...`);
    const imgUrl = await generateImage(p.image_prompt, p.seo_slug);
    if (imgUrl) console.log(`  ✓ ${imgUrl}`);
    try {
      await sql`
        INSERT INTO projects (source, source_id, url, name, description, summary_es, category_id, tags, difficulty, interest_score, stars, language, is_oss_alternative, alternative_to, replicable_with_code, featured_image_url, status, priority, seo_slug, seo_title, seo_description, author, created_at, updated_at, published_at)
        VALUES (${p.source}, ${p.source_id}, ${p.url}, ${p.name}, ${p.seo_description}, ${p.summary_es}, ${p.category_id}, ${JSON.stringify(p.tags)}, ${p.difficulty}, ${p.interest_score}, ${p.stars}, ${p.language}, ${p.is_oss_alternative}, ${p.alternative_to}, ${p.replicable_with_code || null}, ${imgUrl}, 'published', 'high', ${p.seo_slug}, ${p.seo_title}, ${p.seo_description}, ${p.author}, NOW(), NOW(), NOW())
        ON CONFLICT (source, source_id) DO UPDATE SET stars = EXCLUDED.stars, summary_es = EXCLUDED.summary_es, featured_image_url = COALESCE(EXCLUDED.featured_image_url, projects.featured_image_url), updated_at = NOW()
      `;
      console.log(`  ✓ DB`);
    } catch(e) { console.error(`  ✗ ${e.message}`); }
    if (i < projects.length - 1) await new Promise(r => setTimeout(r, 4000));
  }
  const count = await sql`SELECT COUNT(*) as n FROM projects WHERE status = 'published'`;
  console.log(`\n✅ Total: ${count[0].n} proyectos publicados`);
  await sql.end();
}
main().catch(e => { console.error(e); process.exit(1); });

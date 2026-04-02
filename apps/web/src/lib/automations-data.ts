export type Automation = {
  slug: string;
  title: string;
  source: string;
  difficulty: string;
  description: string;
  withCode: string;
  originalUrl: string | null;
  fullGuide: string;
};

export const automations: Automation[] = [
  {
    slug: "generador-videos-virales",
    title: "Generador de vídeos virales para TikTok y YouTube",
    source: "n8n template — 214.907 vistas",
    difficulty: "Medio",
    description: "Uno de los workflows más populares de n8n genera vídeos automáticamente: coge un tema de un Google Sheet, genera el guión con GPT, crea el vídeo con IA y lo sube a TikTok, YouTube e Instagram.",
    withCode: "Con Claude Code puedes construir un script Python que haga exactamente lo mismo sin n8n ni nodos visuales.",
    originalUrl: "https://n8n.io/workflows/5338",
    fullGuide: `## Qué hace el workflow original

El template de n8n más viral del momento automatiza la creación de vídeos cortos para redes sociales. El flujo es:

1. Lee una lista de temas desde Google Sheets
2. Para cada tema, genera un guión con GPT-4
3. Envía el guión a una API de generación de vídeo (Seedance, Veo3, Runway)
4. Recoge el vídeo generado
5. Lo sube automáticamente a TikTok, YouTube Shorts e Instagram Reels

Es impresionante como demostración, pero tiene una dependencia enorme de n8n y de sus nodos específicos.

## Cómo hacerlo con Claude Code

Con Claude Code puedes construir lo mismo en un script Python autónomo que ejecutas cuando quieras:

### Paso 1: Preparar los temas

\`\`\`python
import csv

# Lee temas de un CSV (más simple que Google Sheets)
with open('temas.csv') as f:
    temas = [row['tema'] for row in csv.DictReader(f)]
\`\`\`

### Paso 2: Generar guiones con Claude

\`\`\`python
import anthropic

client = anthropic.Anthropic()

def generar_guion(tema):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": f"Escribe un guión de 60 segundos para un vídeo "
                       f"de TikTok sobre: {tema}. Formato: narración directa, "
                       f"ganchos cada 10 segundos, tono conversacional."
        }]
    )
    return response.content[0].text
\`\`\`

### Paso 3: Generar el vídeo

Para la generación de vídeo puedes usar varias APIs:
- **Runway** (runway.ml): API de generación de vídeo a partir de texto
- **Pika** (pika.art): alternativa más económica
- **FFmpeg + imágenes**: genera imágenes con Gemini y móntalas con FFmpeg

### Paso 4: Añadir voz y subtítulos

\`\`\`python
# Text-to-speech con ElevenLabs o gTTS (gratuito)
from gtts import gTTS
audio = gTTS(text=guion, lang='es')
audio.save('narracion.mp3')

# Subtítulos con Whisper
import whisper
model = whisper.load_model("base")
result = model.transcribe("narracion.mp3")
\`\`\`

### Paso 5: Subir a las plataformas

Usa las APIs oficiales de cada plataforma o herramientas como \`yt-dlp\` para la subida.

## Ventajas sobre n8n

- **Sin dependencia**: no necesitas tener n8n corriendo 24/7
- **Más control**: puedes ajustar cada paso del proceso
- **Más barato**: no pagas por un servidor con n8n
- **Más flexible**: puedes añadir lógica compleja que en n8n sería imposible
- **Versionable**: el código va en Git, no en nodos visuales que no se versionan bien

## Tiempo estimado de construcción

Con Claude Code, montar el script completo lleva unas 2-3 horas la primera vez. Después, generar cada vídeo es cuestión de minutos.`,
  },
  {
    slug: "chatbot-whatsapp-rag",
    title: "Chatbot de WhatsApp con RAG para atención al cliente",
    source: "n8n template — 46.989 vistas",
    difficulty: "Medio",
    description: "Un workflow que conecta WhatsApp Business con un agente de IA que consulta tus documentos para responder preguntas de clientes automáticamente.",
    withCode: "Con Claude Code puedes montar un servidor que reciba webhooks de WhatsApp y responda con Claude consultando tus documentos.",
    originalUrl: "https://n8n.io/workflows/4827",
    fullGuide: `## El caso de uso

Tienes una empresa con documentación de producto (FAQs, manuales, políticas de devolución, guías). Tus clientes te escriben por WhatsApp con preguntas repetitivas que podrían responderse consultando esa documentación. Quieres un chatbot que lea tus documentos y responda automáticamente en WhatsApp.

## Cómo funciona en n8n

El template de n8n conecta:
1. Webhook de WhatsApp Business API → recibe mensajes
2. Nodo de IA con RAG → busca en documentos relevantes
3. Nodo de respuesta → envía la respuesta por WhatsApp

Funciona, pero necesitas n8n corriendo, configurar los nodos de RAG (complicado), y si WhatsApp cambia algo, los nodos se rompen.

## Cómo hacerlo con Claude Code

### Arquitectura

\`\`\`
WhatsApp Business API → Tu servidor (Express/FastAPI) → Claude API → WhatsApp
                                    ↕
                          Base de datos vectorial (ChromaDB)
                          con tus documentos indexados
\`\`\`

### Paso 1: Indexar tus documentos

\`\`\`python
import chromadb
from sentence_transformers import SentenceTransformer

# Carga y divide tus documentos
model = SentenceTransformer('all-MiniLM-L6-v2')
client = chromadb.Client()
collection = client.create_collection("docs")

# Indexa cada fragmento
for i, chunk in enumerate(document_chunks):
    embedding = model.encode(chunk)
    collection.add(
        documents=[chunk],
        embeddings=[embedding.tolist()],
        ids=[f"doc_{i}"]
    )
\`\`\`

### Paso 2: Servidor que recibe mensajes de WhatsApp

\`\`\`python
from fastapi import FastAPI, Request
import httpx

app = FastAPI()

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(request: Request):
    data = await request.json()
    message = extract_message(data)

    # Buscar contexto relevante en los documentos
    results = collection.query(query_texts=[message], n_results=3)
    context = "\\n".join(results['documents'][0])

    # Generar respuesta con Claude
    response = await generate_response(message, context)

    # Enviar respuesta por WhatsApp
    await send_whatsapp_message(data['from'], response)
\`\`\`

### Paso 3: Generar respuesta con Claude

\`\`\`python
async def generate_response(question, context):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        system="Eres un asistente de atención al cliente. "
               "Responde basándote SOLO en el contexto proporcionado. "
               "Si no tienes información suficiente, di que vas a "
               "derivar la consulta a un agente humano.",
        messages=[{
            "role": "user",
            "content": f"Contexto: {context}\\n\\nPregunta del cliente: {question}"
        }]
    )
    return response.content[0].text
\`\`\`

## Ventajas sobre n8n

- **~200 líneas de código** vs decenas de nodos conectados
- **Más fácil de depurar**: cuando algo falla, lees un log de Python, no navegas por nodos
- **Control total del RAG**: ajustas el chunking, el modelo de embeddings y el prompt
- **Escalable**: puedes desplegar en cualquier servidor, no dependes de n8n
- **Más barato**: un servidor pequeño (5€/mes) es suficiente

## Tiempo estimado

Con Claude Code, montar todo el sistema lleva una tarde. La parte más lenta es preparar y limpiar tus documentos para que el RAG funcione bien.`,
  },
  {
    slug: "publicacion-automatica-linkedin",
    title: "Publicación automática en LinkedIn con IA",
    source: "n8n template — 20.561 vistas",
    difficulty: "Fácil",
    description: "Un flujo que genera contenido para LinkedIn automáticamente con GPT-4 y DALL-E, programado para publicar en los mejores horarios.",
    withCode: "Con Claude Code creas un script que genera posts con Claude, imágenes con Gemini, y publica con la API de LinkedIn.",
    originalUrl: "https://n8n.io/workflows/4968",
    fullGuide: `## Qué hace el workflow original

El template de n8n automatiza la creación y publicación de contenido en LinkedIn:
1. Se activa según un schedule (ej: lunes, miércoles y viernes a las 9:00)
2. GPT-4 genera el texto del post basándose en un tema o prompt
3. DALL-E genera una imagen para acompañar el post
4. Se publica automáticamente en LinkedIn

## Cómo hacerlo con Claude Code

Este es probablemente el más fácil de replicar. Es un script de ~100 líneas.

### El script completo

\`\`\`python
import anthropic
import requests
import json
from datetime import datetime

# 1. Generar el texto del post con Claude
def generar_post(tema):
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=800,
        messages=[{
            "role": "user",
            "content": f"""Escribe un post de LinkedIn sobre: {tema}

            Requisitos:
            - Máximo 1300 caracteres
            - Empieza con un gancho que pare el scroll
            - Usa párrafos cortos (1-2 líneas)
            - Incluye una pregunta al final para generar engagement
            - Tono profesional pero cercano
            - NO uses hashtags genéricos, solo 2-3 específicos al final"""
        }]
    )
    return response.content[0].text

# 2. Generar imagen con Gemini Nano Banana
def generar_imagen(tema):
    response = requests.post(
        "https://generativelanguage.googleapis.com/v1beta/"
        "models/gemini-3.1-flash-image-preview:generateContent"
        "?key=TU_API_KEY",
        json={
            "contents": [{"parts": [{"text":
                f"Professional LinkedIn post image about {tema}, "
                "clean design, modern, professional"}]}],
            "generationConfig": {"responseModalities": ["IMAGE"]}
        }
    )
    # Guardar imagen...
    return "post_image.jpg"

# 3. Publicar en LinkedIn
def publicar_linkedin(texto, imagen_path, access_token):
    # Subir imagen primero
    # Luego crear el post con la imagen
    headers = {"Authorization": f"Bearer {access_token}"}
    # ... (API de LinkedIn)

# 4. Ejecutar
tema = "Cómo la IA está cambiando el desarrollo de software"
post = generar_post(tema)
imagen = generar_imagen(tema)
publicar_linkedin(post, imagen, "tu_token")
\`\`\`

### Programar la ejecución

Un simple cron job en tu servidor:

\`\`\`bash
# Publicar lunes, miércoles y viernes a las 9:00
0 9 * * 1,3,5 python3 /ruta/al/script/linkedin_poster.py
\`\`\`

## Resultado

Cada día programado, el script:
1. Genera un post original con Claude (mejor calidad de texto que GPT-4 para contenido en español)
2. Genera una imagen profesional con Gemini
3. Lo publica en tu LinkedIn automáticamente

**Coste**: prácticamente cero (unos céntimos por post en APIs de IA).

**Tiempo de construcción**: 1-2 horas con Claude Code.`,
  },
  {
    slug: "monitor-precios-telegram",
    title: "Monitor de precios con alertas por Telegram",
    source: "Idea popular en n8n",
    difficulty: "Fácil",
    description: "Visita periódicamente webs de tiendas, extrae precios, y te avisa por Telegram cuando bajan.",
    withCode: "Con Claude Code + Playwright creas un monitor que funciona sin selectores CSS frágiles.",
    originalUrl: null,
    fullGuide: `## El problema

Quieres comprar algo (unos auriculares, un portátil, un vuelo) pero el precio actual es demasiado alto. Quieres que alguien vigile el precio y te avise cuando baje.

## La solución típica con n8n

En n8n, montas un workflow que:
1. Cada hora, hace una petición HTTP a la página del producto
2. Parsea el HTML para extraer el precio (con selectores CSS frágiles)
3. Compara con el precio anterior guardado en una variable
4. Si ha bajado, envía un mensaje de Telegram

El problema: los selectores CSS se rompen cada vez que Amazon/MediaMarkt/PCComponentes cambian su diseño (que es constantemente).

## Cómo hacerlo con Claude Code (resistente a cambios)

### Opción A: Con Browser Use (IA que entiende la página)

\`\`\`python
from browser_use import Agent
from langchain_openai import ChatOpenAI
import sqlite3
import requests

TELEGRAM_TOKEN = "tu_bot_token"
TELEGRAM_CHAT_ID = "tu_chat_id"

productos = [
    {"nombre": "Sony WH-1000XM5", "url": "https://amazon.es/dp/..."},
    {"nombre": "MacBook Air M3", "url": "https://amazon.es/dp/..."},
]

async def check_prices():
    agent = Agent(
        llm=ChatOpenAI(model="gpt-4o-mini"),  # Más barato
    )

    db = sqlite3.connect("precios.db")

    for producto in productos:
        # La IA extrae el precio sin selectores CSS
        result = await agent.run(
            f"Ve a {producto['url']} y dime el precio actual del producto"
        )

        precio_actual = extraer_precio(result)
        precio_anterior = get_last_price(db, producto['nombre'])

        if precio_anterior and precio_actual < precio_anterior:
            enviar_telegram(
                f"🔥 ¡{producto['nombre']} ha bajado!\\n"
                f"Antes: {precio_anterior}€\\n"
                f"Ahora: {precio_actual}€\\n"
                f"Enlace: {producto['url']}"
            )

        save_price(db, producto['nombre'], precio_actual)

def enviar_telegram(mensaje):
    requests.post(
        f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
        json={"chat_id": TELEGRAM_CHAT_ID, "text": mensaje}
    )
\`\`\`

### Opción B: Con Playwright simple (sin IA, más rápido)

\`\`\`python
from playwright.sync_api import sync_playwright

def get_price(url):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        # Buscar el precio por patrones comunes
        price_element = page.locator('[data-testid="price"],'
                                      '.a-price .a-offscreen,'
                                      '[class*="price"]').first
        return float(price_element.text_content().replace('€','').replace(',','.'))
\`\`\`

### Programar la ejecución

\`\`\`bash
# Cada hora
0 * * * * python3 /ruta/check_prices.py
\`\`\`

## Resultado

Un monitor de precios personalizado que:
- Vigila los productos que tú quieras
- Te avisa al instante por Telegram cuando bajan
- Guarda el historial de precios en SQLite
- Funciona sin depender de ningún servicio externo
- Se ejecuta con un cron en tu servidor o tu propio ordenador

**Tiempo de construcción**: 1 hora con Claude Code.`,
  },
  {
    slug: "resumen-noticias-diario",
    title: "Resumen automático diario de noticias por email",
    source: "Idea popular en n8n",
    difficulty: "Fácil",
    description: "Recopila noticias de RSS, las resume con IA, y te envía un briefing cada mañana.",
    withCode: "Con Claude Code construyes un script que lee feeds RSS, resume con Claude, y envía con Resend.",
    originalUrl: null,
    fullGuide: `## La idea

Cada mañana recibes un email personalizado con las noticias más importantes del día de tus fuentes favoritas, resumidas por IA para que en 2 minutos estés al día.

## El workflow en n8n

1. Nodo Schedule (trigger a las 8:00)
2. Nodos RSS Feed (uno por cada fuente)
3. Nodo de IA para resumir
4. Nodo HTML para formatear
5. Nodo Email para enviar

Funciona, pero son muchos nodos para algo que en código son 80 líneas.

## Cómo hacerlo con Claude Code

### El script completo

\`\`\`python
import feedparser
import anthropic
import resend
from datetime import datetime, timedelta

# Configuración
FEEDS = [
    {"nombre": "Hacker News", "url": "https://hnrss.org/best?count=10"},
    {"nombre": "TechCrunch", "url": "https://techcrunch.com/feed/"},
    {"nombre": "The Verge", "url": "https://www.theverge.com/rss/index.xml"},
    {"nombre": "Xataka", "url": "https://www.xataka.com/feedburner.xml"},
]

def recoger_noticias():
    noticias = []
    for feed in FEEDS:
        parsed = feedparser.parse(feed["url"])
        for entry in parsed.entries[:5]:  # Top 5 por fuente
            noticias.append({
                "fuente": feed["nombre"],
                "titulo": entry.title,
                "link": entry.link,
                "resumen": entry.get("summary", "")[:500],
            })
    return noticias

def resumir_con_claude(noticias):
    client = anthropic.Anthropic()

    noticias_text = "\\n\\n".join([
        f"**{n['fuente']}**: {n['titulo']}\\n{n['resumen']}"
        for n in noticias
    ])

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": f"""Aquí tienes las noticias tech de hoy.
            Genera un briefing en español con:
            1. Las 5 noticias más importantes, cada una con un párrafo
               de resumen y un enlace
            2. Una sección "En resumen" de 2 frases con lo más destacado
            3. Formato HTML para email (usa <h3>, <p>, <a>, <hr>)

            Noticias:
            {noticias_text}"""
        }]
    )
    return response.content[0].text

def enviar_email(html_content):
    resend.api_key = "tu_api_key"
    resend.Emails.send({
        "from": "briefing@tudominio.com",
        "to": "tu@email.com",
        "subject": f"☕ Tu briefing tech — {datetime.now().strftime('%d/%m/%Y')}",
        "html": html_content,
    })

# Ejecutar
noticias = recoger_noticias()
html = resumir_con_claude(noticias)
enviar_email(html)
print(f"Briefing enviado con {len(noticias)} noticias")
\`\`\`

### Programar a las 8:00

\`\`\`bash
0 8 * * * python3 /ruta/briefing_diario.py
\`\`\`

## Personalización

Lo bueno de hacerlo con código es que puedes personalizar todo:

- **Fuentes**: añade o quita feeds RSS en 1 línea
- **Frecuencia**: diario, semanal, solo días laborables
- **Idioma del resumen**: Claude resume en el idioma que le pidas
- **Formato**: HTML para email bonito, Markdown para Telegram, texto plano para SMS
- **Filtros**: pide a Claude que ignore noticias sobre temas que no te interesan
- **Múltiples destinatarios**: cada uno con sus fuentes preferidas

## Coste

- **Feedparser**: gratis
- **Claude API**: ~0.02€ por briefing (un resumen de 20 noticias)
- **Resend**: gratis hasta 3.000 emails/mes
- **Total**: menos de 1€/mes por un briefing diario personalizado

**Tiempo de construcción**: 30 minutos con Claude Code.`,
  },
];

export function getAutomationBySlug(slug: string) {
  return automations.find((a) => a.slug === slug) ?? null;
}

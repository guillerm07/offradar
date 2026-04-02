# OffRadar

> **Dominio**: offradar.es

---

## 1. Visión general

Plataforma web profesional que **descubre, analiza y explica automáticamente** las herramientas, repositorios, modelos de IA, papers y productos más interesantes que aparecen cada día en el ecosistema tech.

El problema que resuelve: en Twitter/X hay gente haciéndose famosa compartiendo repos de GitHub interesantes, pero el formato hilo no da espacio para explicar bien las cosas. Esta web ofrece ese contenido mejor estructurado, más completo, con imágenes de calidad, y actualizado automáticamente.

### Diferencial clave

- **Web bonita, profesional y original** — no una web genérica, sino un producto con identidad visual fuerte
- **Contenido de valor real** — análisis profundos con imágenes generadas por IA, no solo listados
- **Todo automatizado** — desde la recolección hasta la publicación en redes y el envío de newsletter
- **Secciones únicas**: productos replicables con Claude Code, automatizaciones n8n reproducibles, stacks completos
- **Imagen personal del creador** — sección propia de Guillermo explicando proyectos, tutoriales, experiencias

---

## 2. Modelo de negocio

```
Contenido gratuito en la web (atrae tráfico orgánico via SEO + redes sociales)
  → Newsletter semanal automática (retiene audiencia, construye lista de email)
    → Publicación automática en X/Twitter (amplifica alcance)
      → Sección personal de Guillermo (construye marca personal)
        → Comunidad de pago en Skool (monetización principal)
          - Tutoriales de instalación paso a paso
          - Guías para sacar partido a las herramientas
          - Soporte y comunidad activa
          - Contenido exclusivo y adelantos
```

### Fuentes de ingreso potenciales

| Canal | Descripción |
|-------|-------------|
| **Skool** | Comunidad de pago (~30-50€/mes) con tutoriales, guías y soporte |
| **Newsletter sponsorships** | Cuando la lista crezca, sponsors de herramientas dev |
| **Afiliados** | Links de afiliado a herramientas SaaS recomendadas |
| **Contenido premium** | Guías detalladas de instalación/configuración de stacks completos |

---

## 3. Fuentes de datos

### 3.1 APIs principales (todas gratuitas)

| Fuente | Tipo de API | Auth | Rate limit | Qué extraemos |
|--------|------------|------|------------|---------------|
| **GitHub Search API** | REST | Token (PAT) | 5.000 req/h, 30 búsquedas/min | Repos nuevos ordenados por estrellas, filtrados por fecha, lenguaje y tema |
| **GitHub Trending** | Scraping (no hay API oficial) | No | N/A | Repos trending del día/semana/mes por lenguaje |
| **Hacker News** | REST (Firebase) | No | Sin límite oficial | Top stories, Show HN, nuevos lanzamientos con tracción |
| **Product Hunt** | GraphQL v2 | OAuth 2.0 | 6.250 puntos/15min | Productos lanzados, trending, por categoría |
| **Hugging Face Hub** | REST | No (público) | Sin límite documentado | Modelos, Spaces y datasets trending |
| **Papers with Code** | REST | No | Sin límite documentado | Papers con implementación, SOTA, benchmarks |
| **ArXiv** | REST (Atom XML) | No | ~4 req/s | Papers recientes en cs.AI, cs.LG, cs.CL |
| **Dev.to (Forem)** | REST v1 | No (lectura) | Sin límite documentado | Artículos trending por tags (#ai, #ml, #opensource) |
| **Reddit** | OAuth | OAuth 2.0 | 100 req/min (free) | r/LocalLLaMA, r/selfhosted, r/machinelearning, r/singularity |

### 3.2 Fuentes complementarias (scraping/RSS)

| Fuente | Método | Qué aporta |
|--------|--------|------------|
| **GitHub Trending RSS** | RSS (mshibanami/GitHubTrendingRSS) | Feed diario de trending por lenguaje |
| **BetaList** | Scraping/RSS | Startups en beta, early access |
| **Indie Hackers** | Scraping | Proyectos indie con tracción |
| **Lobste.rs** | RSS | Comunidad tech curada, alternativa a HN |
| **Awesome Lists (GitHub)** | Scraping periódico | Listas curadas por comunidad (awesome-ai-tools, etc.) |

### 3.3 Fuentes que NO tienen API (monitorizar manualmente o scraping ligero)

- **There's an AI for That (TAAFT)** — 12.000+ herramientas IA catalogadas
- **Future Tools** — curado por Matt Wolfe, 4.000+ herramientas
- **Futurepedia** — directorio similar

---

## 4. Arquitectura técnica

### 4.1 Diagrama general

```
┌──────────────────────────────────────────────────────────────┐
│                     CAPA DE RECOLECCIÓN                       │
│              (Python scripts, ejecutados via cron en servidor) │
│                                                                │
│  GitHub API ──┐                                                │
│  GitHub RSS ──┤                                                │
│  HN API ──────┤                                                │
│  PH API ──────┤──→  Normalización  ──→  Cola de procesamiento  │
│  HF Hub ──────┤      (schema común)      (tabla "raw_items")   │
│  ArXiv ───────┤                                                │
│  PwC API ─────┤                                                │
│  Reddit ──────┤                                                │
│  Dev.to ──────┘                                                │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    CAPA DE ANÁLISIS (IA)                       │
│                                                                │
│  Para cada item en la cola:                                    │
│                                                                │
│  1. FILTRADO (Claude API — máxima calidad)                     │
│     → ¿Es relevante? ¿Merece estar en la web?                 │
│     → Descarta spam, repos vacíos, forks sin valor             │
│                                                                │
│  2. ENRIQUECIMIENTO (Claude API — máxima calidad)              │
│     → Lee el README del repo / descripción del producto        │
│     → Genera resumen en español (2-3 párrafos)                 │
│     → Categoriza (IA, DevTools, Self-hosted, Automatización..) │
│     → Asigna tags para SEO                                     │
│     → Evalúa dificultad de instalación (Fácil/Medio/Difícil)  │
│     → Detecta si es alternativa open source a algo de pago     │
│     → Calcula "puntuación de interés" (0-100)                  │
│                                                                │
│  3. GENERACIÓN DE IMÁGENES (Gemini API)                        │
│     → Imágenes destacadas para cada artículo                   │
│     → Imágenes inline para enriquecer el contenido             │
│     → Thumbnails para redes sociales y newsletter              │
│                                                                │
│  4. CONTENIDO ESPECIAL (Claude API — bajo demanda)             │
│     → Comparativas entre herramientas similares                │
│     → "Stack de la semana" (combinaciones de herramientas)     │
│     → Resúmenes de papers en lenguaje accesible               │
│     → "Replica esto con Claude Code" (guías paso a paso)       │
│     → "Automatiza esto con n8n + Claude Code"                  │
│     → Contenido para newsletter semanal                       │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS (PostgreSQL self-hosted)         │
│                  (En servidor Hetzner, gestionado con Coolify)  │
│                                                                │
│  Tablas principales:                                           │
│                                                                │
│  projects                                                      │
│  ├── id, source, source_id, url                                │
│  ├── name, description, summary_es                             │
│  ├── category, tags[], difficulty                              │
│  ├── interest_score, trending_velocity                         │
│  ├── stars, forks, last_commit, language                       │
│  ├── is_oss_alternative, alternative_to                        │
│  ├── featured_image_url, thumbnail_url                         │
│  ├── content_images[] (imágenes inline del artículo)           │
│  ├── status (draft/published/archived)                         │
│  ├── created_at, updated_at, published_at                      │
│  └── seo_slug, seo_title, seo_description                     │
│                                                                │
│  categories                                                    │
│  ├── id, name, slug, description, icon                         │
│  └── parent_id (para subcategorías)                            │
│                                                                │
│  daily_snapshots (para tracking de trending velocity)          │
│  ├── project_id, date                                          │
│  ├── stars, forks, downloads                                   │
│  └── hn_score, ph_votes, reddit_upvotes                        │
│                                                                │
│  newsletters                                                   │
│  ├── id, subject, content_html, sent_at                        │
│  └── stats (opens, clicks)                                     │
│                                                                │
│  subscribers                                                   │
│  ├── id, email, name                                           │
│  ├── preferences (categorías de interés)                       │
│  └── subscribed_at, unsubscribed_at                            │
│                                                                │
│  comparisons                                                   │
│  ├── id, title, slug                                           │
│  ├── project_ids[], comparison_table_json                      │
│  └── summary_es, published_at                                  │
│                                                                │
│  social_posts                                                  │
│  ├── id, project_id, platform (x/twitter)                      │
│  ├── content, image_url                                        │
│  ├── posted_at, engagement_stats                               │
│  └── status (pending/posted/failed)                            │
│                                                                │
│  creator_content (sección personal de Guillermo)               │
│  ├── id, title, slug, type (tutorial/proyecto/experiencia)     │
│  ├── content_html, featured_image_url                          │
│  ├── related_project_ids[]                                     │
│  └── published_at, status                                      │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    WEB (Next.js + Tailwind)                    │
│                    Deploy: Hetzner + Coolify                   │
│                                                                │
│  Páginas públicas:                                             │
│  ├── /                    → Homepage: trending hoy + semana    │
│  ├── /trending            → Rankings en tiempo real            │
│  ├── /categoria/[slug]    → Listado filtrado por categoría     │
│  ├── /proyecto/[slug]     → Página individual (SEO powerhouse) │
│  ├── /alternativas        → "Usa esto gratis en vez de pagar"  │
│  ├── /comparativas        → Tablas comparativas entre tools    │
│  ├── /papers              → Papers de la semana explicados     │
│  ├── /stacks              → Combinaciones recomendadas         │
│  ├── /replica-con-code    → Productos replicables con Claude   │
│  ├── /automatizaciones    → Flows n8n reproducibles            │
│  ├── /guillermo           → Blog personal / proyectos propios  │
│  ├── /newsletter          → Archivo + signup                   │
│  └── /sobre               → Quiénes somos + CTA a Skool       │
│                                                                │
│  Funcionalidades:                                              │
│  ├── Buscador con filtros (categoría, dificultad, source)      │
│  ├── Ordenar por: trending, reciente, estrellas, interés       │
│  ├── Vista de gráfica de crecimiento (estrellas en el tiempo)  │
│  ├── Sistema de alertas por email (por categoría)              │
│  ├── Imágenes generadas por IA en cada artículo                │
│  ├── Modo oscuro                                               │
│  └── Responsive (mobile first)                                 │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Stack técnico

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| **Frontend** | Next.js 15 + Tailwind CSS | SSR/SSG para SEO, rápido de desarrollar, gran ecosistema |
| **Backend/API** | Next.js API Routes + Server Actions | Todo en un proyecto, simplifica deploy |
| **Base de datos** | PostgreSQL (self-hosted en Hetzner) | Control total, sin dependencias externas, rendimiento predecible |
| **ORM** | Drizzle ORM | Type-safe, ligero, migraciones sencillas, excelente DX con TypeScript |
| **Scrapers** | Python (requests, httpx, beautifulsoup4) | Mejor ecosistema para scraping, async nativo |
| **IA/Análisis** | Claude API (máxima calidad en todo el pipeline) | Calidad superior en español, análisis profundo y profesional |
| **Generación de imágenes** | Gemini API (cuenta nanobanana2) | Imágenes destacadas, inline y thumbnails para cada artículo |
| **Cron/Jobs** | Cron en servidor Hetzner (gestionado con Coolify) | Control total, sin límites, ejecución fiable |
| **Newsletter** | Resend | API moderna, fácil de integrar, buen tier gratuito |
| **Publicación en X** | Twitter/X API v2 | Publicación automática de hallazgos destacados |
| **Deploy** | Hetzner + Coolify | Self-hosted, coste fijo y predecible, control total |
| **Storage (imágenes)** | Almacenamiento en servidor Hetzner o Cloudflare R2 | Imágenes generadas, screenshots, logos |
| **Analytics** | Plausible o Umami (self-hosted en Coolify) | Privacy-friendly, sin cookies, self-hosted |
| **Dominio** | offradar.es | Dominio definitivo |
| **Repositorio** | GitHub (cuenta guillerm07) | Cuenta personal de Guillermo |

### 4.3 Costes estimados (inicio)

| Concepto | Coste mensual |
|----------|--------------|
| Hetzner (servidor ya existente) | Ya pagado |
| Coolify | Open source, 0€ |
| PostgreSQL (self-hosted) | 0€ |
| Resend (Free tier → Pro cuando crezca) | 0€ inicio |
| Claude API (máxima calidad, todo el pipeline) | ~30-60€/mes dependiendo del volumen |
| Gemini API (generación de imágenes) | ~5-15€/mes |
| Twitter/X API | 0-100€/mes (según tier) |
| Dominio | ~1€/mes (pago anual) |
| **TOTAL** | **~36-176€/mes** |

---

## 5. Secciones de contenido (el diferencial)

### 5.1 Trending diario/semanal
La homepage. Lo que está explotando ahora mismo en GitHub, HN, Product Hunt, etc. Cada item con:
- Resumen en español de calidad profesional
- Imagen destacada generada por IA
- Puntuación de interés
- Gráfica de crecimiento
- Categoría y tags
- Dificultad de instalación

### 5.2 "Clona esto en vez de pagarlo"
**Sección estrella para viralidad.** Mapea herramientas SaaS de pago contra alternativas open source:
- "En vez de pagar Notion AI → monta esto con Ollama + tu propio RAG"
- "En vez de pagar Grammarly → LanguageTool self-hosted"
- "En vez de pagar Zapier → n8n o Activepieces"

Cada entrada incluye:
- Qué producto de pago reemplaza y cuánto cuesta
- Repo open source alternativo
- Nivel de dificultad de instalación
- Qué pierdes vs la versión de pago (honestidad)
- Link a tutorial en Skool (CTA de monetización)

### 5.3 "Replica esto con Claude Code"
**Sección única y diferencial.** Productos y herramientas que se pueden replicar o construir usando Claude Code:
- Análisis del producto original y qué hace
- Guía paso a paso de cómo replicarlo con Claude Code
- Código resultante o repo de ejemplo
- Nivel de dificultad y tiempo estimado

### 5.4 "Automatiza esto con n8n"
Flujos de automatización interesantes que se pueden montar con n8n, especialmente combinados con Claude Code:
- Descripción del workflow
- Diagrama del flujo
- Exportación del flow de n8n (JSON descargable)
- Variantes y personalizaciones

### 5.5 Papers de la semana explicados
Papers de ArXiv + Papers with Code resumidos en lenguaje accesible:
- "Este paper de Google cambia X porque..."
- Link al paper original y al código
- Por qué importa (implicaciones prácticas)
- Imágenes explicativas generadas por IA

### 5.6 Stack de la semana
Combinaciones de repos/herramientas que resuelven un problema completo:
- "Monta tu propio ChatGPT privado: Ollama + Open WebUI + ChromaDB"
- "Automatiza tu negocio sin código: n8n + PostgreSQL + Appsmith"
- Cada stack con diagrama de arquitectura y nivel de dificultad

### 5.7 Comparativas automáticas
Cuando se detectan 2+ repos/herramientas que hacen lo mismo, se genera automáticamente:
- Tabla comparativa (estrellas, última actualización, features, dificultad)
- Recomendación según caso de uso
- Pros y contras de cada opción

### 5.8 Trending Velocity (detección temprana)
No solo mostrar qué es popular, sino **qué está acelerando**:
- Repos que pasan de 100 a 5.000 estrellas en una semana
- Modelos de HuggingFace que explotan en descargas
- Posts de HN que generan discusión masiva
- Detectar tendencias ANTES de que sean mainstream

### 5.9 Sección de Guillermo (marca personal)
**Fase futura pero contemplada desde el diseño.** Blog/sección personal donde Guillermo comparte:
- Proyectos propios construidos con repos descubiertos en OffRadar
- Experiencias y aprendizajes con Claude Code
- Tutoriales hands-on
- Opiniones y análisis personales del ecosistema tech
- Punto de conexión humana con la audiencia (no todo es IA)

---

## 6. Pipeline de análisis con IA (detalle)

### 6.1 Paso 1: Recolección y normalización

Cada scraper genera items con un schema común:

```json
{
  "source": "github|hackernews|producthunt|huggingface|arxiv|devto|reddit",
  "source_id": "identificador-unico-en-la-fuente",
  "url": "https://...",
  "title": "Nombre del proyecto/post",
  "description": "Descripción original (en inglés normalmente)",
  "metadata": {
    "stars": 1234,
    "forks": 56,
    "language": "Python",
    "topics": ["llm", "rag", "ai"],
    "created_at": "2026-03-28",
    "author": "usuario",
    "score": 450,
    "comments": 89
  },
  "readme_content": "contenido del README si aplica (truncado a ~4000 chars)",
  "collected_at": "2026-04-01T10:00:00Z"
}
```

### 6.2 Paso 2: Filtrado inteligente (Claude API)

Prompt del sistema para filtrado:
```
Eres un curador de contenido tech de élite. Evalúa si este proyecto/herramienta
merece ser publicado en una web profesional de tendencias tech dirigida a
desarrolladores y entusiastas de la tecnología hispanohablantes.

Descarta:
- Repos de ejercicios académicos o tareas de universidad
- Forks sin cambios significativos
- Proyectos abandonados (sin commits en >6 meses)
- Spam o proyectos de baja calidad
- Contenido duplicado de algo que ya tenemos
- Proyectos sin documentación mínima o README vacío

Responde SOLO con un JSON:
{
  "approved": true/false,
  "reason": "razón breve",
  "priority": "high|medium|low",
  "suggested_sections": ["trending", "alternativas", "replica-con-code", "automatizaciones"]
}
```

### 6.3 Paso 3: Enriquecimiento (Claude API)

Para cada item aprobado:
```
Analiza este proyecto tech en profundidad y genera contenido profesional en español
para una web de referencia en el ecosistema tech. Basándote en la información proporcionada:

1. RESUMEN: 2-3 párrafos explicando qué es, para quién es útil, y por qué
   importa. Usa lenguaje claro, profesional y accesible. Que aporte valor real.

2. CATEGORÍA: Asigna UNA categoría principal de esta lista:
   [Inteligencia Artificial, DevTools, Self-hosted, Automatización,
    Seguridad, Bases de datos, Frontend, Backend, Mobile, DevOps,
    Productividad, Open Source alternativo, Datos, Blockchain, Otros]

3. TAGS: Lista de 3-7 tags relevantes para SEO

4. DIFICULTAD DE INSTALACIÓN: Fácil / Medio / Difícil
   (basándote en si tiene Docker, documentación clara, dependencias...)

5. ALTERNATIVA A: Si este proyecto es una alternativa open source a un
   producto de pago, indica cuál. Si no, null.

6. REPLICABLE CON CLAUDE CODE: ¿Se podría construir algo similar usando
   Claude Code? Si sí, describe brevemente cómo. Si no, null.

7. AUTOMATIZABLE CON N8N: ¿Se puede integrar en un workflow de n8n?
   Si sí, describe brevemente el caso de uso. Si no, null.

8. PUNTUACIÓN DE INTERÉS: 0-100 basándote en:
   - Novedad e innovación (30%)
   - Utilidad práctica (30%)
   - Calidad del proyecto (actividad, docs, comunidad) (20%)
   - Potencial viral (¿la gente lo compartiría?) (20%)

9. SEO: Genera título y meta description optimizados para Google

10. PROMPT PARA IMAGEN: Describe una imagen profesional y atractiva que
    represente este proyecto/herramienta para generar con IA.

Responde en JSON.
```

### 6.4 Paso 4: Generación de imágenes (Gemini API)

Para cada proyecto aprobado y enriquecido:
- **Imagen destacada** (1200x630): Para la cabecera del artículo y compartir en redes
- **Thumbnail** (400x300): Para listados y cards en la web
- **Imágenes inline** (según necesidad): Para enriquecer el contenido del artículo

### 6.5 Paso 5: Contenido especial (bajo demanda)

- **Comparativas**: Cuando se detectan 2+ proyectos en la misma subcategoría
- **Stacks**: Curación + sugerencias de IA para combinaciones útiles
- **Newsletter**: Resumen semanal automático con los top 10 de la semana
- **Papers**: Resumen de papers de ArXiv en lenguaje accesible
- **Replica con Code**: Guías de cómo replicar productos con Claude Code
- **Automatizaciones**: Flows de n8n descargables y documentados
- **Posts para X**: Generación automática de tweets/threads para publicar

---

## 7. Automatización de publicación

### 7.1 Newsletter automática (Resend)

- Generación automática semanal con los mejores hallazgos
- Template HTML profesional y responsive
- Personalización por intereses del suscriptor
- Métricas de apertura y clics
- Double opt-in y baja fácil (GDPR/LOPD)

### 7.2 Publicación automática en X/Twitter

- Bot que publica automáticamente los hallazgos más destacados
- Formato: imagen generada + resumen breve + link a la web
- Threads para contenido más profundo (comparativas, stacks)
- Programación inteligente (mejores horas de engagement)
- Monitorización de métricas de engagement

---

## 8. SEO Strategy

### 8.1 Páginas que generan tráfico orgánico

Cada proyecto publicado genera una URL indexable:
```
/proyecto/ollama-ejecuta-llms-en-local
/proyecto/n8n-alternativa-gratuita-a-zapier
/alternativas/zapier
/comparativa/ollama-vs-llama-cpp-vs-vllm
/stack/chatgpt-privado-ollama-openwebui-chromadb
/replica-con-code/crea-tu-propio-chatbot-con-claude
/automatizaciones/workflow-n8n-scraping-automatico
/guillermo/mi-experiencia-montando-offradar
```

### 8.2 Keywords objetivo

- "alternativa gratuita a [producto]" — alto volumen, alta intención
- "mejores herramientas IA [año]" — estacional, alto volumen
- "[herramienta] vs [herramienta]" — comparativas, alta intención
- "cómo instalar [herramienta]" — tutoriales, lleva a Skool
- "repos de github interesantes" — exactamente el nicho
- "herramientas open source para [caso de uso]"
- "tendencias inteligencia artificial [mes/año]"
- "replicar [producto] con IA" — nicho nuevo y sin competencia
- "automatizar con n8n [caso de uso]"
- "claude code tutoriales"

### 8.3 Contenido auto-generado SEO-friendly

- Títulos optimizados: "N8N: La alternativa gratuita a Zapier que puedes instalar en tu servidor"
- Meta descriptions con call to action
- Schema markup (Article, SoftwareApplication, Review)
- Sitemap dinámico actualizado diariamente
- Internal linking automático entre proyectos relacionados
- Imágenes con alt text optimizado para SEO

---

## 9. Estrategia de crecimiento

### 9.1 Fase de lanzamiento

1. **Twitter/X**: Publicación automática de los hallazgos más interesantes del día con imagen + resumen breve + "explicación completa en [link]"
2. **Reddit**: Compartir en subreddits relevantes (r/selfhosted, r/opensource, etc.)
3. **SEO**: El contenido indexable empieza a posicionar en semanas
4. **Newsletter**: CTA en cada página para capturar emails

### 9.2 Fase de crecimiento

1. **YouTube/TikTok/Reels**: Vídeos cortos mostrando herramientas → llevan a la web → llevan a Skool
2. **Colaboraciones**: Con otros creadores de contenido tech en español
3. **Newsletter sponsorships**: Cuando la lista supere los 5.000 suscriptores
4. **Marca personal Guillermo**: Sección propia con contenido original, construye confianza

### 9.3 Fase de monetización

1. **Comunidad Skool**: Lanzar cuando haya base de audiencia suficiente (~1.000 emails)
2. **Contenido premium**: Tutoriales detallados de instalación en Skool
3. **Afiliados**: Links de herramientas recomendadas
4. **Sponsorships**: Newsletter y web

### 9.4 Métricas clave (KPIs)

| Métrica | Objetivo mes 1 | Objetivo mes 6 |
|---------|----------------|----------------|
| Visitas/mes | 5.000 | 50.000 |
| Suscriptores newsletter | 500 | 5.000 |
| Seguidores X/Twitter | 1.000 | 10.000 |
| Proyectos indexados | 200 | 2.000+ |
| Posiciones SEO top 10 | 10 | 100+ |
| Miembros Skool | - | 50-100 |

---

## 10. Roadmap de desarrollo

### Fase 1 — MVP (Semanas 1-3)

**Objetivo**: Web funcional, bonita y profesional con contenido real.

- [ ] Configurar proyecto Next.js 15 + Tailwind CSS + TypeScript
- [ ] Diseño visual profesional y original (identidad visual fuerte)
- [ ] Configurar PostgreSQL en Hetzner (via Coolify)
- [ ] Configurar Drizzle ORM + migraciones
- [ ] Scraper de GitHub (Search API + trending via scraping)
- [ ] Scraper de Hacker News (top stories, Show HN)
- [ ] Pipeline con Claude API (filtrado + enriquecimiento, máxima calidad)
- [ ] Generación de imágenes con Gemini API
- [ ] Homepage con listado de trending (día/semana) con imágenes
- [ ] Página individual por proyecto con resumen, imágenes, stats y links
- [ ] Categorías básicas con filtros
- [ ] Deploy en Hetzner via Coolify
- [ ] Cron jobs en el servidor (ejecutar scrapers cada 12h)
- [ ] Repo en GitHub (guillerm07)

### Fase 2 — Contenido rico + automatización (Semanas 4-6)

**Objetivo**: Más fuentes, newsletter automática, publicación en X.

- [ ] Scraper de Product Hunt
- [ ] Scraper de Hugging Face Hub (modelos y spaces trending)
- [ ] Scraper de ArXiv + Papers with Code
- [ ] Scraper de Reddit (subreddits seleccionados)
- [ ] Sección "Alternativas open source" con detección automática
- [ ] Sección "Replica esto con Claude Code"
- [ ] Comparativas automáticas entre herramientas similares
- [ ] Buscador con filtros avanzados
- [ ] Newsletter automática con Resend (generación + envío semanal)
- [ ] Publicación automática en X/Twitter
- [ ] Sistema de "trending velocity" (gráficas de crecimiento)
- [ ] SEO: sitemap, schema markup, meta tags dinámicos

### Fase 3 — Contenido profundo + marca personal (Semanas 7-12)

**Objetivo**: Contenido diferencial, sección personal, preparar monetización.

- [ ] Sección "Automatiza esto con n8n"
- [ ] Sección "Stack de la semana"
- [ ] Sección "Papers explicados"
- [ ] Sección personal de Guillermo (blog/proyectos)
- [ ] Sistema de alertas personalizadas por email
- [ ] Analytics (Umami self-hosted en Coolify)
- [ ] Optimizar rendimiento y Core Web Vitals
- [ ] Preparar y lanzar comunidad Skool
- [ ] Landing page de Skool integrada en la web
- [ ] Crear primeros tutoriales (contenido premium)

### Fase 4 — Escala (Mes 3+)

**Objetivo**: Crecer audiencia, más fuentes, más contenido automatizado.

- [ ] Scraper de Dev.to, Lobste.rs, BetaList
- [ ] Scraping ligero de TAAFT, Future Tools (si legal)
- [ ] Vídeos cortos automatizados para redes (experimental)
- [ ] API pública para que otros consuman los datos
- [ ] Internacionalización (versión en inglés)
- [ ] App móvil (PWA primero, nativa después si hay demanda)
- [ ] Partnerships con herramientas/startups para reviews patrocinadas

---

## 11. Estructura del proyecto

```
offradar/
├── apps/
│   └── web/                    # Next.js app
│       ├── app/                # App Router (Next.js 15)
│       │   ├── page.tsx        # Homepage
│       │   ├── trending/
│       │   ├── proyecto/[slug]/
│       │   ├── categoria/[slug]/
│       │   ├── alternativas/
│       │   ├── comparativas/
│       │   ├── papers/
│       │   ├── stacks/
│       │   ├── replica-con-code/
│       │   ├── automatizaciones/
│       │   ├── guillermo/
│       │   ├── newsletter/
│       │   ├── sobre/
│       │   └── api/            # API routes
│       ├── components/
│       ├── lib/
│       │   ├── db.ts           # Conexión PostgreSQL (Drizzle)
│       │   ├── claude.ts       # Claude API client
│       │   ├── gemini.ts       # Gemini API (generación de imágenes)
│       │   ├── resend.ts       # Newsletter
│       │   ├── twitter.ts      # Publicación en X
│       │   └── utils.ts
│       ├── db/
│       │   ├── schema.ts       # Drizzle schema
│       │   └── migrations/     # SQL migrations
│       └── public/
│
├── scrapers/                   # Python scrapers
│   ├── sources/
│   │   ├── github_trending.py
│   │   ├── github_search.py
│   │   ├── hackernews.py
│   │   ├── producthunt.py
│   │   ├── huggingface.py
│   │   ├── arxiv_papers.py
│   │   ├── papers_with_code.py
│   │   ├── reddit.py
│   │   └── devto.py
│   ├── pipeline/
│   │   ├── collector.py        # Orquesta todos los scrapers
│   │   ├── filter.py           # Filtrado con Claude API
│   │   ├── enricher.py         # Enriquecimiento con Claude API
│   │   ├── image_gen.py        # Generación de imágenes con Gemini
│   │   └── publisher.py        # Publica en PostgreSQL
│   ├── models/
│   │   └── schemas.py          # Pydantic models
│   ├── config.py
│   ├── main.py                 # Entry point
│   └── requirements.txt
│
├── PROYECTO.md                 # Este archivo
├── .env.example                # Variables de entorno necesarias
└── README.md                   # Documentación pública del repo
```

---

## 12. Variables de entorno necesarias

```env
# Base de datos PostgreSQL (Hetzner/Coolify)
DATABASE_URL=postgresql://user:password@host:5432/offradar

# Claude API (máxima calidad)
ANTHROPIC_API_KEY=

# Gemini API (generación de imágenes)
GEMINI_API_KEY=

# GitHub
GITHUB_TOKEN=

# Product Hunt
PRODUCTHUNT_API_KEY=
PRODUCTHUNT_API_SECRET=

# Reddit
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=

# Twitter/X API
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=

# Resend (newsletter)
RESEND_API_KEY=

# Web
NEXT_PUBLIC_SITE_URL=https://offradar.es

# Storage (si se usa Cloudflare R2)
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ENDPOINT=
```

---

## 13. Infraestructura y deploy

### Servidor Hetzner + Coolify

Todo el proyecto se despliega en un servidor Hetzner gestionado con Coolify:

| Servicio | Gestión |
|----------|---------|
| **Next.js app** | Coolify (deploy automático desde GitHub guillerm07) |
| **PostgreSQL** | Coolify (servicio de base de datos) |
| **Python scrapers** | Cron jobs en el servidor |
| **Umami analytics** | Coolify (servicio adicional) |
| **Imágenes/storage** | Filesystem del servidor o Cloudflare R2 |

### Desarrollo local

- **Sin Docker** — desarrollo con Node.js y Python directamente
- **Base de datos**: Si se necesita para desarrollo, conectar directamente a la DB del servidor Hetzner (o crear una DB temporal allí)
- **Deploy**: Push a GitHub (guillerm07) → Coolify detecta y despliega automáticamente

---

## 14. Consideraciones legales

- **Scraping**: Respetar robots.txt y ToS de cada fuente. Preferir APIs oficiales siempre que existan.
- **Contenido**: Los resúmenes generados por IA son contenido original derivado. No copiar READMEs textualmente.
- **GDPR/LOPD**: Para la newsletter, implementar double opt-in y opción de baja fácil.
- **Rate limiting**: Ser buen ciudadano — no saturar APIs. Implementar backoff exponencial.
- **Atribución**: Siempre enlazar a la fuente original y dar crédito a los autores.
- **Imágenes**: Las imágenes generadas por IA son propias, no hay problemas de copyright.

---

## 15. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| APIs cambian/se restringen | Múltiples fuentes, no depender de una sola |
| Coste de Claude API crece | Monitorizar uso, ajustar frecuencia de scraping si necesario |
| Contenido IA de baja calidad | Usar siempre el mejor modelo, review manual los primeros meses, ajustar prompts iterativamente |
| Competencia (alguien hace lo mismo) | Velocidad de ejecución + marca personal + comunidad como moat |
| SEO tarda en funcionar | Complementar con X/Twitter automático desde el día 1 |
| Scraping bloqueado | Rotar user agents, usar proxies si necesario, priorizar APIs |
| Servidor Hetzner cae | Backups automáticos de Coolify, alertas de monitorización |

---

## 16. Credenciales pendientes

Guillermo proporcionará cuando sea necesario:

- [ ] Credenciales SSH del servidor Hetzner
- [ ] Acceso a Coolify (URL del panel + auth)
- [ ] Token de GitHub (cuenta guillerm07)
- [ ] API key de Anthropic (Claude)
- [ ] API key de Gemini (cuenta nanobanana2)
- [ ] API keys de Twitter/X
- [ ] API key de Resend
- [ ] Token de GitHub (PAT para scraper)
- [ ] Credenciales de Product Hunt API
- [ ] Credenciales de Reddit API

---

*Documento actualizado: 2 de abril de 2026*
*Estado: Planificación — listo para empezar Fase 1*
*Próximo paso: Empezar desarrollo del MVP*

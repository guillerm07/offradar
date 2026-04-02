import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Terminal, Workflow, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getProjectsWithClaudeCode } from "@/lib/queries";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hazlo con Claude Code — Personaliza herramientas y automatiza sin n8n",
  description:
    "Proyectos open source que puedes personalizar con Claude Code e ideas de automatizaciones que otros hacen con n8n o Zapier, explicadas para hacerlas directamente con Code.",
};

export const dynamic = "force-dynamic";

const automations = [
  {
    title: "Generador de vídeos virales para TikTok y YouTube",
    source: "n8n template — 214.907 vistas",
    description: "Uno de los workflows más populares de n8n genera vídeos automáticamente: coge un tema de un Google Sheet, genera el guión con GPT, crea el vídeo con IA (Seedance/Veo3) y lo sube a TikTok, YouTube e Instagram.",
    withCode: "Con Claude Code puedes construir un script Python que haga exactamente lo mismo: lee temas de un CSV, genera guiones con la API de Claude, crea vídeos con la API de Runway o Pika, y los sube a las plataformas con sus APIs. Sin n8n, sin nodos visuales, todo en un script que ejecutas cuando quieras.",
    difficulty: "Medio",
    original_url: "https://n8n.io/workflows/5338",
  },
  {
    title: "Chatbot de WhatsApp con RAG para atención al cliente",
    source: "n8n template — 46.989 vistas",
    description: "Un workflow de n8n que conecta WhatsApp Business con un agente de IA que consulta tus documentos (PDFs, Google Docs) para responder preguntas de clientes automáticamente, con soporte para texto, voz, imágenes y archivos.",
    withCode: "Con Claude Code puedes montar un servidor Express/FastAPI que reciba webhooks de la API de WhatsApp Business, procese el mensaje con Claude (adjuntando tus documentos como contexto), y responda automáticamente. Para RAG avanzado, añade una base de datos vectorial como ChromaDB. Todo en ~200 líneas de código.",
    difficulty: "Medio",
    original_url: "https://n8n.io/workflows/4827",
  },
  {
    title: "Publicación automática en LinkedIn con IA",
    source: "n8n template — 20.561 vistas",
    description: "Un flujo que genera contenido para LinkedIn automáticamente: crea el texto del post con GPT-4, genera una imagen con DALL-E, y lo programa para publicar en los horarios de mayor engagement.",
    withCode: "Con Claude Code puedes crear un script que genere posts de LinkedIn con la API de Claude (mejor calidad de texto que GPT), genere la imagen con Gemini Nano Banana, y publique directamente con la API de LinkedIn. Puedes programarlo con un simple cron job. Sin dependencia de n8n ni de sus servidores.",
    difficulty: "Fácil",
    original_url: "https://n8n.io/workflows/4968",
  },
  {
    title: "Monitor de precios con alertas por Telegram",
    source: "Idea popular en n8n",
    description: "Un workflow que visita periódicamente webs de tiendas, extrae el precio de productos específicos, lo compara con el precio anterior, y te envía un mensaje de Telegram cuando el precio baja.",
    withCode: "Con Claude Code + Browser Use (o Playwright directo), puedes crear un script que visite las URLs que quieras, extraiga los precios con IA (sin selectores CSS frágiles), los guarde en una base de datos SQLite, y te avise por Telegram cuando bajen. Lo ejecutas cada hora con un cron job y tienes tu propio monitor de precios.",
    difficulty: "Fácil",
    original_url: null,
  },
  {
    title: "Resumen automático diario de noticias por email",
    source: "Idea popular en n8n",
    description: "Un flujo que recopila noticias de múltiples fuentes RSS, las resume con IA, genera un email bien formateado con las noticias más relevantes del día, y te lo envía cada mañana.",
    withCode: "Con Claude Code puedes construir un script que lea feeds RSS con feedparser, resuma las noticias más importantes con Claude, genere un HTML bonito con las noticias del día, y lo envíe con Resend o cualquier servicio SMTP. Un cron a las 8:00 y cada mañana tienes tu briefing personalizado en el correo.",
    difficulty: "Fácil",
    original_url: null,
  },
];

export default async function HazloConCodePage() {
  const projects = await getProjectsWithClaudeCode();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Hazlo con{" "}
            <span className="text-gradient">Claude Code</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl">
          Dos formas de sacar partido a Claude Code: personalizando herramientas
          open source para hacerlas tuyas, y construyendo automatizaciones que otros
          montan con n8n o Zapier pero directamente con código.
        </p>
      </div>

      {/* Section 1: Personalize tools */}
      {projects.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">Personaliza herramientas</h2>
          </div>
          <p className="text-sm text-muted mb-6 max-w-xl">
            Clona estos repos y usa Claude Code para adaptarlos a tus necesidades:
            añadir funciones, integrar APIs, cambiar el diseño, automatizar procesos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white shrink-0">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/proyecto/${project.seoSlug}`}
                      className="text-base font-bold transition-colors hover:text-accent truncate block"
                    >
                      {project.name}
                    </Link>
                    <div className="flex gap-1.5 mt-1">
                      <Badge variant="accent" className="text-[10px]">Claude Code</Badge>
                      {project.difficulty && (
                        <Badge className={`text-[10px] ${getDifficultyColor(project.difficulty)}`}>
                          {getDifficultyLabel(project.difficulty)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
                  {project.replicableWithCode}
                </p>

                <Link
                  href={`/proyecto/${project.seoSlug}`}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  Hazlo tuyo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Automations from n8n → Claude Code */}
      <section className="mt-16">
        <div className="flex items-center gap-2 mb-6">
          <Workflow className="h-5 w-5 text-success" />
          <h2 className="text-xl font-bold">Automatizaciones sin n8n</h2>
        </div>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Estas son automatizaciones populares que la gente hace con n8n o Zapier.
          Pero no necesitas herramientas visuales de workflows — con Claude Code
          puedes construir lo mismo directamente con código, más rápido y sin
          dependencias.
        </p>

        <div className="space-y-5 stagger">
          {automations.map((auto) => (
            <div
              key={auto.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-success/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 shrink-0">
                  <Workflow className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold">{auto.title}</h3>
                    <Badge
                      className={
                        auto.difficulty === "Fácil"
                          ? "text-success bg-success/10 border-success/20"
                          : "text-warning bg-warning/10 border-warning/20"
                      }
                    >
                      {auto.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted mt-1">{auto.source}</p>

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* What n8n does */}
                    <div className="rounded-xl bg-surface-hover/50 p-4">
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                        Lo que hace el workflow
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        {auto.description}
                      </p>
                    </div>

                    {/* How to do it with Claude Code */}
                    <div className="rounded-xl bg-accent-soft/50 border border-accent/10 p-4">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
                        Cómo hacerlo con Claude Code
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        {auto.withCode}
                      </p>
                    </div>
                  </div>

                  {auto.original_url && (
                    <a
                      href={auto.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs text-muted hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Ver template original en n8n
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft/50 p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Quieres aprender a construir estas automatizaciones?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Cada semana añadimos nuevas ideas y guías paso a paso.
          Suscríbete para no perderte nada.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Suscribirme a la newsletter
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

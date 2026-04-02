import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Terminal, Workflow } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getProjectsWithClaudeCode } from "@/lib/queries";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import { automations } from "@/lib/automations-data";

export const metadata: Metadata = {
  title: "Hazlo con Claude Code — Personaliza herramientas y automatiza sin n8n",
  description:
    "Proyectos open source que puedes personalizar con Claude Code e ideas de automatizaciones que otros hacen con n8n o Zapier, explicadas para hacerlas directamente con Code.",
};

export const dynamic = "force-dynamic";

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
          Automatizaciones populares que la gente hace con n8n o Zapier,
          explicadas para hacerlas directamente con Claude Code. Cada una incluye
          guía paso a paso con código.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {automations.map((auto) => (
            <Link
              key={auto.slug}
              href={`/hazlo-con-code/${auto.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:border-success/30 hover:shadow-lg hover:shadow-success/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success transition-colors group-hover:bg-success group-hover:text-white shrink-0">
                  <Workflow className="h-5 w-5" />
                </div>
                <div className="flex gap-1.5">
                  <Badge
                    className={
                      auto.difficulty === "Fácil"
                        ? "text-success bg-success/10 border-success/20 text-[10px]"
                        : "text-warning bg-warning/10 border-warning/20 text-[10px]"
                    }
                  >
                    {auto.difficulty}
                  </Badge>
                  <Badge variant="accent" className="text-[10px]">Claude Code</Badge>
                </div>
              </div>

              <h3 className="mt-3 text-base font-bold line-clamp-2 group-hover:text-success transition-colors">
                {auto.title}
              </h3>

              <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
                {auto.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-success">
                Ver guía paso a paso
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft/50 p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Quieres más guías de automatización con Code?
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

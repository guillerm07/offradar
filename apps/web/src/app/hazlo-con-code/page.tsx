import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Terminal } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getProjectsWithClaudeCode } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Hazlo tuyo con Claude Code — Personaliza y amplía herramientas open source",
  description:
    "Proyectos open source que puedes personalizar, ampliar y hacer tuyos con Claude Code. Instrucciones paso a paso para replicar y adaptar cada herramienta.",
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
            Hazlo tuyo con{" "}
            <span className="text-gradient">Claude Code</span>
          </h1>
        </div>
        <p className="text-muted max-w-xl">
          Estos proyectos open source se pueden personalizar, ampliar y adaptar
          a tus necesidades usando Claude Code. Cada uno incluye instrucciones
          para hacerlo tuyo.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Terminal className="h-5 w-5" />
              </div>

              {/* Info */}
              <h2 className="mt-4 text-lg font-bold">
                <Link
                  href={`/proyecto/${project.seoSlug}`}
                  className="transition-colors hover:text-accent"
                >
                  {project.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 flex-1">
                {project.replicableWithCode}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="accent">
                  <Zap className="h-3 w-3 mr-1" />
                  Claude Code
                </Badge>
                {project.difficulty && (
                  <Badge
                    className={
                      project.difficulty === "facil"
                        ? "text-success bg-success/10 border-success/20"
                        : project.difficulty === "medio"
                          ? "text-warning bg-warning/10 border-warning/20"
                          : "text-danger bg-danger/10 border-danger/20"
                    }
                  >
                    {project.difficulty === "facil"
                      ? "Fácil"
                      : project.difficulty === "medio"
                        ? "Medio"
                        : "Difícil"}
                  </Badge>
                )}
                {project.language && (
                  <Badge variant="outline">{project.language}</Badge>
                )}
              </div>

              {/* CTA */}
              <Link
                href={`/proyecto/${project.seoSlug}`}
                className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                <Zap className="h-4 w-4" />
                Hazlo tuyo
              </Link>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-6">
            <Zap className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold">Próximamente</h2>
          <p className="mt-3 text-sm text-muted max-w-md mx-auto leading-relaxed">
            Estamos preparando los primeros proyectos con instrucciones
            detalladas para que los hagas tuyos con Claude Code. Suscríbete
            para ser el primero en saberlo.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Avisadme cuando esté listo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Bottom CTA */}
      {projects.length > 0 && (
        <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold">
            ¿Quieres aprender a usar Claude Code?
          </h3>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">
            Cada semana añadimos nuevos proyectos con instrucciones para
            personalizarlos. Suscríbete y recibe las guías en tu email.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Suscribirme a la newsletter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

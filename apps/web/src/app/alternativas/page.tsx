import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScoreRing from "@/components/ui/ScoreRing";
import { formatNumber, getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import { getAlternativeProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Alternativas Open Source — Usa esto gratis en vez de pagar",
  description:
    "Descubre las mejores alternativas open source y gratuitas a productos de pago como Zapier, ChatGPT, Google Photos y más.",
};

export const dynamic = "force-dynamic";

export default async function AlternativasPage() {
  const alternatives = await getAlternativeProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Alternativas{" "}
          <span className="text-gradient">Open Source</span>
        </h1>
        <p className="mt-2 text-muted max-w-xl">
          Deja de pagar por software que tiene una alternativa gratuita y open
          source. Instálalo en tu servidor y toma el control.
        </p>
      </div>

      <div className="space-y-4 stagger">
        {alternatives.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Score */}
            <ScoreRing score={project.interestScore ?? 0} size={52} className="shrink-0" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/proyecto/${project.seoSlug}`}
                  className="text-lg font-bold transition-colors hover:text-accent"
                >
                  {project.name}
                </Link>
                <Badge variant="accent">
                  Alternativa a {project.alternativeTo}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted line-clamp-2">
                {project.summaryEs || project.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {project.difficulty && (
                  <Badge className={getDifficultyColor(project.difficulty)}>
                    {getDifficultyLabel(project.difficulty)}
                  </Badge>
                )}
                {(project.stars ?? 0) > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Star className="h-3 w-3" />
                    {formatNumber(project.stars!)}
                  </span>
                )}
                {project.language && (
                  <Badge variant="outline">{project.language}</Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground hover:bg-surface-hover"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link
                href={`/proyecto/${project.seoSlug}`}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Ver más
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, Sparkles, Terminal } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { novedades } from "@/lib/novedades-data";

export const metadata: Metadata = {
  title: "Novedades — Software recién lanzado que merece tu atención",
  description:
    "Descubre software nuevo, lanzamientos recientes de Product Hunt y herramientas innovadoras que están redefiniendo categorías. Proyectos frescos que puedes clonar con código.",
};

export default function NovedadesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Rocket className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Novedades{" "}
            <span className="text-gradient">Software recién lanzado</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl">
          Herramientas nuevas, lanzamientos recientes de Product Hunt y
          proyectos innovadores que están redefiniendo categorías. Esto no es
          trending de GitHub — es software fresco que acaba de nacer y que
          merece tu atención.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6 stagger">
        {novedades.map((item) => (
          <article
            key={item.slug}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Top row: icon + name + badges */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Rocket className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {item.name}
                  </h2>
                  <Badge variant="success">Nuevo</Badge>
                  <Badge variant="accent">{item.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.tagline}
                </p>
              </div>
            </div>

            {/* Summary (line-clamped) */}
            <div className="mt-4 space-y-2">
              {item.summary
                .split("\n\n")
                .slice(0, 3)
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm text-foreground/80 leading-relaxed line-clamp-3 first:line-clamp-none"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Bottom row: clonable indicator + CTA */}
            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              {item.clonableWithCode && (
                <div className="flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-1.5 border border-accent/20">
                  <Terminal className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-semibold text-accent">
                    Clonable con código
                  </span>
                </div>
              )}

              <Link
                href={`/novedades/${item.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Ver análisis completo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-3">
          <Sparkles className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-lg font-bold">
          ¿Conoces un proyecto que acaba de lanzarse?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Publicamos novedades cada semana. Suscríbete para recibir los
          lanzamientos más interesantes en tu email.
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

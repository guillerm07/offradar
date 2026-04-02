import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Star, ExternalLink, ArrowRight, AlertTriangle, Check, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScoreRing from "@/components/ui/ScoreRing";
import { formatNumber, getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import { getAlternativesFor } from "@/lib/queries";
import { getProductBySlug } from "@/lib/alternatives-data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `Alternativa a ${product.name} — Open source y gratuita`,
    description: `Las mejores alternativas open source a ${product.name}. Gratuitas, self-hosteables y sin depender de terceros. ${product.whyAlternative.slice(0, 100)}`,
  };
}

export default async function AlternativaDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const alternatives = await getAlternativesFor(product.alternativeTo);
  if (alternatives.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `Alternativa a ${product.name}: opciones open source gratuitas`,
            description: product.whyAlternative,
          }),
        }}
      />

      <Link
        href="/alternativas"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Todas las alternativas
      </Link>

      {/* Product header */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{product.icon}</span>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Alternativa a{" "}
              <span className="text-gradient">{product.name}</span>
            </h1>
            <p className="mt-1 text-sm text-warning font-medium">
              {product.price}
            </p>
          </div>
        </div>

        <p className="mt-4 text-muted leading-relaxed">
          {product.description}
        </p>

        <div className="mt-5 rounded-xl border border-warning/20 bg-warning/5 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-warning">
                ¿Por qué buscar alternativa?
              </p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {product.whyAlternative}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro text */}
      {product.introText && (
        <div className="mt-8 text-muted leading-relaxed">
          <p>{product.introText}</p>
        </div>
      )}

      {/* Alternatives */}
      <h2 className="mt-10 text-xl font-bold mb-6">
        {alternatives.length} {alternatives.length === 1 ? "alternativa open source" : "alternativas open source"}
      </h2>

      <div className="space-y-5">
        {alternatives.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image */}
              {project.featuredImageUrl ? (
                <img
                  src={project.featuredImageUrl}
                  alt={project.name}
                  className="w-full sm:w-40 h-24 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="flex w-full sm:w-40 h-24 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-[var(--gradient-end)]/10 shrink-0">
                  <span className="text-3xl font-black text-accent/20">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/proyecto/${project.seoSlug}`}
                      className="text-xl font-bold transition-colors hover:text-accent"
                    >
                      {project.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      {project.difficulty && (
                        <Badge className={getDifficultyColor(project.difficulty)}>
                          {getDifficultyLabel(project.difficulty)}
                        </Badge>
                      )}
                      {project.language && (
                        <Badge variant="outline">{project.language}</Badge>
                      )}
                      {(project.stars ?? 0) > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Star className="h-3 w-3" />
                          {formatNumber(project.stars!)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ScoreRing score={project.interestScore ?? 0} size={46} className="shrink-0" />
                </div>

                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {project.summaryEs
                    ? project.summaryEs.split("\n").slice(0, 2).join(" ").slice(0, 400) + (project.summaryEs.length > 400 ? "..." : "")
                    : project.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={`/proyecto/${project.seoSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Ver análisis completo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What you gain/lose */}
      {product.whatYouGain && product.whatYouGain.length > 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <h3 className="text-base font-bold text-success mb-4">
              ✓ Lo que ganas con la alternativa
            </h3>
            <ul className="space-y-3">
              {product.whatYouGain.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-danger/20 bg-danger/5 p-6">
            <h3 className="text-base font-bold text-danger mb-4">
              ✗ Lo que pierdes al cambiar
            </h3>
            <ul className="space-y-3">
              {product.whatYouLose.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Detailed comparison */}
      {product.detailedComparison && (
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h3 className="text-base font-bold mb-3">El veredicto</h3>
          <p className="text-sm text-muted leading-relaxed">{product.detailedComparison}</p>
        </div>
      )}

      {/* Conclusion text */}
      {product.conclusionText && (
        <div className="mt-6 rounded-xl border border-accent/20 bg-accent-soft/30 p-6">
          <h3 className="text-base font-bold mb-3 text-accent">Nuestra recomendación</h3>
          <p className="text-sm text-muted leading-relaxed">{product.conclusionText}</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft/50 p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Conoces otra alternativa a {product.name}?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Estamos siempre buscando nuevas alternativas open source. Suscríbete
          para recibir las últimas novedades.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Suscribirme
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

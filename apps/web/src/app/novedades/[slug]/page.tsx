import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Rocket,
  Terminal,
} from "lucide-react";
import Markdown from "react-markdown";
import Badge from "@/components/ui/Badge";
import { novedades, getNovedadBySlug } from "@/lib/novedades-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const novedad = getNovedadBySlug(slug);
  if (!novedad) return { title: "Novedad no encontrada" };

  return {
    title: `${novedad.name} — ${novedad.tagline}`,
    description: novedad.tagline,
    openGraph: {
      title: `${novedad.name} — ${novedad.tagline}`,
      description: novedad.tagline,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return novedades.map((n) => ({ slug: n.slug }));
}

export default async function NovedadDetailPage({ params }: Props) {
  const { slug } = await params;
  const novedad = getNovedadBySlug(slug);
  if (!novedad) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back */}
      <Link
        href="/novedades"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a novedades
      </Link>

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: novedad.name,
            description: novedad.tagline,
            url: novedad.url,
            applicationCategory: novedad.category,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          }),
        }}
      />

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Rocket className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="success">Nuevo</Badge>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">
            {novedad.name}
          </h1>
          <p className="mt-2 text-muted leading-relaxed">{novedad.tagline}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <Badge variant="accent">{novedad.category}</Badge>
        {novedad.clonableWithCode && (
          <div className="flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-1.5 border border-accent/20">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-accent">
              Clonable con código
            </span>
          </div>
        )}
      </div>

      {/* Full Content */}
      <article className="mt-10">
        <div
          className="
            prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[var(--muted)] prose-p:leading-[1.8] prose-p:my-4
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-4 prose-ul:space-y-2
            prose-ol:my-4 prose-ol:space-y-2
            prose-li:text-[var(--muted)] prose-li:leading-[1.7]
            prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hover hover:prose-a:underline
            prose-code:text-accent prose-code:bg-accent-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-table:border-collapse
            prose-th:border prose-th:border-border prose-th:bg-surface prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-foreground
            prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:text-[var(--muted)]
            prose-hr:border-border prose-hr:my-8
            prose-blockquote:border-accent prose-blockquote:bg-accent-soft/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          "
        >
          <Markdown>{novedad.fullContent}</Markdown>
        </div>
      </article>

      {/* External link */}
      <div className="mt-10">
        <a
          href={novedad.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          <ExternalLink className="h-4 w-4" />
          Visitar {novedad.name}
        </a>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Quieres descubrir más herramientas como esta?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Publicamos novedades cada semana. Suscríbete para recibir los
          lanzamientos más interesantes directamente en tu email.
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

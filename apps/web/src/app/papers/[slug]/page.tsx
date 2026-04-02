import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code,
  ExternalLink,
  FileText,
  Lightbulb,
  Tag,
  Users,
} from "lucide-react";
import Markdown from "react-markdown";
import Badge from "@/components/ui/Badge";
import { papers, getPaperBySlug } from "@/lib/papers-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return { title: "Paper no encontrado" };

  return {
    title: `${paper.title} — Paper explicado en español`,
    description: paper.whyItMatters,
    openGraph: {
      title: `${paper.title} — Paper explicado en español`,
      description: paper.whyItMatters,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export default async function PaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back */}
      <Link
        href="/papers"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a papers
      </Link>

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            name: paper.title,
            author: paper.authors.split(", ").map((a) => ({
              "@type": "Person",
              name: a,
            })),
            publisher: {
              "@type": "Organization",
              name: paper.institution,
            },
            datePublished: `${paper.year}`,
            description: paper.whyItMatters,
            url: paper.arxivUrl,
          }),
        }}
      />

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {paper.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted flex-wrap">
            <Users className="h-4 w-4 shrink-0" />
            <span>{paper.authors}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted flex-wrap">
            <span className="font-medium text-foreground/80">
              {paper.institution}
            </span>
            <span className="text-border">|</span>
            <span>{paper.year}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-5 flex items-center gap-2 flex-wrap">
        <Tag className="h-3.5 w-3.5 text-muted" />
        {paper.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Why it matters callout */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent-soft p-4 border border-accent/20">
        <Lightbulb className="h-4 w-4 text-accent mt-0.5 shrink-0" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Por qué importa
          </span>
          <p className="mt-1 text-sm text-foreground/90 leading-relaxed font-medium">
            {paper.whyItMatters}
          </p>
        </div>
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
          <Markdown>{paper.fullContent}</Markdown>
        </div>
      </article>

      {/* External links */}
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={paper.arxivUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:border-accent/30"
        >
          <FileText className="h-3.5 w-3.5" />
          Leer paper original en arXiv
          <ExternalLink className="h-3 w-3" />
        </a>
        {paper.codeUrl && (
          <a
            href={paper.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:border-accent/30"
          >
            <Code className="h-3.5 w-3.5" />
            Ver código fuente
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Quieres recibir papers explicados cada semana?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Cada semana seleccionamos un paper relevante de IA y lo explicamos en
          español, sin jerga y con contexto práctico.
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

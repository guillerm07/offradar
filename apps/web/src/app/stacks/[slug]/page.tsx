import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Layers, Clock, Zap } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Badge from "@/components/ui/Badge";
import { stacks, getStackBySlug } from "@/lib/stacks-data";

type Props = {
  params: Promise<{ slug: string }>;
};

const difficultyConfig: Record<string, string> = {
  "Fácil": "text-success bg-success/10 border-success/20",
  "Medio": "text-warning bg-warning/10 border-warning/20",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) return { title: "Stack no encontrado" };

  return {
    title: `${stack.title} — Stack Open Source`,
    description: stack.problem,
    openGraph: {
      title: `${stack.title} — Stack Open Source`,
      description: stack.problem,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return stacks.map((s) => ({ slug: s.slug }));
}

export default async function StackDetailPage({ params }: Props) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back */}
      <Link
        href="/stacks"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a stacks
      </Link>

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: stack.title,
            description: stack.problem,
            step: stack.steps.map((step, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text: step,
            })),
          }),
        }}
      />

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Layers className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {stack.title}
          </h1>
          <p className="mt-2 text-muted leading-relaxed">
            <span className="font-semibold text-foreground">Problema:</span>{" "}
            {stack.problem}
          </p>
        </div>
      </div>

      {/* Difficulty + Time */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <Badge className={difficultyConfig[stack.difficulty]}>
          {stack.difficulty}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted">
          <Clock className="h-4 w-4" />
          {stack.time}
        </div>
      </div>

      {/* Key benefit callout */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent-soft p-4 border border-accent/20">
        <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Beneficio clave
          </span>
          <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
            {stack.keyBenefit}
          </p>
        </div>
      </div>

      {/* Tools */}
      <div className="mt-8 space-y-3">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">
          Herramientas del stack
        </h2>
        {stack.tools.map((tool, i) => (
          <div key={tool.slug} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/proyecto/${tool.slug}`}
                className="font-semibold text-foreground transition-colors hover:text-accent"
              >
                {tool.name}
              </Link>
              <p className="text-sm text-muted">{tool.role}</p>
            </div>
            <Link
              href={`/proyecto/${tool.slug}`}
              className="shrink-0 flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Ver
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
          Pasos rápidos
        </h2>
        <ol className="space-y-3">
          {stack.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-accent/30 text-xs font-bold text-accent mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-muted leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Detailed Guide */}
      <article className="mt-12">
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
          <Markdown remarkPlugins={[remarkGfm]}>{stack.detailedGuide}</Markdown>
        </div>
      </article>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Te ha sido útil esta guía?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Publicamos nuevos stacks cada semana. Suscríbete para recibir guías
          prácticas directamente en tu email.
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

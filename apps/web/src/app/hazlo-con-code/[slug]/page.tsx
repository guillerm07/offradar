import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Workflow, ExternalLink, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Markdown from "react-markdown";
import { getAutomationBySlug, automations } from "@/lib/automations-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const auto = getAutomationBySlug(slug);
  if (!auto) return { title: "No encontrado" };

  return {
    title: `${auto.title} — Hazlo con Claude Code`,
    description: `Aprende a construir "${auto.title}" con Claude Code en vez de usar n8n o Zapier. Guía paso a paso con código.`,
  };
}

export default async function AutomationDetailPage({ params }: Props) {
  const { slug } = await params;
  const auto = getAutomationBySlug(slug);
  if (!auto) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/hazlo-con-code"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Hazlo con Code
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 shrink-0">
          <Workflow className="h-6 w-6 text-success" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {auto.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge
              className={
                auto.difficulty === "Fácil"
                  ? "text-success bg-success/10 border-success/20"
                  : "text-warning bg-warning/10 border-warning/20"
              }
            >
              {auto.difficulty}
            </Badge>
            <Badge variant="accent">Claude Code</Badge>
            <span className="text-xs text-muted">{auto.source}</span>
          </div>
        </div>
      </div>

      {/* Comparison boxes */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-surface-hover/50 border border-border p-5">
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
            Lo que hace el workflow original
          </p>
          <p className="text-sm text-muted leading-relaxed">
            {auto.description}
          </p>
        </div>
        <div className="rounded-xl bg-accent-soft/50 border border-accent/10 p-5">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
            Cómo hacerlo con Claude Code
          </p>
          <p className="text-sm text-muted leading-relaxed">
            {auto.withCode}
          </p>
        </div>
      </div>

      {auto.originalUrl && (
        <a
          href={auto.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          Ver template original en n8n
        </a>
      )}

      {/* Full guide */}
      <article className="mt-10">
        <h2 className="text-xl font-bold mb-6 pb-3 border-b border-border">
          Guía paso a paso
        </h2>
        <div
          className="
            prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[var(--muted)] prose-p:leading-[1.8] prose-p:my-4
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-4 prose-ul:space-y-2
            prose-li:text-[var(--muted)] prose-li:leading-[1.7]
            prose-code:text-accent prose-code:bg-accent-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          "
        >
          <Markdown>{auto.fullGuide}</Markdown>
        </div>
      </article>

      {/* More automations */}
      <div className="mt-12 border-t border-border pt-8">
        <h3 className="text-lg font-bold mb-4">Más automatizaciones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {automations
            .filter((a) => a.slug !== slug)
            .slice(0, 4)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/hazlo-con-code/${a.slug}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30"
              >
                <Workflow className="h-5 w-5 text-success shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{a.title}</p>
                  <p className="text-xs text-muted">{a.difficulty}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl border border-accent/20 bg-accent-soft/50 p-6 text-center">
        <h3 className="text-base font-bold">¿Quieres más guías como esta?</h3>
        <p className="mt-1 text-sm text-muted">
          Cada semana publicamos nuevas automatizaciones explicadas paso a paso.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 mt-3 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Suscribirme
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

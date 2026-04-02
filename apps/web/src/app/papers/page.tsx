import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  Lightbulb,
  Tag,
  Users,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { papers } from "@/lib/papers-data";

export const metadata: Metadata = {
  title: "Papers explicados — Los papers de IA más importantes, en español",
  description:
    "Los papers de inteligencia artificial que han cambiado la industria, explicados de forma accesible en español. Transformers, LoRA, Constitutional AI y más.",
};

export default function PapersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <BookOpen className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Papers{" "}
            <span className="text-gradient">explicados</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl">
          Los papers de inteligencia artificial más importantes, explicados en
          español de forma accesible. Sin jerga innecesaria, con contexto
          práctico y enfocados en por qué importan.
        </p>
      </div>

      {/* Paper Cards */}
      <div className="space-y-8 stagger">
        {papers.map((paper) => (
          <article
            key={paper.slug}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {paper.title}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted flex-wrap">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{paper.authors}</span>
                  <span className="text-border">|</span>
                  <span className="font-medium">{paper.institution}</span>
                  <span className="text-border">|</span>
                  <span>{paper.year}</span>
                </div>
              </div>
            </div>

            {/* Why it matters callout */}
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-accent-soft p-4 border border-accent/20">
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

            {/* Summary */}
            <div className="mt-5 space-y-3">
              {paper.summary.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-foreground/80 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
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

            {/* Links */}
            <div className="mt-5 pt-5 border-t border-border/50 flex flex-wrap items-center gap-3">
              <Link
                href={`/papers/${paper.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Leer explicación completa
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <span className="text-border">|</span>

              <a
                href={paper.arxivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <FileText className="h-3.5 w-3.5" />
                arXiv
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
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

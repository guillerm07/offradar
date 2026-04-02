import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Clock, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { stacks } from "@/lib/stacks-data";

export const metadata: Metadata = {
  title: "Stacks — Combinaciones de herramientas que resuelven problemas reales",
  description:
    "Combinaciones curadas de herramientas open source que, juntas, resuelven un problema completo: tu propio ChatGPT privado, monitorización de homelab, CRM + soporte para tu negocio y más.",
};

const difficultyConfig: Record<string, string> = {
  "Fácil": "text-success bg-success/10 border-success/20",
  "Medio": "text-warning bg-warning/10 border-warning/20",
};

export default function StacksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Layers className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Stacks{" "}
            <span className="text-gradient">Open Source</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl">
          Combinaciones curadas de herramientas que, juntas, resuelven un
          problema completo. Cada stack incluye qué herramientas usar, cómo
          conectarlas paso a paso y una guía detallada.
        </p>
      </div>

      {/* Stack Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger">
        {stacks.map((stack) => (
          <article
            key={stack.slug}
            className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 flex flex-col"
          >
            {/* Icon + Title */}
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Layers className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold leading-tight">
                  {stack.title}
                </h2>
              </div>
            </div>

            {/* Problem */}
            <p className="mt-3 text-sm text-muted leading-relaxed">
              <span className="font-semibold text-foreground">Problema:</span>{" "}
              {stack.problem}
            </p>

            {/* Tool badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.tools.map((tool) => (
                <Link key={tool.slug} href={`/proyecto/${tool.slug}`}>
                  <Badge variant="accent">{tool.name}</Badge>
                </Link>
              ))}
            </div>

            {/* Difficulty + Time */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <Badge className={difficultyConfig[stack.difficulty]}>
                {stack.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" />
                {stack.time}
              </div>
            </div>

            {/* Key benefit callout */}
            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-accent-soft p-3 border border-accent/20">
              <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Beneficio clave
                </span>
                <p className="mt-0.5 text-xs text-foreground/80 leading-relaxed">
                  {stack.keyBenefit}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-5">
              <Link
                href={`/stacks/${stack.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Ver guía completa
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Tienes un stack que funciona bien?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Estamos ampliando esta sección con nuevas combinaciones cada semana.
          Suscríbete para no perderte las novedades.
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

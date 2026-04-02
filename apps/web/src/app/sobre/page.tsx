import type { Metadata } from "next";
import Link from "next/link";
import { Radar, ArrowRight, Brain, Zap, Globe, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre OffRadar",
  description:
    "OffRadar descubre y explica automáticamente las mejores herramientas tech. Conoce el proyecto y la persona detrás.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Logo */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[var(--gradient-end)] shadow-lg shadow-accent/20 mb-8">
        <Radar className="h-7 w-7 text-white" strokeWidth={2.5} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
        Sobre <span className="text-gradient">OffRadar</span>
      </h1>

      <div className="mt-8 space-y-6 text-muted leading-relaxed">
        <p className="text-lg">
          En Twitter/X hay gente compartiendo repos de GitHub interesantes a
          diario. El problema es que un hilo no da espacio para explicar bien
          las cosas. OffRadar nace para resolver eso.
        </p>

        <p>
          Esta plataforma <strong className="text-foreground">descubre automáticamente</strong>{" "}
          los repos, herramientas de IA, papers y productos más interesantes de
          fuentes como GitHub, Hacker News, Product Hunt, Hugging Face, ArXiv y
          más. Luego los <strong className="text-foreground">analiza con IA</strong> y los
          explica en profundidad, en español, con imágenes y contenido de valor
          real.
        </p>

        <p>
          No es otro listado más. Aquí encontrarás alternativas open source a
          productos de pago, stacks completos que resuelven problemas reales,
          papers explicados sin jerga, y herramientas que puedes replicar con
          Claude Code o automatizar con n8n.
        </p>
      </div>

      {/* How it works */}
      <h2 className="text-2xl font-bold mt-14 mb-6">Cómo funciona</h2>

      <div className="space-y-4">
        {[
          {
            icon: <Globe className="h-5 w-5" />,
            title: "Recolección automática",
            desc: "Nuestros scrapers monitorizan 9+ fuentes de datos cada 12 horas buscando lo más relevante.",
          },
          {
            icon: <Brain className="h-5 w-5" />,
            title: "Análisis con IA",
            desc: "Cada proyecto se filtra, analiza y enriquece con Claude API para generar contenido de calidad profesional en español.",
          },
          {
            icon: <Zap className="h-5 w-5" />,
            title: "Publicación instantánea",
            desc: "El contenido se publica en la web, se envía por newsletter y se comparte automáticamente en X/Twitter.",
          },
        ].map((step, i) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {step.icon}
            </div>
            <div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Creator */}
      <h2 className="text-2xl font-bold mt-14 mb-6">Quién está detrás</h2>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[var(--gradient-end)] text-xl font-bold text-white">
            G
          </div>
          <div>
            <h3 className="text-lg font-bold">Guillermo del Pino</h3>
            <p className="text-sm text-muted">
              Desarrollador, creador de OffRadar
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Apasionado del open source, la automatización y la inteligencia
          artificial. Creé OffRadar porque me frustraba no tener un sitio donde
          encontrar las herramientas tech más interesantes bien explicadas y en
          español. Si te gusta lo que hago, suscríbete a la newsletter o
          únete a la comunidad.
        </p>
        <div className="flex gap-3 mt-4">
          <Link
            href="/guillermo"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Ver mis proyectos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover"
          >
            <Mail className="h-4 w-4" />
            Newsletter
          </Link>
        </div>
      </div>
    </div>
  );
}

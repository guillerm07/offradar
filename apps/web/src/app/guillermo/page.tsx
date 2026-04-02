import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, BookOpen, Code, Sparkles } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "Guillermo del Pino — Proyectos, tutoriales y experiencias tech",
  description:
    "Desarrollador y creador de OffRadar. Tutoriales, walkthroughs de proyectos y experiencias con Claude Code, open source y automatización.",
};

const upcoming = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Tutoriales paso a paso",
    desc: "Guías detalladas para montar stacks open source, automatizar con n8n y desplegar en tu propio servidor.",
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Walkthroughs de proyectos",
    desc: "Cómo construí OffRadar, decisiones técnicas, errores cometidos y lecciones aprendidas.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Experiencias con Claude Code",
    desc: "Casos reales de uso de Claude Code para construir, refactorizar y automatizar proyectos completos.",
  },
];

export default function GuillermoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Avatar + header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[var(--gradient-end)] text-4xl font-black text-white shadow-lg shadow-accent/20">
          G
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-black tracking-tight">
          Guillermo del Pino
        </h1>
        <p className="mt-2 text-lg text-accent font-medium">
          Desarrollador y creador de OffRadar
        </p>
      </div>

      {/* Bio */}
      <div className="mt-10 space-y-5 text-muted leading-relaxed">
        <p className="text-lg">
          Apasionado del open source, la automatización y la inteligencia
          artificial. Llevo años explorando herramientas tech, montando
          servidores y buscando formas de hacer más con menos.
        </p>
        <p>
          Creé{" "}
          <Link href="/sobre" className="text-accent font-medium hover:underline">
            OffRadar
          </Link>{" "}
          porque me frustraba no tener un sitio donde encontrar las
          herramientas tech más interesantes bien explicadas y en español. Un
          lugar donde los proyectos de GitHub, los papers de IA y las
          alternativas open source se expliquen con contexto, no solo con un
          enlace.
        </p>
        <p>
          Todo lo que ves en esta web{" "}
          <strong className="text-foreground">
            se descubre, analiza y publica de forma automática
          </strong>
          , usando scrapers propios, la API de Claude y un pipeline que he
          construido pieza a pieza. Si te interesa cómo funciona por dentro,
          pronto compartiré los detalles aquí.
        </p>
      </div>

      {/* Coming soon */}
      <div className="mt-14">
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">
              Próximamente
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Contenido en camino
        </h2>
        <p className="text-muted mb-6">
          Este espacio se convertirá en un blog con contenido técnico práctico.
          Esto es lo que estoy preparando:
        </p>

        <div className="space-y-4">
          {upcoming.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-14 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
            <Mail className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              Suscríbete para no perderte nada
            </h3>
            <p className="text-sm text-muted">
              Recibirás los nuevos artículos y tutoriales directamente en tu
              email.
            </p>
          </div>
        </div>
        <NewsletterForm />
      </div>

      {/* Link to about */}
      <div className="mt-8 text-center">
        <Link
          href="/sobre"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          Conoce más sobre OffRadar
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

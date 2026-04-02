import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Comparativas — Herramienta vs herramienta",
  description:
    "Comparamos herramientas open source similares para que elijas la mejor opción. Ollama vs LocalAI, Umami vs Plausible, Notion vs AppFlowy y más.",
};

type ComparisonTool = {
  name: string;
  slug: string;
};

type ComparisonRow = {
  aspect: string;
  values: string[];
};

type Comparison = {
  title: string;
  summary: string;
  tools: ComparisonTool[];
  rows: ComparisonRow[];
};

const comparisons: Comparison[] = [
  {
    title: "Ollama vs LocalAI vs Jan: Ejecuta IA en local",
    summary:
      "Las tres mejores opciones para ejecutar modelos de lenguaje en tu propio hardware, sin enviar datos a la nube. Cada una con un enfoque distinto: CLI pura, API compatible con OpenAI, o interfaz gráfica amigable.",
    tools: [
      { name: "Ollama", slug: "ollama" },
      { name: "LocalAI", slug: "localai" },
      { name: "Jan", slug: "jan" },
    ],
    rows: [
      { aspect: "Interfaz", values: ["CLI + API", "Solo API", "App de escritorio"] },
      { aspect: "Compatibilidad OpenAI", values: ["Parcial", "Completa", "No"] },
      { aspect: "Modelos soportados", values: ["GGUF, Safetensors", "GGUF, Whisper, SD", "GGUF"] },
      { aspect: "Facilidad de uso", values: ["Media", "Media-alta", "Muy alta"] },
      { aspect: "Ideal para", values: ["Desarrolladores", "Reemplazo de OpenAI API", "Usuarios finales"] },
      { aspect: "GPU necesaria", values: ["Recomendada", "Recomendada", "Opcional"] },
    ],
  },
  {
    title: "Umami vs Plausible: Analytics sin cookies",
    summary:
      "Dos alternativas open source a Google Analytics que respetan la privacidad y no necesitan banner de cookies. Ambas son ligeras, pero tienen filosofías diferentes.",
    tools: [
      { name: "Umami", slug: "umami" },
      { name: "Plausible", slug: "plausible-analytics" },
    ],
    rows: [
      { aspect: "Stack", values: ["Node.js + PostgreSQL/MySQL", "Elixir + ClickHouse"] },
      { aspect: "Self-hosting", values: ["Muy fácil (Docker)", "Medio (requiere ClickHouse)"] },
      { aspect: "Dashboard", values: ["Limpio, multi-sitio", "Minimalista, un sitio"] },
      { aspect: "API", values: ["Completa", "Completa"] },
      { aspect: "Eventos personalizados", values: ["Sí", "Sí (Goals)"] },
      { aspect: "Precio cloud", values: ["Gratis hasta 10k", "Desde 9$/mes"] },
    ],
  },
  {
    title: "Notion vs AppFlowy: Workspace con IA",
    summary:
      "Notion domina el mercado de workspaces con IA, pero AppFlowy ofrece una alternativa open source que puedes alojar tú mismo, con tus datos bajo tu control.",
    tools: [
      { name: "Notion (propietario)", slug: "" },
      { name: "AppFlowy", slug: "appflowy" },
    ],
    rows: [
      { aspect: "Open source", values: ["No", "Sí (AGPLv3)"] },
      { aspect: "Self-hosting", values: ["No", "Sí"] },
      { aspect: "IA integrada", values: ["Sí (GPT-4)", "Sí (configurable)"] },
      { aspect: "Bases de datos", values: ["Completas", "En desarrollo"] },
      { aspect: "Colaboración", values: ["Tiempo real", "En desarrollo"] },
      { aspect: "Privacidad", values: ["Datos en su nube", "100% bajo tu control"] },
    ],
  },
];

export default function ComparativasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Scale className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Comparativas{" "}
            <span className="text-gradient">Open Source</span>
          </h1>
        </div>
        <p className="text-muted max-w-xl">
          Comparamos herramientas similares para que elijas la que mejor se
          adapta a tu caso. Sin marketing, solo datos y experiencia real.
        </p>
      </div>

      <div className="space-y-8 stagger">
        {comparisons.map((comp) => (
          <div
            key={comp.title}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Header */}
            <h2 className="text-xl sm:text-2xl font-bold">{comp.title}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">
              {comp.summary}
            </p>

            {/* Tool badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {comp.tools.map((tool) =>
                tool.slug ? (
                  <Link key={tool.name} href={`/proyecto/${tool.slug}`}>
                    <Badge variant="accent">{tool.name}</Badge>
                  </Link>
                ) : (
                  <Badge key={tool.name} variant="outline">
                    {tool.name}
                  </Badge>
                )
              )}
            </div>

            {/* Comparison table */}
            <div className="mt-6 overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 text-left font-semibold text-muted">
                      Aspecto
                    </th>
                    {comp.tools.map((tool) => (
                      <th
                        key={tool.name}
                        className="py-3 px-4 text-left font-semibold"
                      >
                        {tool.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comp.rows.map((row) => (
                    <tr
                      key={row.aspect}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-3 pr-4 text-muted font-medium">
                        {row.aspect}
                      </td>
                      {row.values.map((val, i) => (
                        <td key={i} className="py-3 px-4">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA to individual tools */}
            <div className="mt-6 flex flex-wrap gap-3">
              {comp.tools
                .filter((t) => t.slug)
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/proyecto/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:border-accent/30"
                  >
                    Ver {tool.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Echas de menos alguna comparativa?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Estamos creando nuevas comparativas cada semana. Suscríbete para
          recibirlas en tu email.
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

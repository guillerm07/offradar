import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Server, Brain, Globe } from "lucide-react";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Stacks — Combinaciones de herramientas que resuelven problemas reales",
  description:
    "Combinaciones curadas de herramientas open source que, juntas, resuelven un problema completo: tu propio ChatGPT, monitorización de servidores, alternativa a Google Workspace y más.",
};

type StackTool = {
  name: string;
  slug: string;
  role: string;
};

type Stack = {
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "facil" | "medio" | "dificil";
  tools: StackTool[];
  howItWorks: string;
};

const difficultyConfig: Record<string, { label: string; className: string }> = {
  facil: { label: "Fácil", className: "text-success bg-success/10 border-success/20" },
  medio: { label: "Medio", className: "text-warning bg-warning/10 border-warning/20" },
  dificil: { label: "Difícil", className: "text-danger bg-danger/10 border-danger/20" },
};

const stacks: Stack[] = [
  {
    title: "Tu propio ChatGPT privado",
    description:
      "Ejecuta modelos de lenguaje en tu máquina y habla con ellos a través de una interfaz web. Tus datos nunca salen de tu red.",
    icon: <Brain className="h-5 w-5" />,
    difficulty: "medio",
    tools: [
      {
        name: "Jan",
        slug: "jan",
        role: "Interfaz de chat de escritorio con soporte para múltiples modelos",
      },
      {
        name: "LocalAI",
        slug: "localai",
        role: "API compatible con OpenAI para servir modelos en local",
      },
    ],
    howItWorks:
      "LocalAI levanta una API REST compatible con OpenAI en tu servidor local. Jan se conecta a esa API como cliente de chat, dándote una experiencia tipo ChatGPT pero 100% privada. Puedes usar modelos como Llama 3, Mistral o Phi-3 sin enviar un solo dato a la nube.",
  },
  {
    title: "Monitoriza y gestiona tu servidor",
    description:
      "Un dashboard centralizado para ver el estado de todos tus servicios, con alertas cuando algo falla.",
    icon: <Server className="h-5 w-5" />,
    difficulty: "facil",
    tools: [
      {
        name: "Uptime Kuma",
        slug: "uptime-kuma",
        role: "Monitorización de uptime con alertas por Telegram, Discord, email y más",
      },
      {
        name: "Dashy",
        slug: "dashy",
        role: "Dashboard bonito y configurable para organizar todos tus servicios",
      },
    ],
    howItWorks:
      "Dashy te da un panel central donde ves todos tus servicios de un vistazo, con iconos y enlaces directos. Uptime Kuma complementa monitorizando cada servicio cada minuto y enviándote alertas al móvil si algo cae. Juntos cubren visibilidad y alertas sin depender de servicios externos.",
  },
  {
    title: "Alternativa completa a Google Workspace",
    description:
      "Documentos, base de datos, chat con clientes y colaboración en equipo. Todo open source y bajo tu control.",
    icon: <Globe className="h-5 w-5" />,
    difficulty: "dificil",
    tools: [
      {
        name: "AppFlowy",
        slug: "appflowy",
        role: "Workspace con documentos, bases de datos y IA (reemplaza Notion/Google Docs)",
      },
      {
        name: "Chatwoot",
        slug: "chatwoot",
        role: "Plataforma de atención al cliente multicanal (reemplaza Intercom/Zendesk)",
      },
      {
        name: "NocoDB",
        slug: "nocodb",
        role: "Interfaz de hoja de cálculo sobre bases de datos (reemplaza Airtable/Google Sheets)",
      },
    ],
    howItWorks:
      "AppFlowy es tu centro de documentación y gestión de proyectos con IA integrada. NocoDB te da hojas de cálculo potentes conectadas a tu base de datos real, ideal para CRM, inventario o seguimiento. Chatwoot gestiona la comunicación con clientes desde email, WhatsApp, chat web y redes sociales. Los tres se pueden alojar en el mismo servidor con Docker Compose.",
  },
];

export default function StacksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
        <p className="text-muted max-w-xl">
          Combinaciones de herramientas que, juntas, resuelven un problema
          completo. Cada stack incluye las herramientas, cómo se conectan y el
          nivel de dificultad.
        </p>
      </div>

      <div className="space-y-8 stagger">
        {stacks.map((stack) => {
          const diff = difficultyConfig[stack.difficulty];
          return (
            <div
              key={stack.title}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {stack.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {stack.title}
                    </h2>
                    <Badge className={diff.className}>{diff.label}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {stack.description}
                  </p>
                </div>
              </div>

              {/* Tools */}
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Herramientas del stack
                </h3>
                {stack.tools.map((tool, i) => (
                  <div
                    key={tool.slug}
                    className="flex items-start gap-3"
                  >
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

              {/* How it works */}
              <div className="mt-6 rounded-xl bg-background p-5 border border-border/50">
                <h3 className="text-sm font-semibold mb-2">
                  ¿Cómo encajan las piezas?
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {stack.howItWorks}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Tienes un stack que funciona bien?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Estamos ampliando esta sección con nuevas combinaciones. Suscríbete
          para no perderte las novedades.
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

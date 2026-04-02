import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Brain,
  Server,
  Briefcase,
  Clock,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Stacks — Combinaciones de herramientas que resuelven problemas reales",
  description:
    "Combinaciones curadas de herramientas open source que, juntas, resuelven un problema completo: tu propio ChatGPT privado, monitorización de homelab, CRM + soporte para tu negocio y más.",
};

type StackTool = {
  name: string;
  slug: string;
  role: string;
};

type Step = {
  title: string;
  description: string;
};

type Stack = {
  title: string;
  problem: string;
  icon: React.ReactNode;
  difficulty: "facil" | "medio" | "dificil";
  time: string;
  keyBenefit: string;
  tools: StackTool[];
  steps: Step[];
};

const difficultyConfig: Record<string, { label: string; className: string }> = {
  facil: {
    label: "Fácil",
    className: "text-success bg-success/10 border-success/20",
  },
  medio: {
    label: "Medio",
    className: "text-warning bg-warning/10 border-warning/20",
  },
  dificil: {
    label: "Difícil",
    className: "text-danger bg-danger/10 border-danger/20",
  },
};

const stacks: Stack[] = [
  {
    title: "Tu propio ChatGPT privado",
    problem:
      "Quieres un asistente de IA privado sin pagar 20$/mes ni enviar datos a OpenAI",
    icon: <Brain className="h-5 w-5" />,
    difficulty: "facil",
    time: "30 minutos",
    keyBenefit:
      "Conversaciones con IA 100% privadas, sin suscripción mensual y con modelos que puedes cambiar cuando quieras.",
    tools: [
      {
        name: "Jan",
        slug: "jan-chatgpt-offline-privado",
        role: "Interfaz de chat de escritorio — tu \"ChatGPT\" local con soporte para múltiples modelos",
      },
      {
        name: "LocalAI",
        slug: "localai-ejecuta-cualquier-modelo-ia-en-local",
        role: "API compatible con OpenAI para servir modelos en local y conectar otras apps",
      },
    ],
    steps: [
      {
        title: "Instala Jan en tu ordenador",
        description:
          "Descarga Jan desde jan.ai e instálalo. Es una app de escritorio disponible para Windows, Mac y Linux. La instalación es tan simple como cualquier otra app.",
      },
      {
        title: "Descarga un modelo de lenguaje",
        description:
          "Desde Jan, ve a la sección de modelos y descarga uno. Para empezar, Llama 3 8B es excelente: funciona bien en equipos con 16 GB de RAM y da respuestas de buena calidad.",
      },
      {
        title: "Configura LocalAI como backend",
        description:
          "Instala LocalAI con Docker (docker run -p 8080:8080 localai/localai). Esto levanta una API REST idéntica a la de OpenAI en tu máquina, en el puerto 8080.",
      },
      {
        title: "Conecta apps vía API compatible con OpenAI",
        description:
          "Cualquier app que soporte OpenAI API (extensiones de VS Code, scripts de Python, automatizaciones) puede apuntar a http://localhost:8080 en lugar de api.openai.com. Tus datos nunca salen de tu red.",
      },
    ],
  },
  {
    title: "Monitoriza y gestiona tu homelab",
    problem:
      "Tienes servicios self-hosted y necesitas saber si están funcionando y cuánta gente los usa",
    icon: <Server className="h-5 w-5" />,
    difficulty: "facil",
    time: "1 hora",
    keyBenefit:
      "Dashboard centralizado con monitorización en tiempo real, alertas al móvil y analytics de uso — todo sin depender de servicios externos.",
    tools: [
      {
        name: "Uptime Kuma",
        slug: "uptime-kuma-monitorizacion-self-hosted",
        role: "Monitorización de uptime con alertas por Telegram, Discord, Slack, email y más",
      },
      {
        name: "Dashy",
        slug: "dashy-dashboard-personal-self-hosted",
        role: "Dashboard visual y configurable para organizar y acceder a todos tus servicios",
      },
      {
        name: "Umami",
        slug: "umami-analytics-privacidad-alternativa-google-analytics",
        role: "Analytics web privado y ligero — sabe cuánta gente usa tus servicios públicos",
      },
    ],
    steps: [
      {
        title: "Despliega Uptime Kuma con Docker",
        description:
          "Ejecuta docker run -d -p 3001:3001 -v uptime-kuma:/app/data louislam/uptime-kuma. Accede a localhost:3001 y crea tu cuenta de admin.",
      },
      {
        title: "Configura monitores para cada servicio",
        description:
          "Añade un monitor por cada servicio de tu homelab: tipo HTTP para webs, TCP para bases de datos, Ping para servidores. Configura intervalos de 60 segundos y activa notificaciones por Telegram o Discord.",
      },
      {
        title: "Despliega Dashy como tu página de inicio",
        description:
          "Lanza Dashy con Docker y edita su archivo conf.yml para añadir todos tus servicios con sus URLs, iconos y descripciones. Organízalos por secciones: \"Media\", \"Infra\", \"Productividad\", etc.",
      },
      {
        title: "Añade Umami a tus sitios públicos",
        description:
          "Despliega Umami con Docker + PostgreSQL. Crea un sitio en el panel de Umami y copia el script de tracking en el <head> de tus webs públicas. Tendrás analytics de visitas sin cookies y sin enviar datos a Google.",
      },
      {
        title: "Conecta todo en Dashy",
        description:
          "Añade enlaces directos a Uptime Kuma y Umami en tu dashboard de Dashy. Así tienes un único punto de entrada para ver el estado de todo, acceder a cada servicio y consultar las métricas de uso.",
      },
    ],
  },
  {
    title: "CRM + Soporte + Base de datos para tu negocio",
    problem:
      "Necesitas gestionar clientes, dar soporte y organizar datos sin pagar Salesforce + Intercom + Airtable",
    icon: <Briefcase className="h-5 w-5" />,
    difficulty: "medio",
    time: "2-3 horas",
    keyBenefit:
      "Suite completa de negocio (ventas, soporte, datos) por 0$/mes en tu propio servidor, sin límites de usuarios ni contactos.",
    tools: [
      {
        name: "Twenty",
        slug: "twenty-crm-open-source-alternativa-salesforce",
        role: "CRM moderno para gestionar tu pipeline de ventas, contactos y oportunidades",
      },
      {
        name: "Chatwoot",
        slug: "chatwoot-alternativa-intercom-open-source",
        role: "Plataforma de soporte multicanal: chat en vivo, email, WhatsApp, redes sociales",
      },
      {
        name: "NocoDB",
        slug: "nocodb-alternativa-airtable-open-source",
        role: "Base de datos visual tipo hoja de cálculo para inventario, seguimiento y datos custom",
      },
    ],
    steps: [
      {
        title: "Despliega Twenty como tu CRM",
        description:
          "Instala Twenty con Docker Compose siguiendo su guía oficial. Configura tu pipeline de ventas con las etapas que uses (Lead → Contactado → Propuesta → Cerrado). Importa tus contactos existentes desde un CSV.",
      },
      {
        title: "Configura Chatwoot para atención al cliente",
        description:
          "Despliega Chatwoot con Docker y configura al menos un canal: chat en vivo para tu web (un widget que se instala con un snippet de JavaScript) o email (conectando tu cuenta SMTP/IMAP).",
      },
      {
        title: "Añade NocoDB para datos estructurados",
        description:
          "Lanza NocoDB con Docker y crea tablas para lo que necesites: inventario de productos, seguimiento de pedidos, base de conocimiento interna. NocoDB se conecta a tu PostgreSQL o MySQL existente y le pone una interfaz tipo Airtable encima.",
      },
      {
        title: "Conecta las herramientas vía webhooks",
        description:
          "Configura webhooks en Chatwoot para que cuando un cliente nuevo escriba, se cree automáticamente un contacto en Twenty. Usa la API de NocoDB para sincronizar datos de pedidos o inventario con tu CRM. Cada herramienta tiene API REST documentada.",
      },
    ],
  },
];

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
          conectarlas paso a paso y el nivel de dificultad.
        </p>
      </div>

      {/* Stacks */}
      <div className="space-y-10 stagger">
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
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Clock className="h-3.5 w-3.5" />
                      {stack.time}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    <span className="font-semibold text-foreground">
                      Problema:
                    </span>{" "}
                    {stack.problem}
                  </p>
                </div>
              </div>

              {/* Key benefit callout */}
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-accent-soft p-4 border border-accent/20">
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
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Herramientas del stack
                </h3>
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

              {/* Step-by-step guide */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                  Cómo montarlo paso a paso
                </h3>
                <div className="space-y-4">
                  {stack.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-accent/30 text-xs font-bold text-accent mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to individual tools */}
              <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap gap-3">
                {stack.tools.map((tool) => (
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
          );
        })}
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

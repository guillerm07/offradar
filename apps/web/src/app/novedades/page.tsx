import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Terminal,
  Code,
} from "lucide-react";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Novedades — Software recién lanzado que merece tu atención",
  description:
    "Descubre software nuevo, lanzamientos recientes de Product Hunt y herramientas innovadoras que están redefiniendo categorías. Proyectos frescos que puedes clonar con código.",
};

type Novedad = {
  name: string;
  tagline: string;
  category: string;
  clonable: boolean;
  url: string;
  description: string;
};

const novedades: Novedad[] = [
  {
    name: "Bolt.new",
    tagline:
      "Construye apps full-stack desde un prompt, directamente en el navegador.",
    category: "IDE con IA",
    clonable: true,
    url: "https://bolt.new",
    description:
      "Bolt.new combina un entorno de desarrollo web completo con modelos de lenguaje avanzados para generar, ejecutar y desplegar aplicaciones full-stack desde una sola instrucción en lenguaje natural. No necesitas instalar nada: todo ocurre en el navegador. Es especialmente interesante porque demuestra que el paradigma de \"prompt → app funcional\" ya es viable para prototipos y MVPs, reduciendo semanas de trabajo a minutos.",
  },
  {
    name: "Cursor Rules",
    tagline:
      "Reglas comunitarias para Cursor IDE que mejoran las respuestas de la IA.",
    category: "Herramientas dev",
    clonable: true,
    url: "https://github.com/PatrickJS/awesome-cursorrules",
    description:
      "Cursor Rules es un repositorio colaborativo de reglas y configuraciones para el editor Cursor que optimizan las sugerencias de IA según el stack, el lenguaje o el framework que uses. En lugar de aceptar respuestas genéricas, puedes cargar reglas específicas que contextualizan al modelo: \"usa Tailwind v4\", \"prefiere server components\", etc. Es clonable y extensible, ideal para equipos que quieren estandarizar cómo la IA les ayuda.",
  },
  {
    name: "Screen Studio (alternativa open source)",
    tagline:
      "Grabación de pantalla con IA que auto-hace zoom y edita el vídeo.",
    category: "Productividad",
    clonable: true,
    url: "https://github.com/nicehash/screenrecorder",
    description:
      "Las herramientas de grabación de pantalla con edición automática estaban reservadas a apps de pago como Screen Studio. Ahora, combinando OBS con pipelines de IA, puedes conseguir el mismo efecto: grabación limpia con auto-zoom inteligente en las zonas de interés, transiciones suaves y exportación en formatos optimizados para redes sociales. Es un flujo clonable con herramientas open source y scripts de post-procesado.",
  },
  {
    name: "Languine",
    tagline:
      "Traduce tu app a 100 idiomas con un solo comando usando IA.",
    category: "i18n / Localización",
    clonable: true,
    url: "https://languine.ai",
    description:
      "Languine automatiza la internacionalización de aplicaciones usando modelos de lenguaje. En lugar de enviar archivos JSON a traductores humanos o usar Google Translate, ejecutas un comando y Languine analiza el contexto de cada cadena para producir traducciones naturales en más de 100 idiomas. Soporta formatos estándar como JSON, YAML y archivos .po, y se integra en tu pipeline de CI/CD para que las traducciones se actualicen con cada deploy.",
  },
  {
    name: "Inbox Zero",
    tagline:
      "Cliente de email open source con IA que categoriza, desuscribe y gestiona tu bandeja.",
    category: "Email / Productividad",
    clonable: true,
    url: "https://github.com/elie222/inbox-zero",
    description:
      "Inbox Zero es un cliente de correo electrónico open source que usa IA para alcanzar el mítico \"bandeja vacía\". Auto-categoriza correos, identifica suscripciones innecesarias y te permite desuscribirte con un clic, sugiere respuestas y prioriza lo importante. Al ser open source, puedes alojarlo tú mismo y mantener tus datos de email privados, algo que ninguna alternativa propietaria ofrece.",
  },
];

export default function NovedadesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Rocket className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Novedades{" "}
            <span className="text-gradient">Software recién lanzado</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl">
          Herramientas nuevas, lanzamientos recientes de Product Hunt y
          proyectos innovadores que están redefiniendo categorías. Esto no es
          trending de GitHub — es software fresco que acaba de nacer y que
          merece tu atención.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6 stagger">
        {novedades.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Top row: name + badges */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {item.name}
                  </h2>
                  <Badge variant="success">Nuevo</Badge>
                  <Badge variant="accent">{item.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm text-foreground/80 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom row: clonable indicator + link */}
            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              {item.clonable && (
                <div className="flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-1.5 border border-accent/20">
                  <Terminal className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-semibold text-accent">
                    Clonable con código
                  </span>
                </div>
              )}

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:border-accent/30"
              >
                Ver proyecto
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-3">
          <Sparkles className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-lg font-bold">
          ¿Conoces un proyecto que acaba de lanzarse?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Publicamos novedades cada semana. Suscríbete para recibir los
          lanzamientos más interesantes en tu email.
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

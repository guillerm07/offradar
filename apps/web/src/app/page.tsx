import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  Radar,
  Zap,
  Brain,
  Server,
  Wrench,
  Shield,
  Database,
  Layout,
  Rocket,
  Star,
  Users,
  Mail,
  Sparkles,
} from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { demoProjects, demoCategories } from "@/lib/demo-data";

const categoryIcons: Record<string, React.ReactNode> = {
  brain: <Brain className="h-5 w-5" />,
  wrench: <Wrench className="h-5 w-5" />,
  server: <Server className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  layout: <Layout className="h-5 w-5" />,
  rocket: <Rocket className="h-5 w-5" />,
};

export default function HomePage() {
  const topProjects = demoProjects.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-[var(--gradient-end)]/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 mb-6 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">
                Actualizado automáticamente cada día
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] animate-slide-up">
              Descubre las herramientas tech que{" "}
              <span className="text-gradient">están fuera del radar</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "100ms" }}>
              Analizamos repos de GitHub, Hacker News, Product Hunt y más.
              Explicamos cada herramienta en profundidad, en español, con IA.
              Para que no te pierdas lo que importa.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-8 sm:gap-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-gradient">200+</p>
                <p className="text-sm text-muted mt-0.5">Proyectos analizados</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-gradient">9</p>
                <p className="text-sm text-muted mt-0.5">Fuentes de datos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-gradient">24/7</p>
                <p className="text-sm text-muted mt-0.5">Actualización continua</p>
              </div>
            </div>

            <div className="mt-10 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <p className="text-sm font-medium mb-3">
                Recibe lo mejor cada semana en tu email
              </p>
              <NewsletterForm className="max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Today */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Trending hoy</h2>
              <p className="text-sm text-muted">
                Lo más interesante que hemos encontrado
              </p>
            </div>
          </div>
          <Link
            href="/trending"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Ver todo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {topProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <Link
          href="/trending"
          className="flex sm:hidden items-center justify-center gap-1.5 mt-8 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Ver todos los proyectos trending
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Categories */}
      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Explora por categoría</h2>
            <p className="mt-2 text-sm text-muted">
              Encuentra exactamente lo que buscas
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger">
            {demoCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:shadow-md hover:shadow-accent/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {categoryIcons[cat.icon] || <Radar className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{cat.name}</p>
                  <p className="text-xs text-muted">{cat.count} proyectos</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">
            Más que un listado de repos
          </h2>
          <p className="mt-2 text-muted max-w-lg mx-auto">
            Contenido que no encuentras en ningún otro sitio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {[
            {
              icon: <Star className="h-5 w-5" />,
              title: "Alternativas open source",
              desc: "Descubre qué puedes usar gratis en vez de pagar por Zapier, Notion, ChatGPT y más.",
              href: "/alternativas",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              title: "Replica con Claude Code",
              desc: "Productos y herramientas que puedes construir tú mismo usando Claude Code paso a paso.",
              href: "/replica-con-code",
            },
            {
              icon: <TrendingUp className="h-5 w-5" />,
              title: "Trending velocity",
              desc: "Detectamos repos que están acelerando antes de que se hagan mainstream.",
              href: "/trending",
            },
            {
              icon: <Brain className="h-5 w-5" />,
              title: "Papers explicados",
              desc: "Los papers de IA más relevantes de la semana, resumidos en español y sin jerga.",
              href: "/papers",
            },
            {
              icon: <Server className="h-5 w-5" />,
              title: "Stacks completos",
              desc: "Combinaciones de herramientas que resuelven un problema real de principio a fin.",
              href: "/stacks",
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: "Hazlo con Claude Code",
              desc: "Automatizaciones que otros montan con n8n o Zapier, explicadas para hacerlas directamente con Claude Code.",
              href: "/hazlo-con-code",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-base font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {feature.desc}
              </p>
              <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                Explorar
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 mb-5">
            <Mail className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Newsletter semanal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Lo mejor de la semana,{" "}
            <span className="text-gradient">en tu email</span>
          </h2>

          <p className="mt-4 text-muted leading-relaxed max-w-lg mx-auto">
            Cada lunes recibirás los repos más interesantes, alternativas
            open source y herramientas que merece la pena conocer. Sin spam,
            cancela cuando quieras.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <NewsletterForm />
          </div>

          <p className="mt-4 text-xs text-muted/60">
            Únete a +500 personas que ya la reciben
          </p>
        </div>
      </section>
    </>
  );
}

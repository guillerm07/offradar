import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Flame, Clock, Star } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Trending — Proyectos tech del momento",
  description:
    "Los repos, herramientas y productos tech que más están creciendo hoy. Actualizado automáticamente.",
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const projects = await getPublishedProjects(30);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Trending
          </h1>
        </div>
        <p className="text-muted max-w-lg">
          Lo que está explotando ahora mismo en GitHub, Hacker News, Product
          Hunt y más. Actualizado cada 12 horas.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { label: "Hoy", icon: Flame, active: true },
          { label: "Esta semana", icon: TrendingUp, active: false },
          { label: "Recientes", icon: Clock, active: false },
          { label: "Más estrellas", icon: Star, active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              tab.active
                ? "bg-accent text-white border-accent"
                : "bg-surface text-muted border-border hover:border-accent/30 hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Flame, Clock, Star } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import { getPublishedProjects, type SortOption } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Trending — Proyectos tech del momento",
  description:
    "Los repos, herramientas y productos tech que más están creciendo hoy. Actualizado automáticamente.",
};

export const dynamic = "force-dynamic";

const tabs = [
  { label: "Más relevantes", sort: "interest", icon: Flame },
  { label: "Más estrellas", sort: "stars", icon: Star },
  { label: "Más recientes", sort: "recent", icon: Clock },
  { label: "Mayor crecimiento", sort: "trending", icon: TrendingUp },
] as const;

type Props = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function TrendingPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const currentSort: SortOption =
    sort === "stars" || sort === "recent" || sort === "trending"
      ? sort
      : "interest";

  const projects = await getPublishedProjects(30, currentSort);

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
        {tabs.map((tab) => (
          <Link
            key={tab.sort}
            href={`/trending?sort=${tab.sort}`}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              currentSort === tab.sort
                ? "bg-accent text-white border-accent"
                : "bg-surface text-muted border-border hover:border-accent/30 hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Link>
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

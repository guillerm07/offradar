import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import { demoProjects, demoCategories } from "@/lib/demo-data";

type Props = {
  params: Promise<{ slug: string }>;
};

function getCategory(slug: string) {
  return demoCategories.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Categoría no encontrada" };

  return {
    title: `${cat.name} — Proyectos y herramientas`,
    description: `Descubre los mejores proyectos y herramientas de ${cat.name}. Repos trending, alternativas open source y más.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  // In production, filter by category from DB. For demo, show all projects.
  const projects = demoProjects;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          {category.name}
        </h1>
        <p className="mt-2 text-muted">
          {category.count} proyectos en esta categoría
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {demoCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
              cat.slug === slug
                ? "bg-accent text-white border-accent"
                : "bg-surface text-muted border-border hover:border-accent/30 hover:text-foreground"
            }`}
          >
            {cat.name}
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

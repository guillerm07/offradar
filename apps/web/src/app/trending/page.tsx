import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Flame,
  Clock,
  Star,
  Filter,
  Code2,
  Shield,
  Replace,
} from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import {
  getFilteredProjects,
  getCategories,
  getDistinctLanguages,
  type SortOption,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Trending — Proyectos tech del momento",
  description:
    "Los repos, herramientas y productos tech que más están creciendo hoy. Actualizado automáticamente.",
};

export const dynamic = "force-dynamic";

const sortTabs = [
  { label: "Más relevantes", sort: "interest", icon: Flame },
  { label: "Más estrellas", sort: "stars", icon: Star },
  { label: "Más recientes", sort: "recent", icon: Clock },
  { label: "Mayor crecimiento", sort: "trending", icon: TrendingUp },
] as const;

const difficultyOptions = [
  { value: "facil", label: "Fácil", color: "text-success border-success/20 bg-success/10" },
  { value: "medio", label: "Medio", color: "text-warning border-warning/20 bg-warning/10" },
  { value: "dificil", label: "Difícil", color: "text-danger border-danger/20 bg-danger/10" },
];

type Props = {
  searchParams: Promise<{
    sort?: string;
    category?: string;
    difficulty?: string;
    language?: string;
    alt?: string;
  }>;
};

export default async function TrendingPage({ searchParams }: Props) {
  const params = await searchParams;

  const currentSort: SortOption =
    params.sort === "stars" || params.sort === "recent" || params.sort === "trending"
      ? params.sort
      : "interest";

  const currentCategory = params.category ? parseInt(params.category) : undefined;
  const currentDifficulty = params.difficulty || undefined;
  const currentLanguage = params.language || undefined;
  const currentAlt = params.alt === "1";

  const hasFilters = !!(currentCategory || currentDifficulty || currentLanguage || currentAlt);

  const projects = await getFilteredProjects(
    {
      sort: currentSort,
      category: currentCategory,
      difficulty: currentDifficulty,
      language: currentLanguage,
      alternativeOnly: currentAlt,
    },
    30
  );

  const dbCategories = await getCategories();
  const languages = await getDistinctLanguages();

  function buildUrl(overrides: Record<string, string | undefined>) {
    const base: Record<string, string> = {};
    if (params.sort && params.sort !== "interest") base.sort = params.sort;
    if (params.category) base.category = params.category;
    if (params.difficulty) base.difficulty = params.difficulty;
    if (params.language) base.language = params.language;
    if (params.alt) base.alt = params.alt;

    const merged = { ...base, ...overrides };
    // Remove undefined/empty values
    const clean = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v !== undefined && v !== "")
    );

    const qs = new URLSearchParams(clean as Record<string, string>).toString();
    return `/trending${qs ? `?${qs}` : ""}`;
  }

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
          Hunt y más. Usa los filtros para encontrar exactamente lo que buscas.
        </p>
      </div>

      {/* Sort tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {sortTabs.map((tab) => (
          <Link
            key={tab.sort}
            href={buildUrl({ sort: tab.sort === "interest" ? undefined : tab.sort })}
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

      {/* Extended filters */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold">Filtros</span>
          {hasFilters && (
            <Link
              href={currentSort === "interest" ? "/trending" : `/trending?sort=${currentSort}`}
              className="ml-auto text-xs text-accent hover:text-accent-hover transition-colors"
            >
              Limpiar filtros
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {/* Category filter */}
          <div>
            <p className="text-xs text-muted font-medium mb-2 uppercase tracking-wide">Categoría</p>
            <div className="flex flex-wrap gap-1.5">
              <Link
                href={buildUrl({ category: undefined })}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  !currentCategory
                    ? "bg-accent text-white border-accent"
                    : "bg-background text-muted border-border hover:border-accent/30"
                }`}
              >
                Todas
              </Link>
              {dbCategories.filter(c => c.count > 0).map((cat) => (
                <Link
                  key={cat.id}
                  href={buildUrl({ category: String(cat.id) })}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                    currentCategory === cat.id
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-muted border-border hover:border-accent/30"
                  }`}
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          </div>

          {/* Difficulty + Language + Alternative row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Difficulty */}
            <div>
              <p className="text-xs text-muted font-medium mb-2 uppercase tracking-wide flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Dificultad
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Link
                  href={buildUrl({ difficulty: undefined })}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                    !currentDifficulty
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-muted border-border hover:border-accent/30"
                  }`}
                >
                  Todas
                </Link>
                {difficultyOptions.map((d) => (
                  <Link
                    key={d.value}
                    href={buildUrl({ difficulty: d.value })}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                      currentDifficulty === d.value
                        ? d.color
                        : "bg-background text-muted border-border hover:border-accent/30"
                    }`}
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <p className="text-xs text-muted font-medium mb-2 uppercase tracking-wide flex items-center gap-1">
                <Code2 className="h-3 w-3" />
                Lenguaje
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Link
                  href={buildUrl({ language: undefined })}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                    !currentLanguage
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-muted border-border hover:border-accent/30"
                  }`}
                >
                  Todos
                </Link>
                {languages.slice(0, 8).map((l) => (
                  <Link
                    key={l.language}
                    href={buildUrl({ language: l.language })}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                      currentLanguage === l.language
                        ? "bg-accent text-white border-accent"
                        : "bg-background text-muted border-border hover:border-accent/30"
                    }`}
                  >
                    {l.language} ({l.count})
                  </Link>
                ))}
              </div>
            </div>

            {/* Alternative toggle */}
            <div>
              <p className="text-xs text-muted font-medium mb-2 uppercase tracking-wide flex items-center gap-1">
                <Replace className="h-3 w-3" />
                Tipo
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Link
                  href={buildUrl({ alt: undefined })}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                    !currentAlt
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-muted border-border hover:border-accent/30"
                  }`}
                >
                  Todos
                </Link>
                <Link
                  href={buildUrl({ alt: "1" })}
                  className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                    currentAlt
                      ? "bg-warning text-warning border-warning/20 bg-warning/10"
                      : "bg-background text-muted border-border hover:border-accent/30"
                  }`}
                >
                  Solo alternativas open source
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">
          {projects.length} {projects.length === 1 ? "proyecto encontrado" : "proyectos encontrados"}
          {hasFilters && " con los filtros aplicados"}
        </p>
      </div>

      {/* Project grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="text-lg font-bold mb-2">No se encontraron proyectos</p>
          <p className="text-sm text-muted mb-4">
            Prueba a cambiar los filtros o a limpiarlos para ver todos los proyectos.
          </p>
          <Link
            href="/trending"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Limpiar filtros
          </Link>
        </div>
      )}
    </div>
  );
}

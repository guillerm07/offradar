import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Star,
  GitFork,
  ExternalLink,
  ArrowLeft,
  TrendingUp,
  Calendar,
  Code2,
  User,
  Clock,
  Zap,
  Workflow,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  formatNumber,
  timeAgo,
  getDifficultyColor,
  getDifficultyLabel,
} from "@/lib/utils";
import { demoProjects } from "@/lib/demo-data";

type Props = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return demoProjects.find((p) => p.seoSlug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.seoTitle || project.name,
    description: project.seoDescription || project.description,
    openGraph: {
      title: project.seoTitle || project.name,
      description: project.seoDescription || project.description || undefined,
      type: "article",
      ...(project.featuredImageUrl && {
        images: [{ url: project.featuredImageUrl }],
      }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const tags = (project.tags as string[]) || [];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a trending
      </Link>

      {/* Featured image */}
      {project.featuredImageUrl ? (
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-surface-hover mb-8">
          <img
            src={project.featuredImageUrl}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="relative flex aspect-[3/1] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-[var(--gradient-end)]/10 mb-8">
          <div className="text-8xl font-black text-accent/10">
            {project.name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted">
            {project.author && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {project.author}
              </span>
            )}
            {project.language && (
              <span className="flex items-center gap-1">
                <Code2 className="h-3.5 w-3.5" />
                {project.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(project.createdAt)}
            </span>
          </div>
        </div>

        <ScoreRing score={project.interestScore ?? 0} size={64} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {project.difficulty && (
          <Badge className={getDifficultyColor(project.difficulty)}>
            {getDifficultyLabel(project.difficulty)}
          </Badge>
        )}
        {project.isOssAlternative && project.alternativeTo && (
          <Badge variant="accent">Alternativa a {project.alternativeTo}</Badge>
        )}
        {tags.map((tag) => (
          <Badge key={tag} variant="default">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-6 mt-8 p-5 rounded-xl border border-border bg-surface">
        {(project.stars ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            <div>
              <p className="text-lg font-bold">{formatNumber(project.stars!)}</p>
              <p className="text-xs text-muted">Stars</p>
            </div>
          </div>
        )}
        {(project.forks ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <GitFork className="h-5 w-5 text-accent" />
            <div>
              <p className="text-lg font-bold">{formatNumber(project.forks!)}</p>
              <p className="text-xs text-muted">Forks</p>
            </div>
          </div>
        )}
        {(project.trendingVelocity ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <div>
              <p className="text-lg font-bold">
                +{formatNumber(project.trendingVelocity!)}
              </p>
              <p className="text-xs text-muted">Esta semana</p>
            </div>
          </div>
        )}
        {project.lastCommit && (
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted" />
            <div>
              <p className="text-lg font-bold">{timeAgo(project.lastCommit)}</p>
              <p className="text-xs text-muted">Último commit</p>
            </div>
          </div>
        )}

        <div className="ml-auto">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <ExternalLink className="h-4 w-4" />
            Ver proyecto
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 space-y-8">
        {/* Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4">Qué es {project.name}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed text-muted">
              {project.summaryEs || project.description}
            </p>
          </div>
        </div>

        {/* Replicable with Claude Code */}
        {project.replicableWithCode && (
          <div className="rounded-xl border border-accent/20 bg-accent-soft p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-bold text-accent">
                Replicable con Claude Code
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              {project.replicableWithCode}
            </p>
          </div>
        )}

        {/* Buildable with Claude Code */}
        {project.automatizableWithN8n && (
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Workflow className="h-5 w-5 text-success" />
              <h3 className="text-lg font-bold text-success">
                Hazlo con Claude Code
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              {project.automatizableWithN8n}
            </p>
          </div>
        )}

        {/* Alternative banner */}
        {project.isOssAlternative && project.alternativeTo && (
          <div className="rounded-xl border border-warning/20 bg-warning/5 p-6">
            <h3 className="text-lg font-bold mb-2">
              Alternativa open source a {project.alternativeTo}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.name} es una alternativa gratuita y de código abierto a{" "}
              {project.alternativeTo}. Puedes instalarlo en tu propio servidor
              y tener control total sobre tus datos.
            </p>
            <Link
              href="/alternativas"
              className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-warning"
            >
              Ver más alternativas open source
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

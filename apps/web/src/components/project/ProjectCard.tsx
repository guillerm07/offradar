import Link from "next/link";
import {
  Star,
  GitFork,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  cn,
  formatNumber,
  timeAgo,
  getDifficultyColor,
  getDifficultyLabel,
  getSourceIcon,
} from "@/lib/utils";
import type { Project } from "@/db/schema";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const tags = (project.tags as string[]) || [];

  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-lg hover:shadow-accent/5">
      {/* Featured image */}
      {project.featuredImageUrl ? (
        <div className="relative aspect-[2/1] overflow-hidden rounded-t-2xl bg-surface-hover">
          <img
            src={project.featuredImageUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Source badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-md bg-black/50 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
              {getSourceIcon(project.source)}
            </span>
          </div>
          {/* Score */}
          <div className="absolute top-3 right-3">
            <ScoreRing score={project.interestScore ?? 0} size={42} />
          </div>
        </div>
      ) : (
        <div className="relative flex aspect-[2/1] items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-accent/5 to-[var(--gradient-end)]/5">
          <div className="text-6xl font-black text-accent/10">
            {project.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-md bg-surface/80 px-2 py-1 text-xs font-bold text-foreground backdrop-blur-sm border border-border">
              {getSourceIcon(project.source)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <ScoreRing score={project.interestScore ?? 0} size={42} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/proyecto/${project.seoSlug}`} className="flex-1 min-w-0">
            <h3 className="text-lg font-bold leading-tight line-clamp-2 transition-colors group-hover:text-accent">
              {project.name}
            </h3>
          </Link>
          {typeof index === "number" && (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
              #{index + 1}
            </span>
          )}
        </div>

        {/* Author + time */}
        {project.author && (
          <p className="mt-1 text-xs text-muted">
            por <span className="font-medium text-foreground/70">{project.author}</span>
            {project.createdAt && (
              <> &middot; {timeAgo(project.createdAt)}</>
            )}
          </p>
        )}

        {/* Description */}
        <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
          {project.summaryEs || project.description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.difficulty && (
            <Badge
              className={getDifficultyColor(project.difficulty)}
            >
              {getDifficultyLabel(project.difficulty)}
            </Badge>
          )}
          {project.language && (
            <Badge variant="outline">{project.language}</Badge>
          )}
          {project.isOssAlternative && project.alternativeTo && (
            <Badge variant="accent">
              Alt. a {project.alternativeTo}
            </Badge>
          )}
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted">
            {(project.stars ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {formatNumber(project.stars!)}
              </span>
            )}
            {(project.forks ?? 0) > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {formatNumber(project.forks!)}
              </span>
            )}
            {(project.trendingVelocity ?? 0) > 0 && (
              <span className="flex items-center gap-1 text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                +{formatNumber(project.trendingVelocity!)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground hover:bg-surface-hover"
              aria-label="Ver proyecto original"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              href={`/proyecto/${project.seoSlug}`}
              className="flex h-7 items-center gap-1 rounded-md bg-accent/10 px-2.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
            >
              Ver más
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

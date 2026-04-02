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
import Markdown from "react-markdown";
import Badge from "@/components/ui/Badge";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  formatNumber,
  timeAgo,
  getDifficultyColor,
  getDifficultyLabel,
} from "@/lib/utils";
import { getProjectBySlug } from "@/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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
  const project = await getProjectBySlug(slug);
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

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: project.name,
            description: project.seoDescription || project.description,
            url: project.url,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Cross-platform",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            ...(project.featuredImageUrl && { image: project.featuredImageUrl }),
            ...(project.author && {
              author: { "@type": "Person", name: project.author },
            }),
          }),
        }}
      />

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

      {/* Alternative banner - before content */}
      {project.isOssAlternative && project.alternativeTo && (
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/10">
            <Star className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold">
              Alternativa open source a {project.alternativeTo}
            </p>
            <p className="text-xs text-muted mt-0.5">
              Gratuita, de código abierto y self-hosteable
            </p>
          </div>
          <Link
            href="/alternativas"
            className="ml-auto text-xs font-medium text-warning shrink-0"
          >
            Ver más →
          </Link>
        </div>
      )}

      {/* Main content */}
      <article className="mt-10">
        <div
          className="
            prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[var(--muted)] prose-p:leading-[1.8] prose-p:my-4
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-4 prose-ul:space-y-2
            prose-ol:my-4 prose-ol:space-y-2
            prose-li:text-[var(--muted)] prose-li:leading-[1.7]
            prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hover hover:prose-a:underline
            prose-code:text-accent prose-code:bg-accent-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-table:border-collapse
            prose-th:border prose-th:border-border prose-th:bg-surface prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-foreground
            prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:text-[var(--muted)]
            prose-hr:border-border prose-hr:my-8
            prose-blockquote:border-accent prose-blockquote:bg-accent-soft/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          "
        >
          <Markdown>{project.summaryEs || project.description || ""}</Markdown>
        </div>
      </article>

      {/* Cards after content */}
      <div className="mt-12 space-y-4">
        {/* Replicable with Claude Code */}
        {project.replicableWithCode && (
          <div className="rounded-xl border border-accent/20 bg-accent-soft/50 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <h3 className="text-base font-bold text-accent">
                Hazlo tuyo con Claude Code
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {project.replicableWithCode}
            </p>
          </div>
        )}

        {/* Hazlo con Claude Code */}
        {project.automatizableWithN8n && (
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20">
                <Workflow className="h-4 w-4 text-success" />
              </div>
              <h3 className="text-base font-bold text-success">
                Hazlo con Claude Code
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {project.automatizableWithN8n}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

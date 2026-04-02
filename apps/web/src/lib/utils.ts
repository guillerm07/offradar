import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  return num.toString();
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "hace un momento";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)}d`;
  if (seconds < 2592000) return `hace ${Math.floor(seconds / 604800)} sem`;
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "facil":
      return "text-success bg-success/10 border-success/20";
    case "medio":
      return "text-warning bg-warning/10 border-warning/20";
    case "dificil":
      return "text-danger bg-danger/10 border-danger/20";
    default:
      return "text-muted bg-surface border-border";
  }
}

export function getDifficultyLabel(difficulty: string) {
  switch (difficulty) {
    case "facil":
      return "Fácil";
    case "medio":
      return "Medio";
    case "dificil":
      return "Difícil";
    default:
      return difficulty;
  }
}

export function getSourceIcon(source: string) {
  switch (source) {
    case "github":
      return "GH";
    case "hackernews":
      return "HN";
    case "producthunt":
      return "PH";
    case "huggingface":
      return "HF";
    case "arxiv":
      return "Ax";
    case "reddit":
      return "Rd";
    case "devto":
      return "DT";
    default:
      return source.slice(0, 2).toUpperCase();
  }
}

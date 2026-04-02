"use client";

import { cn } from "@/lib/utils";

export default function ScoreRing({
  score,
  size = 48,
  className,
}: {
  score: number;
  size?: number;
  className?: string;
}) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75
      ? "text-success"
      : score >= 50
        ? "text-accent"
        : score >= 25
          ? "text-warning"
          : "text-danger";

  const strokeColor =
    score >= 75
      ? "stroke-success"
      : score >= 50
        ? "stroke-accent"
        : score >= 25
          ? "stroke-warning"
          : "stroke-danger";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-border"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={strokeColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className={cn("absolute text-xs font-bold", color)}>{score}</span>
    </div>
  );
}

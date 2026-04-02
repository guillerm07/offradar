import { NextRequest, NextResponse } from "next/server";
import { demoProjects } from "@/lib/demo-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const source = searchParams.get("source");
  const sort = searchParams.get("sort") || "interest";
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  // TODO: When DB is connected, query from PostgreSQL
  // For now, use demo data
  let projects = [...demoProjects];

  if (source) {
    projects = projects.filter((p) => p.source === source);
  }

  switch (sort) {
    case "stars":
      projects.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
      break;
    case "trending":
      projects.sort(
        (a, b) => (b.trendingVelocity ?? 0) - (a.trendingVelocity ?? 0)
      );
      break;
    case "recent":
      projects.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      break;
    case "interest":
    default:
      projects.sort(
        (a, b) => (b.interestScore ?? 0) - (a.interestScore ?? 0)
      );
  }

  return NextResponse.json({
    projects: projects.slice(0, limit),
    total: projects.length,
  });
}

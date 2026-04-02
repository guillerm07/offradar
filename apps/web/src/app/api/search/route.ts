import { NextRequest, NextResponse } from "next/server";
import { searchProjects } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ projects: [] });
  }

  const results = await searchProjects(query, 10);

  return NextResponse.json({
    projects: results.map((p) => ({
      id: p.id,
      name: p.name,
      seoSlug: p.seoSlug,
      description: p.description,
      stars: p.stars,
      language: p.language,
      interestScore: p.interestScore,
      featuredImageUrl: p.featuredImageUrl,
    })),
  });
}

import { db } from "@/lib/db";
import { projects, categories } from "@/db/schema";
import { eq, desc, and, sql, isNotNull, ilike, or } from "drizzle-orm";

export type SortOption = "interest" | "stars" | "recent" | "trending";

export type FilterOptions = {
  sort?: SortOption;
  category?: number;
  difficulty?: string;
  language?: string;
  alternativeOnly?: boolean;
};

export async function getPublishedProjects(limit = 30, sort: SortOption = "interest") {
  const orderCol =
    sort === "stars" ? desc(projects.stars) :
    sort === "recent" ? desc(projects.createdAt) :
    sort === "trending" ? desc(projects.trendingVelocity) :
    desc(projects.interestScore);

  return db
    .select()
    .from(projects)
    .where(eq(projects.status, "published"))
    .orderBy(orderCol)
    .limit(limit);
}

export async function countFilteredProjects(filters: FilterOptions) {
  const conditions = [eq(projects.status, "published")];
  if (filters.category) conditions.push(eq(projects.categoryId, filters.category));
  if (filters.difficulty) conditions.push(sql`${projects.difficulty} = ${filters.difficulty}`);
  if (filters.language) conditions.push(eq(projects.language, filters.language));
  if (filters.alternativeOnly) conditions.push(eq(projects.isOssAlternative, true));

  const result = await db
    .select({ count: sql<number>`COUNT(*)::int` })
    .from(projects)
    .where(and(...conditions));
  return result[0].count;
}

export async function getFilteredProjects(filters: FilterOptions, limit = 30, offset = 0) {
  const orderCol =
    filters.sort === "stars" ? desc(projects.stars) :
    filters.sort === "recent" ? desc(projects.createdAt) :
    filters.sort === "trending" ? desc(projects.trendingVelocity) :
    desc(projects.interestScore);

  const conditions = [eq(projects.status, "published")];

  if (filters.category) {
    conditions.push(eq(projects.categoryId, filters.category));
  }
  if (filters.difficulty) {
    conditions.push(sql`${projects.difficulty} = ${filters.difficulty}`);
  }
  if (filters.language) {
    conditions.push(eq(projects.language, filters.language));
  }
  if (filters.alternativeOnly) {
    conditions.push(eq(projects.isOssAlternative, true));
  }

  return db
    .select()
    .from(projects)
    .where(and(...conditions))
    .orderBy(orderCol)
    .limit(limit)
    .offset(offset);
}

export async function getDistinctLanguages() {
  const results = await db.execute(sql`
    SELECT language, COUNT(*)::int as count
    FROM projects
    WHERE status = 'published' AND language IS NOT NULL
    GROUP BY language
    ORDER BY count DESC
  `);
  return results as unknown as Array<{ language: string; count: number }>;
}

export async function searchProjects(query: string, limit = 30) {
  const pattern = `%${query}%`;
  return db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.status, "published"),
        or(
          ilike(projects.name, pattern),
          ilike(projects.description, pattern),
          ilike(projects.summaryEs, pattern),
          ilike(projects.seoTitle, pattern),
        )
      )
    )
    .orderBy(desc(projects.interestScore))
    .limit(limit);
}

export async function getProjectsWithClaudeCode(limit = 30) {
  return db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.status, "published"),
        isNotNull(projects.replicableWithCode)
      )
    )
    .orderBy(desc(projects.interestScore))
    .limit(limit);
}

export async function getProjectBySlug(slug: string) {
  const results = await db
    .select()
    .from(projects)
    .where(and(eq(projects.seoSlug, slug), eq(projects.status, "published")))
    .limit(1);
  return results[0] ?? null;
}

export async function getProjectsByCategory(categoryId: number, limit = 30) {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.categoryId, categoryId), eq(projects.status, "published")))
    .orderBy(desc(projects.interestScore))
    .limit(limit);
}

export async function getAlternativeProjects(limit = 30) {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.isOssAlternative, true), eq(projects.status, "published")))
    .orderBy(desc(projects.interestScore))
    .limit(limit);
}

export async function getAlternativesFor(alternativeTo: string) {
  return db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.status, "published"),
        eq(projects.isOssAlternative, true),
        eq(projects.alternativeTo, alternativeTo)
      )
    )
    .orderBy(desc(projects.interestScore));
}

export async function getDistinctAlternatives() {
  const results = await db.execute(sql`
    SELECT alternative_to, COUNT(*)::int as count
    FROM projects
    WHERE is_oss_alternative = true AND status = 'published' AND alternative_to IS NOT NULL
    GROUP BY alternative_to
    ORDER BY count DESC, alternative_to ASC
  `);
  return results as unknown as Array<{ alternative_to: string; count: number }>;
}

export async function getCategories() {
  const results = await db.execute(sql`
    SELECT c.*, COUNT(p.id)::int as count
    FROM categories c
    LEFT JOIN projects p ON p.category_id = c.id AND p.status = 'published'
    GROUP BY c.id
    ORDER BY count DESC
  `);
  return results as unknown as Array<{
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    count: number;
  }>;
}

export async function getCategoryBySlug(slug: string) {
  const results = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return results[0] ?? null;
}

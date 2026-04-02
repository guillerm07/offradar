import { db } from "@/lib/db";
import { projects, categories } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

export async function getPublishedProjects(limit = 30) {
  return db
    .select()
    .from(projects)
    .where(eq(projects.status, "published"))
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

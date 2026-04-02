import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { projects, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://offradar.es";

  const allProjects = await db
    .select({ seoSlug: projects.seoSlug, updatedAt: projects.updatedAt })
    .from(projects)
    .where(eq(projects.status, "published"));

  const allCategories = await db
    .select({ slug: categories.slug })
    .from(categories);

  const projectUrls = allProjects.map((p) => ({
    url: `${baseUrl}/proyecto/${p.seoSlug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = allCategories.map((c) => ({
    url: `${baseUrl}/categoria/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/trending`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/alternativas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/comparativas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/stacks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/hazlo-con-code`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/guillermo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    ...categoryUrls,
    ...projectUrls,
  ];
}

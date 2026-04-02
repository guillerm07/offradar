import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "published",
  "archived",
]);

export const difficultyEnum = pgEnum("difficulty", [
  "facil",
  "medio",
  "dificil",
]);

export const priorityEnum = pgEnum("priority", ["high", "medium", "low"]);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  parentId: integer("parent_id").references((): any => categories.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    source: varchar("source", { length: 50 }).notNull(),
    sourceId: varchar("source_id", { length: 255 }).notNull(),
    url: text("url").notNull(),
    name: varchar("name", { length: 500 }).notNull(),
    description: text("description"),
    summaryEs: text("summary_es"),
    categoryId: integer("category_id").references(() => categories.id),
    tags: jsonb("tags").$type<string[]>().default([]),
    difficulty: difficultyEnum("difficulty"),
    interestScore: integer("interest_score").default(0),
    trendingVelocity: integer("trending_velocity").default(0),
    stars: integer("stars").default(0),
    forks: integer("forks").default(0),
    lastCommit: timestamp("last_commit"),
    language: varchar("language", { length: 50 }),
    isOssAlternative: boolean("is_oss_alternative").default(false),
    alternativeTo: varchar("alternative_to", { length: 255 }),
    replicableWithCode: text("replicable_with_code"),
    automatizableWithN8n: text("automatizable_with_n8n"),
    featuredImageUrl: text("featured_image_url"),
    thumbnailUrl: text("thumbnail_url"),
    contentImages: jsonb("content_images").$type<string[]>().default([]),
    status: projectStatusEnum("status").default("draft").notNull(),
    priority: priorityEnum("priority").default("medium"),
    seoSlug: varchar("seo_slug", { length: 500 }).notNull(),
    seoTitle: varchar("seo_title", { length: 200 }),
    seoDescription: text("seo_description"),
    readmeContent: text("readme_content"),
    author: varchar("author", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    publishedAt: timestamp("published_at"),
  },
  (table) => [
    uniqueIndex("projects_source_source_id_idx").on(
      table.source,
      table.sourceId
    ),
    index("projects_seo_slug_idx").on(table.seoSlug),
    index("projects_status_idx").on(table.status),
    index("projects_interest_score_idx").on(table.interestScore),
    index("projects_category_idx").on(table.categoryId),
  ]
);

export const dailySnapshots = pgTable(
  "daily_snapshots",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .references(() => projects.id)
      .notNull(),
    date: timestamp("date").notNull(),
    stars: integer("stars").default(0),
    forks: integer("forks").default(0),
    downloads: integer("downloads").default(0),
    hnScore: integer("hn_score").default(0),
    phVotes: integer("ph_votes").default(0),
    redditUpvotes: integer("reddit_upvotes").default(0),
  },
  (table) => [
    uniqueIndex("snapshots_project_date_idx").on(table.projectId, table.date),
  ]
);

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 500 }).notNull(),
  contentHtml: text("content_html").notNull(),
  sentAt: timestamp("sent_at"),
  stats: jsonb("stats").$type<{ opens: number; clicks: number }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  preferences: jsonb("preferences").$type<string[]>().default([]),
  confirmed: boolean("confirmed").default(false),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  projectIds: jsonb("project_ids").$type<number[]>().default([]),
  comparisonTableJson: jsonb("comparison_table_json"),
  summaryEs: text("summary_es"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const socialPosts = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  platform: varchar("platform", { length: 50 }).notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  postedAt: timestamp("posted_at"),
  engagementStats: jsonb("engagement_stats"),
  status: varchar("post_status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const creatorContent = pgTable("creator_content", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  type: varchar("type", { length: 50 }).notNull(),
  contentHtml: text("content_html"),
  featuredImageUrl: text("featured_image_url"),
  relatedProjectIds: jsonb("related_project_ids").$type<number[]>().default([]),
  publishedAt: timestamp("published_at"),
  status: projectStatusEnum("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;

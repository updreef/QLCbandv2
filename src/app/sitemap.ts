import type { MetadataRoute } from "next";
import { getShows, getBlogPosts } from "@/lib/content";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://qlcband.nl";
  const [shows, posts] = await Promise.all([getShows(), getBlogPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/optredens`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/boek-ons`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/over-ons`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/mannen`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/muziek`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  return [
    ...staticRoutes,
    ...shows.map((s) => ({
      url: `${base}/optredens/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

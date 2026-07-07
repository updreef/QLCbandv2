import { supabase } from "./supabase";
import {
  shows as fallbackShows,
  blogPosts as fallbackPosts,
  type Show,
  type BlogPost,
} from "@/data";

/**
 * Contentlaag: leest uit Supabase wanneer geconfigureerd, valt anders
 * terug op de statische data in src/data.ts. Zo blijft de site volledig
 * werken vóórdat het Supabase-project bestaat, en wordt het CMS leidend
 * zodra de env vars op Vercel staan.
 */

interface ShowRow {
  slug: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  address: string | null;
  city: string | null;
  description: string | null;
  status: string;
  image: string | null;
  highlights: string[] | null;
}

interface BlogRow {
  slug: string;
  title: string;
  date: string;
  category: string | null;
  author: string | null;
  summary: string | null;
  meta_description: string | null;
  content: string;
  faqs: { question: string; answer: string }[] | null;
}

function rowToShow(r: ShowRow): Show {
  return {
    id: r.slug,
    slug: r.slug,
    title: r.title,
    date: r.date,
    time: r.time ?? "",
    location: r.location ?? "",
    address: r.address ?? "",
    city: r.city ?? "",
    description: r.description ?? "",
    status: r.status === "past" ? "past" : "upcoming",
    image: r.image ?? "/images/band-live.jpg",
    highlights: r.highlights ?? undefined,
  };
}

function rowToPost(r: BlogRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    date: r.date,
    category: r.category ?? "Band Life",
    author: r.author ?? "Quarter Life Crisis",
    summary: r.summary ?? "",
    metaDescription: r.meta_description ?? "",
    content: r.content,
    faqs: r.faqs ?? [],
  };
}

export async function getShows(): Promise<Show[]> {
  if (!supabase) return fallbackShows;
  const { data, error } = await supabase
    .from("shows")
    .select("*")
    .order("date", { ascending: false });
  if (error || !data || data.length === 0) return fallbackShows;
  return (data as ShowRow[]).map(rowToShow);
}

export async function getShow(slug: string): Promise<Show | undefined> {
  const all = await getShows();
  return all.find((s) => s.slug === slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) return fallbackPosts;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error || !data || data.length === 0) return fallbackPosts;
  return (data as BlogRow[]).map(rowToPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug);
}

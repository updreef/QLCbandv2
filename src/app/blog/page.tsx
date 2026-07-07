import type { Metadata } from "next";
import Blog from "@/components/pages/Blog";
import { getBlogPosts } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Verhalen van achter de schermen bij Quarter Life Crisis. Backyard Sessions, tuinconcerten, en het leven als rockband met een quarter life crisis.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <Blog posts={posts} />;
}

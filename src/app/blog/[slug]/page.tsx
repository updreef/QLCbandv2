import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/pages/BlogDetail";
import { getBlogPost, getBlogPosts } from "@/lib/content";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Artikel niet gevonden" };
  return {
    title: post.title,
    description: post.metaDescription || post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription || post.summary,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.summary,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "MusicGroup", name: "Quarter Life Crisis" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://qlcband.nl/blog/${post.slug}`,
    },
  };

  const faqLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <BlogDetail post={post} />
    </>
  );
}

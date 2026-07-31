import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OptredensDetail from "@/components/pages/OptredensDetail";
import { getShow, getShows } from "@/lib/content";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const shows = await getShows();
  return shows.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = await getShow(slug);
  if (!show) return { title: "Optreden niet gevonden" };
  return {
    title: show.title,
    description: show.description.slice(0, 155),
    alternates: { canonical: `/optredens/${show.slug}` },
    openGraph: {
      title: `${show.title} | Quarter Life Crisis`,
      description: show.description.slice(0, 155),
    },
  };
}

export default async function OptredensDetailPage({ params }: Props) {
  const { slug } = await params;
  const show = await getShow(slug);
  if (!show) notFound();

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.title,
    startDate: show.date,
    description: show.description,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: show.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: show.address,
        addressLocality: show.city || "Bunschoten-Spakenburg",
        addressCountry: "NL",
      },
    },
    performer: { "@type": "MusicGroup", name: "Quarter Life Crisis" },
    organizer: { "@type": "MusicGroup", name: "Quarter Life Crisis", url: "https://quarterlifecrisis.nl/" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
      <OptredensDetail show={show} />
    </>
  );
}

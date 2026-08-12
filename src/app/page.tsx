import Home from "@/components/pages/Home";
import { getShows } from "@/lib/content";
import { members } from "@/data";

export const revalidate = 300;

export default async function HomePage() {
  const shows = await getShows();
  const upcomingShow = shows.find((s) => s.status === "upcoming");

  const musicGroupLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Quarter Life Crisis",
    alternateName: "QLC",
    genre: ["Rock", "Pop Rock", "Coverband"],
    url: "https://quarterlifecrisis.nl/",
    logo: "https://quarterlifecrisis.nl/images/logo.png",
    image: "https://quarterlifecrisis.nl/images/band-live.jpg",
    foundingLocation: {
      "@type": "Place",
      name: "Bunschoten-Spakenburg",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bunschoten-Spakenburg",
        addressRegion: "Utrecht",
        addressCountry: "NL",
      },
    },
    areaServed: ["Spakenburg", "Bunschoten", "Amersfoort", "Nijkerk", "Putten", "Eemnes", "Utrecht", "Hilversum"],
    description:
      "Quarter Life Crisis (QLC) is een zeskoppige rockband uit Spakenburg & Amersfoort. Live optredens, covers en eigen werk.",
    slogan: "Play loud, grow up later",
    telephone: "+31640081979",
    sameAs: [
      "https://instagram.com/quarterlifecrisis.band",
      "https://www.tiktok.com/@quarterlifecrisis.band",
      "https://open.spotify.com/user/RubenBeukers",
    ],
    member: members.map((m) => ({
      "@type": "OrganizationRole",
      member: { "@type": "Person", name: m.name },
      roleName: m.role,
    })),
    event: shows
      .filter((s) => s.status === "upcoming")
      .map((s) => ({
        "@type": "MusicEvent",
        name: s.title,
        startDate: s.date,
        location: {
          "@type": "Place",
          name: s.location,
          address: {
            "@type": "PostalAddress",
            streetAddress: s.address,
            addressLocality: s.city,
            addressCountry: "NL",
          },
        },
        performer: { "@type": "MusicGroup", name: "Quarter Life Crisis" },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupLd) }}
      />
      <Home upcomingShow={upcomingShow} />
    </>
  );
}

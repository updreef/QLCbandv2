import type { Metadata } from "next";
import BoekOns from "@/components/pages/BoekOns";

export const metadata: Metadata = {
  title: "Boek QLC | Rockband boeken Amersfoort / Spakenburg",
  description:
    "Boek Quarter Life Crisis voor je feest, festival, bruiloft of bedrijfsevenement in Amersfoort, Spakenburg of regio Utrecht. Direct contact met Julian: 06 40 08 19 79.",
  alternates: { canonical: "/boek-ons" },
};

export default function BoekOnsPage() {
  const bookingLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rockband boeken - Quarter Life Crisis",
    description:
      "Boek Quarter Life Crisis (QLC) voor jouw feest, bruiloft, festival of tuinfeest in regio Utrecht en Amersfoort.",
    provider: {
      "@type": "MusicGroup",
      name: "Quarter Life Crisis",
      telephone: "+31640081979",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingLd) }}
      />
      <BoekOns />
    </>
  );
}

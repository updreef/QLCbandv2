import type { Metadata } from "next";
import Sponsors from "@/components/pages/Sponsors";

export const metadata: Metadata = {
  title: "Word sponsor",
  description:
    "Sponsor Quarter Life Crisis: zichtbaarheid bij ~10 optredens per jaar in de regio, op het podiumdoek, op onze socials en op de site. Vijf pakketten — prijs op aanvraag.",
  alternates: { canonical: "/sponsors" },
};

export default function SponsorsPage() {
  return <Sponsors />;
}

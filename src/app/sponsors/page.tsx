import type { Metadata } from "next";
import Sponsors from "@/components/pages/Sponsors";

export const metadata: Metadata = {
  title: "Word sponsor",
  description:
    "Sponsor Quarter Life Crisis: zichtbaarheid bij ~10 optredens per jaar in de regio, op het podiumdoek, op onze socials en op de site. Vijf pakketten van €100 tot €2.000 per jaar — Vriend & Brons direct online.",
  alternates: { canonical: "/sponsors" },
};

export default function SponsorsPage() {
  return <Sponsors />;
}

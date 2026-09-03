import type { Metadata } from "next";
import Sponsors from "@/components/pages/Sponsors";

export const metadata: Metadata = {
  title: "Word sponsor",
  description:
    "Zes vrienden, één droom. Sponsor Quarter Life Crisis en help heel concreet mee — van €100 (Ruben aan nieuwe snaren) tot hoofdsponsor (onze eerste opname). Vriend & Brons regel je direct online.",
  alternates: { canonical: "/sponsors" },
};

export default function SponsorsPage() {
  return <Sponsors />;
}

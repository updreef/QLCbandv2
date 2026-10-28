import type { Metadata } from "next";
import Sponsors from "@/components/pages/Sponsors";

export const metadata: Metadata = {
  title: "Word sponsor",
  description:
    "Zes vrienden, één droom. Sponsor Quarter Life Crisis en help heel concreet mee: van techniek en repetities tot een optreden en eigen muziek. Vriend & Brons regel je direct online.",
  alternates: { canonical: "/sponsors" },
  // Unlisted tijdens de review-fase: pagina is live via directe link, maar niet
  // gelinkt op de site en niet geindexeerd door zoekmachines. Verwijder dit blok
  // (en zet de footer-link terug) zodra de sponsorpagina echt openbaar mag.
  robots: { index: false, follow: false },
};

export default function SponsorsPage() {
  return <Sponsors />;
}

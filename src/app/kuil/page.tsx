import type { Metadata } from "next";
import KuilLanding from "@/components/pages/KuilLanding";

export const metadata: Metadata = {
  title: "Kerstcrisis in De Kuil — 12 december",
  description:
    "Kerstcrisis in De Kuil op 12 december 2026! Live Quarter Life Crisis × DJ Chesto in Sporthal De Kuil, Bunschoten-Spakenburg. Meld je aan en wees erbij.",
  alternates: { canonical: "/kuil" },
  openGraph: {
    title: "Kerstcrisis in De Kuil — 12 december 2026",
    description: "Live Quarter Life Crisis × DJ Chesto. Meld je aan en wees erbij.",
    images: ["/images/kerstcrisis-de-kuil.jpg"],
  },
};

export default function KuilPage() {
  return <KuilLanding />;
}

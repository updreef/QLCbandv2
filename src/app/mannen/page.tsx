import type { Metadata } from "next";
import Mannen from "@/components/pages/Mannen";

export const metadata: Metadata = {
  title: "De Mannen",
  description:
    "Maak kennis met de zes leden van Quarter Life Crisis: Tristan, Ruben, Peter, Niels, Joel en Julian.",
  alternates: { canonical: "/mannen" },
};

export default function MannenPage() {
  return <Mannen />;
}

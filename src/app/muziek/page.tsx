import type { Metadata } from "next";
import Muziek from "@/components/pages/Muziek";

export const metadata: Metadata = {
  title: "Muziek & Setlist",
  description:
    "De setlist van Quarter Life Crisis: van Piano Man tot Seven Nation Army. Twee sets rockcovers met eigen kop en kont.",
  alternates: { canonical: "/muziek" },
};

export default function MuziekPage() {
  return <Muziek />;
}

import type { Metadata } from "next";
import Optredens from "@/components/pages/Optredens";
import { getShows } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Optredens & Shows",
  description:
    "Alle komende en afgelopen shows van Quarter Life Crisis. Boek QLC voor een live rockshow in Spakenburg, Amersfoort of daarbuiten.",
  alternates: { canonical: "/optredens" },
};

export default async function OptredensPage() {
  const shows = await getShows();
  return <Optredens shows={shows} />;
}

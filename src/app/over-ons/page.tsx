import type { Metadata } from "next";
import OverOns from "@/components/pages/OverOns";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Zes mannen, midden twintig, één vraag: waarom zijn we gestopt met muziek maken? Lees het verhaal achter Quarter Life Crisis.",
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPage() {
  return <OverOns />;
}

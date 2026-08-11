import type { Metadata } from "next";
import { Bebas_Neue, Inter, Anton, Special_Elite } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const typewriter = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quarterlifecrisis.nl"),
  title: {
    default: "Quarter Life Crisis | Band uit Spakenburg & Amersfoort",
    template: "%s | Quarter Life Crisis",
  },
  description:
    "Quarter Life Crisis (QLC) is een zeskoppige band uit Spakenburg & Amersfoort. Live optredens, covers en eigen werk. Boek QLC voor je feest, festival of bedrijfsevent.",
  authors: [{ name: "Quarter Life Crisis" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Quarter Life Crisis",
    title: "Quarter Life Crisis | Band uit Spakenburg & Amersfoort",
    description:
      "Zeskoppige band uit Spakenburg & Amersfoort. Play loud, grow up later. Boek QLC voor je feest of festival.",
    url: "https://quarterlifecrisis.nl/",
    images: [
      {
        url: "/images/band-live.jpg",
        alt: "Quarter Life Crisis live op het podium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quarter Life Crisis | Band uit Spakenburg & Amersfoort",
    description:
      "Zeskoppige band uit Spakenburg & Amersfoort. Play loud, grow up later.",
    images: ["/images/band-live.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${bebas.variable} ${inter.variable} ${anton.variable} ${typewriter.variable}`}
    >
      <body className="bg-brand-paper text-brand-ink min-h-screen flex flex-col justify-between selection:bg-brand-pd selection:text-brand-crm font-sans overflow-x-hidden antialiased">
        <div className="qlc-grain" aria-hidden="true" />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

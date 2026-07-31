import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://quarterlifecrisis.nl"),
  title: {
    default: "Quarter Life Crisis | Rockband uit Spakenburg & Amersfoort",
    template: "%s | Quarter Life Crisis",
  },
  description:
    "Quarter Life Crisis (QLC) is een zeskoppige rockband uit Spakenburg & Amersfoort. Live optredens, covers en eigen werk. Boek QLC voor je feest, festival of bedrijfsevent.",
  authors: [{ name: "Quarter Life Crisis" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Quarter Life Crisis",
    title: "Quarter Life Crisis | Rockband uit Spakenburg & Amersfoort",
    description:
      "Zeskoppige rockband uit Spakenburg & Amersfoort. Play loud, grow up later. Boek QLC voor je feest of festival.",
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
    title: "Quarter Life Crisis | Rockband uit Spakenburg & Amersfoort",
    description:
      "Zeskoppige rockband uit Spakenburg & Amersfoort. Play loud, grow up later.",
    images: ["/images/band-live.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col justify-between selection:bg-brand-neon selection:text-brand-bg font-sans overflow-x-hidden antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

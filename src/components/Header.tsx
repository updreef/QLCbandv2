"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Optredens", href: "/optredens" },
  { label: "Muziek", href: "/muziek" },
  { label: "Mannen", href: "/mannen" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sluit mobiel menu bij routewissel
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-brand-nav border-b-2 border-brand-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Beeldmerk — paars QLC-logo. Zie BRANDBOOK.md */}
        <Link
          href="/"
          aria-label="Quarter Life Crisis — home"
          className="group inline-flex items-center"
        >
          <img
            src="/images/brand/qlc-beeldmerk-purple.png"
            alt="Quarter Life Crisis"
            width={56}
            height={48}
            className="h-9 md:h-10 w-auto transition-transform duration-300 group-hover:-rotate-6"
          />
        </Link>

        {/* Desktop navigatie */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-stamp uppercase text-xs tracking-[0.16em] pb-0.5 border-b-2 transition-colors ${
                isActive(link.href)
                  ? "border-brand-pm text-brand-pm"
                  : "border-transparent text-brand-ink hover:border-brand-tl hover:text-brand-tl"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/boek-ons"
            className="font-poster uppercase text-sm tracking-wider px-4 py-2 bg-brand-pd text-brand-crm border-2 border-brand-ink shadow-[4px_4px_0_0_#191319] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#191319] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_#191319] transition-all"
          >
            Boek ons
          </Link>
        </nav>

        {/* Mobiele hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 border-2 border-brand-ink bg-brand-paper text-brand-ink"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobiel menu — dekkend */}
      {isOpen && (
        <div className="lg:hidden bg-brand-nav border-t-2 border-brand-ink px-4 sm:px-6 py-4 shadow-[0_14px_22px_rgba(0,0,0,0.18)]">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-stamp uppercase text-sm tracking-[0.14em] py-3 border-b border-brand-ink/10 ${
                  isActive(link.href) ? "text-brand-pm" : "text-brand-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/boek-ons"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center font-poster uppercase tracking-wider py-3 bg-brand-pd text-brand-crm border-2 border-brand-ink"
            >
              Boek ons
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

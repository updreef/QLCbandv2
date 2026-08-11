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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-brand-base3/95 backdrop-blur-sm border-b border-brand-crm/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Beeldmerk — wit QLC-logo op donker. Zie BRANDBOOK.md */}
        <Link
          href="/"
          aria-label="Quarter Life Crisis — home"
          className="group inline-flex items-center"
        >
          <img
            src="/images/brand/qlc-beeldmerk-white.png"
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
                  ? "border-brand-tlbr text-brand-tlbr"
                  : "border-transparent text-brand-crm/75 hover:border-brand-tlbr hover:text-brand-tlbr"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/boek-ons"
            className="font-poster uppercase text-base tracking-wider px-5 py-2 bg-brand-pm text-brand-crm border-2 border-brand-crm/20 hover:bg-brand-pd hover:border-brand-tlbr transition-colors"
          >
            Boek ons
          </Link>
        </nav>

        {/* Mobiele hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 border-2 border-brand-crm/30 bg-brand-base2 text-brand-crm"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobiel menu — dekkend */}
      {isOpen && (
        <div className="lg:hidden bg-brand-base3 border-t border-brand-crm/10 px-4 sm:px-6 py-4 shadow-[0_14px_22px_rgba(0,0,0,0.4)]">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-stamp uppercase text-sm tracking-[0.14em] py-3 border-b border-brand-crm/10 ${
                  isActive(link.href) ? "text-brand-tlbr" : "text-brand-crm/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/boek-ons"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center font-poster uppercase tracking-wider py-3 bg-brand-pm text-brand-crm border-2 border-brand-crm/20"
            >
              Boek ons
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

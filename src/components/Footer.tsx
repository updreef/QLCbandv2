import { Phone, MapPin, ArrowRight, Instagram, Mail } from "lucide-react";

const navItems: [string, string][] = [
  ["Home", "/"],
  ["Optredens", "/optredens"],
  ["Boek ons", "/boek-ons"],
  ["Over ons", "/over-ons"],
  ["De Mannen", "/mannen"],
  ["Repertoire", "/muziek"],
  ["Onze Blog", "/blog"],
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-base3 text-brand-crm pt-14 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t-4 border-brand-pm">
      {/* Subtiele halftoon-textuur */}
      <div className="qlc-halftone absolute inset-0 opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-brand-crm/15 pb-12 mb-8">
          {/* Kolom 1: pitch */}
          <div className="flex flex-col gap-4">
            <img
              src="/images/brand/qlc-logo.png"
              alt="Quarter Life Crisis"
              width={655}
              height={655}
              className="w-44 max-w-full h-auto border border-brand-crm/15 rounded-lg"
            />
            <p className="text-sm text-brand-crm/60 max-w-sm leading-relaxed">
              Zes jonge muzikanten uit Bunschoten-Spakenburg en Amersfoort die herrie maken om volwassenheid nog even uit te stellen. Wij spelen de vetste covers van toen en nu!
            </p>
            <div className="mt-1 font-stamp uppercase tracking-widest text-brand-tlbr text-sm border border-brand-crm/20 px-3 py-1.5 w-fit -rotate-1">
              &ldquo;Play loud, grow up later&rdquo;
            </div>
          </div>

          {/* Kolom 2: navigatie */}
          <div className="flex flex-col gap-4">
            <h4 className="font-stamp text-xs tracking-[0.2em] text-brand-tlbr uppercase">
              Navigatie
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-brand-crm/70 hover:text-brand-tlbr hover:translate-x-1 transition-all flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 text-brand-pb" /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 3: contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-stamp text-xs tracking-[0.2em] text-brand-tlbr uppercase">
              Boekingen &amp; contact
            </h4>
            <p className="text-sm text-brand-crm/70">
              Heb je een vraag of wil je ons boeken voor een feest, kroeg of festival? Neem direct contact op met Julian Hugenholtz.
            </p>
            <div className="flex flex-col gap-3 mt-1">
              <a
                href="tel:+31640081979"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <Phone className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">Boekingen &mdash; Julian Hugenholtz</p>
                  <p className="font-semibold">+31 6 40 08 19 79</p>
                </div>
              </a>
              <a
                href="mailto:hugenholtzjulian@gmail.com"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <Mail className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">E-mail</p>
                  <p className="font-semibold break-all">hugenholtzjulian@gmail.com</p>
                </div>
              </a>
              <a
                href="https://instagram.com/quarterlifecrisis.band"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <Instagram className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">Instagram</p>
                  <p className="font-semibold">@quarterlifecrisis.band</p>
                </div>
              </a>
              <a
                href="https://www.tiktok.com/@quarterlifecrisis.band"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4 text-brand-tlbr">
                    <path d="M16.6 5.8a4.3 4.3 0 0 1-1.1-2.8h-3v11.6a2.1 2.1 0 1 1-2-2.7c.2 0 .4 0 .6.1V8.9a5.2 5.2 0 0 0-.6 0 5.1 5.1 0 1 0 5.1 5.1V8.7a7.3 7.3 0 0 0 4 1.2V6.9a4.3 4.3 0 0 1-3-1.1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">TikTok</p>
                  <p className="font-semibold">@quarterlifecrisis.band</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <MapPin className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">Basislocatie</p>
                  <p className="font-semibold">Spakenburg / Amersfoort, NL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onderbalk */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-crm/50 font-stamp">
          <p>© {currentYear} Quarter Life Crisis (QLC). Alle rechten voorbehouden.</p>
          <span>
            Made with passion by{" "}
            <a
              href="https://updreef.nl"
              target="_blank"
              rel="noopener"
              className="text-brand-tlbr hover:text-brand-pb transition-colors underline underline-offset-4"
            >
              Updreef
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

import { Mail, Phone, MapPin, Shield, ArrowRight } from "lucide-react";

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
              src="/images/brand/qlc-lockup-purple.png"
              alt="Quarter Life Crisis"
              width={1100}
              height={598}
              className="w-72 max-w-full h-auto border border-brand-crm/15 rounded-md"
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
              Heb je een vraag of wil je ons boeken voor een feest, kroeg of festival? Neem direct contact op met Ruben Beukers.
            </p>
            <div className="flex flex-col gap-3 mt-1">
              <a
                href="mailto:Ruben_beukers@outlook.com"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <Mail className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">E-mailadres</p>
                  <p className="font-semibold">Ruben_beukers@outlook.com</p>
                </div>
              </a>
              <a
                href="tel:+31640420054"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <Phone className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">Ruben &mdash; boekingen</p>
                  <p className="font-semibold">+31 6 40 42 00 54</p>
                </div>
              </a>
              <a
                href="tel:+31640081979"
                className="flex items-center gap-3 text-sm hover:text-brand-tlbr transition-colors"
              >
                <div className="p-2 bg-brand-pm border border-brand-crm/20 rounded">
                  <Phone className="w-4 h-4 text-brand-tlbr" />
                </div>
                <div>
                  <p className="text-xs text-brand-crm/50 font-stamp">Manager &mdash; Julian Hugenholtz</p>
                  <p className="font-semibold">+31 6 40 08 19 79</p>
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
          <div className="flex gap-5 items-center">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-brand-tlbr" /> KVK geregistreerd
            </span>
            <span className="text-brand-crm/25">|</span>
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
      </div>
    </footer>
  );
}

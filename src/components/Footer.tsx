import { Mail, Phone, MapPin, Calendar, Music, Shield, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-bg-3 border-t-4 border-brand-cream text-brand-text py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-2 border-brand-cream/10 pb-12 mb-12">
          
          {/* Column 1: Band Pitch */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-3xl tracking-wider text-brand-cream flex items-center gap-2">
              <span className="bg-brand-red text-white px-2 py-0.5 border-2 border-brand-cream text-lg rotate-[-2deg] inline-block shadow-[3px_3px_0_0_#f1f1f1]">
                QLC
              </span>
              QUARTER LIFE CRISIS
            </h3>
            <p className="text-sm text-brand-text-muted max-w-sm leading-relaxed">
              Zes jonge muzikanten uit Bunschoten-Spakenburg en Amersfoort die herrie maken om volwassenheid nog even uit te stellen. Wij spelen de vetste rockcovers van toen en nu!
            </p>
            <div className="mt-2 font-display uppercase tracking-widest text-brand-amber text-lg bg-brand-bg-2/50 border border-brand-cream/10 px-3 py-1 w-fit rotate-[-1deg]">
              "Play loud, grow up later"
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xl tracking-widest text-brand-amber uppercase">
              Navigatie
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="#/" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> Home
              </a>
              <a href="#/optredens" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> Optredens
              </a>
              <a href="#/boek-ons" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> Boek ons
              </a>
              <a href="#/over-ons" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> Over ons
              </a>
              <a href="#/mannen" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> De Mannen
              </a>
              <a href="#/muziek" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> Repertoire
              </a>
              <a href="#/blog" className="text-sm text-brand-text-muted hover:text-brand-neon hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-brand-neon" /> Onze Blog
              </a>
            </div>
          </div>

          {/* Column 3: Contact & Bookings */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xl tracking-widest text-brand-red uppercase">
              Boekingen & Contact
            </h4>
            <p className="text-sm text-brand-text-muted">
              Heb je een vraag of wil je ons boeken voor een feest, kroeg of festival? Neem direct contact op met Ruben Beukers.
            </p>
            <div className="flex flex-col gap-3 mt-1">
              <a 
                href="mailto:Ruben_beukers@outlook.com" 
                className="flex items-center gap-3 text-sm text-brand-text hover:text-brand-neon transition-colors group"
              >
                <div className="p-2 bg-brand-bg-2 border border-brand-cream/20 group-hover:border-brand-neon rounded-lg transition-colors">
                  <Mail className="w-4 h-4 text-brand-amber" />
                </div>
                <div>
                  <p className="text-xs text-brand-text-muted font-mono">E-mailadres</p>
                  <p className="font-semibold">Ruben_beukers@outlook.com</p>
                </div>
              </a>
              <a 
                href="tel:+31640420054" 
                className="flex items-center gap-3 text-sm text-brand-text hover:text-brand-neon transition-colors group"
              >
                <div className="p-2 bg-brand-bg-2 border border-brand-cream/20 group-hover:border-brand-neon rounded-lg transition-colors">
                  <Phone className="w-4 h-4 text-brand-amber" />
                </div>
                <div>
                  <p className="text-xs text-brand-text-muted font-mono">Telefoonnummer</p>
                  <p className="font-semibold">+31 6 40 42 00 54</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-sm text-brand-text">
                <div className="p-2 bg-brand-bg-2 border border-brand-cream/20 rounded-lg">
                  <MapPin className="w-4 h-4 text-brand-amber" />
                </div>
                <div>
                  <p className="text-xs text-brand-text-muted font-mono">Basislocatie</p>
                  <p className="font-semibold">Spakenburg / Amersfoort, NL</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted font-mono">
          <p>© {currentYear} Quarter Life Crisis (QLC). Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-brand-amber" /> KVK geregistreerd
            </span>
            <span className="text-brand-text-muted/40">|</span>
            <span>Made with passion by Updreef</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

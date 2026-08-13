"use client";

import { useEffect } from "react";
import { Phone, MapPin, Mail, Instagram, HelpCircle } from "lucide-react";

export default function BoekOns() {
  // Laad de Tally-embed (auto-resize) — geen eigen mailservice nodig.
  useEffect(() => {
    const src = "https://tally.so/widgets/embed.js";
    const load = () => {
      const T = (window as unknown as { Tally?: { loadEmbeds: () => void } }).Tally;
      if (T) {
        T.loadEmbeds();
      } else {
        document
          .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
          .forEach((e) => {
            e.src = e.dataset.tallySrc || "";
          });
      }
    };
    if ((window as unknown as { Tally?: unknown }).Tally) {
      load();
      return;
    }
    if (document.querySelector(`script[src="${src}"]`)) {
      load();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = load;
    s.onerror = load;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <p className="font-stamp text-brand-tlbr uppercase text-xs tracking-[0.25em]">Boekingen &amp; offertes</p>
          <h1 className="font-poster uppercase text-brand-crm text-6xl sm:text-7xl mt-2">Boek QLC</h1>
          <p className="text-brand-crm/60 max-w-2xl mt-4 text-sm sm:text-base leading-relaxed">
            Bruiloft, tuinfeest, café of festival? Vul het formulier in &mdash; we sturen binnen 24 uur een vrijblijvende offerte terug. Hoe meer je invult, hoe scherper we de show kunnen afstemmen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Tally-formulier */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-brand-crm/15 shadow-[8px_8px_0_0_#5d2a58] bg-white">
              <iframe
                data-tally-src="https://tally.so/embed/ODqdNK?alignLeft=1&hideTitle=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height={820}
                frameBorder={0}
                title="Boek QLC"
                className="w-full block"
              />
            </div>
          </div>

          {/* Side info */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Wat regelen wij vs jij */}
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#1c857a]">
              <img
                src="/images/band-live.jpg"
                alt="Quarter Life Crisis live"
                className="w-full h-56 object-cover border-b border-brand-crm/15"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 flex flex-col gap-5">
                <div>
                  <h3 className="font-display text-2xl text-brand-cream uppercase tracking-wide">Wat brengt QLC mee?</h3>
                  <ul className="mt-3 space-y-2 text-xs text-brand-text-muted font-sans">
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Zes muzikanten: zang, gitaren, bas, drums, piano/keys</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Eigen instrumenten en backline</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Mixer en in-ear monitoring voor de band zelf</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Setlist, plus ruimte voor jouw verzoeknummers</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-neon font-bold">•</span><span>Pauze-muziek via de PA (rockplaylists)</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg text-brand-amber uppercase tracking-wide">Wat regel je zelf?</h3>
                  <ul className="mt-3 space-y-2 text-xs text-brand-text-muted font-sans">
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span><strong className="text-brand-cream">PA / geluidsinstallatie</strong> voor het publiek (of samen extern regelen)</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Podium of speelplek van min. ~4×3 m</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Stroom: minimaal 2 aparte groepen dichtbij het podium</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Verlichting (basis is genoeg, sfeer mag zelf)</span></li>
                    <li className="flex items-start gap-2"><span className="text-brand-amber font-bold">•</span><span>Bij buitenfeest: overkapping ivm regen</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Direct contact */}
            <div className="bg-brand-base2 border border-brand-crm/15 p-6 rounded-xl shadow-[6px_6px_0_0_#5d2a58] flex flex-col gap-4">
              <h3 className="font-display text-xl text-brand-amber uppercase tracking-wider">RECHTSTREEKS CONTACT</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Liever bellen of mailen? Julian Hugenholtz regelt de boekingen.
              </p>
              <div className="flex flex-col gap-3 font-mono text-xs mt-1">
                <a href="mailto:hugenholtzjulian@gmail.com" className="flex items-center gap-2 text-brand-cream hover:text-brand-neon transition-colors break-all">
                  <Mail className="w-4 h-4 text-brand-red shrink-0" /> hugenholtzjulian@gmail.com
                </a>
                <a href="tel:+31640081979" className="flex items-center gap-2 text-brand-cream hover:text-brand-neon transition-colors">
                  <Phone className="w-4 h-4 text-brand-amber" /> Julian Hugenholtz — +31 6 40 08 19 79
                </a>
                <a href="https://instagram.com/quarterlifecrisis.band" target="_blank" rel="noopener" className="flex items-center gap-2 text-brand-cream hover:text-brand-neon transition-colors">
                  <Instagram className="w-4 h-4 text-brand-amber" /> @quarterlifecrisis.band
                </a>
                <a href="https://www.tiktok.com/@quarterlifecrisis.band" target="_blank" rel="noopener" className="flex items-center gap-2 text-brand-cream hover:text-brand-neon transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4 text-brand-amber"><path d="M16.6 5.8a4.3 4.3 0 0 1-1.1-2.8h-3v11.6a2.1 2.1 0 1 1-2-2.7c.2 0 .4 0 .6.1V8.9a5.2 5.2 0 0 0-.6 0 5.1 5.1 0 1 0 5.1 5.1V8.7a7.3 7.3 0 0 0 4 1.2V6.9a4.3 4.3 0 0 1-3-1.1z" /></svg> TikTok @quarterlifecrisis.band
                </a>
                <div className="flex items-center gap-2 text-brand-text-muted">
                  <MapPin className="w-4 h-4 text-brand-neon" /> Spakenburg / Amersfoort, NL
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="border border-brand-cream/10 p-5 rounded-lg bg-brand-base3 text-xs leading-relaxed">
              <h4 className="font-bold text-brand-cream mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-amber" /> Veelgestelde vragen
              </h4>
              <p className="text-brand-text-muted mb-3">
                <strong>Wat kost het om QLC te boeken?</strong><br />
                Hangt af van speeltijd, reistijd en of we een PA moeten inhuren. Vraag een vrijblijvende offerte aan via het formulier.
              </p>
              <p className="text-brand-text-muted">
                <strong>Kan ik een verzoeknummer aanvragen?</strong><br />
                Ja, geef het door in het formulier. We nemen &rsquo;em graag mee in de repetitie.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

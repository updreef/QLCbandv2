"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus, Ticket } from "lucide-react";

/**
 * Na het aanmelden voor De Kuil: kaarten haal je op bij De Kuil, en je laat
 * Dave via WhatsApp weten hoeveel. Kies het aantal en de knop opent WhatsApp
 * met het bericht al ingevuld.
 */
const DAVE = { naam: "Dave", nummer: "31636121631", weergave: "+31 6 36 12 16 31" };
const MAX = 10;

export default function KaartenAppen({ naam = "" }: { naam?: string }) {
  const [aantal, setAantal] = useState(1);
  const kaarten = aantal === 1 ? "1 kaart" : `${aantal} kaarten`;

  const tekst = `Hoi ${DAVE.naam}! ${naam ? `Ik ben ${naam} en ik` : "Ik"} wil graag ${kaarten} voor QLC in De Kuil op 12 december. Wanneer kan ik ${aantal === 1 ? "hem" : "ze"} ophalen?`;
  const link = `https://wa.me/${DAVE.nummer}?text=${encodeURIComponent(tekst)}`;

  const stapKnop =
    "w-10 h-10 rounded-lg border border-brand-crm/25 text-brand-crm inline-flex items-center justify-center hover:border-brand-tlbr disabled:opacity-35 disabled:hover:border-brand-crm/25";

  return (
    <div className="mt-4 border-t border-brand-crm/15 pt-4 text-left">
      <div className="flex items-center gap-2">
        <Ticket className="w-4 h-4 text-brand-tlbr" />
        <p className="text-sm font-semibold text-brand-crm">Nu nog je kaarten</p>
      </div>
      <p className="text-xs text-brand-crm/70 mt-1">
        Kaarten haal je op bij De Kuil. App {DAVE.naam} hoeveel je er wilt, dan legt hij ze voor je klaar.
      </p>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2" role="group" aria-label="Aantal kaarten">
          <button
            type="button"
            className={stapKnop}
            onClick={() => setAantal((a) => Math.max(1, a - 1))}
            disabled={aantal <= 1}
            aria-label="Eén kaart minder"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-poster text-2xl text-brand-crm w-24 text-center tabular-nums" aria-live="polite">
            {kaarten}
          </span>
          <button
            type="button"
            className={stapKnop}
            onClick={() => setAantal((a) => Math.min(MAX, a + 1))}
            disabled={aantal >= MAX}
            aria-label="Eén kaart meer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-poster uppercase tracking-wider text-base px-6 py-3 bg-[#25D366] text-[#0b2e1c] rounded-lg hover:brightness-110 transition inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" /> App {DAVE.naam} voor {kaarten}
        </a>
      </div>

      <p className="text-[11px] text-brand-crm/55 mt-2">
        Werkt de knop niet? App {DAVE.naam} op{" "}
        <a href={link} target="_blank" rel="noopener noreferrer" className="underline whitespace-nowrap">
          {DAVE.weergave}
        </a>
      </p>
    </div>
  );
}

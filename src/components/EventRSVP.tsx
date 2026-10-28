"use client";

import { useEffect, useState } from "react";
import { PartyPopper, Check, Loader2, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Aanmeld-blok met live teller voor een evenement.
 * - Teller leest via de Supabase-functie rsvp_count() (privacyveilig: alleen het aantal,
 *   geen namen/e-mails publiek).
 * - Aanmelding wordt als rij in public.event_rsvps gezet (anon mag alleen inserten).
 * Werkt pas zodra de Supabase-database actief is + de migratie is gedraaid; tot die tijd
 * valt alles netjes terug op een vriendelijke melding.
 */
export default function EventRSVP({
  eventSlug,
  dateLabel = "het feest",
}: {
  eventSlug: string;
  dateLabel?: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [coming, setComing] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "dup" | "error">("idle");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) return;
      const { data, error } = await supabase.rpc("rsvp_count", { p_event_slug: eventSlug });
      if (active && !error && typeof data === "number") setCount(data);
    })();
    return () => {
      active = false;
    };
  }, [eventSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (!coming) {
      setMsg("Vink even aan dat je erbij bent \u{1F389}");
      return;
    }
    if (!supabase) {
      setStatus("error");
      setMsg("Aanmelden kan nu even niet. Probeer het later nog eens.");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase.from("event_rsvps").insert({
      event_slug: eventSlug,
      first_name: first.trim(),
      last_name: last.trim(),
      email: email.trim().toLowerCase(),
      coming: true,
    });
    if (error) {
      if (error.code === "23505") {
        setStatus("dup");
      } else {
        setStatus("error");
        setMsg("Er ging iets mis. Probeer het later nog eens.");
      }
      return;
    }
    setStatus("done");
    setCount((c) => (c ?? 0) + 1);
  }

  const counterLine =
    count === null
      ? "Kom je ook? \u{1F389}"
      : count === 0
        ? "Wees de eerste die zich aanmeldt! \u{1F389}"
        : `Al ${count} ${count === 1 ? "feestbeest is" : "feestbeesten zijn"} erbij! \u{1F389}`;

  return (
    <div
      id="aanmelden"
      className="bg-brand-bg-3 border-2 border-brand-neon rounded-xl p-6 hard-shadow-cyan mt-4 scroll-mt-28"
    >
      <div className="flex items-center gap-2 mb-1">
        <PartyPopper className="w-5 h-5 text-brand-amber" />
        <span className="font-mono text-xs uppercase tracking-widest text-brand-neon">Ben jij erbij?</span>
      </div>
      <p className="font-display text-3xl sm:text-4xl text-brand-cream uppercase tracking-wide leading-none">
        {counterLine}
      </p>

      {status === "done" ? (
        <div className="mt-4 flex items-start gap-3 bg-brand-bg-2 border border-brand-neon/40 rounded-lg p-4">
          <Check className="w-5 h-5 text-brand-neon shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-cream">Yes, je staat op de lijst!</p>
            <p className="text-xs text-brand-text-muted mt-0.5">Tot {dateLabel}. We gaan los. 🤘</p>
          </div>
        </div>
      ) : status === "dup" ? (
        <div className="mt-4 flex items-start gap-3 bg-brand-bg-2 border border-brand-amber/40 rounded-lg p-4">
          <Check className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
          <p className="text-sm text-brand-cream">Je bent al aangemeld, tot dan! 🎉</p>
        </div>
      ) : !open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 w-full sm:w-auto font-display uppercase tracking-widest text-sm px-7 py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce inline-flex items-center justify-center gap-2"
        >
          <Users className="w-4 h-4" /> Meld mij aan
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              required
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              placeholder="Voornaam"
              className="bg-brand-bg-2 border border-brand-cream/20 rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder:text-brand-text-muted/60 focus:outline-none focus:border-brand-neon"
            />
            <input
              required
              value={last}
              onChange={(e) => setLast(e.target.value)}
              placeholder="Achternaam"
              className="bg-brand-bg-2 border border-brand-cream/20 rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder:text-brand-text-muted/60 focus:outline-none focus:border-brand-neon"
            />
          </div>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mailadres"
            className="bg-brand-bg-2 border border-brand-cream/20 rounded-lg px-3 py-2.5 text-sm text-brand-cream placeholder:text-brand-text-muted/60 focus:outline-none focus:border-brand-neon"
          />
          <label className="flex items-start gap-2.5 text-sm text-brand-cream cursor-pointer">
            <input
              type="checkbox"
              checked={coming}
              onChange={(e) => setComing(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-brand-neon shrink-0"
            />
            <span>Ja, ik ben erbij op {dateLabel} en heb zin in een feestje in de Kuil! 🎉</span>
          </label>
          {msg && <p className="text-xs text-brand-amber">{msg}</p>}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto font-display uppercase tracking-widest text-sm px-7 py-3 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Bezig...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Meld mij aan
              </>
            )}
          </button>
          <p className="text-[10px] text-brand-text-muted font-mono">
            We gebruiken je gegevens alleen om te weten wie er komt. Geen spam.
          </p>
        </form>
      )}
    </div>
  );
}

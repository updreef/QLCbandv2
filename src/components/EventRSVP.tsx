"use client";

import { useEffect, useState } from "react";
import { PartyPopper, Check, Loader2, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Aanmeld-blok met live teller voor een evenement.
 * - Teller via de Supabase-functie rsvp_count() (privacyveilig: alleen het aantal).
 * - Aanmelding als rij in public.event_rsvps (anon mag alleen inserten).
 * Valt netjes terug op een vriendelijke melding zolang de database nog uit staat.
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
      setMsg("Vink even aan dat je erbij bent 🎉");
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
      if (error.code === "23505") setStatus("dup");
      else {
        setStatus("error");
        setMsg("Er ging iets mis. Probeer het later nog eens.");
      }
      return;
    }
    setStatus("done");
    setCount((c) => (c ?? 0) + 1);
  }

  const inputClass =
    "w-full bg-brand-base3/70 border border-brand-crm/20 rounded-lg px-3.5 py-3 text-sm text-brand-crm placeholder:text-brand-crm/40 focus:outline-none focus:border-brand-tlbr";

  return (
    <div
      id="aanmelden"
      className="relative overflow-hidden rounded-2xl border border-brand-tlbr/40 bg-gradient-to-br from-brand-pd to-brand-base2 shadow-[10px_10px_0_0_#1c857a] scroll-mt-28"
    >
      <div className="qlc-halftone absolute inset-0 opacity-10 pointer-events-none" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <PartyPopper className="w-5 h-5 text-brand-green-light" />
          <span className="font-stamp text-[11px] uppercase tracking-[0.22em] text-brand-tlbr">Ben jij erbij?</span>
        </div>

        {/* Teller */}
        {count !== null && count > 0 ? (
          <p className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="font-poster text-6xl sm:text-7xl text-brand-green-light leading-none">{count}</span>
            <span className="font-poster uppercase text-brand-crm text-2xl sm:text-3xl tracking-wide">
              {count === 1 ? "feestbeest is erbij! 🎉" : "feestbeesten zijn erbij! 🎉"}
            </span>
          </p>
        ) : (
          <p className="mt-2 font-poster uppercase text-brand-crm text-3xl sm:text-4xl leading-none tracking-wide">
            {count === 0 ? "Wees de eerste! 🎉" : "Kom je ook? 🎉"}
          </p>
        )}

        {status === "done" ? (
          <div className="mt-5 flex items-start gap-3 bg-brand-base3/60 border border-brand-green-light/40 rounded-xl p-4">
            <Check className="w-5 h-5 text-brand-green-light shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-brand-crm">Yes, je staat op de lijst!</p>
              <p className="text-xs text-brand-crm/70 mt-0.5">Tot {dateLabel}. We gaan los. 🤘</p>
            </div>
          </div>
        ) : status === "dup" ? (
          <div className="mt-5 flex items-start gap-3 bg-brand-base3/60 border border-brand-tlbr/40 rounded-xl p-4">
            <Check className="w-5 h-5 text-brand-tlbr shrink-0 mt-0.5" />
            <p className="text-sm text-brand-crm">Je bent al aangemeld, tot dan! 🎉</p>
          </div>
        ) : !open ? (
          <button
            onClick={() => setOpen(true)}
            className="mt-5 w-full sm:w-auto font-poster uppercase tracking-wider text-base px-8 py-3.5 bg-brand-tlbr text-brand-base3 rounded-lg hover:bg-brand-crm transition-colors inline-flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" /> Meld mij aan
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 max-w-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Voornaam" className={inputClass} />
              <input required value={last} onChange={(e) => setLast(e.target.value)} placeholder="Achternaam" className={inputClass} />
            </div>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mailadres" className={inputClass} />
            <label className="flex items-start gap-2.5 text-sm text-brand-crm cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={coming}
                onChange={(e) => setComing(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-tlbr shrink-0"
              />
              <span>Ja, ik ben erbij op {dateLabel} en heb zin in een feestje in de Kuil! 🎉</span>
            </label>
            {msg && <p className="text-xs text-brand-green-light">{msg}</p>}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto font-poster uppercase tracking-wider text-base px-8 py-3.5 bg-brand-tlbr text-brand-base3 rounded-lg hover:bg-brand-crm transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Bezig...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" /> Meld mij aan
                </>
              )}
            </button>
            <p className="text-[10px] text-brand-crm/45 font-stamp">
              We gebruiken je gegevens alleen om te weten wie er komt. Geen spam.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PartyPopper, Check, Loader2, Clock, MapPin, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const EVENT_SLUG = "feest-de-kuil";
const TARGET = new Date("2026-12-12T20:00:00+01:00").getTime();
// Startgetal: de teller begint hier en telt elke echte aanmelding erbovenop (28 = "0").
const BASE_COUNT = 28;

function useCountUp(target: number | null, duration = 1500) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (target === null) return;
    const start = prev.current;
    const delta = target - start;
    if (delta === 0) return setVal(target);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(start + delta * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

type CD = { d: number; h: number; m: number; s: number };

export default function KuilLanding() {
  const [realCount, setRealCount] = useState<number | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [cd, setCd] = useState<CD | null>(null);

  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [coming, setComing] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "dup" | "error">("idle");
  const [msg, setMsg] = useState("");

  const displayTarget = realCount === null ? (BASE_COUNT > 0 ? BASE_COUNT : null) : BASE_COUNT + realCount;
  const shown = useCountUp(displayTarget);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) return;
      const [{ data: c }, { data: r }] = await Promise.all([
        supabase.rpc("rsvp_count", { p_event_slug: EVENT_SLUG }),
        supabase.rpc("rsvp_recent_names", { p_event_slug: EVENT_SLUG, p_limit: 14 }),
      ]);
      if (!active) return;
      if (typeof c === "number") setRealCount(c);
      if (Array.isArray(r)) setRecent(r.map((x: { first_name: string }) => x.first_name).filter(Boolean));
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) return setCd({ d: 0, h: 0, m: 0, s: 0 });
      setCd({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (!coming) return setMsg("Vink even aan dat je erbij bent 🎉");
    if (!supabase) {
      setStatus("error");
      return setMsg("Aanmelden kan nu even niet. Probeer het later nog eens.");
    }
    setStatus("submitting");
    const { error } = await supabase.from("event_rsvps").insert({
      event_slug: EVENT_SLUG,
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
    setRealCount((c) => (c ?? 0) + 1);
    setRecent((r) => [first.trim(), ...r].slice(0, 14));
  }

  const input =
    "w-full bg-brand-base3/80 border border-brand-crm/20 rounded-lg px-4 py-3 text-brand-crm placeholder:text-brand-crm/40 focus:outline-none focus:border-brand-tlbr";
  const cdBlocks = cd ? [{ v: cd.d, l: "dagen" }, { v: cd.h, l: "uur" }, { v: cd.m, l: "min" }, { v: cd.s, l: "sec" }] : [];

  const ctaBtn = (label: string, big = false) => {
    if (status === "done")
      return (
        <div className="bg-brand-base3/70 border border-brand-green-light/40 rounded-xl p-5 text-center">
          <div className="text-4xl">🎉🤘</div>
          <p className="font-poster uppercase text-brand-crm text-3xl mt-1">Je bent erbij!</p>
          <p className="text-sm text-brand-crm/75 mt-1">Zie je 12 december in De Kuil. Sleep je crew mee 🔥</p>
        </div>
      );
    if (status === "dup")
      return (
        <div className="bg-brand-base3/70 border border-brand-tlbr/40 rounded-xl p-5 text-center">
          <p className="font-poster uppercase text-brand-crm text-2xl">Je staat al op de lijst 🎉</p>
        </div>
      );
    if (!open)
      return (
        <button
          onClick={() => setOpen(true)}
          className={`font-poster uppercase tracking-wider bg-brand-tlbr text-brand-base3 rounded-xl hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-3 shadow-[0_12px_40px_rgba(47,177,162,0.4)] ${
            big ? "text-2xl sm:text-3xl px-10 py-4 w-full sm:w-auto" : "text-lg px-8 py-3.5"
          }`}
        >
          <PartyPopper className={big ? "w-7 h-7" : "w-5 h-5"} /> {label}
        </button>
      );
    return (
      <form onSubmit={handleSubmit} className="text-left bg-brand-base3/70 border border-brand-crm/15 rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Voornaam" className={input} />
          <input required value={last} onChange={(e) => setLast(e.target.value)} placeholder="Achternaam" className={input} />
        </div>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mailadres" className={`${input} mt-3`} />
        <label className="flex items-start gap-2.5 text-sm text-brand-crm cursor-pointer mt-3">
          <input type="checkbox" checked={coming} onChange={(e) => setComing(e.target.checked)} className="mt-0.5 w-4 h-4 accent-brand-tlbr shrink-0" />
          <span>Ja, ik ben erbij op 12 december en heb zin in een feestje in de Kuil! 🎉</span>
        </label>
        {msg && <p className="text-xs text-brand-green-light mt-2">{msg}</p>}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-4 w-full font-poster uppercase tracking-wider text-lg px-8 py-3.5 bg-brand-tlbr text-brand-base3 rounded-lg hover:bg-brand-crm transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {status === "submitting" ? <><Loader2 className="w-5 h-5 animate-spin" /> Bezig...</> : <><Check className="w-5 h-5" /> Zet mij erbij</>}
        </button>
      </form>
    );
  };

  const Marquee = () => (
    <div className="bg-brand-tl border-y border-brand-base3 overflow-hidden">
      <div className="whitespace-nowrap flex gap-8 py-2 font-poster uppercase tracking-wider text-brand-crm">
        {Array(12)
          .fill("+++ Kerstcrisis in De Kuil +++ 12 december +++ QLC × DJ Chesto +++")
          .map((t, i) => (
            <span key={i} className="animate-marquee">{t}</span>
          ))}
      </div>
    </div>
  );

  return (
    <div className="bg-brand-base3 text-brand-crm overflow-hidden">
      <div className="pt-20">
        <Marquee />
      </div>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 pt-12 pb-16">
        <div className="qlc-halftone absolute inset-0 opacity-[0.08] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(1000px 520px at 50% -5%, rgba(93,42,88,0.6), transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center">
          {/* Poster */}
          <div className="relative">
            <span className="qlc-stamp text-brand-tlbr -rotate-2 inline-block mb-3">Zaterdag 12 december · Sporthal De Kuil</span>
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-brand-pm/30 blur-2xl" />
              <img
                src="/images/kerstcrisis-de-kuil.jpg"
                alt="Kerstcrisis in De Kuil — Quarter Life Crisis x DJ Chesto"
                className="relative w-full rounded-2xl border border-brand-crm/15 shadow-[12px_12px_0_0_#5d2a58]"
              />
              <span className="qlc-stamp text-brand-base3 bg-brand-green-light rotate-6 absolute -top-3 -right-2 shadow-lg">🎄 Kerst-editie</span>
            </div>
          </div>

          {/* Teller-ticket */}
          <div className="relative overflow-hidden rounded-2xl border border-brand-tlbr/40 bg-gradient-to-br from-brand-pd to-brand-base2 shadow-[12px_12px_0_0_#1c857a] p-6 sm:p-7">
            <div className="qlc-halftone absolute inset-0 opacity-10 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-brand-green-light" />
                <span className="font-stamp text-[11px] uppercase tracking-[0.22em] text-brand-tlbr">Ben jij erbij?</span>
              </div>
              {displayTarget !== null ? (
                <>
                  <div className="font-poster text-7xl sm:text-8xl leading-[0.8] text-brand-green-light mt-1" style={{ textShadow: "0 0 30px rgba(77,205,131,0.45)" }}>{shown}</div>
                  <p className="font-poster uppercase text-brand-crm text-xl sm:text-2xl tracking-wide">
                    {shown === 1 ? "feestbeest is erbij 🎉" : "feestbeesten zijn erbij 🎉"}
                  </p>
                </>
              ) : (
                <p className="font-poster uppercase text-brand-crm text-3xl sm:text-4xl leading-none tracking-wide mt-1">Wees een van de eersten 🎉</p>
              )}

              <div className="flex gap-2 mt-5">
                {cdBlocks.map((b) => (
                  <div key={b.l} className="flex-1 bg-brand-base3/60 border border-brand-crm/15 rounded-lg py-2 text-center">
                    <div className="font-poster text-2xl sm:text-3xl text-brand-crm leading-none tabular-nums">{String(b.v).padStart(2, "0")}</div>
                    <div className="font-stamp text-[9px] uppercase tracking-widest text-brand-crm/50 mt-0.5">{b.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5">{ctaBtn("Ik ben erbij", true)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIALE BEWIJSKRACHT ───────────────────────── */}
      {recent.length > 0 && (
        <section className="px-4 sm:px-6 py-8 bg-brand-base border-y border-brand-crm/10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-stamp text-[11px] uppercase tracking-[0.22em] text-brand-tlbr">Zij gaan ook</span>
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              {recent.map((naam, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-brand-base2 border border-brand-crm/15 rounded-full pl-1.5 pr-3 py-1.5 text-sm text-brand-crm">
                  <span className="w-6 h-6 rounded-full bg-brand-pm flex items-center justify-center text-[11px] font-bold">{naam.slice(0, 1).toUpperCase()}</span>
                  {naam}
                </span>
              ))}
              {realCount !== null && realCount > recent.length && (
                <span className="font-stamp text-sm text-brand-crm/60">en nog {realCount - recent.length} anderen…</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── LINE-UP (met foto's) ───────────────────────── */}
      <section className="relative px-4 sm:px-6 py-16">
        <div className="qlc-halftone absolute inset-0 opacity-[0.05] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="qlc-stamp text-brand-pb -rotate-2 inline-block">De line-up</span>
            <h2 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl mt-3 leading-none">
              Van live band naar <span className="text-brand-tlbr">dansvloer</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl overflow-hidden shadow-[10px_10px_0_0_#5d2a58]">
              <img src="/images/band-live.jpg" alt="Quarter Life Crisis live" className="w-full h-56 object-cover object-[50%_35%] border-b border-brand-crm/15" />
              <div className="p-6">
                <h3 className="font-poster uppercase text-brand-crm text-3xl leading-none">Quarter Life Crisis</h3>
                <p className="text-sm text-brand-crm/65 leading-relaxed mt-2">Zes man, versterkers open, een uur lang volle bak live. Van meezingers tot rockhits, de band die elke zaal plat speelt.</p>
              </div>
            </div>
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl overflow-hidden shadow-[10px_10px_0_0_#1c857a]">
              <img src="/images/chesto.jpg" alt="DJ Chesto" className="w-full h-56 object-cover object-[50%_25%] border-b border-brand-crm/15" />
              <div className="p-6">
                <h3 className="font-poster uppercase text-brand-crm text-3xl leading-none">DJ Chesto</h3>
                <p className="text-sm text-brand-crm/65 leading-relaxed mt-2">Daarna neemt Chesto het over en gaat de vloer door tot in de late uurtjes. Kerst, disco en een volle dansvloer.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {["Live QLC", "DJ Chesto", "Kerstsfeer", "Volle vloer", "Tot in de late uurtjes"].map((t) => (
              <span key={t} className="font-stamp text-xs uppercase tracking-wider text-brand-crm/80 border border-brand-crm/20 rounded-full px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE CTA ─────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-14">
        <div className="relative overflow-hidden max-w-4xl mx-auto bg-gradient-to-br from-brand-pd to-brand-base2 border border-brand-tlbr/40 rounded-2xl p-8 sm:p-12 text-center shadow-[12px_12px_0_0_#1c857a]">
          <div className="qlc-halftone absolute inset-0 opacity-10 pointer-events-none" />
          <div className="relative">
            <span className="qlc-stamp text-brand-tlbr -rotate-2 inline-block">Doe je mee?</span>
            <h2 className="font-poster uppercase text-brand-crm text-5xl sm:text-6xl mt-3 leading-none">Zet jezelf erbij</h2>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5 font-stamp text-sm text-brand-crm/80">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-tlbr" /> zaterdag 12 december · 20:00</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-tlbr" /> Sporthal De Kuil, Bunschoten-Spakenburg</span>
            </div>
            <div className="mt-8 max-w-md mx-auto">{ctaBtn("Ik ben erbij", true)}</div>
            <p className="mt-5">
              <Link href="/optredens/feest-de-kuil" className="font-stamp text-xs text-brand-crm/50 hover:text-brand-tlbr underline underline-offset-4">meer info over de avond</Link>
            </p>
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}

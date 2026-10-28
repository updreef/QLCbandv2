"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PartyPopper, Check, Loader2, Clock, MapPin, Music, Disc3, Users, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

const EVENT_SLUG = "feest-de-kuil";
// Doeldatum: 12 december 2026, 20:00 (CET).
const TARGET = new Date("2026-12-12T20:00:00+01:00").getTime();
// Startgetal voor de teller (band + crew + vrienden die er sowieso zijn).
// Zet op 0 voor een eerlijke start vanaf nul, of hoger voor een head-start.
const BASE_COUNT = 0;

/** Telt soepel op van de vorige waarde naar het doel (easeOutCubic). */
function useCountUp(target: number | null, duration = 1400) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (target === null) return;
    const start = prev.current;
    const delta = target - start;
    if (delta === 0) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + delta * eased));
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

  // Teller + recente namen laden
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

  // Countdown
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

  const cdBlocks = cd
    ? [
        { v: cd.d, l: "dagen" },
        { v: cd.h, l: "uur" },
        { v: cd.m, l: "min" },
        { v: cd.s, l: "sec" },
      ]
    : [];

  return (
    <div className="bg-brand-base3 text-brand-crm overflow-hidden">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 pt-28 pb-16">
        <div className="qlc-halftone absolute inset-0 opacity-[0.07] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(900px 480px at 50% 0%, rgba(93,42,88,0.55), transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-stamp text-[11px] sm:text-xs uppercase tracking-[0.2em] text-brand-tlbr border border-brand-crm/20 rounded-full px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 12 december 2026 · Sporthal De Kuil
          </div>

          <div className="mt-6 relative">
            <div className="absolute -inset-3 rounded-2xl bg-brand-pm/30 blur-2xl" />
            <img
              src="/images/kerstcrisis-de-kuil.jpg"
              alt="Kerstcrisis in De Kuil — Quarter Life Crisis x DJ Chesto"
              className="relative w-full rounded-2xl border border-brand-crm/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Teller */}
          <div className="mt-10">
            {displayTarget !== null ? (
              <>
                <div
                  className="font-poster text-7xl sm:text-8xl md:text-9xl leading-[0.8] text-brand-green-light"
                  style={{ textShadow: "0 0 30px rgba(77,205,131,0.45)" }}
                >
                  {shown}
                </div>
                <p className="font-poster uppercase text-brand-crm text-2xl sm:text-3xl tracking-wide mt-2">
                  {shown === 1 ? "feestbeest is erbij" : "feestbeesten zijn al van de partij"} 🎉
                </p>
              </>
            ) : (
              <p className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl leading-[0.9] tracking-wide">
                Wees een van de eersten die erbij is 🎉
              </p>
            )}
          </div>

          {/* Countdown */}
          <div className="mt-8 flex items-center justify-center gap-2.5 sm:gap-3">
            {cdBlocks.map((b) => (
              <div key={b.l} className="bg-brand-base2 border border-brand-crm/15 rounded-xl px-3 sm:px-4 py-2.5 min-w-[62px] sm:min-w-[72px]">
                <div className="font-poster text-3xl sm:text-4xl text-brand-crm leading-none tabular-nums">
                  {String(b.v).padStart(2, "0")}
                </div>
                <div className="font-stamp text-[9px] uppercase tracking-widest text-brand-crm/50 mt-1">{b.l}</div>
              </div>
            ))}
          </div>

          {/* CTA / formulier */}
          <div className="mt-9">
            {status === "done" ? (
              <div className="mx-auto max-w-md bg-gradient-to-br from-brand-pd to-brand-base2 border border-brand-tlbr/40 rounded-2xl p-6 shadow-[8px_8px_0_0_#1c857a]">
                <div className="text-4xl">🎉🤘</div>
                <p className="font-poster uppercase text-brand-crm text-3xl mt-2">Je bent erbij!</p>
                <p className="text-sm text-brand-crm/75 mt-1">Top. Je staat op de lijst. Zie je 12 december in De Kuil.</p>
                <p className="text-sm text-brand-tlbr mt-3">Deel 'm met je crew, hoe voller hoe beter 🔥</p>
              </div>
            ) : status === "dup" ? (
              <div className="mx-auto max-w-md bg-brand-base2 border border-brand-tlbr/40 rounded-2xl p-6">
                <p className="font-poster uppercase text-brand-crm text-2xl">Je staat al op de lijst 🎉</p>
                <p className="text-sm text-brand-crm/70 mt-1">Tot 12 december. Sleep je vrienden mee.</p>
              </div>
            ) : !open ? (
              <button
                onClick={() => setOpen(true)}
                className="group font-poster uppercase tracking-wider text-xl sm:text-2xl px-10 py-4 bg-brand-tlbr text-brand-base3 rounded-xl hover:scale-[1.03] transition-transform inline-flex items-center gap-3 shadow-[0_12px_40px_rgba(47,177,162,0.4)]"
              >
                <PartyPopper className="w-6 h-6" /> Ik ben erbij
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md text-left bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[8px_8px_0_0_#5d2a58]">
                <p className="font-poster uppercase text-brand-crm text-2xl mb-4 text-center">Zet jezelf op de lijst</p>
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
                  {status === "submitting" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Bezig...</>
                  ) : (
                    <><Check className="w-5 h-5" /> Zet mij erbij</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── SOCIALE BEWIJSKRACHT ───────────────────────── */}
      {recent.length > 0 && (
        <section className="px-4 sm:px-6 py-10 bg-brand-base">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-stamp text-[11px] uppercase tracking-[0.22em] text-brand-tlbr">Zij gaan ook</span>
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              {recent.map((naam, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-brand-base2 border border-brand-crm/15 rounded-full pl-1.5 pr-3 py-1.5 text-sm text-brand-crm">
                  <span className="w-6 h-6 rounded-full bg-brand-pm flex items-center justify-center text-[11px] font-bold text-brand-crm">
                    {naam.slice(0, 1).toUpperCase()}
                  </span>
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

      {/* ── LINE-UP & HYPE ─────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl text-center leading-none">
            Van live band naar <span className="text-brand-tlbr">dansvloer</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#5d2a58] flex flex-col gap-2">
              <Music className="w-7 h-7 text-brand-tlbr" />
              <h3 className="font-poster uppercase text-brand-crm text-2xl">Quarter Life Crisis</h3>
              <p className="text-sm text-brand-crm/65 leading-relaxed">Zes man, versterkers open, een uur lang volle bak live. Van meezingers tot rockhits.</p>
            </div>
            <div className="bg-brand-base2 border border-brand-crm/15 rounded-2xl p-6 shadow-[6px_6px_0_0_#1c857a] flex flex-col gap-2">
              <Disc3 className="w-7 h-7 text-brand-tlbr" />
              <h3 className="font-poster uppercase text-brand-crm text-2xl">DJ Chesto</h3>
              <p className="text-sm text-brand-crm/65 leading-relaxed">Daarna gaat de vloer door tot in de late uurtjes. Kerst, disco en een volle dansvloer.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            {["Live QLC", "DJ Chesto", "Kerstsfeer", "Volle vloer", "Tot in de late uurtjes"].map((t) => (
              <span key={t} className="font-stamp text-xs uppercase tracking-wider text-brand-crm/80 border border-brand-crm/20 rounded-full px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRAKTISCH + HERHAALDE CTA ──────────────────── */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-pd to-brand-base2 border border-brand-tlbr/40 rounded-2xl p-8 sm:p-10 text-center shadow-[10px_10px_0_0_#1c857a] relative overflow-hidden">
          <div className="qlc-halftone absolute inset-0 opacity-10 pointer-events-none" />
          <div className="relative">
            <h2 className="font-poster uppercase text-brand-crm text-4xl sm:text-5xl leading-none">Mis dit niet</h2>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5 font-stamp text-sm text-brand-crm/80">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-tlbr" /> zaterdag 12 december · 20:00</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-tlbr" /> Sporthal De Kuil, Bunschoten-Spakenburg</span>
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setOpen(true);
              }}
              className="mt-8 font-poster uppercase tracking-wider text-xl px-10 py-4 bg-brand-tlbr text-brand-base3 rounded-xl hover:scale-[1.03] transition-transform inline-flex items-center gap-3"
            >
              <Users className="w-6 h-6" /> Ik ben erbij
            </a>
            <p className="mt-4">
              <Link href="/optredens/feest-de-kuil" className="font-stamp text-xs text-brand-crm/50 hover:text-brand-tlbr underline underline-offset-4">
                meer info over de avond
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

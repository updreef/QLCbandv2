"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  Inbox, Calendar, BookOpen, LogOut, Loader2, Trash2, Plus, Save, X, AlertCircle,
} from "lucide-react";

/* ────────────────────────── types ────────────────────────── */

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
}

interface ShowRow {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  address: string | null;
  city: string | null;
  description: string | null;
  status: string;
  image: string | null;
  highlights: string[] | null;
}

interface PostRow {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string | null;
  author: string | null;
  summary: string | null;
  meta_description: string | null;
  content: string;
  published: boolean;
}

const LEAD_STATUSES = ["nieuw", "in behandeling", "offerte verzonden", "afgerond"];

const inputClass =
  "bg-brand-bg-3 border-2 border-brand-cream/20 focus:border-brand-neon outline-none px-3 py-2 rounded-lg text-sm text-brand-cream font-sans transition-colors w-full";

/* ────────────────────────── shell ────────────────────────── */

export default function AdminClient() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabase) return <SetupNotice />;
  if (checking) {
    return (
      <div className="pt-40 pb-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-amber" />
      </div>
    );
  }
  if (!session) return <LoginForm />;
  return <Dashboard onLogout={() => supabase!.auth.signOut()} />;
}

function SetupNotice() {
  return (
    <div className="pt-40 pb-32 px-4 max-w-2xl mx-auto">
      <div className="bg-brand-bg-2 border-3 border-brand-cream rounded-2xl p-8 hard-shadow-amber">
        <h1 className="font-display text-3xl text-brand-cream uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-brand-amber" /> Beheer nog niet actief
        </h1>
        <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
          Het beheerpaneel heeft een Supabase-project nodig. Zet
          <code className="mx-1 text-brand-neon">NEXT_PUBLIC_SUPABASE_URL</code> en
          <code className="mx-1 text-brand-neon">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
          in de omgeving (Vercel → Settings → Environment Variables) en draai de
          migraties uit <code className="text-brand-neon">supabase/migrations</code>.
        </p>
        <p className="text-xs text-brand-text-muted">
          Zie de README voor het stappenplan. Tot die tijd draait de site gewoon op
          de ingebouwde content en komen aanvragen per e-mail binnen.
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────── login ────────────────────────── */

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) setError("Inloggen mislukt. Controleer e-mail en wachtwoord.");
    setLoading(false);
  };

  return (
    <div className="pt-40 pb-32 px-4 max-w-md mx-auto">
      <form onSubmit={submit} className="bg-brand-bg-2 border-3 border-brand-cream rounded-2xl p-8 hard-shadow-cream flex flex-col gap-4">
        <h1 className="font-display text-3xl text-brand-cream uppercase tracking-wider">QLC Beheer</h1>
        <p className="text-xs text-brand-text-muted -mt-2 mb-2">
          Log in met je beheeraccount (aangemaakt in Supabase → Authentication).
        </p>
        {error && (
          <div className="p-3 bg-brand-red/10 border-2 border-brand-red rounded-lg text-xs text-brand-text">{error}</div>
        )}
        <input type="email" required placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        <input type="password" required placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        <button
          type="submit"
          disabled={loading}
          className="font-display uppercase tracking-widest py-2.5 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} INLOGGEN
        </button>
      </form>
    </div>
  );
}

/* ────────────────────────── dashboard ────────────────────────── */

type Tab = "leads" | "shows" | "blog";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("leads");

  const tabs: { id: Tab; label: string; icon: typeof Inbox }[] = [
    { id: "leads", label: "Aanvragen", icon: Inbox },
    { id: "shows", label: "Shows", icon: Calendar },
    { id: "blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-display text-4xl text-brand-cream uppercase tracking-wider">Beheer</h1>
          <button onClick={onLogout} className="flex items-center gap-2 text-xs font-mono text-brand-text-muted hover:text-brand-red transition-colors">
            <LogOut className="w-4 h-4" /> Uitloggen
          </button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 font-display uppercase text-sm tracking-widest px-4 py-2 border-2 transition-all ${
                tab === t.id
                  ? "bg-brand-cream text-brand-bg border-brand-cream hard-shadow-neon"
                  : "text-brand-cream border-brand-cream/20 hover:border-brand-neon hover:text-brand-neon"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "leads" && <LeadsPanel />}
        {tab === "shows" && <ShowsPanel />}
        {tab === "blog" && <BlogPanel />}
      </div>
    </div>
  );
}

/* ────────────────────────── leads ────────────────────────── */

function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase!
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    await supabase!.from("leads").update({ status }).eq("id", id);
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const remove = async (id: string) => {
    if (!confirm("Aanvraag verwijderen?")) return;
    await supabase!.from("leads").delete().eq("id", id);
    setLeads((ls) => ls.filter((l) => l.id !== id));
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-brand-amber" />;
  if (leads.length === 0)
    return <p className="text-sm text-brand-text-muted font-mono">Nog geen aanvragen binnen.</p>;

  return (
    <div className="flex flex-col gap-4">
      {leads.map((l) => (
        <details key={l.id} className="bg-brand-bg-2 border-2 border-brand-cream/30 rounded-xl overflow-hidden group">
          <summary className="flex flex-wrap items-center gap-3 p-4 cursor-pointer hover:bg-brand-bg-3/50 transition-colors">
            <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${
              l.status === "nieuw" ? "border-brand-neon text-brand-neon" :
              l.status === "afgerond" ? "border-brand-cream/30 text-brand-text-muted" :
              "border-brand-amber text-brand-amber"
            }`}>{l.status}</span>
            <span className="font-semibold text-sm text-brand-cream">{l.name}</span>
            <span className="text-xs text-brand-text-muted">{l.subject || "—"}</span>
            <span className="ml-auto text-[10px] font-mono text-brand-text-muted">
              {new Date(l.created_at).toLocaleString("nl-NL")}
            </span>
          </summary>
          <div className="p-4 pt-0 flex flex-col gap-3">
            <div className="text-xs font-mono text-brand-text-muted">
              {l.email} {l.phone ? `· ${l.phone}` : ""}
            </div>
            <pre className="whitespace-pre-wrap text-xs text-brand-text bg-brand-bg-3 border border-brand-cream/10 rounded-lg p-4 font-sans leading-relaxed">{l.message}</pre>
            <div className="flex flex-wrap items-center gap-3">
              <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className={inputClass + " max-w-52"}>
                {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <a href={`mailto:${l.email}`} className="text-xs font-mono text-brand-neon hover:underline">Beantwoord per mail →</a>
              <button onClick={() => remove(l.id)} className="ml-auto text-brand-text-muted hover:text-brand-red transition-colors" aria-label="Verwijderen">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

/* ────────────────────────── shows ────────────────────────── */

const emptyShow: Omit<ShowRow, "id"> = {
  slug: "", title: "", date: "", time: "", location: "", address: "", city: "",
  description: "", status: "upcoming", image: "", highlights: [],
};

function ShowsPanel() {
  const [rows, setRows] = useState<ShowRow[]>([]);
  const [editing, setEditing] = useState<Partial<ShowRow> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase!.from("shows").select("*").order("date", { ascending: false });
    setRows((data as ShowRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing?.title || !editing?.date) { alert("Titel en datum zijn verplicht."); return; }
    const slug = (editing.slug || editing.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { ...emptyShow, ...editing, slug };
    if (editing.id) {
      await supabase!.from("shows").update(payload).eq("id", editing.id);
    } else {
      await supabase!.from("shows").insert(payload);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Show verwijderen?")) return;
    await supabase!.from("shows").delete().eq("id", id);
    load();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-brand-amber" />;

  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => setEditing({ ...emptyShow })} className="self-start flex items-center gap-2 font-display uppercase text-sm tracking-widest px-4 py-2 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce">
        <Plus className="w-4 h-4" /> Nieuwe show
      </button>

      {rows.length === 0 && (
        <p className="text-sm text-brand-text-muted font-mono">
          Nog geen shows in de database. De site toont zolang de ingebouwde shows uit de code.
        </p>
      )}

      {rows.map((s) => (
        <div key={s.id} className="bg-brand-bg-2 border-2 border-brand-cream/30 rounded-xl p-4 flex flex-wrap items-center gap-3">
          <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${s.status === "upcoming" ? "border-brand-neon text-brand-neon" : "border-brand-cream/30 text-brand-text-muted"}`}>
            {s.status}
          </span>
          <span className="font-semibold text-sm text-brand-cream">{s.title}</span>
          <span className="text-xs font-mono text-brand-text-muted">{s.date} · {s.city || "?"}</span>
          <div className="ml-auto flex gap-3">
            <button onClick={() => setEditing(s)} className="text-xs font-mono text-brand-neon hover:underline">Bewerken</button>
            <button onClick={() => remove(s.id)} className="text-brand-text-muted hover:text-brand-red" aria-label="Verwijderen"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      ))}

      {editing && (
        <div className="bg-brand-bg-2 border-3 border-brand-cream rounded-2xl p-6 hard-shadow-cream flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-brand-cream uppercase tracking-wider">{editing.id ? "Show bewerken" : "Nieuwe show"}</h3>
            <button onClick={() => setEditing(null)} aria-label="Sluiten"><X className="w-5 h-5 text-brand-text-muted hover:text-brand-red" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Titel *" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
            <input type="date" value={editing.date ?? ""} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputClass} />
            <input placeholder="Tijd (bv. 19:00 - 23:00)" value={editing.time ?? ""} onChange={(e) => setEditing({ ...editing, time: e.target.value })} className={inputClass} />
            <select value={editing.status ?? "upcoming"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className={inputClass}>
              <option value="upcoming">Aankomend</option>
              <option value="past">Archief</option>
            </select>
            <input placeholder="Locatie(naam)" value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className={inputClass} />
            <input placeholder="Stad" value={editing.city ?? ""} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className={inputClass} />
            <input placeholder="Adres" value={editing.address ?? ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} className={inputClass} />
            <input placeholder="Afbeelding-URL (optioneel)" value={editing.image ?? ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className={inputClass} />
          </div>
          <textarea placeholder="Beschrijving" rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputClass} />
          <input
            placeholder="Highlights, gescheiden door komma's (bv. Live QLC, BYOB)"
            value={(editing.highlights ?? []).join(", ")}
            onChange={(e) => setEditing({ ...editing, highlights: e.target.value.split(",").map((h) => h.trim()).filter(Boolean) })}
            className={inputClass}
          />
          <button onClick={save} className="self-start flex items-center gap-2 font-display uppercase text-sm tracking-widest px-5 py-2.5 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce">
            <Save className="w-4 h-4" /> Opslaan
          </button>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────── blog ────────────────────────── */

const emptyPost: Omit<PostRow, "id"> = {
  slug: "", title: "", date: new Date().toISOString().slice(0, 10), category: "Band Life",
  author: "Quarter Life Crisis", summary: "", meta_description: "", content: "", published: true,
};

function BlogPanel() {
  const [rows, setRows] = useState<PostRow[]>([]);
  const [editing, setEditing] = useState<Partial<PostRow> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase!.from("blog_posts").select("*").order("date", { ascending: false });
    setRows((data as PostRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing?.title || !editing?.content) { alert("Titel en inhoud zijn verplicht."); return; }
    const slug = (editing.slug || editing.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = { ...emptyPost, ...editing, slug };
    if (editing.id) {
      await supabase!.from("blog_posts").update(payload).eq("id", editing.id);
    } else {
      await supabase!.from("blog_posts").insert(payload);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Blogpost verwijderen?")) return;
    await supabase!.from("blog_posts").delete().eq("id", id);
    load();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-brand-amber" />;

  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => setEditing({ ...emptyPost })} className="self-start flex items-center gap-2 font-display uppercase text-sm tracking-widest px-4 py-2 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce">
        <Plus className="w-4 h-4" /> Nieuwe post
      </button>

      {rows.length === 0 && (
        <p className="text-sm text-brand-text-muted font-mono">
          Nog geen posts in de database. De site toont zolang de ingebouwde blogposts uit de code.
        </p>
      )}

      {rows.map((p) => (
        <div key={p.id} className="bg-brand-bg-2 border-2 border-brand-cream/30 rounded-xl p-4 flex flex-wrap items-center gap-3">
          <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${p.published ? "border-brand-neon text-brand-neon" : "border-brand-amber text-brand-amber"}`}>
            {p.published ? "live" : "concept"}
          </span>
          <span className="font-semibold text-sm text-brand-cream">{p.title}</span>
          <span className="text-xs font-mono text-brand-text-muted">{p.date}</span>
          <div className="ml-auto flex gap-3">
            <button onClick={() => setEditing(p)} className="text-xs font-mono text-brand-neon hover:underline">Bewerken</button>
            <button onClick={() => remove(p.id)} className="text-brand-text-muted hover:text-brand-red" aria-label="Verwijderen"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      ))}

      {editing && (
        <div className="bg-brand-bg-2 border-3 border-brand-cream rounded-2xl p-6 hard-shadow-cream flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-brand-cream uppercase tracking-wider">{editing.id ? "Post bewerken" : "Nieuwe post"}</h3>
            <button onClick={() => setEditing(null)} aria-label="Sluiten"><X className="w-5 h-5 text-brand-text-muted hover:text-brand-red" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Titel *" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
            <input type="date" value={editing.date ?? ""} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputClass} />
            <input placeholder="Categorie" value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass} />
            <input placeholder="Auteur" value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={inputClass} />
          </div>
          <textarea placeholder="Samenvatting (voor de blogoverzichtspagina)" rows={2} value={editing.summary ?? ""} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} className={inputClass} />
          <textarea placeholder="Meta-omschrijving (voor Google, max ~155 tekens)" rows={2} value={editing.meta_description ?? ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} className={inputClass} />
          <textarea placeholder="Inhoud (HTML) *" rows={12} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={inputClass + " font-mono text-xs"} />
          <label className="flex items-center gap-2 text-xs font-mono text-brand-text-muted">
            <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
            Direct publiceren
          </label>
          <button onClick={save} className="self-start flex items-center gap-2 font-display uppercase text-sm tracking-widest px-5 py-2.5 bg-brand-amber text-brand-bg-3 font-bold border-2 border-brand-cream hard-shadow-cream hover-bounce">
            <Save className="w-4 h-4" /> Opslaan
          </button>
        </div>
      )}
    </div>
  );
}

# Quarter Life Crisis — qlcband.nl

Next.js 15 site van rockband Quarter Life Crisis (Spakenburg / Amersfoort), met Supabase-CMS, leads-inbox en Vercel-hosting. "Play loud, grow up later."

## Stack

- **Next.js 15** (App Router, SSG/ISR) — echte URLs per pagina, per-pagina metadata + JSON-LD
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **Supabase** — shows & blog beheerbaar via `/admin`, boekingsaanvragen in de leads-inbox
- **Resend** — e-mailnotificatie bij nieuwe aanvraag
- **Vercel** — hosting, auto-deploy bij push naar `main`

Zonder Supabase/Resend env vars draait de site ook: content valt terug op `src/data.ts` en het formulier meldt dan eerlijk dat verzenden niet lukte.

## Lokaal draaien

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productie-build check
```

## Eenmalige setup (productie)

### 1. Supabase (~10 min)
1. Maak een project op [supabase.com](https://supabase.com) (gratis tier is genoeg)
2. SQL Editor → run `supabase/migrations/0001_init.sql`
3. SQL Editor → run `supabase/seed.sql` (zet de huidige shows erin)
4. Authentication → Users → **Add user** → maak het beheeraccount (e-mail + wachtwoord). Deel dit met de bandleden die mogen beheren.
5. Project Settings → API → kopieer **URL** en **anon public key**

### 2. Resend (~5 min)
1. Account op [resend.com](https://resend.com) (gratis: 100 mails/dag)
2. API Keys → maak een key
3. Zolang er geen eigen domein geverifieerd is, mailt de site via `onboarding@resend.dev` — dat werkt direct naar het e-mailadres van de Resend-accounteigenaar. Na de domein-switch: verifieer qlcband.nl in Resend en pas de `from` in `src/app/api/contact/route.ts` aan naar bv. `boekingen@qlcband.nl`.

### 3. Vercel (~5 min)
1. [vercel.com/new](https://vercel.com/new) → importeer `updreef/QLCbandv2`
2. Environment Variables toevoegen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` = `Ruben_beukers@outlook.com` *(TODO: wissel naar QLC-bandmail zodra die er is)*
3. Deploy. Daarna: Settings → Domains → `qlcband.nl` toevoegen en de DNS bij Strato omzetten (A-record naar Vercel).

## Beheer

`/admin` → inloggen met het Supabase-beheeraccount:
- **Aanvragen** — boekingsaanvragen met status-workflow (nieuw → in behandeling → offerte verzonden → afgerond)
- **Shows** — optredens toevoegen/bewerken (verschijnen binnen 5 min op de site door ISR)
- **Blog** — posts schrijven en publiceren

## Structuur

```
src/app/           routes (App Router) + api/contact + admin
src/components/    Header, Footer, LazyVideo + pagina-componenten
src/lib/           supabase client + content-laag (DB → fallback data.ts)
src/data.ts        fallback-content + types (members, setlist, live moments)
supabase/          migrations + seed (schema as code)
public/videos/     gecomprimeerde hero/member/live-moment video's
```

## Referentiedocs

Design-blueprint en verbatim copy staan in de zusterrepo [updreef/quarterlifecrisis](https://github.com/updreef/quarterlifecrisis) (`DESIGN.md`, `CONTENT.md`).

Made with passion by [Updreef](https://updreef.nl).

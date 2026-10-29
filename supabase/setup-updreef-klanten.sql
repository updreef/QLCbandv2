-- ============================================================
--  QLC-schema voor het gedeelde project "Updreef-Klanten"
--  Draai dit 1x in: Updreef-Klanten → SQL Editor → New query → plak → Run.
--  Veilig om opnieuw te draaien (idempotent).
--  LET OP: dit zet GEEN rijen in 'shows' — de optredens blijven uit
--  de code (data.ts) komen, dus de lijst blijft compleet.
-- ============================================================

-- ── Aanvragen / leads (contact-/boekingsformulier) ───────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'nieuw'
);

-- ── Shows / optredens (leeg; CMS-override, valt terug op code) ─
create table if not exists public.shows (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  date date not null,
  time text,
  location text,
  address text,
  city text,
  description text,
  status text not null default 'upcoming',
  image text,
  highlights text[],
  rsvp boolean not null default false,
  poster text
);

-- ── Blogposts (leeg; CMS-override, valt terug op code) ────────
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  date date not null default current_date,
  category text,
  author text,
  summary text,
  meta_description text,
  content text not null,
  faqs jsonb default '[]'::jsonb,
  published boolean not null default true
);

-- ── Aanmeldingen voor evenementen + teller ───────────────────
create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_slug text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  coming boolean not null default true,
  unique (event_slug, email)
);

-- ── Row Level Security aanzetten ─────────────────────────────
alter table public.leads        enable row level security;
alter table public.shows        enable row level security;
alter table public.blog_posts   enable row level security;
alter table public.event_rsvps  enable row level security;

-- ── Policies (eerst droppen zodat opnieuw draaien veilig is) ──
-- leads: bezoekers mogen insturen, alleen beheerders lezen/beheren
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads for insert to anon with check (true);
drop policy if exists "authenticated full access leads" on public.leads;
create policy "authenticated full access leads"
  on public.leads for all to authenticated using (true) with check (true);

-- shows: publiek leesbaar, alleen beheerders bewerken
drop policy if exists "public read shows" on public.shows;
create policy "public read shows"
  on public.shows for select to anon, authenticated using (true);
drop policy if exists "authenticated write shows" on public.shows;
create policy "authenticated write shows"
  on public.shows for all to authenticated using (true) with check (true);

-- blog_posts: gepubliceerde publiek leesbaar, beheerders bewerken
drop policy if exists "public read published posts" on public.blog_posts;
create policy "public read published posts"
  on public.blog_posts for select to anon, authenticated using (published = true);
drop policy if exists "authenticated write posts" on public.blog_posts;
create policy "authenticated write posts"
  on public.blog_posts for all to authenticated using (true) with check (true);

-- event_rsvps: bezoekers mogen insturen, alleen beheerders lezen (privacy)
drop policy if exists "anon can insert rsvp" on public.event_rsvps;
create policy "anon can insert rsvp"
  on public.event_rsvps for insert to anon with check (true);
drop policy if exists "authenticated full access rsvp" on public.event_rsvps;
create policy "authenticated full access rsvp"
  on public.event_rsvps for all to authenticated using (true) with check (true);

-- ── Tabel-rechten voor de rollen (náást RLS) ─────────────────
-- RLS filtert WELKE rijen; GRANT geeft de basis-toegang tot de tabel.
-- Zonder deze grants krijgt anon 42501 "permission denied".
grant usage on schema public to anon, authenticated;

grant select on public.shows       to anon, authenticated;
grant select on public.blog_posts  to anon, authenticated;
grant insert on public.leads       to anon;
grant insert on public.event_rsvps to anon;

grant select, insert, update, delete on public.leads       to authenticated;
grant select, insert, update, delete on public.shows       to authenticated;
grant select, insert, update, delete on public.blog_posts  to authenticated;
grant select, insert, update, delete on public.event_rsvps to authenticated;

-- ── Teller-functies (geven alleen aantal / voornamen terug) ──
create or replace function public.rsvp_count(p_event_slug text)
returns integer language sql security definer set search_path = public as $$
  select count(*)::int from public.event_rsvps
  where event_slug = p_event_slug and coming = true;
$$;
grant execute on function public.rsvp_count(text) to anon, authenticated;

create or replace function public.rsvp_recent_names(p_event_slug text, p_limit int default 12)
returns table(first_name text) language sql security definer set search_path = public as $$
  select first_name from public.event_rsvps
  where event_slug = p_event_slug and coming = true
  order by created_at desc limit greatest(0, least(p_limit, 50));
$$;
grant execute on function public.rsvp_recent_names(text, int) to anon, authenticated;

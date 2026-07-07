-- QLC band site — initiële schema
-- Draai dit in Supabase: SQL Editor → New query → plak → Run.
-- (Of via CLI: supabase db push)

-- ── Aanvragen / leads ────────────────────────────────────────
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

-- ── Shows / optredens ────────────────────────────────────────
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
  status text not null default 'upcoming', -- upcoming | past
  image text,
  highlights text[]
);

-- ── Blogposts ────────────────────────────────────────────────
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

-- ── Row Level Security ───────────────────────────────────────
alter table public.leads enable row level security;
alter table public.shows enable row level security;
alter table public.blog_posts enable row level security;

-- Bezoekers mogen een aanvraag insturen, verder niets.
create policy "anon can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- Ingelogde beheerders mogen alles met leads.
create policy "authenticated full access leads"
  on public.leads for all
  to authenticated
  using (true)
  with check (true);

-- Shows en blogposts zijn publiek leesbaar…
create policy "public read shows"
  on public.shows for select
  to anon, authenticated
  using (true);

create policy "public read published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (published = true);

-- …en alleen door beheerders te bewerken.
create policy "authenticated write shows"
  on public.shows for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated write posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

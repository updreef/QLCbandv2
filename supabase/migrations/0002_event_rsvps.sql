-- 0002 — Evenement-aanmeldingen (RSVP) + live teller
-- Draai dit in Supabase: SQL Editor → New query → plak → Run.
-- (Of via CLI: supabase db push)

-- ── 1) rsvp-vlag op shows ─────────────────────────────────────
alter table public.shows
  add column if not exists rsvp boolean not null default false;

alter table public.shows
  add column if not exists poster text;

-- ── 2) Aanmeldingen ───────────────────────────────────────────
create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_slug text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  coming boolean not null default true,
  unique (event_slug, email)          -- 1 aanmelding per e-mail per event
);

alter table public.event_rsvps enable row level security;

-- Bezoekers mogen zich aanmelden (insert). De rijen zijn NIET publiek leesbaar,
-- zodat namen en e-mailadressen privé blijven. Beheerders zien alles.
create policy "anon can insert rsvp"
  on public.event_rsvps for insert
  to anon
  with check (true);

create policy "authenticated full access rsvp"
  on public.event_rsvps for all
  to authenticated
  using (true)
  with check (true);

-- ── 3) Teller ─────────────────────────────────────────────────
-- Geeft alleen het AANTAL terug (geen persoonsgegevens), aanroepbaar door iedereen.
create or replace function public.rsvp_count(p_event_slug text)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int
  from public.event_rsvps
  where event_slug = p_event_slug and coming = true;
$$;

grant execute on function public.rsvp_count(text) to anon, authenticated;

-- Recente aanmeldingen voor de sociale-bewijskracht: ALLEEN voornamen (geen e-mail/achternaam).
create or replace function public.rsvp_recent_names(p_event_slug text, p_limit int default 12)
returns table(first_name text)
language sql
security definer
set search_path = public
as $$
  select first_name
  from public.event_rsvps
  where event_slug = p_event_slug and coming = true
  order by created_at desc
  limit greatest(0, least(p_limit, 50));
$$;

grant execute on function public.rsvp_recent_names(text, int) to anon, authenticated;

-- ── 4) Het evenement van 12 december ──────────────────────────
-- Eenmalig toevoegen; latere admin-edits blijven staan (do nothing bij bestaande slug).
insert into public.shows
  (slug, title, date, time, location, address, city, description, status, image, poster, highlights, rsvp)
values (
  'feest-de-kuil',
  'Kerstcrisis in De Kuil',
  '2026-12-12',
  '20:00 - 01:00',
  'Sporthal De Kuil',
  '',
  'Bunschoten-Spakenburg',
  'Kerstcrisis in De Kuil! Op 12 december sluiten we het jaar af met een knalfeest in Sporthal De Kuil: live QLC én DJ Chesto, kerstsfeer en een volle vloer. Kom los, zing mee en wees erbij. Meld je hieronder aan, dan weten we op hoeveel feestbeesten we kunnen rekenen.',
  'upcoming',
  '/images/kerstcrisis-de-kuil.jpg',
  '/images/kerstcrisis-de-kuil.jpg',
  array['Live QLC','DJ Chesto','Kerstsfeer in De Kuil','Dansen tot in de late uurtjes'],
  true
)
on conflict (slug) do nothing;

-- Seed: huidige site-content als startpunt voor het CMS.
-- Draai NA 0001_init.sql. Blogposts staan bewust niet in de seed:
-- de drie ingebouwde posts uit src/data.ts blijven de fallback tot ze
-- via het beheerpaneel (of hier) worden overgenomen.

insert into public.shows (slug, title, date, time, location, address, city, description, status, image, highlights)
values
  (
    'backyard-sessions-1',
    'QLC Backyard Sessions #1',
    '2026-08-01',
    '19:00 - 23:00',
    'Scholekster 57',
    'Scholekster 57',
    'Bunschoten-Spakenburg',
    'Na ons spetterende debuut van maar liefst twee optredens vinden we het tijd voor de volgende stap: een tuinconcert. We spelen ongeveer een uur onze favoriete nummers en zorgen daarna samen voor een gezellige zomeravond. Statistisch gezien is de kans groot dat het prachtig weer wordt.',
    'upcoming',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1600&q=85&auto=format&fit=crop',
    array['Live QLC', 'DJ Chesto', 'Beer Pong', 'Borrels', 'BYOB']
  ),
  (
    'bruiloft-te',
    'Bruiloft T&E',
    '2025-05-22',
    'Avond',
    'Bruiloft T&E',
    '',
    '',
    'Ons optreden op de bruiloft van T&E. Een avond vol live rock, dansende gasten en een setlist waar het bruidspaar zelf om had gevraagd. Van deze show komen ook onze live-videos van Narcotic, Angels en Seven Nation Army.',
    'past',
    '/videos/live-moments/narcotic.jpg',
    array['Live QLC', 'Dansende gasten', 'Volle set']
  )
on conflict (slug) do nothing;

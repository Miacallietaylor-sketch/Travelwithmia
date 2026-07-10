-- ─────────────────────────────────────────────────────────────
-- Travel With Mia — seed data
-- Run AFTER schema.sql. Safe to re-run (uses upserts on unique slugs/emails).
-- All content below is illustrative sample data for the demo.
-- Reviews are seeded as verified=true to mirror the "verified bookings only"
-- policy — replace with genuine, verified reviews before going live.
-- ─────────────────────────────────────────────────────────────

insert into public.holiday_types (slug, name, tagline, blurb, sort_order) values
  ('cruises','Cruises','Unpack once, wake somewhere new.','Ocean, expedition and river journeys matched to your pace.',1),
  ('disney','Disney','The magic, minus the planning stress.','Walt Disney World, Disneyland Paris and Disney Cruise Line.',2),
  ('luxury','Luxury','The good stuff, quietly arranged.','Five-star stays and the perks that don''t shout.',3),
  ('family','Family','Everyone happy — including you.','Kids'' clubs, family rooms and pools that keep everyone happy.',4),
  ('city-breaks','City Breaks','A proper reset in three days flat.','Long weekends done properly, in the right neighbourhood.',5),
  ('honeymoons','Honeymoons','Your first trip as newlyweds, done right.','The trip you''ll remember forever, with the perks arranged.',6),
  ('tailor-made','Tailor-Made','No package. Just your trip.','A bespoke itinerary designed around you from a blank page.',7),
  ('multi-centre','Multi-Centre','City then sand, without the faff.','Combine a city, a safari and a beach into one journey.',8)
on conflict (slug) do update set
  name = excluded.name, tagline = excluded.tagline, blurb = excluded.blurb, sort_order = excluded.sort_order;

insert into public.destinations (slug, name, region, blurb, best_months, price_from) values
  ('maldives','Maldives','Indian Ocean','Overwater villas and total switch-off.','Nov–Apr','£2,199pp'),
  ('italy','Italy','Europe','Lakes, coastlines and cities that never disappoint.','Apr–Jun, Sep–Oct','£399pp'),
  ('florida','Florida','USA','Theme parks, gulf beaches and road-trip freedom.','Mar–May, Oct–Nov','£999pp'),
  ('greece','Greece','Europe','Island-hopping and easy sun.','May–Sep','£449pp'),
  ('dubai','Dubai','Middle East','Winter sun and five-star value.','Nov–Mar','£749pp'),
  ('caribbean','Caribbean','Caribbean','Powder beaches and warm seas.','Dec–Apr','£1,299pp'),
  ('japan','Japan','Asia','Cities, temples and bullet-train adventures.','Mar–May, Oct–Nov','£1,599pp'),
  ('spain','Spain','Europe','Costas, cities and the Balearics.','May–Oct','£299pp')
on conflict (slug) do update set
  name = excluded.name, region = excluded.region, blurb = excluded.blurb,
  best_months = excluded.best_months, price_from = excluded.price_from;

insert into public.blog_posts (slug, title, excerpt, category, read_minutes, image) values
  ('best-time-to-book-summer-holidays','The real best time to book your summer holiday','Everyone says "book early" — but early when, exactly?','Planning tips',5,'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70'),
  ('cruise-cabin-guide','How to choose a cruise cabin (without overpaying)','Balcony, ocean-view, inside, guarantee — what matters.','Cruises',6,'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=1200&q=70'),
  ('family-all-inclusive-worth-it','Is all-inclusive actually worth it for families?','Sometimes yes, sometimes a trap. How I run the numbers.','Family',4,'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=70')
on conflict (slug) do update set
  title = excluded.title, excerpt = excluded.excerpt, category = excluded.category;

insert into public.reviews (name, location, rating, title, body, holiday_type, verified) values
  ('Sarah & Tom','Leeds',5,'She thought of everything','Mia planned our honeymoon to the Maldives and it was flawless.','Honeymoons',true),
  ('The Patel family','Birmingham',5,'Disney without the stress','Two kids, first time at Walt Disney World, and Mia made it effortless.','Disney',true),
  ('Denise M.','Glasgow',5,'A proper cruise expert','She matched us to the right ship and cabin perfectly.','Cruises',true),
  ('James R.','Bristol',5,'Complicated trip, handled','Three countries, five hotels — Mia joined it all up.','Multi-Centre',true),
  ('Aisha K.','Manchester',5,'Last-minute city break, sorted in a day','Messaged Mia on a Wednesday, was in Rome that Friday.','City Breaks',true),
  ('Gareth & Lou','Cardiff',5,'Family holiday everyone loved','Kids'' club for the little ones, a quiet pool for us.','Family',true)
on conflict do nothing;

-- Example enquiries so the pipeline looks alive (guest submissions).
insert into public.quotes
  (is_guest, holiday_type, destination, adults, children, budget, name, email, status, consent_privacy_at, consent_marketing_email, source)
values
  (true,'honeymoons','Maldives',2,0,'£5,000 total','Sample Client','sample1@example.com','quoted', now(), true, 'seed'),
  (true,'family','Florida',2,2,'£6,000 total','Sample Family','sample2@example.com','contacted', now(), false, 'seed'),
  (true,'city-breaks','Rome',2,0,'£1,200 total','Sample Couple','sample3@example.com','booked', now(), true, 'seed')
on conflict do nothing;

insert into public.newsletter_subscribers (email, source) values
  ('subscriber1@example.com','seed'),
  ('subscriber2@example.com','seed')
on conflict (email) do nothing;

-- ─────────────────────────────────────────────────────────────
-- Travel With Mia — Postgres schema (Supabase)
-- Run in the Supabase SQL editor, or via `supabase db push`.
--
-- Auth: this schema assumes Supabase Auth (auth.users) for account
-- credentials — Supabase securely bcrypt-hashes passwords for you, so we
-- never store raw passwords here. `public.users` is a profile table keyed
-- to auth.users. Account holders are assumed 18+.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ── Reference data ──────────────────────────────────────────
create table if not exists public.holiday_types (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  tagline     text,
  blurb       text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.destinations (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  region      text,
  blurb       text,
  best_months text,
  price_from  text,
  created_at  timestamptz not null default now()
);

-- ── Profiles (linked to auth.users) ─────────────────────────
create table if not exists public.users (
  id             uuid primary key references auth.users(id) on delete cascade,
  email          text unique not null,
  full_name      text,
  phone          text,
  -- per-channel marketing consent (never bundled)
  consent_email  boolean not null default false,
  consent_sms    boolean not null default false,
  consent_call   boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── Quotes / enquiries ──────────────────────────────────────
do $$ begin
  create type quote_status as enum ('new','contacted','quoted','booked','lost');
exception when duplicate_object then null; end $$;

create table if not exists public.quotes (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid references public.users(id) on delete set null,
  is_guest                 boolean not null default true,
  holiday_type             text not null,
  destination              text not null,
  depart_date              date,
  return_date              date,
  flexible_dates           boolean not null default false,
  adults                   int not null default 1,
  children                 int not null default 0,
  budget                   text,
  name                     text not null,
  email                    text not null,
  phone                    text,
  notes                    text,
  status                   quote_status not null default 'new',
  -- consent
  consent_privacy_at       timestamptz,
  consent_marketing_email  boolean not null default false,
  consent_marketing_sms    boolean not null default false,
  consent_marketing_call   boolean not null default false,
  -- attribution
  source                   text default 'website',
  utm_source               text,
  utm_medium               text,
  utm_campaign             text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);
create index if not exists quotes_email_idx on public.quotes (email);
create index if not exists quotes_status_idx on public.quotes (status);

-- ── Content ─────────────────────────────────────────────────
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  body          text,
  category      text,
  author        text default 'Mia',
  read_minutes  int default 4,
  image         text,
  published     boolean not null default true,
  published_at  timestamptz not null default now()
);

create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  location      text,
  rating        int not null check (rating between 1 and 5),
  title         text,
  body          text,
  holiday_type  text,
  -- ONLY verified bookings are shown publicly
  verified      boolean not null default false,
  booking_ref   text,
  created_at    timestamptz not null default now()
);

-- ── Marketing / CRM ─────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  consent_at  timestamptz not null default now(),
  source      text default 'website',
  unsubscribed_at timestamptz
);

create table if not exists public.referral_codes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.users(id) on delete cascade,
  code        text unique not null,
  uses        int not null default 0,
  created_at  timestamptz not null default now()
);

do $$ begin
  create type vip_tier as enum ('member','silver','gold','platinum');
exception when duplicate_object then null; end $$;

create table if not exists public.vip_club_members (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.users(id) on delete cascade,
  tier        vip_tier not null default 'member',
  joined_at   timestamptz not null default now()
);

-- ── Document vault ──────────────────────────────────────────
do $$ begin
  create type document_kind as enum ('atol_certificate','invoice','itinerary','other');
exception when duplicate_object then null; end $$;

create table if not exists public.documents (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.users(id) on delete cascade,
  quote_id    uuid references public.quotes(id) on delete set null,
  kind        document_kind not null default 'other',
  title       text not null,
  storage_path text,          -- path in Supabase Storage
  created_at  timestamptz not null default now()
);

-- ── Complaints log (ADR) ────────────────────────────────────
do $$ begin
  create type complaint_status as enum ('open','acknowledged','resolved','escalated_adr');
exception when duplicate_object then null; end $$;

create table if not exists public.complaints_log (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.users(id) on delete set null,
  quote_id    uuid references public.quotes(id) on delete set null,
  name        text not null,
  email       text not null,
  booking_ref text,
  detail      text not null,
  status      complaint_status not null default 'open',
  created_at  timestamptz not null default now(),
  resolved_at timestamptz
);

-- ── Row Level Security ──────────────────────────────────────
-- Enable RLS; API routes use the service role key which bypasses RLS to
-- write guest enquiries. Authenticated users can read/update their own rows.
alter table public.users enable row level security;
alter table public.quotes enable row level security;
alter table public.documents enable row level security;
alter table public.vip_club_members enable row level security;
alter table public.referral_codes enable row level security;
alter table public.complaints_log enable row level security;

-- Public read for content/reference tables.
alter table public.holiday_types enable row level security;
alter table public.destinations enable row level security;
alter table public.blog_posts enable row level security;
alter table public.reviews enable row level security;

do $$ begin
  create policy "public read holiday_types" on public.holiday_types for select using (true);
  create policy "public read destinations" on public.destinations for select using (true);
  create policy "public read published blog" on public.blog_posts for select using (published);
  create policy "public read verified reviews" on public.reviews for select using (verified);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "own profile" on public.users
    for all using (auth.uid() = id) with check (auth.uid() = id);
  create policy "own quotes" on public.quotes
    for select using (auth.uid() = user_id);
  create policy "own documents" on public.documents
    for select using (auth.uid() = user_id);
  create policy "own vip" on public.vip_club_members
    for select using (auth.uid() = user_id);
  create policy "own referrals" on public.referral_codes
    for select using (auth.uid() = user_id);
  create policy "own complaints" on public.complaints_log
    for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

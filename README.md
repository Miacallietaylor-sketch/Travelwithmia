# Travel With Mia

> **Tell me where. I'll do the rest.**

The website for Mia — an independent UK travel consultant. One person, one point
of contact, who personally plans holidays. The site's job is to turn visitors
into holiday enquiries, and over time into VIP Club members. It's built to feel
like a personal concierge, not a generic online travel agent.

Its signature device is **The Concierge Note** — small handwritten notes in
Mia's voice at key moments (hero, quote confirmation, 404) that prove a real
person is behind the site.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom design system — see `tailwind.config.ts`)
- **Supabase** for auth (email/password + Google) and Postgres
- **Zod** for validation, **bcryptjs** for any custom password hashing
- Deployable to **Vercel**

The site is **scaffolded to run locally with no keys** — forms fall back to a
server-side log and the account area shows a demo dashboard. Add Supabase keys
to enable real persistence and accounts.

> Card payments are intentionally **out of scope of this codebase**. Any paid
> flows (e.g. VIP membership) use hosted **Stripe Payment Links** only — the
> site never touches raw card numbers.

---

## Getting started (local)

```bash
# 1. Install
npm install

# 2. Configure environment (optional — the site runs without it)
cp .env.example .env.local
#   Fill in Supabase keys to enable persistence + accounts.

# 3. Run
npm run dev
#   → http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # run the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

---

## Environment variables

Copy `.env.example` → `.env.local`. Every key is documented there. Summary:

| Key | Required? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical/OG URLs, sitemap, referral links |
| `NEXT_PUBLIC_SUPABASE_URL` | for DB/auth | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | for DB/auth | Supabase anon (browser) key |
| `SUPABASE_SERVICE_ROLE_KEY` | for writes | Server-only; writes quotes/subscribers |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | for Google login | Configured in Supabase Auth |
| `NEXT_PUBLIC_STRIPE_VIP_PAYMENT_LINK` | optional | Hosted Stripe Payment Link URL |
| `ENQUIRY_NOTIFY_EMAIL` | optional | Where enquiry notifications go |

Without Supabase keys the site still runs: `POST /api/quote` and
`/api/newsletter` accept submissions and return `{ persisted: false }`, logging
to the server instead of the database.

---

## Database (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor run, in order:
   - `supabase/schema.sql` — tables, enums, Row Level Security
   - `supabase/seed.sql` — sample holiday types, destinations, blog posts,
     reviews (verified), example enquiries and subscribers so the site looks
     alive.
3. Copy the API keys from **Settings → API** into `.env.local`.
4. For Google login, enable the Google provider under **Authentication →
   Providers** and add your OAuth credentials.

**Data model** (see `schema.sql`): `users`, `quotes`, `destinations`,
`holiday_types`, `blog_posts`, `reviews` (with `verified` flag),
`newsletter_subscribers`, `referral_codes`, `vip_club_members`, `documents`,
`complaints_log`.

Passwords are handled by **Supabase Auth**, which bcrypt-hashes them for you —
raw passwords are never stored. `src/lib/password.ts` provides bcrypt helpers
for any custom credential path you add later.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel detects
   Next.js automatically.
3. Add the environment variables above under **Project → Settings →
   Environment Variables** (set `NEXT_PUBLIC_SITE_URL` to your production URL).
4. Deploy. `sitemap.xml` and `robots.txt` are generated automatically.

---

## Accessibility & compliance

Built in from the start, not bolted on:

- **WCAG 2.2 AA**: visible focus states, skip-to-content link, alt text on all
  images, labelled fields with real error messages, `prefers-reduced-motion`
  respected.
- **Cookie banner** (PECR/UK GDPR): _Accept all_ and _Reject non-essential_ are
  equally prominent, nothing pre-ticked; advertising/tracking loads only after
  opt-in.
- **Granular consent** on the quote form: a required Privacy Policy agreement,
  with marketing broken out per channel (email / SMS-WhatsApp / call) — never
  bundled.
- **Full prices upfront**, including mandatory fees — no drip pricing.
- **Verified reviews only** — the `verified` flag gates public display; content
  is never fabricated or incentivised.
- **Footer** carries trader identity and ATOL/ABTA numbers, plus links to
  Privacy, Cookies, Terms and Complaints & ADR.

### ⚠️ Placeholders you MUST replace before going live

These are clearly marked in `src/lib/site.ts` (and surfaced visibly in the UI):

- ATOL number, ABTA number — **never invent these; a fake financial-protection
  number is unlawful**
- Company (Companies House) number, registered legal name and address
- VAT number, phone, email, WhatsApp and social handles

The legal pages (Privacy, Cookies, Terms, Complaints & ADR) are **templates** —
have them reviewed by a qualified professional before publishing.

---

## Project structure

```
src/
  app/                 # App Router pages, API routes, sitemap, robots
    api/               #   /api/quote, /api/newsletter (graceful DB fallback)
    holiday-types/     #   index + [slug] for each holiday type
    journal/           #   blog index + [slug]
    account/           #   auth + dashboard (+ /reset)
    (legal pages)      #   privacy, cookies, terms, complaints
  components/          # Hero, ConciergeNote, QuoteForm, cards, banner, footer…
  data/                # Seed content powering pages (types, destinations, …)
  lib/                 # site config, seo, supabase clients, validation
supabase/
  schema.sql           # tables + RLS
  seed.sql             # sample data
```

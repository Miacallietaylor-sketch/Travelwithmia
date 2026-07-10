# Travel With Mia — Go-Live Checklist

> Mia — this is your "make it real" list. Work top to bottom. I've marked each
> item **FREE**, **FREE tier**, or **£ paid** honestly, because some legal
> registrations genuinely cost a little. Do the free technical bits first so you
> can see everything working, then tackle the regulatory items.

---

## Part 1 — Get the site truly live (all FREE)

| # | Task | Cost | Where |
|---|------|------|-------|
| 1 | Deploy to Vercel | **FREE** | [vercel.com/new](https://vercel.com/new) → import `Travelwithmia` → Deploy |
| 2 | Connect your domain `travelwithmia.co.uk` | **FREE** (you already own it) | Vercel → Settings → Domains, then add the DNS records in IONOS |
| 3 | Add environment variables in Vercel | **FREE** | Vercel → Settings → Environment Variables (see `.env.example`) |

DNS records for IONOS (Vercel confirms exact values):
- **A** record · host `@` · → `76.76.21.21`
- **CNAME** record · host `www` · → `cname.vercel-dns.com`

---

## Part 2 — Turn on real data & flights

### 2a. Database + accounts — Supabase (FREE tier)
1. Sign up at [supabase.com](https://supabase.com) → **New project** (free).
2. Open **SQL Editor** → paste and run `supabase/schema.sql`, then `supabase/seed.sql`.
3. **Settings → API** → copy the three keys into Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. (Optional) **Authentication → Providers → Google** to enable Google login.
   Free — you create a Google OAuth client in Google Cloud Console.

Once done, real quote submissions save to the database and appear in your admin
dashboard, and clients can create accounts.

### 2b. Live flight fares — Amadeus (FREE test tier)
1. Create a free account at **[developers.amadeus.com](https://developers.amadeus.com)**.
2. Go to **My Self-Service Workspace → Create new app**.
3. Copy the **API Key** and **API Secret**.
4. Add to Vercel:
   - `AMADEUS_CLIENT_ID` = API Key
   - `AMADEUS_CLIENT_SECRET` = API Secret
   - `AMADEUS_ENV` = `test` (free sandbox with real cached fares)
5. The `/flights` page will switch from "Sample fares (demo)" to **"Live fares"**
   automatically. Move `AMADEUS_ENV` to `production` (needs billing) only when
   you want real-time bookable prices at volume.

> Alternatives if you ever want them: **Duffel** (also has a test mode and can
> actually issue tickets), **Kiwi Tequila** (free), or **Aviationstack** (free
> tier, good for live flight *status* boards rather than fares).

### 2c. Secure the admin area (FREE, 2 minutes)
Set these in Vercel before the site is public:
- `ADMIN_ACCESS_CODE` = a private code only you know
- `ADMIN_SESSION_SECRET` = a long random string
  (generate with `openssl rand -hex 32`, or ask me and I'll make one)

The dashboard shows a red warning until you've changed the defaults.

### 2d. Card payments later — Stripe (FREE to set up; per-transaction fee)
For VIP membership or deposits, create **Stripe Payment Links** (hosted pages)
and paste the URL into `NEXT_PUBLIC_STRIPE_VIP_PAYMENT_LINK`. The site never
touches card numbers — Stripe handles everything on its own secure page.

---

## Part 3 — The official / government bodies (UK)

Do these to trade legally as a UK travel consultant. Most independent
consultants get ATOL/ABTA cover by joining a **host agency / consortium**
rather than applying directly (direct ATOL bonding is expensive and heavily
vetted). That's the normal, affordable route.

| Body | Why | Cost | Link |
|------|-----|------|------|
| **HMRC — Self-employment** | Register as self-employed / for Self Assessment | **FREE** | [gov.uk/register-for-self-assessment](https://www.gov.uk/register-for-self-assessment) |
| **Companies House** (optional) | Only if you want a Ltd company (vs sole trader) | £50 online | [gov.uk/limited-company-formation](https://www.gov.uk/limited-company-formation) |
| **ICO — Data Protection fee** | Legally required if you hold customer data | £40–£60/yr | [ico.org.uk/registration](https://ico.org.uk/registration/) |
| **A host agency / consortium** (gives you ATOL + ABTA cover) | Trade under their financial protection & commercial deals | £ varies (often monthly) | See options below |
| **CAA / ATOL** | Financial protection for flight-inclusive packages | Via your host | [caa.co.uk/atol-protection](https://www.caa.co.uk/atol-protection/) |
| **ABTA** | Package protection + trust mark | Via your host, or direct membership £ | [abta.com](https://www.abta.com/) |

**Host agency / consortium options** (they provide the ATOL/ABTA umbrella,
bonding, supplier deals and training — pick one and apply):
- Hays Travel Independence Group
- The Travel Network Group (TTNG)
- Not Just Travel / The Travel Franchise
- InteleTravel
- Protected Trust Services (PTS) — trust-account model
- Travel Trust Association (TTA) — trust-account model

> ⚠️ **Until you have genuine ATOL/ABTA numbers from your host, do not publish
> any.** The placeholders in `src/lib/site.ts` are deliberately obvious. A fake
> financial-protection number is a false claim and unlawful. Swap them in the
> moment your host confirms them.

**Also worth doing (not government, but sensible):**
- **Professional Indemnity + Public Liability insurance** (often bundled by your
  host, or via Towergate/Simply Business). £ paid.
- **Google Business Profile** — FREE, huge for local discovery.
- **Google Search Console** — FREE, confirms your site to Google + submits your
  sitemap (`/sitemap.xml`).

---

## Part 4 — Replace the placeholders

Open `src/lib/site.ts` and replace every `[PLACEHOLDER …]`:
- Registered company name, company number, registered address
- ATOL number, ABTA number, VAT number (once you have them)
- Email, phone, WhatsApp, social handles

Then have the four legal pages (Privacy, Cookies, Terms, Complaints & ADR)
reviewed — they're solid templates but not a substitute for a professional
once-over. Swap the Unsplash placeholder photos for your own trip photography
when you can.

---

## Quick "tomorrow morning" order of play
1. ☐ Deploy to Vercel + connect domain (Part 1)
2. ☐ Set `ADMIN_ACCESS_CODE` + `ADMIN_SESSION_SECRET` (Part 2c)
3. ☐ Create Supabase project + run the two SQL files (Part 2a)
4. ☐ Grab free Amadeus keys → live flights (Part 2b)
5. ☐ Register with HMRC + ICO (Part 3)
6. ☐ Apply to one host agency for ATOL/ABTA cover (Part 3)
7. ☐ Replace placeholders in `site.ts` (Part 4)
8. ☐ Set up Google Business Profile + Search Console (Part 3)

# MAHDI — setup, operations & launch checklist

**MAHDI** = *My AI Holiday & Destination Intelligence* — Mia's 24/7 AI
holiday-planning assistant. It helps visitors discover destinations, answers
general travel questions, collects structured holiday enquiries, and hands
qualified leads to Mia. It is always clearly labelled as an AI and never
pretends to be Mia, never books, and never invents prices or requirements.

MAHDI **works out of the box with no keys** (scripted flows + a graceful
fallback message) and upgrades to live AI, real email and a database the moment
you add the relevant keys.

---

## 1. Detected stack
Next.js 14 (App Router) · TypeScript · Tailwind · Supabase (Postgres) · Zod ·
Vercel. MAHDI reuses all of it.

## 2–4. What was added / changed
**New — AI:** `src/lib/ai/{types,anthropic,openai,index,prompt}.ts`
**New — chat + lead API:** `src/app/api/mahdi/{chat,lead}/route.ts`
**New — leads:** `src/lib/leads/{types,reference,schema,store}.ts`
**New — email:** `src/lib/email/{types,resend,index,templates}.ts`
**New — security:** `src/lib/security/{rateLimit,request}.ts`, `src/lib/sanitize.ts`
**New — analytics:** `src/lib/analytics.ts`
**New — UI:** `src/components/mahdi/{Mahdi,MahdiMount,MahdiIcon,flows,config}.ts(x)`, `src/lib/mahdi/config.ts`
**New — admin:** `src/components/admin/MahdiLeads.tsx`, `src/app/api/admin/leads/route.ts`
**New — tests:** `*.test.ts` across leads/security/email/sanitize/flows, `vitest.config.ts`
**Changed:** `src/app/layout.tsx` (mounts MAHDI, client-only), `AdminDashboard.tsx`
(MAHDI Leads tab), `supabase/schema.sql` (`mahdi_leads` table), `.env.example`.

## 5. Environment variables
```
# AI (optional — scripted fallback works without it)
AI_PROVIDER=anthropic            # or 'openai'
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
AI_MODEL=                        # optional override

# Human handover (public)
NEXT_PUBLIC_MIA_WHATSAPP_NUMBER=44xxxxxxxxxx
NEXT_PUBLIC_MIA_CONTACT_EMAIL=hello@travelwithmia.co.uk

# Email (optional — logs instead if unset)
EMAIL_PROVIDER=resend
RESEND_API_KEY=...
EMAIL_FROM_ADDRESS=MAHDI <mahdi@travelwithmia.co.uk>
MIA_LEAD_NOTIFICATION_EMAIL=hello@travelwithmia.co.uk

# GDPR
LEAD_RETENTION_DAYS=365
NEXT_PUBLIC_PRIVACY_POLICY_URL=/privacy
```
No AI/email key is ever exposed to the browser — only `NEXT_PUBLIC_*` values are.

## 6. Database
Run `supabase/schema.sql` (adds the `mahdi_leads` table with a `seq` identity
for references and RLS enabled — only the server service-role key reads/writes
it). Without Supabase, leads persist in-memory for the running session so the
flow still completes end-to-end.

## 7. Local development
```
npm install
cp .env.example .env.local      # optional
npm run dev                     # http://localhost:3000
npm test                        # unit tests (vitest)
```

## 8. Deployment (Vercel)
Push to GitHub → import in Vercel → add the env vars above → Deploy. Streaming
chat works on Vercel's Node runtime (the chat route uses `runtime = "nodejs"`).

## 9. Email setup (Resend)
1. Create a free account at resend.com (3,000 emails/month free).
2. Verify your sending domain (or use the `onboarding@resend.dev` test sender).
3. Set `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `MIA_LEAD_NOTIFICATION_EMAIL`.
On submit MAHDI: validates → saves → emails Mia → emails the customer → returns
the reference. Email failures never block the confirmed reference.

## 10. AI provider setup
- **Anthropic:** create a key at console.anthropic.com → `ANTHROPIC_API_KEY`,
  `AI_PROVIDER=anthropic`. A good default model is set automatically.
- **OpenAI:** `OPENAI_API_KEY`, `AI_PROVIDER=openai`.
The provider is chosen server-side via a small interface, so switching providers
needs no frontend change. With no key, MAHDI shows a helpful fallback and the
scripted quote/discovery flows still work fully.

## 11. Admin access
MAHDI leads live in the existing admin at **/admin → MAHDI Leads** tab (search,
filter by status, view detail, change status, internal notes, CSV export,
anonymise personal data, consent timestamps). Access uses the existing admin
gate (`ADMIN_ACCESS_CODE` + `ADMIN_SESSION_SECRET`). No credentials are
hardcoded; the API routes reject unauthenticated calls (401).

## 12. Automated tests
```
npm test           # runs the vitest suite (reference, schema/consent,
                   # sanitisation/XSS, rate limiting, flows, email templates)
```

## 13. Manual QA checklist
- [ ] **iPhone Safari** — panel is a bottom sheet; input stays visible with the
      keyboard open; safe-area respected.
- [ ] **Android Chrome** — same; large touch targets.
- [ ] **Desktop Chrome / Safari / Edge** — 400px panel, internal scroll, close +
      reset controls, doesn't cover nav or cookie banner.
- [ ] **Keyboard-only** — Tab to launcher, Enter opens, focus lands inside,
      Escape closes and returns focus to the launcher.
- [ ] **Screen reader** — new messages announced (aria-live), controls labelled.
- [ ] **Reduced motion** — transitions minimised.
- [ ] **Slow connection** — chat shows the fallback; unfinished answers survive.
- [ ] Quick actions, quote flow, edit summary, submit-once, success reference.
- [ ] Enquiry consent required; marketing separate and unticked by default.

## 14. Security notes
Server-side AI/email calls only · env-var secrets · Zod validation · text
sanitisation + HTML escaping in emails (XSS-safe) · in-memory rate limiting
(swap for Upstash Redis at scale) · request-size limits · 25s AI timeout ·
same-origin (CSRF) guard on POSTs · honeypot spam trap (silent success) ·
duplicate-submit guard (button disabled while sending) · secure headers (in
`next.config.mjs`). **Never logged:** transcripts, emails, phone numbers,
accessibility info, secrets, API keys.

## 15. GDPR / policy items Mia must verify
- [ ] Confirm the Privacy Policy covers MAHDI enquiry data + retention period.
- [ ] Confirm `LEAD_RETENTION_DAYS` matches your stated retention, and set up a
      periodic purge (e.g. a scheduled job) — the value is configurable but the
      deletion job is yours to schedule.
- [ ] Confirm the lawful basis wording for enquiry vs marketing.
- [ ] Confirm ICO registration is in place (holding personal data).
- [ ] This build implements privacy-by-design but is **not** a guarantee of
      legal compliance — have it reviewed.

## 16. Remaining placeholders
`NEXT_PUBLIC_MIA_WHATSAPP_NUMBER`, `NEXT_PUBLIC_MIA_CONTACT_EMAIL`,
`MIA_LEAD_NOTIFICATION_EMAIL`, `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`,
`ANTHROPIC_API_KEY`/`OPENAI_API_KEY`. Until set: handover shows a friendly
"appears once configured" note, emails log instead of send, and chat uses the
scripted fallback. Everything else works.

## 17. Recommended phase-two
- Swap in Upstash Redis rate limiting for multi-instance scale.
- Add an hCaptcha/Turnstile challenge on submit for extra bot protection.
- Persist an opted-in transcript (with explicit consent) for richer context.
- Wire the AI to the live flight/destination data so suggestions can offer
  "shall I search real packages?" with an authorised source.
- A scheduled retention purge job honouring `LEAD_RETENTION_DAYS`.

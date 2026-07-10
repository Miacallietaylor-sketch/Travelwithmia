# Mia's Admin Guide

Your back office lives at **`/admin`** (e.g. `travelwithmia.co.uk/admin`).
It's hidden from Google and locked behind your access code.

## Signing in
1. Go to `/admin`. You'll be sent to the sign-in screen.
2. Enter your **access code** (the demo default is `mia-admin` — change it via
   `ADMIN_ACCESS_CODE` before the site is public).
3. You stay signed in for 7 days on that device. Use **Sign out** on a shared
   computer.

## What you'll see
- **Stat cards** — total enquiries, how many are in your pipeline, booked,
  newsletter subscribers, and reviews waiting to be verified.
- **Enquiries tab** — every quote request, newest first, with the client's
  contact details, trip, dates, party, budget, and their **marketing consent**
  (green E/S/C badges = they said yes to Email / SMS / Call).
- **Reviews tab** — verify genuine reviews so they appear publicly.
- **Subscribers tab** — your newsletter list, with a one-click **CSV export**.
- **Complaints tab** — logged complaints and their status.

A badge at the top tells you whether you're looking at **Live data** (Supabase
connected) or **Demo data** (sample entries, before you add the database).

---

## Everyday scenarios

### Scenario 1 — A new enquiry lands
1. Sarah submits the quote form → she instantly appears in **Enquiries** as
   **`new`**.
2. You email or call her. Change her status dropdown to **`contacted`**.
3. You send her hand-picked options → set **`quoted`**.
4. She says yes → set **`booked`**. 🎉 (Your "Booked" stat ticks up.)
5. If it goes cold, set **`lost`** so your pipeline stays honest.

> The status you pick is saved instantly. With Supabase connected it's stored in
> the database; in demo mode it just updates on screen.

### Scenario 2 — A client leaves a review
1. After their trip, a review comes in and shows in **Reviews** as *not
   verified* — so it is **not** public yet.
2. Check it's a genuine booking of yours.
3. Click **Verify**. It now appears on your public `/reviews` page and counts
   toward your star rating.
4. Only ever verify real, un-incentivised reviews — that's both the law and the
   whole point of your brand.

### Scenario 3 — You want to email your subscribers
1. Go to **Subscribers → Export CSV**.
2. Import that file into your email tool (Mailchimp, Brevo, etc.).
3. Everyone on the list opted in with a timestamp, so you're on solid ground.

### Scenario 4 — Someone searches flights
1. A visitor uses `/flights`, finds a fare, and taps **"Ask Mia to book."**
2. That drops them straight into your quote form with the destination
   pre-filled → it arrives in your **Enquiries** tab like any other lead.
3. You do the human bit: confirm the real price, add hotels/transfers, and make
   it a protected package.

### Scenario 5 — A complaint comes in
1. Log it (or it arrives via your complaints process) → it shows in
   **Complaints** with a status.
2. Follow the steps on your public **Complaints & ADR** page. Keeping this tidy
   is part of trading responsibly.

---

## Good habits
- **Change the admin code** before launch, and don't share it.
- **Keep statuses current** — the pipeline stat is only useful if it's honest.
- **Verify reviews promptly** so happy clients show up publicly while it's fresh.
- **Export your subscriber list** somewhere safe now and then.

## Upgrading security later
The current gate (access code + signed cookie) is fine to launch. When you're
ready, we can switch it to **Supabase Auth with a role check** so you log in
with your normal email/password and only your account can reach `/admin`. Just
ask and I'll wire it up.

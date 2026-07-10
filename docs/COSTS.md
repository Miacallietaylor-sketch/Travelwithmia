# What costs money, and what doesn't — the honest list

You asked to make sure nothing's quietly costing you money. Here's the straight
answer.

## ✅ Free — and staying free
| Thing | Why it's free |
|-------|---------------|
| **GitHub** (this repo) | Free plan: unlimited public *and* private repos. |
| **GitHub Actions** | We have **no** workflows, so **zero** Actions minutes are used. |
| **Vercel hosting** | Free "Hobby" tier covers a site like this comfortably. |
| **Supabase** | Free tier: database, auth, 50k monthly active users. |
| **Amadeus flights** | Free "test" environment. |
| **The code itself** | Yours. No licences, no subscriptions baked in. |
| **HTTPS / SSL** | Free and automatic on Vercel. |

## ⚠️ The few things that *can* cost — so there are no surprises
| Thing | Cost | When it applies |
|-------|------|-----------------|
| **Your domain** `travelwithmia.co.uk` | ~£10–15/yr | You already pay IONOS for this; it renews yearly. |
| **Vercel Pro** | $20/mo | *Only if* you outgrow Hobby **or** Vercel deems it commercial use. You can start on free and upgrade only if needed. |
| **ICO data protection fee** | ~£40/yr | Legally required once you hold customer data. Not optional, but small. |
| **ATOL/ABTA via a host agency** | Varies | Part of trading legally as a travel agent (see GO-LIVE-CHECKLIST). |
| **Amadeus production** | Pay-as-you-go | *Only if* you switch from free "test" to live real-time fares at volume. |
| **Stripe** | ~1.5%+20p per payment | *Only* when you actually take a payment. Nothing to set up. |
| **Business insurance** | Varies | Sensible once trading; often bundled by your host agency. |

## How to keep it at £0 for now
1. Deploy on **Vercel Hobby** (free) to visualise and share.
2. Keep **Amadeus** on `test` (free).
3. Use the **Supabase** free tier.
4. Don't add Stripe until you're actually charging for something.
5. The only unavoidable near-term spends are your **domain renewal** (already
   yours) and, once you're trading for real, the **ICO fee** and **host agency**.

## Nothing is auto-charging you
- No card is on file anywhere in this project.
- No paid API keys are committed (there are none).
- No background jobs or cron are running up a bill.
- Deleting the Vercel/Supabase projects (if you ever wanted to) stops
  everything instantly at no cost.

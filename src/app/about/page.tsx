import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { NewsletterCapture } from "@/components/NewsletterCapture";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Meet Mia",
  description:
    "Meet Mia — your independent UK travel consultant. One person, one point of contact, planning holidays personally from first idea to landing home.",
  path: "/about",
});

const values = [
  {
    title: "One point of contact",
    body: "You deal with me, start to finish. No call centres, no being passed around, no explaining yourself twice.",
  },
  {
    title: "Honest advice",
    body: "I'll tell you when the cheaper option is the better one, and when it's worth spending a little more. Straight answers only.",
  },
  {
    title: "Full prices, always",
    body: "What you see is what you pay — mandatory fees included. No drip pricing, no nasty surprises at the end.",
  },
  {
    title: "There when it matters",
    body: "If something needs sorting while you're away, you call me. That's the whole point of booking with a person.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Meet Mia"
        title="Hi, I'm Mia — and I'll plan it like it's my own trip"
        intro="I'm an independent UK travel consultant. That means no big-agency scripts and no faceless website — just me, personally planning your holiday."
      />

      <section className="container-page grid items-start gap-10 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-mia">
          <p>
            I&apos;m Mia — an independent travel consultant based in the UK. In
            plain terms: I&apos;m one real person who plans your holiday from
            start to finish, and stays your single point of contact the whole way
            through.
          </p>
          <p>
            I fell for travel the way most people do — one trip that changed how
            I saw the world. What I loved just as much was the planning: the
            research, the little details, the quiet satisfaction of a trip that
            runs perfectly because someone actually thought it through.
          </p>
          <p>
            So I made it my job. Today I plan holidays for families, couples and
            solo travellers across the UK — from easy weeks in the sun to complex
            multi-country journeys. Big enough to get you real value through
            trusted partners; small enough that you always speak to me, never a
            call centre.
          </p>
          <p>
            I&apos;m not trying to be the biggest travel agent out there.
            I&apos;m trying to be <em>your</em> travel agent — the one you call
            first, and the one you recommend to friends.
          </p>
          <Link href="/quote" className="btn-primary mt-2 no-underline">
            Start your enquiry
          </Link>
        </div>

        {/* Branded signature card (no stock photography) */}
        <aside className="rounded-3xl border border-sand bg-ink p-8 text-paper">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold font-display text-3xl font-semibold text-ink">
            M
          </div>
          <p className="mt-5 concierge-note text-3xl text-gold">Mia</p>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
            Independent UK Travel Consultant
          </p>
          <hr className="my-5 border-paper/15" />
          <ul className="space-y-3 text-sm text-paper/85">
            <li>One person, one point of contact</li>
            <li>Personal service — not the biggest inventory</li>
            <li>Full prices upfront, no drip pricing</li>
            <li>There if you ever need me, before and during your trip</li>
          </ul>
          <p className="mt-6 concierge-note text-xl text-paper/90">
            &ldquo;Tell me where. I&apos;ll do the rest.&rdquo;
          </p>
        </aside>
      </section>

      <section className="border-y border-sand bg-paper-2/60 py-16">
        <div className="container-page">
          <div className="mb-8 max-w-xl">
            <p className="eyebrow">What you can expect</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              How I work
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal">{v.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-xl">
            <ConciergeNote>
              I remember the details — the anniversary, the fussy eater, the room
              you loved last time. That&apos;s the difference a real person makes.
            </ConciergeNote>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Stay in touch</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Travel ideas, now and then
            </h2>
            <p className="mt-3 max-w-md text-charcoal">
              Join my list for occasional inspiration and early access to deals.
              No spam — just the good stuff.
            </p>
          </div>
          <NewsletterCapture source="about" />
        </div>
      </section>
    </>
  );
}

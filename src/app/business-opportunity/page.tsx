import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Business Opportunity",
  description:
    "Love travel? Explore becoming a travel consultant with the support, training and trusted partnerships to build your own business.",
  path: "/business-opportunity",
});

const perks = [
  {
    title: "Be your own boss",
    body: "Work flexibly, around your life. Part-time alongside a job or full-time — it's your call.",
  },
  {
    title: "Real training & support",
    body: "Full onboarding, ongoing mentoring and a community that actually answers the phone.",
  },
  {
    title: "Trusted partnerships",
    body: "Access to the same respected suppliers and financial-protection frameworks I use.",
  },
  {
    title: "Earn from what you love",
    body: "Turn your passion for travel into commission on every booking you make.",
  },
];

export default function BusinessOpportunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business opportunity"
        title="Turn your love of travel into your own business"
        intro="If people always ask you for holiday advice, you might be sitting on a business. I can show you how to build one — properly supported, not thrown in the deep end."
      />

      <section className="container-page pb-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {perks.map((p) => (
            <div key={p.title} className="card p-6">
              <h2 className="font-display text-lg font-semibold text-ink">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-charcoal">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="max-w-2xl">
          <ConciergeNote>
            I started exactly where you might be now — loving travel and
            wondering if I could make it a career. I can honestly say it&apos;s
            the best move I made.
          </ConciergeNote>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="card grid items-center gap-6 p-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Curious? Let&apos;s have a no-pressure chat
            </h2>
            <p className="mt-2 text-charcoal">
              Tell me a little about you and what you&apos;re looking for. No
              commitment, no hard sell — just an honest conversation about
              whether it&apos;s right for you.
            </p>
            <p className="mt-3 text-xs text-charcoal/60">
              Income depends on the bookings you make and the effort you put in.
              This is a genuine business, not a get-rich-quick scheme.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="btn-primary w-full">
              Arrange a chat
            </Link>
            <Link href="/about" className="btn-ghost w-full">
              Read Mia&apos;s story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

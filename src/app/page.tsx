import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { HolidayTypeCard } from "@/components/HolidayTypeCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterCapture } from "@/components/NewsletterCapture";
import { SectionHeading } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { holidayTypes } from "@/data/holidayTypes";
import { reviews } from "@/data/reviews";
import { blogPosts } from "@/data/blog";
import { deals } from "@/data/deals";

const steps = [
  {
    n: "01",
    title: "Tell me where",
    body: "Share your idea in a two-minute form — no account needed. A rough destination and budget is plenty to start.",
  },
  {
    n: "02",
    title: "I do the rest",
    body: "I research, compare and hand-pick options with full prices upfront, then talk you through them personally.",
  },
  {
    n: "03",
    title: "You travel happy",
    body: "One point of contact from booking to landing home — and someone to call if anything ever needs sorting.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      {/* How it works */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Personal from the first hello"
          intro="Booking a holiday shouldn't feel like filling in a spreadsheet. Here's how simple it is with me."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <span className="font-display text-4xl font-semibold text-gold">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Holiday types */}
      <section className="border-y border-sand bg-paper-2/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Holiday types"
            title="However you like to travel"
            intro="From once-in-a-lifetime honeymoons to easy family weeks in the sun — I plan them all."
            action={
              <Link href="/holiday-search" className="btn-ghost hidden sm:inline-flex">
                Browse all
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {holidayTypes.map((t) => (
              <HolidayTypeCard key={t.slug} type={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Meet Mia */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=70"
              alt="Portrait of a friendly travel consultant smiling"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">Meet Mia</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              One real person, genuinely on your side
            </h2>
            <div className="prose-mia mt-4">
              <p>
                I&apos;m not a call centre or a faceless website. I&apos;m Mia —
                an independent UK travel consultant who plans every trip
                personally. When you book with me, you get me: my time, my
                knowledge, and my little black book of hotels and contacts.
              </p>
              <p>
                I&apos;m not trying to have the biggest inventory in the world.
                I&apos;m trying to plan the one holiday that&apos;s right for
                you — and be there if you ever need me.
              </p>
            </div>
            <Link href="/about" className="btn-secondary mt-6">
              My story
            </Link>
          </div>
        </div>
      </section>

      {/* Deals teaser */}
      <section className="border-y border-sand bg-ink py-16 text-paper sm:py-20">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-gold">Handpicked deals</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                A few I&apos;m loving right now
              </h2>
              <p className="mt-2 max-w-lg text-paper/70">
                Full prices, including flights, transfers and taxes. What you see
                is what you pay.
              </p>
            </div>
            <Link
              href="/deals"
              className="btn-secondary border-paper/40 text-paper hover:bg-paper/10"
            >
              See all deals
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((d) => (
              <div key={d.id} className="overflow-hidden rounded-2xl bg-paper text-ink">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold">
                    {d.title}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/70">
                    {d.nights} nights · {d.board} · {d.departing}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    {d.wasPrice && (
                      <span className="text-sm text-charcoal/50 line-through">
                        {d.wasPrice}
                      </span>
                    )}
                    <span className="font-display text-xl font-semibold text-gold-ink">
                      {d.price}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-charcoal/60">
                    {d.perksNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Reviews"
          title="Kind words from real trips"
          intro="Every review here comes from a genuine, verified booking. Never fabricated, never incentivised."
          action={
            <Link href="/reviews" className="btn-ghost hidden sm:inline-flex">
              Read more
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <TestimonialCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      {/* Concierge note + quote CTA */}
      <section className="border-y border-sand bg-paper-2/60 py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Tell me where. I&apos;ll do the rest.
            </h2>
            <p className="mt-4 max-w-lg text-charcoal">
              Two minutes, no account, no obligation. Send me the spark of an
              idea and I&apos;ll turn it into a holiday.
            </p>
            <Link href="/quote" className="btn-primary mt-6">
              Get a Quote
            </Link>
          </div>
          <ConciergeNote>
            Even if you only half-know what you want, send it over. Half an idea
            is where all my best trips start.
          </ConciergeNote>
        </div>
      </section>

      {/* Journal */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Journal"
          title="Tips from someone who books this daily"
          action={
            <Link href="/journal" className="btn-ghost hidden sm:inline-flex">
              All articles
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-sand bg-ink py-16 text-paper sm:py-20">
        <div className="container-page grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">The VIP list</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              First to know, first to go
            </h2>
            <p className="mt-3 max-w-md text-paper/75">
              Occasional inspiration, early access to deals and the odd
              insider tip. No spam, unsubscribe any time.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-6">
            <NewsletterCapture source="home" />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ReviewsSchema } from "@/components/Schema";
import { reviews, aggregateRating } from "@/data/reviews";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reviews",
  description:
    "Real reviews from verified bookings only — never fabricated, never incentivised. See what Mia's clients say.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const verified = reviews.filter((r) => r.verified);

  return (
    <>
      <ReviewsSchema reviews={verified} />
      <PageHeader
        eyebrow="Reviews"
        title="Kind words from real trips"
        intro="Every review below comes from a genuine, verified booking. I never fabricate reviews and never incentivise them — it wouldn't be fair to you or my clients."
      />

      <section className="container-page pb-6">
        <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-4xl font-semibold text-gold-ink">
              {aggregateRating.ratingValue}
            </span>
            <div>
              <p className="font-label text-sm font-semibold text-ink">
                out of 5
              </p>
              <p className="text-xs text-charcoal/70">
                from {aggregateRating.reviewCount} verified bookings
              </p>
            </div>
          </div>
          <Link href="/quote" className="btn-primary">
            Plan your own trip
          </Link>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verified.map((r) => (
            <TestimonialCard key={r.id} review={r} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-xs text-charcoal/60">
          Reviews are collected from clients after their trip and are only
          published once the booking is verified. If you&apos;ve travelled with
          me and would like to leave feedback, just reply to any of my emails.
        </p>
      </section>
    </>
  );
}

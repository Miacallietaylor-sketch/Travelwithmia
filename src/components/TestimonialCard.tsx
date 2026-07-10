import type { Review } from "@/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-gold"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          aria-hidden="true"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
        >
          <path
            d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ review }: { review: Review }) {
  // Guard: only verified reviews should ever render publicly.
  if (!review.verified) return null;

  return (
    <figure className="card flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <span className="inline-flex items-center gap-1 rounded-full bg-beige px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wide text-gold-ink">
          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2 6.5l2.5 2.5L10 3"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Verified booking
        </span>
      </div>
      <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-ink">
        “{review.title}”
        <p className="mt-2 font-body text-sm font-normal leading-relaxed text-charcoal">
          {review.body}
        </p>
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-sand pt-4 text-sm">
        <span className="font-label font-semibold text-ink">
          {review.name}
        </span>
        <span className="text-charcoal/70">
          {review.location} · {review.holidayType}
        </span>
      </figcaption>
    </figure>
  );
}

import { site } from "@/lib/site";
import { aggregateRating } from "@/data/reviews";

const items = [
  {
    label: "ATOL / ABTA protected",
    sub: "Package holidays financially protected",
  },
  {
    label: `${aggregateRating.ratingValue}★ from real clients`,
    sub: "Verified bookings only",
  },
  { label: "One point of contact", sub: "You always speak to Mia" },
  { label: "Full prices upfront", sub: "No drip pricing, no surprises" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Why book with Mia"
      className="border-y border-sand bg-paper-2"
    >
      <div className="container-page grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center lg:text-left">
            <p className="font-label text-sm font-semibold text-ink">
              {item.label}
            </p>
            <p className="mt-0.5 text-xs text-charcoal/70">{item.sub}</p>
          </div>
        ))}
      </div>
      <p className="sr-only">
        Financial protection details are provided with your booking. Business:{" "}
        {site.legal.tradingName}.
      </p>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { HolidayType } from "@/data/holidayTypes";

export function HolidayTypeCard({ type }: { type: HolidayType }) {
  return (
    <Link
      href={`/holiday-types/${type.slug}`}
      className="group card overflow-hidden transition-shadow hover:shadow-lift focus-visible:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={type.image}
          alt={type.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-ink">
          {type.eyebrow}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-ink">
            {type.name}
          </h3>
          <span className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
            from {type.priceFrom}
          </span>
        </div>
        <p className="mt-2 text-sm text-charcoal">{type.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-label text-xs font-semibold uppercase tracking-[0.12em] text-gold-ink">
          Explore
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M2 7h9M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

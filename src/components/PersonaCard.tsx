import Link from "next/link";
import Image from "next/image";
import type { Persona } from "@/data/team";

/**
 * Renders an AI specialist. The "AI Specialist" badge is REQUIRED and always
 * shown — these personas must never read as real human employees.
 */
export function PersonaCard({ persona }: { persona: Persona }) {
  const href = persona.holidayType
    ? `/quote?type=${persona.holidayType}`
    : "/quote";
  return (
    <article className="group card overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={persona.avatar}
          alt={persona.avatarAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/85 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M6 1l1.3 3.1L10.5 5 7.8 6.4 7 9.5 5.2 7 2 6.8 4.4 4.6 4 1.5z"
              fill="currentColor"
            />
          </svg>
          AI Specialist
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-ink">
          {persona.name}
        </h3>
        <p className="font-label text-xs font-semibold uppercase tracking-wide text-gold-ink">
          {persona.role}
        </p>
        <p className="mt-2 text-sm text-charcoal">{persona.tagline}</p>
        <p className="concierge-note mt-3 text-lg text-charcoal/90">
          “{persona.voice}”
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {persona.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full bg-beige px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wide text-gold-ink"
            >
              {s}
            </span>
          ))}
        </div>
        <Link href={href} className="btn-ghost mt-5 w-full">
          Start with {persona.name}
        </Link>
      </div>
    </article>
  );
}

/** Compact inline persona strip for embedding on section pages. */
export function PersonaStrip({ persona }: { persona: Persona }) {
  return (
    <div className="card flex items-center gap-4 p-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={persona.avatar}
          alt={persona.avatarAlt}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display text-lg font-semibold text-ink">
            {persona.name}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink/85 px-2 py-0.5 font-label text-[9px] font-semibold uppercase tracking-wide text-gold">
            AI Specialist
          </span>
        </div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-wide text-gold-ink">
          {persona.role}
        </p>
        <p className="mt-1 text-sm text-charcoal">{persona.tagline}</p>
      </div>
    </div>
  );
}

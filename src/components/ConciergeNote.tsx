/**
 * The Concierge Note — the site's signature element.
 * A small handwritten (Caveat) note in Mia's voice at key moments.
 * This is the one bold device that proves a real person is behind the site,
 * so keep it sparing and genuine.
 */
export function ConciergeNote({
  children,
  signed = true,
  className = "",
}: {
  children: React.ReactNode;
  signed?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`relative rounded-2xl border border-sand bg-paper px-6 py-5 shadow-card ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 left-6 rounded-full bg-gold px-2.5 py-0.5 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-paper"
      >
        A note from Mia
      </span>
      <blockquote className="concierge-note text-2xl leading-snug text-charcoal">
        “{children}”
      </blockquote>
      {signed && (
        <figcaption className="concierge-note mt-1 text-xl text-gold-ink">
          — Mia
        </figcaption>
      )}
    </figure>
  );
}

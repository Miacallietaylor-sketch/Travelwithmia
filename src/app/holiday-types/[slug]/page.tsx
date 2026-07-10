import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { holidayTypes, getHolidayType } from "@/data/holidayTypes";
import { HolidayTypeCard } from "@/components/HolidayTypeCard";
import { ConciergeNote } from "@/components/ConciergeNote";
import { PersonaStrip } from "@/components/PersonaCard";
import { personaForHolidayType } from "@/data/team";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return holidayTypes.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const type = getHolidayType(params.slug);
  if (!type) return pageMeta({ title: "Holiday type", description: "" });
  return pageMeta({
    title: `${type.name} Holidays`,
    description: `${type.blurb} Planned personally by Mia — full prices upfront, one point of contact.`,
    path: `/holiday-types/${type.slug}`,
    image: type.image,
  });
}

export default function HolidayTypePage({
  params,
}: {
  params: { slug: string };
}) {
  const type = getHolidayType(params.slug);
  if (!type) notFound();

  const others = holidayTypes.filter((t) => t.slug !== type.slug).slice(0, 4);
  const persona = personaForHolidayType(type.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <Image
            src={type.image}
            alt={type.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
            aria-hidden="true"
          />
        </div>
        <div className="container-page relative py-20 sm:py-28">
          <p className="eyebrow text-gold">{type.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-6xl">
            {type.name} holidays
          </h1>
          <p className="mt-4 max-w-xl text-lg text-paper/85">{type.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href={`/quote?type=${type.slug}`} className="btn-primary">
              Get a {type.name.toLowerCase()} quote
            </Link>
            <span className="inline-flex items-center font-label text-sm uppercase tracking-wide text-paper/70">
              From {type.priceFrom}
            </span>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="prose-mia text-lg">{type.intro}</p>
          <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
            What I&apos;ll take care of
          </h2>
          <ul className="mt-4 space-y-3">
            {type.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-charcoal">
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-beige text-gold-ink">
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M2 6.5l2.5 2.5L10 3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <aside className="space-y-6">
          {persona && (
            <div>
              <p className="eyebrow mb-2">Your AI specialist</p>
              <PersonaStrip persona={persona} />
            </div>
          )}
          <ConciergeNote>{type.conciergeNote}</ConciergeNote>
          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-ink">
              Ready to start?
            </h3>
            <p className="mt-1 text-sm text-charcoal">
              Two-minute enquiry, no account needed.
            </p>
            <Link href={`/quote?type=${type.slug}`} className="btn-primary mt-4 w-full">
              Get a quote
            </Link>
          </div>
        </aside>
      </section>

      <section className="border-t border-sand bg-paper-2/60 py-14">
        <div className="container-page">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ink">
            Explore other holiday types
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((t) => (
              <HolidayTypeCard key={t.slug} type={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

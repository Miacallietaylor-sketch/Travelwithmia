import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { ConciergeNote } from "./ConciergeNote";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1900&q=70"
          alt="A calm tropical beach with clear turquoise water at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30"
          aria-hidden="true"
        />
      </div>

      <div className="container-page relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow text-gold">Independent UK travel consultant</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Tell me where.
            <span className="block text-gold">I&apos;ll do the rest.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/85">
            One person, one point of contact. I&apos;m {site.consultant}, and I
            personally plan holidays — from a spark of an idea to the moment you
            land home. Not the biggest inventory. The most personal service.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/quote" className="btn-primary">
              Get a Quote
            </Link>
            <Link
              href="/holiday-search"
              className="btn-secondary border-paper/40 text-paper hover:bg-paper/10"
            >
              Explore holidays
            </Link>
          </div>
        </div>

        <div className="mt-12 max-w-md">
          <ConciergeNote className="bg-paper/95 text-ink">
            No call centres, no being passed around. Just me, planning your trip
            like it&apos;s my own.
          </ConciergeNote>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ConciergeNote } from "@/components/ConciergeNote";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Lost your way?</p>
      <h1 className="mt-3 font-display text-6xl font-semibold text-ink sm:text-7xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-charcoal">
        This page has wandered off the map. Happens to the best of us — even
        seasoned travellers take a wrong turn now and then.
      </p>

      <div className="mt-8 w-full max-w-md">
        <ConciergeNote>
          Don&apos;t worry — I know exactly where everything is. Let me point you
          back in the right direction.
        </ConciergeNote>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/holiday-search" className="btn-secondary">
          Explore holidays
        </Link>
        <Link href="/quote" className="btn-ghost">
          Get a quote
        </Link>
      </div>
    </div>
  );
}

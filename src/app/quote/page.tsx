import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Get a Quote",
  description:
    "Tell me where you'd like to go and I'll come back to you personally — usually within a working day. Two minutes, no account needed.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mb-10 text-center">
        <p className="eyebrow">Get a quote</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Tell me where. I&apos;ll do the rest.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-charcoal">
          A couple of minutes is all it takes. No account required — submit as a
          guest and I&apos;ll be in touch personally.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-charcoal">Loading…</div>}>
        <QuoteForm />
      </Suspense>
    </div>
  );
}

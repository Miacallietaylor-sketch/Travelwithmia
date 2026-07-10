import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PersonaCard } from "@/components/PersonaCard";
import { ConciergeNote } from "@/components/ConciergeNote";
import { team } from "@/data/team";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "The AI Concierge Team",
  description:
    "Meet the AI specialists who help plan every kind of trip — then hand you to Mia, the one real person who books and protects it.",
  path: "/team",
});

export default function TeamPage() {
  const active = team.filter((p) => p.active);
  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="A specialist for every kind of trip"
        intro="Meet the AI concierge team. Each one knows their corner of the travel world inside out — and every idea they gather lands with Mia, the one real person who books and protects your holiday."
      />

      <section className="container-page pb-6">
        <div className="rounded-2xl border border-dashed border-gold/60 bg-beige/40 p-5">
          <p className="text-sm text-charcoal">
            <strong className="text-gold-ink">How this works:</strong> everyone
            below is an <strong>AI specialist</strong> — clever helpers that
            understand what you want and get things moving 24/7. They never
            replace the human bit. <strong>Mia personally reviews, books and
            protects every trip.</strong> AI does the legwork; Mia does the care.
          </p>
        </div>
      </section>

      <section className="container-page pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((p) => (
            <PersonaCard key={p.slug} persona={p} />
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ConciergeNote>
            My AI team never sleeps, so you can start dreaming at midnight. But
            when it&apos;s time to book, that&apos;s all me — one real person,
            one point of contact.
          </ConciergeNote>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Ready to start?
            </h2>
            <p className="mt-2 text-charcoal">
              Pick a specialist above, or just tell me your idea and I&apos;ll
              route it to the right one.
            </p>
            <Link href="/quote" className="btn-primary mt-4">
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ConciergeNote } from "@/components/ConciergeNote";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with Mia directly — by email, phone or WhatsApp. One person, one point of contact.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a real person — me"
        intro="No call centre, no ticket number. However you get in touch, it comes straight to me."
      />

      <section className="container-page grid gap-10 pb-16 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-xl font-semibold text-ink">
              Ways to reach me
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
                  Email
                </dt>
                <dd className="text-ink">{site.contact.email}</dd>
              </div>
              <div>
                <dt className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
                  Phone
                </dt>
                <dd className="text-ink">{site.contact.phone}</dd>
              </div>
              <div>
                <dt className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
                  WhatsApp
                </dt>
                <dd className="text-ink">{site.contact.whatsapp}</dd>
              </div>
              <div>
                <dt className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
                  Hours
                </dt>
                <dd className="text-ink">{site.contact.hours}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-charcoal/60">
              Contact details shown are placeholders in this demo.
            </p>
          </div>

          <ConciergeNote>
            The quickest way to get moving? The quote form. But if you just want
            to chat an idea through, call or message — I don&apos;t bite.
          </ConciergeNote>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-xl font-semibold text-ink">
            Send a message
          </h2>
          <p className="mt-1 text-sm text-charcoal">
            Ready for options? The quote form gets you a proper personal reply
            fastest.
          </p>
          <form
            className="mt-5 grid gap-4"
            action="/quote"
            method="get"
          >
            <div>
              <label htmlFor="c-name" className="field-label">
                Your name
              </label>
              <input id="c-name" name="name" className="field-input" />
            </div>
            <div>
              <label htmlFor="c-dest" className="field-label">
                What&apos;s on your mind?
              </label>
              <input
                id="c-dest"
                name="destination"
                className="field-input"
                placeholder="e.g. a family trip to Florida next summer"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Continue to a quick quote
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-charcoal/60">
            Prefer email? Write to me at {site.contact.email}. For a formal
            complaint, see{" "}
            <Link href="/complaints" className="text-gold-ink underline">
              Complaints &amp; ADR
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

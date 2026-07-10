import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FaqSchema } from "@/components/Schema";
import { ConciergeNote } from "@/components/ConciergeNote";
import { faqs } from "@/data/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Common questions about booking with Mia — costs, financial protection, quotes, data and more.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <PageHeader
        eyebrow="FAQ"
        title="Good questions, honest answers"
        intro="Everything people usually want to know before they enquire. Can't find it here? Just ask me."
      />
      <section className="container-page pb-16">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion faqs={faqs} />
          <div className="mt-10">
            <ConciergeNote>
              If your question isn&apos;t here, message me. I&apos;d always rather
              you asked than wondered.
            </ConciergeNote>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-secondary">
                Ask Mia
              </Link>
              <Link href="/quote" className="btn-primary">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

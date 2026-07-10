import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterCapture } from "@/components/NewsletterCapture";
import { blogPosts } from "@/data/blog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Journal",
  description:
    "Travel tips, destination guides and honest advice from Mia — someone who books this stuff every single day.",
  path: "/journal",
});

export default function JournalPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes from the road"
        intro="Honest, practical travel advice from someone who plans holidays for a living. No fluff, no filler."
      />

      <section className="container-page pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <BlogCard post={featured} />}
          {rest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-sand bg-paper-2/60 py-14">
        <div className="container-page grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Never miss a post</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Get the good stuff by email
            </h2>
            <p className="mt-3 max-w-md text-charcoal">
              New guides and deals, straight to your inbox — only when I&apos;ve
              got something worth sending.
            </p>
          </div>
          <NewsletterCapture source="journal" />
        </div>
      </section>
    </>
  );
}

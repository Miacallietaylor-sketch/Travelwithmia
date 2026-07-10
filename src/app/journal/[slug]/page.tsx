import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog";
import { ArticleSchema } from "@/components/Schema";
import { ConciergeNote } from "@/components/ConciergeNote";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return pageMeta({ title: "Journal", description: "" });
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    image: post.image,
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="pb-16">
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        date={post.date}
        author={post.author}
        image={post.image}
        url={`${site.url}/journal/${post.slug}`}
      />

      <div className="container-page pt-12">
        <Link
          href="/journal"
          className="font-label text-xs font-semibold uppercase tracking-wide text-gold-ink"
        >
          ← Back to Journal
        </Link>
        <div className="mx-auto mt-6 max-w-prose">
          <p className="font-label text-xs font-semibold uppercase tracking-wide text-gold-ink">
            {post.category} · {post.readMinutes} min read
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-charcoal/70">
            {date} · by {post.author}
          </p>
        </div>
      </div>

      <div className="container-page mt-8">
        <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-page mt-10">
        <div className="prose-mia mx-auto text-lg">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-prose">
          <ConciergeNote>
            Questions about anything here? Just ask — that&apos;s literally what
            I&apos;m for.
          </ConciergeNote>
          <Link href="/quote" className="btn-primary mt-6">
            Get a quote
          </Link>
        </div>
      </div>
    </article>
  );
}

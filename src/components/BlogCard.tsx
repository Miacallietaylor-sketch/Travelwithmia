import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group card overflow-hidden transition-shadow hover:shadow-lift">
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 font-label text-[11px] font-semibold uppercase tracking-wide text-gold-ink">
            <span>{post.category}</span>
            <span aria-hidden="true" className="text-sand">
              •
            </span>
            <span className="text-charcoal/60">{post.readMinutes} min read</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-charcoal">{post.excerpt}</p>
          <p className="mt-4 text-xs text-charcoal/60">
            {date} · by {post.author}
          </p>
        </div>
      </Link>
    </article>
  );
}

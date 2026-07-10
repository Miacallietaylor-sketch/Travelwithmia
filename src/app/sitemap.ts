import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { holidayTypes } from "@/data/holidayTypes";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/holiday-search",
    "/quote",
    "/deals",
    "/journal",
    "/reviews",
    "/faq",
    "/business-opportunity",
    "/account",
    "/contact",
    "/complaints",
    "/privacy",
    "/cookies",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  const typeEntries: MetadataRoute.Sitemap = holidayTypes.map((t) => ({
    url: `${site.url}/holiday-types/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${site.url}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...typeEntries, ...blogEntries];
}

import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  // Every page carries a share image: a page-specific one if provided,
  // otherwise the branded default OG card.
  const ogImage = image ?? `${site.url}/opengraph-image`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

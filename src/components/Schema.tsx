import { site, has } from "@/lib/site";
import { aggregateRating } from "@/data/reviews";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const sameAs = [
    site.social.instagram,
    site.social.facebook,
    site.social.tiktok,
  ].filter(has);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${site.url}/#organization`,
    name: site.name,
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    email: site.contact.email,
    image: `${site.url}/opengraph-image`,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    knowsAbout: [
      "Cruises",
      "Disney holidays",
      "Luxury travel",
      "Family holidays",
      "Honeymoons",
      "City breaks",
      "Multi-centre holidays",
      "Tailor-made travel",
    ],
    priceRange: "££–££££",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
    },
  };
  if (has(site.contact.phone)) data.telephone = site.contact.phone;
  if (sameAs.length) data.sameAs = sameAs;

  return <JsonLd data={data} />;
}

export function FaqSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function ReviewsSchema({
  reviews,
}: {
  reviews: {
    name: string;
    rating: number;
    body: string;
    title: string;
    date: string;
  }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: site.name,
        url: site.url,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          name: r.title,
          reviewBody: r.body,
          datePublished: r.date,
          author: { "@type": "Person", name: r.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
          },
        })),
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  date,
  author,
  image,
  url,
}: {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        image,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: author },
        publisher: { "@type": "Organization", name: site.name },
      }}
    />
  );
}

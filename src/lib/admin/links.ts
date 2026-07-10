/**
 * Mia's control-centre links — everything she runs the business from, in one
 * place. Internal links are relative; external ones point to the free service
 * dashboards. External URLs are generic sign-in pages (no account IDs baked in).
 */

export type AdminLink = { label: string; href: string; note: string };
export type AdminLinkGroup = { title: string; links: AdminLink[]; external?: boolean };

export const controlCentre: AdminLinkGroup[] = [
  {
    title: "Manage the site",
    links: [
      { label: "Homepage", href: "/", note: "View the live homepage" },
      { label: "Enquiries", href: "/admin", note: "Your lead pipeline (this dashboard)" },
      { label: "The AI Team", href: "/team", note: "Public team page" },
      { label: "Flight search", href: "/flights", note: "Live/sample fare search" },
      { label: "Deals", href: "/deals", note: "Current handpicked deals" },
      { label: "Journal", href: "/journal", note: "Blog / guides" },
      { label: "Reviews", href: "/reviews", note: "Verified reviews (public)" },
    ],
  },
  {
    title: "Free service dashboards",
    external: true,
    links: [
      { label: "Vercel", href: "https://vercel.com/dashboard", note: "Hosting & deploys (free Hobby tier)" },
      { label: "Supabase", href: "https://supabase.com/dashboard", note: "Database & accounts (free tier)" },
      { label: "Amadeus", href: "https://developers.amadeus.com", note: "Flight API keys (free test tier)" },
      { label: "Stripe", href: "https://dashboard.stripe.com", note: "Payment links (free to set up)" },
      { label: "Google Business", href: "https://business.google.com", note: "Local listing (free)" },
      { label: "Search Console", href: "https://search.google.com/search-console", note: "SEO & sitemap (free)" },
    ],
  },
  {
    title: "Compliance & registrations",
    external: true,
    links: [
      { label: "HMRC self-employment", href: "https://www.gov.uk/register-for-self-assessment", note: "Register as self-employed (free)" },
      { label: "ICO data protection", href: "https://ico.org.uk/registration/", note: "Data protection fee (~£40/yr)" },
      { label: "CAA / ATOL", href: "https://www.caa.co.uk/atol-protection/", note: "Financial protection info" },
      { label: "ABTA", href: "https://www.abta.com/", note: "Package protection & trust mark" },
    ],
  },
];

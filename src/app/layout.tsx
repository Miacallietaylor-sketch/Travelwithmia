import type { Metadata } from "next";
import { Playfair_Display, Poppins, Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { OrganizationSchema } from "@/components/Schema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${playfair.variable} ${poppins.variable} ${montserrat.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-label focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wide focus:text-paper"
        >
          Skip to content
        </a>
        <OrganizationSchema />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <CookieBanner />
      </body>
    </html>
  );
}

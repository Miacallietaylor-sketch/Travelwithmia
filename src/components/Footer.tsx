import Link from "next/link";
import { site } from "@/lib/site";
import { holidayTypes } from "@/data/holidayTypes";

const explore = [
  { href: "/holiday-search", label: "Holiday Search" },
  { href: "/flights", label: "Flight Search" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/deals", label: "Travel Deals" },
  { href: "/journal", label: "Journal" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
];

const company = [
  { href: "/about", label: "Meet Mia" },
  { href: "/business-opportunity", label: "Business Opportunity" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "Account" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/terms", label: "Terms & Booking Conditions" },
  { href: "/complaints", label: "Complaints & ADR" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-sand bg-paper-2">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-semibold text-ink">
              Travel With <span className="text-gold-ink">Mia</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-charcoal">
              {site.tagline} One real person planning your holiday — from first
              idea to the moment you land home.
            </p>
            <Link href="/quote" className="btn-secondary mt-5">
              Start your enquiry
            </Link>
          </div>

          <nav aria-label="Explore">
            <h2 className="eyebrow mb-3">Explore</h2>
            <ul className="space-y-2 text-sm text-charcoal">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Holiday types">
            <h2 className="eyebrow mb-3">Holiday Types</h2>
            <ul className="space-y-2 text-sm text-charcoal">
              {holidayTypes.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/holiday-types/${t.slug}`}
                    className="hover:text-gold-ink"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="eyebrow mb-3">Company</h2>
            <ul className="space-y-2 text-sm text-charcoal">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="hairline my-10" />

        {/* Trader identity + financial protection (UK legal requirements) */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="text-sm text-charcoal">
            <h2 className="eyebrow mb-3">Financial protection</h2>
            <p className="mb-2">
              Package holidays are protected under ATOL / ABTA schemes.
            </p>
            <p className="font-label text-xs">
              <span className="rounded bg-beige px-1.5 py-0.5 text-gold-ink">
                {site.legal.atolNumber}
              </span>{" "}
              <span className="rounded bg-beige px-1.5 py-0.5 text-gold-ink">
                {site.legal.abtaNumber}
              </span>
            </p>
            <p className="mt-2 text-xs text-charcoal/60">
              Numbers shown are placeholders in this demo and must be replaced
              with genuine registrations before going live.
            </p>
          </div>

          <div className="text-sm text-charcoal">
            <h2 className="eyebrow mb-3">Trader identity</h2>
            <p>{site.legal.registeredName}</p>
            <p>{site.legal.companyNumber}</p>
            <p>{site.legal.registeredAddress}</p>
            <p className="mt-1">VAT: {site.legal.vatNumber}</p>
          </div>

          <div className="text-sm text-charcoal">
            <h2 className="eyebrow mb-3">Contact</h2>
            <p>{site.contact.email}</p>
            <p>{site.contact.phone}</p>
            <p className="mt-1 text-xs text-charcoal/70">{site.contact.hours}</p>
          </div>
        </div>

        <hr className="hairline my-10" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-charcoal/70">
            © {new Date().getFullYear()} {site.legal.tradingName}. All rights
            reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-charcoal">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

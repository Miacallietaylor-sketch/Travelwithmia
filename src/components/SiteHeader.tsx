"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { holidayTypes } from "@/data/holidayTypes";

const primaryNav = [
  { href: "/holiday-search", label: "Holiday Search" },
  { href: "/flights", label: "Flights" },
  { href: "/deals", label: "Deals" },
  { href: "/team", label: "The Team" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "Meet Mia" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
          aria-label={`${site.name} home`}
        >
          Travel With <span className="text-gold-ink">Mia</span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          <div
            className="relative"
            onMouseEnter={() => setTypesOpen(true)}
            onMouseLeave={() => setTypesOpen(false)}
          >
            <button
              className="font-label text-sm font-medium uppercase tracking-wide text-charcoal hover:text-gold-ink"
              aria-expanded={typesOpen}
              aria-haspopup="true"
              onClick={() => setTypesOpen((v) => !v)}
            >
              Holiday Types
            </button>
            {typesOpen && (
              <div className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-sand bg-paper p-3 shadow-lift">
                  {holidayTypes.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/holiday-types/${t.slug}`}
                      className="rounded-xl px-3 py-2 hover:bg-beige"
                    >
                      <span className="block font-label text-sm font-semibold text-ink">
                        {t.name}
                      </span>
                      <span className="block text-xs text-charcoal/70">
                        {t.tagline}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-label text-sm font-medium uppercase tracking-wide text-charcoal hover:text-gold-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/account"
            className="font-label text-sm font-medium uppercase tracking-wide text-charcoal hover:text-gold-ink"
          >
            Account
          </Link>
          <Link href="/quote" className="btn-primary">
            Get a Quote
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sand lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-sand bg-paper lg:hidden">
          <nav
            className="container-page grid gap-1 py-4"
            aria-label="Mobile"
          >
            <Link
              href="/quote"
              className="btn-primary mb-2 w-full"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 font-label text-sm font-medium uppercase tracking-wide text-charcoal hover:bg-beige"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <details className="group">
              <summary className="cursor-pointer list-none rounded-lg px-3 py-2.5 font-label text-sm font-medium uppercase tracking-wide text-charcoal hover:bg-beige">
                Holiday Types
              </summary>
              <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                {holidayTypes.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/holiday-types/${t.slug}`}
                    className="rounded-lg px-3 py-2 text-sm text-charcoal hover:bg-beige"
                    onClick={() => setOpen(false)}
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </details>
            <Link
              href="/account"
              className="rounded-lg px-3 py-2.5 font-label text-sm font-medium uppercase tracking-wide text-charcoal hover:bg-beige"
              onClick={() => setOpen(false)}
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

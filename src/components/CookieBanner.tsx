"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "twm-cookie-consent";

type Consent = {
  essential: true;
  analytics: boolean;
  advertising: boolean;
  decidedAt: string;
};

/**
 * PECR / UK GDPR compliant cookie banner.
 * - "Accept all" and "Reject non-essential" are EQUALLY prominent.
 * - Nothing is pre-ticked.
 * - Advertising/tracking pixels load ONLY after explicit opt-in.
 *   (First-party analytics may load without consent, but here we still
 *   let the user decline it for good measure.)
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function save(consent: Omit<Consent, "essential" | "decidedAt">) {
    const value: Consent = {
      essential: true,
      ...consent,
      decidedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-sand bg-paper/95 backdrop-blur"
    >
      <div className="container-page py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-lg font-semibold text-ink">
              Your cookie choices
            </h2>
            <p className="mt-1 text-sm text-charcoal">
              We use essential cookies to make the site work. With your
              permission we&apos;d also use analytics to improve it. We only
              load advertising cookies if you opt in. See our{" "}
              <Link href="/cookies" className="text-gold-ink underline">
                Cookie Policy
              </Link>
              .
            </p>

            {showPrefs && (
              <fieldset className="mt-4 space-y-3 rounded-xl border border-sand p-4">
                <legend className="px-1 font-label text-xs font-semibold uppercase tracking-wide text-charcoal">
                  Manage preferences
                </legend>
                <label className="flex items-start gap-3 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 h-4 w-4 accent-gold"
                  />
                  <span>
                    <strong>Essential</strong> — always on. Needed for the site
                    to function.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-gold"
                  />
                  <span>
                    <strong>Analytics</strong> — helps me understand what&apos;s
                    useful. Not pre-ticked.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm text-charcoal">
                  <input
                    type="checkbox"
                    checked={advertising}
                    onChange={(e) => setAdvertising(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-gold"
                  />
                  <span>
                    <strong>Advertising</strong> — only loads if you switch this
                    on. Not pre-ticked.
                  </span>
                </label>
              </fieldset>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Equally prominent Accept / Reject — same size and weight */}
            <button
              className="btn-primary flex-1 whitespace-nowrap lg:flex-none"
              onClick={() => save({ analytics: true, advertising: true })}
            >
              Accept all
            </button>
            <button
              className="btn-primary flex-1 whitespace-nowrap bg-charcoal hover:bg-ink lg:flex-none"
              onClick={() => save({ analytics: false, advertising: false })}
            >
              Reject non-essential
            </button>
            {showPrefs ? (
              <button
                className="btn-ghost whitespace-nowrap"
                onClick={() => save({ analytics, advertising })}
              >
                Save choices
              </button>
            ) : (
              <button
                className="font-label text-sm font-semibold uppercase tracking-wide text-gold-ink underline underline-offset-4"
                onClick={() => setShowPrefs(true)}
              >
                Manage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

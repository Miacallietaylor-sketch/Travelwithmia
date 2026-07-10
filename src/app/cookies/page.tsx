import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cookie Policy",
  description:
    "How Travel With Mia uses cookies, and how to control them. Advertising cookies load only with your consent.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="10 July 2026">
      <p>
        Cookies are small files stored on your device. This policy explains
        which I use and how you stay in control, in line with PECR and UK GDPR.
      </p>

      <h2>Your control</h2>
      <p>
        When you first visit, a banner lets you <strong>Accept all</strong> or{" "}
        <strong>Reject non-essential</strong> with equal prominence — nothing is
        pre-ticked. You can also open <em>Manage</em> to choose category by
        category, and change your mind at any time by clearing the choice in your
        browser.
      </p>

      <h2>Categories</h2>
      <h3>Strictly necessary (always on)</h3>
      <p>
        Needed for the site to work — remembering your cookie choice, keeping you
        signed in, and securing forms. These don&apos;t require consent.
      </p>

      <h3>Analytics (optional)</h3>
      <p>
        Help me understand what&apos;s useful so I can improve the site. These
        load only if you allow them. Where first-party and privacy-respecting,
        they collect aggregate usage only.
      </p>

      <h3>Advertising / tracking (opt-in only)</h3>
      <p>
        Any advertising or third-party tracking pixels load{" "}
        <strong>only after you opt in</strong>. If you reject non-essential
        cookies, none of these are set.
      </p>

      <h2>Managing cookies in your browser</h2>
      <p>
        You can block or delete cookies in your browser settings. Blocking
        strictly-necessary cookies may stop parts of the site working.
      </p>

      <p>
        See the <Link href="/privacy">Privacy Policy</Link> for how I handle
        personal data more broadly.
      </p>
    </LegalPage>
  );
}

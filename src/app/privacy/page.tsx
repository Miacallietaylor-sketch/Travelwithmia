import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site, has } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Travel With Mia collects, uses and protects your personal data under UK GDPR.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="10 July 2026">
      <p>
        This policy explains how {site.legal.tradingName} (&quot;I&quot;,
        &quot;me&quot;) collects and uses your personal data, and your rights
        under UK GDPR and the Data Protection Act 2018. I am the data
        controller.
      </p>

      <h2>What I collect</h2>
      <ul>
        <li>Contact details you give me (name, email, phone).</li>
        <li>
          Trip details you share (destinations, dates, travellers, budget,
          preferences).
        </li>
        <li>Account details if you create one (email, hashed password).</li>
        <li>
          Consent records (what you agreed to and when), and marketing
          preferences per channel.
        </li>
        <li>
          Limited technical data (essential cookies, and analytics only if you
          allow it).
        </li>
      </ul>

      <h2>Why I use it (lawful bases)</h2>
      <ul>
        <li>
          <strong>To respond to your enquiry and plan your trip</strong> —
          necessary for taking steps at your request and performing our
          contract.
        </li>
        <li>
          <strong>Marketing</strong> — only where you have given consent, and
          only through the channels you chose (email, SMS/WhatsApp or phone).
          You can withdraw consent at any time.
        </li>
        <li>
          <strong>Legal and financial-protection obligations</strong> —
          necessary for compliance (e.g. ATOL/ABTA record-keeping).
        </li>
      </ul>

      <h2>Sharing</h2>
      <p>
        I share your details only with the travel suppliers needed to arrange
        and protect your booking (airlines, hotels, tour operators, and the
        ATOL/ABTA schemes), and with service providers who help run this site
        (such as hosting and database providers). I never sell your data.
      </p>

      <h2>Keeping it safe & how long</h2>
      <p>
        Passwords are stored only as secure hashes — never in plain text. I keep
        enquiry and booking records for as long as needed to serve you and to
        meet legal/financial-protection requirements, then delete them.
      </p>

      <h2>Your rights</h2>
      <p>
        You can access, correct, delete, restrict or port your data, and object
        to processing. Account holders can self-serve &quot;download my
        data&quot; and &quot;delete my account&quot; from the{" "}
        <Link href="/account">dashboard</Link>. Otherwise email me at{" "}
        {site.contact.email}. You can also complain to the Information
        Commissioner&apos;s Office (ICO) at ico.org.uk.
      </p>

      <h2>Cookies</h2>
      <p>
        See the <Link href="/cookies">Cookie Policy</Link> for detail. Advertising
        cookies load only if you opt in; you can change your choice any time.
      </p>

      <h2>Contact</h2>
      <p>
        {has(site.legal.registeredName) ? site.legal.registeredName : site.legal.tradingName}
        {has(site.legal.registeredAddress) ? `, ${site.legal.registeredAddress}` : ""}. Email{" "}
        {site.contact.email}.
      </p>
    </LegalPage>
  );
}

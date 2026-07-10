"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

type Quote = {
  id: string;
  type: string;
  destination: string;
  dates: string;
  status: "new" | "contacted" | "quoted" | "booked" | "lost";
};

const demoQuotes: Quote[] = [
  {
    id: "Q-1042",
    type: "Honeymoon",
    destination: "Maldives",
    dates: "Nov 2026",
    status: "quoted",
  },
  {
    id: "Q-1039",
    type: "Family",
    destination: "Florida",
    dates: "Aug 2026",
    status: "contacted",
  },
  {
    id: "Q-1031",
    type: "City break",
    destination: "Rome",
    dates: "Mar 2026",
    status: "booked",
  },
];

const statusStyle: Record<Quote["status"], string> = {
  new: "bg-beige text-gold-ink",
  contacted: "bg-sand/60 text-charcoal",
  quoted: "bg-gold text-paper",
  booked: "bg-green-700 text-white",
  lost: "bg-charcoal/20 text-charcoal",
};

export function Dashboard({
  email,
  onSignOut,
}: {
  email: string;
  onSignOut?: () => void;
}) {
  const referralUrl = `${site.url}/?ref=${encodeURIComponent(
    email.split("@")[0] || "mia-vip"
  )}`;
  const [prefs, setPrefs] = useState({
    email: true,
    sms: false,
    call: false,
  });
  const [copied, setCopied] = useState(false);

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Your dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-charcoal">{email}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/quote" className="btn-primary">
            New enquiry
          </Link>
          {onSignOut && (
            <button onClick={onSignOut} className="btn-ghost">
              Sign out
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Quotes */}
        <section className="card p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold text-ink">
            Your quotes
          </h2>
          <p className="mt-1 text-sm text-charcoal/70">
            Track every enquiry from first idea to booked.
          </p>
          <ul className="mt-4 divide-y divide-sand">
            {demoQuotes.map((q) => (
              <li
                key={q.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div>
                  <p className="font-label text-sm font-semibold text-ink">
                    {q.destination}{" "}
                    <span className="font-normal text-charcoal/60">
                      · {q.type}
                    </span>
                  </p>
                  <p className="text-xs text-charcoal/60">
                    {q.dates} · {q.id}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wide ${statusStyle[q.status]}`}
                >
                  {q.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* VIP + referral */}
        <section className="card bg-ink p-6 text-paper">
          <p className="eyebrow text-gold">VIP Club</p>
          <p className="mt-2 font-display text-2xl font-semibold">Gold tier</p>
          <p className="mt-1 text-sm text-paper/70">
            One more booking to Platinum perks.
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper/20">
            <div className="h-full w-2/3 bg-gold" />
          </div>
          <div className="mt-5">
            <p className="font-label text-xs font-semibold uppercase tracking-wide text-paper/70">
              Your referral link
            </p>
            <div className="mt-2 flex gap-2">
              <input
                readOnly
                value={referralUrl}
                className="w-full rounded-lg bg-paper/10 px-3 py-2 text-xs text-paper"
                aria-label="Referral link"
              />
              <button
                className="btn-primary whitespace-nowrap px-4 py-2"
                onClick={() => {
                  navigator.clipboard?.writeText(referralUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Wishlist */}
        <section className="card p-6">
          <h2 className="font-display text-xl font-semibold text-ink">
            Wishlist
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-charcoal">
            <li className="flex items-center justify-between">
              Santorini, Greece <span className="text-gold-ink">♥</span>
            </li>
            <li className="flex items-center justify-between">
              Disney Cruise Line <span className="text-gold-ink">♥</span>
            </li>
            <li className="flex items-center justify-between">
              Kyoto, Japan <span className="text-gold-ink">♥</span>
            </li>
          </ul>
          <Link href="/holiday-search" className="btn-ghost mt-4 w-full">
            Add more
          </Link>
        </section>

        {/* Documents */}
        <section className="card p-6">
          <h2 className="font-display text-xl font-semibold text-ink">
            Document vault
          </h2>
          <p className="mt-1 text-xs text-charcoal/70">
            ATOL certificates, invoices and itineraries.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-charcoal">
            <li className="flex items-center justify-between">
              ATOL Certificate — Rome
              <span className="text-gold-ink underline">Download</span>
            </li>
            <li className="flex items-center justify-between">
              Invoice — Rome
              <span className="text-gold-ink underline">Download</span>
            </li>
            <li className="flex items-center justify-between">
              Itinerary — Rome
              <span className="text-gold-ink underline">Download</span>
            </li>
          </ul>
        </section>

        {/* Comms prefs */}
        <section className="card p-6">
          <h2 className="font-display text-xl font-semibold text-ink">
            Contact preferences
          </h2>
          <p className="mt-1 text-xs text-charcoal/70">
            Choose how I can reach you. Change any time.
          </p>
          <div className="mt-3 space-y-2">
            {(["email", "sms", "call"] as const).map((k) => (
              <label
                key={k}
                className="flex items-center justify-between text-sm text-charcoal"
              >
                <span className="capitalize">
                  {k === "sms" ? "SMS / WhatsApp" : k === "call" ? "Phone call" : "Email"}
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-gold"
                  checked={prefs[k]}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, [k]: e.target.checked }))
                  }
                />
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Data rights */}
      <section className="mt-6 card p-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Your data, your control
        </h2>
        <p className="mt-1 text-sm text-charcoal/70">
          Under UK GDPR you can download or delete your data any time.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="btn-secondary"
            onClick={() => {
              const blob = new Blob(
                [JSON.stringify({ email, quotes: demoQuotes, prefs }, null, 2)],
                { type: "application/json" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "my-travelwithmia-data.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download my data
          </button>
          <button
            className="btn-ghost border-red-300 text-red-700 hover:border-red-500 hover:text-red-800"
            onClick={() =>
              alert(
                "In production this permanently deletes your account after confirmation. (Demo)"
              )
            }
          >
            Delete my account
          </button>
        </div>
      </section>
    </div>
  );
}

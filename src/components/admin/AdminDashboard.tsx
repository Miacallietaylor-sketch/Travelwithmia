"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type {
  AdminQuote,
  AdminReview,
  AdminSubscriber,
  AdminComplaint,
} from "@/lib/admin/data";
import { team } from "@/data/team";
import { controlCentre } from "@/lib/admin/links";

type Data = {
  live: boolean;
  quotes: AdminQuote[];
  reviews: AdminReview[];
  subscribers: AdminSubscriber[];
  complaints: AdminComplaint[];
};

const STATUSES = ["new", "contacted", "quoted", "booked", "lost"] as const;
const statusStyle: Record<string, string> = {
  new: "bg-beige text-gold-ink",
  contacted: "bg-sand/60 text-charcoal",
  quoted: "bg-gold text-paper",
  booked: "bg-green-700 text-white",
  lost: "bg-charcoal/20 text-charcoal",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AdminDashboard({
  initial,
  insecure,
}: {
  initial: Data;
  insecure: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<
    "quotes" | "team" | "reviews" | "subscribers" | "complaints" | "control"
  >("quotes");
  const [quotes, setQuotes] = useState(initial.quotes);
  const [reviews, setReviews] = useState(initial.reviews);
  const [personas, setPersonas] = useState(team);
  const [filter, setFilter] = useState<string>("all");
  const [busy, setBusy] = useState<string | null>(null);

  const stats = useMemo(() => {
    const pipeline = quotes.filter(
      (q) => q.status !== "booked" && q.status !== "lost"
    ).length;
    const booked = quotes.filter((q) => q.status === "booked").length;
    const pendingReviews = reviews.filter((r) => !r.verified).length;
    return {
      total: quotes.length,
      pipeline,
      booked,
      subscribers: initial.subscribers.length,
      pendingReviews,
    };
  }, [quotes, reviews, initial.subscribers.length]);

  const visibleQuotes =
    filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  async function setStatus(id: string, status: string) {
    setBusy(id);
    setQuotes((qs) =>
      qs.map((q) => (q.id === id ? { ...q, status } : q))
    );
    try {
      await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } finally {
      setBusy(null);
    }
  }

  async function toggleVerified(id: string, verified: boolean) {
    setBusy(id);
    setReviews((rs) =>
      rs.map((r) => (r.id === id ? { ...r, verified } : r))
    );
    try {
      await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, verified }),
      });
    } finally {
      setBusy(null);
    }
  }

  function exportSubscribers() {
    const rows = [
      ["email", "consent_at", "source"],
      ...initial.subscribers.map((s) => [s.email, s.consent_at, s.source ?? ""]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function togglePersona(slug: string, active: boolean) {
    setBusy(slug);
    setPersonas((ps) =>
      ps.map((p) => (p.slug === slug ? { ...p, active } : p))
    );
    try {
      await fetch("/api/admin/personas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, active }),
      });
    } finally {
      setBusy(null);
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const activePersonas = personas.filter((p) => p.active).length;
  const tabs = [
    { id: "quotes" as const, label: `Enquiries (${quotes.length})` },
    { id: "team" as const, label: `AI Team (${activePersonas} on)` },
    { id: "reviews" as const, label: `Reviews (${stats.pendingReviews} pending)` },
    { id: "subscribers" as const, label: `Subscribers (${initial.subscribers.length})` },
    { id: "complaints" as const, label: `Complaints (${initial.complaints.length})` },
    { id: "control" as const, label: "Control centre" },
  ];

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Back office</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">
            Mia&apos;s dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wide ${
              initial.live ? "bg-green-700 text-white" : "bg-beige text-gold-ink"
            }`}
          >
            {initial.live ? "Live data" : "Demo data (no DB yet)"}
          </span>
          <button onClick={signOut} className="btn-ghost py-2">
            Sign out
          </button>
        </div>
      </div>

      {insecure && (
        <p className="mt-4 rounded-xl border border-dashed border-gold/60 bg-beige/50 px-4 py-3 text-sm text-charcoal">
          <strong className="text-gold-ink">Security:</strong> you&apos;re using
          the default admin code and session secret. Set{" "}
          <code>ADMIN_ACCESS_CODE</code> and <code>ADMIN_SESSION_SECRET</code> in
          your environment variables before this is public.
        </p>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total enquiries", value: stats.total },
          { label: "In pipeline", value: stats.pipeline },
          { label: "Booked", value: stats.booked },
          { label: "Subscribers", value: stats.subscribers },
          { label: "Reviews to verify", value: stats.pendingReviews },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="font-display text-3xl font-semibold text-gold-ink">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-charcoal/70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-sand">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 font-label text-sm font-semibold ${
              tab === t.id
                ? "border-gold text-ink"
                : "border-transparent text-charcoal/60 hover:text-charcoal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* QUOTES */}
      {tab === "quotes" && (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              Filter:
            </span>
            {["all", ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-3 py-1 font-label text-[11px] font-semibold uppercase tracking-wide ${
                  filter === s
                    ? "bg-ink text-paper"
                    : "bg-paper-2 text-charcoal hover:bg-beige"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-sand text-left font-label text-[11px] uppercase tracking-wide text-charcoal/60">
                  <th className="py-2 pr-4">Client</th>
                  <th className="py-2 pr-4">Trip</th>
                  <th className="py-2 pr-4">Dates</th>
                  <th className="py-2 pr-4">Party</th>
                  <th className="py-2 pr-4">Budget</th>
                  <th className="py-2 pr-4">Consent</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleQuotes.map((q) => (
                  <tr key={q.id} className="border-b border-sand/60 align-top">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-ink">{q.name}</p>
                      <a href={`mailto:${q.email}`} className="text-xs text-gold-ink underline">
                        {q.email}
                      </a>
                      {q.phone && (
                        <p className="text-xs text-charcoal/60">{q.phone}</p>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <p className="capitalize text-ink">
                        {q.holiday_type.replace(/-/g, " ")}
                      </p>
                      <p className="text-charcoal/70">{q.destination}</p>
                      {q.notes && (
                        <p className="mt-1 max-w-[200px] text-xs text-charcoal/50">
                          {q.notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-charcoal/80">
                      {q.depart_date ? fmtDate(q.depart_date) : "Flexible"}
                      {q.return_date ? ` – ${fmtDate(q.return_date)}` : ""}
                    </td>
                    <td className="py-3 pr-4 text-charcoal/80">
                      {q.adults}a{q.children ? ` ${q.children}c` : ""}
                    </td>
                    <td className="py-3 pr-4 text-charcoal/80">{q.budget}</td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-1">
                        {[
                          ["E", q.consent_marketing_email],
                          ["S", q.consent_marketing_sms],
                          ["C", q.consent_marketing_call],
                        ].map(([l, on]) => (
                          <span
                            key={l as string}
                            title={`Marketing ${l}: ${on ? "yes" : "no"}`}
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                              on ? "bg-green-700 text-white" : "bg-paper-2 text-charcoal/40"
                            }`}
                          >
                            {l as string}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <select
                        value={q.status}
                        disabled={busy === q.id}
                        onChange={(e) => setStatus(q.id, e.target.value)}
                        className={`rounded-full px-3 py-1 font-label text-[11px] font-semibold uppercase tracking-wide ${statusStyle[q.status]}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI TEAM */}
      {tab === "team" && (
        <div className="mt-6">
          <p className="mb-4 text-sm text-charcoal/70">
            Your AI concierge specialists. Toggle one off to hide it from the
            public site. These are clearly badged as AI everywhere — you remain
            the one real person who books.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((p) => (
              <div key={p.slug} className="card flex items-center gap-4 p-4">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={p.avatar}
                    alt={p.avatarAlt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-semibold text-ink">
                    {p.name}
                  </p>
                  <p className="text-xs text-charcoal/70">{p.role}</p>
                  <p className="text-[11px] text-charcoal/50">{p.section}</p>
                </div>
                <button
                  onClick={() => togglePersona(p.slug, !p.active)}
                  disabled={busy === p.slug}
                  aria-pressed={p.active}
                  className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                    p.active ? "bg-green-700" : "bg-sand"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition-all ${
                      p.active ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                  <span className="sr-only">
                    {p.active ? "On" : "Off"} — toggle {p.name}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTROL CENTRE */}
      {tab === "control" && (
        <div className="mt-6 space-y-8">
          <p className="text-sm text-charcoal/70">
            Everything you run the business from, in one place.
          </p>
          {controlCentre.map((group) => (
            <div key={group.title}>
              <h2 className="eyebrow mb-3">{group.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((l) => {
                  const external = group.external;
                  const cls =
                    "card flex items-center justify-between gap-3 p-4 hover:shadow-lift";
                  const inner = (
                    <>
                      <span>
                        <span className="block font-label text-sm font-semibold text-ink">
                          {l.label}
                        </span>
                        <span className="block text-xs text-charcoal/60">
                          {l.note}
                        </span>
                      </span>
                      <span className="text-gold-ink" aria-hidden="true">
                        {external ? "↗" : "→"}
                      </span>
                    </>
                  );
                  return external ? (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href} className={cls}>
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REVIEWS */}
      {tab === "reviews" && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-charcoal/70">
            Only verified reviews appear publicly. Verify genuine bookings; never
            publish fabricated or incentivised reviews.
          </p>
          {reviews.map((r) => (
            <div key={r.id} className="card flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="max-w-2xl">
                <p className="font-semibold text-ink">
                  {"★".repeat(r.rating)}{" "}
                  <span className="font-normal">“{r.title}”</span>
                </p>
                <p className="mt-1 text-sm text-charcoal/80">{r.body}</p>
                <p className="mt-1 text-xs text-charcoal/60">
                  {r.name}
                  {r.location ? ` · ${r.location}` : ""} · {fmtDate(r.created_at)}
                </p>
              </div>
              <button
                onClick={() => toggleVerified(r.id, !r.verified)}
                disabled={busy === r.id}
                className={`rounded-full px-4 py-2 font-label text-xs font-semibold uppercase tracking-wide ${
                  r.verified
                    ? "bg-green-700 text-white"
                    : "border border-gold text-gold-ink hover:bg-beige"
                }`}
              >
                {r.verified ? "Verified ✓" : "Verify"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUBSCRIBERS */}
      {tab === "subscribers" && (
        <div className="mt-6">
          <div className="mb-4 flex justify-end">
            <button onClick={exportSubscribers} className="btn-secondary py-2">
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-sand text-left font-label text-[11px] uppercase tracking-wide text-charcoal/60">
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Consented</th>
                  <th className="py-2 pr-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {initial.subscribers.map((s) => (
                  <tr key={s.id} className="border-b border-sand/60">
                    <td className="py-2.5 pr-4 text-ink">{s.email}</td>
                    <td className="py-2.5 pr-4 text-charcoal/70">
                      {fmtDate(s.consent_at)}
                    </td>
                    <td className="py-2.5 pr-4 text-charcoal/70">{s.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMPLAINTS */}
      {tab === "complaints" && (
        <div className="mt-6 space-y-3">
          {initial.complaints.length === 0 ? (
            <p className="text-charcoal/70">No complaints logged. 🎉</p>
          ) : (
            initial.complaints.map((c) => (
              <div key={c.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{c.name}</p>
                  <span className="rounded-full bg-paper-2 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wide text-charcoal">
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-charcoal/80">{c.detail}</p>
                <p className="mt-1 text-xs text-charcoal/60">
                  {c.email} · {fmtDate(c.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

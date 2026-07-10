"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lead } from "@/lib/leads/types";
import { LEAD_STATUSES } from "@/lib/leads/types";

const statusStyle: Record<string, string> = {
  New: "bg-gold text-paper",
  "Contact required": "bg-beige text-gold-ink",
  "Quote in progress": "bg-sand/60 text-charcoal",
  "Quote sent": "bg-charcoal text-paper",
  Booked: "bg-green-700 text-white",
  Closed: "bg-charcoal/20 text-charcoal",
  Spam: "bg-red-200 text-red-800",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MahdiLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.ok) setLeads(data.leads);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = filter === "all" || l.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        [l.reference, l.customerName, l.email, l.destination, l.holidayStyle]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [leads, filter, query]);

  async function setStatus(id: string, status: string) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: status as Lead["status"] } : l)));
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function saveNotes(id: string) {
    setBusy(true);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, internalNotes: notes }),
    });
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, internalNotes: notes } : l)));
    setBusy(false);
  }

  async function anonymise(id: string) {
    if (!confirm("Anonymise this lead's personal data? This can't be undone.")) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSelected(null);
    load();
  }

  function exportCsv() {
    const cols: (keyof Lead)[] = [
      "reference", "createdAt", "status", "customerName", "email", "phone",
      "destination", "departureAirport", "departureDate", "nights", "adults",
      "children", "budget", "boardBasis", "holidayStyle", "preferredContactMethod",
      "enquiryConsent", "enquiryConsentTimestamp", "marketingConsent", "marketingConsentTimestamp",
    ];
    const rows = [cols.join(",")];
    for (const l of visible) {
      rows.push(cols.map((c) => `"${String(l[c] ?? "").replace(/"/g, '""')}"`).join(","));
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mahdi-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, reference, destination…"
          className="field-input max-w-xs py-2"
          aria-label="Search leads"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="field-input max-w-[180px] py-2"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button onClick={exportCsv} className="btn-secondary py-2">
          Export CSV
        </button>
        <button onClick={load} className="btn-ghost py-2">
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal/70">Loading leads…</p>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sand p-8 text-center text-charcoal/70">
          No MAHDI leads yet. When a visitor completes an enquiry in the chat, it
          appears here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-sand text-left font-label text-[11px] uppercase tracking-wide text-charcoal/60">
                <th className="py-2 pr-4">Ref</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Trip</th>
                <th className="py-2 pr-4">Received</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => (
                <tr key={l.id} className="border-b border-sand/60 align-top">
                  <td className="py-3 pr-4 font-mono text-[11px] text-gold-ink">{l.reference}</td>
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-ink">{l.customerName}</p>
                    <p className="text-xs text-charcoal/60">{l.email}</p>
                  </td>
                  <td className="py-3 pr-4 text-charcoal/80">
                    {l.destination || "Open"} · {l.holidayStyle || "—"}
                  </td>
                  <td className="py-3 pr-4 text-xs text-charcoal/70">{fmt(l.createdAt)}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={l.status}
                      onChange={(e) => setStatus(l.id, e.target.value)}
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wide ${statusStyle[l.status] ?? "bg-paper-2"}`}
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => {
                        setSelected(l);
                        setNotes(l.internalNotes);
                      }}
                      className="font-label text-xs font-semibold uppercase tracking-wide text-gold-ink underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-[95] flex justify-end bg-ink/40" onClick={() => setSelected(null)}>
          <div
            className="h-full w-full max-w-md overflow-y-auto bg-paper p-6 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-gold-ink">{selected.reference}</p>
              <button onClick={() => setSelected(null)} className="btn-ghost px-3 py-1.5 text-xs">
                Close
              </button>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
              {selected.customerName}
            </h3>
            <p className="text-sm text-charcoal">
              {selected.email}
              {selected.phone ? ` · ${selected.phone}` : ""}
            </p>
            <p className="mt-1 text-xs text-charcoal/60">
              Prefers {selected.preferredContactMethod} · {selected.bestContactTime || "any time"}
            </p>

            <dl className="mt-4 space-y-1.5 text-sm">
              {(
                [
                  ["Destination", selected.destination || "Open to ideas"],
                  ["Departure", selected.departureAirport],
                  ["Dates", `${selected.departureDate} (${selected.dateFlexibility})`],
                  ["Nights", selected.nights],
                  ["Travellers", `${selected.adults} adult(s), ${selected.children} child(ren)${selected.childrenAges ? ` — ${selected.childrenAges}` : ""}`],
                  ["Budget", selected.budget],
                  ["Board", selected.boardBasis],
                  ["Style", selected.holidayStyle],
                  ["Hotel", selected.hotelPreference],
                  ["Must-haves", selected.requirements],
                  ["Accessibility", selected.accessibilityRequirements],
                ] as [string, string][]
              )
                .filter(([, v]) => v && v.trim())
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-charcoal/60">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
            </dl>

            {selected.conversationSummary && (
              <div className="mt-4">
                <p className="eyebrow mb-1">Conversation summary</p>
                <p className="text-sm text-charcoal">{selected.conversationSummary}</p>
              </div>
            )}

            <div className="mt-4 rounded-xl bg-paper-2 p-3 text-xs text-charcoal">
              <p className="font-semibold">Consent</p>
              <p>Enquiry: {selected.enquiryConsent ? "yes" : "no"} {selected.enquiryConsentTimestamp ? `(${fmt(selected.enquiryConsentTimestamp)})` : ""}</p>
              <p>Marketing: {selected.marketingConsent ? "opted in" : "no"} {selected.marketingConsentTimestamp ? `(${fmt(selected.marketingConsentTimestamp)})` : ""}</p>
            </div>

            <div className="mt-4">
              <label className="field-label" htmlFor="lead-notes">
                Internal notes
              </label>
              <textarea
                id="lead-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="field-input text-sm"
              />
              <button
                onClick={() => saveNotes(selected.id)}
                className="btn-secondary mt-2 px-4 py-2 text-xs"
                disabled={busy}
              >
                Save notes
              </button>
            </div>

            <button
              onClick={() => anonymise(selected.id)}
              className="mt-6 w-full rounded-full border border-red-300 py-2 font-label text-xs font-semibold uppercase tracking-wide text-red-700 hover:bg-red-50"
            >
              Anonymise personal data (GDPR)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ukOrigins, popularDestinations } from "@/lib/flights/airports";
import type { FlightOffer, FlightItinerary } from "@/lib/flights/types";

function fmtDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m ? `${m}m` : ""}`.trim();
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function fmtDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function Leg({ it, label }: { it: FlightItinerary; label: string }) {
  const first = it.segments[0];
  const last = it.segments[it.segments.length - 1];
  return (
    <div className="flex items-center gap-4">
      <span className="w-16 font-label text-[10px] font-semibold uppercase tracking-wide text-charcoal/60">
        {label}
      </span>
      <div className="flex-1">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-display text-lg font-semibold text-ink">
              {fmtTime(first.departAt)}
            </span>{" "}
            <span className="text-charcoal/70">{first.from}</span>
          </div>
          <div className="flex-1 px-3 text-center">
            <p className="text-[11px] text-charcoal/60">
              {fmtDuration(it.durationMinutes)}
            </p>
            <div className="my-1 h-px bg-sand" />
            <p className="text-[11px] text-charcoal/60">
              {it.stops === 0 ? "Direct" : `${it.stops} stop`}
            </p>
          </div>
          <div className="text-right">
            <span className="font-display text-lg font-semibold text-ink">
              {fmtTime(last.arriveAt)}
            </span>{" "}
            <span className="text-charcoal/70">{last.to}</span>
          </div>
        </div>
        <p className="mt-1 text-[11px] text-charcoal/50">
          {fmtDay(first.departAt)} · {first.carrierName} · {first.flightNumber}
        </p>
      </div>
    </div>
  );
}

function OfferCard({ offer }: { offer: FlightOffer }) {
  return (
    <div className="card p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-3">
          <Leg it={offer.itineraries[0]} label="Outbound" />
          {offer.itineraries[1] && (
            <>
              <hr className="hairline" />
              <Leg it={offer.itineraries[1]} label="Return" />
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-sand pt-4 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="text-right">
            <p className="font-display text-2xl font-semibold text-gold-ink">
              £{offer.price.total.toLocaleString()}
            </p>
            <p className="text-[11px] text-charcoal/60">
              total{offer.price.perAdult ? ` · £${offer.price.perAdult.toLocaleString()}pp` : ""}
            </p>
            {offer.seatsRemaining != null && offer.seatsRemaining <= 4 && (
              <p className="mt-1 text-[11px] font-semibold text-red-700">
                Only {offer.seatsRemaining} seats left
              </p>
            )}
          </div>
          <Link
            href={`/quote?type=tailor-made&destination=${encodeURIComponent(
              offer.itineraries[0].segments.slice(-1)[0].to
            )}`}
            className="btn-primary whitespace-nowrap"
          >
            Ask Mia to book
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FlightSearch() {
  const today = new Date().toISOString().slice(0, 10);
  const [origin, setOrigin] = useState("LON");
  const [destination, setDestination] = useState("JFK");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [nonStop, setNonStop] = useState(false);
  const [travelClass, setTravelClass] = useState("ECONOMY");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offers, setOffers] = useState<FlightOffer[] | null>(null);
  const [source, setSource] = useState<string>("");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setOffers(null);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          departDate,
          returnDate,
          adults,
          nonStop,
          travelClass,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Search failed. Please try again.");
      } else {
        setOffers(data.offers);
        setSource(data.source);
        setNote(data.note ?? "");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="card grid gap-4 p-5 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <label htmlFor="fs-origin" className="field-label">
            From
          </label>
          <select
            id="fs-origin"
            className="field-input"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {ukOrigins.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="fs-dest" className="field-label">
            To
          </label>
          <select
            id="fs-dest"
            className="field-input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {popularDestinations.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="fs-depart" className="field-label">
            Depart
          </label>
          <input
            id="fs-depart"
            type="date"
            min={today}
            required
            className="field-input"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="fs-return" className="field-label">
            Return (optional)
          </label>
          <input
            id="fs-return"
            type="date"
            min={departDate || today}
            className="field-input"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="fs-adults" className="field-label">
            Adults
          </label>
          <input
            id="fs-adults"
            type="number"
            min={1}
            max={9}
            className="field-input"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-wrap items-center gap-5 lg:col-span-8">
          <div>
            <label htmlFor="fs-class" className="sr-only">
              Cabin class
            </label>
            <select
              id="fs-class"
              className="field-input py-2"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM_ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              className="h-4 w-4 accent-gold"
              checked={nonStop}
              onChange={(e) => setNonStop(e.target.checked)}
            />
            Direct flights only
          </label>
        </div>
        <div className="lg:col-span-4">
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Searching…" : "Search flights"}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {offers && (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
              {offers.length} option{offers.length === 1 ? "" : "s"} found
            </p>
            <span
              className={`rounded-full px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wide ${
                source === "amadeus"
                  ? "bg-green-700 text-white"
                  : "bg-beige text-gold-ink"
              }`}
            >
              {source === "amadeus" ? "Live fares" : "Sample fares (demo)"}
            </span>
          </div>
          {note && (
            <p className="mb-4 rounded-xl bg-beige/60 px-4 py-2 text-sm text-charcoal">
              {note}
            </p>
          )}
          <div className="space-y-4">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
          <p className="mt-6 text-xs text-charcoal/60">
            Fares are indicative and shown per the party selected, including
            taxes where available. I&apos;ll confirm the full price and secure
            the booking personally — the site never takes card details.
          </p>
        </div>
      )}
    </div>
  );
}

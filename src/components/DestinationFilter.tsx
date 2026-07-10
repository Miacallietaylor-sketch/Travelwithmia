"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { destinations, regions } from "@/data/destinations";
import { holidayTypes } from "@/data/holidayTypes";

export function DestinationFilter() {
  const [region, setRegion] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesRegion = region === "all" || d.region === region;
      const matchesType =
        type === "all" || d.bestFor.some((b) => b.toLowerCase() === type);
      const matchesQuery =
        query.trim() === "" ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.region.toLowerCase().includes(query.toLowerCase());
      return matchesRegion && matchesType && matchesQuery;
    });
  }, [region, type, query]);

  return (
    <div>
      <form
        className="card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Filter destinations"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="lg:col-span-2">
          <label htmlFor="df-search" className="field-label">
            Search
          </label>
          <input
            id="df-search"
            type="search"
            placeholder="Try 'Greece' or 'Indian Ocean'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="df-region" className="field-label">
            Region
          </label>
          <select
            id="df-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="field-input"
          >
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="df-type" className="field-label">
            Holiday type
          </label>
          <select
            id="df-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="field-input"
          >
            <option value="all">All types</option>
            {holidayTypes.map((t) => (
              <option key={t.slug} value={t.name.toLowerCase()}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p className="mt-4 font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
        {filtered.length} destination{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-sand p-10 text-center">
          <p className="text-charcoal">
            No matches yet — but I can still help. Nothing off-the-shelf is
            required.
          </p>
          <Link href="/quote" className="btn-secondary mt-4">
            Ask Mia directly
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <div key={d.slug} className="group card overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wide text-gold-ink">
                  {d.region}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {d.name}
                  </h3>
                  <span className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal/70">
                    from {d.priceFrom}
                  </span>
                </div>
                <p className="mt-2 text-sm text-charcoal">{d.blurb}</p>
                <p className="mt-3 text-xs text-charcoal/60">
                  Best time: {d.bestMonths}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.bestFor.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-beige px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wide text-gold-ink"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/quote?destination=${encodeURIComponent(d.name)}`}
                  className="btn-ghost mt-5 w-full"
                >
                  Get a quote for {d.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

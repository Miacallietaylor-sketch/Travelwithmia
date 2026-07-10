import type { FlightOffer, FlightSearchParams } from "./types";
import { getDestinationInfo, type FareBand } from "./airports";

const carriers: Record<string, string> = {
  BA: "British Airways",
  VS: "Virgin Atlantic",
  U2: "easyJet",
  FR: "Ryanair",
  W6: "Wizz Air",
  EK: "Emirates",
  QR: "Qatar Airways",
  TK: "Turkish Airlines",
  KL: "KLM",
  AF: "Air France",
  LH: "Lufthansa",
  TP: "TAP Air Portugal",
  EI: "Aer Lingus",
  TOM: "TUI Airways",
};

/** Typical one-way flight time (minutes) by fare band, with small variation. */
function baseDuration(band: FareBand): number {
  if (band === "short") return 140; // ~2h20 Europe
  if (band === "mid") return 270; // ~4h30 Canaries/Turkey/Egypt
  return 540; // ~9h long haul
}

/** Airlines that plausibly serve a band (kept realistic, not exhaustive). */
function carriersFor(band: FareBand): string[] {
  if (band === "short") return ["U2", "FR", "BA", "W6", "KL", "EI"];
  if (band === "mid") return ["TK", "BA", "TOM", "U2", "TP"];
  return ["BA", "VS", "EK", "QR", "TK"];
}

function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60000).toISOString();
}

/**
 * Deterministic, REALISTIC indicative offers so the flight search is useful
 * before Amadeus keys are added. Prices are grounded in typical economy fares
 * per route (not fabricated live prices) and clearly labelled as estimates in
 * the UI. One-way is priced lower than a return.
 */
export function sampleOffers(params: FlightSearchParams): FlightOffer[] {
  const info = getDestinationInfo(params.destination);
  const isReturn = !!params.returnDate;
  const dep = params.departDate || new Date().toISOString().slice(0, 10);

  // Per-person base: catalogue fare is a RETURN price; one-way ≈ 60%.
  const returnPp = info.farePp;
  const perAdult = isReturn ? returnPp : Math.round(returnPp * 0.6);
  const kids = params.children ?? 0;

  const codes = carriersFor(info.band);
  const count = Math.min(codes.length, params.max ?? 5);
  // Price steps above the cheapest fare (cheapest first).
  const steps = [0, 12, 28, 46, 70, 95];

  return Array.from({ length: count }).map((_, i) => {
    const code = codes[i];
    const stops = info.band === "long" ? (i % 2 === 0 ? 0 : 1) : i % 3 === 0 ? 0 : i % 3 === 1 ? 0 : 1;
    const outDur = baseDuration(info.band) + i * 20 + stops * (info.band === "long" ? 150 : 70);

    const pp = perAdult + steps[i];
    // Children ~75% of adult fare; infants ignored for a simple estimate.
    const total = Math.round(pp * params.adults + pp * 0.75 * kids);

    const departAt = `${dep}T${String(6 + i * 2).padStart(2, "0")}:${i % 2 ? "40" : "15"}:00`;
    const outbound = {
      durationMinutes: outDur,
      stops,
      segments: [
        {
          from: params.origin,
          to: params.destination,
          departAt,
          arriveAt: addMinutes(departAt, outDur),
          carrierCode: code,
          carrierName: carriers[code] ?? code,
          flightNumber: `${code}${100 + i * 7}`,
          durationMinutes: outDur,
        },
      ],
    };

    const itineraries = [outbound];
    if (isReturn) {
      const retDur = outDur - 15;
      const retDepart = `${params.returnDate}T${String(11 + i).padStart(2, "0")}:20:00`;
      itineraries.push({
        durationMinutes: retDur,
        stops,
        segments: [
          {
            from: params.destination,
            to: params.origin,
            departAt: retDepart,
            arriveAt: addMinutes(retDepart, retDur),
            carrierCode: code,
            carrierName: carriers[code] ?? code,
            flightNumber: `${code}${101 + i * 7}`,
            durationMinutes: retDur,
          },
        ],
      });
    }

    return {
      id: `est-${code}-${i}`,
      price: {
        total,
        currency: params.currency ?? "GBP",
        perAdult: pp,
      },
      itineraries,
      seatsRemaining: 4 + ((i * 3) % 6),
      source: "sample" as const,
    };
  });
}

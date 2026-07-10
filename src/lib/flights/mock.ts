import type { FlightOffer, FlightSearchParams } from "./types";

const carriers: Record<string, string> = {
  BA: "British Airways",
  VS: "Virgin Atlantic",
  EK: "Emirates",
  QR: "Qatar Airways",
  KL: "KLM",
  AF: "Air France",
  LH: "Lufthansa",
  TP: "TAP Air Portugal",
};

function addMinutes(iso: string, minutes: number): string {
  return new Date(new Date(iso).getTime() + minutes * 60000).toISOString();
}

/**
 * Deterministic sample flight offers so the UI is fully functional before
 * Amadeus keys are added. Clearly flagged as `source: "sample"` everywhere.
 */
export function sampleOffers(params: FlightSearchParams): FlightOffer[] {
  const dep = params.departDate || new Date().toISOString().slice(0, 10);
  const codes = ["BA", "VS", "EK", "QR", "KL", "AF"];
  const basePrice = 320 + (params.destination.charCodeAt(0) % 12) * 45;

  return codes.slice(0, params.max ?? 5).map((code, i) => {
    const stops = i % 3 === 0 ? 0 : 1;
    const outDur = 480 + i * 55 + stops * 90;
    const departAt = `${dep}T${String(7 + i).padStart(2, "0")}:${i % 2 ? "45" : "10"}:00`;
    const price = Math.round((basePrice + i * 38) * params.adults);

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
    if (params.returnDate) {
      const retDur = outDur - 20;
      const retDepart = `${params.returnDate}T${String(12 + i).padStart(2, "0")}:20:00`;
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
      id: `sample-${code}-${i}`,
      price: {
        total: params.returnDate ? price * 2 : price,
        currency: params.currency ?? "GBP",
        perAdult: params.returnDate
          ? Math.round((price * 2) / params.adults)
          : Math.round(price / params.adults),
      },
      itineraries,
      seatsRemaining: 3 + ((i * 2) % 6),
      source: "sample" as const,
    };
  });
}

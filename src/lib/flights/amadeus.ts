import "server-only";
import type {
  FlightOffer,
  FlightSearchParams,
  FlightSearchResult,
} from "./types";
import { sampleOffers } from "./mock";

/**
 * Amadeus Self-Service "Flight Offers Search" integration.
 *
 * How to get FREE keys (walkthrough also in docs/GO-LIVE-CHECKLIST.md):
 *  1. Create a free account at https://developers.amadeus.com
 *  2. Go to "My Self-Service Workspace" → create a new App.
 *  3. Copy the API Key and API Secret it gives you.
 *  4. Put them in .env.local:
 *       AMADEUS_CLIENT_ID=your-api-key
 *       AMADEUS_CLIENT_SECRET=your-api-secret
 *       AMADEUS_ENV=test        # 'test' (free sandbox) or 'production'
 *  The free "test" environment returns real cached data and is perfect for
 *  demos. Move to 'production' (and add billing) only when going live.
 *
 * If keys are absent, this module returns clearly-labelled SAMPLE data so the
 * flight search UI works out of the box.
 */

const clientId = process.env.AMADEUS_CLIENT_ID;
const clientSecret = process.env.AMADEUS_CLIENT_SECRET;
const isTest = (process.env.AMADEUS_ENV ?? "test") !== "production";
const BASE = isTest
  ? "https://test.api.amadeus.com"
  : "https://api.amadeus.com";

function looksReal(v: string | undefined): v is string {
  return !!v && v.length > 6 && !v.startsWith("your-");
}

export const isAmadeusConfigured =
  looksReal(clientId) && looksReal(clientSecret);

// ── Token cache (client-credentials, ~30 min TTL) ──
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getToken(): Promise<string | null> {
  if (!isAmadeusConfigured) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }
  const res = await fetch(`${BASE}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId!,
      client_secret: clientSecret!,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[amadeus] token error", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

type AmadeusOffer = {
  id: string;
  price: { grandTotal: string; currency: string };
  numberOfBookableSeats?: number;
  itineraries: {
    duration: string;
    segments: {
      departure: { iataCode: string; at: string };
      arrival: { iataCode: string; at: string };
      carrierCode: string;
      number: string;
      duration: string;
    }[];
  }[];
};

function iso8601ToMinutes(d: string): number {
  // e.g. PT13H35M
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(d);
  if (!m) return 0;
  return (parseInt(m[1] || "0") * 60) + parseInt(m[2] || "0");
}

function mapOffer(
  o: AmadeusOffer,
  carriers: Record<string, string>,
  adults: number
): FlightOffer {
  const total = parseFloat(o.price.grandTotal);
  return {
    id: o.id,
    price: {
      total,
      currency: o.price.currency,
      perAdult: Math.round(total / Math.max(1, adults)),
    },
    seatsRemaining: o.numberOfBookableSeats,
    source: "amadeus",
    itineraries: o.itineraries.map((it) => {
      const segments = it.segments.map((s) => ({
        from: s.departure.iataCode,
        to: s.arrival.iataCode,
        departAt: s.departure.at,
        arriveAt: s.arrival.at,
        carrierCode: s.carrierCode,
        carrierName: carriers[s.carrierCode] ?? s.carrierCode,
        flightNumber: `${s.carrierCode}${s.number}`,
        durationMinutes: iso8601ToMinutes(s.duration),
      }));
      return {
        durationMinutes: iso8601ToMinutes(it.duration),
        stops: Math.max(0, segments.length - 1),
        segments,
      };
    }),
  };
}

export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightSearchResult> {
  const token = await getToken();
  if (!token) {
    return {
      offers: sampleOffers(params),
      source: "sample",
      note: "Guide prices to help you plan — Mia confirms live fares and the best available price before booking.",
    };
  }

  const qs = new URLSearchParams({
    originLocationCode: params.origin.toUpperCase(),
    destinationLocationCode: params.destination.toUpperCase(),
    departureDate: params.departDate,
    adults: String(params.adults),
    currencyCode: params.currency ?? "GBP",
    max: String(params.max ?? 8),
  });
  if (params.returnDate) qs.set("returnDate", params.returnDate);
  if (params.children) qs.set("children", String(params.children));
  if (params.travelClass) qs.set("travelClass", params.travelClass);
  if (params.nonStop) qs.set("nonStop", "true");

  try {
    const res = await fetch(`${BASE}/v2/shopping/flight-offers?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[amadeus] search error", res.status, await res.text());
      return {
        offers: sampleOffers(params),
        source: "sample",
        note: "Live search is temporarily unavailable — showing sample flights.",
      };
    }
    const json = (await res.json()) as {
      data: AmadeusOffer[];
      dictionaries?: { carriers?: Record<string, string> };
    };
    const carriers = json.dictionaries?.carriers ?? {};
    return {
      offers: (json.data ?? []).map((o) => mapOffer(o, carriers, params.adults)),
      source: "amadeus",
    };
  } catch (err) {
    console.error("[amadeus] fetch failed", err);
    return {
      offers: sampleOffers(params),
      source: "sample",
      note: "Live search failed — showing sample flights.",
    };
  }
}

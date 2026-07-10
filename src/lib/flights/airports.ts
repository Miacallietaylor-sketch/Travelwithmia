/** Common UK origins (IATA city/airport codes). */
export const ukOrigins = [
  { code: "LON", label: "London (all airports)" },
  { code: "LHR", label: "London Heathrow" },
  { code: "LGW", label: "London Gatwick" },
  { code: "STN", label: "London Stansted" },
  { code: "LTN", label: "London Luton" },
  { code: "MAN", label: "Manchester" },
  { code: "BHX", label: "Birmingham" },
  { code: "EDI", label: "Edinburgh" },
  { code: "GLA", label: "Glasgow" },
  { code: "BRS", label: "Bristol" },
  { code: "NCL", label: "Newcastle" },
  { code: "LPL", label: "Liverpool" },
  { code: "LBA", label: "Leeds Bradford" },
  { code: "EMA", label: "East Midlands" },
  { code: "BFS", label: "Belfast" },
  { code: "ABZ", label: "Aberdeen" },
  { code: "CWL", label: "Cardiff" },
];

export type FareBand = "short" | "mid" | "long";

export type DestinationInfo = {
  code: string;
  label: string;
  region: string;
  band: FareBand;
  /** Realistic "from" per-person return economy fare (GBP, indicative). */
  farePp: number;
};

/**
 * Destination catalogue with realistic indicative return economy fares from the
 * UK. These are honest guide prices for the demo/fallback — NOT live fares.
 * Add Amadeus keys (see docs) to replace them with live bookable prices.
 */
export const destinationCatalogue: DestinationInfo[] = [
  // ── Europe · short haul ──
  { code: "DUB", label: "Dublin, Ireland", region: "Europe", band: "short", farePp: 45 },
  { code: "CDG", label: "Paris, France", region: "Europe", band: "short", farePp: 62 },
  { code: "NCE", label: "Nice, France", region: "Europe", band: "short", farePp: 78 },
  { code: "AMS", label: "Amsterdam, Netherlands", region: "Europe", band: "short", farePp: 55 },
  { code: "BCN", label: "Barcelona, Spain", region: "Europe", band: "short", farePp: 58 },
  { code: "MAD", label: "Madrid, Spain", region: "Europe", band: "short", farePp: 70 },
  { code: "AGP", label: "Málaga, Spain", region: "Europe", band: "short", farePp: 65 },
  { code: "ALC", label: "Alicante, Spain", region: "Europe", band: "short", farePp: 60 },
  { code: "PMI", label: "Palma, Mallorca", region: "Europe", band: "short", farePp: 72 },
  { code: "IBZ", label: "Ibiza, Spain", region: "Europe", band: "short", farePp: 80 },
  { code: "LIS", label: "Lisbon, Portugal", region: "Europe", band: "short", farePp: 70 },
  { code: "FAO", label: "Faro (Algarve), Portugal", region: "Europe", band: "short", farePp: 65 },
  { code: "OPO", label: "Porto, Portugal", region: "Europe", band: "short", farePp: 68 },
  { code: "FCO", label: "Rome, Italy", region: "Europe", band: "short", farePp: 72 },
  { code: "MXP", label: "Milan, Italy", region: "Europe", band: "short", farePp: 62 },
  { code: "VCE", label: "Venice, Italy", region: "Europe", band: "short", farePp: 78 },
  { code: "NAP", label: "Naples, Italy", region: "Europe", band: "short", farePp: 85 },
  { code: "CTA", label: "Sicily (Catania), Italy", region: "Europe", band: "short", farePp: 95 },
  { code: "ATH", label: "Athens, Greece", region: "Europe", band: "short", farePp: 110 },
  { code: "JTR", label: "Santorini, Greece", region: "Europe", band: "short", farePp: 160 },
  { code: "HER", label: "Crete (Heraklion), Greece", region: "Europe", band: "short", farePp: 120 },
  { code: "RHO", label: "Rhodes, Greece", region: "Europe", band: "short", farePp: 125 },
  { code: "CFU", label: "Corfu, Greece", region: "Europe", band: "short", farePp: 115 },
  { code: "DBV", label: "Dubrovnik, Croatia", region: "Europe", band: "short", farePp: 110 },
  { code: "SPU", label: "Split, Croatia", region: "Europe", band: "short", farePp: 105 },
  { code: "PRG", label: "Prague, Czechia", region: "Europe", band: "short", farePp: 70 },
  { code: "VIE", label: "Vienna, Austria", region: "Europe", band: "short", farePp: 85 },
  { code: "BER", label: "Berlin, Germany", region: "Europe", band: "short", farePp: 65 },
  { code: "MUC", label: "Munich, Germany", region: "Europe", band: "short", farePp: 80 },
  { code: "BUD", label: "Budapest, Hungary", region: "Europe", band: "short", farePp: 70 },
  { code: "KRK", label: "Kraków, Poland", region: "Europe", band: "short", farePp: 55 },
  { code: "CPH", label: "Copenhagen, Denmark", region: "Europe", band: "short", farePp: 80 },
  { code: "GVA", label: "Geneva, Switzerland", region: "Europe", band: "short", farePp: 82 },
  { code: "ZRH", label: "Zurich, Switzerland", region: "Europe", band: "short", farePp: 95 },
  { code: "MLA", label: "Malta", region: "Europe", band: "short", farePp: 90 },
  { code: "KEF", label: "Reykjavik, Iceland", region: "Europe", band: "short", farePp: 140 },
  // ── Canaries & near ──
  { code: "TFS", label: "Tenerife, Canary Islands", region: "Canary Islands", band: "mid", farePp: 140 },
  { code: "ACE", label: "Lanzarote, Canary Islands", region: "Canary Islands", band: "mid", farePp: 130 },
  { code: "LPA", label: "Gran Canaria, Canary Islands", region: "Canary Islands", band: "mid", farePp: 140 },
  { code: "FUE", label: "Fuerteventura, Canary Islands", region: "Canary Islands", band: "mid", farePp: 135 },
  // ── Mid haul ──
  { code: "IST", label: "Istanbul, Türkiye", region: "Türkiye", band: "mid", farePp: 160 },
  { code: "AYT", label: "Antalya, Türkiye", region: "Türkiye", band: "mid", farePp: 180 },
  { code: "DLM", label: "Dalaman, Türkiye", region: "Türkiye", band: "mid", farePp: 175 },
  { code: "RAK", label: "Marrakech, Morocco", region: "North Africa", band: "mid", farePp: 120 },
  { code: "HRG", label: "Hurghada, Egypt", region: "Egypt", band: "mid", farePp: 200 },
  { code: "SSH", label: "Sharm el-Sheikh, Egypt", region: "Egypt", band: "mid", farePp: 220 },
  { code: "DXB", label: "Dubai, UAE", region: "Middle East", band: "long", farePp: 380 },
  // ── Long haul ──
  { code: "JFK", label: "New York (JFK), USA", region: "USA", band: "long", farePp: 330 },
  { code: "MCO", label: "Orlando, USA", region: "USA", band: "long", farePp: 380 },
  { code: "LAS", label: "Las Vegas, USA", region: "USA", band: "long", farePp: 420 },
  { code: "CUN", label: "Cancún, Mexico", region: "Caribbean & Mexico", band: "long", farePp: 480 },
  { code: "BGI", label: "Barbados", region: "Caribbean & Mexico", band: "long", farePp: 520 },
  { code: "MBJ", label: "Montego Bay, Jamaica", region: "Caribbean & Mexico", band: "long", farePp: 540 },
  { code: "MLE", label: "Maldives (Malé)", region: "Indian Ocean", band: "long", farePp: 600 },
  { code: "MRU", label: "Mauritius", region: "Indian Ocean", band: "long", farePp: 640 },
  { code: "BKK", label: "Bangkok, Thailand", region: "Asia", band: "long", farePp: 520 },
  { code: "HKT", label: "Phuket, Thailand", region: "Asia", band: "long", farePp: 560 },
  { code: "SIN", label: "Singapore", region: "Asia", band: "long", farePp: 560 },
  { code: "NRT", label: "Tokyo, Japan", region: "Asia", band: "long", farePp: 620 },
  { code: "DPS", label: "Bali (Denpasar), Indonesia", region: "Asia", band: "long", farePp: 640 },
];

export const popularDestinations = destinationCatalogue.map((d) => ({
  code: d.code,
  label: d.label,
}));

const byCode = new Map(destinationCatalogue.map((d) => [d.code, d]));

export function getDestinationInfo(code: string): DestinationInfo {
  return (
    byCode.get(code.toUpperCase()) ?? {
      code: code.toUpperCase(),
      label: code.toUpperCase(),
      region: "Worldwide",
      band: "mid",
      farePp: 150,
    }
  );
}

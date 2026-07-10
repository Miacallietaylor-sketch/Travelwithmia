export type FlightSegment = {
  from: string;
  to: string;
  departAt: string;
  arriveAt: string;
  carrierCode: string;
  carrierName: string;
  flightNumber: string;
  durationMinutes: number;
};

export type FlightItinerary = {
  durationMinutes: number;
  stops: number;
  segments: FlightSegment[];
};

export type FlightOffer = {
  id: string;
  price: { total: number; currency: string; perAdult?: number };
  itineraries: FlightItinerary[]; // [0]=outbound, [1]=return (if any)
  seatsRemaining?: number;
  source: "amadeus" | "sample";
};

export type FlightSearchParams = {
  origin: string; // IATA e.g. LON
  destination: string; // IATA e.g. JFK
  departDate: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  adults: number;
  children?: number;
  travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  nonStop?: boolean;
  currency?: string;
  max?: number;
};

export type FlightSearchResult = {
  offers: FlightOffer[];
  source: "amadeus" | "sample";
  note?: string;
};

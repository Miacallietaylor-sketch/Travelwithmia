export type Destination = {
  slug: string;
  name: string;
  region: string;
  blurb: string;
  bestFor: string[];
  bestMonths: string;
  image: string;
  imageAlt: string;
  priceFrom: string;
};

export const destinations: Destination[] = [
  {
    slug: "maldives",
    name: "Maldives",
    region: "Indian Ocean",
    blurb: "Overwater villas, house reefs and total switch-off.",
    bestFor: ["Honeymoons", "Luxury", "Diving"],
    bestMonths: "Nov–Apr",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "Overwater villas above a turquoise lagoon in the Maldives",
    priceFrom: "£2,199pp",
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    blurb: "Lakes, coastlines and cities that never disappoint.",
    bestFor: ["City Breaks", "Family", "Tailor-Made"],
    bestMonths: "Apr–Jun, Sep–Oct",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "Colourful cliffside houses on the Italian coast",
    priceFrom: "£399pp",
  },
  {
    slug: "florida",
    name: "Florida",
    region: "USA",
    blurb: "Theme parks, gulf beaches and road-trip freedom.",
    bestFor: ["Disney", "Family", "Multi-Centre"],
    bestMonths: "Mar–May, Oct–Nov",
    image:
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "Palm-lined beach boardwalk in Florida at sunset",
    priceFrom: "£999pp",
  },
  {
    slug: "greece",
    name: "Greece",
    region: "Europe",
    blurb: "Island-hopping, whitewashed villages and easy sun.",
    bestFor: ["Family", "Honeymoons", "Multi-Centre"],
    bestMonths: "May–Sep",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "Whitewashed buildings and blue domes above the Aegean Sea",
    priceFrom: "£449pp",
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "Middle East",
    blurb: "Winter sun, big skylines and five-star value.",
    bestFor: ["Luxury", "Family", "City Breaks"],
    bestMonths: "Nov–Mar",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "Dubai skyline at dusk with skyscrapers lit up",
    priceFrom: "£749pp",
  },
  {
    slug: "caribbean",
    name: "Caribbean",
    region: "Caribbean",
    blurb: "Powder beaches, warm seas and island-hopping.",
    bestFor: ["Honeymoons", "Cruises", "Luxury"],
    bestMonths: "Dec–Apr",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "A palm tree leaning over a white Caribbean beach",
    priceFrom: "£1,299pp",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    blurb: "Cities, temples and bullet-train adventures.",
    bestFor: ["Tailor-Made", "Multi-Centre", "City Breaks"],
    bestMonths: "Mar–May, Oct–Nov",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "A temple framed by cherry blossom in Japan",
    priceFrom: "£1,599pp",
  },
  {
    slug: "spain",
    name: "Spain",
    region: "Europe",
    blurb: "Costas, cities and the Balearics — the reliable favourite.",
    bestFor: ["Family", "City Breaks", "Cruises"],
    bestMonths: "May–Oct",
    image:
      "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "A sunny Spanish plaza with palm trees",
    priceFrom: "£299pp",
  },
];

export const regions = [
  "Europe",
  "Indian Ocean",
  "USA",
  "Middle East",
  "Caribbean",
  "Asia",
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

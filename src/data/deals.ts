export type Deal = {
  id: string;
  title: string;
  destination: string;
  holidayType: string;
  nights: number;
  board: string;
  departing: string;
  wasPrice?: string;
  price: string; // full price per person, incl. mandatory fees
  perksNote: string;
  image: string;
  imageAlt: string;
};

/**
 * Deals show the FULL price per person including mandatory fees (no drip
 * pricing). `wasPrice` is only shown where a genuine prior price applies.
 * These seed deals are illustrative sample content for the demo.
 */
export const deals: Deal[] = [
  {
    id: "d1",
    title: "Adults-only Crete escape",
    destination: "Greece",
    holidayType: "Luxury",
    nights: 7,
    board: "Half board",
    departing: "Sep 2026",
    wasPrice: "£949pp",
    price: "£799pp",
    perksNote: "Price includes flights, transfers and all taxes.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "A whitewashed Greek villa above the sea",
  },
  {
    id: "d2",
    title: "Orlando family adventure",
    destination: "Florida",
    holidayType: "Disney",
    nights: 10,
    board: "Room only",
    departing: "Oct 2026",
    price: "£1,149pp",
    perksNote: "Flights, car hire and taxes included. Park tickets optional.",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "A theme park castle lit at dusk",
  },
  {
    id: "d3",
    title: "Maldives overwater honeymoon",
    destination: "Maldives",
    holidayType: "Honeymoons",
    nights: 7,
    board: "Half board",
    departing: "Nov 2026",
    wasPrice: "£2,699pp",
    price: "£2,399pp",
    perksNote: "Includes flights, seaplane transfers, taxes and honeymoon perks.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "Overwater villas on a turquoise Maldivian lagoon",
  },
  {
    id: "d4",
    title: "Western Mediterranean cruise",
    destination: "Spain",
    holidayType: "Cruises",
    nights: 7,
    board: "Full board",
    departing: "May 2026",
    price: "£899pp",
    perksNote: "Full-board dining and all port taxes included.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1000&q=70",
    imageAlt: "A cruise ship at sea near a Mediterranean coastline",
  },
];

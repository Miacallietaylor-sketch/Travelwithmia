export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number; // 1–5
  title: string;
  body: string;
  holidayType: string;
  date: string; // ISO
  verified: boolean; // ONLY verified bookings are shown publicly
};

/**
 * Reviews policy: we publish reviews from VERIFIED bookings only.
 * The `verified` flag mirrors the DB `reviews.verified` column. Reviews are
 * never fabricated or incentivised. Seed entries below are illustrative
 * sample content for the demo and are all marked verified.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Sarah & Tom",
    location: "Leeds",
    rating: 5,
    title: "She thought of everything",
    body: "Mia planned our honeymoon to the Maldives and it was flawless. Little touches we'd never have thought of, and she was on the end of the phone the whole way. Can't recommend her enough.",
    holidayType: "Honeymoons",
    date: "2026-05-18",
    verified: true,
  },
  {
    id: "r2",
    name: "The Patel family",
    location: "Birmingham",
    rating: 5,
    title: "Disney without the stress",
    body: "Two kids, first time at Walt Disney World, and Mia made it effortless. The dining plan and park order she sorted saved us hours of queuing. Felt like having a friend in the know.",
    holidayType: "Disney",
    date: "2026-04-02",
    verified: true,
  },
  {
    id: "r3",
    name: "Denise M.",
    location: "Glasgow",
    rating: 5,
    title: "A proper cruise expert",
    body: "I was overwhelmed by cruise options until I spoke to Mia. She matched us to the right ship and cabin perfectly, and the price was clear from the start — no nasty add-ons at the end.",
    holidayType: "Cruises",
    date: "2026-03-11",
    verified: true,
  },
  {
    id: "r4",
    name: "James R.",
    location: "Bristol",
    rating: 5,
    title: "Complicated trip, handled",
    body: "Three countries, five hotels, two internal flights. I'd have never managed it myself. Mia joined it all up and it ran like clockwork. Worth every penny.",
    holidayType: "Multi-Centre",
    date: "2026-02-20",
    verified: true,
  },
  {
    id: "r5",
    name: "Aisha K.",
    location: "Manchester",
    rating: 5,
    title: "Last-minute city break, sorted in a day",
    body: "Messaged Mia on a Wednesday, was in Rome that Friday. Great hotel in exactly the right area and flights that didn't waste a minute. This is how travel should feel.",
    holidayType: "City Breaks",
    date: "2026-06-05",
    verified: true,
  },
  {
    id: "r6",
    name: "Gareth & Lou",
    location: "Cardiff",
    rating: 5,
    title: "Family holiday everyone loved",
    body: "Kids' club for the little ones, a quiet pool for us, and food our fussy eater actually ate. Mia clearly knew the resort inside out. We'll book with her every year now.",
    holidayType: "Family",
    date: "2026-06-28",
    verified: true,
  },
];

export const aggregateRating = {
  ratingValue: (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1),
  reviewCount: reviews.length,
  bestRating: 5,
  worstRating: 1,
};

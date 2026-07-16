export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string; // ISO
  author: string;
  image: string;
  imageAlt: string;
  body: string[]; // paragraphs
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-book-summer-holidays",
    title: "The real best time to book your summer holiday",
    excerpt:
      "Everyone says 'book early' — but early when, exactly? Here's how I actually time it for my clients.",
    category: "Planning tips",
    readMinutes: 5,
    date: "2026-06-24",
    author: "Mia",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A quiet beach with turquoise water and soft sand",
    body: [
      "There's a myth that there's one magic day to book. There isn't. What matters is the gap between demand and availability for your specific trip — and that moves depending on where you're going and when.",
      "For peak school-holiday travel, I usually start watching prices 9–11 months out. Airlines release seats early and the best family rooms go first. Leave it late and you're not paying more for the same room — you're paying for the room nobody else wanted.",
      "For shoulder-season city breaks it's the opposite. Flexibility is your friend, and a quiet Tuesday flight two months out can be a genuine bargain.",
      "The honest answer? Tell me your dates and I'll tell you whether to pounce or wait. That's literally the job.",
    ],
  },
  {
    slug: "cruise-cabin-guide",
    title: "How to choose a cruise cabin (without overpaying)",
    excerpt:
      "Balcony, ocean-view, inside, guarantee — what actually matters and where to save.",
    category: "Cruises",
    readMinutes: 6,
    date: "2026-05-30",
    author: "Mia",
    image:
      "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A cruise ship balcony overlooking the open sea",
    body: [
      "Cabin choice is where cruises get confusing — and where a lot of money quietly disappears. Here's how I think about it.",
      "If you'll spend real time in the cabin, a balcony earns its keep, especially on scenic itineraries. If you're a 'only there to sleep' traveller, an ocean-view or even inside cabin frees up budget for excursions.",
      "Location on the ship matters more than people expect. Mid-ship, mid-deck is the smoothest ride. Avoid the cabin directly under the buffet or above the theatre unless you enjoy a soundtrack.",
      "'Guarantee' cabins can be great value — you pick a grade, the line picks the exact room. I only recommend them when the odds are in your favour, which depends on how full the sailing is.",
    ],
  },
  {
    slug: "family-all-inclusive-worth-it",
    title: "Is all-inclusive actually worth it for families?",
    excerpt:
      "Sometimes yes, sometimes a trap. Here's how I run the numbers before booking.",
    category: "Family",
    readMinutes: 4,
    date: "2026-04-15",
    author: "Mia",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "An infinity pool at a beachfront resort overlooking the sea",
    body: [
      "All-inclusive can be brilliant value or a false economy. The difference is your family's habits, not the label.",
      "If you'll use the kids' club, eat most meals on-site and enjoy a poolside drink, all-inclusive usually wins — and the budgeting certainty is a holiday in itself.",
      "But if you love exploring local restaurants, you may be paying twice. In walkable destinations I often steer families to half-board plus a food allowance.",
      "I always price both side by side, fully — including any resort fees — so you can see the real difference before you decide.",
    ],
  },
];

export const blogCategories = [
  "Planning tips",
  "Cruises",
  "Family",
  "Luxury",
  "Destinations",
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export type HolidayType = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  blurb: string;
  intro: string;
  highlights: string[];
  conciergeNote: string;
  image: string;
  imageAlt: string;
  priceFrom: string;
};

export const holidayTypes: HolidayType[] = [
  {
    slug: "cruises",
    name: "Cruises",
    eyebrow: "Ocean & river",
    tagline: "Unpack once, wake somewhere new.",
    blurb:
      "Ocean giants, boutique yachts and slow river journeys — matched to your pace, not the brochure's.",
    intro:
      "Cruising is the easiest way to see a lot without living out of a suitcase. I'll match you to the right line, cabin and itinerary — whether that's a family-friendly mega-ship or an adults-only river sailing through wine country.",
    highlights: [
      "Ocean, expedition and river lines compared honestly",
      "Cabin choice that actually suits you (mid-ship, aft, or a quiet deck)",
      "Drinks, dining and excursion packages priced in full — no surprises",
      "Flights, hotels and transfers joined up either side",
    ],
    conciergeNote:
      "Tell me who's travelling and I'll tell you which ship feels like your kind of place.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A cruise ship sailing on calm blue water at sunset",
    priceFrom: "£649pp",
  },
  {
    slug: "disney",
    name: "Disney",
    eyebrow: "Parks & magic",
    tagline: "The magic, minus the planning stress.",
    blurb:
      "Walt Disney World, Disneyland Paris and Disney Cruise Line — planned to the last FastPass.",
    intro:
      "Disney holidays reward planning, and there's a lot of it. I handle park tickets, dining reservations, the best on-site hotels and the timing tricks that keep queues short — so your days feel like magic, not logistics.",
    highlights: [
      "Walt Disney World, Disneyland Paris & Disney Cruise Line",
      "Dining reservations and park strategy planned around your family",
      "On-site vs off-site hotels compared for value",
      "Ticket bundles priced in full including park-hopper add-ons",
    ],
    conciergeNote:
      "I've booked these more times than I can count. Lean on me for the little tricks.",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A fairytale castle lit up at dusk in a theme park",
    priceFrom: "£1,199pp",
  },
  {
    slug: "luxury",
    name: "Luxury",
    eyebrow: "Five-star & suites",
    tagline: "The good stuff, quietly arranged.",
    blurb:
      "Five-star stays, private transfers and the extras that don't shout — booked with the perks.",
    intro:
      "Luxury isn't just a star rating — it's the airport lounge, the room upgrade, the dinner that was somehow already reserved. Through trusted partner programmes I secure genuine added value at the world's best hotels.",
    highlights: [
      "Preferred-partner perks: upgrades, credits, breakfast, late checkout",
      "Private transfers and fast-track where it's worth it",
      "Adults-only and villa options for real privacy",
      "Full pricing including resort fees and taxes",
    ],
    conciergeNote:
      "The perks are the point. I'll get you the ones that actually matter.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "An infinity pool at a luxury resort overlooking the sea",
    priceFrom: "£1,899pp",
  },
  {
    slug: "family",
    name: "Family",
    eyebrow: "All ages, sorted",
    tagline: "Everyone happy — including you.",
    blurb:
      "Kids' clubs, connecting rooms and pools that keep everyone happy — including you.",
    intro:
      "A good family holiday works for the toddlers, the teens and the grown-ups all at once. I know the resorts that get the balance right — great kids' clubs, food fussy eaters will actually eat, and a pool bar for the adults.",
    highlights: [
      "Family rooms, suites and connecting-room options",
      "Kids' clubs and age-appropriate activities checked, not assumed",
      "All-inclusive value compared honestly against half-board",
      "School-holiday dates planned early for the best prices",
    ],
    conciergeNote:
      "Tell me the ages and I'll picture the trip. I do this constantly.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A calm turquoise beach with soft golden sand",
    priceFrom: "£549pp",
  },
  {
    slug: "city-breaks",
    name: "City Breaks",
    eyebrow: "Short & sharp",
    tagline: "A proper reset in three days flat.",
    blurb:
      "Long weekends done properly — great location, the right neighbourhood, no wasted days.",
    intro:
      "A city break lives or dies on where you stay. I'll put you in the right neighbourhood, book flights that don't waste your first and last day, and point you at the tables worth reserving.",
    highlights: [
      "Neighbourhood-first hotel picks, not just the cheapest",
      "Flight timings that protect your short trip",
      "Rail and multi-city options across Europe",
      "Restaurant and experience tips from Mia",
    ],
    conciergeNote:
      "Give me a city and a Friday. I'll build you a weekend you'll talk about.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A historic European city street with cafés at dusk",
    priceFrom: "£299pp",
  },
  {
    slug: "honeymoons",
    name: "Honeymoons",
    eyebrow: "Once in a lifetime",
    tagline: "Your first trip as newlyweds, done right.",
    blurb:
      "The trip you'll remember forever — with the honeymoon perks quietly arranged.",
    intro:
      "This is the one that has to be right. I'll balance the beach, the adventure and the downtime, secure honeymoon perks at the hotels, and take the admin completely off your plate while you enjoy being newlyweds.",
    highlights: [
      "Twin-centre beach-and-explore itineraries",
      "Honeymoon perks and room upgrades where available",
      "Quiet, romantic, adults-only options",
      "A honeymoon gift-fund option for your wedding guests",
    ],
    conciergeNote:
      "Congratulations. Now let me make the trip as easy as saying 'I do'.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "An overwater villa on a turquoise lagoon at sunset",
    priceFrom: "£2,499pp",
  },
  {
    slug: "tailor-made",
    name: "Tailor-Made",
    eyebrow: "Built for you",
    tagline: "No package. Just your trip.",
    blurb:
      "A trip designed around you from a blank page — every flight, stay and transfer joined up.",
    intro:
      "When nothing off-the-shelf fits, we start from a blank page. Multi-stop routes, unusual timings, specific hotels, special occasions — I design the whole thing around you and hold it all together end to end.",
    highlights: [
      "A completely bespoke itinerary from a blank page",
      "Complex and multi-stop routing handled for you",
      "Special-occasion touches arranged in advance",
      "One point of contact from planning to landing home",
    ],
    conciergeNote:
      "The trickier the trip, the more I enjoy it. Tell me the dream.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "A winding coastal road seen from above at sunrise",
    priceFrom: "On request",
  },
  {
    slug: "multi-centre",
    name: "Multi-Centre",
    eyebrow: "Two trips in one",
    tagline: "City then sand, without the faff.",
    blurb:
      "Combine a city, a safari and a beach — seamlessly stitched into one journey.",
    intro:
      "Why choose? Pair a city with a beach, a safari with an island, or three countries in one loop. I plan the internal flights, transfers and pacing so the joins are invisible and you never feel rushed.",
    highlights: [
      "City-and-beach, safari-and-sand and island-hopping combos",
      "Internal flights and transfers timed to connect smoothly",
      "Pacing planned so you're never rushing",
      "Full end-to-end pricing across every leg",
    ],
    conciergeNote:
      "Two destinations, one seamless trip. This is my favourite kind of puzzle.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "Elephants crossing a savannah plain at golden hour",
    priceFrom: "£1,499pp",
  },
];

export function getHolidayType(slug: string) {
  return holidayTypes.find((t) => t.slug === slug);
}

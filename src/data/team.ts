/**
 * The AI Concierge Team.
 *
 * IMPORTANT — these are clearly-labelled AI specialists, not real employees.
 * Every card that renders a persona MUST show the "AI" badge. Mia is the one
 * real human who personally books and protects every trip. Presenting AI
 * personas as genuine human staff would be a misleading commercial practice
 * under UK consumer law — so we're upfront: these are AI helpers that gather
 * ideas and hand you to Mia.
 */

export type Persona = {
  slug: string;
  name: string;
  role: string; // e.g. "AI Cruise Concierge"
  section: string; // which part of the site they front
  holidayType?: string; // linked holiday-type slug, if any
  tagline: string;
  bio: string;
  voice: string; // a sample line in their persona voice
  specialties: string[];
  avatar: string;
  avatarAlt: string;
  accent: "gold" | "ink" | "charcoal";
  active: boolean;
};

export const team: Persona[] = [
  {
    slug: "pearl",
    name: "Pearl",
    role: "AI Welcome Concierge",
    section: "Homepage & general enquiries",
    tagline: "I'll point you to the right specialist in seconds.",
    bio: "Pearl greets every visitor, understands what you're dreaming of, and routes you to the right AI specialist — or straight to Mia. Think of her as the front desk that never sleeps.",
    voice: "Tell me the vibe you're after and I'll take it from there.",
    specialties: ["First questions", "Pointing you the right way", "Quick ideas"],
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Pearl, the AI welcome concierge",
    accent: "gold",
    active: true,
  },
  {
    slug: "aria",
    name: "Aria",
    role: "AI Cruise Concierge",
    section: "Cruises",
    holidayType: "cruises",
    tagline: "Ocean, expedition or river — I'll narrow it down fast.",
    bio: "Aria knows the cruise lines inside out and helps you shortlist ships, cabins and itineraries before Mia locks in the details and the best cabin.",
    voice: "Tell me who's sailing and I'll find your kind of ship.",
    specialties: ["Cruise lines", "Cabin selection", "Itinerary matching"],
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Aria, the AI cruise concierge",
    accent: "ink",
    active: true,
  },
  {
    slug: "max",
    name: "Max",
    role: "AI Disney & Parks Planner",
    section: "Disney",
    holidayType: "disney",
    tagline: "Parks strategy and dining, sorted before you pack.",
    bio: "Max lives for park maps and ride timings. He helps plan your days so Mia can secure the on-site hotels and dining that make the magic effortless.",
    voice: "Give me your dates and I'll plan the perfect park order.",
    specialties: ["Park strategy", "Dining plans", "Ticket options"],
    avatar:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Max, the AI Disney planner",
    accent: "charcoal",
    active: true,
  },
  {
    slug: "celeste",
    name: "Celeste",
    role: "AI Luxury Specialist",
    section: "Luxury",
    holidayType: "luxury",
    tagline: "The five-star shortlist, with the perks that matter.",
    bio: "Celeste curates the world's best stays and knows which perks are worth chasing. She sets the scene; Mia secures the upgrades and added value.",
    voice: "Tell me your idea of indulgence and I'll raise the bar.",
    specialties: ["Five-star stays", "Perk hunting", "Adults-only escapes"],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Celeste, the AI luxury specialist",
    accent: "gold",
    active: true,
  },
  {
    slug: "ben",
    name: "Ben",
    role: "AI Family Holiday Helper",
    section: "Family",
    holidayType: "family",
    tagline: "Happy kids, happy grown-ups — I'll balance both.",
    bio: "Ben matches resorts to your family's ages and habits — kids' clubs, pools, fussy-eater-friendly food — then hands the shortlist to Mia.",
    voice: "Give me the ages and I'll picture the perfect trip.",
    specialties: ["Kids' clubs", "Family rooms", "All-inclusive value"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Ben, the AI family holiday helper",
    accent: "ink",
    active: true,
  },
  {
    slug: "leo",
    name: "Leo",
    role: "AI City Break Curator",
    section: "City Breaks",
    holidayType: "city-breaks",
    tagline: "Right neighbourhood, no wasted days.",
    bio: "Leo knows which neighbourhood to stay in and which tables to book. He shapes the weekend; Mia sorts the flights and the stay.",
    voice: "Give me a city and a Friday — I'll build the weekend.",
    specialties: ["Neighbourhoods", "Flight timing", "Where to eat"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Leo, the AI city break curator",
    accent: "charcoal",
    active: true,
  },
  {
    slug: "rosa",
    name: "Rosa",
    role: "AI Honeymoon Specialist",
    section: "Honeymoons",
    holidayType: "honeymoons",
    tagline: "Beach, adventure and downtime — perfectly balanced.",
    bio: "Rosa helps design the once-in-a-lifetime trip, balancing romance and adventure. Mia secures the honeymoon perks and takes the admin away.",
    voice: "Congratulations! Now let me make the planning as easy as 'I do'.",
    specialties: ["Twin-centre trips", "Honeymoon perks", "Romantic escapes"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Rosa, the AI honeymoon specialist",
    accent: "gold",
    active: true,
  },
  {
    slug: "sol",
    name: "Sol",
    role: "AI Tailor-Made Designer",
    section: "Tailor-Made",
    holidayType: "tailor-made",
    tagline: "No package — I start from a blank page.",
    bio: "Sol thrives on complex, bespoke routes. He drafts the outline of your dream trip so Mia can join every leg into one seamless journey.",
    voice: "The trickier the trip, the more I enjoy it. Tell me the dream.",
    specialties: ["Bespoke routing", "Complex trips", "Special occasions"],
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Sol, the AI tailor-made designer",
    accent: "ink",
    active: true,
  },
  {
    slug: "nova",
    name: "Nova",
    role: "AI Multi-Centre Planner",
    section: "Multi-Centre",
    holidayType: "multi-centre",
    tagline: "Two destinations, one seamless trip.",
    bio: "Nova loves a puzzle — pairing cities with beaches, safaris with islands. She plans the pacing; Mia connects the flights and transfers.",
    voice: "Why choose? Let's do two trips in one, without the faff.",
    specialties: ["City-and-beach", "Island-hopping", "Pacing"],
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Nova, the AI multi-centre planner",
    accent: "charcoal",
    active: true,
  },
  {
    slug: "ivy",
    name: "Ivy",
    role: "AI Flight Finder",
    section: "Flights",
    holidayType: "tailor-made",
    tagline: "The right flight, at the right time, from your airport.",
    bio: "Ivy scans fares from UK airports and flags the smart options. Spot one you like and she passes it to Mia to build a protected package around it.",
    voice: "Find the flight — I'll hand Mia the rest to build around it.",
    specialties: ["Fare hunting", "UK departures", "Smart timings"],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Ivy, the AI flight finder",
    accent: "gold",
    active: true,
  },
  {
    slug: "juno",
    name: "Juno",
    role: "AI Journal Writer",
    section: "Journal",
    tagline: "Tips and guides, freshly drafted for Mia to approve.",
    bio: "Juno drafts destination guides and planning tips. Every article is reviewed by Mia before it's published — AI drafts, human sign-off.",
    voice: "I write the first draft; Mia adds the wisdom.",
    specialties: ["Destination guides", "Planning tips", "Seasonal ideas"],
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Juno, the AI journal writer",
    accent: "ink",
    active: true,
  },
  {
    slug: "vera",
    name: "Vera",
    role: "AI Support & FAQ",
    section: "Reviews & FAQ",
    tagline: "Quick answers, any time of day.",
    bio: "Vera handles the common questions instantly and points you to the right page — then loops in Mia for anything that needs a human touch.",
    voice: "Ask me anything — I'll answer or fetch Mia.",
    specialties: ["Instant answers", "Policy questions", "Signposting"],
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=70",
    avatarAlt: "Portrait avatar representing Vera, the AI support specialist",
    accent: "charcoal",
    active: true,
  },
];

export function getPersona(slug: string) {
  return team.find((p) => p.slug === slug);
}

export function personaForHolidayType(holidayType: string) {
  return team.find((p) => p.holidayType === holidayType && p.active);
}

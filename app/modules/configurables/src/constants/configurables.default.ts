/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TCrewMember = {
  name: string;
  species: string;
  role: string;
  personality: string;
  responsibilities: string;
  glow: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  isCaptain: boolean;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;

  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;

  missionConsoleTitle: string;
  missionConsoleSubtitle: string;
  runMissionLabel: string;
  defaultNichePrompt: string;

  showStrategySection: boolean;
  showCrewSection: boolean;
  showMetrics: boolean;

  brandVoice: string;

  crew: TCrewMember[];

  trendingNiches: string[];
  evergreenNiches: string[];
  primaryNiche: string;
  secondaryNiches: string[];
  strategyNote: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "AstroFur Syndicate",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#22E0FF",
    secondary: "#A855F7",
    accent: "#FFB627",
  },

  tagline: "Your AI crew. Autonomously running a profitable Etsy store.",
  heroTitle: "Deploy the Syndicate",
  heroSubtitle:
    "A living spaceship crew of seven AI agents researches trends, generates products, and publishes SEO-optimized Etsy listings — while you watch them power up.",
  primaryCtaLabel: "Run Mission",

  missionConsoleTitle: "Mission Console",
  missionConsoleSubtitle:
    "Pick a topic and deploy the crew. Market Intel finds the niche, the crew drafts a publish-ready, SEO-optimized Etsy listing.",
  runMissionLabel: "Run Mission",
  defaultNichePrompt: "minimalist digital planners",

  showStrategySection: true,
  showCrewSection: true,
  showMetrics: true,

  brandVoice:
    "Confident, modern, benefit-driven. Friendly but premium. Speaks to busy makers and small-business owners who want beautiful, useful digital products.",

  crew: [
    {
      name: "Captain Orion Vex",
      species: "Arctic Wolf",
      role: "Fleet Commander / Orchestrator",
      personality:
        "Calm, strategic, decisive. Sees the whole board and keeps the crew locked on revenue.",
      responsibilities:
        "Assigns missions, monitors Etsy performance, makes high-level revenue calls, runs the feedback loop back to the crew.",
      glow: "#22E0FF",
      level: 9,
      xp: 720,
      xpToNext: 1000,
      streak: 14,
      isCaptain: true,
    },
    {
      name: "Scout Lyra Nyx",
      species: "Desert Fox",
      role: "Market Intelligence Agent",
      personality:
        "Sharp, curious, fast. Smells a low-competition niche from a sector away.",
      responsibilities:
        "Scans demand signals and competition to surface trending, low-competition niches worth attacking.",
      glow: "#2EE6A6",
      level: 7,
      xp: 540,
      xpToNext: 800,
      streak: 9,
      isCaptain: false,
    },
    {
      name: "Forge Atlas Rune",
      species: "Mountain Tiger",
      role: "Product Creation Agent",
      personality:
        "Inventive and relentless. Turns a vague trend into ten concrete product ideas.",
      responsibilities:
        "Transforms niches into specific, sellable digital product concepts ready for design and listing.",
      glow: "#FFB627",
      level: 6,
      xp: 410,
      xpToNext: 700,
      streak: 6,
      isCaptain: false,
    },
    {
      name: "Pixel Kai Lumen",
      species: "Snow Leopard",
      role: "Design / Art Generation Agent",
      personality:
        "Aesthetic, precise, a little dramatic. Lives for the perfect mockup.",
      responsibilities:
        "Generates art directions, color systems, and mockup concepts that make listings pop.",
      glow: "#E044FF",
      level: 6,
      xp: 380,
      xpToNext: 700,
      streak: 5,
      isCaptain: false,
    },
    {
      name: "Echo Sable Quill",
      species: "Red Panda",
      role: "SEO & Listing Optimization Agent",
      personality:
        "Meticulous wordsmith. Obsessed with keywords, tags, and click-through.",
      responsibilities:
        "Writes SEO-optimized titles, 13 tags, and persuasive descriptions tuned for Etsy search.",
      glow: "#6AA8FF",
      level: 8,
      xp: 610,
      xpToNext: 900,
      streak: 11,
      isCaptain: false,
    },
    {
      name: "Halo Tamsin Ardor",
      species: "Golden Retriever",
      role: "Customer Engagement Agent",
      personality:
        "Warm, attentive, unflappable. Turns buyers into five-star reviewers.",
      responsibilities:
        "Drafts buyer messages, handles reviews, and keeps customer satisfaction high.",
      glow: "#FF5C7A",
      level: 5,
      xp: 290,
      xpToNext: 600,
      streak: 4,
      isCaptain: false,
    },
    {
      name: "Comet Rhys Vector",
      species: "Cheetah",
      role: "Growth & Marketing Agent",
      personality:
        "High-energy and data-driven. Always hunting the next scaling lever.",
      responsibilities:
        "Plans promotion, cross-channel marketing, and the scaling strategy that compounds revenue.",
      glow: "#FF8A3D",
      level: 6,
      xp: 350,
      xpToNext: 700,
      streak: 7,
      isCaptain: false,
    },
  ],

  trendingNiches: [
    "Minimalist digital planners (ADHD / focus)",
    "AI-generated wall art bundles",
    "Print-on-demand quote tees (niche fandoms)",
    "Wedding invitation & RSVP templates",
    "Budgeting & finance printables",
    "Kids' activity & coloring packs",
    "Social media post templates (Canva)",
  ],
  evergreenNiches: [
    "Digital planners & journals",
    "Printable wall art",
    "Niche printables (habit, meal, cleaning)",
    "AI-generated art bundles",
    "Wedding & event templates",
    "Kids' learning activities",
    "Small-business templates (invoices, resumes)",
  ],
  primaryNiche: "Digital planners & printables",
  secondaryNiches: [
    "Printable wall art",
    "Small-business & resume templates",
  ],
  strategyNote:
    "Planners drive repeat buyers and bundling; wall art reuses the same design engine for fast volume; business templates capture high-intent, higher-price buyers. All three share one design + SEO pipeline, so the crew scales output without new tooling.",
};

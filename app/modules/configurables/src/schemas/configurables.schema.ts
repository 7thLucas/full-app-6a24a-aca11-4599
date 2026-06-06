/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },

    // ── Branding / Hero copy ──────────────────────────────────────────
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
      maxLength: 160,
    },
    {
      fieldName: "heroTitle",
      type: "string",
      required: false,
      label: "Hero Title",
      maxLength: 120,
    },
    {
      fieldName: "heroSubtitle",
      type: "string",
      required: false,
      label: "Hero Subtitle",
      maxLength: 280,
    },
    {
      fieldName: "primaryCtaLabel",
      type: "string",
      required: false,
      label: "Primary CTA Label",
      maxLength: 40,
    },

    // ── Mission console copy ──────────────────────────────────────────
    {
      fieldName: "missionConsoleTitle",
      type: "string",
      required: false,
      label: "Mission Console Title",
      maxLength: 80,
    },
    {
      fieldName: "missionConsoleSubtitle",
      type: "string",
      required: false,
      label: "Mission Console Subtitle",
      maxLength: 200,
    },
    {
      fieldName: "runMissionLabel",
      type: "string",
      required: false,
      label: "Run Mission Button Label",
      maxLength: 40,
    },
    {
      fieldName: "defaultNichePrompt",
      type: "string",
      required: false,
      label: "Default Niche / Topic",
      maxLength: 120,
    },

    // ── Feature flags ─────────────────────────────────────────────────
    {
      fieldName: "showStrategySection",
      type: "boolean",
      required: false,
      label: "Show Etsy Strategy Section",
    },
    {
      fieldName: "showCrewSection",
      type: "boolean",
      required: false,
      label: "Show Crew Section",
    },
    {
      fieldName: "showMetrics",
      type: "boolean",
      required: false,
      label: "Show Performance Metrics",
    },

    // ── Brand voice for the AI (used in the generation prompt) ─────────
    {
      fieldName: "brandVoice",
      type: "string",
      required: false,
      label: "Etsy Store Brand Voice",
      maxLength: 280,
    },

    // ── The Crew (7 agents) ───────────────────────────────────────────
    {
      fieldName: "crew",
      type: "array",
      required: false,
      label: "Crew Members",
      item: {
        type: "object",
        fields: [
          { fieldName: "name", type: "string", required: true, label: "Name" },
          { fieldName: "species", type: "string", required: true, label: "Species" },
          { fieldName: "role", type: "string", required: true, label: "Role" },
          { fieldName: "personality", type: "string", required: false, label: "Personality" },
          { fieldName: "responsibilities", type: "string", required: false, label: "Responsibilities" },
          { fieldName: "glow", type: "color", required: true, label: "Glow Color" },
          { fieldName: "level", type: "number", required: false, label: "Level" },
          { fieldName: "xp", type: "number", required: false, label: "Current XP" },
          { fieldName: "xpToNext", type: "number", required: false, label: "XP To Next Level" },
          { fieldName: "streak", type: "number", required: false, label: "Streak" },
          { fieldName: "isCaptain", type: "boolean", required: false, label: "Is Captain" },
        ],
      },
    },

    // ── Etsy strategy: trending niches (short-term) ───────────────────
    {
      fieldName: "trendingNiches",
      type: "array",
      required: false,
      label: "Trending Now (Short-Term Wins)",
      item: { type: "string", required: true },
    },
    // ── Etsy strategy: evergreen winners (long-term) ──────────────────
    {
      fieldName: "evergreenNiches",
      type: "array",
      required: false,
      label: "Long-Term Winners (Evergreen)",
      item: { type: "string", required: true },
    },
    // ── Product strategy ──────────────────────────────────────────────
    {
      fieldName: "primaryNiche",
      type: "string",
      required: false,
      label: "Primary Niche",
      maxLength: 120,
    },
    {
      fieldName: "secondaryNiches",
      type: "array",
      required: false,
      label: "Secondary Niches",
      item: { type: "string", required: true },
    },
    {
      fieldName: "strategyNote",
      type: "string",
      required: false,
      label: "Why They Work Together",
      maxLength: 400,
    },
  ],
};
/**
 * Types for the AstroFur Syndicate "Run Mission" flow — the day-one core
 * feature: automated trend research + SEO-optimized Etsy listing generation.
 */

export interface NicheIntel {
  niche: string;
  whyTrending: string;
  competition: "low" | "medium" | "high";
  audience: string;
}

export interface GeneratedListing {
  title: string;
  tags: string[];
  description: string;
  suggestedPriceUsd: number;
  productType: string;
  bullets: string[];
  marketingAngle: string;
}

export interface MissionResult {
  intel: NicheIntel;
  listing: GeneratedListing;
}

/** JSON schema sent to the LLM so it returns a structured, parseable result. */
export const MISSION_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["intel", "listing"],
  properties: {
    intel: {
      type: "object",
      additionalProperties: false,
      required: ["niche", "whyTrending", "competition", "audience"],
      properties: {
        niche: { type: "string" },
        whyTrending: { type: "string" },
        competition: { type: "string", enum: ["low", "medium", "high"] },
        audience: { type: "string" },
      },
    },
    listing: {
      type: "object",
      additionalProperties: false,
      required: [
        "title",
        "tags",
        "description",
        "suggestedPriceUsd",
        "productType",
        "bullets",
        "marketingAngle",
      ],
      properties: {
        title: { type: "string" },
        tags: {
          type: "array",
          items: { type: "string" },
          minItems: 8,
          maxItems: 13,
        },
        description: { type: "string" },
        suggestedPriceUsd: { type: "number" },
        productType: { type: "string" },
        bullets: {
          type: "array",
          items: { type: "string" },
          minItems: 3,
          maxItems: 6,
        },
        marketingAngle: { type: "string" },
      },
    },
  },
};

/**
 * Mission client — wraps the @qb/agentic `invokeLLM` direct-LLM call to run the
 * crew's core mission: research a niche and generate a publish-ready,
 * SEO-optimized Etsy listing. Returns structured JSON validated by MISSION_SCHEMA.
 */

import { invokeLLM } from "@qb/agentic";
import { MISSION_SCHEMA, type MissionResult } from "./mission.types";

const SYSTEM_PROMPT = `You are the AstroFur Syndicate — a crew of AI agents that autonomously runs a profitable Etsy store.
Your job: take a topic/niche from the operator and produce (1) concise market intelligence and (2) a publish-ready, SEO-optimized Etsy listing.

Rules:
- Target DIGITAL or PRINT-ON-DEMAND products that are realistic to sell on Etsy (planners, printables, wall art, templates, etc.).
- The title must be Etsy-SEO optimized: keyword-rich, front-loaded, natural, <= 140 characters.
- Provide 8-13 tags, each <= 20 characters, lowercase, high-intent buyer keywords, no duplicates.
- The description must be persuasive and skimmable: a strong hook, what's included, who it's for, and a soft call to action.
- suggestedPriceUsd must be a realistic Etsy digital-product price (typically 3-29).
- bullets: 3-6 short "what you get" selling points.
- marketingAngle: one sentence on how the Growth agent would promote it.
- competition reflects how crowded the niche is on Etsy: "low", "medium", or "high".
Return ONLY the JSON object that matches the provided schema.`;

export async function runMission(input: {
  niche: string;
  brandVoice?: string;
}): Promise<MissionResult> {
  const message = [
    `Topic / niche to attack: "${input.niche.trim()}".`,
    input.brandVoice
      ? `Store brand voice to match: ${input.brandVoice}`
      : "",
    "Produce the market intel and the optimized Etsy listing as structured JSON.",
  ]
    .filter(Boolean)
    .join("\n");

  const result = await invokeLLM({
    message,
    schema: MISSION_SCHEMA,
    systemPrompt: SYSTEM_PROMPT,
  });

  if (result.status === "ERROR" || !result.response) {
    throw new Error(result.error ?? "The crew failed to complete the mission.");
  }

  return result.response as unknown as MissionResult;
}

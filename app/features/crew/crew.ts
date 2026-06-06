import type { TCrewMember } from "~/modules/configurables";

export type CrewMember = TCrewMember;

/** Clamp XP progress to a 0-100 percentage for the progress bars. */
export function xpProgress(member: Pick<CrewMember, "xp" | "xpToNext">): number {
  const to = member.xpToNext > 0 ? member.xpToNext : 1;
  return Math.max(0, Math.min(100, Math.round((member.xp / to) * 100)));
}

/** Total crew level = sum of member levels (a simple "fleet rank"). */
export function fleetLevel(crew: CrewMember[]): number {
  if (!crew.length) return 0;
  return crew.reduce((sum, m) => sum + (m.level || 0), 0);
}

export function totalXp(crew: CrewMember[]): number {
  return crew.reduce((sum, m) => sum + (m.xp || 0), 0);
}

export function bestStreak(crew: CrewMember[]): number {
  return crew.reduce((max, m) => Math.max(max, m.streak || 0), 0);
}

/** Safe fallback color if a glow value is missing/placeholder. */
export function glowOf(member: Pick<CrewMember, "glow">): string {
  const g = member.glow;
  return typeof g === "string" && g.length > 0 && !g.startsWith("FILL_")
    ? g
    : "#22E0FF";
}

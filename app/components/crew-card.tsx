import { Crown, Flame } from "lucide-react";
import { cn } from "~/lib/utils";
import { xpProgress, glowOf, type CrewMember } from "~/features/crew/crew";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function CrewCard({
  member,
  active = false,
  className,
}: {
  member: CrewMember;
  active?: boolean;
  className?: string;
}) {
  const glow = glowOf(member);
  const progress = xpProgress(member);

  return (
    <div
      className={cn(
        "panel panel-hover relative overflow-hidden p-5",
        active && "ring-1",
        className,
      )}
      style={
        active
          ? ({
              borderColor: glow,
              boxShadow: `0 0 0 1px ${glow}55, 0 0 40px -8px ${glow}`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* aura wash */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-2xl transition-opacity",
          active ? "animate-aura-pulse opacity-80" : "opacity-25",
        )}
        style={{ background: glow }}
      />

      <div className="relative flex items-start gap-4">
        {/* avatar with glowing ring */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "grid h-14 w-14 place-items-center rounded-full font-display text-sm font-bold",
              active && "animate-aura-pulse",
            )}
            style={{
              color: glow,
              background: "rgba(7,9,26,0.7)",
              border: `2px solid ${glow}`,
              boxShadow: `0 0 18px ${glow}80, inset 0 0 12px ${glow}40`,
            }}
          >
            {initials(member.name)}
          </div>
          {member.isCaptain && (
            <span
              className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full"
              style={{
                background: "rgba(255,182,39,0.18)",
                border: "1px solid rgba(255,182,39,0.6)",
              }}
              title="Captain"
            >
              <Crown className="h-3.5 w-3.5 text-accent" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-display text-base font-bold tracking-wide text-foreground">
              {member.name}
            </h3>
            <span
              className="shrink-0 rounded-md px-2 py-0.5 font-display text-xs font-bold"
              style={{
                color: glow,
                background: `${glow}1a`,
                border: `1px solid ${glow}55`,
              }}
            >
              LV {member.level}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {member.species} · {member.role}
          </p>

          {member.responsibilities ? (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
              {member.responsibilities}
            </p>
          ) : null}
        </div>
      </div>

      {/* XP bar */}
      <div className="relative mt-4">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-medium">
            XP {member.xp}/{member.xpToNext}
          </span>
          <span className="inline-flex items-center gap-1 text-accent">
            <Flame className="h-3 w-3" />
            {member.streak} streak
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${glow}, ${glow}aa)`,
              boxShadow: `0 0 12px ${glow}cc`,
            }}
          />
        </div>
      </div>

      {/* status line */}
      <div className="relative mt-3 flex items-center gap-2 text-[11px]">
        <span
          className={cn("h-2 w-2 rounded-full", active && "animate-pulse")}
          style={{
            background: active ? glow : "var(--muted-foreground)",
            boxShadow: active ? `0 0 8px ${glow}` : "none",
          }}
        />
        <span
          className="font-medium uppercase tracking-wider"
          style={{ color: active ? glow : "var(--muted-foreground)" }}
        >
          {active ? "Powering up" : "Standing by"}
        </span>
      </div>
    </div>
  );
}

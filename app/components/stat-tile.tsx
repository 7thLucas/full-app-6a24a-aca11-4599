import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export function StatTile({
  label,
  value,
  icon: Icon,
  accent = "#22E0FF",
  hint,
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("panel relative overflow-hidden p-4 sm:p-5", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl"
        style={{ background: accent }}
      />
      <div className="relative flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span
          className="grid h-8 w-8 place-items-center rounded-lg"
          style={{
            color: accent,
            background: `${accent}1a`,
            border: `1px solid ${accent}40`,
          }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div
        className="relative mt-3 font-display text-3xl font-extrabold tracking-tight"
        style={{ color: accent, textShadow: `0 0 18px ${accent}66` }}
      >
        {value}
      </div>
      {hint ? (
        <p className="relative mt-1 text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

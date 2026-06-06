import {
  Radar,
  Lightbulb,
  Palette,
  Search,
  Send,
  Megaphone,
  MessageCircle,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "~/lib/utils";

export interface PipelineStage {
  key: string;
  label: string;
  owner: string;
  glow: string;
  icon: LucideIcon;
}

/** Static pipeline definition mapping each automation step to an icon. */
export const PIPELINE_ICONS: Record<string, LucideIcon> = {
  research: Radar,
  idea: Lightbulb,
  design: Palette,
  listing: Search,
  publish: Send,
  marketing: Megaphone,
  engage: MessageCircle,
  feedback: RefreshCw,
};

/** activeIndex: -1 idle, 0..n active stage, n+ all complete. */
export function MissionPipeline({
  stages,
  activeIndex,
  done = false,
}: {
  stages: PipelineStage[];
  activeIndex: number;
  done?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {stages.map((stage, i) => {
        const Icon = stage.icon;
        const isActive = !done && i === activeIndex;
        const isComplete = done || i < activeIndex;
        const glow = stage.glow;

        return (
          <div key={stage.key} className="flex items-center gap-2">
            <div
              className={cn(
                "flex min-w-[112px] flex-col gap-1 rounded-xl border px-3 py-2 transition-all duration-300",
                isActive && "animate-stage-glow",
              )}
              style={{
                borderColor:
                  isActive || isComplete ? glow : "var(--border)",
                background:
                  isActive || isComplete ? `${glow}14` : "rgba(11,16,38,0.5)",
                boxShadow: isActive ? `0 0 26px -6px ${glow}` : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className="h-4 w-4 transition-colors"
                  style={{
                    color:
                      isActive || isComplete
                        ? glow
                        : "var(--muted-foreground)",
                  }}
                />
                <span
                  className="font-display text-[11px] font-bold uppercase tracking-wide"
                  style={{
                    color:
                      isActive || isComplete ? glow : "var(--muted-foreground)",
                  }}
                >
                  {stage.label}
                </span>
              </div>
              <span className="truncate text-[10px] text-muted-foreground">
                {stage.owner}
              </span>
            </div>

            {i < stages.length - 1 && (
              <span
                className="hidden h-px w-4 sm:block"
                style={{
                  background: isComplete ? glow : "var(--border)",
                  boxShadow: isComplete ? `0 0 8px ${glow}` : "none",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

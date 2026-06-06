import { useEffect, useRef, useState } from "react";
import { Rocket, Loader2, AlertTriangle, Trophy } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  MissionPipeline,
  PIPELINE_ICONS,
  type PipelineStage,
} from "./mission-pipeline";
import { ListingOutput } from "./listing-output";
import { runMission } from "~/features/mission/mission.client";
import type { MissionResult } from "~/features/mission/mission.types";
import { glowOf, type CrewMember } from "~/features/crew/crew";

type Phase = "idle" | "running" | "done" | "error";

/** Build the visible 8-stage pipeline, mapping owners onto real crew members. */
function buildStages(crew: CrewMember[]): PipelineStage[] {
  const byRole = (needle: string) =>
    crew.find((m) => m.role.toLowerCase().includes(needle));

  const captain = crew.find((m) => m.isCaptain) ?? crew[0];
  const intel = byRole("market");
  const product = byRole("product");
  const design = byRole("design");
  const seo = byRole("seo") ?? byRole("listing");
  const customer = byRole("customer");
  const growth = byRole("growth");

  const pick = (m: CrewMember | undefined, fallback: string) => ({
    owner: m?.name ?? fallback,
    glow: m ? glowOf(m) : "#22E0FF",
  });

  const defs: Array<{ key: string; label: string; m?: CrewMember; fb: string }> =
    [
      { key: "research", label: "Research", m: intel, fb: "Market Intel" },
      { key: "idea", label: "Idea", m: product, fb: "Product" },
      { key: "design", label: "Design", m: design, fb: "Design" },
      { key: "listing", label: "Listing", m: seo, fb: "SEO" },
      { key: "publish", label: "Publish", m: captain, fb: "Captain" },
      { key: "marketing", label: "Market", m: growth, fb: "Growth" },
      { key: "engage", label: "Engage", m: customer, fb: "Engage" },
      { key: "feedback", label: "Feedback", m: captain, fb: "Captain" },
    ];

  return defs.map((d) => {
    const p = pick(d.m, d.fb);
    return {
      key: d.key,
      label: d.label,
      owner: p.owner,
      glow: p.glow,
      icon: PIPELINE_ICONS[d.key],
    };
  });
}

export function MissionConsole({
  crew,
  title,
  subtitle,
  runLabel,
  defaultNiche,
  brandVoice,
  onActiveOwnersChange,
  onMissionComplete,
}: {
  crew: CrewMember[];
  title: string;
  subtitle: string;
  runLabel: string;
  defaultNiche: string;
  brandVoice?: string;
  onActiveOwnersChange?: (owners: string[]) => void;
  onMissionComplete?: () => void;
}) {
  const stages = buildStages(crew);
  const [niche, setNiche] = useState(defaultNiche);
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [result, setResult] = useState<MissionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  // Report which crew members are currently "powering up" to the parent grid.
  const activeOwner =
    phase === "running" && activeIndex >= 0
      ? (stages[activeIndex]?.owner ?? null)
      : null;
  useEffect(() => {
    if (!onActiveOwnersChange) return;
    onActiveOwnersChange(activeOwner ? [activeOwner] : []);
  }, [activeOwner, onActiveOwnersChange]);

  async function handleRun() {
    if (phase === "running" || !niche.trim()) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("running");
    setError(null);
    setResult(null);
    setActiveIndex(0);

    // Drive the visible pipeline animation in parallel with the real request.
    const step = 750;
    for (let i = 1; i < stages.length; i++) {
      timers.current.push(
        setTimeout(() => setActiveIndex(i), i * step),
      );
    }

    try {
      const res = await runMission({ niche, brandVoice });
      // Ensure the animation has visibly progressed before revealing output.
      const minRun = stages.length * step;
      const reveal = () => {
        setResult(res);
        setActiveIndex(stages.length);
        setPhase("done");
        onMissionComplete?.();
      };
      timers.current.push(setTimeout(reveal, Math.max(0, minRun - 1200)));
    } catch (e) {
      timers.current.forEach(clearTimeout);
      setError(
        e instanceof Error
          ? e.message
          : "The crew could not complete the mission.",
      );
      setActiveIndex(-1);
      setPhase("error");
    }
  }

  const isRunning = phase === "running";

  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary opacity-15 blur-3xl"
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-wide text-foreground">
              {title}
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {subtitle}
            </p>
          </div>
        </div>

        {/* input + CTA */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRun();
            }}
            placeholder="e.g. minimalist digital planners"
            disabled={isRunning}
            className="flex-1 rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
          <button
            onClick={handleRun}
            disabled={isRunning || !niche.trim()}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-all",
              "bg-primary text-primary-foreground shadow-[0_0_28px_-6px_var(--primary)]",
              "hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                {runLabel}
              </>
            )}
          </button>
        </div>

        {/* pipeline */}
        <div className="mt-6">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Automation pipeline
          </div>
          <MissionPipeline
            stages={stages}
            activeIndex={activeIndex}
            done={phase === "done"}
          />
        </div>

        {/* error */}
        {phase === "error" && error ? (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Mission aborted</p>
              <p className="text-destructive/80">{error}</p>
            </div>
          </div>
        ) : null}

        {/* completion banner */}
        {phase === "done" ? (
          <div className="mt-5 flex animate-level-pop items-center gap-2 rounded-xl border border-success/40 bg-success/10 p-3 text-sm text-success">
            <Trophy className="h-4 w-4" />
            <span className="font-semibold">
              Mission complete — the crew earned XP and shipped a listing.
            </span>
          </div>
        ) : null}

        {/* result */}
        {result ? (
          <div className="mt-6">
            <ListingOutput result={result} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

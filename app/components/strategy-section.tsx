import { TrendingUp, Infinity as InfinityIcon, Crosshair } from "lucide-react";

function NicheList({
  title,
  icon: Icon,
  accent,
  items,
}: {
  title: string;
  icon: typeof TrendingUp;
  accent: string;
  items: string[];
}) {
  return (
    <div className="panel panel-hover p-5">
      <div className="mb-3 flex items-center gap-2">
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
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-foreground/90"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StrategySection({
  trendingNiches,
  evergreenNiches,
  primaryNiche,
  secondaryNiches,
  strategyNote,
}: {
  trendingNiches: string[];
  evergreenNiches: string[];
  primaryNiche: string;
  secondaryNiches: string[];
  strategyNote: string;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <NicheList
          title="Trending Now — Short-Term Wins"
          icon={TrendingUp}
          accent="#2EE6A6"
          items={trendingNiches}
        />
        <NicheList
          title="Long-Term Winners — Evergreen"
          icon={InfinityIcon}
          accent="#A855F7"
          items={evergreenNiches}
        />
      </div>

      <div className="panel relative overflow-hidden p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent opacity-15 blur-3xl"
        />
        <div className="relative flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <Crosshair className="h-4 w-4" />
          </span>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
            Final Product Strategy
          </h3>
        </div>

        <div className="relative mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Primary niche
            </div>
            <div className="mt-1 font-display font-bold text-foreground">
              {primaryNiche}
            </div>
          </div>
          {secondaryNiches.slice(0, 2).map((n, i) => (
            <div
              key={i}
              className="rounded-xl border border-secondary/30 bg-secondary/5 p-4"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                Secondary {i + 1}
              </div>
              <div className="mt-1 font-display font-bold text-foreground">
                {n}
              </div>
            </div>
          ))}
        </div>

        {strategyNote ? (
          <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
            {strategyNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  Gauge,
  Zap,
  Flame,
  PackageCheck,
  Rocket,
  Users,
} from "lucide-react";
import {
  useConfigurables,
  defaultConfigurablesData,
} from "~/modules/configurables";
import { BrandMark } from "~/components/brand-mark";
import { StatTile } from "~/components/stat-tile";
import { CrewCard } from "~/components/crew-card";
import { MissionConsole } from "~/components/mission-console";
import { StrategySection } from "~/components/strategy-section";
import {
  fleetLevel,
  totalXp,
  bestStreak,
  type CrewMember,
} from "~/features/crew/crew";

export default function IndexPage() {
  const { config, loading } = useConfigurables();
  const d = defaultConfigurablesData;

  // Resolve every owner-facing value through config, with safe fallbacks.
  const appName = config?.appName ?? d.appName;
  const logoUrl = config?.logoUrl ?? d.logoUrl;
  const tagline = config?.tagline ?? d.tagline;
  const heroTitle = config?.heroTitle ?? d.heroTitle;
  const heroSubtitle = config?.heroSubtitle ?? d.heroSubtitle;
  const missionTitle = config?.missionConsoleTitle ?? d.missionConsoleTitle;
  const missionSubtitle =
    config?.missionConsoleSubtitle ?? d.missionConsoleSubtitle;
  const runLabel = config?.runMissionLabel ?? d.runMissionLabel;
  const defaultNiche = config?.defaultNichePrompt ?? d.defaultNichePrompt;
  const brandVoice = config?.brandVoice ?? d.brandVoice;

  const showStrategy = config?.showStrategySection ?? d.showStrategySection;
  const showCrew = config?.showCrewSection ?? d.showCrewSection;
  const showMetrics = config?.showMetrics ?? d.showMetrics;

  const crew: CrewMember[] = (
    config?.crew && config.crew.length ? config.crew : d.crew
  ) as CrewMember[];

  const captain = crew.find((m) => m.isCaptain) ?? crew[0];

  // Gamification: track active (powering-up) crew + completed missions.
  const [activeOwners, setActiveOwners] = useState<string[]>([]);
  const [missionsRun, setMissionsRun] = useState(0);
  const [listingsCreated, setListingsCreated] = useState(0);

  const metrics = useMemo(
    () => ({
      fleet: fleetLevel(crew),
      xp: totalXp(crew) + missionsRun * 120,
      streak: bestStreak(crew),
    }),
    [crew, missionsRun],
  );

  return (
    <div className="starfield relative min-h-screen">
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandMark logoUrl={logoUrl} appName={appName} size={44} />
            <div>
              <h1 className="font-display text-lg font-extrabold tracking-wide text-foreground sm:text-xl">
                {loading ? "Loading…" : appName}
              </h1>
              {tagline ? (
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  {tagline}
                </p>
              ) : null}
            </div>
          </div>
          {captain ? (
            <div className="hidden items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {captain.name}
                </span>{" "}
                · on the bridge
              </span>
            </div>
          ) : null}
        </header>

        <div className="hairline my-6" />

        {/* Hero */}
        <section className="animate-rise-in py-2 text-center sm:py-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-widest text-secondary">
            <Rocket className="h-3.5 w-3.5" /> AI-Crew Etsy Engine
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground neon-text sm:text-5xl">
            {heroTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {heroSubtitle}
          </p>
        </section>

        {/* Metrics */}
        {showMetrics ? (
          <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatTile
              label="Fleet Rank"
              value={metrics.fleet}
              icon={Gauge}
              accent="#22E0FF"
              hint="Combined crew levels"
            />
            <StatTile
              label="Total XP"
              value={metrics.xp.toLocaleString()}
              icon={Zap}
              accent="#A855F7"
            />
            <StatTile
              label="Best Streak"
              value={metrics.streak}
              icon={Flame}
              accent="#FFB627"
            />
            <StatTile
              label="Missions Run"
              value={missionsRun}
              icon={Rocket}
              accent="#2EE6A6"
            />
            <StatTile
              label="Listings"
              value={listingsCreated}
              icon={PackageCheck}
              accent="#FF8A3D"
              className="col-span-2 sm:col-span-1"
            />
          </section>
        ) : null}

        {/* Mission console (core day-one feature) */}
        <div className="mt-6">
          <MissionConsole
            crew={crew}
            title={missionTitle}
            subtitle={missionSubtitle}
            runLabel={runLabel}
            defaultNiche={defaultNiche}
            brandVoice={brandVoice}
            onActiveOwnersChange={setActiveOwners}
            onMissionComplete={() => {
              setMissionsRun((n) => n + 1);
              setListingsCreated((n) => n + 1);
            }}
          />
        </div>

        {/* Crew grid */}
        {showCrew ? (
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold tracking-wide text-foreground">
                The Crew
              </h3>
              <span className="text-xs text-muted-foreground">
                {crew.length} agents on deck
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {crew.map((member) => (
                <CrewCard
                  key={member.name}
                  member={member}
                  active={activeOwners.includes(member.name)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Etsy strategy */}
        {showStrategy ? (
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold tracking-wide text-foreground">
                Etsy Business Strategy
              </h3>
            </div>
            <StrategySection
              trendingNiches={config?.trendingNiches ?? d.trendingNiches}
              evergreenNiches={config?.evergreenNiches ?? d.evergreenNiches}
              primaryNiche={config?.primaryNiche ?? d.primaryNiche}
              secondaryNiches={config?.secondaryNiches ?? d.secondaryNiches}
              strategyNote={config?.strategyNote ?? d.strategyNote}
            />
          </section>
        ) : null}

        <footer className="mt-14 text-center text-xs text-muted-foreground">
          {appName} · autonomous Etsy crew · powered up and standing by
        </footer>
      </div>
    </div>
  );
}

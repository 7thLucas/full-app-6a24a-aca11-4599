import { useState } from "react";
import {
  Check,
  Copy,
  Tag,
  DollarSign,
  Sparkles,
  Megaphone,
  Target,
} from "lucide-react";
import type { MissionResult } from "~/features/mission/mission.types";

const competitionColor: Record<string, string> = {
  low: "#2EE6A6",
  medium: "#FFB627",
  high: "#FF5C7A",
};

export function ListingOutput({ result }: { result: MissionResult }) {
  const { intel, listing } = result;
  const [copied, setCopied] = useState(false);

  function copyAll() {
    const text = [
      `TITLE: ${listing.title}`,
      `PRICE: $${listing.suggestedPriceUsd}`,
      `TYPE: ${listing.productType}`,
      `TAGS: ${listing.tags.join(", ")}`,
      "",
      listing.description,
    ].join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const compColor = competitionColor[intel.competition] ?? "#FFB627";

  return (
    <div className="animate-rise-in space-y-4">
      {/* Intel banner */}
      <div className="panel relative overflow-hidden p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-primary">
            <Target className="h-3.5 w-3.5" /> Market Intel
          </span>
          <span
            className="rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{
              color: compColor,
              background: `${compColor}1a`,
              border: `1px solid ${compColor}55`,
            }}
          >
            {intel.competition} competition
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-foreground">
          {intel.niche}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {intel.whyTrending}
        </p>
        <p className="mt-2 text-xs text-muted-foreground/80">
          <span className="font-semibold text-foreground/80">Audience:</span>{" "}
          {intel.audience}
        </p>
      </div>

      {/* Listing */}
      <div className="panel relative overflow-hidden p-5 sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--secondary)" }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/15 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-secondary">
            <Sparkles className="h-3.5 w-3.5" /> Publish-ready listing
          </span>
          <button
            onClick={copyAll}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>

        <h2 className="relative mt-3 font-display text-xl font-extrabold leading-snug text-foreground">
          {listing.title}
        </h2>

        <div className="relative mt-3 flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5 font-display font-bold text-accent">
            <DollarSign className="h-4 w-4" />
            {listing.suggestedPriceUsd}
          </span>
          <span className="text-muted-foreground">{listing.productType}</span>
        </div>

        {/* tags */}
        <div className="relative mt-4">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <Tag className="h-3.5 w-3.5" /> SEO Tags ({listing.tags.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* description */}
        <div className="relative mt-4">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Description
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            {listing.description}
          </p>
        </div>

        {/* what you get */}
        {listing.bullets?.length ? (
          <div className="relative mt-4">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              What you get
            </div>
            <ul className="space-y-1.5">
              {listing.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* marketing angle */}
        {listing.marketingAngle ? (
          <div className="relative mt-4 flex gap-2 rounded-xl border border-border bg-muted/50 p-3">
            <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground/80">
                Growth angle:
              </span>{" "}
              {listing.marketingAngle}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

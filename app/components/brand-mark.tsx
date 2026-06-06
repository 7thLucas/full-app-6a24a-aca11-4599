import { Rocket } from "lucide-react";

/**
 * BrandMark — renders the configurable logo if a real URL is set, otherwise a
 * neon fallback emblem. Never hardcodes the app name text.
 */
export function BrandMark({
  logoUrl,
  appName,
  size = 40,
}: {
  logoUrl?: string;
  appName?: string;
  size?: number;
}) {
  const hasLogo =
    typeof logoUrl === "string" &&
    logoUrl.length > 0 &&
    !logoUrl.startsWith("FILL_");

  if (hasLogo) {
    return (
      <img
        src={logoUrl}
        alt={appName ? `${appName} logo` : "logo"}
        width={size}
        height={size}
        className="rounded-xl object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="relative grid place-items-center rounded-xl"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, rgba(34,224,255,0.22), rgba(168,85,247,0.22))",
        boxShadow: "0 0 24px rgba(34,224,255,0.35)",
        border: "1px solid rgba(34,224,255,0.4)",
      }}
    >
      <Rocket
        className="text-primary"
        style={{ width: size * 0.52, height: size * 0.52 }}
      />
    </div>
  );
}

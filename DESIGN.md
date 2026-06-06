# AstroFur Syndicate — Design Guidelines

## Aesthetic Direction
A "spaceship bridge meets game HUD" — a dark, deep-space cockpit dashboard with neon glow accents. Think a hybrid of a sci-fi game UI and a clean SaaS analytics dashboard. Premium, energetic, never cluttered. Every panel feels like a console on a living ship.

## Color Palette
- **Base / void:** very dark navy-to-black gradient backgrounds (e.g. #07091A, #0B1026, #11152E) for the deep-space feel.
- **Surface panels:** slightly lifted dark slate with subtle borders (#161B3A) and faint inner glow.
- **Primary neon accent:** electric cyan / aqua (#22E0FF) — primary actions, active states, the "powered up" energy.
- **Secondary accent:** vivid magenta / violet (#A855F7 → #E044FF) for highlights, XP, and gamified elements.
- **Tertiary accent:** warm amber / gold (#FFB627) for rewards, levels, and revenue/money metrics.
- **Status:** success green (#2EE6A6), warning amber, danger rose (#FF5C7A).
- **Per-agent glow colors:** each of the 7 crew members gets a distinct signature glow (e.g. cyan, violet, emerald, amber, rose, blue, orange) used in their card aura, avatar ring, and active state.

## Typography
- **Display / headings:** a geometric, slightly futuristic sans (e.g. Orbitron / Space Grotesk feel) for crew names, mission titles, big numbers. Tight tracking, confident weight.
- **Body / UI:** a clean, highly legible sans (Inter / system) for descriptions, labels, data.
- Use large, glowing numeric readouts for XP, levels, and metrics (HUD-style).

## Elevation, Glow & Depth
- Panels use soft outer glow + subtle border instead of heavy drop shadows.
- Active / working agents get an animated pulsing aura in their signature glow color.
- Use thin neon hairlines, gradient borders, and faint grid / starfield texture in backgrounds for the cockpit feel.
- Glassy / frosted surfaces over the dark void where layering is needed.

## Components
- **Agent (crew) cards:** avatar with glowing ring in signature color, name + species + role, XP bar, level badge, streak indicator, active/idle state with aura.
- **Mission console:** prominent "Run Mission" CTA that triggers the visible pipeline; pipeline shown as connected stages, each lighting up as its owning agent works.
- **Pipeline / flow view:** horizontal or node-based stages (Research → Idea → Design → Listing → Publish → Marketing → Engage → Feedback) that animate progress.
- **Generated listing output:** card showing title, tags (chips), description, suggested price — clearly the "product" of a mission.
- **Performance dashboard:** HUD stat tiles (crew level, total XP, missions run, listings created, revenue) with glowing numbers and trend sparklines.
- **XP / leveling:** progress bars with neon fill, level-up celebration moments, streak flames.
- Buttons: filled neon for primary, ghost/outline-glow for secondary. Generous rounded corners (game-UI feel) but consistent.

## Motion
- Subtle, purposeful: aura pulses on active agents, pipeline stages illuminate in sequence, XP bars fill smoothly, level-up flourishes. Never distracting from the data.

## Layout & Density
- Dashboard-first: a primary command view with the crew grid, mission console, and key metrics visible together.
- Responsive; comfortable spacing; the void background keeps it from feeling busy despite rich neon accents.

import { COLOR_COMBOS } from "./colors";
import { createDefaultProject, defaultBorder, defaultColors, defaultParticles, makeAnimation, uid } from "./defaults";
import { BUILTIN_PRESETS } from "./presets";
import type { AnimationType, BorderType, OverlayProject, ParticlePreset } from "./types";

const BORDERS: BorderType[] = [
  "classic-neon-tube",
  "double-line-neon",
  "broken-neon",
  "corner-bracket-neon",
  "circuit-traced",
  "electric-arc",
  "laser-edge",
  "neon-rope",
  "pulse-border",
  "glitch-border",
  "liquid-neon",
  "plasma-border",
];

const COMPAT: Record<BorderType, { anims: AnimationType[]; particles: ParticlePreset[] }> = {
  "classic-neon-tube": {
    anims: ["energy-chase", "breathing-glow", "neon-pulse", "audio-reactive-neon"],
    particles: ["sparks", "dust"],
  },
  "double-line-neon": {
    anims: ["dual-energy-chase", "breathing-glow", "holographic-shimmer"],
    particles: ["dust", "holographic"],
  },
  "broken-neon": {
    anims: ["electric-flicker", "neon-spark", "neon-pulse", "audio-reactive-neon"],
    particles: ["sparks", "electric"],
  },
  "corner-bracket-neon": {
    anims: ["energy-chase", "scanline-sweep", "breathing-glow"],
    particles: ["dust", "rgb-pixels"],
  },
  "circuit-traced": {
    anims: ["energy-chase", "neon-spark", "scanline-sweep"],
    particles: ["electric", "rgb-pixels"],
  },
  "electric-arc": {
    anims: ["lightning-crawl", "electric-flicker", "electric-arc-burst", "audio-reactive-neon"],
    particles: ["electric", "sparks"],
  },
  "laser-edge": {
    anims: ["scanline-sweep", "breathing-glow", "holographic-shimmer"],
    particles: ["dust", "holographic"],
  },
  "neon-rope": {
    anims: ["plasma-flow", "dual-energy-chase", "rgb-chromatic-shift"],
    particles: ["holographic", "plasma"],
  },
  "pulse-border": {
    anims: ["neon-pulse", "breathing-glow", "audio-reactive-neon"],
    particles: ["sparks", "paint"],
  },
  "glitch-border": {
    anims: ["glitch-flicker", "rgb-chromatic-shift", "strobe-flash"],
    particles: ["rgb-pixels", "electric"],
  },
  "liquid-neon": {
    anims: ["plasma-flow", "heat-haze", "neon-pulse"],
    particles: ["paint", "plasma"],
  },
  "plasma-border": {
    anims: ["plasma-flow", "neon-spark", "holographic-shimmer", "audio-reactive-neon"],
    particles: ["plasma", "holographic"],
  },
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function generateNeon(seedName?: string): OverlayProject {
  if (Math.random() < 0.28) {
    const preset = pick(BUILTIN_PRESETS);
    const p = createDefaultProject({
      ...preset.project,
      name: seedName ?? `${preset.name} Mix`,
      id: uid("prj"),
    });
    p.border.cornerRadius = 8 + Math.round(Math.random() * 48);
    p.border.animationSpeed = 0.6 + Math.random() * 1.2;
    return p;
  }

  const border = pick(BORDERS);
  const combo = pick(COLOR_COMBOS);
  const compat = COMPAT[border];
  const animCount = 2 + Math.floor(Math.random() * 3);
  const used = new Set<AnimationType>();
  const anims = [];
  while (anims.length < animCount && used.size < compat.anims.length) {
    const a = pick(compat.anims);
    if (used.has(a)) continue;
    used.add(a);
    anims.push(
      makeAnimation(a, {
        speed: 0.5 + Math.random() * 1.3,
        intensity: 0.45 + Math.random() * 0.5,
      }),
    );
  }
  if (Math.random() > 0.35 && !used.has("audio-reactive-neon")) {
    anims.push(makeAnimation("audio-reactive-neon", { intensity: 0.7 + Math.random() * 0.3 }));
  }
  const primary = combo.colors[0]!;
  const secondary = combo.colors[1] ?? combo.colors[0]!;
  const accent = combo.colors[2] ?? primary;

  return createDefaultProject({
    name: seedName ?? `${combo.name} ${border.replace(/-/g, " ")}`,
    border: defaultBorder({
      type: border,
      width: 2 + Math.random() * 3.5,
      cornerRadius: 4 + Math.round(Math.random() * 70),
      outerGlow: 0.45 + Math.random() * 0.5,
      animationSpeed: 0.55 + Math.random() * 1.1,
    }),
    colors: defaultColors({
      primary,
      secondary,
      accent,
      gradientStops: combo.colors.map((c, i) => ({
        offset: combo.colors.length === 1 ? 0 : i / (combo.colors.length - 1),
        color: c,
      })),
    }),
    animations: anims,
    particles: defaultParticles({
      preset: pick(compat.particles),
      color: primary,
      count: 40 + Math.round(Math.random() * 90),
      enabled: Math.random() > 0.15,
    }),
  });
}

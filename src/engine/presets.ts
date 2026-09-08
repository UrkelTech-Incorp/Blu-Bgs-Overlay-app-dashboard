import { COLOR_COMBOS } from "./colors";
import {
  createDefaultProject,
  defaultAudio,
  defaultBorder,
  defaultColors,
  defaultGlow,
  defaultParticles,
  makeAnimation,
} from "./defaults";
import type { BuiltinPreset, OverlayProject } from "./types";

function pack(
  id: string,
  name: string,
  category: string,
  description: string,
  project: OverlayProject,
): BuiltinPreset {
  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = project;
  void _id;
  void _c;
  void _u;
  return { id, name, category, description, project: rest };
}

export const BUILTIN_PRESETS: BuiltinPreset[] = [
  pack(
    "blu-cyberpunk",
    "BLU-BGS Cyberpunk",
    "Cyberpunk",
    "Electric cyan / magenta tube with dual chase and glitch bite.",
    createDefaultProject({
      name: "BLU-BGS Cyberpunk",
      border: defaultBorder({ type: "classic-neon-tube", width: 3.4, cornerRadius: 22 }),
      colors: defaultColors({
        primary: "#00FFFF",
        secondary: "#FF00FF",
        gradientStops: [
          { offset: 0, color: "#00FFFF" },
          { offset: 1, color: "#FF00FF" },
        ],
      }),
      animations: [
        makeAnimation("energy-chase", { speed: 1.1, intensity: 0.85 }),
        makeAnimation("breathing-glow", { speed: 0.55, intensity: 0.7 }),
        makeAnimation("glitch-flicker", { intensity: 0.35, frequency: 0.6 }),
        makeAnimation("audio-reactive-neon", { intensity: 0.9 }),
      ],
      particles: defaultParticles({ preset: "sparks", color: "#00FFFF" }),
    }),
  ),
  pack(
    "blu-synthwave",
    "BLU-BGS Synthwave",
    "Synthwave",
    "Violet dusk, pink horizon, slow holographic shimmer.",
    createDefaultProject({
      name: "BLU-BGS Synthwave",
      border: defaultBorder({ type: "double-line-neon", spacing: 12, cornerRadius: 8 }),
      colors: defaultColors({
        primary: "#8F00FF",
        secondary: "#FF1493",
        gradientStops: [
          { offset: 0, color: "#8F00FF" },
          { offset: 1, color: "#FF1493" },
        ],
      }),
      animations: [
        makeAnimation("dual-energy-chase", { speed: 0.7, intensity: 0.8 }),
        makeAnimation("holographic-shimmer", { intensity: 0.7 }),
        makeAnimation("breathing-glow", { speed: 0.4, intensity: 0.8 }),
      ],
      particles: defaultParticles({ preset: "holographic", color: "#FF1493", count: 60 }),
    }),
  ),
  pack(
    "blu-plasma",
    "BLU-BGS Plasma",
    "Plasma",
    "Turbulent purple-blue field crawling the edge.",
    createDefaultProject({
      name: "BLU-BGS Plasma",
      border: defaultBorder({ type: "plasma-border", turbulence: 0.7, plasmaSpeed: 0.9, intensity: 1 }),
      colors: defaultColors({
        primary: "#B026FF",
        secondary: "#008CFF",
        gradientStops: [
          { offset: 0, color: "#B026FF" },
          { offset: 1, color: "#008CFF" },
        ],
      }),
      glow: defaultGlow({ outerRadius: 52, outerOpacity: 0.42 }),
      animations: [
        makeAnimation("plasma-flow", { speed: 1.1, intensity: 0.9 }),
        makeAnimation("neon-spark", { intensity: 0.5 }),
        makeAnimation("audio-reactive-neon", { intensity: 0.8 }),
      ],
      particles: defaultParticles({ preset: "plasma", color: "#B026FF", count: 110 }),
    }),
  ),
  pack(
    "blu-electric",
    "BLU-BGS Electric",
    "Plasma",
    "Arc-driven border with crawl lightning and snare bursts.",
    createDefaultProject({
      name: "BLU-BGS Electric",
      border: defaultBorder({ type: "electric-arc", arcIntensity: 0.85, branchCount: 8, flicker: 0.55 }),
      colors: defaultColors({
        primary: "#00F5FF",
        secondary: "#FFFFFF",
        gradientEnabled: false,
      }),
      animations: [
        makeAnimation("lightning-crawl", { intensity: 0.9, speed: 1.3 }),
        makeAnimation("electric-flicker", { intensity: 0.6 }),
        makeAnimation("electric-arc-burst", { intensity: 0.75 }),
        makeAnimation("audio-reactive-neon", { intensity: 1 }),
      ],
      particles: defaultParticles({ preset: "electric", color: "#00F5FF", count: 90 }),
    }),
  ),
  pack(
    "blu-street",
    "BLU-BGS Street Luxury",
    "Street Luxury",
    "Ivory tube, bronze structure, cyan/pink jewelry lights.",
    createDefaultProject({
      name: "BLU-BGS Street Luxury",
      border: defaultBorder({ type: "classic-neon-tube", width: 3.8, cornerRadius: 18, outerGlow: 0.55 }),
      colors: defaultColors({
        primary: "#FFF4D6",
        secondary: "#C58B3A",
        accent: "#00FFFF",
        gradientStops: [
          { offset: 0, color: "#FFF4D6" },
          { offset: 0.55, color: "#C58B3A" },
          { offset: 1, color: "#00FFFF" },
        ],
      }),
      animations: [
        makeAnimation("energy-chase", { speed: 0.55, intensity: 0.6 }),
        makeAnimation("breathing-glow", { speed: 0.35, intensity: 0.55 }),
        makeAnimation("holographic-shimmer", { intensity: 0.25 }),
      ],
      particles: defaultParticles({ preset: "dust", color: "#C58B3A", count: 40, gravity: 4 }),
    }),
  ),
  pack(
    "blu-arctic",
    "BLU-BGS Arctic",
    "Arctic",
    "Ice-thin laser edge, glacial breath, white core.",
    createDefaultProject({
      name: "BLU-BGS Arctic",
      border: defaultBorder({ type: "laser-edge", thickness: 1.1, sharpness: 0.92, cornerRadius: 4 }),
      colors: defaultColors({
        primary: "#00FFFF",
        secondary: "#FFFFFF",
        accent: "#0066FF",
        gradientStops: [
          { offset: 0, color: "#00FFFF" },
          { offset: 1, color: "#FFFFFF" },
        ],
      }),
      animations: [
        makeAnimation("breathing-glow", { speed: 0.3, intensity: 0.7 }),
        makeAnimation("scanline-sweep", { speed: 0.45, intensity: 0.5 }),
        makeAnimation("holographic-shimmer", { intensity: 0.4 }),
      ],
      particles: defaultParticles({ preset: "dust", color: "#FFFFFF", count: 50, gravity: -6 }),
    }),
  ),
  pack(
    "blu-toxic",
    "BLU-BGS Toxic",
    "Toxic",
    "Acid green broken tube with yellow plasma drip.",
    createDefaultProject({
      name: "BLU-BGS Toxic",
      border: defaultBorder({ type: "broken-neon", segmentCount: 16, gapSize: 0.18, randomness: 0.4 }),
      colors: defaultColors({
        primary: "#39FF14",
        secondary: "#FFFF00",
        gradientStops: [
          { offset: 0, color: "#39FF14" },
          { offset: 1, color: "#FFFF00" },
        ],
      }),
      animations: [
        makeAnimation("electric-flicker", { intensity: 0.55 }),
        makeAnimation("neon-pulse", { speed: 0.8, intensity: 0.7 }),
        makeAnimation("neon-spark", { intensity: 0.6 }),
        makeAnimation("audio-reactive-neon", { intensity: 0.85 }),
      ],
      particles: defaultParticles({ preset: "plasma", color: "#7FFF00", count: 80 }),
    }),
  ),
  pack(
    "blu-fire",
    "BLU-BGS Fire",
    "Fire",
    "Liquid neon in red-orange-gold with ember particles.",
    createDefaultProject({
      name: "BLU-BGS Fire",
      border: defaultBorder({ type: "liquid-neon", flowSpeed: 1.1, morphAmount: 10, viscosity: 0.4 }),
      colors: defaultColors({
        primary: "#FF0033",
        secondary: "#FF6600",
        accent: "#FFFF00",
        gradientStops: [
          { offset: 0, color: "#FF0033" },
          { offset: 0.5, color: "#FF6600" },
          { offset: 1, color: "#FFFF00" },
        ],
      }),
      animations: [
        makeAnimation("plasma-flow", { speed: 1.2, intensity: 0.8 }),
        makeAnimation("heat-haze", { intensity: 0.7 }),
        makeAnimation("neon-pulse", { speed: 0.9, intensity: 0.65 }),
        makeAnimation("audio-reactive-neon", { intensity: 0.9 }),
      ],
      particles: defaultParticles({ preset: "embers", color: "#FF4500", count: 120, gravity: -18 }),
    }),
  ),
  pack(
    "blu-uv",
    "BLU-BGS Ultraviolet",
    "Ultraviolet",
    "Magenta / violet / blue rope with chromatic shift.",
    createDefaultProject({
      name: "BLU-BGS Ultraviolet",
      border: defaultBorder({ type: "neon-rope", strandCount: 4, twist: 3.2, thickness: 2.2 }),
      colors: defaultColors({
        primary: "#FF00FF",
        secondary: "#8F00FF",
        accent: "#0066FF",
        gradientStops: [
          { offset: 0, color: "#FF00FF" },
          { offset: 0.5, color: "#8F00FF" },
          { offset: 1, color: "#0066FF" },
        ],
      }),
      animations: [
        makeAnimation("rgb-chromatic-shift", { intensity: 0.55 }),
        makeAnimation("dual-energy-chase", { speed: 0.9, intensity: 0.7 }),
        makeAnimation("holographic-shimmer", { intensity: 0.6 }),
      ],
      particles: defaultParticles({ preset: "holographic", color: "#B026FF", count: 70 }),
    }),
  ),
  pack(
    "blu-circuit",
    "BLU-BGS Circuit",
    "Cyber Blue",
    "Traced board paths, traveling node, electric particles.",
    createDefaultProject({
      name: "BLU-BGS Circuit",
      border: defaultBorder({ type: "circuit-traced", traceDensity: 0.75, nodeCount: 18, branchProbability: 0.55 }),
      colors: defaultColors({
        primary: "#0066FF",
        secondary: "#00FFFF",
        gradientStops: [
          { offset: 0, color: "#0066FF" },
          { offset: 1, color: "#00FFFF" },
        ],
      }),
      animations: [
        makeAnimation("energy-chase", { speed: 0.8, intensity: 0.7 }),
        makeAnimation("neon-spark", { intensity: 0.45 }),
        makeAnimation("scanline-sweep", { speed: 0.3, intensity: 0.35 }),
      ],
      particles: defaultParticles({ preset: "electric", color: "#00BFFF", count: 55 }),
    }),
  ),
];

export const PRESET_CATEGORIES = [
  "Cyberpunk",
  "Synthwave",
  "Cyber Blue",
  "Toxic",
  "Plasma",
  "Fire",
  "Arctic",
  "Ultraviolet",
  "Street Luxury",
];

export function applyPreset(preset: BuiltinPreset): OverlayProject {
  return createDefaultProject({
    ...preset.project,
    name: preset.name,
    canvas: { ...preset.project.canvas },
  });
}

export function comboToColors(id: string) {
  return COLOR_COMBOS.find((c) => c.id === id);
}

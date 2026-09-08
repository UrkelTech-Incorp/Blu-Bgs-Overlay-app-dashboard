import type {
  AnimationConfig,
  AnimationType,
  AudioConfig,
  AudioMapping,
  BorderConfig,
  ColorConfig,
  GlowConfig,
  OverlayProject,
  ParticleConfig,
} from "./types";

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function defaultBorder(partial: Partial<BorderConfig> = {}): BorderConfig {
  return {
    type: "classic-neon-tube",
    width: 3.2,
    brightness: 1,
    coreBrightness: 1.15,
    outerGlow: 0.72,
    innerGlow: 0.85,
    blur: 8,
    cornerRadius: 28,
    opacity: 1,
    animationSpeed: 1,
    inset: 36,
    innerWidth: 2,
    outerWidth: 4,
    spacing: 10,
    innerBrightness: 1.2,
    outerBrightness: 0.7,
    segmentCount: 18,
    gapSize: 0.22,
    randomness: 0.35,
    cornerLength: 72,
    thickness: 3,
    traceDensity: 0.65,
    nodeCount: 14,
    nodeSize: 3.4,
    branchProbability: 0.45,
    arcIntensity: 0.7,
    branchCount: 6,
    flicker: 0.4,
    sharpness: 0.9,
    strandCount: 3,
    twist: 2.4,
    minThickness: 1.5,
    maxThickness: 7,
    pulseSpeed: 1,
    intensity: 0.8,
    easing: 0.5,
    rgbSeparation: 4,
    offsetAmount: 6,
    duplication: 2,
    glitchFrequency: 0.35,
    glitchDuration: 0.12,
    flickerIntensity: 0.55,
    flowSpeed: 0.8,
    distortion: 0.45,
    morphAmount: 8,
    viscosity: 0.55,
    turbulence: 0.5,
    plasmaSpeed: 0.7,
    particleDensity: 0.6,
    ...partial,
  };
}

export function defaultGlow(partial: Partial<GlowConfig> = {}): GlowConfig {
  return {
    coreWidth: 2,
    coreBrightness: 1,
    innerRadius: 8,
    innerOpacity: 0.8,
    outerRadius: 40,
    outerOpacity: 0.35,
    ...partial,
  };
}

export function defaultColors(partial: Partial<ColorConfig> = {}): ColorConfig {
  return {
    primary: "#00FFFF",
    secondary: "#FF00FF",
    accent: "#FFF4D6",
    gradientEnabled: true,
    gradientStops: [
      { offset: 0, color: "#00FFFF" },
      { offset: 1, color: "#FF00FF" },
    ],
    reverseGradient: false,
    animateGradient: true,
    gradientSpeed: 0.35,
    opacity: 1,
    saturation: 1,
    brightness: 1,
    colorReactive: true,
    ...partial,
  };
}

export function defaultParticles(partial: Partial<ParticleConfig> = {}): ParticleConfig {
  return {
    enabled: true,
    preset: "sparks",
    count: 80,
    size: 1.8,
    speed: 40,
    lifetime: 1.4,
    gravity: 12,
    turbulence: 0.4,
    direction: -90,
    glow: 0.7,
    opacity: 0.9,
    color: "#00FFFF",
    audioResponse: 0.65,
    maxParticles: 250,
    ...partial,
  };
}

export function makeAnimation(
  type: AnimationType,
  extra: Partial<AnimationConfig> = {},
): AnimationConfig {
  return {
    type,
    enabled: true,
    speed: 1,
    intensity: 0.75,
    frequency: 1,
    direction: 1,
    blendMode: "lighter",
    ...extra,
  };
}

export function defaultMappings(): AudioMapping[] {
  return [
    {
      id: "map-bass-thick",
      enabled: true,
      band: "bass",
      property: "borderThickness",
      min: 0,
      max: 1,
      smoothing: 0.45,
      curve: "ease-out",
    },
    {
      id: "map-bass-glow",
      enabled: true,
      band: "bass",
      property: "glow",
      min: 0,
      max: 1,
      smoothing: 0.4,
      curve: "linear",
    },
    {
      id: "map-mid-grad",
      enabled: true,
      band: "mids",
      property: "gradientMovement",
      min: 0,
      max: 1,
      smoothing: 0.35,
      curve: "linear",
    },
    {
      id: "map-treble-spark",
      enabled: true,
      band: "treble",
      property: "sparkProbability",
      min: 0,
      max: 1,
      smoothing: 0.2,
      curve: "exponential",
    },
    {
      id: "map-snare-flash",
      enabled: true,
      band: "snare",
      property: "flash",
      min: 0,
      max: 1,
      smoothing: 0.08,
      curve: "ease-out",
    },
    {
      id: "map-energy-part",
      enabled: true,
      band: "energy",
      property: "particleCount",
      min: 0,
      max: 1,
      smoothing: 0.5,
      curve: "linear",
    },
  ];
}

export function defaultAudio(partial: Partial<AudioConfig> = {}): AudioConfig {
  return {
    enabled: true,
    source: "demo",
    mappings: defaultMappings(),
    colorReactive: true,
    ...partial,
  };
}

export function createDefaultProject(partial: Partial<OverlayProject> = {}): OverlayProject {
  const now = Date.now();
  return {
    id: uid("prj"),
    name: "Untitled Overlay",
    version: "1.0",
    createdAt: now,
    updatedAt: now,
    canvas: { width: 1920, height: 1080, fps: 60 },
    border: defaultBorder(),
    colors: defaultColors(),
    glow: defaultGlow(),
    animations: [
      makeAnimation("energy-chase", { speed: 1, intensity: 0.8 }),
      makeAnimation("breathing-glow", { speed: 0.5, intensity: 0.7 }),
      makeAnimation("audio-reactive-neon", { intensity: 0.85 }),
    ],
    particles: defaultParticles(),
    audio: defaultAudio(),
    outputMode: "full-neon",
    quality: "high",
    ...partial,
  };
}

export const ALL_ANIMATION_TYPES: AnimationType[] = [
  "neon-pulse",
  "electric-flicker",
  "energy-chase",
  "dual-energy-chase",
  "plasma-flow",
  "neon-spark",
  "electric-arc-burst",
  "glitch-flicker",
  "scanline-sweep",
  "rgb-chromatic-shift",
  "breathing-glow",
  "strobe-flash",
  "particle-dissolve",
  "energy-build",
  "energy-collapse",
  "lightning-crawl",
  "holographic-shimmer",
  "magnetic-distortion",
  "heat-haze",
  "audio-reactive-neon",
];

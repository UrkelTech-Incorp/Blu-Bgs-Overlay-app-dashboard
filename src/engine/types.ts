export type ViewId =
  | "dashboard"
  | "designer"
  | "library"
  | "presets"
  | "audio"
  | "obs"
  | "settings";

export type BorderType =
  | "classic-neon-tube"
  | "double-line-neon"
  | "broken-neon"
  | "corner-bracket-neon"
  | "circuit-traced"
  | "electric-arc"
  | "laser-edge"
  | "neon-rope"
  | "pulse-border"
  | "glitch-border"
  | "liquid-neon"
  | "plasma-border";

export type AnimationType =
  | "neon-pulse"
  | "electric-flicker"
  | "energy-chase"
  | "dual-energy-chase"
  | "plasma-flow"
  | "neon-spark"
  | "electric-arc-burst"
  | "glitch-flicker"
  | "scanline-sweep"
  | "rgb-chromatic-shift"
  | "breathing-glow"
  | "strobe-flash"
  | "particle-dissolve"
  | "energy-build"
  | "energy-collapse"
  | "lightning-crawl"
  | "holographic-shimmer"
  | "magnetic-distortion"
  | "heat-haze"
  | "audio-reactive-neon";

export type ParticlePreset =
  | "sparks"
  | "dust"
  | "plasma"
  | "embers"
  | "electric"
  | "rgb-pixels"
  | "holographic"
  | "paint";

export type OutputMode =
  | "border-only"
  | "border-particles"
  | "full-neon"
  | "audio-reactive"
  | "cinematic"
  | "performance";

export type QualityPreset = "low" | "medium" | "high" | "ultra" | "custom";

export type AudioBand =
  | "bass"
  | "mids"
  | "treble"
  | "volume"
  | "energy"
  | "snare"
  | "vocals"
  | "drop";

export type MappableProperty =
  | "borderThickness"
  | "glow"
  | "particleSize"
  | "particleCount"
  | "brightness"
  | "scale"
  | "sparkProbability"
  | "gradientMovement"
  | "distortion"
  | "colorIntensity"
  | "flash";

export type CurveType = "linear" | "ease-in" | "ease-out" | "exponential";

export type PreviewBackground = "checker" | "dark" | "black";

export type AudioSource = "mic" | "demo" | "none";

export interface AudioMapping {
  id: string;
  enabled: boolean;
  band: AudioBand;
  property: MappableProperty;
  min: number;
  max: number;
  smoothing: number;
  curve: CurveType;
}

export interface GradientStop {
  offset: number;
  color: string;
}

export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  gradientEnabled: boolean;
  gradientStops: GradientStop[];
  reverseGradient: boolean;
  animateGradient: boolean;
  gradientSpeed: number;
  opacity: number;
  saturation: number;
  brightness: number;
  colorReactive: boolean;
}

export interface GlowConfig {
  coreWidth: number;
  coreBrightness: number;
  innerRadius: number;
  innerOpacity: number;
  outerRadius: number;
  outerOpacity: number;
}

export interface BorderConfig {
  type: BorderType;
  width: number;
  brightness: number;
  coreBrightness: number;
  outerGlow: number;
  innerGlow: number;
  blur: number;
  cornerRadius: number;
  opacity: number;
  animationSpeed: number;
  inset: number;
  innerWidth: number;
  outerWidth: number;
  spacing: number;
  innerBrightness: number;
  outerBrightness: number;
  segmentCount: number;
  gapSize: number;
  randomness: number;
  cornerLength: number;
  thickness: number;
  traceDensity: number;
  nodeCount: number;
  nodeSize: number;
  branchProbability: number;
  arcIntensity: number;
  branchCount: number;
  flicker: number;
  sharpness: number;
  strandCount: number;
  twist: number;
  minThickness: number;
  maxThickness: number;
  pulseSpeed: number;
  intensity: number;
  easing: number;
  rgbSeparation: number;
  offsetAmount: number;
  duplication: number;
  glitchFrequency: number;
  glitchDuration: number;
  flickerIntensity: number;
  flowSpeed: number;
  distortion: number;
  morphAmount: number;
  viscosity: number;
  turbulence: number;
  plasmaSpeed: number;
  particleDensity: number;
}

export interface AnimationConfig {
  type: AnimationType;
  enabled: boolean;
  speed: number;
  intensity: number;
  frequency: number;
  direction: 1 | -1;
  blendMode: "normal" | "lighter" | "screen" | "overlay";
}

export interface ParticleConfig {
  enabled: boolean;
  preset: ParticlePreset;
  count: number;
  size: number;
  speed: number;
  lifetime: number;
  gravity: number;
  turbulence: number;
  direction: number;
  glow: number;
  opacity: number;
  color: string;
  audioResponse: number;
  maxParticles: 25 | 50 | 100 | 250 | 500 | 1000;
}

export interface AudioConfig {
  enabled: boolean;
  source: AudioSource;
  mappings: AudioMapping[];
  colorReactive: boolean;
}

export interface OverlayProject {
  id: string;
  name: string;
  version: "1.0";
  createdAt: number;
  updatedAt: number;
  canvas: {
    width: number;
    height: number;
    fps: 30 | 60 | 120;
  };
  border: BorderConfig;
  colors: ColorConfig;
  glow: GlowConfig;
  animations: AnimationConfig[];
  particles: ParticleConfig;
  audio: AudioConfig;
  outputMode: OutputMode;
  quality: QualityPreset;
}

export interface SavedProjectMeta {
  id: string;
  name: string;
  updatedAt: number;
  resolution: string;
  thumbnail: string;
  favorite: boolean;
}

export interface AudioBands {
  bass: number;
  mids: number;
  treble: number;
  volume: number;
  energy: number;
  snare: number;
  vocals: number;
  drop: number;
}

export interface FrameTime {
  dt: number;
  elapsed: number;
}

export interface QualitySettings {
  glowPasses: number;
  maxParticles: number;
  pathSamples: number;
  extras: boolean;
  distortion: boolean;
  glowScale: number;
}

export interface NeonColor {
  name: string;
  hex: string;
  rgb: [number, number, number];
  family: "cyan" | "purple" | "pink" | "green" | "yellow" | "special";
}

export interface ColorCombo {
  id: string;
  name: string;
  colors: string[];
}

export interface BuiltinPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  project: Omit<OverlayProject, "id" | "createdAt" | "updatedAt">;
}

export interface FavoritesState {
  borders: BorderType[];
  animations: AnimationType[];
  colors: string[];
  combos: string[];
  presets: string[];
}

export interface PathSample {
  x: number;
  y: number;
  nx: number;
  ny: number;
  tx: number;
  ty: number;
  t: number;
}

export interface ParamSpec {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  tooltip: string;
}

export interface BorderSpec {
  type: BorderType;
  name: string;
  number: string;
  description: string;
  params: ParamSpec[];
}

export interface AnimationSpec {
  type: AnimationType;
  name: string;
  number: string;
  description: string;
}

export const EMPTY_AUDIO: AudioBands = {
  bass: 0,
  mids: 0,
  treble: 0,
  volume: 0,
  energy: 0,
  snare: 0,
  vocals: 0,
  drop: 0,
};

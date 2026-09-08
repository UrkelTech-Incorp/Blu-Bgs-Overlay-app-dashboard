import type { OutputMode, QualityPreset, QualitySettings } from "./types";

export function qualitySettings(
  preset: QualityPreset,
  outputMode: OutputMode,
  adaptiveScale = 1,
): QualitySettings {
  const table: Record<QualityPreset, QualitySettings> = {
    low: { glowPasses: 2, maxParticles: 40, pathSamples: 90, extras: false, distortion: false, glowScale: 0.45 },
    medium: { glowPasses: 3, maxParticles: 120, pathSamples: 140, extras: true, distortion: false, glowScale: 0.7 },
    high: { glowPasses: 4, maxParticles: 280, pathSamples: 200, extras: true, distortion: true, glowScale: 1 },
    ultra: { glowPasses: 5, maxParticles: 600, pathSamples: 280, extras: true, distortion: true, glowScale: 1.2 },
    custom: { glowPasses: 4, maxParticles: 280, pathSamples: 200, extras: true, distortion: true, glowScale: 1 },
  };
  const base = { ...table[preset] };
  if (outputMode === "performance") {
    base.glowPasses = Math.min(base.glowPasses, 2);
    base.maxParticles = Math.min(base.maxParticles, 60);
    base.pathSamples = Math.min(base.pathSamples, 100);
    base.extras = false;
    base.distortion = false;
    base.glowScale *= 0.6;
  } else if (outputMode === "cinematic") {
    base.glowScale *= 0.85;
    base.maxParticles = Math.floor(base.maxParticles * 0.6);
  } else if (outputMode === "border-only") {
    base.maxParticles = 0;
    base.extras = false;
  }
  if (adaptiveScale < 1) {
    base.glowPasses = Math.max(2, Math.round(base.glowPasses * adaptiveScale));
    base.maxParticles = Math.floor(base.maxParticles * adaptiveScale);
    base.pathSamples = Math.max(64, Math.floor(base.pathSamples * adaptiveScale));
    if (adaptiveScale < 0.7) {
      base.extras = false;
      base.distortion = false;
    }
    base.glowScale *= 0.6 + 0.4 * adaptiveScale;
  }
  return base;
}

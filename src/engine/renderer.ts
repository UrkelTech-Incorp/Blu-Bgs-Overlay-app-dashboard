import { adjustHex, hexToRgba, hexToRgb, hslToHex, mixHex } from "./colors";
import { fbm, hash, lerp, noise1 } from "./noise";
import { insetRect, pointOnSamples, sampleRoundedRect, type Rect } from "./path";
import { ParticleEngine } from "./particles";
import { qualitySettings } from "./quality";
import type {
  AnimationConfig,
  AudioBands,
  FrameTime,
  OverlayProject,
  PathSample,
  QualitySettings,
} from "./types";

export interface MappedVisuals {
  thickness: number;
  glow: number;
  brightness: number;
  scale: number;
  spark: number;
  gradient: number;
  distortion: number;
  color: number;
  flash: number;
  particles: number;
}

export interface PerfStats {
  fps: number;
  frameMs: number;
  renderMs: number;
  audioMs: number;
  particles: number;
}

interface AnimState {
  brightness: number;
  glow: number;
  thickness: number;
  opacity: number;
  chase: number[];
  flicker: number;
  hue: number;
  scan: number;
  rgb: number;
  morph: number;
  spark: number;
  burst: number;
  dissolve: number;
  haze: number;
  rainbow: number;
  flash: number;
  build: number;
}

const IDENTITY_ANIM: AnimState = {
  brightness: 1,
  glow: 1,
  thickness: 1,
  opacity: 1,
  chase: [],
  flicker: 1,
  hue: 0,
  scan: -1,
  rgb: 0,
  morph: 0,
  spark: 0,
  burst: 0,
  dissolve: 0,
  haze: 0,
  rainbow: 0,
  flash: 0,
  build: 1,
};

function applyAudioMaps(project: OverlayProject, audio: AudioBands): MappedVisuals {
  const mapped: MappedVisuals = {
    thickness: 0,
    glow: 0,
    brightness: 0,
    scale: 0,
    spark: 0,
    gradient: 0,
    distortion: 0,
    color: 0,
    flash: 0,
    particles: 0,
  };
  if (!project.audio.enabled) return mapped;
  for (const m of project.audio.mappings) {
    if (!m.enabled) continue;
    const raw = audio[m.band] ?? 0;
    const t = m.curve === "ease-in" ? raw * raw : m.curve === "ease-out" ? 1 - (1 - raw) * (1 - raw) : m.curve === "exponential" ? raw ** 1.8 : raw;
    const v = lerp(m.min, m.max, t);
    if (m.property === "borderThickness") mapped.thickness = Math.max(mapped.thickness, v);
    else if (m.property === "glow") mapped.glow = Math.max(mapped.glow, v);
    else if (m.property === "brightness") mapped.brightness = Math.max(mapped.brightness, v);
    else if (m.property === "scale") mapped.scale = Math.max(mapped.scale, v);
    else if (m.property === "sparkProbability") mapped.spark = Math.max(mapped.spark, v);
    else if (m.property === "gradientMovement") mapped.gradient = Math.max(mapped.gradient, v);
    else if (m.property === "distortion") mapped.distortion = Math.max(mapped.distortion, v);
    else if (m.property === "colorIntensity") mapped.color = Math.max(mapped.color, v);
    else if (m.property === "flash") mapped.flash = Math.max(mapped.flash, v);
    else if (m.property === "particleSize" || m.property === "particleCount") mapped.particles = Math.max(mapped.particles, v);
  }
  return mapped;
}

function applyAnimations(
  anims: AnimationConfig[],
  time: FrameTime,
  audio: AudioBands,
  speedMul: number,
): AnimState {
  const s: AnimState = { ...IDENTITY_ANIM, chase: [] };
  for (const a of anims) {
    if (!a.enabled) continue;
    const spd = a.speed * speedMul;
    const k = a.intensity;
    const t = time.elapsed * spd;
    switch (a.type) {
      case "neon-pulse": {
        const w = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 0.35 * a.frequency);
        s.brightness *= lerp(0.75, 1.45, w * k);
        break;
      }
      case "electric-flicker": {
        const n = noise1(t * 18 * a.frequency + 3);
        const spike = n > 0.86 ? 0.35 + hash(Math.floor(t * 40)) * 0.4 : 1;
        s.flicker *= lerp(1, spike, k);
        s.brightness *= lerp(1, spike, k * 0.5);
        break;
      }
      case "energy-chase":
        s.chase.push((((t * 0.22 * a.direction) % 1) + 1) % 1);
        break;
      case "dual-energy-chase":
        s.chase.push((((t * 0.2) % 1) + 1) % 1);
        s.chase.push((((-t * 0.2 * a.direction) % 1) + 1) % 1);
        break;
      case "plasma-flow":
        s.hue += Math.sin(t * 0.7) * 28 * k;
        s.rainbow = Math.max(s.rainbow, 0.25 * k);
        break;
      case "neon-spark":
        s.spark = Math.max(s.spark, k * (0.2 + audio.treble * 0.8));
        break;
      case "electric-arc-burst":
        s.burst = Math.max(s.burst, k * (0.15 + audio.snare * 0.9 + (noise1(t * 4) > 0.82 ? 0.7 : 0)));
        break;
      case "glitch-flicker":
        s.rgb = Math.max(s.rgb, k * (noise1(t * 9) > 0.78 ? 1 : 0.15));
        s.flicker *= lerp(1, 0.55 + hash(Math.floor(t * 24)) * 0.45, k * (s.rgb > 0.4 ? 1 : 0.2));
        break;
      case "scanline-sweep":
        s.scan = (((t * 0.18 * a.direction) % 1) + 1) % 1;
        break;
      case "rgb-chromatic-shift":
        s.rgb = Math.max(s.rgb, 0.35 * k + 0.4 * k * Math.abs(Math.sin(t)));
        s.hue += Math.sin(t * 0.5) * 18 * k;
        break;
      case "breathing-glow":
        s.glow *= lerp(0.72, 1.45, (0.5 + 0.5 * Math.sin(t * 1.1)) * k);
        break;
      case "strobe-flash": {
        const beat = (t * a.frequency) % 1;
        s.flash = Math.max(s.flash, beat < 0.06 ? k : 0);
        break;
      }
      case "particle-dissolve":
        s.dissolve = Math.max(s.dissolve, (0.5 + 0.5 * Math.sin(t * 0.8)) * k);
        s.opacity *= lerp(1, 0.35, s.dissolve);
        break;
      case "energy-build":
        s.build = (0.5 + 0.5 * Math.sin(t * 0.55 - Math.PI / 2));
        s.opacity *= lerp(0.08, 1, s.build * k + (1 - k));
        s.brightness *= lerp(0.4, 1.3, s.build);
        break;
      case "energy-collapse":
        s.build = (0.5 + 0.5 * Math.cos(t * 0.55));
        s.opacity *= lerp(0.05, 1, s.build);
        s.flicker *= lerp(0.4, 1, s.build);
        break;
      case "lightning-crawl":
        s.burst = Math.max(s.burst, 0.55 * k);
        s.spark = Math.max(s.spark, 0.4 * k);
        break;
      case "holographic-shimmer":
        s.rainbow = Math.max(s.rainbow, k);
        s.hue += t * 40 * k;
        break;
      case "magnetic-distortion":
        s.morph += Math.sin(t * 1.4) * 6 * k;
        break;
      case "heat-haze":
        s.haze = Math.max(s.haze, k);
        s.morph += Math.sin(t * 3.2) * 3 * k;
        break;
      case "audio-reactive-neon":
        s.thickness *= 1 + audio.bass * 0.7 * k;
        s.brightness *= 1 + audio.mids * 0.45 * k;
        s.spark = Math.max(s.spark, audio.treble * k);
        s.glow *= 1 + audio.energy * 0.35 * k;
        break;
      default:
        break;
    }
  }
  return s;
}

function reactiveColor(base: string, audio: AudioBands, enabled: boolean): string {
  if (!enabled) return base;
  let c = base;
  c = mixHex(c, "#FF1493", audio.bass * 0.35);
  c = mixHex(c, "#FF4500", audio.snare * 0.55);
  c = mixHex(c, "#00FF9D", audio.mids * 0.25);
  if (audio.drop > 0.4) {
    const h = (audio.drop * 360 + audio.energy * 80) % 360;
    c = mixHex(c, hslToHex(h, 1, 0.55), audio.drop * 0.7);
  }
  return c;
}

export class OverlayRenderer {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly particles = new ParticleEngine();
  stats: PerfStats = { fps: 60, frameMs: 16, renderMs: 0, audioMs: 0, particles: 0 };
  private fpsEma = 60;
  adaptive = 1;
  private lowFpsMs = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) throw new Error("Canvas 2D unavailable");
    this.ctx = ctx;
  }

  resize(cssW: number, cssH: number, dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)): void {
    const w = Math.max(1, Math.round(cssW * dpr));
    const h = Math.max(1, Math.round(cssH * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  render(project: OverlayProject, time: FrameTime, audio: AudioBands, audioMs = 0): void {
    const t0 = performance.now();
    const ctx = this.ctx;
    const w = this.canvas.clientWidth || project.canvas.width;
    const h = this.canvas.clientHeight || project.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    const q = qualitySettings(project.quality, project.outputMode, this.adaptive);
    const mapped = applyAudioMaps(project, audio);
    const anim = applyAnimations(project.animations, time, audio, project.border.animationSpeed);
    const scale = 1 + mapped.scale * 0.08;
    const inset = project.border.inset;
    const rect: Rect = {
      x: inset,
      y: inset,
      w: w - inset * 2,
      h: h - inset * 2,
      r: project.border.cornerRadius,
    };
    const cx = w / 2;
    const cy = h / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);

    const samples = this.buildSamples(rect, project, anim, mapped, time, q);
    const primary = this.resolveColor(project, audio, time, mapped, anim);

    this.drawBorder(project, samples, rect, primary, anim, mapped, time, q, audio);

    const showParticles =
      project.particles.enabled &&
      project.outputMode !== "border-only" &&
      project.outputMode !== "performance";
    if (showParticles || anim.dissolve > 0.05) {
      const pcfg = {
        ...project.particles,
        color: project.particles.color === "#00FFFF" ? primary : project.particles.color,
        count: Math.round(project.particles.count * (1 + mapped.particles)),
        size: project.particles.size * (1 + mapped.particles * 0.6),
      };
      const cap = Math.min(q.maxParticles, project.particles.maxParticles);
      this.particles.update(time.dt, samples, pcfg, audio, cap, {
        spark: Math.max(anim.spark, mapped.spark),
        burst: anim.burst + mapped.flash + audio.drop * 0.8,
        dissolve: anim.dissolve,
      });
      this.particles.draw(ctx, pcfg);
    } else {
      this.particles.reset();
    }

    if (q.extras && anim.scan >= 0) this.drawScanline(w, h, anim.scan, primary);
    if (anim.flash + mapped.flash > 0.02) {
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = hexToRgba("#FFFFFF", Math.min(0.55, (anim.flash + mapped.flash) * 0.45));
      ctx.fillRect(0, 0, w, h);
    }
    if (audio.drop > 0.7 && project.colors.colorReactive && project.audio.enabled) {
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.6);
      g.addColorStop(0, hexToRgba(hslToHex((time.elapsed * 120) % 360, 1, 0.6), audio.drop * 0.22));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.restore();
    const renderMs = performance.now() - t0;
    const frameMs = time.dt * 1000;
    const fpsInst = time.dt > 0 ? 1 / time.dt : 60;
    this.fpsEma = this.fpsEma * 0.9 + fpsInst * 0.1;
    this.stats = {
      fps: this.fpsEma,
      frameMs,
      renderMs,
      audioMs,
      particles: this.particles.count(),
    };
    if (this.fpsEma < 42) this.lowFpsMs += frameMs;
    else this.lowFpsMs = Math.max(0, this.lowFpsMs - frameMs * 2);
    if (this.lowFpsMs > 1500) this.adaptive = Math.max(0.45, this.adaptive - 0.08);
    else if (this.fpsEma > 55) this.adaptive = Math.min(1, this.adaptive + 0.01);
    void q;
    void renderMs;
  }

  private resolveColor(
    project: OverlayProject,
    audio: AudioBands,
    time: FrameTime,
    mapped: MappedVisuals,
    anim: AnimState,
  ): string {
    let c = adjustHex(project.colors.primary, project.colors.saturation, project.colors.brightness * (1 + mapped.brightness * 0.4));
    if (project.colors.gradientEnabled) {
      const stops = project.colors.reverseGradient
        ? [...project.colors.gradientStops].reverse()
        : project.colors.gradientStops;
      const shift = project.colors.animateGradient
        ? (time.elapsed * project.colors.gradientSpeed + mapped.gradient) % 1
        : mapped.gradient;
      const u = (shift + 0.5) % 1;
      if (stops.length >= 2) {
        c = mixHex(stops[0].color, stops[stops.length - 1].color, 0.5 + 0.5 * Math.sin(u * Math.PI * 2));
        c = adjustHex(c, project.colors.saturation, project.colors.brightness);
      }
    }
    c = reactiveColor(c, audio, project.audio.enabled && (project.colors.colorReactive || project.audio.colorReactive));
    if (anim.hue) {
      const [r, g, b] = hexToRgb(c);
      const avg = (r + g + b) / 3;
      const ang = (anim.hue * Math.PI) / 180;
      const nr = avg + (r - avg) * Math.cos(ang) - (b - avg) * Math.sin(ang);
      const nb = avg + (b - avg) * Math.cos(ang) + (r - avg) * Math.sin(ang);
      c = mixHex(c, `rgb(${nr},${g},${nb})`, 0.5);
    }
    return c;
  }

  private buildSamples(
    rect: Rect,
    project: OverlayProject,
    anim: AnimState,
    mapped: MappedVisuals,
    time: FrameTime,
    q: QualitySettings,
  ): PathSample[] {
    const samples = sampleRoundedRect(rect, q.pathSamples);
    const morph = anim.morph + mapped.distortion * 10 + (project.border.type === "liquid-neon" ? project.border.morphAmount : 0);
    const turb = project.border.type === "liquid-neon" || project.border.type === "plasma-border" ? project.border.turbulence : 0;
    if (!q.distortion || (morph === 0 && turb === 0 && anim.haze === 0)) return samples;
    const visc = project.border.viscosity || 0.5;
    const flow = time.elapsed * (project.border.flowSpeed || project.border.plasmaSpeed || 0.6);
    return samples.map((s) => {
      const n = (fbm(s.t * 6 + flow, time.elapsed * 0.3) - 0.5) * morph;
      const h = anim.haze * Math.sin(s.t * 40 + time.elapsed * 8) * 2.5;
      const mag = (n + h) * (0.4 + visc * 0.6) * (1 + turb);
      return { ...s, x: s.x + s.nx * mag, y: s.y + s.ny * mag };
    });
  }

  private drawBorder(
    project: OverlayProject,
    samples: PathSample[],
    rect: Rect,
    color: string,
    anim: AnimState,
    mapped: MappedVisuals,
    time: FrameTime,
    q: QualitySettings,
    audio: AudioBands,
  ): void {
    const ctx = this.ctx;
    const b = project.border;
    const g = project.glow;
    const thick = (b.width + mapped.thickness * 5) * anim.thickness;
    const glowMul = (b.outerGlow + mapped.glow) * anim.glow * q.glowScale;
    const alpha = b.opacity * project.colors.opacity * anim.opacity * anim.flicker;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const type = b.type;
    if (type === "double-line-neon") {
      this.strokeSamples(samples, color, b.outerWidth, g, glowMul * b.outerBrightness, q, anim);
      const inner = sampleRoundedRect(insetRect(rect, b.spacing), q.pathSamples);
      this.strokeSamples(inner, mixHex(color, "#FFFFFF", 0.15), b.innerWidth, g, glowMul * b.innerBrightness, q, anim);
    } else if (type === "broken-neon") {
      this.strokeBroken(samples, color, thick, g, glowMul, q, anim, b, time);
    } else if (type === "corner-bracket-neon") {
      this.strokeCorners(rect, color, b.thickness || thick, g, glowMul, q, anim, b);
    } else if (type === "circuit-traced") {
      this.strokeCircuit(samples, rect, color, thick, g, glowMul, q, anim, b, time);
    } else if (type === "electric-arc") {
      this.strokeArcs(samples, color, b, glowMul, q, anim, time);
    } else if (type === "laser-edge") {
      const sharp = b.sharpness;
      this.strokeSamples(samples, color, b.thickness || 1.1, { ...g, outerRadius: g.outerRadius * (1.2 - sharp * 0.6), innerRadius: g.innerRadius * (0.5 + sharp * 0.5) }, glowMul * 0.8, q, anim);
    } else if (type === "neon-rope") {
      this.strokeRope(samples, color, b, g, glowMul, q, anim, time);
    } else if (type === "pulse-border") {
      const e = b.easing;
      const raw = 0.5 + 0.5 * Math.sin(time.elapsed * b.pulseSpeed * Math.PI * 2);
      const p = lerp(raw, raw * raw * (3 - 2 * raw), e);
      const tw = lerp(b.minThickness, b.maxThickness, p) * (1 + b.intensity * 0.2);
      this.strokeSamples(samples, color, tw, g, glowMul * (0.7 + p * 0.6), q, anim);
    } else if (type === "glitch-border") {
      this.strokeGlitch(samples, color, thick, g, glowMul, q, anim, b, time);
    } else if (type === "liquid-neon") {
      this.strokeSamples(samples, color, thick + 1.5, g, glowMul, q, anim);
      this.strokeRibbon(samples, mixHex(color, project.colors.secondary, 0.4), thick * 0.5, time, b);
    } else if (type === "plasma-border") {
      this.strokePlasma(samples, color, project.colors.secondary, b, glowMul, q, anim, time);
    } else {
      this.strokeSamples(samples, color, thick, g, glowMul, q, anim);
    }

    this.drawChases(samples, anim, color, thick);
    if (q.extras && (anim.burst > 0.2 || type === "electric-arc")) this.drawLightning(samples, color, anim, time, b.branchCount || 5);
    if (q.extras && anim.spark > 0.05) this.drawSparks(samples, color, anim, time);
    if (anim.rainbow > 0.05) this.drawHolo(samples, anim, thick);
    if (anim.rgb > 0.2) this.drawRgbGhost(samples, thick, anim);

    ctx.restore();
    void audio;
  }

  private strokeSamples(
    samples: PathSample[],
    color: string,
    width: number,
    glow: OverlayProject["glow"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
  ): void {
    const ctx = this.ctx;
    const path = this.pathFromSamples(samples);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const passes = q.glowPasses;
    for (let i = passes; i >= 1; i--) {
      const t = i / passes;
      const w = width + glow.outerRadius * glowMul * t * 0.55;
      const a = glow.outerOpacity * (0.08 + 0.18 * (1 - t)) * anim.brightness;
      ctx.strokeStyle = hexToRgba(color, a);
      ctx.lineWidth = w;
      ctx.stroke(path);
    }
    ctx.strokeStyle = hexToRgba(color, glow.innerOpacity * 0.85 * anim.brightness);
    ctx.lineWidth = width + glow.innerRadius * 0.35 * glowMul;
    ctx.stroke(path);
    ctx.strokeStyle = hexToRgba(mixHex(color, "#FFFFFF", 0.25), 0.95 * glow.coreBrightness * anim.brightness);
    ctx.lineWidth = Math.max(1, width);
    ctx.stroke(path);
    ctx.strokeStyle = hexToRgba("#FFFFFF", 0.72 * glow.coreBrightness * anim.brightness);
    ctx.lineWidth = Math.max(0.6, width * 0.32);
    ctx.stroke(path);
    ctx.restore();
  }

  private pathFromSamples(samples: PathSample[]): Path2D {
    const p = new Path2D();
    if (!samples.length) return p;
    p.moveTo(samples[0].x, samples[0].y);
    for (let i = 1; i < samples.length; i++) p.lineTo(samples[i].x, samples[i].y);
    p.closePath();
    return p;
  }

  private strokeBroken(
    samples: PathSample[],
    color: string,
    width: number,
    glow: OverlayProject["glow"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    b: OverlayProject["border"],
    time: FrameTime,
  ): void {
    const segs = Math.max(2, Math.round(b.segmentCount));
    const gap = b.gapSize;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < segs; i++) {
      const jitter = (hash(i * 17 + Math.floor(time.elapsed * 0.4)) - 0.5) * b.randomness * 0.15;
      const a = (i / segs + jitter + 1) % 1;
      const len = (1 / segs) * (1 - gap);
      const slice = this.sliceSamples(samples, a, a + len);
      if (slice.length < 2) continue;
      const flicker = hash(i + Math.floor(time.elapsed * 8)) > 0.08 ? 1 : 0.25;
      ctx.globalAlpha = flicker;
      this.strokeSamples(slice, color, width, glow, glowMul, q, anim);
    }
    ctx.restore();
  }

  private sliceSamples(samples: PathSample[], t0: number, t1: number): PathSample[] {
    const a = ((t0 % 1) + 1) % 1;
    const b = ((t1 % 1) + 1) % 1;
    const out: PathSample[] = [];
    const n = samples.length;
    if (b > a) {
      const i0 = Math.floor(a * n);
      const i1 = Math.max(i0 + 1, Math.floor(b * n));
      return samples.slice(i0, i1);
    }
    const i0 = Math.floor(a * n);
    const i1 = Math.floor(b * n);
    out.push(...samples.slice(i0), ...samples.slice(0, i1));
    return out;
  }

  private strokeCorners(
    rect: Rect,
    color: string,
    width: number,
    glow: OverlayProject["glow"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    b: OverlayProject["border"],
  ): void {
    const len = b.cornerLength;
    const r = rect.r;
    const corners = [
      { x: rect.x, y: rect.y, dx: 1, dy: 1 },
      { x: rect.x + rect.w, y: rect.y, dx: -1, dy: 1 },
      { x: rect.x + rect.w, y: rect.y + rect.h, dx: -1, dy: -1 },
      { x: rect.x, y: rect.y + rect.h, dx: 1, dy: -1 },
    ];
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const c of corners) {
      const p = new Path2D();
      p.moveTo(c.x + c.dx * len, c.y);
      p.lineTo(c.x + c.dx * r, c.y);
      p.arcTo(c.x, c.y, c.x, c.y + c.dy * r, r);
      p.lineTo(c.x, c.y + c.dy * len);
      const fake: PathSample[] = [];
      // stroke the path directly with glow passes
      const passes = q.glowPasses;
      for (let i = passes; i >= 1; i--) {
        const t = i / passes;
        ctx.strokeStyle = hexToRgba(color, glow.outerOpacity * (0.1 + 0.16 * (1 - t)) * glowMul * anim.brightness);
        ctx.lineWidth = width + glow.outerRadius * glowMul * t * 0.45;
        ctx.stroke(p);
      }
      ctx.strokeStyle = hexToRgba(mixHex(color, "#FFFFFF", 0.3), 0.95);
      ctx.lineWidth = width;
      ctx.stroke(p);
      ctx.strokeStyle = hexToRgba("#FFFFFF", 0.7);
      ctx.lineWidth = Math.max(0.6, width * 0.3);
      ctx.stroke(p);
      void fake;
    }
    ctx.restore();
  }

  private strokeCircuit(
    samples: PathSample[],
    rect: Rect,
    color: string,
    width: number,
    glow: OverlayProject["glow"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    b: OverlayProject["border"],
    time: FrameTime,
  ): void {
    this.strokeSamples(samples, color, Math.max(1, width * 0.7), glow, glowMul * 0.7, q, anim);
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const nodes = Math.round(b.nodeCount);
    for (let i = 0; i < nodes; i++) {
      const s = pointOnSamples(samples, (i + 0.15) / nodes);
      const pulse = 0.5 + 0.5 * Math.sin(time.elapsed * 4 + i);
      ctx.fillStyle = hexToRgba("#FFFFFF", 0.55 + pulse * 0.4);
      ctx.beginPath();
      ctx.arc(s.x, s.y, b.nodeSize * (0.7 + pulse * 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = hexToRgba(color, 0.7);
      ctx.lineWidth = 2;
      ctx.stroke();
      if (hash(i + 2) < b.branchProbability) {
        const len = 18 + hash(i * 9) * 40 * b.traceDensity;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.nx * len, s.y + s.ny * len);
        ctx.strokeStyle = hexToRgba(color, 0.55);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(s.x + s.nx * len, s.y + s.ny * len, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(color, 0.8);
        ctx.fill();
      }
    }
    const chase = (time.elapsed * 0.15) % 1;
    const p = pointOnSamples(samples, chase);
    ctx.fillStyle = hexToRgba("#FFFFFF", 0.9);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    void rect;
  }

  private strokeArcs(
    samples: PathSample[],
    color: string,
    b: OverlayProject["border"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    time: FrameTime,
  ): void {
    this.strokeSamples(samples, color, Math.max(0.8, b.thickness * 0.5), {
      coreWidth: 1,
      coreBrightness: 0.6,
      innerRadius: 4,
      innerOpacity: 0.4,
      outerRadius: 16,
      outerOpacity: 0.2,
    }, glowMul * 0.4, q, anim);
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const n = Math.max(1, Math.round(b.branchCount));
    for (let i = 0; i < n; i++) {
      const flickerOff = hash(i + Math.floor(time.elapsed * (8 + b.flicker * 12)));
      if (flickerOff < 0.25 * (1 - b.flicker)) continue;
      const t0 = hash(i * 3 + Math.floor(time.elapsed * 2)) ;
      const span = 0.08 + hash(i * 7) * 0.12;
      const steps = 10;
      ctx.beginPath();
      for (let k = 0; k <= steps; k++) {
        const u = k / steps;
        const s = pointOnSamples(samples, t0 + span * u);
        const jag = (hash(i * 13 + k + Math.floor(time.elapsed * 20)) - 0.5) * 18 * b.arcIntensity * b.randomness;
        const x = s.x + s.nx * jag;
        const y = s.y + s.ny * jag;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = hexToRgba("#FFFFFF", 0.85);
      ctx.lineWidth = b.thickness;
      ctx.stroke();
      ctx.strokeStyle = hexToRgba(color, 0.55);
      ctx.lineWidth = b.thickness * 3;
      ctx.stroke();
    }
    ctx.restore();
  }

  private strokeRope(
    samples: PathSample[],
    color: string,
    b: OverlayProject["border"],
    glow: OverlayProject["glow"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    time: FrameTime,
  ): void {
    const strands = Math.max(2, Math.round(b.strandCount));
    for (let i = 0; i < strands; i++) {
      const phase = (i / strands) * Math.PI * 2 + time.elapsed * b.animationSpeed;
      const twisted: PathSample[] = samples.map((s) => {
        const amp = (b.thickness + 2) * 1.4;
        const off = Math.sin(s.t * Math.PI * 2 * b.twist + phase) * amp;
        return { ...s, x: s.x + s.nx * off, y: s.y + s.ny * off };
      });
      const col = i % 2 === 0 ? color : mixHex(color, "#FFFFFF", 0.25);
      this.strokeSamples(twisted, col, Math.max(0.8, b.thickness * 0.7), glow, glowMul * 0.55, q, anim);
    }
  }

  private strokeGlitch(
    samples: PathSample[],
    color: string,
    width: number,
    glow: OverlayProject["glow"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    b: OverlayProject["border"],
    time: FrameTime,
  ): void {
    const fire = hash(Math.floor(time.elapsed / Math.max(0.05, b.glitchDuration))) < b.glitchFrequency || anim.rgb > 0.5;
    const ox = fire ? (hash(time.elapsed) - 0.5) * b.offsetAmount : 0;
    const oy = fire ? (hash(time.elapsed + 3) - 0.5) * b.offsetAmount : 0;
    const sep = fire ? b.rgbSeparation : b.rgbSeparation * 0.15;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const layers = [
      { c: "#FF0033", x: -sep + ox, y: oy },
      { c: "#00FF66", x: ox, y: -sep * 0.4 + oy },
      { c: "#00FFFF", x: sep + ox, y: oy },
    ];
    for (const L of layers) {
      ctx.save();
      ctx.translate(L.x, L.y);
      ctx.globalAlpha = fire ? 0.85 : 0.4;
      this.strokeSamples(samples, mixHex(color, L.c, 0.6), width, glow, glowMul * 0.5, q, anim);
      ctx.restore();
    }
    const copies = fire ? Math.round(b.duplication) : 0;
    for (let i = 0; i < copies; i++) {
      ctx.save();
      ctx.translate((hash(i) - 0.5) * b.offsetAmount * 1.4, (hash(i + 4) - 0.5) * 8);
      ctx.globalAlpha = 0.25 * (1 - b.flickerIntensity * 0.5);
      this.strokeSamples(samples, color, width, glow, glowMul * 0.3, q, anim);
      ctx.restore();
    }
    ctx.restore();
  }

  private strokeRibbon(samples: PathSample[], color: string, width: number, time: FrameTime, b: OverlayProject["border"]): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    samples.forEach((s, i) => {
      const w = width * (0.6 + 0.4 * Math.sin(s.t * 20 + time.elapsed * b.flowSpeed * 4));
      const x = s.x + s.nx * w;
      const y = s.y + s.ny * w;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = hexToRgba(color, 0.45);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }

  private strokePlasma(
    samples: PathSample[],
    primary: string,
    secondary: string,
    b: OverlayProject["border"],
    glowMul: number,
    q: QualitySettings,
    anim: AnimState,
    time: FrameTime,
  ): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const ribbons = 3;
    for (let r = 0; r < ribbons; r++) {
      ctx.beginPath();
      samples.forEach((s, i) => {
        const n = (fbm(s.t * 8 + r, time.elapsed * b.plasmaSpeed + r) - 0.5) * 16 * b.distortion;
        const x = s.x + s.nx * n;
        const y = s.y + s.ny * n;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      const col = r === 1 ? secondary : primary;
      ctx.strokeStyle = hexToRgba(col, 0.28 * b.intensity * glowMul);
      ctx.lineWidth = 10 + r * 4;
      ctx.stroke();
      ctx.strokeStyle = hexToRgba(mixHex(col, "#FFFFFF", 0.3), 0.7 * b.intensity);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    const dots = Math.round(40 * b.particleDensity);
    for (let i = 0; i < dots; i++) {
      const s = pointOnSamples(samples, hash(i + Math.floor(time.elapsed * 3)) );
      const n = (fbm(s.x * 0.02, time.elapsed) - 0.4) * 12;
      ctx.fillStyle = hexToRgba(i % 2 ? primary : secondary, 0.55);
      ctx.beginPath();
      ctx.arc(s.x + s.nx * n, s.y + s.ny * n, 1.4 + hash(i) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    void q;
    void anim;
  }

  private drawChases(samples: PathSample[], anim: AnimState, color: string, thick: number): void {
    if (!anim.chase.length) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const t of anim.chase) {
      for (let k = -6; k <= 6; k++) {
        const p = pointOnSamples(samples, t + k * 0.006);
        const a = 1 - Math.abs(k) / 7;
        ctx.fillStyle = hexToRgba("#FFFFFF", 0.55 * a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, (thick + 3) * a, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = hexToRgba(color, 0.45 * a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, (thick + 10) * a, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  private drawLightning(samples: PathSample[], color: string, anim: AnimState, time: FrameTime, branches: number): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const n = Math.max(1, branches);
    for (let i = 0; i < n; i++) {
      if (hash(i + Math.floor(time.elapsed * 10)) > anim.burst) continue;
      const t0 = hash(i * 5 + Math.floor(time.elapsed * 3));
      ctx.beginPath();
      for (let k = 0; k < 8; k++) {
        const s = pointOnSamples(samples, t0 + k * 0.012);
        const jag = (hash(i * 11 + k + time.elapsed) - 0.5) * 22;
        const x = s.x + s.nx * jag;
        const y = s.y + s.ny * jag;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = hexToRgba("#FFFFFF", 0.85);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.strokeStyle = hexToRgba(color, 0.45);
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawSparks(samples: PathSample[], color: string, anim: AnimState, time: FrameTime): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const n = Math.round(8 + anim.spark * 18);
    for (let i = 0; i < n; i++) {
      const s = pointOnSamples(samples, hash(i * 3 + Math.floor(time.elapsed * 12)));
      const len = 6 + hash(i + 8) * 16 * anim.spark;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.nx * len, s.y + s.ny * len);
      ctx.strokeStyle = hexToRgba("#FFFFFF", 0.8);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = hexToRgba(color, 0.7);
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawHolo(samples: PathSample[], anim: AnimState, thick: number): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const t = anim.chase[0] ?? 0.3;
    for (let i = -12; i <= 12; i++) {
      const p = pointOnSamples(samples, t + i * 0.004);
      const hue = ((i + 12) / 24) * 360 + anim.hue;
      ctx.fillStyle = hexToRgba(hslToHex(hue, 1, 0.6), 0.35 * anim.rainbow);
      ctx.beginPath();
      ctx.arc(p.x, p.y, thick + 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawRgbGhost(samples: PathSample[], thick: number, anim: AnimState): void {
    const ctx = this.ctx;
    const o = 3 + anim.rgb * 6;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.translate(-o, 0);
    ctx.strokeStyle = "rgba(255,0,80,0.35)";
    ctx.lineWidth = thick;
    ctx.stroke(this.pathFromSamples(samples));
    ctx.translate(o * 2, 0);
    ctx.strokeStyle = "rgba(0,220,255,0.35)";
    ctx.stroke(this.pathFromSamples(samples));
    ctx.restore();
  }

  private drawScanline(w: number, h: number, t: number, color: string): void {
    const ctx = this.ctx;
    const y = t * h;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const g = ctx.createLinearGradient(0, y - 18, 0, y + 18);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, hexToRgba(color, 0.35));
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 18, w, 36);
    ctx.fillStyle = hexToRgba("#FFFFFF", 0.25);
    ctx.fillRect(0, y, w, 1.2);
    ctx.restore();
  }
}

export function renderThumbnail(project: OverlayProject, size = 320): string {
  if (typeof document === "undefined") return "";
  const c = document.createElement("canvas");
  c.width = size;
  c.height = Math.round(size * 9 / 16);
  const r = new OverlayRenderer(c);
  r.resize(c.width, c.height, 1);
  r.render(project, { dt: 1 / 60, elapsed: 0.8 }, {
    bass: 0.4, mids: 0.3, treble: 0.2, volume: 0.4, energy: 0.45, snare: 0, vocals: 0.2, drop: 0,
  });
  try {
    return c.toDataURL("image/jpeg", 0.72);
  } catch {
    return "";
  }
}

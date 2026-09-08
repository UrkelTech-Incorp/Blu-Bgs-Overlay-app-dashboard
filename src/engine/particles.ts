import { hexToRgb } from "./colors";
import { hash, noise2 } from "./noise";
import type { AudioBands, ParticleConfig, PathSample } from "./types";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  hue: number;
  r: number;
  g: number;
  b: number;
}

export class ParticleEngine {
  private pool: P[] = [];
  private spawnAcc = 0;

  reset(): void {
    this.pool = [];
    this.spawnAcc = 0;
  }

  count(): number {
    return this.pool.length;
  }

  update(
    dt: number,
    samples: PathSample[],
    cfg: ParticleConfig,
    audio: AudioBands,
    maxParticles: number,
    extras: { spark: number; burst: number; dissolve: number },
  ): void {
    if (!cfg.enabled || maxParticles <= 0 || samples.length === 0) {
      this.pool = [];
      return;
    }
    const audioBoost = 1 + audio.energy * cfg.audioResponse * 1.4;
    const want = Math.min(maxParticles, Math.round(cfg.count * audioBoost + extras.burst * 80 + extras.dissolve * 40));
    const spawnRate = Math.max(4, want * (0.6 + extras.spark * 2));
    this.spawnAcc += spawnRate * dt;
    while (this.spawnAcc >= 1 && this.pool.length < maxParticles) {
      this.spawnAcc -= 1;
      this.spawn(samples, cfg, audio, extras);
    }
    const next: P[] = [];
    for (const p of this.pool) {
      p.life -= dt;
      if (p.life <= 0) continue;
      const t = 1 - p.life / p.max;
      const turb = cfg.turbulence * 80;
      p.vx += (noise2(p.x * 0.02, p.life * 3) - 0.5) * turb * dt;
      p.vy += (noise2(p.y * 0.02, p.life * 3 + 9) - 0.5) * turb * dt;
      p.vy += cfg.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.size *= 0.999 - t * 0.01;
      next.push(p);
    }
    this.pool = next;
  }

  draw(ctx: CanvasRenderingContext2D, cfg: ParticleConfig): void {
    if (!this.pool.length) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const p of this.pool) {
      const a = (p.life / p.max) * cfg.opacity;
      if (a < 0.02) continue;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * (2.4 + cfg.glow * 3));
      g.addColorStop(0, `rgba(255,255,255,${a * 0.95})`);
      g.addColorStop(0.25, `rgba(${p.r},${p.g},${p.b},${a * 0.8})`);
      g.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (2.2 + cfg.glow * 2.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private spawn(samples: PathSample[], cfg: ParticleConfig, audio: AudioBands, extras: { spark: number; burst: number }): void {
    const s = samples[Math.floor(hash(this.pool.length + audio.energy * 99) * samples.length) % samples.length];
    const dir = (cfg.direction * Math.PI) / 180;
    const speed = cfg.speed * (0.6 + Math.random() * 0.8) * (1 + extras.spark);
    let vx = Math.cos(dir) * speed + s.nx * speed * 0.35;
    let vy = Math.sin(dir) * speed + s.ny * speed * 0.35;
    const [cr, cg, cb] = hexToRgb(cfg.color);
    let r = cr;
    let g = cg;
    let b = cb;
    let size = cfg.size * (0.5 + Math.random());
    const life = cfg.lifetime * (0.55 + Math.random() * 0.7);

    switch (cfg.preset) {
      case "sparks":
        vx = s.nx * (40 + Math.random() * 90) + (Math.random() - 0.5) * 30;
        vy = s.ny * (40 + Math.random() * 90) - 20 - Math.random() * 50;
        size *= 0.7;
        break;
      case "dust":
        vx *= 0.25;
        vy *= 0.15;
        size *= 0.5;
        r = Math.min(255, r + 40);
        g = Math.min(255, g + 40);
        b = Math.min(255, b + 40);
        break;
      case "plasma":
        vx += (Math.random() - 0.5) * 50;
        vy += (Math.random() - 0.5) * 50;
        r = Math.min(255, r + 80);
        b = Math.min(255, b + 40);
        break;
      case "embers":
        r = 255;
        g = 80 + Math.random() * 100;
        b = 20;
        vy -= 30 + Math.random() * 40;
        break;
      case "electric":
        vx = s.tx * (80 + Math.random() * 80) * (Math.random() < 0.5 ? -1 : 1);
        vy = s.ty * (80 + Math.random() * 80);
        r = 180;
        g = 220;
        b = 255;
        size *= 0.5;
        break;
      case "rgb-pixels": {
        const ch = Math.floor(Math.random() * 3);
        r = ch === 0 ? 255 : 20;
        g = ch === 1 ? 255 : 20;
        b = ch === 2 ? 255 : 20;
        size *= 0.45;
        vx *= 0.4;
        vy *= 0.4;
        break;
      }
      case "holographic": {
        const hue = Math.random();
        r = Math.floor(128 + 127 * Math.sin(hue * 6.28));
        g = Math.floor(128 + 127 * Math.sin(hue * 6.28 + 2.1));
        b = Math.floor(128 + 127 * Math.sin(hue * 6.28 + 4.2));
        break;
      }
      case "paint":
        size *= 1.8 + Math.random();
        vx *= 0.5;
        vy += 20;
        break;
      default:
        break;
    }

    if (extras.burst > 0.4) {
      vx *= 1.8;
      vy *= 1.8;
    }

    this.pool.push({
      x: s.x + s.nx * (Math.random() * 6),
      y: s.y + s.ny * (Math.random() * 6),
      vx,
      vy,
      life,
      max: life,
      size,
      hue: Math.random(),
      r,
      g,
      b,
    });
  }
}

import type { PathSample } from "./types";

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

export function perimeterLength(rect: Rect): number {
  const r = Math.max(0, Math.min(rect.r, Math.min(rect.w, rect.h) / 2));
  return 2 * (rect.w + rect.h - 4 * r) + 2 * Math.PI * r;
}

export function sampleRoundedRect(rect: Rect, count: number): PathSample[] {
  const r = Math.max(0, Math.min(rect.r, Math.min(rect.w, rect.h) / 2));
  const { x, y, w, h } = rect;
  const straight = 2 * (w + h - 4 * r);
  const corners = 2 * Math.PI * r;
  const total = straight + corners;
  const samples: PathSample[] = [];

  const push = (px: number, py: number, nx: number, ny: number, t: number) => {
    const len = Math.hypot(nx, ny) || 1;
    nx /= len;
    ny /= len;
    samples.push({ x: px, y: py, nx, ny, tx: -ny, ty: nx, t });
  };

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const d = t * total;
    const top = w - 2 * r;
    const right = h - 2 * r;
    const bot = w - 2 * r;
    const left = h - 2 * r;
    const c = (Math.PI / 2) * r;

    let remaining = d;
    if (remaining <= top) {
      push(x + r + remaining, y, 0, -1, t);
      continue;
    }
    remaining -= top;
    if (remaining <= c) {
      const a = -Math.PI / 2 + remaining / r;
      push(x + w - r + Math.cos(a) * r, y + r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
      continue;
    }
    remaining -= c;
    if (remaining <= right) {
      push(x + w, y + r + remaining, 1, 0, t);
      continue;
    }
    remaining -= right;
    if (remaining <= c) {
      const a = 0 + remaining / r;
      push(x + w - r + Math.cos(a) * r, y + h - r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
      continue;
    }
    remaining -= c;
    if (remaining <= bot) {
      push(x + w - r - remaining, y + h, 0, 1, t);
      continue;
    }
    remaining -= bot;
    if (remaining <= c) {
      const a = Math.PI / 2 + remaining / r;
      push(x + r + Math.cos(a) * r, y + h - r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
      continue;
    }
    remaining -= c;
    if (remaining <= left) {
      push(x, y + h - r - remaining, -1, 0, t);
      continue;
    }
    remaining -= left;
    const a = Math.PI + remaining / r;
    push(x + r + Math.cos(a) * r, y + r + Math.sin(a) * r, Math.cos(a), Math.sin(a), t);
  }
  return samples;
}

export function pointOnSamples(samples: PathSample[], t: number): PathSample {
  if (samples.length === 0) {
    return { x: 0, y: 0, nx: 0, ny: -1, tx: 1, ty: 0, t: 0 };
  }
  const u = ((t % 1) + 1) % 1;
  const f = u * samples.length;
  const i = Math.floor(f) % samples.length;
  const j = (i + 1) % samples.length;
  const k = f - Math.floor(f);
  const a = samples[i];
  const b = samples[j];
  return {
    x: a.x + (b.x - a.x) * k,
    y: a.y + (b.y - a.y) * k,
    nx: a.nx + (b.nx - a.nx) * k,
    ny: a.ny + (b.ny - a.ny) * k,
    tx: a.tx + (b.tx - a.tx) * k,
    ty: a.ty + (b.ty - a.ty) * k,
    t: u,
  };
}

export function roundedRectPath(ctx: CanvasRenderingContext2D, rect: Rect): Path2D {
  const r = Math.max(0, Math.min(rect.r, Math.min(rect.w, rect.h) / 2));
  const p = new Path2D();
  const { x, y, w, h } = rect;
  p.moveTo(x + r, y);
  p.arcTo(x + w, y, x + w, y + h, r);
  p.arcTo(x + w, y + h, x, y + h, r);
  p.arcTo(x, y + h, x, y, r);
  p.arcTo(x, y, x + w, y, r);
  p.closePath();
  return p;
}

export function insetRect(rect: Rect, amount: number): Rect {
  return {
    x: rect.x + amount,
    y: rect.y + amount,
    w: Math.max(1, rect.w - amount * 2),
    h: Math.max(1, rect.h - amount * 2),
    r: Math.max(0, rect.r - amount),
  };
}

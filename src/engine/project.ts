import { createDefaultProject, defaultAudio, defaultBorder, defaultColors, defaultGlow, defaultParticles } from "./defaults";
import type { OverlayProject, SavedProjectMeta } from "./types";

export const STORAGE_PROJECTS = "blu-bgs-projects-v1";
export const STORAGE_META = "blu-bgs-meta-v1";
export const STORAGE_LIVE = "blu-bgs-live-v1";
export const STORAGE_FAV = "blu-bgs-fav-v1";
export const STORAGE_SETTINGS = "blu-bgs-settings-v1";

export function cloneProject(project: OverlayProject, name?: string): OverlayProject {
  const copy = structuredClone(project);
  copy.id = `prj-${Math.random().toString(36).slice(2, 10)}`;
  copy.name = name ?? `${project.name} Copy`;
  copy.createdAt = Date.now();
  copy.updatedAt = Date.now();
  return copy;
}

export function sanitizeProject(raw: unknown): OverlayProject {
  const base = createDefaultProject();
  if (!raw || typeof raw !== "object") return base;
  const p = raw as Partial<OverlayProject>;
  return {
    ...base,
    ...p,
    id: typeof p.id === "string" ? p.id : base.id,
    name: typeof p.name === "string" && p.name.trim() ? p.name : "Untitled Overlay",
    version: "1.0",
    createdAt: typeof p.createdAt === "number" ? p.createdAt : Date.now(),
    updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now(),
    canvas: {
      width: p.canvas?.width ?? 1920,
      height: p.canvas?.height ?? 1080,
      fps: p.canvas?.fps === 30 || p.canvas?.fps === 120 ? p.canvas.fps : 60,
    },
    border: { ...defaultBorder(), ...(p.border ?? {}) },
    colors: { ...defaultColors(), ...(p.colors ?? {}) },
    glow: { ...defaultGlow(), ...(p.glow ?? {}) },
    animations: Array.isArray(p.animations) ? p.animations : base.animations,
    particles: { ...defaultParticles(), ...(p.particles ?? {}) },
    audio: { ...defaultAudio(), ...(p.audio ?? {}) },
    outputMode: p.outputMode ?? "full-neon",
    quality: p.quality ?? "high",
  };
}

export function serializeProject(project: OverlayProject): string {
  return JSON.stringify(
    {
      project: { name: project.name, version: project.version },
      canvas: project.canvas,
      border: project.border,
      colors: project.colors,
      glow: project.glow,
      animations: project.animations,
      particles: project.particles,
      audio: project.audio,
      outputMode: project.outputMode,
      quality: project.quality,
      id: project.id,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    },
    null,
    2,
  );
}

export function deserializeProject(text: string): OverlayProject {
  const data = JSON.parse(text) as Record<string, unknown>;
  const nested = data.project && typeof data.project === "object" ? (data.project as Record<string, unknown>) : {};
  return sanitizeProject({
    ...data,
    name: (nested.name as string) ?? (data.name as string),
    version: "1.0",
  });
}

export function encodeProjectHash(project: OverlayProject): string {
  try {
    const json = JSON.stringify(project);
    const bytes = new TextEncoder().encode(json);
    let bin = "";
    bytes.forEach((b) => {
      bin += String.fromCharCode(b);
    });
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  } catch {
    return "";
  }
}

export function decodeProjectHash(hash: string): OverlayProject | null {
  try {
    const b64 = hash.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const bin = atob(pad);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return sanitizeProject(JSON.parse(json));
  } catch {
    return null;
  }
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
}

export type ProjectRecord = { meta: SavedProjectMeta; project: OverlayProject };

export function loadAllProjects(): ProjectRecord[] {
  return readJson<ProjectRecord[]>(STORAGE_PROJECTS, []);
}

export function saveAllProjects(records: ProjectRecord[]): void {
  writeJson(STORAGE_PROJECTS, records);
}

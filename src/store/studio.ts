import { create } from "zustand";
import { ALL_ANIMATION_TYPES, createDefaultProject, makeAnimation, uid } from "@/engine/defaults";
import { generateNeon } from "@/engine/generate";
import { applyPreset, BUILTIN_PRESETS } from "@/engine/presets";
import {
  cloneProject,
  deserializeProject,
  loadAllProjects,
  saveAllProjects,
  sanitizeProject,
  serializeProject,
  STORAGE_FAV,
  STORAGE_LIVE,
  STORAGE_SETTINGS,
  writeJson,
  readJson,
  type ProjectRecord,
} from "@/engine/project";
import { renderThumbnail, type PerfStats } from "@/engine/renderer";
import type {
  AnimationType,
  AudioBands,
  AudioSource,
  BorderType,
  FavoritesState,
  OverlayProject,
  OutputMode,
  PreviewBackground,
  QualityPreset,
  ViewId,
} from "@/engine/types";
import { EMPTY_AUDIO } from "@/engine/types";

const CHANNEL = "blu-bgs-live";
const HISTORY_CAP = 60;

export interface StudioSettings {
  previewBg: PreviewBackground;
  showFps: boolean;
  gpuFriendly: boolean;
  obsFps: 30 | 60 | 120;
  obsWidth: number;
  obsHeight: number;
}

interface StudioState {
  hydrated: boolean;
  view: ViewId;
  project: OverlayProject;
  records: ProjectRecord[];
  favorites: FavoritesState;
  settings: StudioSettings;
  playing: boolean;
  fullscreen: boolean;
  zoom: number;
  fit: boolean;
  audioBands: AudioBands;
  perf: PerfStats;
  search: string;
  history: OverlayProject[];
  future: OverlayProject[];
  lastSavedId: string | null;
  hydrate: () => void;
  setView: (v: ViewId) => void;
  setProject: (p: OverlayProject, history?: boolean) => void;
  patchProject: (partial: Partial<OverlayProject>, history?: boolean) => void;
  patchBorder: (partial: Partial<OverlayProject["border"]>, history?: boolean) => void;
  patchColors: (partial: Partial<OverlayProject["colors"]>, history?: boolean) => void;
  patchGlow: (partial: Partial<OverlayProject["glow"]>, history?: boolean) => void;
  patchParticles: (partial: Partial<OverlayProject["particles"]>, history?: boolean) => void;
  patchAudio: (partial: Partial<OverlayProject["audio"]>, history?: boolean) => void;
  setBorderType: (type: BorderType) => void;
  toggleAnimation: (type: AnimationType) => void;
  patchAnimation: (type: AnimationType, partial: Partial<OverlayProject["animations"][number]>) => void;
  newOverlay: () => void;
  fromPreset: (presetId: string) => void;
  saveCurrent: () => void;
  loadProject: (id: string) => void;
  duplicateProject: (id?: string) => void;
  deleteProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;
  importJson: (text: string) => void;
  exportJson: () => string;
  generate: () => void;
  undo: () => void;
  redo: () => void;
  toggleFav: (kind: keyof FavoritesState, value: string) => void;
  setPlaying: (v: boolean) => void;
  setZoom: (z: number) => void;
  setFit: (v: boolean) => void;
  setFullscreen: (v: boolean) => void;
  setSearch: (q: string) => void;
  setAudioBands: (b: AudioBands) => void;
  setPerf: (p: PerfStats) => void;
  setAudioSource: (s: AudioSource) => void;
  setOutputMode: (m: OutputMode) => void;
  setQuality: (q: QualityPreset) => void;
  patchSettings: (s: Partial<StudioSettings>) => void;
  publishLive: () => void;
  resetProperty: (scope: "border" | "glow" | "particles" | "colors") => void;
}

const emptyFav: FavoritesState = {
  borders: [],
  animations: [],
  colors: [],
  combos: [],
  presets: [],
};

const defaultSettings: StudioSettings = {
  previewBg: "checker",
  showFps: true,
  gpuFriendly: false,
  obsFps: 60,
  obsWidth: 1920,
  obsHeight: 1080,
};

function pushLive(project: OverlayProject) {
  if (typeof window === "undefined") return;
  writeJson(STORAGE_LIVE, project);
  try {
    const ch = new BroadcastChannel(CHANNEL);
    ch.postMessage({ type: "project", project });
    ch.close();
  } catch {
    /* ignore */
  }
  void fetch("/api/live", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: "default", project }),
  }).catch(() => undefined);
}

function snapshotMeta(project: OverlayProject, prev?: ProjectRecord): ProjectRecord {
  return {
    project,
    meta: {
      id: project.id,
      name: project.name,
      updatedAt: project.updatedAt,
      resolution: `${project.canvas.width}x${project.canvas.height}`,
      thumbnail: prev?.meta.thumbnail || "",
      favorite: prev?.meta.favorite ?? false,
    },
  };
}

export const useStudio = create<StudioState>((set, get) => ({
  hydrated: false,
  view: "dashboard",
  project: createDefaultProject({ name: "Cyberpunk Frame" }),
  records: [],
  favorites: emptyFav,
  settings: defaultSettings,
  playing: true,
  fullscreen: false,
  zoom: 0.42,
  fit: true,
  audioBands: { ...EMPTY_AUDIO },
  perf: { fps: 60, frameMs: 16, renderMs: 0, audioMs: 0, particles: 0 },
  search: "",
  history: [],
  future: [],
  lastSavedId: null,

  hydrate: () => {
    if (get().hydrated) return;
    const records = loadAllProjects();
    const fav = readJson<FavoritesState>(STORAGE_FAV, emptyFav);
    const settings = { ...defaultSettings, ...readJson<Partial<StudioSettings>>(STORAGE_SETTINGS, {}) };
    const live = readJson<OverlayProject | null>(STORAGE_LIVE, null);
    let project = live ? sanitizeProject(live) : get().project;
    let seeded = records;
    if (seeded.length === 0) {
      seeded = BUILTIN_PRESETS.slice(0, 4).map((p) => {
        const proj = applyPreset(p);
        return snapshotMeta(proj);
      });
      saveAllProjects(seeded);
      project = seeded[0]!.project;
    }
    set({ hydrated: true, records: seeded, favorites: fav, settings, project, lastSavedId: project.id });
  },

  setView: (view) => set({ view }),

  setProject: (project, history = true) => {
    const s = get();
    if (history) {
      set({
        project,
        history: [...s.history, s.project].slice(-HISTORY_CAP),
        future: [],
      });
    } else {
      set({ project });
    }
    pushLive(project);
  },

  patchProject: (partial, history = false) => {
    const s = get();
    const project = { ...s.project, ...partial, updatedAt: Date.now() };
    if (history) {
      set({
        project,
        history: [...s.history, s.project].slice(-HISTORY_CAP),
        future: [],
      });
    } else set({ project });
    pushLive(project);
  },

  patchBorder: (partial, history = false) => {
    const s = get();
    get().patchProject({ border: { ...s.project.border, ...partial } }, history);
  },
  patchColors: (partial, history = false) => {
    const s = get();
    get().patchProject({ colors: { ...s.project.colors, ...partial } }, history);
  },
  patchGlow: (partial, history = false) => {
    const s = get();
    get().patchProject({ glow: { ...s.project.glow, ...partial } }, history);
  },
  patchParticles: (partial, history = false) => {
    const s = get();
    get().patchProject({ particles: { ...s.project.particles, ...partial } }, history);
  },
  patchAudio: (partial, history = false) => {
    const s = get();
    get().patchProject({ audio: { ...s.project.audio, ...partial } }, history);
  },

  setBorderType: (type) => {
    get().patchBorder({ type }, true);
  },

  toggleAnimation: (type) => {
    const s = get();
    const existing = s.project.animations.find((a) => a.type === type);
    let animations;
    if (existing) {
      animations = s.project.animations.map((a) => (a.type === type ? { ...a, enabled: !a.enabled } : a));
    } else {
      animations = [...s.project.animations, makeAnimation(type)];
    }
    get().patchProject({ animations }, true);
  },

  patchAnimation: (type, partial) => {
    const s = get();
    const has = s.project.animations.some((a) => a.type === type);
    const animations = has
      ? s.project.animations.map((a) => (a.type === type ? { ...a, ...partial } : a))
      : [...s.project.animations, { ...makeAnimation(type), ...partial }];
    get().patchProject({ animations });
  },

  newOverlay: () => {
    const project = createDefaultProject();
    get().setProject(project, true);
    set({ view: "designer" });
  },

  fromPreset: (presetId) => {
    const preset = BUILTIN_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const project = applyPreset(preset);
    get().setProject(project, true);
    set({ view: "designer" });
  },

  saveCurrent: () => {
    const s = get();
    const project = { ...s.project, updatedAt: Date.now() };
    const thumb = renderThumbnail(project);
    const records = [...s.records];
    const idx = records.findIndex((r) => r.meta.id === project.id);
    const rec = snapshotMeta(project, idx >= 0 ? records[idx] : undefined);
    rec.meta.thumbnail = thumb || rec.meta.thumbnail;
    if (idx >= 0) records[idx] = rec;
    else records.unshift(rec);
    saveAllProjects(records);
    set({ records, project, lastSavedId: project.id });
    pushLive(project);
  },

  loadProject: (id) => {
    const rec = get().records.find((r) => r.meta.id === id);
    if (!rec) return;
    get().setProject(sanitizeProject(rec.project), true);
    set({ view: "designer" });
  },

  duplicateProject: (id) => {
    const s = get();
    const src = id ? s.records.find((r) => r.meta.id === id)?.project : s.project;
    if (!src) return;
    const copy = cloneProject(src);
    const rec = snapshotMeta(copy);
    rec.meta.thumbnail = renderThumbnail(copy);
    const records = [rec, ...s.records];
    saveAllProjects(records);
    set({ records, project: copy, view: "designer" });
  },

  deleteProject: (id) => {
    const records = get().records.filter((r) => r.meta.id !== id);
    saveAllProjects(records);
    set({ records });
    if (get().project.id === id) {
      get().newOverlay();
    }
  },

  renameProject: (id, name) => {
    const records = get().records.map((r) =>
      r.meta.id === id
        ? { ...r, meta: { ...r.meta, name }, project: { ...r.project, name } }
        : r,
    );
    saveAllProjects(records);
    const s = get();
    set({
      records,
      project: s.project.id === id ? { ...s.project, name } : s.project,
    });
  },

  importJson: (text) => {
    const project = deserializeProject(text);
    project.id = uid("prj");
    project.createdAt = Date.now();
    project.updatedAt = Date.now();
    get().setProject(project, true);
    set({ view: "designer" });
  },

  exportJson: () => serializeProject(get().project),

  generate: () => {
    const project = generateNeon();
    get().setProject(project, true);
  },

  undo: () => {
    const s = get();
    if (!s.history.length) return;
    const prev = s.history[s.history.length - 1]!;
    set({
      project: prev,
      history: s.history.slice(0, -1),
      future: [s.project, ...s.future].slice(0, HISTORY_CAP),
    });
    pushLive(prev);
  },
  redo: () => {
    const s = get();
    if (!s.future.length) return;
    const next = s.future[0]!;
    set({
      project: next,
      future: s.future.slice(1),
      history: [...s.history, s.project].slice(-HISTORY_CAP),
    });
    pushLive(next);
  },

  toggleFav: (kind, value) => {
    const fav = { ...get().favorites };
    const list = new Set(fav[kind] as string[]);
    if (list.has(value)) list.delete(value);
    else list.add(value);
    (fav as unknown as Record<string, string[]>)[kind] = [...list];
    writeJson(STORAGE_FAV, fav);
    set({ favorites: fav });
  },

  setPlaying: (playing) => set({ playing }),
  setZoom: (zoom) => set({ zoom, fit: false }),
  setFit: (fit) => set({ fit }),
  setFullscreen: (fullscreen) => set({ fullscreen }),
  setSearch: (search) => set({ search }),
  setAudioBands: (audioBands) => set({ audioBands }),
  setPerf: (perf) => set({ perf }),
  setAudioSource: (source) => get().patchAudio({ source, enabled: source !== "none" }, true),
  setOutputMode: (outputMode) => get().patchProject({ outputMode }, true),
  setQuality: (quality) => get().patchProject({ quality }, true),
  patchSettings: (partial) => {
    const settings = { ...get().settings, ...partial };
    writeJson(STORAGE_SETTINGS, settings);
    set({ settings });
  },
  publishLive: () => {
    const s = get();
    get().saveCurrent();
    pushLive(s.project);
  },
  resetProperty: (scope) => {
    const fresh = createDefaultProject();
    if (scope === "border") get().patchProject({ border: fresh.border }, true);
    if (scope === "glow") get().patchProject({ glow: fresh.glow }, true);
    if (scope === "particles") get().patchProject({ particles: fresh.particles }, true);
    if (scope === "colors") get().patchProject({ colors: fresh.colors }, true);
  },
}));

export { ALL_ANIMATION_TYPES, CHANNEL };

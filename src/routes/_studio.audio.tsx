import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { uid } from "@/engine/defaults";
import { BAND_LABELS, PROPERTY_LABELS } from "@/engine/specs";
import type { AudioBand, AudioMapping, AudioSource, CurveType, MappableProperty } from "@/engine/types";
import { useStudio } from "@/store/studio";

export const Route = createFileRoute("/_studio/audio")({
  component: AudioPage,
});

const BANDS = Object.keys(BAND_LABELS) as AudioBand[];
const PROPERTIES = Object.keys(PROPERTY_LABELS) as MappableProperty[];
const CURVES: CurveType[] = ["linear", "ease-in", "ease-out", "exponential"];
const SOURCES: { id: AudioSource; label: string; hint: string }[] = [
  { id: "demo", label: "Demo beat", hint: "Synthetic pulse so you can design without a mic." },
  { id: "mic", label: "Microphone", hint: "Live input — grant permission when the browser asks." },
  { id: "none", label: "Off", hint: "Freeze the overlay with no audio motion." },
];

function AudioPage() {
  const project = useStudio((s) => s.project);
  const bands = useStudio((s) => s.audioBands);
  const patchAudio = useStudio((s) => s.patchAudio);
  const setAudioSource = useStudio((s) => s.setAudioSource);

  const updateMap = (id: string, partial: Partial<AudioMapping>) => {
    patchAudio({
      mappings: project.audio.mappings.map((m) => (m.id === id ? { ...m, ...partial } : m)),
    });
  };

  const addMap = () => {
    const next: AudioMapping = {
      id: uid("map"),
      enabled: true,
      band: "bass",
      property: "glow",
      min: 0,
      max: 1,
      smoothing: 0.3,
      curve: "linear",
    };
    patchAudio({ mappings: [...project.audio.mappings, next] }, true);
  };

  const removeMap = (id: string) => {
    patchAudio({ mappings: project.audio.mappings.filter((m) => m.id !== id) }, true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-24 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Reactive</p>
      <h1 className="font-display text-4xl tracking-wide text-ivory">Audio</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Map frequency bands to neon properties. Bass thickens the tube, snares flash, energy feeds particles.
      </p>

      <section className="mt-8 rounded-xl border border-line bg-panel p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl tracking-wide text-ivory">Source</h2>
          <div className="flex items-center gap-2">
            <Label htmlFor="audio-on">Enabled</Label>
            <Switch
              id="audio-on"
              checked={project.audio.enabled}
              onCheckedChange={(v) => patchAudio({ enabled: v }, true)}
            />
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {SOURCES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setAudioSource(s.id)}
              className={
                project.audio.source === s.id
                  ? "rounded-xl border border-cyan/40 bg-cyan/10 p-4 text-left"
                  : "rounded-xl border border-line bg-structure-2 p-4 text-left hover:border-bronze/40"
              }
            >
              <div className="font-medium text-ivory">{s.label}</div>
              <p className="mt-1 text-xs text-muted">{s.hint}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-line px-3 py-2">
          <Label htmlFor="color-reactive">Color reactive</Label>
          <Switch
            id="color-reactive"
            checked={project.audio.colorReactive}
            onCheckedChange={(v) => patchAudio({ colorReactive: v })}
          />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-line bg-panel p-4 md:p-6">
        <h2 className="font-display text-2xl tracking-wide text-ivory">Live bands</h2>
        <div className="mt-4 grid grid-cols-4 gap-3 md:grid-cols-8">
          {BANDS.map((b) => {
            const v = bands[b];
            return (
              <div key={b} className="flex flex-col items-center gap-2">
                <div className="relative h-24 w-full overflow-hidden rounded-md bg-raised">
                  <div
                    className="absolute inset-x-1 bottom-1 rounded-sm bg-cyan"
                    style={{ height: `${Math.round(Math.min(1, v) * 100)}%`, opacity: 0.35 + v * 0.65 }}
                  />
                </div>
                <span className="text-[10px] tracking-wider text-muted uppercase">{BAND_LABELS[b]}</span>
                <span className="font-mono text-[10px] text-ivory-dim tabular-nums">{v.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide text-ivory">Mappings</h2>
          <Button size="sm" variant="outline" onClick={addMap}>
            <Plus className="size-3.5" />
            Add mapping
          </Button>
        </div>
        <div className="space-y-3">
          {project.audio.mappings.map((m) => (
            <article key={m.id} className="rounded-xl border border-line bg-panel p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Switch checked={m.enabled} onCheckedChange={(v) => updateMap(m.id, { enabled: v })} />
                <select
                  className="h-9 rounded-md border border-line bg-structure-2 px-2 text-sm text-ivory"
                  value={m.band}
                  onChange={(e) => updateMap(m.id, { band: e.target.value as AudioBand })}
                >
                  {BANDS.map((b) => (
                    <option key={b} value={b}>
                      {BAND_LABELS[b]}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-muted">→</span>
                <select
                  className="h-9 min-w-0 flex-1 rounded-md border border-line bg-structure-2 px-2 text-sm text-ivory"
                  value={m.property}
                  onChange={(e) => updateMap(m.id, { property: e.target.value as MappableProperty })}
                >
                  {PROPERTIES.map((p) => (
                    <option key={p} value={p}>
                      {PROPERTY_LABELS[p]}
                    </option>
                  ))}
                </select>
                <select
                  className="h-9 rounded-md border border-line bg-structure-2 px-2 text-sm text-ivory"
                  value={m.curve}
                  onChange={(e) => updateMap(m.id, { curve: e.target.value as CurveType })}
                >
                  {CURVES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <Button size="icon-sm" variant="ghost" className="text-danger" onClick={() => removeMap(m.id)} aria-label="Remove mapping">
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div>
                  <Label>Min {m.min.toFixed(2)}</Label>
                  <Slider min={0} max={1} step={0.01} value={[m.min]} onValueChange={(v) => updateMap(m.id, { min: v[0] ?? 0 })} />
                </div>
                <div>
                  <Label>Max {m.max.toFixed(2)}</Label>
                  <Slider min={0} max={1} step={0.01} value={[m.max]} onValueChange={(v) => updateMap(m.id, { max: v[0] ?? 1 })} />
                </div>
                <div>
                  <Label>Smoothing {m.smoothing.toFixed(2)}</Label>
                  <Slider min={0} max={1} step={0.01} value={[m.smoothing]} onValueChange={(v) => updateMap(m.id, { smoothing: v[0] ?? 0 })} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

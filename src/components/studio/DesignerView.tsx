import {
  Dices,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Save,
  Star,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COLOR_COMBOS, COLOR_FAMILIES, NEON_COLORS } from "@/engine/colors";
import { ANIMATION_SPECS, BORDER_SPECS } from "@/engine/specs";
import type { BorderConfig, ParticlePreset } from "@/engine/types";
import { cn } from "@/lib/cn";
import { useStudio } from "@/store/studio";
import { ControlRow } from "./ControlRow";
import { OverlayCanvas } from "./OverlayCanvas";
import { getSharedAudio } from "./useSharedAudio";

const PARTICLE_PRESETS: ParticlePreset[] = [
  "sparks",
  "dust",
  "plasma",
  "embers",
  "electric",
  "rgb-pixels",
  "holographic",
  "paint",
];

export function DesignerView() {
  const project = useStudio((s) => s.project);
  const playing = useStudio((s) => s.playing);
  const fit = useStudio((s) => s.fit);
  const zoom = useStudio((s) => s.zoom);
  const fullscreen = useStudio((s) => s.fullscreen);
  const perf = useStudio((s) => s.perf);
  const settings = useStudio((s) => s.settings);
  const favorites = useStudio((s) => s.favorites);
  const setPlaying = useStudio((s) => s.setPlaying);
  const setFit = useStudio((s) => s.setFit);
  const setZoom = useStudio((s) => s.setZoom);
  const setFullscreen = useStudio((s) => s.setFullscreen);
  const setBorderType = useStudio((s) => s.setBorderType);
  const patchBorder = useStudio((s) => s.patchBorder);
  const patchColors = useStudio((s) => s.patchColors);
  const patchGlow = useStudio((s) => s.patchGlow);
  const patchParticles = useStudio((s) => s.patchParticles);
  const toggleAnimation = useStudio((s) => s.toggleAnimation);
  const patchAnimation = useStudio((s) => s.patchAnimation);
  const generate = useStudio((s) => s.generate);
  const saveCurrent = useStudio((s) => s.saveCurrent);
  const patchProject = useStudio((s) => s.patchProject);
  const toggleFav = useStudio((s) => s.toggleFav);
  const setPerf = useStudio((s) => s.setPerf);
  const setAudioBands = useStudio((s) => s.setAudioBands);
  const [tab, setTab] = useState("border");

  const spec = BORDER_SPECS.find((b) => b.type === project.border.type)!;
  const bg =
    settings.previewBg === "checker" ? "checker" : settings.previewBg === "dark" ? "bg-structure-2" : "bg-structure";

  return (
    <div className="flex h-[calc(100dvh-56px)] flex-col md:h-dvh">
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-panel px-3 py-2">
        <Input
          className="h-9 max-w-56"
          value={project.name}
          onChange={(e) => patchProject({ name: e.target.value })}
        />
        <Badge variant="bronze">{spec.name}</Badge>
        <Badge variant="cyan">{project.canvas.width}×{project.canvas.height}</Badge>
        <div className="ml-auto flex flex-wrap items-center gap-1">
          <Button size="sm" variant="neon" onClick={() => { generate(); toast.success("Generated a new look"); }}>
            <Dices className="size-3.5" />
            Generate Neon
          </Button>
          <Button size="sm" variant="outline" onClick={generate}>Reroll</Button>
          <Button size="sm" onClick={() => { saveCurrent(); toast.success("Saved"); }}>
            <Save className="size-3.5" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
        <aside className="hidden min-h-0 border-r border-line bg-panel lg:block">
          <ScrollArea className="h-full">
            <div className="p-3">
              <p className="mb-2 text-[10px] tracking-[0.22em] text-bronze uppercase">Border styles</p>
              <div className="flex flex-col gap-1">
                {BORDER_SPECS.map((b) => {
                  const active = project.border.type === b.type;
                  const fav = favorites.borders.includes(b.type);
                  return (
                    <button
                      key={b.type}
                      type="button"
                      onClick={() => setBorderType(b.type)}
                      className={cn(
                        "flex min-h-11 items-start gap-2 rounded-lg px-2 py-2 text-left text-sm",
                        active ? "bg-raised glow-cyan" : "hover:bg-raised/60",
                      )}
                    >
                      <span className="font-mono text-[10px] text-bronze">{b.number}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-ivory">{b.name}</span>
                        <span className="block text-[11px] text-muted">{b.description}</span>
                      </span>
                      <Star
                        className={cn("mt-0.5 size-3.5", fav ? "fill-bronze text-bronze" : "text-muted")}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav("borders", b.type);
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              <Separator className="my-3" />
              <p className="mb-2 text-[10px] tracking-[0.22em] text-bronze uppercase">Animations</p>
              <div className="flex flex-col gap-1 pb-8">
                {ANIMATION_SPECS.map((a) => {
                  const on = project.animations.some((x) => x.type === a.type && x.enabled);
                  return (
                    <button
                      key={a.type}
                      type="button"
                      onClick={() => toggleAnimation(a.type)}
                      className={cn(
                        "flex min-h-10 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm",
                        on ? "bg-raised text-cyan" : "text-ivory-dim hover:bg-raised/60",
                      )}
                    >
                      <span className="font-mono text-[10px] text-bronze">{a.number}</span>
                      <span className="flex-1">{a.name}</span>
                      <Switch checked={on} onCheckedChange={() => toggleAnimation(a.type)} />
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </aside>

        <section className={cn("relative min-h-[240px] min-w-0", bg)}>
          <div className={cn("absolute inset-0 flex items-center justify-center overflow-hidden p-3", fit && "p-6")}>
            <div
              className="relative shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-line)_80%,transparent)]"
              style={
                fit
                  ? { width: "100%", height: "100%" }
                  : {
                      width: project.canvas.width * zoom,
                      height: project.canvas.height * zoom,
                    }
              }
            >
              <OverlayCanvas
                project={project}
                playing={playing}
                fill
                className="h-full w-full"
                audioEngine={getSharedAudio()}
                onPerf={setPerf}
                onAudio={setAudioBands}
              />
            </div>
          </div>
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <Button size="icon-sm" variant="outline" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => setFit(true)} aria-label="Fit">
              <RotateCcw className="size-3.5" />
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => setZoom(Math.max(0.1, zoom - 0.1))} aria-label="Zoom out">
              <ZoomOut className="size-3.5" />
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => setZoom(Math.min(2, zoom + 0.1))} aria-label="Zoom in">
              <ZoomIn className="size-3.5" />
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => setFullscreen(true)} aria-label="Fullscreen">
              <Maximize2 className="size-3.5" />
            </Button>
          </div>
          {settings.showFps ? (
            <div className="absolute right-3 bottom-3 rounded-md border border-line bg-structure/80 px-2 py-1 font-mono text-[10px] text-ivory-dim tabular-nums">
              {perf.fps.toFixed(0)} FPS · {perf.frameMs.toFixed(1)}ms · {perf.particles} p
            </div>
          ) : null}
        </section>

        <aside className="min-h-0 border-t border-line bg-panel lg:border-t-0 lg:border-l">
          <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
            <div className="border-b border-line px-2 py-2">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="border">Border</TabsTrigger>
                <TabsTrigger value="glow">Glow</TabsTrigger>
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="motion">Motion</TabsTrigger>
                <TabsTrigger value="fx">Particles</TabsTrigger>
              </TabsList>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 pb-24">
                <TabsContent value="border" className="mt-0">
                  <p className="mb-1 text-sm text-ivory">{spec.name}</p>
                  <p className="mb-3 text-xs text-muted">{spec.description}</p>
                  {spec.params.map((p) => (
                    <ControlRow
                      key={p.key}
                      spec={p}
                      value={Number(project.border[p.key as keyof BorderConfig] ?? 0)}
                      onChange={(v) => patchBorder({ [p.key]: v })}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="glow" className="mt-0">
                  <ControlRow spec={{ key: "coreWidth", label: "Core width", min: 0.4, max: 8, step: 0.1, tooltip: "Sharp neon core." }} value={project.glow.coreWidth} onChange={(v) => patchGlow({ coreWidth: v })} />
                  <ControlRow spec={{ key: "coreBrightness", label: "Core brightness", min: 0, max: 2, step: 0.01, tooltip: "Hot center." }} value={project.glow.coreBrightness} onChange={(v) => patchGlow({ coreBrightness: v })} />
                  <ControlRow spec={{ key: "innerRadius", label: "Inner glow radius", min: 0, max: 24, step: 0.5, tooltip: "Medium halo." }} value={project.glow.innerRadius} onChange={(v) => patchGlow({ innerRadius: v })} />
                  <ControlRow spec={{ key: "innerOpacity", label: "Inner glow opacity", min: 0, max: 1, step: 0.01, tooltip: "Inner halo opacity." }} value={project.glow.innerOpacity} onChange={(v) => patchGlow({ innerOpacity: v })} />
                  <ControlRow spec={{ key: "outerRadius", label: "Outer glow radius", min: 0, max: 80, step: 1, tooltip: "Atmospheric bloom. Keep modest for OBS." }} value={project.glow.outerRadius} onChange={(v) => patchGlow({ outerRadius: v })} />
                  <ControlRow spec={{ key: "outerOpacity", label: "Outer glow opacity", min: 0, max: 1, step: 0.01, tooltip: "Bloom opacity." }} value={project.glow.outerOpacity} onChange={(v) => patchGlow({ outerOpacity: v })} />
                </TabsContent>
                <TabsContent value="color" className="mt-0">
                  <ColorInspector />
                </TabsContent>
                <TabsContent value="motion" className="mt-0">
                  {ANIMATION_SPECS.map((a) => {
                    const cfg = project.animations.find((x) => x.type === a.type);
                    const on = !!cfg?.enabled;
                    return (
                      <div key={a.type} className="mb-3 rounded-lg border border-line p-2">
                        <div className="flex items-center gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-ivory">{a.name}</div>
                            <div className="text-[11px] text-muted">{a.description}</div>
                          </div>
                          <Switch checked={on} onCheckedChange={() => toggleAnimation(a.type)} />
                        </div>
                        {on && cfg ? (
                          <div className="mt-2">
                            <ControlRow spec={{ key: "speed", label: "Speed", min: 0, max: 4, step: 0.01, tooltip: "Playback rate." }} value={cfg.speed} onChange={(v) => patchAnimation(a.type, { speed: v })} />
                            <ControlRow spec={{ key: "intensity", label: "Intensity", min: 0, max: 1.5, step: 0.01, tooltip: "Effect strength." }} value={cfg.intensity} onChange={(v) => patchAnimation(a.type, { intensity: v })} />
                            <ControlRow spec={{ key: "frequency", label: "Frequency", min: 0.1, max: 4, step: 0.01, tooltip: "How often it fires." }} value={cfg.frequency} onChange={(v) => patchAnimation(a.type, { frequency: v })} />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </TabsContent>
                <TabsContent value="fx" className="mt-0">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm">Particles</span>
                    <Switch checked={project.particles.enabled} onCheckedChange={(v) => patchParticles({ enabled: v })} />
                  </div>
                  <div className="mb-3 grid grid-cols-2 gap-1">
                    {PARTICLE_PRESETS.map((p) => (
                      <Button
                        key={p}
                        size="sm"
                        variant={project.particles.preset === p ? "neon" : "outline"}
                        onClick={() => patchParticles({ preset: p })}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                  <ControlRow spec={{ key: "count", label: "Count", min: 0, max: 400, step: 1, tooltip: "Desired particle count." }} value={project.particles.count} onChange={(v) => patchParticles({ count: v })} />
                  <ControlRow spec={{ key: "size", label: "Size", min: 0.3, max: 8, step: 0.1, tooltip: "Particle radius." }} value={project.particles.size} onChange={(v) => patchParticles({ size: v })} />
                  <ControlRow spec={{ key: "speed", label: "Speed", min: 0, max: 160, step: 1, tooltip: "Launch speed." }} value={project.particles.speed} onChange={(v) => patchParticles({ speed: v })} />
                  <ControlRow spec={{ key: "lifetime", label: "Lifetime", min: 0.2, max: 4, step: 0.05, tooltip: "Seconds alive." }} value={project.particles.lifetime} onChange={(v) => patchParticles({ lifetime: v })} />
                  <ControlRow spec={{ key: "gravity", label: "Gravity", min: -80, max: 80, step: 1, tooltip: "Vertical acceleration." }} value={project.particles.gravity} onChange={(v) => patchParticles({ gravity: v })} />
                  <ControlRow spec={{ key: "turbulence", label: "Turbulence", min: 0, max: 2, step: 0.01, tooltip: "Noise on velocity." }} value={project.particles.turbulence} onChange={(v) => patchParticles({ turbulence: v })} />
                  <ControlRow spec={{ key: "glow", label: "Glow", min: 0, max: 2, step: 0.01, tooltip: "Particle bloom." }} value={project.particles.glow} onChange={(v) => patchParticles({ glow: v })} />
                  <ControlRow spec={{ key: "opacity", label: "Opacity", min: 0, max: 1, step: 0.01, tooltip: "Particle opacity." }} value={project.particles.opacity} onChange={(v) => patchParticles({ opacity: v })} />
                  <ControlRow spec={{ key: "audioResponse", label: "Audio response", min: 0, max: 2, step: 0.01, tooltip: "How hard audio drives spawn." }} value={project.particles.audioResponse} onChange={(v) => patchParticles({ audioResponse: v })} />
                  <p className="mt-2 text-[10px] tracking-wider text-muted uppercase">Max particles</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {([25, 50, 100, 250, 500, 1000] as const).map((n) => (
                      <Button key={n} size="sm" variant={project.particles.maxParticles === n ? "bronze" : "outline"} onClick={() => patchParticles({ maxParticles: n })}>
                        {n}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </aside>
      </div>

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="h-[90dvh] w-[min(96vw,1400px)] max-w-none overflow-hidden p-0">
          <div className={cn("h-full", bg)}>
            <OverlayCanvas project={project} playing={playing} fill className="h-full w-full" audioEngine={getSharedAudio()} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ColorInspector() {
  const project = useStudio((s) => s.project);
  const patchColors = useStudio((s) => s.patchColors);
  const toggleFav = useStudio((s) => s.toggleFav);
  const favorites = useStudio((s) => s.favorites);
  const [q, setQ] = useState("");
  const colors = useMemo(
    () => NEON_COLORS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.hex.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  const setRole = (role: "primary" | "secondary" | "accent", hex: string) => {
    if (role === "primary") {
      const stops = project.colors.gradientStops.map((s, i) => (i === 0 ? { ...s, color: hex } : s));
      patchColors({ primary: hex, gradientStops: stops.length ? stops : [{ offset: 0, color: hex }] });
    } else if (role === "secondary") {
      const stops = [...project.colors.gradientStops];
      if (stops.length < 2) stops.push({ offset: 1, color: hex });
      else stops[stops.length - 1] = { ...stops[stops.length - 1]!, color: hex };
      patchColors({ secondary: hex, gradientStops: stops });
    } else patchColors({ accent: hex });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {(["primary", "secondary", "accent"] as const).map((role) => (
          <label key={role} className="space-y-1 text-[10px] tracking-wider text-muted uppercase">
            {role}
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded-md border border-line bg-structure"
              value={project.colors[role]}
              onChange={(e) => setRole(role, e.target.value.toUpperCase())}
            />
            <Input
              className="h-8 font-mono text-[11px]"
              value={project.colors[role]}
              onChange={(e) => setRole(role, e.target.value)}
            />
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ivory-dim">Gradient</span>
        <Switch checked={project.colors.gradientEnabled} onCheckedChange={(v) => patchColors({ gradientEnabled: v })} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ivory-dim">Animate gradient</span>
        <Switch checked={project.colors.animateGradient} onCheckedChange={(v) => patchColors({ animateGradient: v })} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ivory-dim">Reverse</span>
        <Switch checked={project.colors.reverseGradient} onCheckedChange={(v) => patchColors({ reverseGradient: v })} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ivory-dim">Color reactive</span>
        <Switch checked={project.colors.colorReactive} onCheckedChange={(v) => patchColors({ colorReactive: v })} />
      </div>
      <ControlRow spec={{ key: "opacity", label: "Opacity", min: 0, max: 1, step: 0.01, tooltip: "Master color opacity." }} value={project.colors.opacity} onChange={(v) => patchColors({ opacity: v })} />
      <ControlRow spec={{ key: "saturation", label: "Saturation", min: 0, max: 2, step: 0.01, tooltip: "Color saturation." }} value={project.colors.saturation} onChange={(v) => patchColors({ saturation: v })} />
      <ControlRow spec={{ key: "brightness", label: "Brightness", min: 0.2, max: 2, step: 0.01, tooltip: "Color brightness." }} value={project.colors.brightness} onChange={(v) => patchColors({ brightness: v })} />
      <ControlRow spec={{ key: "gradientSpeed", label: "Gradient speed", min: 0, max: 2, step: 0.01, tooltip: "How fast the gradient travels." }} value={project.colors.gradientSpeed} onChange={(v) => patchColors({ gradientSpeed: v })} />
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          const combo = COLOR_COMBOS[Math.floor(Math.random() * COLOR_COMBOS.length)]!;
          patchColors({
            primary: combo.colors[0]!,
            secondary: combo.colors[1] ?? combo.colors[0]!,
            accent: combo.colors[2] ?? combo.colors[0]!,
            gradientStops: combo.colors.map((c, i) => ({
              offset: combo.colors.length === 1 ? 0 : i / (combo.colors.length - 1),
              color: c,
            })),
          });
        }}
      >
        Randomize palette
      </Button>
      <p className="text-[10px] tracking-[0.22em] text-bronze uppercase">Combinations</p>
      <div className="flex flex-col gap-1">
        {COLOR_COMBOS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-raised"
            onClick={() =>
              patchColors({
                primary: c.colors[0]!,
                secondary: c.colors[1] ?? c.colors[0]!,
                accent: c.colors[2] ?? c.colors[0]!,
                gradientStops: c.colors.map((hex, i) => ({
                  offset: c.colors.length === 1 ? 0 : i / (c.colors.length - 1),
                  color: hex,
                })),
              })
            }
          >
            <div className="flex -space-x-1">
              {c.colors.map((hex) => (
                <span key={hex} className="size-4 rounded-full border border-line" style={{ background: hex }} />
              ))}
            </div>
            <span className="text-xs text-ivory">{c.name}</span>
          </button>
        ))}
      </div>
      <Input placeholder="Search colors" value={q} onChange={(e) => setQ(e.target.value)} />
      {COLOR_FAMILIES.map((f) => (
        <div key={f.id}>
          <p className="mb-1 text-[10px] tracking-[0.18em] text-muted uppercase">{f.label}</p>
          <div className="grid grid-cols-6 gap-1">
            {colors
              .filter((c) => c.family === f.id)
              .map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  className="size-8 rounded-md border border-line"
                  style={{ background: c.hex }}
                  onClick={() => setRole("primary", c.hex)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    toggleFav("colors", c.hex);
                  }}
                >
                  {favorites.colors.includes(c.hex) ? <Star className="mx-auto size-3 text-structure" /> : null}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

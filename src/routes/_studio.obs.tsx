import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { OverlayCanvas } from "@/components/studio/OverlayCanvas";
import { getSharedAudio } from "@/components/studio/useSharedAudio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OutputMode, QualityPreset } from "@/engine/types";
import { useStudio } from "@/store/studio";

export const Route = createFileRoute("/_studio/obs")({
  component: ObsPage,
});

const MODES: { id: OutputMode; label: string; hint: string }[] = [
  { id: "full-neon", label: "Full neon", hint: "Glow, particles, extras." },
  { id: "border-only", label: "Border only", hint: "Clean tube, no particles." },
  { id: "border-particles", label: "Border + particles", hint: "Edge plus sparks." },
  { id: "audio-reactive", label: "Audio reactive", hint: "Designed for live music." },
  { id: "cinematic", label: "Cinematic", hint: "Softer bloom, fewer particles." },
  { id: "performance", label: "Performance", hint: "OBS-safe, lower GPU." },
];

const QUALITY: QualityPreset[] = ["low", "medium", "high", "ultra"];

function ObsPage() {
  const project = useStudio((s) => s.project);
  const settings = useStudio((s) => s.settings);
  const playing = useStudio((s) => s.playing);
  const setOutputMode = useStudio((s) => s.setOutputMode);
  const setQuality = useStudio((s) => s.setQuality);
  const patchSettings = useStudio((s) => s.patchSettings);
  const patchProject = useStudio((s) => s.patchProject);
  const publishLive = useStudio((s) => s.publishLive);
  const [copied, setCopied] = useState(false);

  const overlayUrl = useMemo(() => {
    if (typeof window === "undefined") return "/overlay";
    return `${window.location.origin}/overlay`;
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(overlayUrl);
      setCopied(true);
      toast.success("Overlay URL copied");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy — select the URL instead");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-24 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Broadcast</p>
      <h1 className="font-display text-4xl tracking-wide text-ivory">OBS Output</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Add a Browser Source pointed at the overlay URL. Background is transparent. Publish Live pushes the current look.
      </p>

      <section className="mt-8 rounded-xl border border-line bg-panel p-4 md:p-6">
        <Label>Browser Source URL</Label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input readOnly value={overlayUrl} className="font-mono text-xs" />
          <Button onClick={() => void copy()}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy URL"}
          </Button>
          <Button
            variant="bronze"
            onClick={() => {
              publishLive();
              toast.success("Published to live overlay");
            }}
          >
            Publish Live
          </Button>
        </div>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>OBS → Sources → Add → Browser.</li>
          <li>Paste the URL. Width {settings.obsWidth}, height {settings.obsHeight}.</li>
          <li>FPS {settings.obsFps}. Leave “Shutdown source when not visible” unchecked.</li>
          <li>Custom CSS is optional — the overlay is already transparent.</li>
        </ol>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-line bg-panel p-4">
          <Label>Width</Label>
          <Input
            className="mt-2"
            type="number"
            value={settings.obsWidth}
            onChange={(e) => {
              const n = Number(e.target.value) || 1920;
              patchSettings({ obsWidth: n });
              patchProject({ canvas: { ...project.canvas, width: n } });
            }}
          />
        </div>
        <div className="rounded-xl border border-line bg-panel p-4">
          <Label>Height</Label>
          <Input
            className="mt-2"
            type="number"
            value={settings.obsHeight}
            onChange={(e) => {
              const n = Number(e.target.value) || 1080;
              patchSettings({ obsHeight: n });
              patchProject({ canvas: { ...project.canvas, height: n } });
            }}
          />
        </div>
        <div className="rounded-xl border border-line bg-panel p-4">
          <Label>FPS</Label>
          <div className="mt-2 flex gap-2">
            {([30, 60, 120] as const).map((fps) => (
              <Button
                key={fps}
                size="sm"
                variant={settings.obsFps === fps ? "neon" : "outline"}
                onClick={() => {
                  patchSettings({ obsFps: fps });
                  patchProject({ canvas: { ...project.canvas, fps } });
                }}
              >
                {fps}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-2xl tracking-wide text-ivory">Output mode</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setOutputMode(m.id)}
              className={
                project.outputMode === m.id
                  ? "rounded-xl border border-cyan/40 bg-cyan/10 p-4 text-left"
                  : "rounded-xl border border-line bg-panel p-4 text-left hover:border-bronze/40"
              }
            >
              <div className="font-medium text-ivory">{m.label}</div>
              <p className="mt-1 text-xs text-muted">{m.hint}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-2xl tracking-wide text-ivory">Quality</h2>
        <div className="flex flex-wrap gap-2">
          {QUALITY.map((q) => (
            <Button key={q} variant={project.quality === q ? "neon" : "outline"} onClick={() => setQuality(q)}>
              {q}
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-line">
        <div className="border-b border-line bg-panel px-4 py-3 text-xs tracking-[0.2em] text-bronze uppercase">
          Transparent preview
        </div>
        <div className="checker aspect-video">
          <OverlayCanvas
            project={project}
            playing={playing}
            fill
            transparent
            className="h-full w-full"
            audioEngine={getSharedAudio()}
          />
        </div>
      </section>
    </div>
  );
}

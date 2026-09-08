import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { PreviewBackground } from "@/engine/types";
import { useStudio } from "@/store/studio";

export const Route = createFileRoute("/_studio/settings")({
  component: SettingsPage,
});

const BACKGROUNDS: { id: PreviewBackground; label: string }[] = [
  { id: "checker", label: "Checker" },
  { id: "dark", label: "Dark" },
  { id: "black", label: "Black" },
];

function SettingsPage() {
  const settings = useStudio((s) => s.settings);
  const project = useStudio((s) => s.project);
  const patchSettings = useStudio((s) => s.patchSettings);
  const patchProject = useStudio((s) => s.patchProject);
  const exportJson = useStudio((s) => s.exportJson);
  const importJson = useStudio((s) => s.importJson);
  const fileRef = useRef<HTMLInputElement>(null);

  const download = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.blu-bgs.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Project exported");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-24 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Studio</p>
      <h1 className="font-display text-4xl tracking-wide text-ivory">Settings</h1>
      <p className="mt-2 text-sm text-muted">Preview chrome, canvas size, and project files. Saved on this device.</p>

      <section className="mt-8 rounded-xl border border-line bg-panel p-4 md:p-6">
        <h2 className="font-display text-2xl tracking-wide text-ivory">Preview</h2>
        <div className="mt-4">
          <Label>Background</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {BACKGROUNDS.map((b) => (
              <Button
                key={b.id}
                size="sm"
                variant={settings.previewBg === b.id ? "neon" : "outline"}
                onClick={() => patchSettings({ previewBg: b.id })}
              >
                {b.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-line px-3 py-2">
          <Label htmlFor="show-fps">Show FPS overlay</Label>
          <Switch id="show-fps" checked={settings.showFps} onCheckedChange={(v) => patchSettings({ showFps: v })} />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2">
          <div>
            <Label htmlFor="gpu">GPU-friendly preview</Label>
            <p className="text-xs text-muted">Stored preference for lower-power machines.</p>
          </div>
          <Switch id="gpu" checked={settings.gpuFriendly} onCheckedChange={(v) => patchSettings({ gpuFriendly: v })} />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-line bg-panel p-4 md:p-6">
        <h2 className="font-display text-2xl tracking-wide text-ivory">Canvas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Width</Label>
            <Input
              className="mt-2"
              type="number"
              value={project.canvas.width}
              onChange={(e) =>
                patchProject({ canvas: { ...project.canvas, width: Number(e.target.value) || 1920 } }, true)
              }
            />
          </div>
          <div>
            <Label>Height</Label>
            <Input
              className="mt-2"
              type="number"
              value={project.canvas.height}
              onChange={(e) =>
                patchProject({ canvas: { ...project.canvas, height: Number(e.target.value) || 1080 } }, true)
              }
            />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-line bg-panel p-4 md:p-6">
        <h2 className="font-display text-2xl tracking-wide text-ivory">Project file</h2>
        <p className="mt-1 text-sm text-muted">JSON you can share, archive, or drop into another session.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={download}>Export JSON</Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            Import JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              importJson(await file.text());
              toast.success("Project imported");
            }}
          />
        </div>
      </section>
    </div>
  );
}

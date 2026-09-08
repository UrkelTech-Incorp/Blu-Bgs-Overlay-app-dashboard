import { useNavigate } from "@tanstack/react-router";
import { Copy, FolderOpen, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BUILTIN_PRESETS, PRESET_CATEGORIES } from "@/engine/presets";
import { useStudio } from "@/store/studio";

export function DashboardView() {
  const navigate = useNavigate();
  const records = useStudio((s) => s.records);
  const newOverlay = useStudio((s) => s.newOverlay);
  const fromPreset = useStudio((s) => s.fromPreset);
  const loadProject = useStudio((s) => s.loadProject);
  const duplicateProject = useStudio((s) => s.duplicateProject);
  const deleteProject = useStudio((s) => s.deleteProject);
  const importJson = useStudio((s) => s.importJson);
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 pb-24 md:px-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Studio</p>
          <h1 className="font-display text-4xl tracking-[0.08em] text-ivory md:text-5xl">Dashboard</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Design transparent neon overlays for OBS Browser Sources. Create, preview, and publish without leaving the studio.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              newOverlay();
              void navigate({ to: "/designer" });
            }}
          >
            <Plus className="size-4" />
            New Overlay
          </Button>
          <Button variant="bronze" onClick={() => void navigate({ to: "/presets" })}>
            From Preset
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" />
            Import Project
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
              void navigate({ to: "/designer" });
            }}
          />
        </div>
      </header>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-wide text-ivory">Recent projects</h2>
          <span className="text-xs text-muted tabular-nums">{records.length} saved</span>
        </div>
        {records.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line px-6 py-16 text-center text-sm text-muted">
            No projects yet. Start with a new overlay or a preset.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {records.map((r) => (
              <article key={r.meta.id} className="overflow-hidden rounded-xl border border-line bg-panel">
                <div className="checker aspect-video">
                  {r.meta.thumbnail ? (
                    <img src={r.meta.thumbnail} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs tracking-widest text-muted uppercase">
                      {r.meta.name}
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="truncate font-medium text-ivory">{r.meta.name}</h3>
                    <p className="mt-1 text-xs text-muted tabular-nums">
                      {r.meta.resolution} · {new Date(r.meta.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => { loadProject(r.meta.id); void navigate({ to: "/designer" }); }}>
                      <FolderOpen className="size-3.5" />
                      Open
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => duplicateProject(r.meta.id)}>
                      <Copy className="size-3.5" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="ghost" className="text-danger" onClick={() => setPendingDelete(r.meta.id)}>
                      <Trash2 className="size-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl tracking-wide text-ivory">Preset categories</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESET_CATEGORIES.map((cat) => {
            const items = BUILTIN_PRESETS.filter((p) => p.category === cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (items[0]) fromPreset(items[0].id);
                  else void navigate({ to: "/presets" });
                }}
                className="rounded-xl border border-line bg-panel p-4 text-left transition-colors hover:border-bronze/50"
              >
                <div className="text-[10px] tracking-[0.22em] text-bronze uppercase">{String(items.length).padStart(2, "0")}</div>
                <div className="mt-1 font-display text-xl tracking-wide text-ivory">{cat}</div>
                <p className="mt-1 truncate text-xs text-muted">{items.map((i) => i.name.replace("BLU-BGS ", "")).join(" · ") || "Browse library"}</p>
              </button>
            );
          })}
        </div>
      </section>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete overlay?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone. The project file will be removed from this device.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-danger text-ivory hover:bg-danger/90"
              onClick={() => {
                if (pendingDelete) deleteProject(pendingDelete);
                toast.success("Deleted");
                setPendingDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

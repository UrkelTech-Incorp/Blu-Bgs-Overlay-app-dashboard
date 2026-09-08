import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OverlayCanvas } from "@/components/studio/OverlayCanvas";
import { getSharedAudio } from "@/components/studio/useSharedAudio";
import { createDefaultProject } from "@/engine/defaults";
import { readJson, sanitizeProject, STORAGE_LIVE } from "@/engine/project";
import type { OverlayProject } from "@/engine/types";
import { CHANNEL } from "@/store/studio";

export const Route = createFileRoute("/overlay")({
  ssr: false,
  component: OverlayPage,
});

function OverlayPage() {
  const [project, setProject] = useState<OverlayProject>(() => {
    const live = readJson<OverlayProject | null>(STORAGE_LIVE, null);
    return live ? sanitizeProject(live) : createDefaultProject({ name: "Live Overlay" });
  });

  useEffect(() => {
    document.documentElement.classList.add("overlay-mode");
    const engine = getSharedAudio();
    void engine.start(project.audio.enabled ? project.audio.source : "none");

    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel(CHANNEL);
      ch.onmessage = (ev: MessageEvent) => {
        if (ev.data?.type === "project" && ev.data.project) {
          setProject(sanitizeProject(ev.data.project));
        }
      };
    } catch {
      /* ignore */
    }

    const poll = async () => {
      try {
        const res = await fetch("/api/live?id=default");
        if (!res.ok) return;
        const data = (await res.json()) as { project?: OverlayProject | null };
        if (data.project) setProject(sanitizeProject(data.project));
      } catch {
        /* ignore */
      }
    };
    void poll();
    const timer = window.setInterval(() => void poll(), 1200);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_LIVE || !e.newValue) return;
      try {
        setProject(sanitizeProject(JSON.parse(e.newValue)));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      document.documentElement.classList.remove("overlay-mode");
      ch?.close();
      window.clearInterval(timer);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const engine = getSharedAudio();
    void engine.start(project.audio.enabled ? project.audio.source : "none");
  }, [project.audio.enabled, project.audio.source]);

  return (
    <OverlayCanvas
      project={project}
      playing
      fill
      transparent
      className="h-dvh w-dvw"
      audioEngine={getSharedAudio()}
    />
  );
}

import { useEffect, useState } from "react";
import { AudioEngine } from "@/engine/audio";
import { useStudio } from "@/store/studio";

let shared: AudioEngine | null = null;

export function getSharedAudio(): AudioEngine {
  if (!shared) shared = new AudioEngine();
  return shared;
}

export function useSharedAudio() {
  const [engine] = useState(() => getSharedAudio());
  const source = useStudio((s) => s.project.audio.source);
  const enabled = useStudio((s) => s.project.audio.enabled);

  useEffect(() => {
    const kind = enabled ? source : "none";
    void engine.start(kind);
    return () => {
      /* keep running across views */
    };
  }, [engine, source, enabled]);

  return engine;
}

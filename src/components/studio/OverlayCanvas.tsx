import { useEffect, useRef } from "react";
import { AudioEngine } from "@/engine/audio";
import { OverlayRenderer, type PerfStats } from "@/engine/renderer";
import { EMPTY_AUDIO, type AudioBands, type OverlayProject } from "@/engine/types";

interface OverlayCanvasProps {
  project: OverlayProject;
  playing?: boolean;
  className?: string;
  fill?: boolean;
  transparent?: boolean;
  onPerf?: (p: PerfStats) => void;
  onAudio?: (b: AudioBands) => void;
  audioEngine?: AudioEngine | null;
  dpr?: number;
}

export function OverlayCanvas({
  project,
  playing = true,
  className,
  fill,
  transparent,
  onPerf,
  onAudio,
  audioEngine,
  dpr,
}: OverlayCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<OverlayRenderer | null>(null);
  const projectRef = useRef(project);
  const playingRef = useRef(playing);
  const engineRef = useRef(audioEngine);
  projectRef.current = project;
  playingRef.current = playing;
  engineRef.current = audioEngine;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const renderer = new OverlayRenderer(canvas);
    rendererRef.current = renderer;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let acc = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const rawDt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!playingRef.current) {
        renderer.render(projectRef.current, { dt: 1 / 60, elapsed }, EMPTY_AUDIO);
        return;
      }
      const target = projectRef.current.canvas.fps || 60;
      acc += rawDt;
      const step = 1 / target;
      if (acc < step * 0.6 && target < 90) return;
      const dt = Math.min(acc, 0.1);
      acc = 0;
      elapsed += dt;
      let audioMs = 0;
      let bands = EMPTY_AUDIO;
      const eng = engineRef.current;
      if (eng) {
        const t0 = performance.now();
        bands = eng.update(dt);
        audioMs = performance.now() - t0;
      }
      onAudio?.(bands);
      renderer.render(projectRef.current, { dt, elapsed }, bands, audioMs);
      onPerf?.(renderer.stats);
    };

    const size = () => {
      const pw = wrap.clientWidth || projectRef.current.canvas.width;
      const ph = wrap.clientHeight || projectRef.current.canvas.height;
      if (fill) {
        renderer.resize(pw, ph, dpr ?? Math.min(2, window.devicePixelRatio || 1));
      } else {
        const { width, height } = projectRef.current.canvas;
        const scale = Math.min(pw / width, ph / height, 1);
        renderer.resize(Math.max(1, width * scale), Math.max(1, height * scale), dpr ?? 1);
      }
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(wrap);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [fill, dpr, onAudio, onPerf, transparent]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

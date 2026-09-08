import { EMPTY_AUDIO, type AudioBands, type AudioSource } from "./types";
import { clamp, lerp } from "./noise";

const SMOOTH = 0.22;

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private freq = new Uint8Array(0);
  private time = new Uint8Array(0);
  private bands: AudioBands = { ...EMPTY_AUDIO };
  private prevEnergy = 0;
  private dropHold = 0;
  private demoPhase = 0;
  sourceKind: AudioSource = "demo";
  running = false;
  error: string | null = null;

  getBands(): AudioBands {
    return this.bands;
  }

  async start(kind: AudioSource): Promise<void> {
    this.sourceKind = kind;
    this.error = null;
    this.stopCapture();
    if (kind === "none") {
      this.running = false;
      this.bands = { ...EMPTY_AUDIO };
      return;
    }
    this.running = true;
    if (kind === "mic") {
      try {
        await this.startMic();
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Microphone unavailable";
        this.sourceKind = "demo";
      }
    }
  }

  stop(): void {
    this.running = false;
    this.stopCapture();
    this.bands = { ...EMPTY_AUDIO };
  }

  private stopCapture(): void {
    this.source?.disconnect();
    this.source = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }

  private async startMic(): Promise<void> {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) {
      throw new Error("Media devices unavailable");
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      video: false,
    });
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") await ctx.resume();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.62;
    const src = ctx.createMediaStreamSource(stream);
    src.connect(analyser);
    this.analyser = analyser;
    this.source = src;
    this.stream = stream;
    this.freq = new Uint8Array(analyser.frequencyBinCount);
    this.time = new Uint8Array(analyser.fftSize);
  }

  private ensureContext(): AudioContext {
    if (!this.ctx) this.ctx = new AudioContext();
    return this.ctx;
  }

  update(dt: number): AudioBands {
    if (!this.running || this.sourceKind === "none") {
      this.bands = { ...EMPTY_AUDIO };
      return this.bands;
    }
    if (this.sourceKind === "mic" && this.analyser) {
      this.analyser.getByteFrequencyData(this.freq);
      this.analyser.getByteTimeDomainData(this.time);
      this.bands = this.smooth(this.fromAnalyser(), dt);
      return this.bands;
    }
    this.bands = this.smooth(this.fromDemo(dt), dt);
    return this.bands;
  }

  private fromAnalyser(): AudioBands {
    const freq = this.freq;
    const nyquist = (this.ctx?.sampleRate ?? 44100) / 2;
    const binHz = nyquist / freq.length;
    const band = (lo: number, hi: number) => {
      const a = Math.max(0, Math.floor(lo / binHz));
      const b = Math.min(freq.length - 1, Math.ceil(hi / binHz));
      let sum = 0;
      let n = 0;
      for (let i = a; i <= b; i++) {
        sum += freq[i];
        n++;
      }
      return n ? sum / n / 255 : 0;
    };
    let peak = 0;
    for (let i = 0; i < this.time.length; i++) {
      const v = Math.abs(this.time[i] - 128) / 128;
      if (v > peak) peak = v;
    }
    const bass = Math.pow(band(20, 140), 0.85);
    const mids = Math.pow(band(140, 2000), 0.9);
    const treble = Math.pow(band(2000, 12000), 0.95);
    const vocals = Math.pow(band(300, 3400), 0.9);
    const snareBand = band(150, 280);
    const energy = clamp((bass * 0.45 + mids * 0.3 + treble * 0.15 + peak * 0.4), 0, 1);
    const transient = clamp(energy - this.prevEnergy, 0, 1);
    this.prevEnergy = energy;
    const snare = clamp(snareBand * 1.4 + transient * 2.2, 0, 1);
    this.dropHold = Math.max(this.dropHold - 0.04, transient > 0.18 && bass > 0.55 ? 1 : 0);
    return {
      bass: clamp(bass, 0, 1),
      mids: clamp(mids, 0, 1),
      treble: clamp(treble, 0, 1),
      volume: clamp(peak * 1.2, 0, 1),
      energy,
      snare,
      vocals: clamp(vocals, 0, 1),
      drop: this.dropHold,
    };
  }

  private fromDemo(dt: number): AudioBands {
    this.demoPhase += dt;
    const bpm = 128;
    const beat = this.demoPhase * (bpm / 60);
    const beatPhase = beat % 4;
    const eighth = beat * 2;
    const kick = pulse(beat % 1, 0.08) + pulse((beat + 0.5) % 1, 0.05) * 0.25;
    const snareHit = pulse((beatPhase % 2) - 1, 0.07);
    const hat = pulse(eighth % 1, 0.04) * 0.55;
    const bar = beat % 16;
    const drop = bar > 12 ? lerp(0.2, 1, (bar - 12) / 4) : bar < 0.4 ? 0.85 : 0;
    const bassWave = 0.35 + 0.45 * Math.abs(Math.sin(this.demoPhase * 1.8)) + kick * 0.7;
    return {
      bass: clamp(bassWave, 0, 1),
      mids: clamp(0.25 + 0.3 * Math.abs(Math.sin(this.demoPhase * 3.1)) + snareHit * 0.5, 0, 1),
      treble: clamp(0.18 + hat + 0.2 * Math.abs(Math.sin(this.demoPhase * 7)), 0, 1),
      volume: clamp(0.3 + kick * 0.5 + snareHit * 0.3, 0, 1),
      energy: clamp(0.35 + kick * 0.45 + drop * 0.4, 0, 1),
      snare: clamp(snareHit, 0, 1),
      vocals: clamp(0.15 + 0.4 * Math.abs(Math.sin(this.demoPhase * 0.7)), 0, 1),
      drop: clamp(drop, 0, 1),
    };
  }

  private smooth(next: AudioBands, dt: number): AudioBands {
    const a = 1 - Math.pow(1 - SMOOTH, dt * 60);
    const out = { ...this.bands };
    (Object.keys(next) as (keyof AudioBands)[]).forEach((k) => {
      out[k] = lerp(out[k], next[k], k === "snare" || k === "drop" ? Math.min(1, a * 3) : a);
    });
    return out;
  }
}

function pulse(x: number, width: number): number {
  const d = Math.min(Math.abs(x), Math.abs(x - 1));
  return Math.max(0, 1 - d / width);
}

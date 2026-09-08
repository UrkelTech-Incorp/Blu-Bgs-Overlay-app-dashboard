import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as EMPTY_AUDIO, f as lerp, g as useStudio, u as clamp } from "./studio-D_OElsu4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSharedAudio-CBJHSb-c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var AudioEngine = class {
	ctx = null;
	analyser = null;
	source = null;
	stream = null;
	freq = /* @__PURE__ */ new Uint8Array(0);
	time = /* @__PURE__ */ new Uint8Array(0);
	bands = { ...EMPTY_AUDIO };
	prevEnergy = 0;
	dropHold = 0;
	demoPhase = 0;
	sourceKind = "demo";
	running = false;
	error = null;
	getBands() {
		return this.bands;
	}
	async start(kind) {
		this.sourceKind = kind;
		this.error = null;
		this.stopCapture();
		if (kind === "none") {
			this.running = false;
			this.bands = { ...EMPTY_AUDIO };
			return;
		}
		this.running = true;
		if (kind === "mic") try {
			await this.startMic();
		} catch (err) {
			this.error = err instanceof Error ? err.message : "Microphone unavailable";
			this.sourceKind = "demo";
		}
	}
	stop() {
		this.running = false;
		this.stopCapture();
		this.bands = { ...EMPTY_AUDIO };
	}
	stopCapture() {
		this.source?.disconnect();
		this.source = null;
		this.stream?.getTracks().forEach((t) => t.stop());
		this.stream = null;
	}
	async startMic() {
		if (typeof navigator === "undefined" || !navigator.mediaDevices) throw new Error("Media devices unavailable");
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: false,
				noiseSuppression: false,
				autoGainControl: false
			},
			video: false
		});
		const ctx = this.ensureContext();
		if (ctx.state === "suspended") await ctx.resume();
		const analyser = ctx.createAnalyser();
		analyser.fftSize = 2048;
		analyser.smoothingTimeConstant = .62;
		const src = ctx.createMediaStreamSource(stream);
		src.connect(analyser);
		this.analyser = analyser;
		this.source = src;
		this.stream = stream;
		this.freq = new Uint8Array(analyser.frequencyBinCount);
		this.time = new Uint8Array(analyser.fftSize);
	}
	ensureContext() {
		if (!this.ctx) this.ctx = new AudioContext();
		return this.ctx;
	}
	update(dt) {
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
	fromAnalyser() {
		const freq = this.freq;
		const binHz = (this.ctx?.sampleRate ?? 44100) / 2 / freq.length;
		const band = (lo, hi) => {
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
		const bass = Math.pow(band(20, 140), .85);
		const mids = Math.pow(band(140, 2e3), .9);
		const treble = Math.pow(band(2e3, 12e3), .95);
		const vocals = Math.pow(band(300, 3400), .9);
		const snareBand = band(150, 280);
		const energy = clamp(bass * .45 + mids * .3 + treble * .15 + peak * .4, 0, 1);
		const transient = clamp(energy - this.prevEnergy, 0, 1);
		this.prevEnergy = energy;
		const snare = clamp(snareBand * 1.4 + transient * 2.2, 0, 1);
		this.dropHold = Math.max(this.dropHold - .04, transient > .18 && bass > .55 ? 1 : 0);
		return {
			bass: clamp(bass, 0, 1),
			mids: clamp(mids, 0, 1),
			treble: clamp(treble, 0, 1),
			volume: clamp(peak * 1.2, 0, 1),
			energy,
			snare,
			vocals: clamp(vocals, 0, 1),
			drop: this.dropHold
		};
	}
	fromDemo(dt) {
		this.demoPhase += dt;
		const beat = this.demoPhase * (128 / 60);
		const beatPhase = beat % 4;
		const eighth = beat * 2;
		const kick = pulse(beat % 1, .08) + pulse((beat + .5) % 1, .05) * .25;
		const snareHit = pulse(beatPhase % 2 - 1, .07);
		const hat = pulse(eighth % 1, .04) * .55;
		const bar = beat % 16;
		const drop = bar > 12 ? lerp(.2, 1, (bar - 12) / 4) : bar < .4 ? .85 : 0;
		const bassWave = .35 + .45 * Math.abs(Math.sin(this.demoPhase * 1.8)) + kick * .7;
		return {
			bass: clamp(bassWave, 0, 1),
			mids: clamp(.25 + .3 * Math.abs(Math.sin(this.demoPhase * 3.1)) + snareHit * .5, 0, 1),
			treble: clamp(.18 + hat + .2 * Math.abs(Math.sin(this.demoPhase * 7)), 0, 1),
			volume: clamp(.3 + kick * .5 + snareHit * .3, 0, 1),
			energy: clamp(.35 + kick * .45 + drop * .4, 0, 1),
			snare: clamp(snareHit, 0, 1),
			vocals: clamp(.15 + .4 * Math.abs(Math.sin(this.demoPhase * .7)), 0, 1),
			drop: clamp(drop, 0, 1)
		};
	}
	smooth(next, dt) {
		const a = 1 - Math.pow(.78, dt * 60);
		const out = { ...this.bands };
		Object.keys(next).forEach((k) => {
			out[k] = lerp(out[k], next[k], k === "snare" || k === "drop" ? Math.min(1, a * 3) : a);
		});
		return out;
	}
};
function pulse(x, width) {
	const d = Math.min(Math.abs(x), Math.abs(x - 1));
	return Math.max(0, 1 - d / width);
}
var shared = null;
function getSharedAudio() {
	if (!shared) shared = new AudioEngine();
	return shared;
}
function useSharedAudio() {
	const [engine] = (0, import_react.useState)(() => getSharedAudio());
	const source = useStudio((s) => s.project.audio.source);
	const enabled = useStudio((s) => s.project.audio.enabled);
	(0, import_react.useEffect)(() => {
		const kind = enabled ? source : "none";
		engine.start(kind);
		return () => {};
	}, [
		engine,
		source,
		enabled
	]);
	return engine;
}
//#endregion
export { useSharedAudio as n, getSharedAudio as t };

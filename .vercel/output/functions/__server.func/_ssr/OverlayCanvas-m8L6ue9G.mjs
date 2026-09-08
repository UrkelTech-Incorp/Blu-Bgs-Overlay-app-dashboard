import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as EMPTY_AUDIO, s as OverlayRenderer } from "./studio-D_OElsu4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OverlayCanvas-m8L6ue9G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OverlayCanvas({ project, playing = true, className, fill, transparent, onPerf, onAudio, audioEngine, dpr }) {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const rendererRef = (0, import_react.useRef)(null);
	const projectRef = (0, import_react.useRef)(project);
	const playingRef = (0, import_react.useRef)(playing);
	const engineRef = (0, import_react.useRef)(audioEngine);
	projectRef.current = project;
	playingRef.current = playing;
	engineRef.current = audioEngine;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const renderer = new OverlayRenderer(canvas);
		rendererRef.current = renderer;
		let raf = 0;
		let last = performance.now();
		let elapsed = 0;
		let acc = 0;
		const loop = (now) => {
			raf = requestAnimationFrame(loop);
			const rawDt = Math.min(.1, (now - last) / 1e3);
			last = now;
			if (!playingRef.current) {
				renderer.render(projectRef.current, {
					dt: 1 / 60,
					elapsed
				}, EMPTY_AUDIO);
				return;
			}
			const target = projectRef.current.canvas.fps || 60;
			acc += rawDt;
			const step = 1 / target;
			if (acc < step * .6 && target < 90) return;
			const dt = Math.min(acc, .1);
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
			renderer.render(projectRef.current, {
				dt,
				elapsed
			}, bands, audioMs);
			onPerf?.(renderer.stats);
		};
		const size = () => {
			const pw = wrap.clientWidth || projectRef.current.canvas.width;
			const ph = wrap.clientHeight || projectRef.current.canvas.height;
			if (fill) renderer.resize(pw, ph, dpr ?? Math.min(2, window.devicePixelRatio || 1));
			else {
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
	}, [
		fill,
		dpr,
		onAudio,
		onPerf,
		transparent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapRef,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block h-full w-full"
		})
	});
}
//#endregion
export { OverlayCanvas as t };

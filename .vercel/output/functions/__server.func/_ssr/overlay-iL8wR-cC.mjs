import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as createDefaultProject, l as STORAGE_LIVE, m as sanitizeProject, n as CHANNEL, p as readJson } from "./studio-D_OElsu4.mjs";
import { t as getSharedAudio } from "./useSharedAudio-CBJHSb-c.mjs";
import { t as OverlayCanvas } from "./OverlayCanvas-m8L6ue9G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overlay-iL8wR-cC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OverlayPage() {
	const [project, setProject] = (0, import_react.useState)(() => {
		const live = readJson(STORAGE_LIVE, null);
		return live ? sanitizeProject(live) : createDefaultProject({ name: "Live Overlay" });
	});
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.add("overlay-mode");
		getSharedAudio().start(project.audio.enabled ? project.audio.source : "none");
		let ch = null;
		try {
			ch = new BroadcastChannel(CHANNEL);
			ch.onmessage = (ev) => {
				if (ev.data?.type === "project" && ev.data.project) setProject(sanitizeProject(ev.data.project));
			};
		} catch {}
		const poll = async () => {
			try {
				const res = await fetch("/api/live?id=default");
				if (!res.ok) return;
				const data = await res.json();
				if (data.project) setProject(sanitizeProject(data.project));
			} catch {}
		};
		poll();
		const timer = window.setInterval(() => void poll(), 1200);
		const onStorage = (e) => {
			if (e.key !== "blu-bgs-live-v1" || !e.newValue) return;
			try {
				setProject(sanitizeProject(JSON.parse(e.newValue)));
			} catch {}
		};
		window.addEventListener("storage", onStorage);
		return () => {
			document.documentElement.classList.remove("overlay-mode");
			ch?.close();
			window.clearInterval(timer);
			window.removeEventListener("storage", onStorage);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		getSharedAudio().start(project.audio.enabled ? project.audio.source : "none");
	}, [project.audio.enabled, project.audio.source]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayCanvas, {
		project,
		playing: true,
		fill: true,
		transparent: true,
		className: "h-dvh w-dvw",
		audioEngine: getSharedAudio()
	});
}
//#endregion
export { OverlayPage as component };

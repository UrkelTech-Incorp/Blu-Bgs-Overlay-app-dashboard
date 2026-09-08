import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { g as useStudio } from "./_ssr/studio-D_OElsu4.mjs";
import { C as Check, S as Copy } from "./_libs/lucide-react.mjs";
import { t as getSharedAudio } from "./_ssr/useSharedAudio-CBJHSb-c.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Label } from "./_ssr/label-xUgIN9lE.mjs";
import { t as Input } from "./_ssr/input-CsKN3kja.mjs";
import { t as OverlayCanvas } from "./_ssr/OverlayCanvas-m8L6ue9G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.obs-B7JbWjE0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODES = [
	{
		id: "full-neon",
		label: "Full neon",
		hint: "Glow, particles, extras."
	},
	{
		id: "border-only",
		label: "Border only",
		hint: "Clean tube, no particles."
	},
	{
		id: "border-particles",
		label: "Border + particles",
		hint: "Edge plus sparks."
	},
	{
		id: "audio-reactive",
		label: "Audio reactive",
		hint: "Designed for live music."
	},
	{
		id: "cinematic",
		label: "Cinematic",
		hint: "Softer bloom, fewer particles."
	},
	{
		id: "performance",
		label: "Performance",
		hint: "OBS-safe, lower GPU."
	}
];
var QUALITY = [
	"low",
	"medium",
	"high",
	"ultra"
];
function ObsPage() {
	const project = useStudio((s) => s.project);
	const settings = useStudio((s) => s.settings);
	const playing = useStudio((s) => s.playing);
	const setOutputMode = useStudio((s) => s.setOutputMode);
	const setQuality = useStudio((s) => s.setQuality);
	const patchSettings = useStudio((s) => s.patchSettings);
	const patchProject = useStudio((s) => s.patchProject);
	const publishLive = useStudio((s) => s.publishLive);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const overlayUrl = (0, import_react.useMemo)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8 pb-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.28em] text-bronze uppercase",
				children: "Broadcast"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide text-ivory",
				children: "OBS Output"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Add a Browser Source pointed at the overlay URL. Background is transparent. Publish Live pushes the current look."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-line bg-panel p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Browser Source URL" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-col gap-2 sm:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								readOnly: true,
								value: overlayUrl,
								className: "font-mono text-xs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void copy(),
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy URL"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "bronze",
								onClick: () => {
									publishLive();
									toast.success("Published to live overlay");
								},
								children: "Publish Live"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-4 list-decimal space-y-1 pl-5 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "OBS → Sources → Add → Browser." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Paste the URL. Width ",
								settings.obsWidth,
								", height ",
								settings.obsHeight,
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"FPS ",
								settings.obsFps,
								". Leave “Shutdown source when not visible” unchecked."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Custom CSS is optional — the overlay is already transparent." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-panel p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Width" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							type: "number",
							value: settings.obsWidth,
							onChange: (e) => {
								const n = Number(e.target.value) || 1920;
								patchSettings({ obsWidth: n });
								patchProject({ canvas: {
									...project.canvas,
									width: n
								} });
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-panel p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Height" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							type: "number",
							value: settings.obsHeight,
							onChange: (e) => {
								const n = Number(e.target.value) || 1080;
								patchSettings({ obsHeight: n });
								patchProject({ canvas: {
									...project.canvas,
									height: n
								} });
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-panel p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "FPS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: [
								30,
								60,
								120
							].map((fps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: settings.obsFps === fps ? "neon" : "outline",
								onClick: () => {
									patchSettings({ obsFps: fps });
									patchProject({ canvas: {
										...project.canvas,
										fps
									} });
								},
								children: fps
							}, fps))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-2xl tracking-wide text-ivory",
					children: "Output mode"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOutputMode(m.id),
						className: project.outputMode === m.id ? "rounded-xl border border-cyan/40 bg-cyan/10 p-4 text-left" : "rounded-xl border border-line bg-panel p-4 text-left hover:border-bronze/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-ivory",
							children: m.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: m.hint
						})]
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-2xl tracking-wide text-ivory",
					children: "Quality"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: QUALITY.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: project.quality === q ? "neon" : "outline",
						onClick: () => setQuality(q),
						children: q
					}, q))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 overflow-hidden rounded-xl border border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-line bg-panel px-4 py-3 text-xs tracking-[0.2em] text-bronze uppercase",
					children: "Transparent preview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "checker aspect-video",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayCanvas, {
						project,
						playing,
						fill: true,
						transparent: true,
						className: "h-full w-full",
						audioEngine: getSharedAudio()
					})
				})]
			})
		]
	});
}
//#endregion
export { ObsPage as component };

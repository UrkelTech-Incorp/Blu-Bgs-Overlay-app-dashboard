import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { g as useStudio } from "./_ssr/studio-D_OElsu4.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Label } from "./_ssr/label-xUgIN9lE.mjs";
import { t as Switch } from "./_ssr/switch-DI6PPaDP.mjs";
import { t as Input } from "./_ssr/input-CsKN3kja.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.settings-CMrXNdrn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BACKGROUNDS = [
	{
		id: "checker",
		label: "Checker"
	},
	{
		id: "dark",
		label: "Dark"
	},
	{
		id: "black",
		label: "Black"
	}
];
function SettingsPage() {
	const settings = useStudio((s) => s.settings);
	const project = useStudio((s) => s.project);
	const patchSettings = useStudio((s) => s.patchSettings);
	const patchProject = useStudio((s) => s.patchProject);
	const exportJson = useStudio((s) => s.exportJson);
	const importJson = useStudio((s) => s.importJson);
	const fileRef = (0, import_react.useRef)(null);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8 pb-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.28em] text-bronze uppercase",
				children: "Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide text-ivory",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Preview chrome, canvas size, and project files. Saved on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-line bg-panel p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide text-ivory",
						children: "Preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: BACKGROUNDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: settings.previewBg === b.id ? "neon" : "outline",
								onClick: () => patchSettings({ previewBg: b.id }),
								children: b.label
							}, b.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between rounded-lg border border-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "show-fps",
							children: "Show FPS overlay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "show-fps",
							checked: settings.showFps,
							onCheckedChange: (v) => patchSettings({ showFps: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "gpu",
							children: "GPU-friendly preview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Stored preference for lower-power machines."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "gpu",
							checked: settings.gpuFriendly,
							onCheckedChange: (v) => patchSettings({ gpuFriendly: v })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-line bg-panel p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide text-ivory",
					children: "Canvas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Width" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						type: "number",
						value: project.canvas.width,
						onChange: (e) => patchProject({ canvas: {
							...project.canvas,
							width: Number(e.target.value) || 1920
						} }, true)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Height" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						type: "number",
						value: project.canvas.height,
						onChange: (e) => patchProject({ canvas: {
							...project.canvas,
							height: Number(e.target.value) || 1080
						} }, true)
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-line bg-panel p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide text-ivory",
						children: "Project file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "JSON you can share, archive, or drop into another session."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: download,
								children: "Export JSON"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => fileRef.current?.click(),
								children: "Import JSON"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "application/json",
								className: "hidden",
								onChange: async (e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									importJson(await file.text());
									toast.success("Project imported");
								}
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };

import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { g as useStudio, h as uid } from "./_ssr/studio-D_OElsu4.mjs";
import { i as PROPERTY_LABELS, n as BAND_LABELS } from "./_ssr/specs-CPR9pTih.mjs";
import { f as Plus, o as Trash2 } from "./_libs/lucide-react.mjs";
import { t as Label } from "./_ssr/label-xUgIN9lE.mjs";
import { t as Slider } from "./_ssr/slider-CY95qrtc.mjs";
import { t as Switch } from "./_ssr/switch-DI6PPaDP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.audio-B81dM__y.js
var import_jsx_runtime = require_jsx_runtime();
var BANDS = Object.keys(BAND_LABELS);
var PROPERTIES = Object.keys(PROPERTY_LABELS);
var CURVES = [
	"linear",
	"ease-in",
	"ease-out",
	"exponential"
];
var SOURCES = [
	{
		id: "demo",
		label: "Demo beat",
		hint: "Synthetic pulse so you can design without a mic."
	},
	{
		id: "mic",
		label: "Microphone",
		hint: "Live input — grant permission when the browser asks."
	},
	{
		id: "none",
		label: "Off",
		hint: "Freeze the overlay with no audio motion."
	}
];
function AudioPage() {
	const project = useStudio((s) => s.project);
	const bands = useStudio((s) => s.audioBands);
	const patchAudio = useStudio((s) => s.patchAudio);
	const setAudioSource = useStudio((s) => s.setAudioSource);
	const updateMap = (id, partial) => {
		patchAudio({ mappings: project.audio.mappings.map((m) => m.id === id ? {
			...m,
			...partial
		} : m) });
	};
	const addMap = () => {
		const next = {
			id: uid("map"),
			enabled: true,
			band: "bass",
			property: "glow",
			min: 0,
			max: 1,
			smoothing: .3,
			curve: "linear"
		};
		patchAudio({ mappings: [...project.audio.mappings, next] }, true);
	};
	const removeMap = (id) => {
		patchAudio({ mappings: project.audio.mappings.filter((m) => m.id !== id) }, true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8 pb-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.28em] text-bronze uppercase",
				children: "Reactive"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide text-ivory",
				children: "Audio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Map frequency bands to neon properties. Bass thickens the tube, snares flash, energy feeds particles."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-line bg-panel p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-wide text-ivory",
							children: "Source"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "audio-on",
								children: "Enabled"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "audio-on",
								checked: project.audio.enabled,
								onCheckedChange: (v) => patchAudio({ enabled: v }, true)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAudioSource(s.id),
							className: project.audio.source === s.id ? "rounded-xl border border-cyan/40 bg-cyan/10 p-4 text-left" : "rounded-xl border border-line bg-structure-2 p-4 text-left hover:border-bronze/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-ivory",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: s.hint
							})]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between rounded-lg border border-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "color-reactive",
							children: "Color reactive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "color-reactive",
							checked: project.audio.colorReactive,
							onCheckedChange: (v) => patchAudio({ colorReactive: v })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-line bg-panel p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide text-ivory",
					children: "Live bands"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-4 gap-3 md:grid-cols-8",
					children: BANDS.map((b) => {
						const v = bands[b];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-24 w-full overflow-hidden rounded-md bg-raised",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-x-1 bottom-1 rounded-sm bg-cyan",
										style: {
											height: `${Math.round(Math.min(1, v) * 100)}%`,
											opacity: .35 + v * .65
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] tracking-wider text-muted uppercase",
									children: BAND_LABELS[b]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-ivory-dim tabular-nums",
									children: v.toFixed(2)
								})
							]
						}, b);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-wide text-ivory",
						children: "Mappings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: addMap,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add mapping"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: project.audio.mappings.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-line bg-panel p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: m.enabled,
									onCheckedChange: (v) => updateMap(m.id, { enabled: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-9 rounded-md border border-line bg-structure-2 px-2 text-sm text-ivory",
									value: m.band,
									onChange: (e) => updateMap(m.id, { band: e.target.value }),
									children: BANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: b,
										children: BAND_LABELS[b]
									}, b))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: "→"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-9 min-w-0 flex-1 rounded-md border border-line bg-structure-2 px-2 text-sm text-ivory",
									value: m.property,
									onChange: (e) => updateMap(m.id, { property: e.target.value }),
									children: PROPERTIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p,
										children: PROPERTY_LABELS[p]
									}, p))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-9 rounded-md border border-line bg-structure-2 px-2 text-sm text-ivory",
									value: m.curve,
									onChange: (e) => updateMap(m.id, { curve: e.target.value }),
									children: CURVES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon-sm",
									variant: "ghost",
									className: "text-danger",
									onClick: () => removeMap(m.id),
									"aria-label": "Remove mapping",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-3 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Min ", m.min.toFixed(2)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 1,
									step: .01,
									value: [m.min],
									onValueChange: (v) => updateMap(m.id, { min: v[0] ?? 0 })
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Max ", m.max.toFixed(2)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 1,
									step: .01,
									value: [m.max],
									onValueChange: (v) => updateMap(m.id, { max: v[0] ?? 1 })
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Smoothing ", m.smoothing.toFixed(2)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 1,
									step: .01,
									value: [m.smoothing],
									onValueChange: (v) => updateMap(m.id, { smoothing: v[0] ?? 0 })
								})] })
							]
						})]
					}, m.id))
				})]
			})
		]
	});
}
//#endregion
export { AudioPage as component };

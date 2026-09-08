import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { g as useStudio, i as COLOR_FAMILIES, o as NEON_COLORS, r as COLOR_COMBOS } from "./_ssr/studio-D_OElsu4.mjs";
import { r as BORDER_SPECS, t as ANIMATION_SPECS } from "./_ssr/specs-CPR9pTih.mjs";
import { E as AudioLines, _ as Maximize2, d as RotateCcw, h as Pause, n as ZoomOut, p as Play, s as Star, t as ZoomIn, u as Save, x as Dices } from "./_libs/lucide-react.mjs";
import { i as TooltipContent, n as DialogContent, o as TooltipTrigger, r as Tooltip, t as Dialog } from "./_ssr/tooltip-BvYxW3Xu.mjs";
import { t as getSharedAudio } from "./_ssr/useSharedAudio-CBJHSb-c.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Label } from "./_ssr/label-xUgIN9lE.mjs";
import { t as Slider } from "./_ssr/slider-CY95qrtc.mjs";
import { t as Switch } from "./_ssr/switch-DI6PPaDP.mjs";
import { t as Input } from "./_ssr/input-CsKN3kja.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-DTguQKq_.mjs";
import { t as OverlayCanvas } from "./_ssr/OverlayCanvas-m8L6ue9G.mjs";
import { i as Viewport, n as ScrollAreaScrollbar, r as ScrollAreaThumb, t as Root } from "./_libs/radix-ui__react-scroll-area.mjs";
import { t as Root$1 } from "./_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.designer-D_xhHbKJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase", {
	variants: { variant: {
		default: "border-line text-ivory-dim",
		bronze: "border-bronze/40 text-bronze",
		cyan: "border-cyan/40 text-cyan",
		magenta: "border-magenta/40 text-magenta"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
		orientation: "vertical",
		className: "flex touch-none select-none p-0.5 transition-colors",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-line-strong" })
	})]
}));
ScrollArea.displayName = "ScrollArea";
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-line", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = "Separator";
function ControlRow({ spec, value, onChange, onCommit, mapped, onToggleMap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 py-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "truncate",
					children: spec.label
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: spec.tooltip })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [onToggleMap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: mapped ? "neon" : "ghost",
					className: "size-6",
					onClick: onToggleMap,
					"aria-label": "Audio map",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioLines, { className: "size-3" })
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					className: "size-6",
					onClick: () => onChange((spec.min + spec.max) / 2),
					"aria-label": `Reset ${spec.label}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: spec.min,
				max: spec.max,
				step: spec.step,
				value: [value],
				onValueChange: (v) => onChange(v[0] ?? value),
				onValueCommit: () => onCommit?.(),
				className: "col-span-1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "h-7 w-16 px-1.5 text-right font-mono text-[11px] tabular-nums",
				value: Number.isInteger(spec.step) ? String(Math.round(value)) : value.toFixed(2),
				onChange: (e) => {
					const n = Number(e.target.value);
					if (!Number.isNaN(n)) onChange(n);
				},
				onBlur: () => onCommit?.()
			})
		]
	});
}
var PARTICLE_PRESETS = [
	"sparks",
	"dust",
	"plasma",
	"embers",
	"electric",
	"rgb-pixels",
	"holographic",
	"paint"
];
function DesignerView() {
	const project = useStudio((s) => s.project);
	const playing = useStudio((s) => s.playing);
	const fit = useStudio((s) => s.fit);
	const zoom = useStudio((s) => s.zoom);
	const fullscreen = useStudio((s) => s.fullscreen);
	const perf = useStudio((s) => s.perf);
	const settings = useStudio((s) => s.settings);
	const favorites = useStudio((s) => s.favorites);
	const setPlaying = useStudio((s) => s.setPlaying);
	const setFit = useStudio((s) => s.setFit);
	const setZoom = useStudio((s) => s.setZoom);
	const setFullscreen = useStudio((s) => s.setFullscreen);
	const setBorderType = useStudio((s) => s.setBorderType);
	const patchBorder = useStudio((s) => s.patchBorder);
	useStudio((s) => s.patchColors);
	const patchGlow = useStudio((s) => s.patchGlow);
	const patchParticles = useStudio((s) => s.patchParticles);
	const toggleAnimation = useStudio((s) => s.toggleAnimation);
	const patchAnimation = useStudio((s) => s.patchAnimation);
	const generate = useStudio((s) => s.generate);
	const saveCurrent = useStudio((s) => s.saveCurrent);
	const patchProject = useStudio((s) => s.patchProject);
	const toggleFav = useStudio((s) => s.toggleFav);
	const setPerf = useStudio((s) => s.setPerf);
	const setAudioBands = useStudio((s) => s.setAudioBands);
	const [tab, setTab] = (0, import_react.useState)("border");
	const spec = BORDER_SPECS.find((b) => b.type === project.border.type);
	const bg = settings.previewBg === "checker" ? "checker" : settings.previewBg === "dark" ? "bg-structure-2" : "bg-structure";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100dvh-56px)] flex-col md:h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-line bg-panel px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "h-9 max-w-56",
						value: project.name,
						onChange: (e) => patchProject({ name: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "bronze",
						children: spec.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "cyan",
						children: [
							project.canvas.width,
							"×",
							project.canvas.height
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex flex-wrap items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "neon",
								onClick: () => {
									generate();
									toast.success("Generated a new look");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-3.5" }), "Generate Neon"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: generate,
								children: "Reroll"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => {
									saveCurrent();
									toast.success("Saved");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), "Save"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden min-h-0 border-r border-line bg-panel lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							className: "h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-[10px] tracking-[0.22em] text-bronze uppercase",
										children: "Border styles"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-1",
										children: BORDER_SPECS.map((b) => {
											const active = project.border.type === b.type;
											const fav = favorites.borders.includes(b.type);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setBorderType(b.type),
												className: cn("flex min-h-11 items-start gap-2 rounded-lg px-2 py-2 text-left text-sm", active ? "bg-raised glow-cyan" : "hover:bg-raised/60"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] text-bronze",
														children: b.number
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "min-w-0 flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-ivory",
															children: b.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-[11px] text-muted",
															children: b.description
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
														className: cn("mt-0.5 size-3.5", fav ? "fill-bronze text-bronze" : "text-muted"),
														onClick: (e) => {
															e.stopPropagation();
															toggleFav("borders", b.type);
														}
													})
												]
											}, b.type);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-[10px] tracking-[0.22em] text-bronze uppercase",
										children: "Animations"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-1 pb-8",
										children: ANIMATION_SPECS.map((a) => {
											const on = project.animations.some((x) => x.type === a.type && x.enabled);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => toggleAnimation(a.type),
												className: cn("flex min-h-10 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm", on ? "bg-raised text-cyan" : "text-ivory-dim hover:bg-raised/60"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[10px] text-bronze",
														children: a.number
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "flex-1",
														children: a.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
														checked: on,
														onCheckedChange: () => toggleAnimation(a.type)
													})
												]
											}, a.type);
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn("relative min-h-[240px] min-w-0", bg),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("absolute inset-0 flex items-center justify-center overflow-hidden p-3", fit && "p-6"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-line)_80%,transparent)]",
									style: fit ? {
										width: "100%",
										height: "100%"
									} : {
										width: project.canvas.width * zoom,
										height: project.canvas.height * zoom
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayCanvas, {
										project,
										playing,
										fill: true,
										className: "h-full w-full",
										audioEngine: getSharedAudio(),
										onPerf: setPerf,
										onAudio: setAudioBands
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-3 left-3 flex flex-wrap gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon-sm",
										variant: "outline",
										onClick: () => setPlaying(!playing),
										"aria-label": playing ? "Pause" : "Play",
										children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon-sm",
										variant: "outline",
										onClick: () => setFit(true),
										"aria-label": "Fit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon-sm",
										variant: "outline",
										onClick: () => setZoom(Math.max(.1, zoom - .1)),
										"aria-label": "Zoom out",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon-sm",
										variant: "outline",
										onClick: () => setZoom(Math.min(2, zoom + .1)),
										"aria-label": "Zoom in",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon-sm",
										variant: "outline",
										onClick: () => setFullscreen(true),
										"aria-label": "Fullscreen",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3.5" })
									})
								]
							}),
							settings.showFps ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-3 bottom-3 rounded-md border border-line bg-structure/80 px-2 py-1 font-mono text-[10px] text-ivory-dim tabular-nums",
								children: [
									perf.fps.toFixed(0),
									" FPS · ",
									perf.frameMs.toFixed(1),
									"ms · ",
									perf.particles,
									" p"
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "min-h-0 border-t border-line bg-panel lg:border-t-0 lg:border-l",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							value: tab,
							onValueChange: setTab,
							className: "flex h-full flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-line px-2 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "w-full justify-start overflow-x-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "border",
											children: "Border"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "glow",
											children: "Glow"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "color",
											children: "Color"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "motion",
											children: "Motion"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "fx",
											children: "Particles"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 pb-24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "border",
											className: "mt-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mb-1 text-sm text-ivory",
													children: spec.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mb-3 text-xs text-muted",
													children: spec.description
												}),
												spec.params.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: p,
													value: Number(project.border[p.key] ?? 0),
													onChange: (v) => patchBorder({ [p.key]: v })
												}, p.key))
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "glow",
											className: "mt-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "coreWidth",
														label: "Core width",
														min: .4,
														max: 8,
														step: .1,
														tooltip: "Sharp neon core."
													},
													value: project.glow.coreWidth,
													onChange: (v) => patchGlow({ coreWidth: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "coreBrightness",
														label: "Core brightness",
														min: 0,
														max: 2,
														step: .01,
														tooltip: "Hot center."
													},
													value: project.glow.coreBrightness,
													onChange: (v) => patchGlow({ coreBrightness: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "innerRadius",
														label: "Inner glow radius",
														min: 0,
														max: 24,
														step: .5,
														tooltip: "Medium halo."
													},
													value: project.glow.innerRadius,
													onChange: (v) => patchGlow({ innerRadius: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "innerOpacity",
														label: "Inner glow opacity",
														min: 0,
														max: 1,
														step: .01,
														tooltip: "Inner halo opacity."
													},
													value: project.glow.innerOpacity,
													onChange: (v) => patchGlow({ innerOpacity: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "outerRadius",
														label: "Outer glow radius",
														min: 0,
														max: 80,
														step: 1,
														tooltip: "Atmospheric bloom. Keep modest for OBS."
													},
													value: project.glow.outerRadius,
													onChange: (v) => patchGlow({ outerRadius: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "outerOpacity",
														label: "Outer glow opacity",
														min: 0,
														max: 1,
														step: .01,
														tooltip: "Bloom opacity."
													},
													value: project.glow.outerOpacity,
													onChange: (v) => patchGlow({ outerOpacity: v })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
											value: "color",
											className: "mt-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInspector, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
											value: "motion",
											className: "mt-0",
											children: ANIMATION_SPECS.map((a) => {
												const cfg = project.animations.find((x) => x.type === a.type);
												const on = !!cfg?.enabled;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-3 rounded-lg border border-line p-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0 flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm text-ivory",
																children: a.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[11px] text-muted",
																children: a.description
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
															checked: on,
															onCheckedChange: () => toggleAnimation(a.type)
														})]
													}), on && cfg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
																spec: {
																	key: "speed",
																	label: "Speed",
																	min: 0,
																	max: 4,
																	step: .01,
																	tooltip: "Playback rate."
																},
																value: cfg.speed,
																onChange: (v) => patchAnimation(a.type, { speed: v })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
																spec: {
																	key: "intensity",
																	label: "Intensity",
																	min: 0,
																	max: 1.5,
																	step: .01,
																	tooltip: "Effect strength."
																},
																value: cfg.intensity,
																onChange: (v) => patchAnimation(a.type, { intensity: v })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
																spec: {
																	key: "frequency",
																	label: "Frequency",
																	min: .1,
																	max: 4,
																	step: .01,
																	tooltip: "How often it fires."
																},
																value: cfg.frequency,
																onChange: (v) => patchAnimation(a.type, { frequency: v })
															})
														]
													}) : null]
												}, a.type);
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
											value: "fx",
											className: "mt-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-3 flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm",
														children: "Particles"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
														checked: project.particles.enabled,
														onCheckedChange: (v) => patchParticles({ enabled: v })
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-3 grid grid-cols-2 gap-1",
													children: PARTICLE_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "sm",
														variant: project.particles.preset === p ? "neon" : "outline",
														onClick: () => patchParticles({ preset: p }),
														children: p
													}, p))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "count",
														label: "Count",
														min: 0,
														max: 400,
														step: 1,
														tooltip: "Desired particle count."
													},
													value: project.particles.count,
													onChange: (v) => patchParticles({ count: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "size",
														label: "Size",
														min: .3,
														max: 8,
														step: .1,
														tooltip: "Particle radius."
													},
													value: project.particles.size,
													onChange: (v) => patchParticles({ size: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "speed",
														label: "Speed",
														min: 0,
														max: 160,
														step: 1,
														tooltip: "Launch speed."
													},
													value: project.particles.speed,
													onChange: (v) => patchParticles({ speed: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "lifetime",
														label: "Lifetime",
														min: .2,
														max: 4,
														step: .05,
														tooltip: "Seconds alive."
													},
													value: project.particles.lifetime,
													onChange: (v) => patchParticles({ lifetime: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "gravity",
														label: "Gravity",
														min: -80,
														max: 80,
														step: 1,
														tooltip: "Vertical acceleration."
													},
													value: project.particles.gravity,
													onChange: (v) => patchParticles({ gravity: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "turbulence",
														label: "Turbulence",
														min: 0,
														max: 2,
														step: .01,
														tooltip: "Noise on velocity."
													},
													value: project.particles.turbulence,
													onChange: (v) => patchParticles({ turbulence: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "glow",
														label: "Glow",
														min: 0,
														max: 2,
														step: .01,
														tooltip: "Particle bloom."
													},
													value: project.particles.glow,
													onChange: (v) => patchParticles({ glow: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "opacity",
														label: "Opacity",
														min: 0,
														max: 1,
														step: .01,
														tooltip: "Particle opacity."
													},
													value: project.particles.opacity,
													onChange: (v) => patchParticles({ opacity: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
													spec: {
														key: "audioResponse",
														label: "Audio response",
														min: 0,
														max: 2,
														step: .01,
														tooltip: "How hard audio drives spawn."
													},
													value: project.particles.audioResponse,
													onChange: (v) => patchParticles({ audioResponse: v })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
													children: "Max particles"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-1 flex flex-wrap gap-1",
													children: [
														25,
														50,
														100,
														250,
														500,
														1e3
													].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "sm",
														variant: project.particles.maxParticles === n ? "bronze" : "outline",
														onClick: () => patchParticles({ maxParticles: n }),
														children: n
													}, n))
												})
											]
										})
									]
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: fullscreen,
				onOpenChange: setFullscreen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "h-[90dvh] w-[min(96vw,1400px)] max-w-none overflow-hidden p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full", bg),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayCanvas, {
							project,
							playing,
							fill: true,
							className: "h-full w-full",
							audioEngine: getSharedAudio()
						})
					})
				})
			})
		]
	});
}
function ColorInspector() {
	const project = useStudio((s) => s.project);
	const patchColors = useStudio((s) => s.patchColors);
	const toggleFav = useStudio((s) => s.toggleFav);
	const favorites = useStudio((s) => s.favorites);
	const [q, setQ] = (0, import_react.useState)("");
	const colors = (0, import_react.useMemo)(() => NEON_COLORS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.hex.toLowerCase().includes(q.toLowerCase())), [q]);
	const setRole = (role, hex) => {
		if (role === "primary") {
			const stops = project.colors.gradientStops.map((s, i) => i === 0 ? {
				...s,
				color: hex
			} : s);
			patchColors({
				primary: hex,
				gradientStops: stops.length ? stops : [{
					offset: 0,
					color: hex
				}]
			});
		} else if (role === "secondary") {
			const stops = [...project.colors.gradientStops];
			if (stops.length < 2) stops.push({
				offset: 1,
				color: hex
			});
			else stops[stops.length - 1] = {
				...stops[stops.length - 1],
				color: hex
			};
			patchColors({
				secondary: hex,
				gradientStops: stops
			});
		} else patchColors({ accent: hex });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					"primary",
					"secondary",
					"accent"
				].map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-1 text-[10px] tracking-wider text-muted uppercase",
					children: [
						role,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							className: "h-10 w-full cursor-pointer rounded-md border border-line bg-structure",
							value: project.colors[role],
							onChange: (e) => setRole(role, e.target.value.toUpperCase())
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "h-8 font-mono text-[11px]",
							value: project.colors[role],
							onChange: (e) => setRole(role, e.target.value)
						})
					]
				}, role))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-ivory-dim",
					children: "Gradient"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: project.colors.gradientEnabled,
					onCheckedChange: (v) => patchColors({ gradientEnabled: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-ivory-dim",
					children: "Animate gradient"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: project.colors.animateGradient,
					onCheckedChange: (v) => patchColors({ animateGradient: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-ivory-dim",
					children: "Reverse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: project.colors.reverseGradient,
					onCheckedChange: (v) => patchColors({ reverseGradient: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-ivory-dim",
					children: "Color reactive"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: project.colors.colorReactive,
					onCheckedChange: (v) => patchColors({ colorReactive: v })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
				spec: {
					key: "opacity",
					label: "Opacity",
					min: 0,
					max: 1,
					step: .01,
					tooltip: "Master color opacity."
				},
				value: project.colors.opacity,
				onChange: (v) => patchColors({ opacity: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
				spec: {
					key: "saturation",
					label: "Saturation",
					min: 0,
					max: 2,
					step: .01,
					tooltip: "Color saturation."
				},
				value: project.colors.saturation,
				onChange: (v) => patchColors({ saturation: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
				spec: {
					key: "brightness",
					label: "Brightness",
					min: .2,
					max: 2,
					step: .01,
					tooltip: "Color brightness."
				},
				value: project.colors.brightness,
				onChange: (v) => patchColors({ brightness: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRow, {
				spec: {
					key: "gradientSpeed",
					label: "Gradient speed",
					min: 0,
					max: 2,
					step: .01,
					tooltip: "How fast the gradient travels."
				},
				value: project.colors.gradientSpeed,
				onChange: (v) => patchColors({ gradientSpeed: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => {
					const combo = COLOR_COMBOS[Math.floor(Math.random() * COLOR_COMBOS.length)];
					patchColors({
						primary: combo.colors[0],
						secondary: combo.colors[1] ?? combo.colors[0],
						accent: combo.colors[2] ?? combo.colors[0],
						gradientStops: combo.colors.map((c, i) => ({
							offset: combo.colors.length === 1 ? 0 : i / (combo.colors.length - 1),
							color: c
						}))
					});
				},
				children: "Randomize palette"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] tracking-[0.22em] text-bronze uppercase",
				children: "Combinations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: COLOR_COMBOS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-2 rounded-md px-2 py-2 hover:bg-raised",
					onClick: () => patchColors({
						primary: c.colors[0],
						secondary: c.colors[1] ?? c.colors[0],
						accent: c.colors[2] ?? c.colors[0],
						gradientStops: c.colors.map((hex, i) => ({
							offset: c.colors.length === 1 ? 0 : i / (c.colors.length - 1),
							color: hex
						}))
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex -space-x-1",
						children: c.colors.map((hex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-4 rounded-full border border-line",
							style: { background: hex }
						}, hex))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-ivory",
						children: c.name
					})]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Search colors",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}),
			COLOR_FAMILIES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-[10px] tracking-[0.18em] text-muted uppercase",
				children: f.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-6 gap-1",
				children: colors.filter((c) => c.family === f.id).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					title: c.name,
					className: "size-8 rounded-md border border-line",
					style: { background: c.hex },
					onClick: () => setRole("primary", c.hex),
					onContextMenu: (e) => {
						e.preventDefault();
						toggleFav("colors", c.hex);
					},
					children: favorites.colors.includes(c.hex) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mx-auto size-3 text-structure" }) : null
				}, c.name))
			})] }, f.id))
		]
	});
}
var SplitComponent = DesignerView;
//#endregion
export { SplitComponent as component };

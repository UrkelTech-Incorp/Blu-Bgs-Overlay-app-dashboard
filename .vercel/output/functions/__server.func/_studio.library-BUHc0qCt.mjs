import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { g as useStudio, i as COLOR_FAMILIES, o as NEON_COLORS, r as COLOR_COMBOS } from "./_ssr/studio-D_OElsu4.mjs";
import { r as BORDER_SPECS, t as ANIMATION_SPECS } from "./_ssr/specs-CPR9pTih.mjs";
import { s as Star } from "./_libs/lucide-react.mjs";
import { t as Input } from "./_ssr/input-CsKN3kja.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-DTguQKq_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.library-BUHc0qCt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LibraryView() {
	const [q, setQ] = (0, import_react.useState)("");
	const project = useStudio((s) => s.project);
	const setBorderType = useStudio((s) => s.setBorderType);
	const toggleAnimation = useStudio((s) => s.toggleAnimation);
	const patchColors = useStudio((s) => s.patchColors);
	const toggleFav = useStudio((s) => s.toggleFav);
	const favorites = useStudio((s) => s.favorites);
	const query = q.trim().toLowerCase();
	const borders = (0, import_react.useMemo)(() => BORDER_SPECS.filter((b) => !query || `${b.name} ${b.description}`.toLowerCase().includes(query)), [query]);
	const anims = (0, import_react.useMemo)(() => ANIMATION_SPECS.filter((a) => !query || `${a.name} ${a.description}`.toLowerCase().includes(query)), [query]);
	const colors = (0, import_react.useMemo)(() => NEON_COLORS.filter((c) => !query || `${c.name} ${c.hex}`.toLowerCase().includes(query)), [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 pb-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.28em] text-bronze uppercase",
				children: "Collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide text-ivory",
				children: "Neon Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Twelve border styles, twenty stackable animations, and the full BLU-BGS color catalog."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-6 max-w-md",
				placeholder: "Search plasma, cyan, glitch…",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "borders",
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "borders",
							children: "Borders"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "anims",
							children: "Animations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "colors",
							children: "Colors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "favs",
							children: "Favorites"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "borders",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: borders.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: cn("rounded-xl border border-line bg-panel p-4", project.border.type === b.type && "glow-cyan"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-[10px] text-bronze",
											children: b.number
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl text-ivory",
											children: b.name
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toggleFav("borders", b.type),
											"aria-label": "Favorite",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", favorites.borders.includes(b.type) ? "fill-bronze text-bronze" : "text-muted") })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: b.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "mt-4",
										size: "sm",
										onClick: () => setBorderType(b.type),
										children: "Use in designer"
									})
								]
							}, b.type))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "anims",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
							children: anims.map((a) => {
								const on = project.animations.some((x) => x.type === a.type && x.enabled);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: cn("rounded-xl border border-line bg-panel p-4", on && "glow-cyan"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[10px] text-bronze",
												children: a.number
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-xl text-ivory",
												children: a.name
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => toggleFav("animations", a.type),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", favorites.animations.includes(a.type) ? "fill-bronze text-bronze" : "text-muted") })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted",
											children: a.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "mt-4",
											size: "sm",
											variant: on ? "neon" : "outline",
											onClick: () => toggleAnimation(a.type),
											children: on ? "Enabled" : "Add to stack"
										})
									]
								}, a.type);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "colors",
						children: [
							COLOR_FAMILIES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-3 font-display text-2xl text-ivory",
									children: f.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
									children: colors.filter((c) => c.family === f.id).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex items-center gap-3 rounded-lg border border-line bg-panel p-3 text-left hover:border-bronze/50",
										onClick: () => patchColors({ primary: c.hex }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-10 rounded-md border border-line",
											style: { background: c.hex }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm text-ivory",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[11px] text-muted",
											children: c.hex
										})] })]
									}, c.name))
								})]
							}, f.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-3 font-display text-2xl text-ivory",
								children: "Combinations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
								children: COLOR_COMBOS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "rounded-xl border border-line bg-panel p-4 text-left",
									onClick: () => patchColors({
										primary: c.colors[0],
										secondary: c.colors[1] ?? c.colors[0],
										gradientStops: c.colors.map((hex, i) => ({
											offset: c.colors.length === 1 ? 0 : i / (c.colors.length - 1),
											color: hex
										}))
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 overflow-hidden rounded-md",
										children: c.colors.map((hex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											style: { background: hex }
										}, hex))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-sm text-ivory",
										children: c.name
									})]
								}, c.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "favs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Star items in the library to collect them here."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								favorites.borders.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => setBorderType(b),
									children: b
								}, b)),
								favorites.animations.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => toggleAnimation(a),
									children: a
								}, a)),
								favorites.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-8 rounded-md border border-line",
									style: { background: c },
									onClick: () => patchColors({ primary: c })
								}, c)),
								favorites.borders.length + favorites.animations.length + favorites.colors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: "Nothing favorited yet."
								}) : null
							]
						})]
					})
				]
			})
		]
	});
}
var SplitComponent = LibraryView;
//#endregion
export { SplitComponent as component };

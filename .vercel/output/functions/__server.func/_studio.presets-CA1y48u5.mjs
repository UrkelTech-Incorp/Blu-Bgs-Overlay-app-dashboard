import { E as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { c as PRESET_CATEGORIES, g as useStudio, t as BUILTIN_PRESETS } from "./_ssr/studio-D_OElsu4.mjs";
import { s as Star } from "./_libs/lucide-react.mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.presets-CA1y48u5.js
var import_jsx_runtime = require_jsx_runtime();
function PresetsPage() {
	const navigate = useNavigate();
	const fromPreset = useStudio((s) => s.fromPreset);
	const toggleFav = useStudio((s) => s.toggleFav);
	const favorites = useStudio((s) => s.favorites);
	const apply = (id) => {
		fromPreset(id);
		navigate({ to: "/designer" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 pb-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.28em] text-bronze uppercase",
				children: "Looks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide text-ivory",
				children: "Presets"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "Drop a finished BLU-BGS look into the designer. Every preset is a full overlay — border, glow, motion, particles."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-10",
				children: PRESET_CATEGORIES.map((cat) => {
					const items = BUILTIN_PRESETS.filter((p) => p.category === cat);
					if (!items.length) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-display text-2xl tracking-wide text-ivory",
						children: cat
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
						children: items.map((p) => {
							const colors = p.project.colors;
							const swatches = [
								colors.primary,
								colors.secondary,
								colors.accent
							].filter(Boolean);
							const fav = favorites.presets.includes(p.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "overflow-hidden rounded-xl border border-line bg-panel",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-16",
									children: swatches.map((hex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										style: { background: hex }
									}, hex))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] tracking-[0.22em] text-bronze uppercase",
												children: p.category
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-xl tracking-wide text-ivory",
												children: p.name.replace("BLU-BGS ", "")
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => toggleFav("presets", p.id),
												"aria-label": "Favorite preset",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", fav ? "fill-bronze text-bronze" : "text-muted") })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: p.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "w-full",
											onClick: () => apply(p.id),
											children: "Use in designer"
										})
									]
								})]
							}, p.id);
						})
					})] }, cat);
				})
			})
		]
	});
}
//#endregion
export { PresetsPage as component };

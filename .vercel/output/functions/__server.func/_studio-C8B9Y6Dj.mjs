import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime, c as DialogClose, d as DialogPortal, l as DialogContent, s as Dialog, u as DialogOverlay } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn, t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { g as useStudio, o as NEON_COLORS, r as COLOR_COMBOS, t as BUILTIN_PRESETS } from "./_ssr/studio-D_OElsu4.mjs";
import { r as BORDER_SPECS, t as ANIMATION_SPECS } from "./_ssr/specs-CPR9pTih.mjs";
import { E as AudioLines, T as Bookmark, c as Settings, g as Menu, l as Search, m as PenTool, r as X, v as Library, w as Cast, y as LayoutDashboard } from "./_libs/lucide-react.mjs";
import { a as TooltipProvider, n as DialogContent$1, t as Dialog$1 } from "./_ssr/tooltip-BvYxW3Xu.mjs";
import { n as useSharedAudio } from "./_ssr/useSharedAudio-CBJHSb-c.mjs";
import { d as useRouterState, m as Outlet, v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "./_libs/sonner.mjs";
import { t as _e } from "./_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio-C8B9Y6Dj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetContent = import_react.forwardRef(({ className, children, side = "left", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-structure/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex flex-col bg-panel shadow-2xl", side === "left" && "inset-y-0 left-0 w-[min(280px,90vw)] border-r border-line", side === "right" && "inset-y-0 right-0 w-[min(340px,90vw)] border-l border-line", side === "bottom" && "inset-x-0 bottom-0 max-h-[80vh] rounded-t-xl border-t border-line", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		className: "absolute top-3 right-3 rounded-md p-1 text-muted hover:text-ivory",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
	})]
})] }));
SheetContent.displayName = "SheetContent";
function CommandSearch({ open, onOpenChange }) {
	const navigate = useNavigate();
	const setBorderType = useStudio((s) => s.setBorderType);
	const toggleAnimation = useStudio((s) => s.toggleAnimation);
	const patchColors = useStudio((s) => s.patchColors);
	const fromPreset = useStudio((s) => s.fromPreset);
	const loadProject = useStudio((s) => s.loadProject);
	const records = useStudio((s) => s.records);
	const go = (fn) => {
		fn();
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
			className: "overflow-hidden p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				className: "bg-panel text-ivory",
				label: "Global search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					autoFocus: true,
					placeholder: "Search borders, animations, colors, presets…",
					className: "h-12 w-full border-b border-line bg-transparent px-4 text-sm outline-none placeholder:text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-[min(420px,60vh)] overflow-y-auto p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
							className: "px-3 py-8 text-center text-sm text-muted",
							children: "No matches."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Navigate",
							className: "text-[10px] tracking-wider text-muted uppercase",
							children: [
								["Dashboard", "/"],
								["Designer", "/designer"],
								["Library", "/library"],
								["Presets", "/presets"],
								["Audio", "/audio"],
								["OBS Output", "/obs"]
							].map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								onSelect: () => go(() => void navigate({ to })),
								children: label
							}, to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Borders",
							className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
							children: BORDER_SPECS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => go(() => {
									setBorderType(b.type);
									navigate({ to: "/designer" });
								}),
								children: [
									b.number,
									" ",
									b.name
								]
							}, b.type))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Animations",
							className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
							children: ANIMATION_SPECS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => go(() => {
									toggleAnimation(a.type);
									navigate({ to: "/designer" });
								}),
								children: [
									a.number,
									" ",
									a.name
								]
							}, a.type))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Colors",
							className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
							children: NEON_COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => go(() => patchColors({ primary: c.hex })),
								children: [
									c.name,
									" ",
									c.hex
								]
							}, c.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Combinations",
							className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
							children: COLOR_COMBOS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								onSelect: () => go(() => patchColors({
									primary: c.colors[0],
									secondary: c.colors[1] ?? c.colors[0],
									gradientStops: c.colors.map((hex, i) => ({
										offset: c.colors.length === 1 ? 0 : i / (c.colors.length - 1),
										color: hex
									}))
								})),
								children: c.name
							}, c.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Presets",
							className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
							children: BUILTIN_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								onSelect: () => go(() => fromPreset(p.id)),
								children: p.name
							}, p.id))
						}),
						records.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Projects",
							className: "mt-2 text-[10px] tracking-wider text-muted uppercase",
							children: records.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								onSelect: () => go(() => loadProject(r.meta.id)),
								children: r.meta.name
							}, r.meta.id))
						}) : null
					]
				})]
			})
		})
	});
}
function Item({ children, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
		onSelect,
		className: "flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-ivory-dim data-[selected=true]:bg-raised data-[selected=true]:text-ivory",
		children
	});
}
var NAV = [
	{
		to: "/",
		id: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/designer",
		id: "designer",
		label: "Designer",
		icon: PenTool
	},
	{
		to: "/library",
		id: "library",
		label: "Library",
		icon: Library
	},
	{
		to: "/presets",
		id: "presets",
		label: "Presets",
		icon: Bookmark
	},
	{
		to: "/audio",
		id: "audio",
		label: "Audio",
		icon: AudioLines
	},
	{
		to: "/obs",
		id: "obs",
		label: "OBS Output",
		icon: Cast
	},
	{
		to: "/settings",
		id: "settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hydrate = useStudio((s) => s.hydrate);
	const undo = useStudio((s) => s.undo);
	const redo = useStudio((s) => s.redo);
	const saveCurrent = useStudio((s) => s.saveCurrent);
	const setPlaying = useStudio((s) => s.setPlaying);
	const playing = useStudio((s) => s.playing);
	const setFullscreen = useStudio((s) => s.setFullscreen);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	useSharedAudio();
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const meta = e.metaKey || e.ctrlKey;
			if (meta && e.key.toLowerCase() === "z") {
				e.preventDefault();
				if (e.shiftKey) redo();
				else undo();
			} else if (meta && e.key.toLowerCase() === "y") {
				e.preventDefault();
				redo();
			} else if (meta && e.key.toLowerCase() === "s") {
				e.preventDefault();
				saveCurrent();
			} else if (meta && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearchOpen(true);
			} else if (meta && e.key.toLowerCase() === "o") {
				e.preventDefault();
				setSearchOpen(true);
			} else if (e.key === " " && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				setPlaying(!playing);
			} else if (e.key.toLowerCase() === "f" && !meta && !(e.target instanceof HTMLInputElement)) setFullscreen(true);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		undo,
		redo,
		saveCurrent,
		setPlaying,
		playing,
		setFullscreen
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 250,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh bg-structure text-ivory",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden w-[232px] shrink-0 flex-col border-r border-line bg-panel md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { pathname }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-auto border-t border-line p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full justify-start text-ivory-dim",
								onClick: () => setSearchOpen(true),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
									"Search",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto font-mono text-[10px] text-muted",
										children: "⌘K"
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex h-14 items-center gap-2 border-b border-line bg-panel px-3 md:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => setMenuOpen(true),
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg tracking-[0.14em] text-ivory",
								children: "BLU-BGS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "ml-auto",
								onClick: () => setSearchOpen(true),
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-h-0 min-w-0 flex-1",
						children
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] md:hidden",
					children: NAV.slice(0, 5).map((item) => {
						const Icon = item.icon;
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px]", active ? "text-cyan" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
					open: menuOpen,
					onOpenChange: setMenuOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "left",
						className: "p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {
							pathname,
							onNavigate: () => setMenuOpen(false)
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSearch, {
					open: searchOpen,
					onOpenChange: setSearchOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-right"
				})
			]
		})
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 border-b border-line px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/blu-bgs-logo.png",
			alt: "blu-BGS",
			className: "h-10 w-auto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-base tracking-[0.18em] text-ivory",
				children: "BLU-BGS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-[10px] tracking-[0.22em] text-bronze uppercase",
				children: "Neon Overlay Studio"
			})]
		})]
	});
}
function NavList({ pathname, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-0.5 p-3",
		children: NAV.map((item) => {
			const Icon = item.icon;
			const active = pathname === item.to;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors", active ? "bg-raised text-ivory glow-cyan" : "text-ivory-dim hover:bg-raised/70 hover:text-ivory"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", active && "text-cyan") }), item.label]
			}, item.to);
		})
	});
}
function StudioLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { StudioLayout as component };

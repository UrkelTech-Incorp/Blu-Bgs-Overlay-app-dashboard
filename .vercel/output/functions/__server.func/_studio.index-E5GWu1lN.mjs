import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime, a as Portal2, i as Overlay2, n as Cancel, o as Root2, r as Content2, t as Action } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as buttonVariants, r as cn, t as Button } from "./_ssr/button-BVLpLby-.mjs";
import { c as PRESET_CATEGORIES, g as useStudio, t as BUILTIN_PRESETS } from "./_ssr/studio-D_OElsu4.mjs";
import { S as Copy, b as FolderOpen, f as Plus, i as Upload, o as Trash2 } from "./_libs/lucide-react.mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studio.index-E5GWu1lN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	ref,
	className: cn("fixed inset-0 z-50 bg-structure/80", className),
	...props
}));
AlertDialogOverlay.displayName = "AlertDialogOverlay";
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[min(440px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-panel p-5", className),
	...props
})] }));
AlertDialogContent.displayName = "AlertDialogContent";
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-2", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("font-display text-xl text-ivory", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex justify-end gap-2", className),
		...props
	});
}
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = "AlertDialogAction";
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), className),
	...props
}));
AlertDialogCancel.displayName = "AlertDialogCancel";
function DashboardView() {
	const navigate = useNavigate();
	const records = useStudio((s) => s.records);
	const newOverlay = useStudio((s) => s.newOverlay);
	const fromPreset = useStudio((s) => s.fromPreset);
	const loadProject = useStudio((s) => s.loadProject);
	const duplicateProject = useStudio((s) => s.duplicateProject);
	const deleteProject = useStudio((s) => s.deleteProject);
	const importJson = useStudio((s) => s.importJson);
	const fileRef = (0, import_react.useRef)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 pb-24 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.28em] text-bronze uppercase",
						children: "Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-[0.08em] text-ivory md:text-5xl",
						children: "Dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted",
						children: "Design transparent neon overlays for OBS Browser Sources. Create, preview, and publish without leaving the studio."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								newOverlay();
								navigate({ to: "/designer" });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New Overlay"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "bronze",
							onClick: () => void navigate({ to: "/presets" }),
							children: "From Preset"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Import Project"]
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
								navigate({ to: "/designer" });
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide text-ivory",
					children: "Recent projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted tabular-nums",
					children: [records.length, " saved"]
				})]
			}), records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-line px-6 py-16 text-center text-sm text-muted",
				children: "No projects yet. Start with a new overlay or a preset."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: records.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-xl border border-line bg-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "checker aspect-video",
						children: r.meta.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: r.meta.thumbnail,
							alt: "",
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-xs tracking-widest text-muted uppercase",
							children: r.meta.name
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-medium text-ivory",
							children: r.meta.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted tabular-nums",
							children: [
								r.meta.resolution,
								" · ",
								new Date(r.meta.updatedAt).toLocaleString()
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => {
										loadProject(r.meta.id);
										navigate({ to: "/designer" });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-3.5" }), "Open"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => duplicateProject(r.meta.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Duplicate"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-danger",
									onClick: () => setPendingDelete(r.meta.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
								})
							]
						})]
					})]
				}, r.meta.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-2xl tracking-wide text-ivory",
				children: "Preset categories"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: PRESET_CATEGORIES.map((cat) => {
					const items = BUILTIN_PRESETS.filter((p) => p.category === cat);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							if (items[0]) fromPreset(items[0].id);
							else navigate({ to: "/presets" });
						},
						className: "rounded-xl border border-line bg-panel p-4 text-left transition-colors hover:border-bronze/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] tracking-[0.22em] text-bronze uppercase",
								children: String(items.length).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-display text-xl tracking-wide text-ivory",
								children: cat
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 truncate text-xs text-muted",
								children: items.map((i) => i.name.replace("BLU-BGS ", "")).join(" · ") || "Browse library"
							})
						]
					}, cat);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingDelete,
				onOpenChange: (o) => !o && setPendingDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete overlay?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This cannot be undone. The project file will be removed from this device." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-danger text-ivory hover:bg-danger/90",
					onClick: () => {
						if (pendingDelete) deleteProject(pendingDelete);
						toast.success("Deleted");
						setPendingDelete(null);
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
var SplitComponent = DashboardView;
//#endregion
export { SplitComponent as component };

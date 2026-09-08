import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn } from "./button-BVLpLby-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-CsKN3kja.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-10 w-full rounded-md border border-line bg-structure-2 px-3 text-sm text-ivory shadow-none outline-none transition-colors placeholder:text-muted focus-visible:border-bronze/70 focus-visible:ring-2 focus-visible:ring-cyan/40 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
//#endregion
export { Input as t };

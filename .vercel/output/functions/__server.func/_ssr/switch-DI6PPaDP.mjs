import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as cn } from "./button-BVLpLby-.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/switch-DI6PPaDP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-line bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 data-[state=checked]:border-cyan/50 data-[state=checked]:bg-cyan/30", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-3.5 rounded-full bg-ivory-dim shadow transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-cyan data-[state=unchecked]:translate-x-0.5" })
}));
Switch.displayName = "Switch";
//#endregion
export { Switch as t };

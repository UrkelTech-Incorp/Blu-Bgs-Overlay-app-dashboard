import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "@/lib/cn";

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-line bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 data-[state=checked]:border-cyan/50 data-[state=checked]:bg-cyan/30",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block size-3.5 rounded-full bg-ivory-dim shadow transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-cyan data-[state=unchecked]:translate-x-0.5" />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

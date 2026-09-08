import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "@/lib/cn";

export const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none items-center select-none", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-raised">
      <SliderPrimitive.Range className="absolute h-full bg-bronze" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-3.5 rounded-full border border-bronze bg-ivory shadow-sm outline-none transition-transform focus-visible:ring-2 focus-visible:ring-cyan/50" />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";

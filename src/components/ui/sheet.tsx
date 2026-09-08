import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/cn";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: "left" | "right" | "bottom" }
>(({ className, children, side = "left", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-structure/70" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col bg-panel shadow-2xl",
        side === "left" && "inset-y-0 left-0 w-[min(280px,90vw)] border-r border-line",
        side === "right" && "inset-y-0 right-0 w-[min(340px,90vw)] border-l border-line",
        side === "bottom" && "inset-x-0 bottom-0 max-h-[80vh] rounded-t-xl border-t border-line",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-3 right-3 rounded-md p-1 text-muted hover:text-ivory">
        <X className="size-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

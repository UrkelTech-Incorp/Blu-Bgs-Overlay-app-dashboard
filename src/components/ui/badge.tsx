import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
  {
    variants: {
      variant: {
        default: "border-line text-ivory-dim",
        bronze: "border-bronze/40 text-bronze",
        cyan: "border-cyan/40 text-cyan",
        magenta: "border-magenta/40 text-magenta",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

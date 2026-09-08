import { AudioLines, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ParamSpec } from "@/engine/types";

interface ControlRowProps {
  spec: ParamSpec;
  value: number;
  onChange: (v: number) => void;
  onCommit?: () => void;
  mapped?: boolean;
  onToggleMap?: () => void;
}

export function ControlRow({ spec, value, onChange, onCommit, mapped, onToggleMap }: ControlRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 py-1.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Label className="truncate">{spec.label}</Label>
        </TooltipTrigger>
        <TooltipContent>{spec.tooltip}</TooltipContent>
      </Tooltip>
      <div className="flex items-center gap-1">
        {onToggleMap ? (
          <Button
            type="button"
            size="icon-sm"
            variant={mapped ? "neon" : "ghost"}
            className="size-6"
            onClick={onToggleMap}
            aria-label="Audio map"
          >
            <AudioLines className="size-3" />
          </Button>
        ) : null}
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="size-6"
          onClick={() => onChange((spec.min + spec.max) / 2)}
          aria-label={`Reset ${spec.label}`}
        >
          <RotateCcw className="size-3" />
        </Button>
      </div>
      <Slider
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? value)}
        onValueCommit={() => onCommit?.()}
        className="col-span-1"
      />
      <Input
        className="h-7 w-16 px-1.5 text-right font-mono text-[11px] tabular-nums"
        value={Number.isInteger(spec.step) ? String(Math.round(value)) : value.toFixed(2)}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        onBlur={() => onCommit?.()}
      />
    </div>
  );
}

import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ANIMATION_SPECS, BORDER_SPECS } from "@/engine/specs";
import { NEON_COLORS, COLOR_COMBOS } from "@/engine/colors";
import { BUILTIN_PRESETS } from "@/engine/presets";
import { useStudio } from "@/store/studio";

export function CommandSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const setBorderType = useStudio((s) => s.setBorderType);
  const toggleAnimation = useStudio((s) => s.toggleAnimation);
  const patchColors = useStudio((s) => s.patchColors);
  const fromPreset = useStudio((s) => s.fromPreset);
  const loadProject = useStudio((s) => s.loadProject);
  const records = useStudio((s) => s.records);

  const go = (fn: () => void) => {
    fn();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="bg-panel text-ivory" label="Global search">
          <Command.Input
            autoFocus
            placeholder="Search borders, animations, colors, presets…"
            className="h-12 w-full border-b border-line bg-transparent px-4 text-sm outline-none placeholder:text-muted"
          />
          <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-muted">No matches.</Command.Empty>
            <Command.Group heading="Navigate" className="text-[10px] tracking-wider text-muted uppercase">
              {[
                ["Dashboard", "/"],
                ["Designer", "/designer"],
                ["Library", "/library"],
                ["Presets", "/presets"],
                ["Audio", "/audio"],
                ["OBS Output", "/obs"],
              ].map(([label, to]) => (
                <Item key={to} onSelect={() => go(() => void navigate({ to }))}>
                  {label}
                </Item>
              ))}
            </Command.Group>
            <Command.Group heading="Borders" className="mt-2 text-[10px] tracking-wider text-muted uppercase">
              {BORDER_SPECS.map((b) => (
                <Item key={b.type} onSelect={() => go(() => { setBorderType(b.type); void navigate({ to: "/designer" }); })}>
                  {b.number} {b.name}
                </Item>
              ))}
            </Command.Group>
            <Command.Group heading="Animations" className="mt-2 text-[10px] tracking-wider text-muted uppercase">
              {ANIMATION_SPECS.map((a) => (
                <Item key={a.type} onSelect={() => go(() => { toggleAnimation(a.type); void navigate({ to: "/designer" }); })}>
                  {a.number} {a.name}
                </Item>
              ))}
            </Command.Group>
            <Command.Group heading="Colors" className="mt-2 text-[10px] tracking-wider text-muted uppercase">
              {NEON_COLORS.map((c) => (
                <Item key={c.name} onSelect={() => go(() => patchColors({ primary: c.hex }))}>
                  {c.name} {c.hex}
                </Item>
              ))}
            </Command.Group>
            <Command.Group heading="Combinations" className="mt-2 text-[10px] tracking-wider text-muted uppercase">
              {COLOR_COMBOS.map((c) => (
                <Item
                  key={c.id}
                  onSelect={() =>
                    go(() =>
                      patchColors({
                        primary: c.colors[0]!,
                        secondary: c.colors[1] ?? c.colors[0]!,
                        gradientStops: c.colors.map((hex, i) => ({
                          offset: c.colors.length === 1 ? 0 : i / (c.colors.length - 1),
                          color: hex,
                        })),
                      }),
                    )
                  }
                >
                  {c.name}
                </Item>
              ))}
            </Command.Group>
            <Command.Group heading="Presets" className="mt-2 text-[10px] tracking-wider text-muted uppercase">
              {BUILTIN_PRESETS.map((p) => (
                <Item key={p.id} onSelect={() => go(() => fromPreset(p.id))}>
                  {p.name}
                </Item>
              ))}
            </Command.Group>
            {records.length > 0 ? (
              <Command.Group heading="Projects" className="mt-2 text-[10px] tracking-wider text-muted uppercase">
                {records.map((r) => (
                  <Item key={r.meta.id} onSelect={() => go(() => loadProject(r.meta.id))}>
                    {r.meta.name}
                  </Item>
                ))}
              </Command.Group>
            ) : null}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function Item({ children, onSelect }: { children: React.ReactNode; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-ivory-dim data-[selected=true]:bg-raised data-[selected=true]:text-ivory"
    >
      {children}
    </Command.Item>
  );
}

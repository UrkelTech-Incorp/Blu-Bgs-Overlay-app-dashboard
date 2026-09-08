import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUILTIN_PRESETS, PRESET_CATEGORIES } from "@/engine/presets";
import { cn } from "@/lib/cn";
import { useStudio } from "@/store/studio";

export const Route = createFileRoute("/_studio/presets")({
  component: PresetsPage,
});

function PresetsPage() {
  const navigate = useNavigate();
  const fromPreset = useStudio((s) => s.fromPreset);
  const toggleFav = useStudio((s) => s.toggleFav);
  const favorites = useStudio((s) => s.favorites);

  const apply = (id: string) => {
    fromPreset(id);
    void navigate({ to: "/designer" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Looks</p>
      <h1 className="font-display text-4xl tracking-wide text-ivory">Presets</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Drop a finished BLU-BGS look into the designer. Every preset is a full overlay — border, glow, motion, particles.
      </p>

      <div className="mt-8 space-y-10">
        {PRESET_CATEGORIES.map((cat) => {
          const items = BUILTIN_PRESETS.filter((p) => p.category === cat);
          if (!items.length) return null;
          return (
            <section key={cat}>
              <h2 className="mb-4 font-display text-2xl tracking-wide text-ivory">{cat}</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => {
                  const colors = p.project.colors;
                  const swatches = [colors.primary, colors.secondary, colors.accent].filter(Boolean);
                  const fav = favorites.presets.includes(p.id);
                  return (
                    <article key={p.id} className="overflow-hidden rounded-xl border border-line bg-panel">
                      <div className="flex h-16">
                        {swatches.map((hex) => (
                          <span key={hex} className="flex-1" style={{ background: hex }} />
                        ))}
                      </div>
                      <div className="space-y-3 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] tracking-[0.22em] text-bronze uppercase">{p.category}</div>
                            <h3 className="font-display text-xl tracking-wide text-ivory">{p.name.replace("BLU-BGS ", "")}</h3>
                          </div>
                          <button type="button" onClick={() => toggleFav("presets", p.id)} aria-label="Favorite preset">
                            <Star className={cn("size-4", fav ? "fill-bronze text-bronze" : "text-muted")} />
                          </button>
                        </div>
                        <p className="text-sm text-muted">{p.description}</p>
                        <Button className="w-full" onClick={() => apply(p.id)}>
                          Use in designer
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

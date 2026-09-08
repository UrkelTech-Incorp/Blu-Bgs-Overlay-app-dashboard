import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COLOR_COMBOS, COLOR_FAMILIES, NEON_COLORS } from "@/engine/colors";
import { ANIMATION_SPECS, BORDER_SPECS } from "@/engine/specs";
import { cn } from "@/lib/cn";
import { useStudio } from "@/store/studio";

export function LibraryView() {
  const [q, setQ] = useState("");
  const project = useStudio((s) => s.project);
  const setBorderType = useStudio((s) => s.setBorderType);
  const toggleAnimation = useStudio((s) => s.toggleAnimation);
  const patchColors = useStudio((s) => s.patchColors);
  const toggleFav = useStudio((s) => s.toggleFav);
  const favorites = useStudio((s) => s.favorites);

  const query = q.trim().toLowerCase();
  const borders = useMemo(
    () => BORDER_SPECS.filter((b) => !query || `${b.name} ${b.description}`.toLowerCase().includes(query)),
    [query],
  );
  const anims = useMemo(
    () => ANIMATION_SPECS.filter((a) => !query || `${a.name} ${a.description}`.toLowerCase().includes(query)),
    [query],
  );
  const colors = useMemo(
    () => NEON_COLORS.filter((c) => !query || `${c.name} ${c.hex}`.toLowerCase().includes(query)),
    [query],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-bronze uppercase">Collection</p>
      <h1 className="font-display text-4xl tracking-wide text-ivory">Neon Library</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Twelve border styles, twenty stackable animations, and the full BLU-BGS color catalog.
      </p>
      <Input className="mt-6 max-w-md" placeholder="Search plasma, cyan, glitch…" value={q} onChange={(e) => setQ(e.target.value)} />

      <Tabs defaultValue="borders" className="mt-6">
        <TabsList>
          <TabsTrigger value="borders">Borders</TabsTrigger>
          <TabsTrigger value="anims">Animations</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="favs">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="borders">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {borders.map((b) => (
              <article key={b.type} className={cn("rounded-xl border border-line bg-panel p-4", project.border.type === b.type && "glow-cyan")}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] text-bronze">{b.number}</div>
                    <h3 className="font-display text-xl text-ivory">{b.name}</h3>
                  </div>
                  <button type="button" onClick={() => toggleFav("borders", b.type)} aria-label="Favorite">
                    <Star className={cn("size-4", favorites.borders.includes(b.type) ? "fill-bronze text-bronze" : "text-muted")} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-muted">{b.description}</p>
                <Button className="mt-4" size="sm" onClick={() => setBorderType(b.type)}>
                  Use in designer
                </Button>
              </article>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="anims">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {anims.map((a) => {
              const on = project.animations.some((x) => x.type === a.type && x.enabled);
              return (
                <article key={a.type} className={cn("rounded-xl border border-line bg-panel p-4", on && "glow-cyan")}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-bronze">{a.number}</div>
                      <h3 className="font-display text-xl text-ivory">{a.name}</h3>
                    </div>
                    <button type="button" onClick={() => toggleFav("animations", a.type)}>
                      <Star className={cn("size-4", favorites.animations.includes(a.type) ? "fill-bronze text-bronze" : "text-muted")} />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-muted">{a.description}</p>
                  <Button className="mt-4" size="sm" variant={on ? "neon" : "outline"} onClick={() => toggleAnimation(a.type)}>
                    {on ? "Enabled" : "Add to stack"}
                  </Button>
                </article>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="colors">
          {COLOR_FAMILIES.map((f) => (
            <div key={f.id} className="mb-8">
              <h3 className="mb-3 font-display text-2xl text-ivory">{f.label}</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {colors
                  .filter((c) => c.family === f.id)
                  .map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className="flex items-center gap-3 rounded-lg border border-line bg-panel p-3 text-left hover:border-bronze/50"
                      onClick={() => patchColors({ primary: c.hex })}
                    >
                      <span className="size-10 rounded-md border border-line" style={{ background: c.hex }} />
                      <span>
                        <span className="block text-sm text-ivory">{c.name}</span>
                        <span className="font-mono text-[11px] text-muted">{c.hex}</span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
          <h3 className="mb-3 font-display text-2xl text-ivory">Combinations</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {COLOR_COMBOS.map((c) => (
              <button
                key={c.id}
                type="button"
                className="rounded-xl border border-line bg-panel p-4 text-left"
                onClick={() =>
                  patchColors({
                    primary: c.colors[0]!,
                    secondary: c.colors[1] ?? c.colors[0]!,
                    gradientStops: c.colors.map((hex, i) => ({
                      offset: c.colors.length === 1 ? 0 : i / (c.colors.length - 1),
                      color: hex,
                    })),
                  })
                }
              >
                <div className="flex h-8 overflow-hidden rounded-md">
                  {c.colors.map((hex) => (
                    <span key={hex} className="flex-1" style={{ background: hex }} />
                  ))}
                </div>
                <div className="mt-2 text-sm text-ivory">{c.name}</div>
              </button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="favs">
          <p className="text-sm text-muted">Star items in the library to collect them here.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {favorites.borders.map((b) => (
              <Button key={b} size="sm" variant="outline" onClick={() => setBorderType(b)}>
                {b}
              </Button>
            ))}
            {favorites.animations.map((a) => (
              <Button key={a} size="sm" variant="outline" onClick={() => toggleAnimation(a)}>
                {a}
              </Button>
            ))}
            {favorites.colors.map((c) => (
              <button key={c} type="button" className="size-8 rounded-md border border-line" style={{ background: c }} onClick={() => patchColors({ primary: c })} />
            ))}
            {favorites.borders.length + favorites.animations.length + favorites.colors.length === 0 ? (
              <span className="text-sm text-muted">Nothing favorited yet.</span>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  AudioLines,
  Bookmark,
  Cast,
  LayoutDashboard,
  Library,
  Menu,
  PenTool,
  Search,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandSearch } from "@/components/studio/CommandSearch";
import { useSharedAudio } from "@/components/studio/useSharedAudio";
import { cn } from "@/lib/cn";
import { useStudio } from "@/store/studio";
import { Toaster } from "sonner";

const NAV = [
  { to: "/", id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/designer", id: "designer", label: "Designer", icon: PenTool },
  { to: "/library", id: "library", label: "Library", icon: Library },
  { to: "/presets", id: "presets", label: "Presets", icon: Bookmark },
  { to: "/audio", id: "audio", label: "Audio", icon: AudioLines },
  { to: "/obs", id: "obs", label: "OBS Output", icon: Cast },
  { to: "/settings", id: "settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrate = useStudio((s) => s.hydrate);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);
  const saveCurrent = useStudio((s) => s.saveCurrent);
  const setPlaying = useStudio((s) => s.setPlaying);
  const playing = useStudio((s) => s.playing);
  const setFullscreen = useStudio((s) => s.setFullscreen);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useSharedAudio();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (meta && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      } else if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveCurrent();
      } else if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (meta && e.key.toLowerCase() === "o") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === " " && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setPlaying(!playing);
      } else if (e.key.toLowerCase() === "f" && !meta && !(e.target instanceof HTMLInputElement)) {
        setFullscreen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, saveCurrent, setPlaying, playing, setFullscreen]);

  return (
    <TooltipProvider delayDuration={250}>
      <div className="flex min-h-dvh bg-structure text-ivory">
        <aside className="hidden w-[232px] shrink-0 flex-col border-r border-line bg-panel md:flex">
          <Brand />
          <NavList pathname={pathname} />
          <div className="mt-auto border-t border-line p-3">
            <Button variant="outline" className="w-full justify-start text-ivory-dim" onClick={() => setSearchOpen(true)}>
              <Search className="size-4" />
              Search
              <span className="ml-auto font-mono text-[10px] text-muted">⌘K</span>
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center gap-2 border-b border-line bg-panel px-3 md:hidden">
            <Button size="icon" variant="ghost" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
            <span className="font-display text-lg tracking-[0.14em] text-ivory">BLU-BGS</span>
            <Button size="icon" variant="ghost" className="ml-auto" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="size-5" />
            </Button>
          </header>
          <main className="min-h-0 min-w-0 flex-1">{children}</main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] md:hidden">
          {NAV.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px]",
                  active ? "text-cyan" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="left" className="p-0">
            <Brand />
            <NavList pathname={pathname} onNavigate={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>
        <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </TooltipProvider>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-4">
      <img src="/blu-bgs-logo.png" alt="blu-BGS" className="h-10 w-auto" />
      <div className="min-w-0">
        <div className="font-display text-base tracking-[0.18em] text-ivory">BLU-BGS</div>
        <div className="truncate text-[10px] tracking-[0.22em] text-bronze uppercase">Neon Overlay Studio</div>
      </div>
    </div>
  );
}

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5 p-3">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
              active
                ? "bg-raised text-ivory glow-cyan"
                : "text-ivory-dim hover:bg-raised/70 hover:text-ivory",
            )}
          >
            <Icon className={cn("size-4", active && "text-cyan")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

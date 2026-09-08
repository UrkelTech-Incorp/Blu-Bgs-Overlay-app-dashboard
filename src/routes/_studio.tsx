import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/_studio")({
  component: StudioLayout,
});

function StudioLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/components/studio/DashboardView";

export const Route = createFileRoute("/_studio/")({
  component: DashboardView,
});

import { createFileRoute } from "@tanstack/react-router";
import { DesignerView } from "@/components/studio/DesignerView";

export const Route = createFileRoute("/_studio/designer")({
  component: DesignerView,
});

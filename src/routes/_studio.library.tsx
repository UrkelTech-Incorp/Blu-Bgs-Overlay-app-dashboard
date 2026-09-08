import { createFileRoute } from "@tanstack/react-router";
import { LibraryView } from "@/components/studio/LibraryView";

export const Route = createFileRoute("/_studio/library")({
  component: LibraryView,
});

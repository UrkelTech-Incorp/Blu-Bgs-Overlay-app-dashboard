import { createFileRoute } from "@tanstack/react-router";
import type { OverlayProject } from "@/engine/types";

const live = new Map<string, OverlayProject>();

export const Route = createFileRoute("/api/live")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id") || "default";
        const project = live.get(id) ?? null;
        return Response.json({ project });
      },
      POST: async ({ request }) => {
        const body = (await request.json()) as { id?: string; project?: OverlayProject };
        const id = typeof body.id === "string" && body.id ? body.id : "default";
        if (!body.project || typeof body.project !== "object") {
          return Response.json({ ok: false, error: "Missing project" }, { status: 400 });
        }
        live.set(id, body.project);
        return Response.json({ ok: true });
      },
    },
  },
});

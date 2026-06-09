import type { Color } from "@/types";

export const COLORS = [
  { id: "red", background: "#991B1B", text: "#FEE2E2" },
  { id: "orange", background: "#9A3412", text: "#FED7AA" },
  { id: "yellow", background: "#854D0E", text: "#FEF3C7" },
  { id: "green", background: "#065F46", text: "#D1FAE5" },
  { id: "blue", background: "#1E40AF", text: "#DBEAFE" },
  { id: "purple", background: "#6B21A8", text: "#E9D5FF" },
  { id: "pink", background: "#9D174D", text: "#FCE7F3" },
  { id: "gray", background: "#374151", text: "#E5E7EB" },
] as const satisfies Color[];

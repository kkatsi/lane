import type { Color } from "@/types";

export const COLORS = [
  { id: "red", background: "#FEE2E2", text: "#991B1B" },
  { id: "orange", background: "#FED7AA", text: "#9A3412" },
  { id: "yellow", background: "#FEF3C7", text: "#854D0E" },
  { id: "green", background: "#D1FAE5", text: "#065F46" },
  { id: "blue", background: "#DBEAFE", text: "#1E40AF" },
  { id: "purple", background: "#E9D5FF", text: "#6B21A8" },
  { id: "pink", background: "#FCE7F3", text: "#9D174D" },
  { id: "gray", background: "#E5E7EB", text: "#374151" },
] as const satisfies Color[];

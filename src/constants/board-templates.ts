import type { BoardTemplate } from "@/types";

export const BOARD_TEMPLATES = [
  {
    id: "kanban_basics",
    name: "Kanban Basics",
    description: "To do • In Progress • Done",
  },
  {
    id: "sprint_workflow",
    name: "Sprint Workflow",
    description: "Backlog • To do • In Progress • Review • Done",
  },
  {
    id: "blank",
    name: "Blank",
    description: "Start with no columns",
  },
] as const satisfies BoardTemplate[];

export const DEFAULT_BOARD_TEMPLATE_ID: (typeof BOARD_TEMPLATES)[number]["id"] = "kanban_basics";

import type { Filter } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const searchQuery = ref("");
  const filters = ref<Record<Filter["id"], Filter>>({
    labelIds: {
      id: "labelIds",
      options: [
        { id: "bug", label: "Bug" },
        { id: "urgent", label: "Urgent" },
      ],
      selected: [],
      selection: "multiple",
      title: "Labels",
    },
    assigneeId: {
      id: "assigneeId",
      options: [
        { id: "maria", label: "Maria" },
        { id: "nikos", label: "Nikos" },
      ],
      selected: [],
      selection: "multiple",
      title: "Assignee",
    },
    dueDate: {
      id: "dueDate",
      options: [],
      selected: [],
      selection: "single",
      title: "Due Date",
    },
  });

  return { searchQuery, filters };
});

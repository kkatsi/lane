import { assigneesRepo } from "@/repositories/assignees";
import type { Assignee } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAssigneesStore = defineStore("assignees", () => {
  const assignees = ref<Record<Assignee["id"], Assignee>>(assigneesRepo.list());

  return { assignees };
});

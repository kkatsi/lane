import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useUIStore } from "@/stores/ui";
import type { Column, Filter, FilterableKey, Task } from "@/types";
import { computed } from "vue";

export const useFilteredTaskIds = () => {
  const { columns, tasks } = useCurrentBoard();
  const uiStore = useUIStore();

  const matchesQuery = (task: Task, query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;
    return (
      task.description.toLowerCase().includes(normalizedQuery) ||
      task.assigneeId?.toLowerCase().includes(normalizedQuery) === true
    );
  };

  const matchesFilters = (task: Task, filters?: Record<FilterableKey, Filter>) => {
    if (!filters) return true;

    const labelSel = filters.labelIds.selected;
    const labelOk = labelSel.length === 0 || labelSel.some((id) => task.labelIds.includes(id));

    const assigneeSel = filters.assigneeId.selected;
    const assigneeOk =
      assigneeSel.length === 0 || assigneeSel.includes(task.assigneeId ?? "unassigned");

    return labelOk && assigneeOk;
  };

  const filteredTaskIds = computed(() => {
    const result: Record<Column["id"], Task["id"][]> = {};
    for (const col of Object.values(columns.value)) {
      result[col.id] = col.taskIds.filter((id) => {
        const task = tasks.value[id];
        if (!task) return false;
        return matchesQuery(task, uiStore.searchQuery) && matchesFilters(task, uiStore.filters);
      });
    }
    return result;
  });

  return filteredTaskIds;
};

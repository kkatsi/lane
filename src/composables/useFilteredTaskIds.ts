import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useUIStore } from "@/stores/ui";
import type { Board, Column, Filter, FilterableKey, Task } from "@/types";
import { computed } from "vue";
import { useSearchQueryRef } from "./useSearchQueryRef";

const assigneeMatches = (assignees: Board["assignees"], normalizedQuery: string, assigneeId?: Task["assigneeId"]) => {
  if (!assigneeId) return false;
  const assignee = assignees[assigneeId];
  return (
    assignee?.name.toLowerCase().includes(normalizedQuery) || assignee?.id.toLocaleLowerCase().includes(normalizedQuery)
  );
};

const labelsMatches = (labels: Board["labels"], normalizedQuery: string, labelIds?: Task["labelIds"]) => {
  if (!labelIds) return false;
  const taskLabels = Object.values(labels).filter((l) => labelIds.includes(l.id));
  return taskLabels.some((l) => l.name.toLowerCase().includes(normalizedQuery));
};

export const useFilteredTaskIds = () => {
  const { columns, tasks, assignees, labels } = useCurrentBoard();
  const uiStore = useUIStore();
  const searchQuery = useSearchQueryRef();

  const matchesQuery = (task: Task, query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;
    return (
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery) ||
      assigneeMatches(assignees.value, normalizedQuery, task.assigneeId) ||
      labelsMatches(labels.value, normalizedQuery, task.labelIds)
    );
  };

  const matchesFilters = (task: Task, filters?: Record<FilterableKey, Filter>) => {
    if (!filters) return true;

    const labelSel = filters.labelIds.selected;
    const labelOk = labelSel.length === 0 || labelSel.some((id) => task.labelIds.includes(id));

    const assigneeSel = filters.assigneeId.selected;
    const assigneeOk = assigneeSel.length === 0 || assigneeSel.includes(task.assigneeId ?? "unassigned");

    return labelOk && assigneeOk;
  };

  const filteredTaskIds = computed(() => {
    const result: Record<Column["id"], Task["id"][]> = {};
    for (const col of Object.values(columns.value)) {
      result[col.id] = col.taskIds.filter((id) => {
        const task = tasks.value[id];
        if (!task) return false;
        return matchesQuery(task, searchQuery.value) && matchesFilters(task, uiStore.filters);
      });
    }
    return result;
  });

  return filteredTaskIds;
};

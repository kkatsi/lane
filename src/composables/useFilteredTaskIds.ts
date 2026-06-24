import { useCurrentBoard } from "@/composables/useCurrentBoard";
import type { Board, Column, Task } from "@/types";
import { addWeeks, endOfWeek, isAfter, isPast } from "date-fns";
import { computed } from "vue";
import { useBoardFilters } from "./useBoardFilters";
import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options";

const dueDateMatches = (
  due: Task["dueDate"],
  matchTo: (typeof DATE_FILTER_OPTIONS)[keyof typeof DATE_FILTER_OPTIONS]["id"],
) => {
  if (!due) return true;
  const dueDate = new Date(due);
  switch (matchTo) {
    case DATE_FILTER_OPTIONS.ANYTIME.id:
      return true;
    case DATE_FILTER_OPTIONS.OVERDUE.id:
      return isPast(dueDate);
    case DATE_FILTER_OPTIONS.THIS_WEEK.id: {
      const weekEnd = endOfWeek(new Date());
      return !isPast(dueDate) && isAfter(weekEnd, dueDate);
    }
    case DATE_FILTER_OPTIONS.NEXT_WEEK.id: {
      const end = addWeeks(endOfWeek(new Date()), 1);
      return !isPast(dueDate) && isAfter(end, dueDate);
    }
    default:
      return true;
  }
};

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
  const boardFilters = useBoardFilters();

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

  const matchesFilters = (task: Task, filters?: ReturnType<typeof useBoardFilters>) => {
    if (!filters) return true;

    const labelSel = filters.labelIds.value;
    const labelOk =
      labelSel === undefined || labelSel?.length === 0 || labelSel?.some((id) => task.labelIds.includes(id));

    const assigneeSel = filters.assigneeIds.value;
    const assigneeOk = assigneeSel === undefined || assigneeSel.length === 0 || assigneeSel.includes(task.assigneeId);

    const dueDateSel = filters.dueDate.value;
    const dueDateOk = dueDateMatches(task.dueDate, dueDateSel);

    return labelOk && assigneeOk && dueDateOk;
  };

  const filteredTaskIds = computed(() => {
    const result: Record<Column["id"], Task["id"][]> = {};
    for (const col of Object.values(columns.value)) {
      result[col.id] = col.taskIds.filter((id) => {
        const task = tasks.value[id];
        if (!task) return false;
        return matchesQuery(task, boardFilters.searchQuery.value) && matchesFilters(task, boardFilters);
      });
    }
    return result;
  });

  return filteredTaskIds;
};

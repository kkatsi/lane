import { useBoardsStore } from "@/stores/boards";
import { useAssigneesStore } from "@/stores/assignees";
import type { Column, Label, Task } from "@/types";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { UNASSIGNED } from "@/constants/assignees";

export const useCurrentBoard = () => {
  const boardsStore = useBoardsStore();
  const assigneesStore = useAssigneesStore();
  const route = useRoute();

  const boardId = computed(() => (route.params.boardId as string | undefined) ?? "");
  const board = computed(() => boardsStore.boards[boardId.value]);

  const name = computed(() => board.value?.name ?? "");
  const starred = computed(() => board.value?.starred ?? false);
  const columns = computed(() => board.value?.columns ?? {});
  const columnOrder = computed(() => board.value?.columnOrder ?? []);
  const tasks = computed(() => board.value?.tasks ?? {});
  const labels = computed(() => board.value?.labels ?? {});
  const assignees = computed(() => ({ ...assigneesStore.assignees, [UNASSIGNED.id]: UNASSIGNED }));

  const toggleStarred = () => boardsStore.toggleStarred(boardId.value);
  const editColumnTitle = (columnId: Column["id"], title: Column["title"]) =>
    boardsStore.editColumnTitle(boardId.value, columnId, title);
  const moveAllColumnTasksToAnotherColumn = (fromColId: Column["id"], toColId: Column["id"]) => {
    boardsStore.moveAllColumnTasksToAnotherColumn(boardId.value, fromColId, toColId);
  };
  const addColumn = (title: Column["title"]) => {
    boardsStore.addColumn(boardId.value, title);
  };
  const removeColumn = (columnId: Column["id"]) => {
    boardsStore.removeColumn(boardId.value, columnId);
  };
  const addTask = (columnId: Column["id"], task: Task) => boardsStore.addTask(boardId.value, columnId, task);
  const removeTask = (taskId: Task["id"]) => boardsStore.removeTask(boardId.value, taskId);
  const updateTask = (taskId: Task["id"], patch: Partial<Omit<Task, "id">>) =>
    boardsStore.updateTask(boardId.value, taskId, patch);
  const moveTask = (taskId: Task["id"], toColumnId: Column["id"], beforeTaskId: Task["id"] | null) =>
    boardsStore.moveTask(boardId.value, taskId, toColumnId, beforeTaskId);
  const addLabel = (label: Label) => boardsStore.addLabel(boardId.value, label);

  return {
    board,
    boardId,
    name,
    starred,
    columns,
    columnOrder,
    tasks,
    labels,
    assignees,
    toggleStarred,
    editColumnTitle,
    moveAllColumnTasksToAnotherColumn,
    addColumn,
    removeColumn,
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addLabel,
  };
};

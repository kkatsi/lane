import { useBoardsStore } from "@/stores/boards";
import type { Column, Label, Task } from "@/types";
import { computed } from "vue";
import { useRoute } from "vue-router";

export const useCurrentBoard = () => {
  const boardsStore = useBoardsStore();
  const route = useRoute();

  const boardId = computed(() => (route.params.boardId as string | undefined) ?? "");
  const board = computed(() => boardsStore.boards[boardId.value]);

  const name = computed(() => board.value?.name ?? "");
  const starred = computed(() => board.value?.starred ?? false);
  const columns = computed(() => board.value?.columns ?? {});
  const columnOrder = computed(() => board.value?.columnOrder ?? []);
  const tasks = computed(() => board.value?.tasks ?? {});
  const labels = computed(() => board.value?.labels ?? {});
  const assignees = computed(() => board.value?.assignees ?? {});

  const toggleStarred = () => boardsStore.toggleStarred(boardId.value);
  const addTask = (columnId: Column["id"], task: Task) =>
    boardsStore.addTask(boardId.value, columnId, task);
  const removeTask = (taskId: Task["id"]) => boardsStore.removeTask(boardId.value, taskId);
  const updateTask = (taskId: Task["id"], patch: Partial<Omit<Task, "id">>) =>
    boardsStore.updateTask(boardId.value, taskId, patch);
  const moveTask = (taskId: Task["id"], toColumnId: Column["id"], toIndex: number) =>
    boardsStore.moveTask(boardId.value, taskId, toColumnId, toIndex);
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
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addLabel,
  };
};

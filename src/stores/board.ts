import type { Board, Column, Label, Task } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { BOARDS_KEY } from "@/mocks/seed";

export const useBoardStore = defineStore("board", () => {
  const id = ref<Board["id"]>("");
  const name = ref<Board["name"]>("");
  const columns = ref<Board["columns"]>({});
  const columnOrder = ref<Board["columnOrder"]>([]);
  const tasks = ref<Board["tasks"]>({});
  const labels = ref<Board["labels"]>({});
  const assignees = ref<Board["assignees"]>({});

  const loadBoard = (boardId: Board["id"]) => {
    const raw = localStorage.getItem(BOARDS_KEY);
    if (!raw) return;
    const boards: Record<Board["id"], Board> = JSON.parse(raw);
    const board = boards[boardId];
    if (!board) return;
    id.value = board.id;
    name.value = board.name;
    columns.value = board.columns;
    columnOrder.value = board.columnOrder;
    tasks.value = board.tasks;
    labels.value = board.labels;
    assignees.value = board.assignees;
  };

  const addTask = (columnId: Column["id"], task: Task) => {
    const column = columns.value[columnId];
    if (!column) return;
    column.taskIds.push(task.id);
    tasks.value[task.id] = task;
  };

  const removeTask = (taskId: Task["id"]) => {
    for (const col of Object.values(columns.value)) {
      const idx = col.taskIds.indexOf(taskId);
      if (idx !== -1) {
        col.taskIds.splice(idx, 1);
        break;
      }
    }
    delete tasks.value[taskId];
  };

  const updateTask = (taskId: Task["id"], patch: Partial<Omit<Task, "id">>) => {
    const task = tasks.value[taskId];
    if (!task) return;
    Object.assign(task, patch);
  };

  const moveTask = (taskId: Task["id"], toColumnId: Column["id"], toIndex: number) => {
    const destinationColumn = columns.value[toColumnId];
    if (!destinationColumn) return;
    for (const column of Object.values(columns.value)) {
      const idx = column.taskIds.indexOf(taskId);
      if (idx !== -1) {
        column.taskIds.splice(idx, 1);
        break;
      }
    }
    destinationColumn.taskIds.splice(toIndex, 0, taskId);
  };

  const addLabel = (label: Label) => {
    labels.value[label.id] = label;
  };

  return {
    id,
    name,
    columns,
    columnOrder,
    tasks,
    labels,
    assignees,
    loadBoard,
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addLabel,
  };
});

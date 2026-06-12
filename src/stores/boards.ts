import { boardsRepo } from "@/repositories/boards";
import type { Board, BoardOverview, Column, Label, Task } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const toOverview = (board: Board): BoardOverview => {
  const assignees = Object.values(board.assignees);
  return {
    id: board.id,
    name: board.name,
    description: board.description,
    starred: board.starred,
    updatedAt: board.updatedAt,
    tasksCount: Object.keys(board.tasks).length,
    firstTwoAssignees: assignees.slice(0, 2),
    restAssigneesCount: Math.max(0, assignees.length - 2),
  };
};

export const useBoardsStore = defineStore("boards", () => {
  const boards = ref<Record<Board["id"], Board>>(boardsRepo.list());

  const boardOverviews = computed<Record<Board["id"], BoardOverview>>(() => {
    const out: Record<Board["id"], BoardOverview> = {};
    for (const board of Object.values(boards.value)) out[board.id] = toOverview(board);
    return out;
  });

  const starredBoardOverviews = computed<Record<Board["id"], BoardOverview>>(() => {
    const out: Record<Board["id"], BoardOverview> = {};
    for (const o of Object.values(boardOverviews.value)) {
      if (o.starred) out[o.id] = o;
    }
    return out;
  });

  const persist = (boardId: Board["id"]) => {
    const board = boards.value[boardId];
    if (board) boardsRepo.save(board);
  };

  const touch = (boardId: Board["id"]) => {
    const board = boards.value[boardId];
    if (board) board.updatedAt = new Date().toISOString();
  };

  const toggleStarred = (boardId: Board["id"]) => {
    const board = boards.value[boardId];
    if (!board) return;
    board.starred = !board.starred;
    touch(boardId);
    persist(boardId);
  };

  const addTask = (boardId: Board["id"], columnId: Column["id"], task: Task) => {
    const board = boards.value[boardId];
    const col = board?.columns[columnId];
    if (!board || !col) return;
    col.taskIds.push(task.id);
    board.tasks[task.id] = task;
    touch(boardId);
    persist(boardId);
  };

  const removeTask = (boardId: Board["id"], taskId: Task["id"]) => {
    const board = boards.value[boardId];
    if (!board) return;
    for (const col of Object.values(board.columns)) {
      const idx = col.taskIds.indexOf(taskId);
      if (idx !== -1) {
        col.taskIds.splice(idx, 1);
        break;
      }
    }
    delete board.tasks[taskId];
    touch(boardId);
    persist(boardId);
  };

  const updateTask = (
    boardId: Board["id"],
    taskId: Task["id"],
    patch: Partial<Omit<Task, "id">>,
  ) => {
    const task = boards.value[boardId]?.tasks[taskId];
    if (!task) return;
    Object.assign(task, patch);
    touch(boardId);
    persist(boardId);
  };

  const moveTask = (
    boardId: Board["id"],
    taskId: Task["id"],
    toColumnId: Column["id"],
    toIndex: number,
  ) => {
    const board = boards.value[boardId];
    const destination = board?.columns[toColumnId];
    if (!board || !destination) return;
    for (const col of Object.values(board.columns)) {
      const idx = col.taskIds.indexOf(taskId);
      if (idx !== -1) {
        col.taskIds.splice(idx, 1);
        break;
      }
    }
    destination.taskIds.splice(toIndex, 0, taskId);
    touch(boardId);
    persist(boardId);
  };

  const addLabel = (boardId: Board["id"], label: Label) => {
    const board = boards.value[boardId];
    if (!board) return;
    board.labels[label.id] = label;
    touch(boardId);
    persist(boardId);
  };

  return {
    boards,
    boardOverviews,
    starredBoardOverviews,
    toggleStarred,
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addLabel,
  };
});

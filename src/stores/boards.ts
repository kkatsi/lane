import { boardsRepo } from "@/repo/boards";
import type { Board, BoardOverview, Column, Label, Task } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const toOverview = (b: Board): BoardOverview => {
  const assignees = Object.values(b.assignees);
  return {
    id: b.id,
    name: b.name,
    description: b.description,
    starred: b.starred,
    updatedAt: b.updatedAt,
    tasksCount: Object.keys(b.tasks).length,
    firstTwoAssignees: assignees.slice(0, 2),
    restAssigneesCount: Math.max(0, assignees.length - 2),
  };
};

export const useBoardsStore = defineStore("boards", () => {
  const boards = ref<Record<Board["id"], Board>>(boardsRepo.list());

  const boardOverviews = computed<Record<Board["id"], BoardOverview>>(() => {
    const out: Record<Board["id"], BoardOverview> = {};
    for (const b of Object.values(boards.value)) out[b.id] = toOverview(b);
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
    const b = boards.value[boardId];
    if (b) boardsRepo.save(b);
  };

  const touch = (boardId: Board["id"]) => {
    const b = boards.value[boardId];
    if (b) b.updatedAt = new Date().toISOString();
  };

  const toggleStarred = (boardId: Board["id"]) => {
    const b = boards.value[boardId];
    if (!b) return;
    b.starred = !b.starred;
    touch(boardId);
    persist(boardId);
  };

  const addTask = (boardId: Board["id"], columnId: Column["id"], task: Task) => {
    const b = boards.value[boardId];
    const col = b?.columns[columnId];
    if (!b || !col) return;
    col.taskIds.push(task.id);
    b.tasks[task.id] = task;
    touch(boardId);
    persist(boardId);
  };

  const removeTask = (boardId: Board["id"], taskId: Task["id"]) => {
    const b = boards.value[boardId];
    if (!b) return;
    for (const col of Object.values(b.columns)) {
      const idx = col.taskIds.indexOf(taskId);
      if (idx !== -1) {
        col.taskIds.splice(idx, 1);
        break;
      }
    }
    delete b.tasks[taskId];
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
    const b = boards.value[boardId];
    const destination = b?.columns[toColumnId];
    if (!b || !destination) return;
    for (const col of Object.values(b.columns)) {
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
    const b = boards.value[boardId];
    if (!b) return;
    b.labels[label.id] = label;
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

import { buildKanbanColumnRelatedBoardProps, buildSprintColumnRelatedBoardProps } from "@/lib/builders";
import { boardsRepo } from "@/repositories/boards";
import type { NewBoardValues } from "@/schemas/boardValidationSchema";
import type { Board, BoardOverview, Column, Comment, Label, Task } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const toOverview = (board: Board): BoardOverview => {
  const assignees = Object.values(board.assignees);
  return {
    id: board.id,
    name: board.name,
    description: board.description,
    colorId: board.colorId,
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

  const addBoard = (boardValues: NewBoardValues) => {
    let columnRelatedProps: Pick<Board, "columnOrder" | "columns">;
    switch (boardValues.templateId) {
      case "kanban_basics":
        columnRelatedProps = buildKanbanColumnRelatedBoardProps();
        break;
      case "sprint_workflow":
        columnRelatedProps = buildSprintColumnRelatedBoardProps();
        break;
      case "blank":
        columnRelatedProps = { columnOrder: [], columns: {} };
        break;
    }

    const newBoard = {
      id: crypto.randomUUID(),
      colorId: boardValues.colorId,
      description: boardValues.description,
      name: boardValues.name,
      tasks: {},
      starred: false,
      assignees: {},
      labels: {},
      updatedAt: new Date().toISOString(),
      ...columnRelatedProps,
    } satisfies Board;

    boards.value[newBoard.id] = newBoard;
    boardsRepo.save(newBoard);

    return newBoard.id;
  };

  const editColumnTitle = (boardId: Board["id"], columnId: Column["id"], title: Column["title"]) => {
    const board = boards.value[boardId];
    const col = board?.columns[columnId];
    if (!board || !col) return;
    col.title = title;
    touch(boardId);
    persist(boardId);
  };

  const moveAllColumnTasksToAnotherColumn = (boardId: Board["id"], fromColId: Column["id"], toColId: Column["id"]) => {
    const board = boards.value[boardId];
    const fromCol = board?.columns[fromColId];
    const toCol = board?.columns[toColId];
    if (!board || !fromCol || !toCol) return;
    toCol.taskIds.push(...fromCol.taskIds);
    fromCol.taskIds.length = 0;
    touch(boardId);
    persist(boardId);
  };

  const addColumn = (boardId: Board["id"], title: Column["title"]) => {
    const board = boards.value[boardId];
    if (!board) return;
    const newColumnId = crypto.randomUUID();
    board.columns[newColumnId] = {
      id: newColumnId,
      title,
      taskIds: [],
    };
    board.columnOrder.push(newColumnId);
    touch(boardId);
    persist(boardId);
  };

  const removeColumn = (boardId: Board["id"], columnId: Column["id"]) => {
    const board = boards.value[boardId];
    const col = board?.columns[columnId];
    if (!board || !col) return;
    col.taskIds.forEach((id) => delete board.tasks[id]);
    board.columnOrder = board.columnOrder.filter((colId) => colId !== columnId);
    delete board.columns[columnId];
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

  const updateTask = (boardId: Board["id"], taskId: Task["id"], patch: Partial<Omit<Task, "id">>) => {
    const task = boards.value[boardId]?.tasks[taskId];
    if (!task) return;
    Object.assign(task, patch);
    touch(boardId);
    persist(boardId);
  };

  const moveTask = (boardId: Board["id"], taskId: Task["id"], toColumnId: Column["id"], toIndex: number) => {
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

  const addComment = (
    boardId: Board["id"],
    taskId: Task["id"],
    commentText: Comment["text"],
    assigneeId: Comment["assigneeId"],
  ) => {
    const task = boards.value[boardId]?.tasks[taskId];
    if (!task) return;
    const comment: Comment = {
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
      text: commentText,
      assigneeId,
    };
    if (task.comments) task.comments.push(comment);
    else task.comments = [comment];
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
    addBoard,
    editColumnTitle,
    moveAllColumnTasksToAnotherColumn,
    addColumn,
    removeColumn,
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addLabel,
    addComment,
  };
});

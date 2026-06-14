import type { Board } from "@/types";

export const buildKanbanColumnRelatedBoardProps = (): Pick<Board, "columns" | "columnOrder"> => {
  const kanbanColumnIds = {
    todo: crypto.randomUUID(),
    inProgress: crypto.randomUUID(),
    done: crypto.randomUUID(),
  };
  return {
    columns: {
      [kanbanColumnIds.todo]: {
        id: kanbanColumnIds.todo,
        title: "To do",
        taskIds: [],
      },
      [kanbanColumnIds.inProgress]: {
        id: kanbanColumnIds.inProgress,
        title: "In Progress",
        taskIds: [],
      },
      [kanbanColumnIds.done]: {
        id: kanbanColumnIds.done,
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: [kanbanColumnIds.todo, kanbanColumnIds.inProgress, kanbanColumnIds.done],
  };
};

export const buildSprintColumnRelatedBoardProps = (): Pick<Board, "columns" | "columnOrder"> => {
  const sprintColumnId = {
    backlog: crypto.randomUUID(),
    todo: crypto.randomUUID(),
    inProgress: crypto.randomUUID(),
    review: crypto.randomUUID(),
    done: crypto.randomUUID(),
  };
  return {
    columns: {
      [sprintColumnId.backlog]: {
        id: sprintColumnId.backlog,
        title: "Backlog",
        taskIds: [],
      },
      [sprintColumnId.todo]: {
        id: sprintColumnId.todo,
        title: "To do",
        taskIds: [],
      },
      [sprintColumnId.inProgress]: {
        id: sprintColumnId.inProgress,
        title: "In Progress",
        taskIds: [],
      },
      [sprintColumnId.review]: {
        id: sprintColumnId.review,
        title: "In Review",
        taskIds: [],
      },
      [sprintColumnId.done]: {
        id: sprintColumnId.done,
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: [
      sprintColumnId.backlog,
      sprintColumnId.todo,
      sprintColumnId.inProgress,
      sprintColumnId.review,
      sprintColumnId.done,
    ],
  };
};

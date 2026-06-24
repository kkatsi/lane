import type { Board } from "@/types";
import { UNASSIGNED_ID } from "@/constants/assignees";

export const BOARDS_KEY = "lane:boards";

const loadAll = (): Record<Board["id"], Board> => {
  const boards: Record<Board["id"], Board> = JSON.parse(localStorage.getItem(BOARDS_KEY) ?? "{}");
  for (const board of Object.values(boards)) {
    for (const task of Object.values(board.tasks)) {
      if (!task.assigneeId) task.assigneeId = UNASSIGNED_ID;
    }
  }
  return boards;
};

const saveAll = (boards: Record<Board["id"], Board>) => localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));

export const boardsRepo = {
  list: loadAll,
  save: (board: Board) => {
    const boards = loadAll();
    boards[board.id] = board;
    saveAll(boards);
  },
  remove: (id: Board["id"]) => {
    const boards = loadAll();
    delete boards[id];
    saveAll(boards);
  },
};

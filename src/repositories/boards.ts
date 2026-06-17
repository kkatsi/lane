import type { Board } from "@/types";

export const BOARDS_KEY = "lane:boards";

const loadAll = (): Record<Board["id"], Board> => JSON.parse(localStorage.getItem(BOARDS_KEY) ?? "{}");

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

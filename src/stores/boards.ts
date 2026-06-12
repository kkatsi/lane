import { BOARD_OVERVIEWS_KEY } from "@/mocks/seed";
import type { BoardOverview } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardsStore = defineStore("boards", () => {
  const raw = localStorage.getItem(BOARD_OVERVIEWS_KEY);
  const initial: Record<BoardOverview["id"], BoardOverview> = raw ? JSON.parse(raw) : {};

  const allBoardOverviews = ref(initial);

  const toggleStarredBoard = (boardId: BoardOverview["id"]) => {
    const selectedBoard = allBoardOverviews.value[boardId];
    if (!selectedBoard) return;
    selectedBoard.starred = !selectedBoard.starred;
  };

  return { allBoardOverviews, toggleStarredBoard };
});

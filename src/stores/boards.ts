import type { BoardOverview } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { BOARD_OVERVIEWS_KEY } from "@/mocks/seed";

export const useBoardsStore = defineStore("boards", () => {
  const raw = localStorage.getItem(BOARD_OVERVIEWS_KEY);
  const initial: Record<BoardOverview["id"], BoardOverview> = raw ? JSON.parse(raw) : {};

  const allBoardOverviews = ref(initial);

  const starredBoardOverviews = computed<Record<BoardOverview["id"], BoardOverview>>(() => {
    const result: Record<BoardOverview["id"], BoardOverview> = {};
    for (const boardOverview of Object.values(allBoardOverviews.value)) {
      if (boardOverview.starred) result[boardOverview.id] = boardOverview;
    }
    return result;
  });

  return { allBoardOverviews, starredBoardOverviews };
});

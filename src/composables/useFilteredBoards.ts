import { useBoardsStore } from "@/stores/boards";
import { useUIStore } from "@/stores/ui";
import type { BoardOverview } from "@/types";
import { computed } from "vue";

export const useFilteredBoards = () => {
  const boardsStore = useBoardsStore();
  const uiStore = useUIStore();

  const filteredBoards = computed(() => {
    const allBoardOverviews: Record<BoardOverview["id"], BoardOverview> = {};
    const starredBoardOverviews: Record<BoardOverview["id"], BoardOverview> = {};

    for (const boardOverview of Object.values(boardsStore.allBoardOverviews)) {
      const match = boardOverview.name.toLowerCase().includes(uiStore.searchQuery.toLowerCase());
      if (match) {
        if (boardOverview.starred) starredBoardOverviews[boardOverview.id] = boardOverview;
        allBoardOverviews[boardOverview.id] = boardOverview;
      }
    }
    return {
      allBoardOverviews,
      starredBoardOverviews,
      resultsCount:
        Object.values(allBoardOverviews).length + Object.values(starredBoardOverviews).length,
    };
  });

  return filteredBoards;
};

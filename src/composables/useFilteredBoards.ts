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
    const query = uiStore.searchQuery.toLowerCase();

    for (const overview of Object.values(boardsStore.boardOverviews)) {
      const match = overview.name.toLowerCase().includes(query);
      if (!match) continue;
      allBoardOverviews[overview.id] = overview;
      if (overview.starred) starredBoardOverviews[overview.id] = overview;
    }

    return {
      allBoardOverviews,
      starredBoardOverviews,
      resultsCount: Object.values(allBoardOverviews).length,
    };
  });

  return filteredBoards;
};

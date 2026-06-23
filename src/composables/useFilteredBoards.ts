import { useBoardsStore } from "@/stores/boards";
import type { BoardOverview } from "@/types";
import { computed } from "vue";
import { useSearchQueryRef } from "./useSearchQueryRef";

export const useFilteredBoards = () => {
  const boardsStore = useBoardsStore();
  const searchQuery = useSearchQueryRef();
  const filteredBoards = computed(() => {
    const allBoardOverviews: Record<BoardOverview["id"], BoardOverview> = {};
    const starredBoardOverviews: Record<BoardOverview["id"], BoardOverview> = {};
    const query = searchQuery.value.toLowerCase();

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

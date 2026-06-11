import { useBoardsStore } from "@/stores/boards";
import { useUIStore } from "@/stores/ui";
import type { BoardOverview } from "@/types";
import { computed } from "vue";

export const useFilteredBoards = () => {
  const boardsStore = useBoardsStore();
  const uiStore = useUIStore();

  const filteredBoards = computed(() => {
    const result: BoardOverview[] = [];
    for (const boardOverview of Object.values(boardsStore.allBoardOverviews)) {
      const match = boardOverview.name.toLowerCase().includes(uiStore.searchQuery.toLowerCase());
      if (match) result.push(boardOverview);
    }
    return result;
  });

  return filteredBoards;
};

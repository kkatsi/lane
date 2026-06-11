import { useBoardStore } from "@/stores/board";
import { watch } from "vue";
import { useRoute } from "vue-router";

export const useCurrentBoard = () => {
  const boardStore = useBoardStore();
  const route = useRoute();

  watch(
    () => route.params.boardId,
    (boardId) => {
      if (typeof boardId === "string") boardStore.loadBoard(boardId);
    },
    { immediate: true },
  );
};

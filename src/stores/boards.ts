import type { BoardOverview } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { BOARD_OVERVIEWS_KEY } from "@/mocks/seed";

export const useBoardsStore = defineStore("boards", () => {
  const raw = localStorage.getItem(BOARD_OVERVIEWS_KEY);
  const initial: Record<BoardOverview["id"], BoardOverview> = raw ? JSON.parse(raw) : {};
  const boardOverviews = ref(initial);

  return { boardOverviews };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const isDragging = ref<boolean>(false);

  return { isDragging };
});

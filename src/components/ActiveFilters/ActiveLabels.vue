<template>
  <ActiveFilter
    v-for="label in selectedLabels"
    :id="label.id"
    @clear="onClear"
    class="border-0"
    :style="{
      color: COLORS.find((c) => c.id === label.colorId)?.text,
      backgroundColor: COLORS.find((c) => c.id === label.colorId)?.background,
    }"
  >
    {{ label.name }}
  </ActiveFilter>
</template>

<script setup lang="ts">
import { useBoardFilters } from "@/composables/useBoardFilters";
import ActiveFilter from "./ActiveFilter.vue";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { computed } from "vue";
import { COLORS } from "@/constants/colors.ts";

const { labels } = useCurrentBoard();
const { labelIds } = useBoardFilters();

const selectedLabels = computed(() => Object.values(labels.value).filter((l) => labelIds.value.includes(l.id)));
const onClear = (labelId: string) => {
  labelIds.value = labelIds.value.filter((lId) => lId !== labelId);
};
</script>

<style scoped></style>

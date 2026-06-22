<template>
  <div ref="scrollableElement" class="flex-1 min-h-0 flex items-stretch gap-4 py-3 px-4 overflow-x-auto h-full">
    <Column v-for="column in orderedColumns" :key="column.id" :column="column" />
    <NewColumnComposer v-if="isAddingNewColumn" @close="onAddNewColumnComposerClose" />
  </div>
</template>

<script setup lang="ts">
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useSearchQuery } from "@/composables/useSearchQuery";
import { isDefined } from "@/lib/utils.ts";
import { useUIStore } from "@/stores/ui";
import { storeToRefs } from "pinia";
import { computed, nextTick, useTemplateRef, watch } from "vue";
import Column from "./Column/Column.vue";
import NewColumnComposer from "./NewColumnComposer.vue";

const isAddingNewColumn = defineModel<boolean>("isAddingNewColumn");

const { searchQuery } = storeToRefs(useUIStore());
const { provideSearchQuery } = useSearchQuery();
provideSearchQuery(searchQuery);

const scrollableElement = useTemplateRef<HTMLDivElement>("scrollableElement");

watch(
  () => isAddingNewColumn.value,
  async (v) => {
    if (!v) return;
    await nextTick();
    scrollableElement.value?.scrollTo({ left: scrollableElement.value.scrollWidth, behavior: "smooth" });
  },
);

const { columnOrder, columns } = useCurrentBoard();

const orderedColumns = computed(() => columnOrder.value.map((id) => columns.value[id]).filter(isDefined));

const onAddNewColumnComposerClose = () => {
  isAddingNewColumn.value = false;
};
</script>

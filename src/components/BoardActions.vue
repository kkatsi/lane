<template>
  <div class="flex gap-2 items-start w-full py-3 px-4">
    <Search class="max-w-72 min-w-56" v-model="search" placeholder="Search..." :results-count="resultsCount" />
    <div class="flex flex-wrap items-center gap-2 flex-1">
      <Filters />
      <ActiveFilters />
    </div>
    <div class="ml-auto flex items-center gap-2">
      <Button v-if="hasActiveFilters" variant="ghost" class="text-muted-foreground" @click="props.onClearAll">
        Clear all
      </Button>
      <Button variant="outline" @click="props.onAddNewColumn">
        <Plus />
        Add column
      </Button>
      <!-- <Button variant="outline" @click="onShare">
        <Share />
        Share
      </Button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilteredTaskIds } from "@/composables/useFilteredTaskIds.ts";
import { useSearchQueryRef } from "@/composables/useSearchQueryRef.ts";
import { Plus, Share } from "@lucide/vue";
import { watchDebounced } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import Filters from "./Filters/Filters.vue";
import Search from "./Search.vue";
import Button from "./ui/button/Button.vue";
import ActiveFilters from "./ActiveFilters/ActiveFilters.vue";
import { useBoardFilters } from "@/composables/useBoardFilters.ts";
import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options.ts";

interface Props {
  onAddNewColumn: () => void;
  onClearAll: () => void;
}
const props = defineProps<Props>();

const { assigneeIds, dueDate, labelIds, searchQuery } = useBoardFilters();
const hasActiveFilters = computed(
  () =>
    !!assigneeIds.value.length ||
    !!labelIds.value.length ||
    dueDate.value !== DATE_FILTER_OPTIONS.ANYTIME.id ||
    !!searchQuery.value,
);

const search = ref<string>(searchQuery.value);

watch(searchQuery, (v) => {
  search.value = v;
});

watchDebounced(
  search,
  () => {
    searchQuery.value = search.value;
  },
  { debounce: 300 },
);

const filteredTaskIds = useFilteredTaskIds();
const resultsCount = computed(() =>
  searchQuery.value ? Object.values(filteredTaskIds.value).reduce((acc, col) => (acc += col.length), 0) : null,
);

const onShare = () => {};
</script>

<style scoped></style>

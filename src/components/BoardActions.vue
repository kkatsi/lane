<template>
  <div class="flex gap-2 items-center w-full py-3 px-4">
    <Search class="max-w-72" v-model="search" placeholder="Search..." :results-count="resultsCount" />
    <Filters />
    <div class="ml-auto flex items-center gap-2">
      <Button variant="outline" @click="props.onAddNewColumn">
        <Plus />
        Add column
      </Button>
      <Button variant="outline" @click="onShare">
        <Share />
        Share
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilteredTaskIds } from "@/composables/useFilteredTaskIds.ts";
import { useSearchQueryRef } from "@/composables/useSearchQueryRef.ts";
import { Plus, Share } from "@lucide/vue";
import { watchDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import Filters from "./Filters/Filters.vue";
import Search from "./Search.vue";
import Button from "./ui/button/Button.vue";

interface Props {
  onAddNewColumn: () => void;
}
const props = defineProps<Props>();

const searchQuery = useSearchQueryRef();

const search = ref<string>(searchQuery.value);
searchQuery.value = search.value;

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

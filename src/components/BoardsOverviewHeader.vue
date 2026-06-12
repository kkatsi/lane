<template>
  <div class="flex items-center w-full">
    <h1 class="text-2xl">Boards</h1>
    <div class="ml-auto flex items-center gap-2">
      <Search v-model:model-value="search" :results-count="resultsCount" />
      <RouterLink :to="{ name: 'new-board' }" as-child>
        <Button>
          <Plus />
          New Board
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { computed, ref } from 'vue';
import Search from './Search.vue';
import { useUIStore } from '@/stores/ui.ts';
import { useFilteredBoards } from '@/composables/useFilteredBoards.ts';
import Button from './ui/button/Button.vue';
import { Plus } from '@lucide/vue';

const uiStore = useUIStore();
const search = ref<string>('');

watchDebounced(search, () => {
  uiStore.searchQuery = search.value;
}, { debounce: 300 })

const filteredBoards = useFilteredBoards();
const resultsCount = computed(() => uiStore.searchQuery ? filteredBoards.value.resultsCount : null)

</script>

<style scoped></style>

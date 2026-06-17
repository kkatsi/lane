<template>
  <div class="filters-popover">
    <slot v-for="filter in uiStore.filters">
      <MultiSelectFilter
        v-if="filter.selection === 'multiple'"
        :title="filter.title"
        :items="filter.options"
        v-model:selected="filter.selected"
      />
      <SingleSelectFilter v-else :title="filter.title" :items="filter.options" v-model:selected="filter.selected" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from "@/stores/ui.ts";
import MultiSelectFilter from "./MultiSelectFilter.vue";
import SingleSelectFilter from "./SingleSelectFilter.vue";

const uiStore = useUIStore();
</script>

<style scoped>
.filters-popover {
}
</style>

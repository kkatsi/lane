<template>
  <ActiveFilter v-if="dueDate !== DATE_FILTER_OPTIONS.ANYTIME.id" :id="dueDate" @clear="onClear">
    <Calendar1 />
    {{ selectedDateFilterName }}
  </ActiveFilter>
</template>

<script setup lang="ts">
import { Calendar1 } from "@lucide/vue";
import ActiveFilter from "./ActiveFilter.vue";
import { useBoardFilters } from "@/composables/useBoardFilters";
import { computed } from "vue";
import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options";

const { dueDate } = useBoardFilters();
const selectedDateFilterName = computed(
  () => Object.values(DATE_FILTER_OPTIONS).find((d) => d.id === dueDate.value)?.name,
);

const onClear = () => {
  dueDate.value = DATE_FILTER_OPTIONS.ANYTIME.id;
};
</script>

<style scoped></style>

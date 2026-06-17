<template>
  <div>
    <div class="header">
      <span>{{ props.title }}</span>
      <span v-if="selectedItemsCount > 0">{{ selectedItemsCount }} selected</span>
    </div>
    <div class="content">
      <label v-for="item in items" :key="item.id">
        <input type="checkbox" :value="item.id" v-model="selected" />
        <span>{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FilterOption, Filter } from "@/types";

interface Props {
  title: string;
  items: FilterOption[];
}

const props = defineProps<Props>();
const selected = defineModel<Filter["selected"]>("selected");
const selectedItemsCount = computed(() => selected.value?.length ?? 0);
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: column;
}
</style>

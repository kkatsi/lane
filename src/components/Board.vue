<template>
  <div class="board">
    <Column v-for="category in props.categories" :key="category.title" v-bind="category" />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types'
import Column from './Column.vue'

interface Props {
  categories: Category[]
}

const props = defineProps<Props>()
</script>

<style scoped>
.board {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

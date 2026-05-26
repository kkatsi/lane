<template>
  <div class="board">
    <Column v-for="column in props.columns" :key="column.title" v-bind="column" />
  </div>
</template>

<script setup lang="ts">
import type { Board } from '@/types'
import Column from './Column.vue'

interface Props extends Board {}

const props = defineProps<Props>()
</script>

<style scoped>
.board {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

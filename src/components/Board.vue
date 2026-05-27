<template>
  <div class="board">
    <Column v-for="column in orderedColumns" :key="column.id" :column="column" />
  </div>
</template>

<script setup lang="ts">
import { isDefined } from '@/lib/utils.ts'
import { useBoardStore } from '@/stores/board.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Column from './Column.vue'

const boardStore = useBoardStore()
const { columnOrder, columns } = storeToRefs(boardStore)

const orderedColumns = computed(() =>
  columnOrder.value.map((id) => columns.value[id]).filter(isDefined),
)
</script>

<style scoped>
.board {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

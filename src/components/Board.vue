<template>
  <div class="board">
    <Column v-for="column in orderedColumns" :key="column.id" :column="column" />
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '@/stores/board.ts'
import { storeToRefs } from 'pinia'
import Column from './Column.vue'
import { computed } from 'vue'
import { isDefined } from '@/lib/utils.ts'

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

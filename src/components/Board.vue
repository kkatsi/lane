<template>
  <div class="flex items-center gap-4">
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

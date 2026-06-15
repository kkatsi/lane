<template>
  <div class="flex-1 min-h-0 flex items-stretch gap-4 py-3 px-4 overflow-x-auto h-full">
    <Column v-for="column in orderedColumns" :key="column.id" :column="column" />
  </div>
</template>

<script setup lang="ts">
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import { isDefined } from '@/lib/utils.ts'
import { computed } from 'vue'
import Column from './Column.vue'

const { columnOrder, columns } = useCurrentBoard()

const orderedColumns = computed(() =>
  columnOrder.value.map((id) => columns.value[id]).filter(isDefined),
)
</script>

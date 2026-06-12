<template>
  <div class="flex items-center gap-4">
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

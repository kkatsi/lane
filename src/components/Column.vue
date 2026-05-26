<template>
  <div class="column">
    <div class="header">
      <div class="left-side">
        <span class="title">{{ props.column.title }}</span>
        <span class="items-count">{{ columnTasks.length }}</span>
      </div>
      <div class="right-side">
        <div class="actions">
          <button class="add-button" @click="onAdd">+</button>
        </div>
      </div>
    </div>
    <div class="content">
      <Card v-for="task in columnTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types'
import Card from './Card.vue'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { isDefined } from '@/lib/utils.ts'

interface Props {
  column: Column
}

const props = defineProps<Props>()

const boardStore = useBoardStore()
const { tasks } = storeToRefs(boardStore)
const { addTask } = boardStore

const columnTasks = computed(() =>
  props.column.taskIds.map((id) => tasks.value[id]).filter(isDefined),
)

const onAdd = () => {
  addTask(props.column.id, {
    id: crypto.randomUUID(),
    title: 'This is a new task',
    description: 'Lorem Ipsumidis',
    assigneeFullName: 'Penelope Kyratsou',
    dueDate: '2026-05-24T17:28:25+00:00',
    labelIds: ['bug'],
  })
}
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-side {
  display: flex;
  gap: 4px;
  align-items: center;
}

.content {
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

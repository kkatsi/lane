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

    <VueDraggable
      :data-column-id="props.column.id"
      class="content"
      :model-value="columnTasks"
      ghostClass="ghost"
      group="board"
      @end="onDragEnd"
    >
      <Card v-for="task in columnTasks" :key="task.id" :task="task" />
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import type { Column, Task } from '@/types'
import Card from './Card.vue'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { isDefined } from '@/lib/utils.ts'
import { VueDraggable, type DraggableEvent } from 'vue-draggable-plus'
import { useFilteredTaskIds } from '@/composables/useFilteredTaskIds.ts'

interface Props {
  column: Column
}

const props = defineProps<Props>()

const boardStore = useBoardStore()
const filteredTaskIds = useFilteredTaskIds()
const { tasks } = storeToRefs(boardStore)
const { addTask, moveTask } = boardStore

const columnTasks = computed(() => {
  const columnTaskIds = filteredTaskIds.value[props.column.id]
  if (!columnTaskIds) return []
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined)
})

const onAdd = () => {
  addTask(props.column.id, {
    id: crypto.randomUUID(),
    title: 'This is a new task',
    description: 'Lorem Ipsumidis',
    assigneeId: 'Penelope Kyratsou',
    dueDate: '2026-05-24T17:28:25+00:00',
    labelIds: ['bug'],
  })
}

const onDragEnd = (e: DraggableEvent<Task>) => {
  const taskId = e.data.id
  const toIndex = e.newIndex
  const toColumnId = e.to.dataset['columnId']

  if (!taskId || !isDefined(toIndex) || !toColumnId) return

  moveTask(taskId, toColumnId, toIndex)
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

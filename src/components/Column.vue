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
      <Task v-for="task in columnTasks" :key="task.id" :task="task" />
    </VueDraggable>
    <NewTask v-if="isAddingNewTask" :column-id="props.column.id" :onNewTaskAdded="onNewTaskAdded" />
  </div>
</template>

<script setup lang="ts">
import type { Column, Task as TaskType } from '@/types'
import Task from './Task.vue'
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import { computed, ref } from 'vue'
import { isDefined } from '@/lib/utils.ts'
import { VueDraggable, type DraggableEvent } from 'vue-draggable-plus'
import { useFilteredTaskIds } from '@/composables/useFilteredTaskIds.ts'
import NewTask from './NewTask/NewTask.vue'

interface Props {
  column: Column
}

const props = defineProps<Props>()

const { tasks, moveTask } = useCurrentBoard()
const filteredTaskIds = useFilteredTaskIds()

const columnTasks = computed(() => {
  const columnTaskIds = filteredTaskIds.value[props.column.id]
  if (!columnTaskIds) return []
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined)
})

const isAddingNewTask = ref<boolean>(false)

const onAdd = () => {
  isAddingNewTask.value = true
}

const onNewTaskAdded = () => (isAddingNewTask.value = false)

const onDragEnd = (e: DraggableEvent<TaskType>) => {
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

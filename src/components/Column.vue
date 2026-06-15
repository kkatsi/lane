<template>
  <div class="min-w-70 max-w-70 flex flex-col h-full">
    <div class="flex items-center justify-between shrink-0">
      <div class="flex items-center gap-2">
        <span>{{ props.column.title }}</span>
        <span>{{ columnTasks.length }}</span>
      </div>
      <button @click="onAdd">+</button>
    </div>

    <VueDraggable :data-column-id="props.column.id"
      class="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 py-2"
      :model-value="columnTasks" ghostClass="ghost" group="board" @end="onDragEnd">
      <Task v-for="task in columnTasks" :key="task.id" :task="task" />
    </VueDraggable>
    <NewTask v-if="isAddingNewTask" class="shrink-0" :column-id="props.column.id" :onNewTaskAdded="onNewTaskAdded" />
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

<style scoped></style>

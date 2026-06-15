<template>
  <div class="min-w-70 max-w-70 flex flex-col h-full">
    <ColumnHeader :column-id="props.column.id" :column-title="props.column.title" :tasks-length="columnTasks.length"
      @add-new-task-action-select="onAddNewTaskActionSelect" />

    <VueDraggable :data-column-id="props.column.id" class="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 py-2"
      :model-value="columnTasks" ghostClass="ghost" group="board" @end="onDragEnd">
      <Task v-for="task in columnTasks" :key="task.id" :task="task" />
    </VueDraggable>
    <NewTask v-if="isAddingNewTask" class="shrink-0" :column-id="props.column.id" :onNewTaskAdded="onNewTaskAdded" />
  </div>
</template>

<script setup lang="ts">
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import { useFilteredTaskIds } from '@/composables/useFilteredTaskIds.ts'
import { isDefined } from '@/lib/utils.ts'
import type { Column, Task as TaskType } from '@/types'
import { computed, ref } from 'vue'
import { VueDraggable, type DraggableEvent } from 'vue-draggable-plus'
import ColumnHeader from './ColumnHeader.vue'
import NewTask from './NewTask/NewTask.vue'
import Task from './Task.vue'

interface Props {
  column: Column
}

const props = defineProps<Props>()

const { tasks, moveTask } = useCurrentBoard()
const filteredTaskIds = useFilteredTaskIds()

const isAddingNewTask = ref<boolean>(false)

const columnTasks = computed(() => {
  const columnTaskIds = filteredTaskIds.value[props.column.id]
  if (!columnTaskIds) return []
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined)
})

const onAddNewTaskActionSelect = () => isAddingNewTask.value = true;

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

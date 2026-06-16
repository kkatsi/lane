<template>
  <div class="min-w-70 max-w-70 flex flex-col h-full">
    <ColumnHeader :column-id="props.column.id" :column-title="props.column.title" :tasks-length="columnTasks.length"
      @add-new-task-action-select="onAddNewTaskActionSelect" />
    <VueDraggable :data-column-id="props.column.id" class="min-h-0 overflow-y-auto flex flex-col gap-2 py-2 px-1"
      :model-value="columnTasks" ghostClass="ghost" group="board" @end="onDragEnd">
      <Task v-for="task in columnTasks" :key="task.id" v-bind="task" :column-id="props.column.id" />
    </VueDraggable>
    <TaskComposer v-if="isAddingNewTask" class="shrink-0" :column-id="props.column.id" @submit="onNewTaskSubmit"
      @close="onAddNewTaskComposerClose" />
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
import Task from './Task/Task.vue'
import TaskComposer from './TaskComposer/TaskComposer.vue'

interface Props {
  column: Column
}

const props = defineProps<Props>()

const { tasks, moveTask, addTask } = useCurrentBoard()
const filteredTaskIds = useFilteredTaskIds()

const isAddingNewTask = ref<boolean>(false)

const columnTasks = computed(() => {
  const columnTaskIds = filteredTaskIds.value[props.column.id]
  if (!columnTaskIds) return []
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined)
})

const onAddNewTaskActionSelect = () => isAddingNewTask.value = true;

const onDragEnd = (e: DraggableEvent<TaskType>) => {
  const taskId = e.data.id
  const toIndex = e.newIndex
  const toColumnId = e.to.dataset['columnId']

  if (!taskId || !isDefined(toIndex) || !toColumnId) return

  moveTask(taskId, toColumnId, toIndex)
}

const onAddNewTaskComposerClose = () => {
  isAddingNewTask.value = false;
}

const onNewTaskSubmit = (newTaskWithoutId: Omit<TaskType, 'id'>) => {
  addTask(props.column.id, {
    id: crypto.randomUUID(),
    ...newTaskWithoutId
  })
  isAddingNewTask.value = false;
}
</script>

<style scoped></style>

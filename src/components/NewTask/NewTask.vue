<template>
  <form class="new-task" @submit="onSubmit">
    <input type="text" name="title" id="title" />
    <textarea ref="textarea" v-model="input" name="description" id="description" rows="3">
    </textarea>
    <LabelsPicker v-model="selectedLabelIds" />
    <AssigneePicker v-model="selectedAssigneeId" />
    <DueDatePicker />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useBoardStore } from '@/stores/board'
import { useTextareaAutosize } from '@vueuse/core'
import { newTaskSchema } from '@/lib/taskValidationSchema'
import LabelsPicker from './LabelsPicker.vue'
import type { Assignee, Label } from '@/types.ts'
import { ref } from 'vue'
import AssigneePicker from './AssigneePicker.vue'
import DueDatePicker from './DueDatePicker.vue'

const props = defineProps<{ columnId: string; onNewTaskAdded: () => void }>()

const { addTask } = useBoardStore()
const { textarea, input } = useTextareaAutosize({ styleProp: 'minHeight' })

const selectedLabelIds = ref<Label['id'][]>([])
const selectedAssigneeId = ref<Assignee['id'] | null>(null)

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const result = newTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    labelIds: selectedLabelIds.value,
    assigneeId: selectedAssigneeId,
    dueDate: formData.get('dueDate') || null,
  })

  if (!result.success) {
    console.log(result.error)

    return
  }

  addTask(props.columnId, {
    id: crypto.randomUUID(),
    ...result.data,
  })
  props.onNewTaskAdded()
}
</script>

<style scoped>
.new-task {
  textarea {
    resize: none;
  }
}
</style>

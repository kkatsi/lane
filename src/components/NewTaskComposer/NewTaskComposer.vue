<template>
  <form ref="formElement" @submit="onSubmit" class="rounded-lg p-2 ring-1 ring-primary flex flex-col gap-2">
    <Textarea ref="textareaRef" placeholder="What needs to be done?" v-model="taskDescription" class="resize-none"
      name="description" id="description" rows="3" @keydown.enter.exact.prevent="onEnter" @keyup.esc="onClose" />
    <div class="flex items-center justify-between">
      <LabelsPicker v-model="selectedLabelIds" />
      <AssigneePicker v-model:selected-assignee-id="selectedAssigneeId" />
      <DueDatePicker v-model:due-date="selectedDueDate" />
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Kbd>
          <CornerDownLeft />
          Enter
        </Kbd>
        Add
      </span>
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Kbd>
          Esc
        </Kbd>
        Cancel
      </span>
      <div class="flex items-center gap-1 ml-auto">
        <Button size="sm" variant="ghost" @click="onClose" type="button">
          Cancel
        </Button>
        <Button size="sm" type="submit">
          Add
        </Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import { newTaskSchema } from '@/schemas/taskValidationSchema.ts'
import type { Assignee, Label, Task } from '@/types.ts'
import { onMounted, ref, useTemplateRef } from 'vue'
import Textarea from '../ui/textarea/Textarea.vue'
import AssigneePicker from './AssigneePicker.vue'
import DueDatePicker from './DueDatePicker.vue'
import LabelsPicker from './LabelsPicker.vue'
import Kbd from '../ui/kbd/Kbd.vue'
import { CornerDownLeft } from '@lucide/vue'
import Button from '../ui/button/Button.vue'
import { notifyError } from '@/lib/notifyError.ts'

interface Props {
  columnId: string;
}

const props = defineProps<Props>()

const isAddingNewTask = defineModel<boolean>('isAddingNewTask')

const textareaRef = useTemplateRef<{
  textareaElement:
  HTMLTextAreaElement
  | null
}>('textareaRef');
const formElement = useTemplateRef<HTMLFormElement>('formElement');

onMounted(() => {
  textareaRef.value?.textareaElement?.focus()
})

const { addTask } = useCurrentBoard()

const taskDescription = ref<Task['description']>();
const selectedLabelIds = ref<Label['id'][]>([])
const selectedAssigneeId = ref<Assignee['id'] | null>(null)
const selectedDueDate = ref<Date | null>(null);

const onEnter = () => {
  formElement.value?.requestSubmit()
}
const onClose = () => {
  isAddingNewTask.value = false;
}

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const result = newTaskSchema.safeParse({
    description: formData.get('description'),
    labelIds: selectedLabelIds.value,
    assigneeId: selectedAssigneeId.value,
    dueDate: selectedDueDate.value?.toISOString() || null,
  })

  if (!result.success) {
    return console.error(result.error)
  }

  addTask(props.columnId, {
    id: crypto.randomUUID(),
    ...result.data,
  })

  isAddingNewTask.value = false
}
</script>

<style scoped></style>

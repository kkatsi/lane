<template>
  <form ref="formElement" @submit="onSubmit" class="rounded-lg p-2 ring-1 ring-primary flex flex-col gap-2"
    @keydown.enter.exact.prevent="onEnter" @keyup.esc="props.onClose">
    <Input ref="titleRef" placeholder="Task title" v-model="taskTitle" name="title" id="title" />
    <Textarea placeholder="Add a description (optional)" v-model="taskDescription" class="resize-none"
      name="description" id="description" rows="3" />
    <div class="flex items-center justify-between">
      <LabelsPicker v-model:selected-label-ids="selectedLabelIds" />
      <AssigneePicker v-model:selected-assignee-id="selectedAssigneeId" />
      <DueDatePicker v-model:due-date="selectedDueDate" />
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Kbd>
          <CornerDownLeft />
        </Kbd>
        Save
      </span>
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Kbd>
          Esc
        </Kbd>
        Cancel
      </span>
      <div class="flex items-center gap-1 ml-auto">
        <Button size="sm" variant="ghost" @click="props.onClose" type="button">
          Cancel
        </Button>
        <Button size="sm" type="submit">
          Save
        </Button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { newTaskSchema } from '@/schemas/taskValidationSchema.ts'
import type { Assignee, Label, Task } from '@/types.ts'
import { CornerDownLeft } from '@lucide/vue'
import { onMounted, useTemplateRef } from 'vue'
import Button from '../ui/button/Button.vue'
import Input from '../ui/input/Input.vue'
import Kbd from '../ui/kbd/Kbd.vue'
import Textarea from '../ui/textarea/Textarea.vue'
import AssigneePicker from './AssigneePicker.vue'
import DueDatePicker from './DueDatePicker.vue'
import LabelsPicker from './LabelsPicker.vue'

interface Props {
  columnId: string;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onClose: () => void;
}

const props = defineProps<Props>()

const titleRef = useTemplateRef<{ inputElement: HTMLInputElement | null }>('titleRef');
const formElement = useTemplateRef<HTMLFormElement>('formElement');

onMounted(() => {
  titleRef.value?.inputElement?.focus()
})

const taskTitle = defineModel<Task['title']>('taskTitle', { default: '' });
const taskDescription = defineModel<Task['description']>('taskDescription', { default: '' });
const selectedLabelIds = defineModel<Label['id'][]>('selectedLabelIds', { default: [] })
const selectedAssigneeId = defineModel<Assignee['id'] | null>('selectedAssigneeId', { default: null })
const selectedDueDate = defineModel<Date | null>('selectedDueDate', { default: null });

const onEnter = () => {
  formElement.value?.requestSubmit()
}

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const result = newTaskSchema.safeParse({
    title: taskTitle.value,
    description: taskDescription.value,
    labelIds: selectedLabelIds.value,
    assigneeId: selectedAssigneeId.value,
    dueDate: selectedDueDate.value?.toISOString() || null,
  })

  if (!result.success) {
    return console.error(result.error)
  }
  props.onSubmit(result.data)
}
</script>

<style scoped></style>

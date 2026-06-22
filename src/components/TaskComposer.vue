<template>
  <form v-focus ref="formElement" @submit="onSubmit" class="rounded-lg p-2 ring-1 ring-primary flex flex-col gap-2"
    @keydown.enter.exact.prevent="onEnter" @keyup.esc="props.onClose">
    <Input ref="titleRef" placeholder="Task title" v-model="taskTitle" name="title" id="title" />
    <Textarea placeholder="Add a description (optional)" v-model="taskDescription" class="resize-none"
      name="description" id="description" rows="3" />
    <div class="flex items-center justify-between">
      <LabelsPicker v-model:selected-label-ids="selectedLabelIds">
        <template #trigger="{ count }">
          <PickerTrigger as-child>
            <Button size="xs" variant="ghost">
              <Tag />
              Labels <Badge v-if="count > 0">{{ count }}</Badge>
            </Button>
          </PickerTrigger>
        </template>
      </LabelsPicker>
      <AssigneePicker v-model:selected-assignee-id="selectedAssigneeId" v-slot:trigger="{ displayName }">
        <PickerTrigger as-child ">
          <Button
            size="xs" variant="ghost">
          <User />
          {{ displayName }}
          </Button>
        </PickerTrigger>
      </AssigneePicker>
      <DueDatePicker v-model:due-date="selectedDueDate" v-slot:trigger="{ displayDate }">
        <PickerTrigger as-child>
          <Button size="xs" variant="ghost">
            <Calendar1 />
            <span v-if="displayDate">{{ displayDate }}</span>
            <span v-else>Due Date</span>
          </Button>
        </PickerTrigger>
      </DueDatePicker>
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
import { Calendar1, CornerDownLeft, Tag, User } from '@lucide/vue'
import { nextTick, onMounted, useTemplateRef, type Directive } from 'vue'
import Button from './ui/button/Button.vue'
import Input from './ui/input/Input.vue'
import Kbd from './ui/kbd/Kbd.vue'
import Textarea from './ui/textarea/Textarea.vue'
import DueDatePicker from './Pickers/DueDatePicker.vue'
import LabelsPicker from './Pickers/LabelsPicker.vue'
import PickerTrigger from './Pickers/PickerTrigger.vue'
import Badge from './ui/badge/Badge.vue'
import AssigneePicker from './Pickers/AssigneePicker.vue'

const vFocus: Directive<HTMLElement> = {
  mounted: (el) => nextTick(() => el.scrollTo({top: el.scrollHeight, behavior: 'smooth'})),
};

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
const selectedDueDate = defineModel<Task['dueDate']>('selectedDueDate', { default: null });

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
    dueDate: selectedDueDate.value || null,
  })

  if (!result.success) {
    return console.error(result.error)
  }
  props.onSubmit(result.data)
}
</script>

<style scoped></style>

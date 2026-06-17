<template>
  <form ref="formElement" @submit="onSubmit" class="rounded-lg p-2 ring-1 ring-primary flex flex-col gap-2"
    @keydown.enter.exact.prevent="onEnter" @keyup.esc="props.onClose">
    <Input ref="titleRef" placeholder="Task title" v-model="taskTitle" name="title" id="title" />
    <Textarea placeholder="Add a description (optional)" v-model="taskDescription" class="resize-none"
      name="description" id="description" rows="3" />
    <div class="flex items-center justify-between">
      <LabelsPicker v-model:selected-label-ids="selectedLabelIds">
        <PickerTrigger as-child>
          <Button size="xs" variant="ghost">
            <Tag />
            Labels <Badge v-if="selectedLabelIds.length > 0">{{ selectedLabelIds.length }}</Badge>
          </Button>
        </PickerTrigger>
      </LabelsPicker>
      <AssigneePicker v-model:selected-assignee-id="selectedAssigneeId">
        <PickerTrigger as-child>
          <Button size="xs" variant="ghost">
            <User />
            {{ popupTriggerAssigneeName }}
          </Button>
        </PickerTrigger>
      </AssigneePicker>
      <DueDatePicker v-model:due-date="selectedDueDate">
        <PickerTrigger as-child>
          <Button size="xs" variant="ghost">
            <Calendar1 />
            <span v-if="selectedDueDate">{{ triggerButtonDisplayDate }}</span>
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
import { computed, onMounted, useTemplateRef } from 'vue'
import Button from '../ui/button/Button.vue'
import Input from '../ui/input/Input.vue'
import Kbd from '../ui/kbd/Kbd.vue'
import Textarea from '../ui/textarea/Textarea.vue'
import DueDatePicker from './DueDatePicker.vue'
import LabelsPicker from './LabelsPicker.vue'
import { PopoverTrigger as PickerTrigger } from '../ui/popover/index.ts'
import { useCurrentBoard } from '@/composables/useCurrentBoard.ts'
import Badge from '../ui/badge/Badge.vue'
import AssigneePicker from './AssigneePicker.vue'

interface Props {
  columnId: string;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onClose: () => void;
}

const props = defineProps<Props>()

const { assignees } = useCurrentBoard();

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

const popupTriggerAssigneeName = computed(() => {
  if (!selectedAssigneeId.value) return 'Unassigned';
  const name = assignees.value[selectedAssigneeId.value]?.name
  if (!name) return 'Unassigned';
  const [firstName, lastName] = name.split(' ');
  return `${firstName} ${lastName![0]}.`
})

const triggerButtonDisplayDate = computed(() =>
  selectedDueDate.value?.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
  }),
)

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

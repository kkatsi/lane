<template>
  <Card v-if="!isEditing" class="py-2 gap-2 group">
    <CardHeader class="flex items-center px-2.5 min-h-7">
      <div class="flex items-center gap-1">
        <Badge v-for="label in taskLabels.slice(0, 2)" :key="label.id"
          :style="{ color: COLORS.find(c => c.id === label.colorId)?.text, backgroundColor: COLORS.find(c => c.id === label.colorId)?.background }">
          {{ label.name }}
        </Badge>
        <Badge v-if="taskLabels.length > 2" variant="outline" class="text-xs text-muted-foreground">
          +{{ taskLabels.length - 2 }}
        </Badge>
      </div>
      <TaskActionsDropdown
        class="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=open]:opacity-100 transition-opacity"
        :column-id="props.columnId" :task-id="props.id" @task-edit="() => isEditing = true" />
    </CardHeader>
    <CardContent class="px-2.5">
      <CardTitle class="text-sm">
        {{ props.description }}
      </CardTitle>
      <CardDescription class="mt-3 flex items-center">
        <span v-if="!!displayDate" class="text-xs flex items-center gap-1">
          <Calendar1 :size="10" />
          {{ displayDate }}
        </span>
        <Assignee class="ml-auto" :full-name="assignee?.name" size="sm" :color-id="assignee?.colorId"
          display-fullname />
      </CardDescription>
    </CardContent>
  </Card>
  <TaskComposer v-else :column-id="props.columnId" v-model:selected-label-ids="editLabelIds"
    v-model:selected-assignee-id="editAssigneeId" v-model:task-description="editDescription"
    v-model:selected-due-date="editDueDate" @submit="onSubmit" @close="onClose" />
</template>

<script setup lang="ts">
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import { COLORS } from '@/constants/colors'
import { isDefined } from '@/lib/utils'
import type { Task } from '@/types'
import { Calendar1 } from '@lucide/vue'
import { computed, ref } from 'vue'
import Assignee from '../Assignee.vue'
import Badge from '../ui/badge/Badge.vue'
import Card from '../ui/card/Card.vue'
import CardContent from '../ui/card/CardContent.vue'
import CardDescription from '../ui/card/CardDescription.vue'
import CardHeader from '../ui/card/CardHeader.vue'
import CardTitle from '../ui/card/CardTitle.vue'
import TaskActionsDropdown from './TaskActionsDropdown.vue'
import TaskComposer from '../TaskComposer/TaskComposer.vue'

interface Props extends Task {
  columnId: string;
}
const props = defineProps<Props>()
const isEditing = defineModel<boolean>('isEditing');
const { labels, assignees, updateTask } = useCurrentBoard()

const editAssigneeId = ref(props.assigneeId)
const editLabelIds = ref([...props.labelIds])
const editDescription = ref(props.description)
const editDueDate = ref(props.dueDate ? new Date(props.dueDate) : null)

const assignee = computed(() => {
  if (!props.assigneeId) return undefined;
  const assignee = assignees.value[props.assigneeId]
  return assignee;
})
const displayDate = computed(() =>
  props.dueDate
    ? new Date(props.dueDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    })
    : undefined,
)
const taskLabels = computed(() => {
  return props.labelIds.map((id) => labels.value[id]).filter(isDefined)
})

const onSubmit = (taskWithoutId: Omit<Task, 'id'>) => {
  updateTask(props.id, taskWithoutId)
  isEditing.value = false;
}
const onClose = () => {
  isEditing.value = false;
}
</script>

<style scoped></style>

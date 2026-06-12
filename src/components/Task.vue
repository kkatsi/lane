<template>
  <div class="card">
    <div class="header">
      <div class="labels">
        <span v-for="label in taskLabels" :key="label.id">
          {{ label.name }}
        </span>
      </div>
      <div class="actions">
        <button class="delete-button" @click="removeTask(props.task.id)">x</button>
      </div>
    </div>
    <div class="content">
      <div class="title">
        {{ props.task.title }}
      </div>
      <div class="description">
        {{ props.task.description }}
      </div>
    </div>
    <div class="footer">
      <div class="details">{{ displayDate }}</div>
      <div class="assignee">
        {{ initials }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import { isDefined } from '@/lib/utils'
import type { Task } from '@/types'
import { computed } from 'vue'

interface Props {
  task: Task
}

const props = defineProps<Props>()

const { labels, assignees, removeTask } = useCurrentBoard()

const initials = computed(() => {
  if (!props.task.assigneeId) return 'unassigned'
  const assignee = assignees.value[props.task.assigneeId]
  if (!assignee) return 'unassigned'
  const [first, last] = assignee.name.split(' ')
  return `${first?.[0]?.toUpperCase() ?? ''}${last?.[0]?.toUpperCase() ?? ''}`
})
const displayDate = computed(() =>
  props.task.dueDate
    ? new Date(props.task.dueDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })
    : undefined,
)
const taskLabels = computed(() => {
  return props.task.labelIds.map((id) => labels.value[id]).filter(isDefined)
})
</script>

<style scoped>
.card {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

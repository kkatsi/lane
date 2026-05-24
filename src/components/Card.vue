<template>
  <div class="card">
    <div class="header">
      <div class="labels">
        <span v-for="label in props.labels" :key="label">
          {{ label }}
        </span>
      </div>
    </div>
    <div class="content">{{ props.title }}</div>
    <div class="footer">
      <div class="details">{{ displayDate }}</div>
      <div class="assignee">
        {{ initials }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import { computed } from 'vue'

interface Props extends Task {}

const props = defineProps<Props>()

const initials = computed(() => {
  if (!props.assigneeFullName) return ''
  const [first, last] = props.assigneeFullName.split(' ')
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`
})
const displayDate = computed(() =>
  props.dueDate
    ? new Date(props.dueDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })
    : undefined,
)
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

<template>
  <div class="column">
    <div class="header">
      <div class="left-side">
        <span class="title">{{ props.title }}</span>
        <span class="items-count">{{ tasks.length }}</span>
      </div>
      <div class="right-side">
        <div class="actions">
          <button class="add-button">+</button>
        </div>
      </div>
    </div>
    <div class="content">
      <Card v-for="task in tasks" :key="task.id" v-bind="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Task } from '@/types'
import Card from './Card.vue'

interface Props extends Category {}

const props = defineProps<Props>()
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-side {
  display: flex;
  gap: 4px;
  align-items: center;
}

.right-side {
}

.content {
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

<template>
  <div class="column">
    <div class="header">
      <div class="left-side">
        <span class="title">{{ props.title }}</span>
        <span class="items-count">{{ taskIds.length }}</span>
      </div>
      <div class="right-side">
        <div class="actions">
          <button
            class="add-button"
            @click="
              addTask(props.id, {
                id: '3',
                title: 'This is a new task',
                description: 'Lorem Ipsumidis',
                assigneeFullName: 'Penelope Kyratsou',
                dueDate: '2026-05-24T17:28:25+00:00',
                labelIds: ['bug'],
              })
            "
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <Card v-for="task in columnTasks" :key="task.id" v-bind="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types'
import Card from './Card.vue'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

interface Props extends Column {}

const props = defineProps<Props>()

const boardStore = useBoardStore()
const { tasks } = storeToRefs(boardStore)
const { addTask } = boardStore

const columnTasks = computed(() =>
  props.taskIds.map((id) => tasks.value[id]).filter((task) => task !== undefined),
)
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

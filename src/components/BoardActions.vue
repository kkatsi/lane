<template>
  <div class="board-actions">
    <input type="text" placeholder="Search..." v-model="searchQuery" />
    <Filters />
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'
import Filters from './Filters/Filters.vue'

const uiStore = useUIStore()
const { searchQuery } = storeToRefs(uiStore)
</script>

<style scoped>
.board-actions {
  display: flex;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>

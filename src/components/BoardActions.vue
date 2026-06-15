<template>
  <div class="flex gap-2 items-center w-full py-3 px-4">
    <Search class="max-w-72" v-model="search" placeholder="Search..." :results-count="resultsCount" />
    <Filters />
    <div class="ml-auto flex items-center gap-2">
      <Button variant="outline" @click="onColumnAdd">
        <Plus />
        Add column
      </Button>
      <Button variant="outline" @click="onShare">
        <Share />
        Share
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilteredTaskIds } from '@/composables/useFilteredTaskIds.ts'
import { useUIStore } from '@/stores/ui'
import { watchDebounced } from '@vueuse/core'
import { computed, ref } from 'vue'
import Filters from './Filters/Filters.vue'
import Search from './Search.vue'
import Button from './ui/button/Button.vue'
import { Plus, Share } from '@lucide/vue'

const uiStore = useUIStore()
const search = ref<string>('');

watchDebounced(search, () => {
  uiStore.searchQuery = search.value;
}, { debounce: 300 })

const filteredTaskIds = useFilteredTaskIds()
const resultsCount = computed(() => uiStore.searchQuery ? Object.values(filteredTaskIds.value).length : null)

const onColumnAdd = () => {
  console.log('add column')
}

const onShare = () => {

}
</script>

<style scoped></style>

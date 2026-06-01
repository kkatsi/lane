<template>
  <div>
    <div class="header">
      <span>{{ props.title }}</span>
    </div>
    <div class="content">
      <label v-for="item in items" :key="item.id">
        <input type="radio" :value="item.id" :name="groupName" v-model="selected" />
        <span>{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FilterOption, Filter } from '@/types'

interface Props {
  title: string
  items: FilterOption[]
}

const props = defineProps<Props>()
const selected = defineModel<Filter['selected']>('selected')
const groupName = computed(() => props.title.replaceAll(' ', '').toLowerCase())
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: column;
}
</style>

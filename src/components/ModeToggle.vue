<template>
  <div class="mode-toggle">
    <Sun />
    <Switch :model-value="isDark" @update:model-value="updateValue" />
    <Moon />
  </div>
</template>

<script setup lang="ts">
import { useColorMode, usePreferredDark } from '@vueuse/core'
import Switch from './ui/switch/Switch.vue'
import { Moon, Sun } from '@lucide/vue'
import { computed } from 'vue'
const mode = useColorMode()
const prefersDark = usePreferredDark()
const isDark = computed(() => mode.value === 'dark' || (mode.value === 'auto' && prefersDark.value))

const updateValue = (checked: boolean) => {
  mode.value = checked ? 'dark' : 'light'
}
</script>

<style scoped>
.mode-toggle {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

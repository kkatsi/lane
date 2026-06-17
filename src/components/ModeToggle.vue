<template>
  <div class="mode-toggle">
    <Sun />
    <Switch :model-value="isDark" @update:model-value="toggleTheme" />
    <Moon />
  </div>
</template>

<script setup lang="ts">
import { useColorMode, usePreferredDark } from "@vueuse/core";
import Switch from "./ui/switch/Switch.vue";
import { Moon, Sun } from "@lucide/vue";
import { useDarkTheme } from "@/composables/useDarkTheme.ts";

const { isDark, toggleTheme } = useDarkTheme();
</script>

<style scoped>
.mode-toggle {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

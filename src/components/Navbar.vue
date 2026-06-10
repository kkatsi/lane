<template>
  <nav class="flex items-center gap-2 px-4 py-3 w-full">
    <Logo class="h-8 w-8" />
    <span class="text-lg font-semibold">Lane</span>
    <div class="ml-auto">
      <ModeToggle />
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.svg?component'
import ModeToggle from './ModeToggle.vue';
</script>

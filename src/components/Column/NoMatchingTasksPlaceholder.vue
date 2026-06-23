<template>
  <div
    class="select-none h-24 cursor-pointer w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground"
  >
    <CircleOff :size="14" />
    <span>No matching cards</span>
  </div>
</template>

<script setup lang="ts">
import { CircleOff } from "@lucide/vue";
</script>

<style scoped></style>

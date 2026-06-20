<template>
  <div class="p-2 flex flex-col gap-1">
    <div class="flex items-center gap-2 font-light tracking-wider text-xs">
      <span>COMMENTS</span>
      <Badge variant="outline">{{ commentsCount }}</Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from "../ui/badge/Badge.vue";

const commentsCount = 2;
</script>

<style scoped></style>

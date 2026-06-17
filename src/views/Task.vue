<template>
  <div
    class="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs" />
  <Card
    class="fixed left-1/2 top-[calc(50%+var(--navbar-height)/2)] z-50 w-[calc(100%-2rem)] sm:max-w-md -translate-x-1/2 -translate-y-1/2">
    task
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';


</script>

<style scoped></style>

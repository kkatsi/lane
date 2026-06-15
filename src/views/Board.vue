<template>
  <div class="flex flex-col h-[calc(100dvh-var(--navbar-height))]">
    <BoardActions />
    <Separator />
    <Board />
  </div>
</template>

<script setup lang="ts">
import Board from '@/components/Board.vue';
import BoardActions from '@/components/BoardActions.vue';
import Separator from '@/components/ui/separator/Separator.vue';
</script>

<style scoped></style>

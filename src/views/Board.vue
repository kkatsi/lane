<template>
  <div>
    <BoardActions />
    <Board />
  </div>
</template>

<script setup lang="ts">
import Board from '@/components/Board.vue';
import BoardActions from '@/components/BoardActions.vue';
import { useCurrentBoard } from '@/composables/useCurrentBoard';

useCurrentBoard();
</script>

<style scoped></style>

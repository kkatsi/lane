<script setup lang="ts">
import Board from './components/Board.vue'
import BoardActions from './components/BoardActions.vue'
import ModeToggle from './components/ModeToggle.vue'
</script>

<template>
  <header>
    <ModeToggle />
  </header>
  <main>
    <BoardActions />
    <Board />
  </main>
</template>
<style scoped>
header {
  width: 100%;
  padding: var(--spacing);
  display: flex;
  align-items: center;
}
</style>

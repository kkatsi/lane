<script setup lang="ts">
import Board from './components/Board.vue'
import ModeToggle from './components/ModeToggle.vue'
</script>

<template>
  <header>
    <ModeToggle />
  </header>

  <Board />
</template>

<style scoped>
header {
  width: 100%;
  padding: var(--spacing);
  display: flex;
  align-items: center;
}
</style>

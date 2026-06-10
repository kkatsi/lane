<script setup lang="ts">
import Board from './components/Board.vue';
import BoardActions from './components/BoardActions.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
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

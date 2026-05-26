<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Board from './components/Board.vue'
import ModeToggle from './components/ModeToggle.vue'
import { useBoardStore } from './stores/board'
import type { Column, Task } from './types'

const boardStore = useBoardStore()
const { columns, columnOrder, tasks, labels } = storeToRefs(boardStore)
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->

  <header>
    <ModeToggle />
  </header>

  <Board :columns="columns" :column-order="columnOrder" :tasks="tasks" :labels="labels" />
</template>

<style scoped>
header {
  width: 100%;
  padding: var(--spacing);
  display: flex;
  align-items: center;
}
</style>

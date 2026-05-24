<script setup lang="ts">
import Board from './components/Board.vue'
import type { Category, Task } from './types'

const categories = [
  {
    id: 'to-do',
    title: 'To-Do',
    tasks: [
      {
        id: '1',
        title: 'This is a title of the ticket',
        description: 'Lorem Ipsum',
        assigneeFullName: 'Penelope Kyratsou',
        dueDate: '2026-05-24T17:28:25+00:00',
        done: false,
        labels: ['bug', 'test', 'urgent'],
      },
    ],
  },
  {
    id: 'bugs',
    title: 'Bugs',
    tasks: [
      {
        id: '2',
        title: 'This is a title of the ticket',
        description: 'Lorem Ipsum',
        assigneeFullName: 'Penelope Kyratsou',
        dueDate: '2026-05-24T17:28:25+00:00',
        done: false,
        labels: ['bug', 'test', 'urgent'],
      },
    ],
  },
] satisfies Category[]
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

  <Board :categories="categories" />
</template>

<style scoped></style>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="p-4">
    <RouterView />
  </main>
</template>
<style scoped></style>

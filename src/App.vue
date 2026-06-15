<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner';
import { useDarkTheme } from './composables/useDarkTheme.ts';

const { isDark } = useDarkTheme();
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <Toaster position="top-center" :theme="isDark ? 'dark' : 'light'" rich-colors />
</template>
<style scoped></style>

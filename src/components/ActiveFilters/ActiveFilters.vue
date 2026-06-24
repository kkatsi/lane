<template>
  <div class="flex items-center gap-2 flex-wrap">
    <ActiveLabels />
    <ActiveAssignees />
    <ActiveDueDate />
  </div>
</template>

<script setup lang="ts">
import ActiveAssignees from "./ActiveAssignees.vue";
import ActiveDueDate from "./ActiveDueDate.vue";
import ActiveLabels from "./ActiveLabels.vue";
</script>

<style scoped></style>

<template>
  <div
    class="select-none p-4 cursor-pointer w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground"
  >
    <span>{{ props.hiddenCount }} cards hidden by filters</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hiddenCount: number;
}

const props = defineProps<Props>();
</script>

<style scoped></style>

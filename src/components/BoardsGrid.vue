<template>
  <div>
    <div class="py-4">
      <h5 class="text-muted-foreground uppercase font-medium tracking-wider text-sm mb-2">{{ props.title }}</h5>
      <div class="grid grid-cols-3 gap-4">
        <BoardOverview v-for="board in props.boards" :key="board.id" v-bind="board" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoardOverview as BoardOverviewType } from '@/types';
import BoardOverview from './BoardOverview.vue';

interface Props {
  title: string;
  boards: Record<BoardOverviewType['id'], BoardOverviewType>;
}
const props = defineProps<Props>();
</script>

<style scoped></style>

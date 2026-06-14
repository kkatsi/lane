<template>
  <div class="py-4" v-if="Object.values(boards).length > 0">
    <h5 class="text-muted-foreground uppercase font-semibold tracking-wider text-sm mb-2">{{ props.title }}</h5>
    <div class="grid grid-cols-3 gap-4 items-stretch">
      <BoardOverviewCard v-for="board in props.boards" :key="board.id" v-bind="board" />
      <CreateNewBoardCard v-if="!!canCreateNewBoard" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoardOverview as BoardOverviewType } from '@/types';
import BoardOverviewCard from './BoardOverviewCard.vue';
import CreateNewBoardCard from './CreateNewBoardCard.vue';

interface Props {
  title: string;
  boards: Record<BoardOverviewType['id'], BoardOverviewType>;
  canCreateNewBoard?: boolean | undefined;
}
const props = defineProps<Props>();
</script>

<style scoped></style>

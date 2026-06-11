<template>
  <div>
    <BoardsOverviewHeader />
    <BoardsGrid title="Starred" :boards="starredBoardOverviews" />
    <BoardsGrid title="All Boards" :boards="allBoardOverviews" />
  </div>
</template>

<script setup lang="ts">
import BoardsGrid from '@/components/BoardsGrid.vue';
import BoardsOverviewHeader from '@/components/BoardsOverviewHeader.vue';
import { useBoardsStore } from '@/stores/boards';
import { storeToRefs } from 'pinia';

const boardsStore = useBoardsStore();
const { allBoardOverviews, starredBoardOverviews } = storeToRefs(boardsStore);

</script>

<style scoped></style>

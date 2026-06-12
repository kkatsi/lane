<template>
  <div>
    <BoardsOverviewHeader />
    <BoardsGrid title="Starred" :boards="boards.starredBoardOverviews" />
    <BoardsGrid title="All Boards" :boards="boards.allBoardOverviews" />
  </div>
</template>

<script setup lang="ts">
import BoardsGrid from '@/components/BoardsGrid.vue';
import BoardsOverviewHeader from '@/components/BoardsOverviewHeader.vue';
import { useFilteredBoards } from '@/composables/useFilteredBoards';

const boards = useFilteredBoards();
</script>

<style scoped></style>

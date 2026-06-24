<template>
  <div class="flex flex-col h-[calc(100dvh-var(--navbar-height))]">
    <BoardActions @add-new-column="onAddNewColumn" @clear-all="resetFilters" />
    <Separator />
    <Board v-model:is-adding-new-column="isAddingNewColumn" />
  </div>
  <router-view />
</template>

<script setup lang="ts">
import Board from "@/components/Board.vue";
import BoardActions from "@/components/BoardActions.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import { useBoardFilters } from "@/composables/useBoardFilters";
import { ref } from "vue";

const { resetFilters } = useBoardFilters();

const isAddingNewColumn = ref<boolean>(false);

const onAddNewColumn = () => {
  isAddingNewColumn.value = true;
};
</script>

<style scoped></style>

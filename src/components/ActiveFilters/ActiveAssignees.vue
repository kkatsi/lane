<template>
  <ActiveFilter v-for="assignee in selectedAssignees" :id="assignee.id" @clear="onClear">
    <Assignee :color-id="assignee.colorId" size="lg" :full-name="assignee.name" />
    <span class="text-sm">{{ getAssigneeFirstName(assignee.name) }}</span>
  </ActiveFilter>
</template>

<script setup lang="ts">
import { useBoardFilters } from "@/composables/useBoardFilters.ts";
import { useCurrentBoard } from "@/composables/useCurrentBoard.ts";
import { computed } from "vue";
import ActiveFilter from "./ActiveFilter.vue";
import Assignee from "../Assignee.vue";
import type { Assignee as AssigneeType } from "@/types.ts";

const { assignees } = useCurrentBoard();
const { assigneeIds } = useBoardFilters();

const selectedAssignees = computed(() =>
  Object.values(assignees.value).filter((a) => assigneeIds.value.includes(a.id)),
);
const getAssigneeFirstName = (fullName: AssigneeType["name"]) => fullName.split(" ")[0];
const onClear = (assigneeId: string) => {
  assigneeIds.value = assigneeIds.value.filter((aId) => aId !== assigneeId);
};
</script>

<style scoped></style>

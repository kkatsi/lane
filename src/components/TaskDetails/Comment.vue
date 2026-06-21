<template>
  <div class="py-2">
    <div class="flex gap-2 items-center">
      <Assignee
        :color-id="assignee?.colorId"
        display-fullname
        :full-name="assignee?.name"
        class="text-foreground"
        size="lg"
      />
      <span class="text-xs">
        {{ timeAgo }}
      </span>
    </div>
    <p class="text-sm text-foreground py-1">
      {{ props.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from "@/types.ts";
import Assignee from "../Assignee.vue";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useTimeAgo } from "@vueuse/core";

interface Props extends Comment {}

const props = defineProps<Props>();

const { assignees } = useCurrentBoard();

const assignee = Object.values(assignees.value).find((a) => a.id === props.assigneeId);

const timeAgo = useTimeAgo(() => props.updatedAt);
</script>

<style scoped></style>

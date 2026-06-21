<template>
  <div class="p-2 flex flex-col gap-1">
    <div class="flex items-center gap-2 font-light tracking-wider text-xs">
      <span>COMMENTS</span>
      <Badge variant="outline">{{ commentsCount }}</Badge>
    </div>
    <div>
      <Comment v-for="comment in comments" :key="comment.id" v-bind="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentTask } from "@/composables/useCurrentTask.ts";
import Badge from "../ui/badge/Badge.vue";
import { computed } from "vue";
import Comment from "./Comment.vue";

const { comments } = useCurrentTask();

const commentsCount = computed(() => comments.value.length);
</script>

<style scoped></style>

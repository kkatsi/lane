<template>
  <div class="flex gap-2 items-center w-full">
    <Assignee :color-id="loggedInAssignee?.colorId" :full-name="loggedInAssignee?.name" class="text-foreground" />
    <Textarea
      @keydown.enter.exact.prevent="onSend"
      v-model="commentText"
      placeholder="Write a comment..."
      class="flex-1 resize-none py-1 field-sizing-content max-h-12"
    />
    <Button @click="onSend" :disabled="!commentText.trim()">
      Send
      <Send />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useCurrentTask } from "@/composables/useCurrentTask.ts";
import { Send } from "@lucide/vue";
import { ref } from "vue";
import Assignee from "../Assignee.vue";
import Button from "../ui/button/Button.vue";
import Textarea from "../ui/textarea/Textarea.vue";

const { assignees } = useCurrentBoard();
const { addComment } = useCurrentTask();

const commentText = ref<string>("");

const loggedInAssignee = assignees.value["elena"];

const onSend = () => {
  if (!loggedInAssignee || !commentText) return;
  addComment(commentText.value, loggedInAssignee.id);
  commentText.value = "";
};
</script>

<style scoped></style>

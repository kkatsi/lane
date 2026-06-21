<template>
  <div
    class="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs"
    @click="() => onOpenUpdate(false)"
  />
  <Dialog default-open :modal="false" @update:open="onOpenUpdate">
    <DialogContent class="p-2 gap-2" @interact-outside="(e) => e.preventDefault()">
      <DialogHeader class="min-w-0 gap-1 sticky">
        <DialogTitle class="flex items-center">
          <TaskDetailsTitle />
        </DialogTitle>
        <div class="flex items-center gap-2 text-xs text-muted-foreground px-2">
          <Layout :size="12" />
          {{ board?.name }}{{ taskStatus && ` · ${taskStatus}` }}
        </div>
      </DialogHeader>
      <DialogDescription ref="scrollableElement" class="overflow-y-auto max-h-[60vh]">
        <Separator class="px-2" />
        <TaskDetailsLabels />
        <Separator class="px-2" />
        <TaskDetailsAssignee />
        <Separator class="px-2" />
        <TaskDetailsDueDate />
        <Separator class="px-2" />
        <TaskDetailsDescription />
        <TaskDetailsComments />
      </DialogDescription>
      <DialogFooter class="min-w-0 sticky -mx-2 -mb-2 py-2">
        <CommentComposer />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import CommentComposer from "@/components/TaskDetails/CommentComposer.vue";
import TaskDetailsAssignee from "@/components/TaskDetails/TaskDetailsAssignee.vue";
import TaskDetailsComments from "@/components/TaskDetails/TaskDetailsComments.vue";
import TaskDetailsDescription from "@/components/TaskDetails/TaskDetailsDescription.vue";
import TaskDetailsDueDate from "@/components/TaskDetails/TaskDetailsDueDate.vue";
import TaskDetailsLabels from "@/components/TaskDetails/TaskDetailsLabels.vue";
import TaskDetailsTitle from "@/components/TaskDetails/TaskDetailsTitle.vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import DialogFooter from "@/components/ui/dialog/DialogFooter.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useCurrentTask } from "@/composables/useCurrentTask";
import { Layout } from "@lucide/vue";
import { computed, nextTick, useTemplateRef, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { board } = useCurrentBoard();
const { taskId, comments } = useCurrentTask();

const scrollableElement = useTemplateRef<{ element: HTMLElement | null }>("scrollableElement");

watch(
  () => comments.value.length,
  async (v) => {
    if (!v) return;
    await nextTick();
    scrollableElement.value?.element?.scrollTo({
      top: scrollableElement.value?.element?.scrollHeight,
      behavior: "smooth",
    });
  },
);

const taskStatus = computed(() =>
  board.value?.columns
    ? Object.values(board.value.columns).find((col) => col.taskIds.includes(taskId.value))?.title
    : undefined,
);

const onOpenUpdate = (open: boolean) => {
  if (!open) router.back();
};
</script>

<style scoped></style>

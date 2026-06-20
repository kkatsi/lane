<template>
  <Dialog default-open @update:open="onOpenUpdate">
    <DialogContent class="p-2 gap-2">
      <DialogHeader class="min-w-0 gap-1">
        <DialogTitle class="flex items-center">
          <TaskDetailsTitle />
        </DialogTitle>
        <div class="flex items-center gap-2 text-xs text-muted-foreground px-2">
          <Layout :size="12" />
          {{ board?.name }}{{ taskStatus && ` · ${taskStatus}` }}
        </div>
      </DialogHeader>
      <DialogDescription>
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
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import TaskDetailsAssignee from "@/components/TaskDetails/TaskDetailsAssignee.vue";
import TaskDetailsComments from "@/components/TaskDetails/TaskDetailsComments.vue";
import TaskDetailsDescription from "@/components/TaskDetails/TaskDetailsDescription.vue";
import TaskDetailsDueDate from "@/components/TaskDetails/TaskDetailsDueDate.vue";
import TaskDetailsLabels from "@/components/TaskDetails/TaskDetailsLabels.vue";
import TaskDetailsTitle from "@/components/TaskDetails/TaskDetailsTitle.vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useCurrentTask } from "@/composables/useCurrentTask";
import { Layout } from "@lucide/vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { board } = useCurrentBoard();
const { taskId } = useCurrentTask();

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

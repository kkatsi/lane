<template>
  <Dialog default-open @update:open="onOpenUpdate">
    <DialogContent>
      <DialogHeader class="min-w-0">
        <DialogTitle class="flex items-center min-h-9">
          <TaskDetailsTitle />
        </DialogTitle>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import TaskDetailsTitle from "@/components/TaskDetails/TaskDetailsTitle.vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onOpenUpdate = (open: boolean) => {
  if (!open) router.back();
};
</script>

<style scoped></style>

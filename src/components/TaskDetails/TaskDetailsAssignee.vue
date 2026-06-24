<template>
  <div class="p-2 grid grid-cols-[20%_80%] items-center">
    <span class="font-light tracking-wider text-xs">ASSIGNEE</span>
    <div class="flex gap-2 items-center">
      <Assignee
        class="text-foreground"
        :color-id="assignee?.colorId"
        :full-name="assignee?.name"
        display-fullname
        size="lg"
      />
      <AssigneePicker v-model:selected-assignee-id="selectedAssigneeId">
        <template v-slot:trigger>
          <PickerTrigger as-child>
            <Button variant="ghost" size="sm" class="ml-auto">Change</Button>
          </PickerTrigger>
        </template>
      </AssigneePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentTask } from "@/composables/useCurrentTask";
import type { Assignee as AssigneeType } from "@/types.ts";
import { ref, watch } from "vue";
import Assignee from "../Assignee.vue";
import AssigneePicker from "../Pickers/AssigneePicker.vue";
import PickerTrigger from "../Pickers/PickerTrigger.vue";
import Button from "../ui/button/Button.vue";

const { assignee, assigneeId, updateTask } = useCurrentTask();

const selectedAssigneeId = ref<AssigneeType["id"]>(assigneeId.value);

watch(selectedAssigneeId, (id) => {
  updateTask({ assigneeId: id });
});
</script>

<style scoped></style>

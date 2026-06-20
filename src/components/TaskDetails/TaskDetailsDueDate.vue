<template>
  <div class="p-2 grid grid-cols-[20%_80%] items-center">
    <span class="font-light tracking-wider text-xs">DUE DATE</span>
    <div class="flex gap-2 items-center">
      <div class="flex items-center gap-2">
        <Calendar1 :size="16" />
        <span :class="displayDate ? 'text-foreground' : 'text-muted-foreground'">
          {{ displayDate }}
        </span>
      </div>
      <DueDatePicker v-model:due-date="selectedDueDate">
        <template v-slot:trigger>
          <PickerTrigger as-child>
            <Button variant="ghost" size="sm" class="ml-auto">Change</Button>
          </PickerTrigger>
        </template>
      </DueDatePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentTask } from "@/composables/useCurrentTask";
import type { Task } from "@/types.ts";
import { computed, ref, watch } from "vue";
import PickerTrigger from "../Pickers/PickerTrigger.vue";
import Button from "../ui/button/Button.vue";
import { Calendar1 } from "@lucide/vue";
import DueDatePicker from "../Pickers/DueDatePicker.vue";

const { dueDate, updateTask } = useCurrentTask();

const selectedDueDate = ref<Task["dueDate"]>(dueDate.value);

const displayDate = computed(() =>
  dueDate.value
    ? new Date(dueDate.value).toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "short",
      })
    : undefined,
);

watch(selectedDueDate, (dueDate) => {
  updateTask({ dueDate });
});
</script>

<style scoped></style>

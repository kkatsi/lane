<template>
  <fieldset>
    <div class="text-xs flex items-center justify-between">
      <legend class="font-light tracking-wider text-muted-foreground">ASSIGNEES</legend>
      <span v-if="assigneeIds.length" class="text-primary font-semibold">{{ assigneeIds.length }}</span>
    </div>
    <CheckboxGroupRoot v-model="assigneeIds" class="mt-2 flex flex-col gap-0.5">
      <Label
        v-for="assignee in assignees"
        :key="assignee.id"
        :for="assignee.id"
        class="hover:bg-muted hover:text-foreground relative flex items-center gap-2 rounded-lg px-2 py-1 text-sm outline-hidden select-none cursor-pointer"
      >
        <Checkbox :id="assignee.id" :value="assignee.id" />
        <Assignee :color-id="assignee.colorId" :full-name="assignee.name" display-fullname size="lg" />
      </Label>
    </CheckboxGroupRoot>
  </fieldset>
</template>

<script setup lang="ts">
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { CheckboxGroupRoot } from "reka-ui";
import Assignee from "../Assignee.vue";
import Checkbox from "../ui/checkbox/Checkbox.vue";
import Label from "../ui/label/Label.vue";

const { assignees } = useCurrentBoard();
const assigneeIds = defineModel<string[]>({ default: [] });
</script>

<style scoped></style>

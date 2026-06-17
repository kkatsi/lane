<template>
  <Popover v-model:open="isAssigneePickerOpen">
    <slot name="trigger" :display-name="displayName" />
    <PopoverContent class="p-0 gap-2" align="start">
      <Command v-model="selectedAssigneeId" @update:model-value="() => (isAssigneePickerOpen = false)">
        <CommandInput placeholder="Search assignees..." class="command-input" />
        <CommandList>
          <CommandEmpty>No assignees found.</CommandEmpty>
          <CommandGroup class="max-h-52 overflow-auto">
            <CommandItem v-for="assignee in assignees" :value="assignee.id" :key="assignee.id">
              <Assignee :full-name="assignee.name" :color-id="assignee.colorId" />
              {{ assignee.name }}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem :value="null">
              <Assignee />
              Unassigned
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import type { Assignee as AssigneeType } from "@/types.ts";
import { computed, ref } from "vue";
import Assignee from "../Assignee.vue";
import CommandGroup from "../ui/command/CommandGroup.vue";
import Popover from "../ui/popover/Popover.vue";
import PopoverContent from "../ui/popover/PopoverContent.vue";

const isAssigneePickerOpen = ref<boolean>(false);

const selectedAssigneeId = defineModel<AssigneeType["id"] | null>("selectedAssigneeId");

const { assignees } = useCurrentBoard();

const displayName = computed(() => {
  if (!selectedAssigneeId.value) return "Unassigned";
  const name = assignees.value[selectedAssigneeId.value]?.name;
  if (!name) return "Unassigned";
  const [firstName, lastName] = name.split(" ");
  return `${firstName} ${lastName![0]}.`;
});
</script>

<style scoped></style>

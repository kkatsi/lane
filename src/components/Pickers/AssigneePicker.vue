<template>
  <Popover v-model:open="isAssigneePickerOpen">
    <slot name="trigger" :display-name="displayName" />
    <PopoverContent class="p-0 gap-2" align="start">
      <Command v-model="selectedAssigneeId" @update:model-value="() => (isAssigneePickerOpen = false)">
        <CommandInput placeholder="Search assignees..." class="command-input" />
        <CommandList>
          <CommandEmpty>No assignees found.</CommandEmpty>
          <CommandGroup class="max-h-52 overflow-auto">
            <template v-for="assignee in assignees" :key="assignee.id">
              <CommandSeparator v-if="assignee.id === UNASSIGNED_ID" class="my-1" />
              <CommandItem :value="assignee.id">
                <Assignee :full-name="assignee.name" :color-id="assignee.colorId" />
                {{ assignee.name }}
              </CommandItem>
            </template>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { UNASSIGNED_ID } from "@/constants/assignees";
import type { Assignee as AssigneeType } from "@/types.ts";
import { computed, ref } from "vue";
import Assignee from "../Assignee.vue";
import CommandGroup from "../ui/command/CommandGroup.vue";
import Popover from "../ui/popover/Popover.vue";
import PopoverContent from "../ui/popover/PopoverContent.vue";

const isAssigneePickerOpen = ref<boolean>(false);

const selectedAssigneeId = defineModel<AssigneeType["id"]>("selectedAssigneeId");

const { assignees } = useCurrentBoard();

const displayName = computed(() => {
  const name = selectedAssigneeId.value ? assignees.value[selectedAssigneeId.value]?.name : undefined;
  if (!name || selectedAssigneeId.value === UNASSIGNED_ID) return "Unassigned";
  const [firstName, lastName] = name.split(" ");
  return `${firstName} ${lastName![0]}.`;
});
</script>

<style scoped></style>

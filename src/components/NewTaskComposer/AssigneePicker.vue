<template>
  <Popover v-model:open="isAssigneePickerOpen">
    <PopoverTrigger as-child>
      <Button size="xs" variant="ghost">
        <User />
        {{ popupTriggerAssigneeName }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 gap-2" align="start">
      <Command>
        <CommandInput placeholder="Search assignees..." class="command-input" />
        <CommandList>
          <CommandEmpty>No assignees found.</CommandEmpty>
          <CommandGroup class="max-h-52 overflow-auto">
            <CommandItem v-for="assignee in assignees" :value="assignee.id" :key="assignee.id"
              @select="onAssigneeSelect">
              <Initials :full-name="assignee.name" :color-id="assignee.colorId" />
              {{ assignee.name }}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem :value="null" @select="onAssigneeSelect">
              <Initials />
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
} from '@/components/ui/command'
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import type { Assignee } from '@/types.ts'
import { User } from '@lucide/vue'
import type { AcceptableValue, SelectItemSelectEvent } from 'reka-ui'
import { computed, ref } from 'vue'
import Initials from '../Initials.vue'
import Button from '../ui/button/Button.vue'
import CommandGroup from '../ui/command/CommandGroup.vue'
import Popover from '../ui/popover/Popover.vue'
import PopoverContent from '../ui/popover/PopoverContent.vue'
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue'

const isAssigneePickerOpen = ref<boolean>(false);

const selectedAssigneeId = defineModel<Assignee['id'] | null>('selectedAssigneeId')

const { assignees } = useCurrentBoard()

const popupTriggerAssigneeName = computed(() => {
  if (!selectedAssigneeId.value) return 'Unassigned';
  const name = assignees.value[selectedAssigneeId.value]?.name
  if (!name) return 'Unassigned';
  const [firstName, lastName] = name.split(' ');
  return `${firstName} ${lastName![0]}.`
})

const onAssigneeSelect = (event: SelectItemSelectEvent<AcceptableValue>) => {
  const assigneeId = event.detail.value as Assignee['id'] | null
  selectedAssigneeId.value = assigneeId
  isAssigneePickerOpen.value = false;
}
</script>

<style scoped></style>

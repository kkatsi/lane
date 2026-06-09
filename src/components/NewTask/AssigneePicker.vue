<template>
  <Popover>
    <PopoverTrigger as-child>
      <button>
        <span v-if="selectedAssigneeId">{{ assignees[selectedAssigneeId]?.name }}</span>
        <span v-else>Unassigned</span>
      </button>
    </PopoverTrigger>
    <PopoverContent class="p-0 gap-2">
      <Command>
        <CommandInput placeholder="Search assignees..." class="command-input" />
        <CommandList>
          <CommandEmpty>No assignees found.</CommandEmpty>
          <CommandGroup class="max-h-52 overflow-auto">
            <CommandItem v-for="assignee in assignees" :value="assignee.id" :key="assignee.id"
              @select="onAssigneeSelect">
              <Initials :full-name="assignee.name" :color-id="assignee.colorId" />
              {{ assignee.name }}
              <span v-if="selectedAssigneeId === assignee.id">✓</span>
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
import { useBoardStore } from '@/stores/board.ts'
import type { Assignee } from '@/types.ts'
import { storeToRefs } from 'pinia'
import type { AcceptableValue, SelectItemSelectEvent } from 'reka-ui'
import CommandGroup from '../ui/command/CommandGroup.vue'
import Popover from '../ui/popover/Popover.vue'
import PopoverContent from '../ui/popover/PopoverContent.vue'
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue'
import Initials from '../Initials.vue'
import { UserX } from '@lucide/vue'

const selectedAssigneeId = defineModel<Assignee['id'] | null>('')

const boardStore = useBoardStore()

const { assignees } = storeToRefs(boardStore)

const onAssigneeSelect = (event: SelectItemSelectEvent<AcceptableValue>) => {
  const assigneeId = event.detail.value as Assignee['id'] | null
  selectedAssigneeId.value = assigneeId
}
</script>

<style scoped></style>

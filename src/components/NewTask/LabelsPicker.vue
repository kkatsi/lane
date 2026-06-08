<template>
  <Popover>
    <PopoverTrigger as-child>
      <button>
        Labels <span v-if="selectedLabelIds.length > 0">{{ selectedLabelIds.length }}</span>
      </button>
    </PopoverTrigger>
    <PopoverContent class="p-0 gap-2">
      <Command>
        <CommandInput placeholder="Search labels..." class="command-input" />
        <CommandList>
          <CommandEmpty>No labels found.</CommandEmpty>
          <CommandGroup>
            <CommandItem v-for="label in labels" :value="label.id" :key="label.id" @select="onLabelSelect">
              <Checkbox :model-value="selectedLabelIds.includes(label.id)" tabindex="-1" id="name" />
              {{ label.name }}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
      <div class="pb-2">
        <InputGroup
          class="border-0 bg-transparent dark:bg-transparent has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupAddon>
            <input type="color" v-model="newLabelColor" class="w-6" />
          </InputGroupAddon>
          <InputGroupInput v-model="newLabelName" placeholder="Create new label..."
            @keydown.enter.prevent="onAddNewLabel" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton @click="onAddNewLabel" size="icon-sm">
              <Plus />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
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
import type { Label } from '@/types.ts'
import { Plus } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import type { AcceptableValue, SelectItemSelectEvent } from 'reka-ui'
import { ref } from 'vue'
import Checkbox from '../ui/checkbox/Checkbox.vue'
import CommandGroup from '../ui/command/CommandGroup.vue'
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '../ui/input-group/InputGroupButton.vue'
import InputGroupInput from '../ui/input-group/InputGroupInput.vue'
import Popover from '../ui/popover/Popover.vue'
import PopoverContent from '../ui/popover/PopoverContent.vue'
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue'

const selectedLabelIds = defineModel<Label['id'][]>({ default: () => [] })

const boardStore = useBoardStore()

const { labels } = storeToRefs(boardStore)
const { addLabel } = boardStore

const newLabelName = ref<Label['name']>('')
const newLabelColor = ref<Label['color']>('')

const onAddNewLabel = () => {
  if (!newLabelName.value) return
  addLabel({
    id: crypto.randomUUID(),
    color: newLabelColor.value,
    name: newLabelName.value,
  })
  newLabelColor.value = ''
  newLabelName.value = ''
}

const onLabelSelect = (event: SelectItemSelectEvent<AcceptableValue>) => {
  const labelId = event.detail.value as Label['id'] | undefined
  if (!labelId) return
  selectedLabelIds.value = selectedLabelIds.value.includes(labelId)
    ? selectedLabelIds.value.filter((id) => id !== labelId)
    : [...selectedLabelIds.value, labelId]
}
</script>

<style scoped></style>

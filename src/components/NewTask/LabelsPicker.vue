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
            <CommandItem
              v-for="label in labels"
              :value="label.id"
              :key="label.id"
              @select="onLabelSelect"
            >
              <Checkbox
                :model-value="selectedLabelIds.includes(label.id)"
                tabindex="-1"
                id="name"
              />
              {{ label.name }}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
      <div class="p-2 pt-0">
        <Input v-model="newLabelName" />
        <input type="color" v-model="newLabelColor" />
        <button @click="onAddNewLabel">+</button>
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
import Input from '../ui/input/Input.vue'
import Popover from '../ui/popover/Popover.vue'
import PopoverContent from '../ui/popover/PopoverContent.vue'
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue'
import CommandGroup from '../ui/command/CommandGroup.vue'
import { useBoardStore } from '@/stores/board.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { Label } from '@/types.ts'
import type { AcceptableValue, SelectItemSelectEvent } from 'reka-ui'
import Checkbox from '../ui/checkbox/Checkbox.vue'

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

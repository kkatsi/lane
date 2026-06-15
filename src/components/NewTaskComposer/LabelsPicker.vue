<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button size="xs" variant="ghost">
        <Tag />
        Labels <Badge v-if="selectedLabelIds.length > 0" variant="outline">{{ selectedLabelIds.length }}</Badge>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 gap-2" align="start">
      <Command>
        <CommandInput placeholder="Search labels..." class="command-input" />
        <CommandList>
          <CommandEmpty>No labels found.</CommandEmpty>
          <CommandGroup class="max-h-52 overflow-auto">
            <CommandItem v-for="label in labels" :value="label.id" :key="label.id" @select="onLabelSelect">
              <Checkbox :model-value="selectedLabelIds.includes(label.id)" tabindex="-1" id="name" />
              <Badge class="capitalize"
                :style="{ color: COLORS.find(c => c.id === label.colorId)?.text, backgroundColor: COLORS.find(c => c.id === label.colorId)?.background }">
                {{ label.name }}
              </Badge>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
      <div class="pb-2">
        <InputGroup
          class="border-0 bg-transparent dark:bg-transparent has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupAddon class="pl-4">
            <Popover v-model:open="isLabelColorOpen">
              <PopoverTrigger as-child>
                <button class="w-5 h-5 rounded-full cursor-pointer" :style="{
                  backgroundColor: COLORS.find(c => c.id ===
                    newLabelColor)?.background
                }"></button>
              </PopoverTrigger>
              <PopoverContent class="p-0 w-auto" align="start" :side-offset="24" :align-offset="-8">
                <Item>
                  <label :for="labelColor.id" v-for="labelColor in COLORS" class="w-5 h-5 rounded-full cursor-pointer"
                    :key="labelColor.id" :style="{ backgroundColor: labelColor.background }">
                    <input type="radio" :id="labelColor.id" :value="labelColor.id" v-model="newLabelColor"
                      @change="isLabelColorOpen = false" class="sr-only" />
                  </label>
                </Item>
              </PopoverContent>
            </Popover>
            <!-- <input type="color" v-model="newLabelColor" class="w-6" /> -->
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
import { useCurrentBoard } from '@/composables/useCurrentBoard'
import type { Label } from '@/types.ts'
import { Plus, Tag } from '@lucide/vue'
import type { AcceptableValue, PopoverArrow, SelectItemSelectEvent } from 'reka-ui'
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
import { COLORS } from '@/constants/colors.ts'
import Item from '../ui/item/Item.vue'
import Button from '../ui/button/Button.vue'
import Badge from '../ui/badge/Badge.vue'

const selectedLabelIds = defineModel<Label['id'][]>({ default: () => [] })

const { labels, addLabel } = useCurrentBoard()

const newLabelName = ref<Label['name']>('')
const newLabelColor = ref<Label['colorId']>(COLORS.at(-1)?.id ?? '')
const isLabelColorOpen = ref(false);

const onAddNewLabel = () => {
  if (!newLabelName.value) return
  addLabel({
    id: crypto.randomUUID(),
    colorId: newLabelColor.value,
    name: newLabelName.value,
  })
  newLabelColor.value = COLORS.at(-1)?.id ?? ''
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

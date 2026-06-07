<template>
  <Popover v-model:open="isDueDatePickerOpen">
    <PopoverTrigger as-child>
      <button>
        <span v-if="dueDate">{{ triggerButtonDisplayDate }}</span>
        <span v-else>Due Date</span>
      </button>
    </PopoverTrigger>
    <PopoverContent class="gap-3">
      <InputGroup>
        <InputGroupInput @input="commitFromTextInput" @keydown.enter.prevent="onSetDateClick" v-model="inputValue"
          placeholder="Tomorrow or next week" />
        <InputGroupAddon align="inline-end">
          <Popover v-model:open="isCalendarOpen">
            <PopoverTrigger as-child>
              <InputGroupButton aria-label="Open Calendar" title="Open Calendar" size="icon-xs">
                <CalendarArrowDown />
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar class="rounded-md shadow-sm" v-model="calendarDate" @update:model-value="commitFromCalendar" />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
      <Item v-if="!!detailedDisplayDate" class="bg-green-950 text-green-400 p-2">
        <ItemMedia variant="icon">
          <Check />
        </ItemMedia>
        <ItemContent class="gap-0">
          <span>{{ detailedDisplayDate }}</span>
          <span v-if="daysFromToday > 0" class="text-xs text-green-600">{{ daysFromToday }} {{ daysFromToday > 1 ?
            'days' : 'day'
          }}</span>
        </ItemContent>
      </Item>
      <Separator />
      <div class="flex justify-end">
        <Button @click="onSetDateClick" size="sm" :disabled="!tempDate">Set Date</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { calculateDaysFromToday } from '@/lib/dates.ts'
import { getLocalTimeZone, type DateValue } from '@internationalized/date'
import { CalendarArrowDown, Check } from '@lucide/vue'
import { parseDate } from 'chrono-node'
import { computed, ref, type Ref } from 'vue'
import Calendar from '../ui/calendar/Calendar.vue'
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '../ui/input-group/InputGroupButton.vue'
import InputGroupInput from '../ui/input-group/InputGroupInput.vue'
import Item from '../ui/item/Item.vue'
import ItemContent from '../ui/item/ItemContent.vue'
import ItemMedia from '../ui/item/ItemMedia.vue'
import Popover from '../ui/popover/Popover.vue'
import PopoverContent from '../ui/popover/PopoverContent.vue'
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue'
import Separator from '../ui/separator/Separator.vue'
import Button from '../ui/button/Button.vue'

const dueDate = defineModel<Date | null>();

const isCalendarOpen = ref(false);
const isDueDatePickerOpen = ref(false);
const inputValue = ref('')
const nativeLanguageDate = computed(() => parseDate(inputValue.value))
const calendarDate = ref() as Ref<DateValue> | undefined;
const tempDate = ref<Date | null>(null)

const triggerButtonDisplayDate = computed(() =>
  dueDate.value?.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
  }),
)

const detailedDisplayDate = computed(() =>
  tempDate.value?.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  }),
)

const daysFromToday = computed(() =>
  tempDate.value ?
    calculateDaysFromToday(tempDate.value) : 0
)

const resetTextInput = () => {
  inputValue.value = ''
}
const hideCalendarPopover = () => {
  isCalendarOpen.value = false;
}
const commitFromTextInput = () => {
  tempDate.value = nativeLanguageDate.value;
}
const hideDueDatePicker = () => {
  isDueDatePickerOpen.value = false;
}
const commitFromCalendar = (value?: DateValue) => {
  if (!value) return;
  tempDate.value = value?.toDate(getLocalTimeZone());
  resetTextInput();
  hideCalendarPopover()
}
const onSetDateClick = () => {
  dueDate.value = tempDate.value;
  hideDueDatePicker()
  resetTextInput();
}
</script>

<style scoped></style>

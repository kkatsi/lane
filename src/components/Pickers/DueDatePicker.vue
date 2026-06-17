<template>
  <Popover v-model:open="isDueDatePickerOpen">
    <slot name="trigger" :display-date="triggerDisplayDate" />
    <PopoverContent class="gap-3" align="start">
      <InputGroup>
        <InputGroupInput
          @input="commitFromTextInput"
          @keydown.enter.prevent="onSetDateClick"
          v-model="inputValue"
          placeholder="Tomorrow or next week"
        />
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
          <span v-if="daysFromToday > 0" class="text-xs text-green-600">
            {{ daysFromToday }} {{ daysFromToday > 1 ? "days" : "day" }}
          </span>
        </ItemContent>
      </Item>
      <Separator />
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground flex items-center gap-1">
          <Kbd>
            <CornerDownLeft :size="10" />
            Set
          </Kbd>
          Select
        </span>
        <span class="text-xs text-muted-foreground flex items-center gap-1">
          <Kbd>Esc</Kbd>
          Cancel
        </span>
        <div class="flex items-center gap-1 ml-auto">
          <Button @click="onSetDateClick" size="sm" :disabled="!tempDate">Set Date</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { calculateDaysFromToday } from "@/lib/dates.ts";
import { getLocalTimeZone, type DateValue } from "@internationalized/date";
import { CalendarArrowDown, Check, CornerDownLeft } from "@lucide/vue";
import { parseDate } from "chrono-node";
import { computed, ref, type Ref } from "vue";
import Button from "../ui/button/Button.vue";
import Calendar from "../ui/calendar/Calendar.vue";
import InputGroup from "../ui/input-group/InputGroup.vue";
import InputGroupAddon from "../ui/input-group/InputGroupAddon.vue";
import InputGroupButton from "../ui/input-group/InputGroupButton.vue";
import InputGroupInput from "../ui/input-group/InputGroupInput.vue";
import Item from "../ui/item/Item.vue";
import ItemContent from "../ui/item/ItemContent.vue";
import ItemMedia from "../ui/item/ItemMedia.vue";
import Kbd from "../ui/kbd/Kbd.vue";
import Popover from "../ui/popover/Popover.vue";
import PopoverContent from "../ui/popover/PopoverContent.vue";
import PopoverTrigger from "../ui/popover/PopoverTrigger.vue";
import Separator from "../ui/separator/Separator.vue";

const dueDate = defineModel<Date | null>("dueDate");

const isCalendarOpen = ref(false);
const isDueDatePickerOpen = ref(false);
const inputValue = ref("");
const nativeLanguageDate = computed(() => parseDate(inputValue.value));
const calendarDate = ref() as Ref<DateValue> | undefined;
const tempDate = ref<Date | null>(null);

const detailedDisplayDate = computed(() =>
  tempDate.value?.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  }),
);

const triggerDisplayDate = computed(() =>
  dueDate.value?.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
  }),
);

const daysFromToday = computed(() => (tempDate.value ? calculateDaysFromToday(tempDate.value) : 0));

const resetTextInput = () => {
  inputValue.value = "";
};
const hideCalendarPopover = () => {
  isCalendarOpen.value = false;
};
const commitFromTextInput = () => {
  tempDate.value = nativeLanguageDate.value;
};
const hideDueDatePicker = () => {
  isDueDatePickerOpen.value = false;
};
const commitFromCalendar = (value?: DateValue) => {
  if (!value) return;
  tempDate.value = value?.toDate(getLocalTimeZone());
  resetTextInput();
  hideCalendarPopover();
};
const onSetDateClick = () => {
  dueDate.value = tempDate.value;
  hideDueDatePicker();
  resetTextInput();
};
</script>

<style scoped></style>

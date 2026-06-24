<template>
  <Popover v-model:open="isFiltersOpen">
    <PopoverTrigger as-child>
      <Button variant="outline">
        <Filter />
        Filter
      </Button>
    </PopoverTrigger>
    <PopoverContent class="pt-3 pb-0 px-0 gap-0" align="start" :side-offset="16">
      <div class="px-3 flex justify-between items-center sticky">
        <span class="font-medium">Filters</span>
        <Button variant="ghost" class="p-0 min-h-auto h-auto text-muted-foreground" @click="onReset" size="sm">
          Reset
        </Button>
      </div>
      <Separator class="mt-2" />
      <ScrollArea class="max-h-90 pt-2">
        <LabelsFilter class="px-3" v-model="selectedLabelIdsRef" />
        <Separator class="my-2" />
        <AssigneesFilter class="px-3" v-model="selectedAssigneeIdsRef" />
        <Separator class="my-2" />
        <DueDateFilter class="px-3" v-model="selectedDueDateRef" />
      </ScrollArea>
      <div class="flex items-center justify-end px-3 py-1.5 bg-muted mt-2 border-t">
        <Button @click="() => (isFiltersOpen = false)" variant="ghost" class="text-muted-foreground" size="sm">
          Cancel
        </Button>
        <Button @click="onApply" size="sm" :disabled="isApplyButtonDisabled">Apply</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Filter } from "@lucide/vue";
import Button from "../ui/button/Button.vue";
import Popover from "../ui/popover/Popover.vue";
import PopoverContent from "../ui/popover/PopoverContent.vue";
import PopoverTrigger from "../ui/popover/PopoverTrigger.vue";
import Separator from "../ui/separator/Separator.vue";
import LabelsFilter from "./LabelsFilter.vue";
import AssigneesFilter from "./AssigneesFilter.vue";
import DueDateFilter from "./DueDateFilter.vue";
import { useBoardFilters } from "@/composables/useBoardFilters.ts";
import ScrollArea from "../ui/scroll-area/ScrollArea.vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { areArraysEqual } from "@/lib/utils.ts";
import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options.ts";

const router = useRouter();
const route = useRoute();

const { assigneeIds, dueDate, labelIds } = useBoardFilters();

const selectedLabelIdsRef = ref<string[] | undefined>(labelIds.value);
const selectedAssigneeIdsRef = ref<string[] | undefined>(assigneeIds.value);
const selectedDueDateRef = ref<string | undefined>(dueDate.value);

const isFiltersOpen = ref<boolean>(false);

const syncFromApplied = () => {
  selectedLabelIdsRef.value = [...labelIds.value];
  selectedAssigneeIdsRef.value = [...assigneeIds.value];
  selectedDueDateRef.value = dueDate.value;
};

watch(isFiltersOpen, (open) => open && syncFromApplied());

const onReset = () => {
  selectedLabelIdsRef.value = undefined;
  selectedAssigneeIdsRef.value = undefined;
  selectedDueDateRef.value = DATE_FILTER_OPTIONS.ANYTIME.id;
};

const isApplyButtonDisabled = computed(
  () =>
    areArraysEqual(selectedLabelIdsRef.value, labelIds.value) &&
    areArraysEqual(selectedAssigneeIdsRef.value, assigneeIds.value) &&
    selectedDueDateRef.value === dueDate.value,
);

const onApply = () => {
  router.replace({
    query: {
      ...route.query,
      label: selectedLabelIdsRef.value,
      assignee: selectedAssigneeIdsRef.value,
      dueDate: selectedDueDateRef.value,
    },
  });
  isFiltersOpen.value = false;
};
</script>

<style scoped></style>

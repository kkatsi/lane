<template>
  <div class="p-2 grid grid-cols-[20%_80%] items-center">
    <span class="font-light tracking-wider text-xs">LABELS</span>
    <div class="flex flex-wrap gap-2 items-center">
      <Badge
        v-for="label in labels"
        :key="label.id"
        class="capitalize"
        :style="{
          color: COLORS.find((c) => c.id === label.colorId)?.text,
          backgroundColor: COLORS.find((c) => c.id === label.colorId)?.background,
        }"
      >
        {{ label.name }}
      </Badge>
      <LabelsPicker v-model:selected-label-ids="selectedLabelIds">
        <template v-slot:trigger>
          <PickerTrigger as-child>
            <Button variant="outline" size="icon-xs">
              <Plus />
            </Button>
          </PickerTrigger>
        </template>
      </LabelsPicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentTask } from "@/composables/useCurrentTask";
import { COLORS } from "@/constants/colors.ts";
import type { Label } from "@/types.ts";
import { Plus } from "@lucide/vue";
import { ref, watch } from "vue";
import LabelsPicker from "../Pickers/LabelsPicker.vue";
import PickerTrigger from "../Pickers/PickerTrigger.vue";
import Badge from "../ui/badge/Badge.vue";
import Button from "../ui/button/Button.vue";

const { labelIds, updateTask, labels } = useCurrentTask();

const selectedLabelIds = ref<Label["id"][]>(labelIds.value);

watch(selectedLabelIds, (ids) => {
  updateTask({ labelIds: ids });
});
</script>

<style scoped></style>

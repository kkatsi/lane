<template>
  <div>
    <span class="text-xs font-light tracking-wider text-muted-foreground">DUE DATE</span>
    <RadioGroup v-model="dueDate" class="mt-3">
      <div v-for="item in DATE_FILTER_OPTIONS" class="flex items-center space-x-2">
        <Label :for="item.id" class="text-muted-foreground cursor-pointer">
          <RadioGroupItem :id="item.id" :key="item.id" :value="item.id" />
          {{ item.name }}
        </Label>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options.ts";
import Label from "../ui/label/Label.vue";
import RadioGroup from "../ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "../ui/radio-group/RadioGroupItem.vue";

const dueDate = defineModel<string>({ default: "" });
</script>

<style scoped></style>

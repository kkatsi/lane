<template>
  <fieldset>
    <div class="text-xs flex items-center justify-between">
      <legend class="font-light tracking-wider text-muted-foreground">LABELS</legend>
      <span v-if="labelIds.length" class="text-primary font-semibold">{{ labelIds.length }}</span>
    </div>
    <CheckboxGroupRoot v-model="labelIds" class="flex flex-wrap gap-1 mt-2">
      <Badge
        v-for="label in labels"
        :variant="!labelIds.includes(label.id) ? 'outline' : 'default'"
        :class="cn(!labelIds.includes(label.id) && 'border-dashed bg-muted border-muted-foreground', 'cursor-pointer')"
        :key="label.id"
        :style="
          labelIds.includes(label.id)
            ? {
                color: COLORS.find((c) => c.id === label.colorId)?.text,
                backgroundColor: COLORS.find((c) => c.id === label.colorId)?.background,
              }
            : {}
        "
        as-child
      >
        <Label :for="label.id">
          <CheckboxRoot :id="label.id" :value="label.id" class="sr-only" />
          <Check v-if="labelIds.includes(label.id)" />
          {{ label.name }}
        </Label>
      </Badge>
    </CheckboxGroupRoot>
  </fieldset>
</template>

<script setup lang="ts">
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils.ts";
import { Check } from "@lucide/vue";
import { CheckboxGroupRoot, CheckboxRoot } from "reka-ui";
import Badge from "../ui/badge/Badge.vue";
import Label from "../ui/label/Label.vue";

const { labels } = useCurrentBoard();

const labelIds = defineModel<string[]>({ default: [] });
</script>

<style scoped></style>

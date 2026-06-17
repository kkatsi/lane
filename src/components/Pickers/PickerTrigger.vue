<script setup lang="ts">
import type { PopoverTriggerProps } from "reka-ui";
import PopoverTrigger from "../ui/popover/PopoverTrigger.vue";

const props = defineProps<PopoverTriggerProps>();
</script>

<template>
  <PopoverTrigger v-bind="props">
    <slot />
  </PopoverTrigger>
</template>

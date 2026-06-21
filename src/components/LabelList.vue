<template>
  <div :class="cn('flex flex-wrap items-center gap-2', props.class)">
    <LabelBadge v-for="label in labels" :key="label.id" :label="label" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { Label } from "@/types";
import type { HTMLAttributes } from "vue";
import LabelBadge from "./LabelBadge.vue";

const props = defineProps<{ labels: Label[]; class?: HTMLAttributes["class"] }>();
</script>

<style scoped></style>

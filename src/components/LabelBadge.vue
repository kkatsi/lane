<template>
  <Badge class="inline" :style="{ color: color?.text, backgroundColor: color?.background }" v-html="hightlight" />
</template>

<script setup lang="ts">
import { useHighlightedText } from "@/composables/useHighlightedText.ts";
import { COLORS } from "@/constants/colors";
import type { Label } from "@/types";
import { computed } from "vue";
import Badge from "./ui/badge/Badge.vue";
import { useSearchQueryRef } from "@/composables/useSearchQueryRef.ts";

const searchQuery = useSearchQueryRef();

const props = defineProps<{ label: Label }>();

const color = computed(() => COLORS.find((c) => c.id === props.label.colorId));

const hightlight = useHighlightedText(searchQuery, () => props.label.name);
</script>

<style scoped></style>

<template>
  <Badge
    class="capitalize"
    :style="{ color: color?.text, backgroundColor: color?.background }"
  >
    {{ label.name }}
  </Badge>
</template>

<script setup lang="ts">
import { COLORS } from "@/constants/colors";
import type { Label } from "@/types";
import { computed } from "vue";
import Badge from "./ui/badge/Badge.vue";

const props = defineProps<{ label: Label }>();

const color = computed(() => COLORS.find((c) => c.id === props.label.colorId));
</script>

<style scoped></style>

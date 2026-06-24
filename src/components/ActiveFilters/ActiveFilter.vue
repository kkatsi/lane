<template>
  <Badge variant="outline" class="h-8 px-3 text-sm cursor-pointer" @click="() => onClear(props.id)">
    <slot />
    <X class="text-muted-foreground" />
  </Badge>
</template>

<script setup lang="ts">
import { X } from "@lucide/vue";
import Badge from "../ui/badge/Badge.vue";

interface Props {
  id: string;
  onClear: (id: string) => void;
}

const props = defineProps<Props>();
</script>

<style scoped></style>

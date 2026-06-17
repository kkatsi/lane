<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." v-model="searchValue" />
    <InputGroupAddon>
      <Search />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end" class="tabular-nums">
      <span
        class="inline-block min-w-[5.5rem] text-right"
        :style="{ visibility: resultsCount !== null ? 'visible' : 'hidden' }"
      >
        {{ resultsCount }} {{ resultsCount === 1 ? "result" : "results" }}
      </span>
    </InputGroupAddon>
  </InputGroup>
</template>

<script setup lang="ts">
import { Search } from "@lucide/vue";
import InputGroup from "./ui/input-group/InputGroup.vue";
import InputGroupAddon from "./ui/input-group/InputGroupAddon.vue";
import InputGroupInput from "./ui/input-group/InputGroupInput.vue";

interface Props {
  resultsCount: number | null;
}

const props = defineProps<Props>();
const searchValue = defineModel<string>();
</script>

<style scoped></style>

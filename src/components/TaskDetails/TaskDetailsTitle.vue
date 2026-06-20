<template>
  <span
    v-if="!isTitleEditable"
    @click="() => (isTitleEditable = true)"
    class="min-w-0 max-w-[calc(100%-30px)] py-1 px-2 rounded-lg hover:bg-muted-foreground/25 hover:cursor-pointer"
  >
    {{ title }}
  </span>
  <textarea
    v-else
    v-focus
    @focusout="() => (isTitleEditable = false)"
    rows="1"
    v-model="titleRef"
    @keydown.enter.exact.prevent="onChange"
    class="min-w-0 max-w-[calc(100%-30px)] resize-none overflow-hidden field-sizing-content border-0 py-1 px-2 rounded-lg outline-none focus-visible:ring-ring/50 focus-visible:ring-3"
  />
</template>

<script setup lang="ts">
import { useCurrentTask } from "@/composables/useCurrentTask";
import { nextTick, ref, type Directive } from "vue";

const vFocus: Directive<HTMLElement> = {
  mounted: (el) => nextTick(() => el.focus()),
};

const { title, updateTask } = useCurrentTask();
const isTitleEditable = ref<boolean>(false);

const titleRef = ref<string | undefined>(title.value);

const onChange = () => {
  updateTask({ title: titleRef.value });
  isTitleEditable.value = false;
};
</script>

<style scoped></style>

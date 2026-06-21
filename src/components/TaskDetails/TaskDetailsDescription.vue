<template>
  <div class="py-4 pb-2 flex flex-col gap-1">
    <span class="font-light tracking-wider text-xs px-2">DESCRIPTION</span>
    <span
      v-if="!isDescriptionEditable"
      @click="() => (isDescriptionEditable = true)"
      class="min-w-0 max-w-[calc(100%-30px)] text-foreground py-1 px-2 rounded-lg hover:bg-muted-foreground/25 hover:cursor-pointer"
    >
      {{ description }}
    </span>
    <textarea
      v-else
      v-focus
      @focusout="() => (isDescriptionEditable = false)"
      rows="1"
      v-model="descriptionRef"
      @keydown.enter.exact.prevent="onChange"
      class="min-w-0 max-w-[calc(100%-30px)] resize-none text-foreground overflow-hidden field-sizing-content border-0 py-1 px-2 rounded-lg outline-none focus-visible:ring-ring/50 focus-visible:ring-3"
    />
  </div>
</template>

<script setup lang="ts">
import { useCurrentTask } from "@/composables/useCurrentTask";
import { nextTick, ref, type Directive } from "vue";

const vFocus: Directive<HTMLElement> = {
  mounted: (el) => nextTick(() => el.focus()),
};

const { description, updateTask } = useCurrentTask();

const isDescriptionEditable = ref<boolean>(false);
const descriptionRef = ref<string | undefined>(description.value);

const onChange = () => {
  updateTask({ description: descriptionRef.value });
  isDescriptionEditable.value = false;
};
</script>

<style scoped></style>

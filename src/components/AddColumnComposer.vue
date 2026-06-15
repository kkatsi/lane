<template>
  <div class="min-w-70 max-w-70 self-start rounded-lg p-2 ring-1 ring-primary flex flex-col gap-2">
    <Input ref="inputRef" v-model="newColumnTitle" placeholder="Column name..." @keyup.esc="props.onClose"
      @keyup.enter="onAdd" />
    <div class="flex items-center gap-2">
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Kbd>
          <CornerDownLeft :size="10" />
          Enter
        </Kbd>
        Add
      </span>
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Kbd>
          Esc
        </Kbd>
        Close
      </span>
      <div class="flex items-center gap-1 ml-auto">
        <Button size="sm" variant="ghost">
          Close
        </Button>
        <Button size="sm">
          Add
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import Input from './ui/input/Input.vue';
import Kbd from './ui/kbd/Kbd.vue';
import Button from './ui/button/Button.vue';
import { CornerDownLeft } from '@lucide/vue';
import { useCurrentBoard } from '@/composables/useCurrentBoard.ts';

interface Props {
  onClose: () => void;
}
const props = defineProps<Props>()
const { addColumn } = useCurrentBoard();

const newColumnTitle = ref<string>('');

const inputRef = useTemplateRef<{
  inputElement:
  HTMLInputElement
  | null
}>('inputRef')
onMounted(() => {
  inputRef.value?.inputElement?.focus()
})

const onAdd = () => {
  if (!newColumnTitle.value) return;
  addColumn(newColumnTitle.value);
  props.onClose()
}

</script>

<style scoped></style>

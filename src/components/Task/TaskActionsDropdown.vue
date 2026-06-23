<template>
  <div :class="cn('ml-auto', props.class)" @click.stop>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" class="p-1 h-auto">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent loop align="end">
        <DropdownMenuItem text-value="open task" @select="onTaskOpen">
          <Maximize2 />
          Open card
        </DropdownMenuItem>
        <DropdownMenuItem text-value="edit card" @select="onTaskEdit">
          <Edit2 />
          Edit card
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger text-value="move to">
            <Move />
            Move to
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                v-for="column in orderedColumns"
                :key="column.id"
                :disabled="column.id === props.columnId"
                :text-value="column.title"
                @select="() => onMoveTaskToColumnActionSelected(column.id)"
              >
                {{ column.title }}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" text-value="delete column" @select="onTaskRemoveActionSelect">
          <Trash2 />
          Delete card
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <AlertDialog v-model:open="isRemoveTaskAlertDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the selected task.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" @click="onTaskRemoveConfirmation">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCurrentBoard } from "@/composables/useCurrentBoard.ts";
import { cn, isDefined } from "@/lib/utils.ts";
import type { Column } from "@/types.ts";
import { computed, ref, type HTMLAttributes } from "vue";
import Button from "../ui/button/Button.vue";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "../ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuSeparator from "../ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuSub from "../ui/dropdown-menu/DropdownMenuSub.vue";
import DropdownMenuSubContent from "../ui/dropdown-menu/DropdownMenuSubContent.vue";
import DropdownMenuSubTrigger from "../ui/dropdown-menu/DropdownMenuSubTrigger.vue";
import DropdownMenuTrigger from "../ui/dropdown-menu/DropdownMenuTrigger.vue";
import { Edit2, Ellipsis, Maximize2, Move, Trash2 } from "@lucide/vue";
import { DropdownMenuPortal } from "reka-ui";

interface Props {
  taskId: string;
  columnId: string;
  class?: HTMLAttributes["class"];
  onTaskEdit?: () => void;
  onTaskOpen?: () => void;
}
const props = defineProps<Props>();

const { columnOrder, columns, removeTask, moveTask } = useCurrentBoard();

const orderedColumns = computed(() => columnOrder.value.map((id) => columns.value[id]).filter(isDefined));

const isRemoveTaskAlertDialogOpen = ref<boolean>(false);

const onMoveTaskToColumnActionSelected = (toColumnId: Column["id"]) => {
  // Append to the end of the destination column.
  moveTask(props.taskId, toColumnId, null);
};

const onTaskRemoveActionSelect = () => {
  isRemoveTaskAlertDialogOpen.value = true;
};
const onTaskRemoveConfirmation = () => {
  removeTask(props.taskId);
};
</script>

<style scoped></style>

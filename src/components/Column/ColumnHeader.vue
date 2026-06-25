<template>
  <div class="flex items-center justify-between shrink-0 gap-2">
    <div class="flex items-center gap-2">
      <input
        ref="columnTitleInputElement"
        v-if="isEditingColumnTitle"
        v-model="editedColumnTitle"
        @keyup.enter="onEditColumnName"
        @focusout="onEditColumnName"
        class="w-auto px-1 field-sizing-content max-w-[200px]"
      />
      <span v-else @dblclick="onEditColumnNameActionSelect" class="truncate max-w-[200px] px-1">
        {{ props.columnTitle }}
      </span>
      <Badge variant="secondary" class="text-muted-foreground">
        {{ hasActiveFilters ? `${props.tasksLength} of ${props.totalTasksLength}` : props.tasksLength }}
      </Badge>
    </div>
    <div class="ml-auto flex items-center gap-1">
      <Button variant="ghost" size="sm" class="p-1" @click="props.onAddNewTaskActionSelect">
        <Plus />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="sm" class="p-1">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent :loop="true" align="end" @close-auto-focus.prevent>
          <DropdownMenuItem text-value="rename column" @select="onEditColumnNameActionSelect">
            <Edit2 />
            Rename column
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger text-value="move all tasks to">
              <Move />
              Move all tasks to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                v-for="column in orderedColumns"
                :disabled="column.id === props.columnId"
                :key="column.id"
                :text-value="column.title"
                @select="() => onMoveAllTasksToColumn(column.id)"
              >
                {{ column.title }}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" text-value="delete column" @select="onColumnRemoveActionSelect">
            <Trash2 />
            Delete column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  <AlertDialog v-model:open="isRemoveColumnAlertDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the selected column and all tasks belonging to this
          column.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" @click="onColumnRemoveConfirmation">Continue</AlertDialogAction>
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
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { isDefined } from "@/lib/utils.ts";
import type { Column } from "@/types";
import { Edit2, Ellipsis, Move, Plus, Trash2 } from "@lucide/vue";
import { computed, ref, useTemplateRef } from "vue";
import Badge from "../ui/badge/Badge.vue";
import Button from "../ui/button/Button.vue";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "../ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "../ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuSeparator from "../ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuSub from "../ui/dropdown-menu/DropdownMenuSub.vue";
import DropdownMenuSubContent from "../ui/dropdown-menu/DropdownMenuSubContent.vue";
import DropdownMenuSubTrigger from "../ui/dropdown-menu/DropdownMenuSubTrigger.vue";
import DropdownMenuTrigger from "../ui/dropdown-menu/DropdownMenuTrigger.vue";

interface Props {
  columnTitle: Column["title"];
  columnId: Column["id"];
  tasksLength: number;
  totalTasksLength: number;
  hasActiveFilters: boolean;
  onAddNewTaskActionSelect: () => void;
}

const props = defineProps<Props>();

const { editColumnTitle, columns, columnOrder, moveAllColumnTasksToAnotherColumn, removeColumn } = useCurrentBoard();

const orderedColumns = computed(() => columnOrder.value.map((id) => columns.value[id]).filter(isDefined));

const isRemoveColumnAlertDialogOpen = ref<boolean>(false);

const columnTitleInputElement = useTemplateRef("columnTitleInputElement");
const isEditingColumnTitle = ref<boolean>(false);
const editedColumnTitle = ref<string>(props.columnTitle);

const onEditColumnNameActionSelect = () => {
  isEditingColumnTitle.value = true;
  setTimeout(() => {
    columnTitleInputElement.value?.focus();
  }, 0);
};

const onEditColumnName = () => {
  editColumnTitle(props.columnId, editedColumnTitle.value);
  isEditingColumnTitle.value = false;
};

const onMoveAllTasksToColumn = (toColId: Column["id"]) => {
  moveAllColumnTasksToAnotherColumn(props.columnId, toColId);
};

const onColumnRemoveActionSelect = () => {
  isRemoveColumnAlertDialogOpen.value = true;
};
const onColumnRemoveConfirmation = () => {
  removeColumn(props.columnId);
};
</script>

<style scoped></style>

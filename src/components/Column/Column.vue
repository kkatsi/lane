<template>
  <div class="min-w-70 max-w-70 flex flex-col min-h-0">
    <ColumnHeader
      :column-id="props.column.id"
      :column-title="props.column.title"
      :tasks-length="columnTasks.length"
      @add-new-task-action-select="onAddNewTaskActionSelect"
    />
    <VueDraggable
      :data-column-id="props.column.id"
      :class="
        cn(isDragging && 'hover:bg-muted/40 rounded-lg', 'flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 py-2 px-1')
      "
      v-model="columnTasks"
      :animation="150"
      :force-fallback="true"
      draggable=".task-card"
      group="board"
      :delay="10"
      filter=".empty-column-placeholder.task-composer"
      @choose="onDragChoose"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <Task v-for="task in columnTasks" :key="task.id" v-bind="task" :column-id="props.column.id" />
      <EmptyColumnPlaceholder
        v-if="!isAddingNewTask && !columnTasks.length && !isDragging"
        class="empty-column-placeholder"
        @click="onAddNewTaskActionSelect"
      />
      <TaskComposer
        v-if="isAddingNewTask"
        class="task-composer shrink-0"
        :column-id="props.column.id"
        @submit="onNewTaskSubmit"
        @close="onAddNewTaskComposerClose"
      />
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useFilteredTaskIds } from "@/composables/useFilteredTaskIds.ts";
import { cn, isDefined } from "@/lib/utils.ts";
import { useUIStore } from "@/stores/ui.ts";
import type { Column, Task as TaskType } from "@/types";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { VueDraggable, type DraggableEvent } from "vue-draggable-plus";
import Task from "../Task/Task.vue";
import TaskComposer from "../TaskComposer.vue";
import ColumnHeader from "./ColumnHeader.vue";
import EmptyColumnPlaceholder from "./EmptyColumnPlaceholder.vue";

interface Props {
  column: Column;
}

const props = defineProps<Props>();

const { tasks, moveTask, addTask } = useCurrentBoard();
const filteredTaskIds = useFilteredTaskIds();
const uiStore = useUIStore();
const { isDragging } = storeToRefs(uiStore);

const isAddingNewTask = ref<boolean>(false);

const columnTasks = computed(() => {
  const columnTaskIds = filteredTaskIds.value[props.column.id];
  if (!columnTaskIds) return [];
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined);
});

const onAddNewTaskActionSelect = () => (isAddingNewTask.value = true);

// Geometry of the card at pick-up, captured before SortableJS turns the source
// element into the thin-line ghost (which would otherwise collapse it to ~0).
let chosenHeight = 0;
// The static placeholder node holding the card's original slot during the drag.
let originPlaceholderEl: HTMLElement | null = null;

// @choose fires on mousedown, before the `sortable-ghost` (thin line) class is
// applied. Capture the real geometry and feed it to the cursor clone via CSS
// vars (the clone is a cloneNode of this element, so it inherits them).
const onDragChoose = (e: DraggableEvent<TaskType>) => {
  const el = e.item;
  if (!el) return;
  const { width, height, top, left } = el.getBoundingClientRect();
  chosenHeight = height;
  el.style.setProperty("--drag-width", `${width}px`);
  el.style.setProperty("--drag-height", `${height}px`);
  el.style.setProperty("--drag-top", `${top}px`);
  el.style.setProperty("--drag-left", `${left}px`);
};

// On drag start, drop a static placeholder into the source element's original
// slot so the list keeps the gap. It lacks `.task-card`, so the
// `draggable=".task-card"` selector excludes it from drop-index calculations.
const onDragStart = (e: DraggableEvent<TaskType>) => {
  const el = e.item;
  if (!el?.parentNode) return;
  isDragging.value = true;
  const placeholder = document.createElement("div");
  placeholder.className = "drag-origin-placeholder";
  placeholder.style.height = `${chosenHeight}px`;
  el.parentNode.insertBefore(placeholder, el);
  originPlaceholderEl = placeholder;
};

const onDragEnd = (e: DraggableEvent<TaskType>) => {
  originPlaceholderEl?.remove();
  originPlaceholderEl = null;

  const taskId = e.data.id;
  const toIndex = e.newIndex;
  const toColumnId = e.to.dataset["columnId"];

  isDragging.value = false;

  if (!taskId || !isDefined(toIndex) || !toColumnId) return;

  moveTask(taskId, toColumnId, toIndex);
};

const onAddNewTaskComposerClose = () => {
  isAddingNewTask.value = false;
};

const onNewTaskSubmit = (newTaskWithoutId: Omit<TaskType, "id">) => {
  addTask(props.column.id, {
    id: crypto.randomUUID(),
    ...newTaskWithoutId,
  });
  isAddingNewTask.value = false;
};
</script>

<style>
/* The ghost is the source <Task>, which SortableJS moves to the prospective
   drop position. Collapse it into a thin primary line = the insertion
   indicator between cards. */
.sortable-ghost {
  height: 3px !important;
  min-height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  border-radius: 9999px !important;
  background: var(--color-primary) !important;
  box-shadow: none !important;
  opacity: 1 !important;
  overflow: visible !important;
  pointer-events: none;
  position: relative;
}
.sortable-ghost::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: var(--color-primary);
}
.sortable-ghost > * {
  display: none !important;
}

/* Static placeholder reserving the dragged card's original slot for the whole
   drag (inserted in @start, removed in @end). Height is set inline to match
   the card; excluded from Sortable via the draggable=".task-card" selector. */
.drag-origin-placeholder {
  flex: 0 0 auto;
  border-radius: 0.75rem;
  border: 2px dashed color-mix(in oklab, var(--color-primary) 30%, transparent);
  background-color: color-mix(in oklab, var(--color-primary) 5%, transparent);
}

/* The cursor clone created by force-fallback. Because the ghost is now a thin
   line, SortableJS would size/position the clone from that collapsed box, so we
   restore the real geometry captured in @choose. The rotate survives because
   SortableJS appends its pointer translation to this transform matrix. */
.sortable-fallback {
  width: var(--drag-width) !important;
  height: var(--drag-height) !important;
  top: var(--drag-top) !important;
  left: var(--drag-left) !important;
  transform: rotate(2.5deg);
  box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-primary) 100%, transparent);
  opacity: 1 !important;
}
</style>

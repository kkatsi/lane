<template>
  <div class="min-w-70 max-w-70 flex flex-col min-h-0">
    <ColumnHeader
      :column-id="props.column.id"
      :column-title="props.column.title"
      :tasks-length="filteredColumnTasks.length"
      :total-tasks-length="totalColumnTasks.length"
      :has-active-filters="hasActiveFilters"
      @add-new-task-action-select="onAddNewTaskActionSelect"
    />
    <VueDraggable
      :data-column-id="props.column.id"
      :class="
        cn(isDragging && 'hover:bg-muted/40 rounded-lg', 'flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 py-2 px-1')
      "
      :model-value="filteredColumnTasks"
      :animation="150"
      :force-fallback="true"
      draggable=".task-card"
      group="board"
      :delay="10"
      filter=".column-placeholder.task-composer"
      @choose="onDragChoose"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <Task v-for="task in filteredColumnTasks" :key="task.id" v-bind="task" :column-id="props.column.id" />
      <template v-if="!isAddingNewTask && !filteredColumnTasks.length && !isDragging">
        <EmptyColumnPlaceholder v-if="!hasActiveFilters" class="column-placeholder" @click="onAddNewTaskActionSelect" />
        <NoMatchingTasksPlaceholder v-else class="column-placeholder" />
      </template>
      <HiddenByFiltersPlaceholder v-if="hasActiveFilters" :hidden-count="hiddenCount" class="column-placeholder" />
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
import { useBoardFilters } from "@/composables/useBoardFilters.ts";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useFilteredTaskIds } from "@/composables/useFilteredTaskIds.ts";
import { DATE_FILTER_OPTIONS } from "@/constants/date-filter-options.ts";
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
import HiddenByFiltersPlaceholder from "./HiddenByFiltersPlaceholder.vue";
import NoMatchingTasksPlaceholder from "./NoMatchingTasksPlaceholder.vue";

interface Props {
  column: Column;
}

const props = defineProps<Props>();

const { tasks, moveTask, addTask, columns } = useCurrentBoard();
const filteredTaskIds = useFilteredTaskIds();
const uiStore = useUIStore();
const { isDragging } = storeToRefs(uiStore);
const { searchQuery, assigneeIds, dueDate, labelIds } = useBoardFilters();

const hasActiveFilters = computed(
  () =>
    !!assigneeIds.value.length ||
    !!labelIds.value.length ||
    dueDate.value !== DATE_FILTER_OPTIONS.ANYTIME.id ||
    !!searchQuery.value,
);

const isAddingNewTask = ref<boolean>(false);

const filteredColumnTasks = computed(() => {
  const columnTaskIds = filteredTaskIds.value[props.column.id];
  if (!columnTaskIds) return [];
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined);
});
const totalColumnTasks = computed(() => {
  const columnTaskIds = columns.value[props.column.id]?.taskIds;
  if (!columnTaskIds) return [];
  return columnTaskIds.map((id) => tasks.value[id]).filter(isDefined);
});

const hiddenCount = computed(() => totalColumnTasks.value.length - filteredColumnTasks.value.length);

const onAddNewTaskActionSelect = () => (isAddingNewTask.value = true);

// Card geometry at pick-up, captured before the ghost collapses it to a thin line.
let chosenHeight = 0;
let originPlaceholderEl: HTMLElement | null = null;

// Feed real card geometry to the cursor clone via CSS vars before ghost collapses it.
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

// Reserve the source slot with a non-`.task-card` placeholder so the gap stays during drag.
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

  // Translate filtered drop index to the neighbor id it sits before (null = append).
  const destOrder = (filteredTaskIds.value[toColumnId] ?? []).filter((id) => id !== taskId);
  const beforeTaskId = destOrder[toIndex] ?? null;

  moveTask(taskId, toColumnId, beforeTaskId);
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
/* Collapse the moved card into a thin line = insertion indicator between cards. */
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

/* Placeholder reserving the dragged card's original slot during the drag. */
.drag-origin-placeholder {
  flex: 0 0 auto;
  border-radius: 0.75rem;
  border: 2px dashed color-mix(in oklab, var(--color-primary) 30%, transparent);
  background-color: color-mix(in oklab, var(--color-primary) 5%, transparent);
}

/* Cursor clone (force-fallback): restore real geometry since the ghost is collapsed. */
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

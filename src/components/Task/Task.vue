<template>
  <Card
    v-if="!isEditing"
    class="task-card shrink-0 select-none py-2 gap-2 group px-2.5 block cursor-pointer"
    @click="onOpen"
  >
    <TaskActionsDropdown
      class="float-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=open]:opacity-100 transition-opacity"
      :column-id="props.columnId"
      :task-id="props.id"
      @task-edit="() => (isEditing = true)"
      @task-open="onOpen"
    />
    <LabelList v-if="taskLabels.length > 0" :labels="taskLabels" class="gap-1 mb-2" />
    <CardTitle class="text-sm line-clamp-2" v-html="highlightTitle" />
    <CardDescription
      v-if="props.description"
      class="text-xs text-muted-foreground mt-1 line-clamp-3"
      v-html="highlightDescription"
    />
    <CardFooter
      v-if="!!displayDate || !!assignee || !!props.comments?.length"
      class="bg-card border-t-0 p-0 my-2 text-muted-foreground"
    >
      <div class="flex gap-2 items-center">
        <span v-if="!!displayDate" class="text-xs flex items-center gap-1">
          <Calendar1 :size="10" />
          {{ displayDate }}
        </span>
        <span v-if="props.comments?.length" class="text-xs flex items-center gap-1">
          <MessageSquareText :size="10" />
          {{ props.comments.length }}
        </span>
      </div>
      <Assignee
        v-if="!!assignee"
        class="ml-auto"
        :full-name="assignee?.name"
        :color-id="assignee?.colorId"
        display-fullname
      />
    </CardFooter>
  </Card>
  <TaskComposer
    v-else
    :column-id="props.columnId"
    v-model:selected-label-ids="editLabelIds"
    v-model:selected-assignee-id="editAssigneeId"
    v-model:task-title="editTitle"
    v-model:task-description="editDescription"
    v-model:selected-due-date="editDueDate"
    @submit="onSubmit"
    @close="onClose"
  />
</template>

<script setup lang="ts">
import { useBoardFilters } from "@/composables/useBoardFilters.ts";
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { useHighlightedText } from "@/composables/useHighlightedText.ts";
import { UNASSIGNED_ID } from "@/constants/assignees";
import { isDefined } from "@/lib/utils";
import type { Task } from "@/types";
import { Calendar1, MessageSquareText } from "@lucide/vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Assignee from "../Assignee.vue";
import LabelList from "../LabelList.vue";
import TaskComposer from "../TaskComposer.vue";
import Card from "../ui/card/Card.vue";
import CardDescription from "../ui/card/CardDescription.vue";
import CardFooter from "../ui/card/CardFooter.vue";
import CardTitle from "../ui/card/CardTitle.vue";
import TaskActionsDropdown from "./TaskActionsDropdown.vue";

interface Props extends Task {
  columnId: string;
}

const props = defineProps<Props>();
const router = useRouter();
const isEditing = defineModel<boolean>("isEditing");
const { labels, assignees, updateTask } = useCurrentBoard();
const { searchQuery } = useBoardFilters();

const editTitle = ref(props.title);
const editAssigneeId = ref(props.assigneeId);
const editLabelIds = ref([...props.labelIds]);
const editDescription = ref(props.description);
const editDueDate = ref(props.dueDate ?? null);

const assignee = computed(() => {
  if (!props.assigneeId || props.assigneeId === UNASSIGNED_ID) return undefined;
  return assignees.value[props.assigneeId];
});
const displayDate = computed(() =>
  props.dueDate
    ? new Date(props.dueDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    : undefined,
);
const taskLabels = computed(() => {
  return props.labelIds.map((id) => labels.value[id]).filter(isDefined);
});

const onSubmit = (taskWithoutId: Omit<Task, "id">) => {
  updateTask(props.id, taskWithoutId);
  isEditing.value = false;
};
const onClose = () => {
  isEditing.value = false;
};

const onOpen = () => {
  router.push({ name: "task", params: { taskId: props.id } });
};

const highlightTitle = useHighlightedText(searchQuery, () => props.title);
const highlightDescription = useHighlightedText(searchQuery, () => props.description);
</script>

<style scoped></style>

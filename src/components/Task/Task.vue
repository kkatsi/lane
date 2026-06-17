<template>
  <Card v-if="!isEditing" class="py-2 gap-2 group px-2.5 block" @dblclick="onOpen">
    <TaskActionsDropdown
      class="float-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=open]:opacity-100 transition-opacity"
      :column-id="props.columnId"
      :task-id="props.id"
      @task-edit="() => (isEditing = true)"
      @task-open="onOpen"
    />
    <div v-if="taskLabels.length > 0" class="flex gap-1 items-center flex-wrap mb-2">
      <Badge
        v-for="label in taskLabels"
        :key="label.id"
        :style="{
          color: COLORS.find((c) => c.id === label.colorId)?.text,
          backgroundColor: COLORS.find((c) => c.id === label.colorId)?.background,
        }"
      >
        {{ label.name }}
      </Badge>
    </div>
    <CardTitle class="text-sm line-clamp-2">
      {{ props.title }}
    </CardTitle>
    <CardDescription v-if="props.description" class="text-xs text-muted-foreground mt-1 line-clamp-3">
      {{ props.description }}
    </CardDescription>
    <CardFooter v-if="!!displayDate || !!assignee" class="bg-card border-t-0 p-0 my-2 text-muted-foreground">
      <span v-if="!!displayDate" class="text-xs flex items-center gap-1">
        <Calendar1 :size="10" />
        {{ displayDate }}
      </span>
      <Assignee
        v-if="!!assignee"
        class="ml-auto"
        :full-name="assignee?.name"
        size="sm"
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
import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { COLORS } from "@/constants/colors";
import { isDefined } from "@/lib/utils";
import type { Task } from "@/types";
import { Calendar1 } from "@lucide/vue";
import { computed, ref } from "vue";
import Assignee from "../Assignee.vue";
import TaskComposer from "../TaskComposer.vue";
import Badge from "../ui/badge/Badge.vue";
import Card from "../ui/card/Card.vue";
import CardFooter from "../ui/card/CardFooter.vue";
import CardTitle from "../ui/card/CardTitle.vue";
import TaskActionsDropdown from "./TaskActionsDropdown.vue";
import CardDescription from "../ui/card/CardDescription.vue";
import { useRouter } from "vue-router";

interface Props extends Task {
  columnId: string;
}

const props = defineProps<Props>();
const router = useRouter();
const isEditing = defineModel<boolean>("isEditing");
const { labels, assignees, updateTask } = useCurrentBoard();

const editTitle = ref(props.title);
const editAssigneeId = ref(props.assigneeId);
const editLabelIds = ref([...props.labelIds]);
const editDescription = ref(props.description);
const editDueDate = ref(props.dueDate ? new Date(props.dueDate) : null);

const assignee = computed(() => {
  if (!props.assigneeId) return undefined;
  const assignee = assignees.value[props.assigneeId];
  return assignee;
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
</script>

<style scoped></style>

import { useCurrentBoard } from "@/composables/useCurrentBoard";
import { isDefined } from "@/lib/utils";
import { useBoardsStore } from "@/stores/boards";
import type { Comment, Task } from "@/types";
import { computed } from "vue";
import { useRoute } from "vue-router";

export const useCurrentTask = () => {
  const boardsStore = useBoardsStore();
  const route = useRoute();
  const { boardId, tasks, labels, assignees } = useCurrentBoard();

  const taskId = computed(() => (route.params.taskId as string | undefined) ?? "");
  const task = computed(() => tasks.value[taskId.value]);

  const title = computed(() => task.value?.title ?? "");
  const description = computed(() => task.value?.description ?? "");
  const labelIds = computed(() => task.value?.labelIds ?? []);
  const assigneeId = computed(() => task.value?.assigneeId ?? null);
  const dueDate = computed(() => task.value?.dueDate ?? null);
  const comments = computed(() => task.value?.comments ?? []);

  const taskLabels = computed(() => labelIds.value.map((id) => labels.value[id]).filter(isDefined));
  const assignee = computed(() => (assigneeId.value ? assignees.value[assigneeId.value] : undefined));

  const updateTask = (patch: Partial<Omit<Task, "id">>) => boardsStore.updateTask(boardId.value, taskId.value, patch);
  const removeTask = () => boardsStore.removeTask(boardId.value, taskId.value);
  const addComment = (commentText: Comment["text"], assigneeId: Comment["assigneeId"]) => {
    boardsStore.addComment(boardId.value, taskId.value, commentText, assigneeId);
  };

  return {
    task,
    taskId,
    title,
    description,
    labelIds,
    assigneeId,
    dueDate,
    comments,
    labels: taskLabels,
    assignee,
    updateTask,
    removeTask,
    addComment,
  };
};

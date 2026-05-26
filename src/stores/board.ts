import type { Board, Column, Task } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore("board", () => {
  const labels = ref<Board["labels"]>({
    bug: {
      id: "bug",
      name: "Bug",
      color: "red",
    },
    urgent: {
      id: "urgent",
      name: "urgent",
      color: "orange",
    },
  });
  const tasks = ref<Board["tasks"]>({
    "1": {
      id: "1",
      title: "This is a title of the ticket",
      description: "Lorem Ipsum",
      assigneeFullName: "Penelope Kyratsou",
      dueDate: "2026-05-24T17:28:25+00:00",
      labelIds: ["bug", "urgent"],
    },
    "2": {
      id: "2",
      title: "This is a title of the ticket",
      description: "Lorem Ipsum",
      assigneeFullName: "Penelope Kyratsou",
      dueDate: "2026-05-24T17:28:25+00:00",
      labelIds: ["bug", "urgent"],
    },
  });
  const columns = ref<Board["columns"]>({
    "to-do": {
      id: "to-do",
      title: "To-Do",
      taskIds: ["1"],
    },
    bugs: {
      id: "bugs",
      title: "Bugs",
      taskIds: ["2"],
    },
  });
  const columnOrder = ref<Board["columnOrder"]>(["to-do", "bugs"]);

  const addTask = (columnId: Column["id"], task: Task) => {
    const column = columns.value[columnId];
    if (!column) return;
    column.taskIds.push(task.id);
    tasks.value[task.id] = task;
  };

  const removeTask = (taskId: Task["id"]) => {
    for (const col of Object.values(columns.value)) {
      const idx = col.taskIds.indexOf(taskId);
      if (idx !== -1) {
        col.taskIds.splice(idx, 1);
        break;
      }
    }
    delete tasks.value[taskId];
  };

  const updateTask = (taskId: Task["id"], patch: Partial<Omit<Task, "id">>) => {
    const task = tasks.value[taskId];
    if (!task) return;
    Object.assign(task, patch);
  };

  const moveTask = (taskId: Task["id"], toColumnId: Column["id"], toIndex: number) => {
    const destinationColumn = columns.value[toColumnId];
    if (!destinationColumn) return;
    for (const column of Object.values(columns.value)) {
      const idx = column.taskIds.indexOf(taskId);
      if (idx !== -1) {
        column.taskIds.splice(idx, 1);
        break;
      }
    }
    destinationColumn.taskIds.splice(toIndex, 0, taskId);
  };

  return { columns, columnOrder, tasks, labels, addTask, removeTask, updateTask, moveTask };
});

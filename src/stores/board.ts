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
    columns.value[columnId]?.taskIds.push(task.id);
    tasks.value[task.id] = task;
  };

  const removeTask = (columnId: Column["id"], taskId: Task["id"]) => {
    const col = columns.value[columnId];
    if (!col) return;
    col.taskIds = col.taskIds.filter((id) => id !== taskId);
    delete tasks.value[taskId];
  };

  return { columns, columnOrder, tasks, labels, addTask, removeTask };
});

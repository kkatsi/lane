import type { Board, Column, Label, Task } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore("board", () => {
  const labels = ref<Board["labels"]>({
    bug: {
      id: "1234",
      name: "Bug",
      color: "red",
    },
    urgent: {
      id: "12345",
      name: "urgent",
      color: "orange",
    },
  });
  const tasks = ref<Board["tasks"]>({
    "1": {
      id: "1",
      title: "No title",
      description: "Lorem",
      assigneeId: "maria",
      dueDate: "2026-05-24T17:28:25+00:00",
      labelIds: ["bug"],
    },
    "2": {
      id: "2",
      title: "This is a title of the ticket 2",
      description: "Ipsum",
      assigneeId: "nikos",
      dueDate: "2026-05-24T17:28:25+00:00",
      labelIds: ["urgent"],
    },
    "3": {
      id: "3",
      title: "This is a title of the ticket 3",
      description: "Ipsumidis",
      assigneeId: "maria",
      dueDate: "2026-05-24T17:28:25+00:00",
      labelIds: ["bug", "urgent"],
    },
  });
  const assignees = ref<Board["assignees"]>({
    maria: {
      id: "maria",
      name: "Maria",
      colorId: "red",
    },
    nikos: {
      id: "nikos",
      name: "Nikos",
      colorId: "green",
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
      taskIds: ["2", "3"],
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

  const addLabel = (label: Label) => {
    labels.value[label.id] = label;
  };

  return {
    columns,
    columnOrder,
    tasks,
    labels,
    assignees,
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addLabel,
  };
});

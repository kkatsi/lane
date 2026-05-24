export type Task = {
  id: string;
  title: string;
  description: string;
  labels: string[];
  assigneeFullName?: string | null;
  dueDate?: string | null;
  done: boolean;
};

export type Category = {
  id: string;
  title: string;
  tasks: Task[];
};

export interface Task {
  id: string;
  title: string;
  description: string;
  labelIds: Label["id"][];
  assigneeFullName?: string | null;
  dueDate?: string | null;
}

export interface Column {
  id: string;
  title: string;
  taskIds: Task["id"][];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Board {
  columns: Record<Column["id"], Column>;
  columnOrder: Column["id"][]; // ordered list of column ids
  tasks: Record<Task["id"], Task>;
  labels: Record<Label["id"], Label>;
}

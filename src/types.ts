export interface Task {
  id: string;
  title: string;
  description: string;
  labelIds: Label["id"][];
  assigneeId?: string | null;
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
  color?: string;
}

export interface Assignee {
  id: string;
  name: string;
}

export interface Board {
  columns: Record<Column["id"], Column>;
  columnOrder: Column["id"][]; // ordered list of column ids
  tasks: Record<Task["id"], Task>;
  labels: Record<Label["id"], Label>;
  assignees: Record<Assignee["id"], Assignee>;
}

export type FilterableKey = Exclude<keyof Task, "id" | "title" | "description">;

export type FilterOption = { id: string; label: string };

export interface Filter<T extends FilterableKey = FilterableKey> {
  id: T;
  title: string;
  selection: "single" | "multiple";
  options: FilterOption[];
  selected: FilterOption["id"][];
}

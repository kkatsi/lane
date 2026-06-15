export interface Task {
  id: string;
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
  colorId: Color["id"];
}

export interface Color {
  id: string;
  background: `#${string}`;
  text: `#${string}`;
}

export interface Assignee {
  id: string;
  name: string;
  colorId: Color["id"];
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  colorId: Color["id"];
  starred: boolean;
  updatedAt: string; // timestamp UTC
  columns: Record<Column["id"], Column>;
  columnOrder: Column["id"][]; // ordered list of column ids
  tasks: Record<Task["id"], Task>;
  labels: Record<Label["id"], Label>;
  assignees: Record<Assignee["id"], Assignee>;
}

export interface BoardOverview extends Pick<
  Board,
  "id" | "name" | "description" | "colorId" | "starred" | "updatedAt"
> {
  tasksCount: number;
  restAssigneesCount: number;
  firstTwoAssignees: Assignee[];
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

export interface BoardTemplate {
  id: string;
  name: string;
  description: string;
}

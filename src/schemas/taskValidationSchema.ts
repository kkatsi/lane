import { z } from "zod";
import type { Task } from "@/types";
import { UNASSIGNED_ID } from "@/constants/assignees";

export const newTaskSchema = z.object({
  title: z.string().trim().max(200).min(1, "Title is required"),
  description: z.string().trim().max(2000).default(""),
  labelIds: z.array(z.string()).default([]),
  assigneeId: z.string().min(1).default(UNASSIGNED_ID),
  dueDate: z.iso.datetime({ offset: true }).nullish(),
}) satisfies z.ZodType<Omit<Task, "id">>;

export type NewTaskInput = z.infer<typeof newTaskSchema>;

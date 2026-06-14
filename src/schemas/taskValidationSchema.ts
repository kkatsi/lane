import { z } from "zod";
import type { Task } from "@/types";

export const newTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000).default(""),
  labelIds: z.array(z.string()).default([]),
  assigneeId: z.string().min(1).nullish(),
  dueDate: z.iso.datetime({ offset: true }).nullish(),
}) satisfies z.ZodType<Omit<Task, "id">>;

export type NewTaskInput = z.infer<typeof newTaskSchema>;

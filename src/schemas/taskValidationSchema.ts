import { z } from "zod";
import type { Task } from "@/types";

export const newTaskSchema = z.object({
  description: z.string().trim().max(2000).min(1, "Description is required"),
  labelIds: z.array(z.string()).default([]),
  assigneeId: z.string().min(1).nullish(),
  dueDate: z.iso.datetime({ offset: true }).nullish(),
}) satisfies z.ZodType<Omit<Task, "id">>;

export type NewTaskInput = z.infer<typeof newTaskSchema>;

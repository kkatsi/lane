import { BOARD_TEMPLATES } from "@/constants/board-templates";
import { COLORS } from "@/constants/colors";
import z from "zod";

export const newBoardValidationSchema = z.object({
  name: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000),
  colorId: z.enum(COLORS.map((c) => c.id)),
  templateId: z.enum(BOARD_TEMPLATES.map((b) => b.id)),
});

export type NewBoardValues = z.infer<typeof newBoardValidationSchema>;

import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").max(255),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.preprocess(
    (value) => {
      if (!value) return undefined;
      return value instanceof Date ? value : new Date(value as string);
    },
    z.date({ required_error: "A data de vencimento é obrigatória" }),
  ),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

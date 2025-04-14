import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(3, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

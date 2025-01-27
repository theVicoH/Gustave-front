import { z } from "zod";

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  uploadedAt: z.string(),
  status: z.enum(["processing", "ready", "error"]),
});

export type File = z.infer<typeof fileSchema>;

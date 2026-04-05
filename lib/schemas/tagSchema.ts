import { z } from "zod";

export const TAG_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const TagIdSchema = z
  .string()
  .regex(TAG_ID_PATTERN, "Invalid tag id format");

export const TagColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid 6-digit hex color");

export const TagSchema = z.object({
  id: TagIdSchema,
  label: z.string().min(1, "Tag label is required"),
  description: z.string().min(1, "Tag description is required"),
  color: TagColorSchema,
});

export type Tag = z.infer<typeof TagSchema>;

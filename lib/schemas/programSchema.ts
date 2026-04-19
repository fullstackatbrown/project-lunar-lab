import { z } from "zod";

export const ProgramSchema = z.object({
  id: z.string().min(1, "Missing program id"),

  name: z.string().min(1, "Missing program name"),

  introduction: z.string().min(1, "Missing program introduction"),

  applicationUrl: z.string().url("applicationUrl must be a valid URL"),
});

export type Program = z.infer<typeof ProgramSchema>;

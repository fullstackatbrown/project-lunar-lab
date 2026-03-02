import { z } from "zod";

/**
 * Paper CMS Schema
 * - paperUrl: required (title must be clickable)
 * - codeUrl/dataUrl: optional (some papers don't have them)
 */
export const PaperSchema = z.object({
  id: z.string({ message: "Missing paper ID" }),
  title: z.string({ message: "Missing paper title" }),
  authors: z.array(
    z.string({ message: "Authors field must be an array of strings" }),
    { message: "Authors field must be an array" }
  ),
  year: z.coerce.number({ message: "Year must be a number" }).int(),
  venue: z.string({ message: "Missing paper venue" }),
  tags: z.array(
    z.string({ message: "Tags field must be an array of strings" }),
    { message: "Tags field must be an array" }
  ),

  paperUrl: z.string().url({ message: "paperUrl must be a valid URL" }),
  codeUrl: z.string().url({ message: "codeUrl must be a valid URL" }).optional(),
  dataUrl: z.string().url({ message: "dataUrl must be a valid URL" }).optional(),
});

export type Paper = z.infer<typeof PaperSchema>;
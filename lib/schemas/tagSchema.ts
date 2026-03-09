import z from "zod";


export const TagSchema = z.object({
  id: z.string({ message: "Missing tag ID" }),
  label: z.string({ message: "Missing tag label" }),
  description: z.string().optional(),
  aliases: z.string().optional(),
  color: z.string().optional(),
});


export const TagIdSchema = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;


export type Tag = z.infer<typeof TagSchema>;
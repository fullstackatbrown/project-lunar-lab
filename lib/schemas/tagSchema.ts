import * as z from "zod";

export const tagSchema = z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
})

export type Tag = z.infer<typeof tagSchema>;
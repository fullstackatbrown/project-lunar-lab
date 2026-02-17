import z from "zod";

export const cmsSchema = z.object({
    id: z.string({message: "Missing paper ID"}),
    title: z.string({message: "Missing paper title"}),
    authors: z.array(z.string({message: "Authors field must be an array of strings"}), 
        {message: "Authors field must be an array"}),
    year: z.coerce.number({message: "Year must be a number"}),
    venue: z.string({message: "Missing paper venue"}),
    tags: z.array(z.string({message: "Tags field must be an array of strings"}), 
        {message: "Tags field must be an array"})
});


export type cms = z.infer<typeof cmsSchema>;
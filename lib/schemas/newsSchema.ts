import { z } from "zod";

export const NewsSchema = z.object({
  id: z.string().min(1, "Missing news id"),

  // ISO date string YYYY-MM-DD — sortable and unambiguous
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be in YYYY-MM-DD format"),

  title: z.string().min(1, "Missing news title"),

  description: z.string().min(1, "Missing news description"),

  // Optional external link (paper, press release, announcement)
  url: z.string().url("url must be a valid URL").optional(),

  // Optional image — relative path (e.g. "/images/news/my-photo.jpg") or absolute URL
  image: z.string().optional(),
});

export type NewsItem = z.infer<typeof NewsSchema>;

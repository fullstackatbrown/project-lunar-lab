import { z } from "zod";

export const MemberCategoryEnum = z.enum([
  "professor",
  "phd",
  "graduate",
  "undergraduate",
]);

export type MemberCategory = z.infer<typeof MemberCategoryEnum>;

export const MemberSchema = z.object({
  id: z.string().min(1, "Missing member id"),

  name: z.string().min(1, "Missing member name"),

  // Professor / PhD / graduate roles use this; optional because
  // undergraduates do not render a role.
  role: z.string().optional(),

  category: MemberCategoryEnum,

  // Bare filename (e.g. "ellie_pavlick.png"), site-relative path
  // (e.g. "/images/ellie_pavlick.png"), or absolute URL.
  image: z.string().optional(),

  // Research interests / one-line bio. Not rendered for undergraduates.
  description: z.string().optional(),

  // Optional personal homepage. When set, the rendered name and image link to it.
  url: z.string().url("url must be a valid URL").optional(),

  // Within-category ordering. Lower numbers render first.
  order: z.number().optional(),
});

export type Member = z.infer<typeof MemberSchema>;

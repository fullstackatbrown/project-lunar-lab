import { z } from "zod";

export const CollaboratorSchema = z.object({
  id: z.string().min(1, "Missing collaborator id"),

  name: z.string().min(1, "Missing collaborator name"),

  // Bare filename, site-relative path, or absolute URL.
  image: z.string().min(1, "Missing collaborator image"),

  description: z.string().min(1, "Missing collaborator description"),

  // Optional homepage. When set, the rendered card links to it.
  url: z.string().url("url must be a valid URL").optional(),

  // "logo" renders smaller (251×176); "photo" renders full (375×247).
  // Defaults to "photo" when omitted.
  logoStyle: z.enum(["logo", "photo"]).optional(),

  order: z.number().optional(),
});

export type Collaborator = z.infer<typeof CollaboratorSchema>;

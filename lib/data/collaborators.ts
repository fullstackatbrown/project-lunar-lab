import "server-only";

import fs from "fs";
import path from "path";
import {
  CollaboratorSchema,
  type Collaborator,
} from "@/lib/schemas/collaboratorSchema";

const COLLABORATORS_DIRECTORY = path.join(
  process.cwd(),
  "content",
  "collaborators",
);

function normalizeImagePath(image: string): string {
  if (/^https?:\/\//.test(image)) return image;
  if (image.startsWith("/")) return image;
  return `/images/${image}`;
}

function getCollaboratorFileNames(): string[] {
  if (!fs.existsSync(COLLABORATORS_DIRECTORY)) {
    console.warn(
      `Collaborators directory does not exist: ${COLLABORATORS_DIRECTORY}`,
    );
    return [];
  }

  return fs
    .readdirSync(COLLABORATORS_DIRECTORY)
    .filter((file) => file.endsWith(".json"))
    .filter((file) => !file.startsWith("_") && !file.includes("template"));
}

function readCollaboratorFile(fileName: string): Collaborator | null {
  const fullPath = path.join(COLLABORATORS_DIRECTORY, fileName);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const jsonData = JSON.parse(fileContents);
    const result = CollaboratorSchema.safeParse(jsonData);

    if (!result.success) {
      console.warn(`Invalid collaborator file skipped: ${fileName}`);
      console.warn(result.error.format());
      return null;
    }

    return { ...result.data, image: normalizeImagePath(result.data.image) };
  } catch (error) {
    console.warn(`Failed to read or parse collaborator file: ${fileName}`);
    console.warn(error);
    return null;
  }
}

/**
 * Returns all valid collaborators sorted by `order`, then by name.
 */
export function getAllCollaborators(): Collaborator[] {
  const fileNames = getCollaboratorFileNames();
  const items: Collaborator[] = [];

  for (const fileName of fileNames) {
    const item = readCollaboratorFile(fileName);
    if (item) items.push(item);
  }

  const seenIds = new Set<string>();
  for (const item of items) {
    if (seenIds.has(item.id)) {
      console.warn(`Duplicate collaborator id found: ${item.id}`);
    }
    seenIds.add(item.id);
  }

  return items.sort((a, b) => {
    const aOrder = a.order ?? Number.POSITIVE_INFINITY;
    const bOrder = b.order ?? Number.POSITIVE_INFINITY;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.name.localeCompare(b.name);
  });
}

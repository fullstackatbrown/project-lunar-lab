import "server-only";

import fs from "fs";
import path from "path";
import { TagSchema, Tag } from "../schemas/tagSchema";

const TAGS_DIRECTORY = path.join(process.cwd(), "content", "tags");

export function getAllTags(): Tag[] {
  const tagFiles = fs
    .readdirSync(TAGS_DIRECTORY)
    .filter((file) => file.endsWith(".json"))
    .filter((file) => !file.startsWith("_") && file !== "tag-template.json");

  const seenIds = new Set<string>();
  const tagsList: Tag[] = [];

  for (const file of tagFiles) {
    const filePath = path.join(TAGS_DIRECTORY, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    let parsedJson: unknown;

    try {
      parsedJson = JSON.parse(fileContent);
    } catch {
      throw new Error(`Invalid JSON in tag file: ${file}`);
    }

    const result = TagSchema.safeParse(parsedJson);

    if (!result.success) {
      throw new Error(
        `Invalid tag schema in file ${file}: ${result.error.message}`
      );
    }

    const tag = result.data;

    if (seenIds.has(tag.id)) {
      throw new Error(`Duplicate tag ID "${tag.id}" found in file: ${file}`);
    }

    seenIds.add(tag.id);
    tagsList.push(tag);
  }

  return tagsList.sort((a, b) => a.label.localeCompare(b.label));
}
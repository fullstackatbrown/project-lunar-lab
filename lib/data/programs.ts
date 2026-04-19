import "server-only";

import fs from "fs";
import path from "path";
import { ProgramSchema, type Program } from "@/lib/schemas/programSchema";

const PROGRAMS_DIRECTORY = path.join(process.cwd(), "content", "programs");

function getProgramFileNames(): string[] {
  if (!fs.existsSync(PROGRAMS_DIRECTORY)) {
    console.warn(`Programs directory does not exist: ${PROGRAMS_DIRECTORY}`);
    return [];
  }

  return fs
    .readdirSync(PROGRAMS_DIRECTORY)
    .filter((file) => file.endsWith(".json"))
    .filter((file) => !file.startsWith("_") && !file.includes("template"));
}

function readProgramFile(fileName: string): Program | null {
  const fullPath = path.join(PROGRAMS_DIRECTORY, fileName);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const jsonData = JSON.parse(fileContents);
    const result = ProgramSchema.safeParse(jsonData);

    if (!result.success) {
      console.warn(`Invalid program file skipped: ${fileName}`);
      console.warn(result.error.format());
      return null;
    }

    return result.data;
  } catch (error) {
    console.warn(`Failed to read or parse program file: ${fileName}`);
    console.warn(error);
    return null;
  }
}

/**
 * Returns all valid programs sorted by id.
 * Adding a new JSON file to /content/programs is all that is needed
 * to publish a new program.
 */
export function getAllPrograms(): Program[] {
  const fileNames = getProgramFileNames();
  const items: Program[] = [];

  for (const fileName of fileNames) {
    const item = readProgramFile(fileName);
    if (item) items.push(item);
  }

  const seenIds = new Set<string>();
  for (const item of items) {
    if (seenIds.has(item.id)) {
      console.warn(`Duplicate program id found: ${item.id}`);
    }
    seenIds.add(item.id);
  }

  return items.sort((a, b) => a.id.localeCompare(b.id));
}

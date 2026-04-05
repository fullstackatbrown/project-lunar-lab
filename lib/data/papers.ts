import fs from "fs";
import path from "path";
import { PaperSchema, type Paper } from "@/lib/schemas/paperSchema";

const papersDirectory = path.join(process.cwd(), "content/papers");

/**
 * Reads all .json files in content/papers
 */
function getPaperFileNames(): string[] {
  if (!fs.existsSync(papersDirectory)) {
    console.warn(`Papers directory does not exist: ${papersDirectory}`);
    return [];
  }

  return fs
    .readdirSync(papersDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .filter((fileName) => !fileName.startsWith("_") && fileName !== "paper-template.json");
}

/**
 * Reads, parses, and validates one paper JSON file.
 * Returns null if the file is invalid.
 */
function readPaperFile(fileName: string): Paper | null {
  const fullPath = path.join(papersDirectory, fileName);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const jsonData = JSON.parse(fileContents);

    const result = PaperSchema.safeParse(jsonData);

    if (!result.success) {
      console.error(`Invalid paper JSON: ${fileName}`);
      console.error(result.error.format());
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(`Failed to read or parse paper file: ${fileName}`);
    console.error(error);
    return null;
  }
}

/**
 * getAllPapers()
 * ----------------
 * - Reads all JSON files
 * - Parses them
 * - Validates them
 * - Skips invalid files instead of crashing the whole page
 * - Warns on duplicate IDs
 * - Sorts papers (newest first)
 */
export function getAllPapers(): Paper[] {
  const fileNames = getPaperFileNames();

  const papers: Paper[] = [];

  for (const fileName of fileNames) {
    const paper = readPaperFile(fileName);

    if (paper) {
      papers.push(paper);
    }
  }

  const seenIds = new Set<string>();

  for (const paper of papers) {
    if (seenIds.has(paper.id)) {
      console.warn(`Duplicate paper id found: ${paper.id}`);
    }
    seenIds.add(paper.id);
  }

  return papers.sort((a, b) => b.year - a.year);
}

/**
 * getPaperById(id)
 * ----------------
 * Returns one paper by matching ID
 */
export function getPaperById(id: string): Paper | undefined {
  return getAllPapers().find((paper) => paper.id === id);
}
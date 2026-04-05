import "server-only";

import fs from "fs";
import path from "path";
import { NewsSchema, type NewsItem } from "@/lib/schemas/newsSchema";

const NEWS_DIRECTORY = path.join(process.cwd(), "content", "news");

function getNewsFileNames(): string[] {
  if (!fs.existsSync(NEWS_DIRECTORY)) {
    console.warn(`News directory does not exist: ${NEWS_DIRECTORY}`);
    return [];
  }

  return fs
    .readdirSync(NEWS_DIRECTORY)
    .filter((file) => file.endsWith(".json"))
    .filter((file) => !file.startsWith("_") && file !== "news-template.json");
}

function readNewsFile(fileName: string): NewsItem | null {
  const fullPath = path.join(NEWS_DIRECTORY, fileName);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const jsonData = JSON.parse(fileContents);
    const result = NewsSchema.safeParse(jsonData);

    if (!result.success) {
      console.warn(`Invalid news file skipped: ${fileName}`);
      console.warn(result.error.format());
      return null;
    }

    return result.data;
  } catch (error) {
    console.warn(`Failed to read or parse news file: ${fileName}`);
    console.warn(error);
    return null;
  }
}

/**
 * Returns all valid news items sorted newest first.
 * Adding a new JSON file to /content/news is all that is needed
 * to publish a new news item.
 */
export function getAllNews(): NewsItem[] {
  const fileNames = getNewsFileNames();
  const items: NewsItem[] = [];

  for (const fileName of fileNames) {
    const item = readNewsFile(fileName);
    if (item) items.push(item);
  }

  const seenIds = new Set<string>();
  for (const item of items) {
    if (seenIds.has(item.id)) {
      console.warn(`Duplicate news id found: ${item.id}`);
    }
    seenIds.add(item.id);
  }

  // Sort descending by date string — YYYY-MM-DD sorts correctly as a string
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Returns the N most recent news items.
 * Useful for the landing page preview.
 */
export function getLatestNews(limit = 3): NewsItem[] {
  return getAllNews().slice(0, limit);
}

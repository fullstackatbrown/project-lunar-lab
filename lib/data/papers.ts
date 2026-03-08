import fs from "fs";
import path from "path";
import { PaperSchema } from "@/lib/schemas/paperSchema";

const papersDirectory = path.join(process.cwd(), "content/papers");
export type Paper = ReturnType<typeof PaperSchema.parse>;

/**
 * getAllPapers()
 * ----------------
 * - Reads all JSON files
 * - Parses them
 * - Validates them
 * - Sorts them (newest first)
 */
export function getAllPapers(): Paper[] {
    const fileNames = fs.readdirSync(papersDirectory);

    const papers = fileNames.map((fileName) => {
        const fullPath = path.join(papersDirectory, fileName);

        const fileContents = fs.readFileSync(fullPath, "utf8");

        const jsonData = JSON.parse(fileContents);

        const validatedData = PaperSchema.parse(jsonData);

        return validatedData;
    });

    return papers.sort((a, b) => b.year - a.year);
}

/**
 * getPaperById(id)
 * ----------------
 * Returns one paper by matching ID
 */
export function getPaperById(id: string): Paper | undefined {
    const papers = getAllPapers();

    return papers.find((paper) => paper.id === id);
}
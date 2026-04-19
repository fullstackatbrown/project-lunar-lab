/**
 * validate-content.ts
 *
 * Validates all content JSON files against their schemas.
 * Run this in CI to catch bad content before it reaches production.
 *
 * Usage: npx tsx scripts/validate-content.ts
 */

import fs from "fs";
import path from "path";
import { PaperSchema } from "../lib/schemas/paperSchema";
import { TagSchema } from "../lib/schemas/tagSchema";
import { NewsSchema } from "../lib/schemas/newsSchema";
import { ProgramSchema } from "../lib/schemas/programSchema";
import { ZodSchema } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const CONTENT_TYPES = [
  {
    name: "papers",
    dir: path.join(CONTENT_ROOT, "papers"),
    schema: PaperSchema,
  },
  {
    name: "tags",
    dir: path.join(CONTENT_ROOT, "tags"),
    schema: TagSchema,
  },
  {
    name: "news",
    dir: path.join(CONTENT_ROOT, "news"),
    schema: NewsSchema,
  },
  {
    name: "programs",
    dir: path.join(CONTENT_ROOT, "programs"),
    schema: ProgramSchema,
  },
];

function validateDirectory(name: string, dir: string, schema: ZodSchema): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  if (!fs.existsSync(dir)) {
    console.warn(`  [SKIP] Directory not found: ${dir}`);
    return { passed, failed };
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !f.startsWith("_") && !f.includes("template"));

  for (const file of files) {
    const fullPath = path.join(dir, file);

    let json: unknown;
    try {
      json = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    } catch {
      console.error(`  [FAIL] ${file} — invalid JSON`);
      failed++;
      continue;
    }

    const result = schema.safeParse(json);
    if (result.success) {
      console.log(`  [OK]   ${file}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${file}`);
      const errors = result.error.flatten();
      for (const [field, messages] of Object.entries(errors.fieldErrors)) {
        console.error(`         ${field}: ${(messages as string[]).join(", ")}`);
      }
      failed++;
    }
  }

  return { passed, failed };
}

let totalPassed = 0;
let totalFailed = 0;

for (const { name, dir, schema } of CONTENT_TYPES) {
  console.log(`\nValidating ${name}...`);
  const { passed, failed } = validateDirectory(name, dir, schema);
  totalPassed += passed;
  totalFailed += failed;
}

console.log(`\n──────────────────────────`);
console.log(`Passed: ${totalPassed}  Failed: ${totalFailed}`);

if (totalFailed > 0) {
  console.error(`\nContent validation failed. Fix the errors above.`);
  process.exit(1);
} else {
  console.log(`\nAll content valid.`);
}

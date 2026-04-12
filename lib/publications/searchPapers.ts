import type { Paper } from "@/lib/schemas/paperSchema";

export type TagDictionaryEntry = {
  id: string;
  label: string;
  aliases: string[];
};

function normalize(s: string) {
  return s.toLowerCase();
}

function includesInsensitive(haystack: string, needle: string) {
  return normalize(haystack).includes(normalize(needle));
}

/** Tag IDs from the dictionary whose id, label, or aliases match the query substring. */
export function matchingDictionaryTagIds(
  query: string,
  tags: TagDictionaryEntry[]
): Set<string> {
  const q = query.trim();
  if (!q) return new Set();
  const ids = new Set<string>();
  for (const t of tags) {
    if (
      includesInsensitive(t.id, q) ||
      includesInsensitive(t.label, q) ||
      t.aliases.some((a) => includesInsensitive(a, q))
    ) {
      ids.add(t.id);
    }
  }
  return ids;
}

export function paperMatchesSearchQuery(
  paper: Paper,
  query: string,
  tags?: TagDictionaryEntry[]
): boolean {
  const q = query.trim();
  if (!q) return true;

  const fields = [
    paper.title,
    paper.authors.join(" "),
    paper.venue,
    String(paper.year),
    ...paper.tags,
  ];
  if (fields.some((f) => includesInsensitive(f, q))) return true;

  if (tags && tags.length > 0) {
    const dictIds = matchingDictionaryTagIds(q, tags);
    for (const tid of paper.tags) {
      if (dictIds.has(tid)) return true;
    }
  }
  return false;
}

export function filterPapers(
  papers: Paper[],
  query: string,
  activeTagId: string | null,
  tags?: TagDictionaryEntry[]
): Paper[] {
  return papers.filter((p) => {
    if (activeTagId && !p.tags.includes(activeTagId)) return false;
    return paperMatchesSearchQuery(p, query, tags);
  });
}

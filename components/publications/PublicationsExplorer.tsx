"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Paper } from "@/lib/schemas/paperSchema";
import {
  filterPapers,
  type TagDictionaryEntry,
} from "@/lib/publications/searchPapers";

type Props = {
  papers: Paper[];
  /** When provided, search includes label/alias resolution and chips use labels. */
  tags?: TagDictionaryEntry[];
};

function buildTagLabelMap(tags: TagDictionaryEntry[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const t of tags) m.set(t.id, t.label);
  return m;
}

export default function PublicationsExplorer({ papers, tags }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const qFromUrl = searchParams.get("q") ?? "";
  const tagFromUrl = searchParams.get("tag") ?? "";

  const [input, setInput] = useState(qFromUrl);

  // Sync from URL before paint so the debounce effect never runs with stale `input`
  // after back/forward (otherwise a pending timeout could rewrite the URL).
  useLayoutEffect(() => {
    setInput(qFromUrl);
  }, [qFromUrl]);

  useEffect(() => {
    if (input === qFromUrl) return;
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (input) params.set("q", input);
      else params.delete("q");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(handle);
  }, [input, pathname, qFromUrl, router, searchParams]);

  const tagLabelById = useMemo(
    () => (tags ? buildTagLabelMap(tags) : null),
    [tags]
  );

  const filtered = useMemo(
    () =>
      filterPapers(
        papers,
        input,
        tagFromUrl || null,
        tags && tags.length > 0 ? tags : undefined
      ),
    [papers, input, tagFromUrl, tags]
  );

  const setUrlParams = useCallback(
    (next: { q?: string; tag?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.q !== undefined) {
        if (next.q) params.set("q", next.q);
        else params.delete("q");
      }
      if (next.tag !== undefined) {
        if (next.tag) params.set("tag", next.tag);
        else params.delete("tag");
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const onChipClick = (tagId: string) => {
    if (tagFromUrl === tagId) setUrlParams({ tag: null });
    else setUrlParams({ tag: tagId });
  };

  const clearFilters = () => {
    setInput("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("tag");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const hasFilters = Boolean(input.trim() || tagFromUrl);

  if (papers.length === 0) {
    return (
      <p className="italic text-black/50 dark:text-white/50">
        No publications found.
      </p>
    );
  }

  return (
    <>
      <div className="mb-10 border-b border-black/10 pb-6 dark:border-white/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="sr-only" htmlFor="publications-search">
            Search publications
          </label>
          <input
            id="publications-search"
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by topic, method, or tag…"
            className="w-full max-w-xl rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none ring-black/20 focus:ring-2 dark:border-white/20 dark:bg-black"
          />
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="shrink-0 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-black/60 dark:text-white/60">
          No publications match your filters.
        </p>
      ) : (
        <div className="space-y-6">
          {filtered.map((paper) => (
            <article
              key={paper.id}
              className="grid gap-4 border-b border-black/10 pb-6 md:grid-cols-[140px_minmax(0,1fr)] dark:border-white/10"
            >
              <div className="text-sm text-black/60 dark:text-white/60">
                <div className="font-medium text-black dark:text-white">
                  {paper.venue}
                </div>
                <div>{paper.year}</div>
              </div>

              <div>
                <h2 className="text-2xl font-medium leading-tight">
                  <a
                    href={paper.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {paper.title}
                  </a>
                </h2>

                <p className="mt-2 text-sm text-black/80 dark:text-white/80">
                  {paper.authors.join(", ")}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => {
                    const isActive = tagFromUrl === tag;
                    const chipText = tagLabelById?.get(tag) ?? tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => onChipClick(tag)}
                        className={
                          isActive
                            ? "rounded-full bg-black/15 px-3 py-1 text-xs text-black ring-2 ring-black/30 dark:bg-white/15 dark:text-white dark:ring-white/40"
                            : "rounded-full bg-black/5 px-3 py-1 text-xs text-black/70 hover:bg-black/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
                        }
                      >
                        {chipText}
                      </button>
                    );
                  })}
                </div>

                {(paper.codeUrl || paper.dataUrl) && (
                  <div className="mt-4 flex gap-4 text-sm">
                    {paper.codeUrl && (
                      <a
                        href={paper.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Code
                      </a>
                    )}
                    {paper.dataUrl && (
                      <a
                        href={paper.dataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Data
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

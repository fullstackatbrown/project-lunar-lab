import { Suspense } from "react";
import { getAllPapers } from "@/lib/data/papers";
import { getAllTags } from "@/lib/data/tags";
import PublicationsExplorer from "@/components/publications/PublicationsExplorer";

export default function PublicationsPage() {
  const papers = getAllPapers();
  const tagRecords = getAllTags();
  const tags = tagRecords.map((t) => ({
    id: t.id,
    label: t.label,
    aliases: t.aliases,
  }));

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-black/10 pb-4 dark:border-white/10">
          <h1 className="text-4xl font-semibold tracking-tight">Publications</h1>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Papers are loaded from the Git-backed CMS content folder.
          </p>
        </header>

        <Suspense
          fallback={
            <p className="text-sm text-black/60 dark:text-white/60">Loading…</p>
          }
        >
          <PublicationsExplorer papers={papers} tags={tags} />
        </Suspense>
      </div>
    </main>
  );
}

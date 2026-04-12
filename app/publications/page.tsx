import { getAllPapers } from "@/lib/data/papers";
import { getAllTags } from "@/lib/data/tags";
import PublicationList from "@/components/publications/PublicationList";

export default function PublicationsPage() {
  const papers = getAllPapers();
  const tags = getAllTags();

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="space-y-4 mb-10 border-b border-black/10">
          <h1 className="italic text-6xl font tracking-tight text-[#1a1a1a]">
            Papers
          </h1>
          <PublicationList papers={papers} tags={tags} />
        </header>
      </div>
    </main>
  );
}

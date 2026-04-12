import { getAllPapers } from "@/lib/data/papers";

function formatTag(tag: string) {
  return tag.replace(/-/g, " ");
}

export default function PublicationsPage() {
  const papers = getAllPapers();

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-black/10 pb-4">
          <h1 className="text-4xl font-semibold tracking-tight">Publications</h1>
          <p className="mt-2 text-sm text-black/60">
            Papers are loaded from the Git-backed CMS content folder.
          </p>
        </header>

        {papers.length === 0 ? (
          <p className="italic text-black/50">No publications found.</p>
        ) : (
          <div className="space-y-6">
            {papers.map((paper) => (
              <article
                key={paper.id}
                className="grid gap-4 border-b border-black/10 pb-6 md:grid-cols-[140px_minmax(0,1fr)]"
              >
                <div className="text-sm text-black/60">
                  <div className="font-medium text-black">{paper.venue}</div>
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

                  <p className="mt-2 text-sm text-black/80">
                    {paper.authors.join(", ")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/5 px-3 py-1 text-xs uppercase tracking-wide text-black/70"
                      >
                        {formatTag(tag)}
                      </span>
                    ))}
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
      </div>
    </main>
  );
}

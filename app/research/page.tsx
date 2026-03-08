import { getAllPapers } from "@/lib/data/papers";

export default function ResearchPage() {
  const publications = getAllPapers();

  return (
    <main className="min-h-screen bg-[#fcfbf4] text-[#111111] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-baseline mb-8 border-b border-black/10 pb-4">
          <h1 className="text-7xl font-serif italic font-light">Papers</h1>
          <a
            href="#"
            className="text-lg hover:underline transition-all flex items-center gap-1"
          >
            Current Research Areas <span className="text-xl">→</span>
          </a>
        </header>

        <div className="space-y-0 text-sm">
          {publications.length === 0 ? (
            <p className="text-black/40 italic">No publications found.</p>
          ) : (
            publications.map((paper) => (
              <div
                key={paper.id}
                className="grid grid-cols-12 gap-8 py-8 border-b border-black/10 items-start"
              >
                {/* Left Column: Metadata */}
                <div className="col-span-1 text-[10px] leading-tight font-sans text-black/60 uppercase tracking-tighter">
                  <div className="font-bold">{paper.venue}</div>
                  <div>{paper.year}</div>
                </div>

                {/* Middle Column: Title & Links */}
                <div className="col-span-7">
                  <h2 className="text-2xl font-serif italic leading-snug pr-8 mb-4">
                    <a
                      href={paper.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      {paper.title} <span className="text-lg inline-block align-middle ml-1">↗</span>
                    </a>
                  </h2>

                  <div className="flex gap-4 text-[10px] uppercase tracking-widest font-sans font-bold">
                    {paper.codeUrl && (
                      <a href={paper.codeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-black/60">
                        [ Code ]
                      </a>
                    )}
                    {paper.dataUrl && (
                      <a href={paper.dataUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-black/60">
                        [ Data ]
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Authors */}
                <div className="col-span-4 text-sm font-sans text-black/80 leading-relaxed">
                  {paper.authors.join(", ")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
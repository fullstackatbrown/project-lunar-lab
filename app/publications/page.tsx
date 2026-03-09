import { getAllPapers } from "@/lib/data/papers";

export default function PublicationsPage() {
    const papers = getAllPapers();

    return (
        <div>
            <h1>Publications</h1>

            {papers.map((paper) => (
                <div key={paper.id}>
                    <h2>{paper.title}</h2>
                    <p>{paper.authors.join(", ")}</p>
                    <p>{paper.venue} — {paper.year}</p>
                    <p>{paper.tags.join(", ")}</p>
                </div>
            ))}
        </div>
    );
}
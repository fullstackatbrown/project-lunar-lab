import { getAllPapers } from "@/lib/data/papers";
import { getAllTags } from "@/lib/data/tags";
import PublicationList from "@/components/publications/PublicationList";

export default function PublicationsPage() {
  const papers = getAllPapers();
  const tags = getAllTags();

  return (
    <main
      style={{
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        paddingLeft: 87,
        paddingRight: 87,
        paddingTop: 0,
        overflowX: "hidden",
      }}
    >
      <h2 style={{ marginBottom: 30 }}>Papers</h2>
      <PublicationList papers={papers} tags={tags} />
    </main>
  );
}

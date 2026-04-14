import { getAllNews } from "@/lib/data/news";
import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
  const news = getAllNews();

  return (
    <main style={{ paddingLeft: 90, paddingRight: 90, paddingTop: 46 }}>
      <h2 style={{ marginBottom: 40 }}>Recent News</h2>
      <BlogList items={news} />
    </main>
  );
}

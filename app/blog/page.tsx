import { getAllNews } from "@/lib/data/news";
import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
  const posts = getAllNews();

  return (
    <main style={{ paddingLeft: 87, paddingRight: 87, paddingTop: 0 }}>
      <h2 style={{ marginBottom: 30 }}>Recent News</h2>
      <BlogList posts={posts} />
    </main>
  );
}

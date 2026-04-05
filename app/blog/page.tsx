import { getAllNews } from "@/lib/data/news";
import type { NewsItem } from "@/lib/schemas/newsSchema";

export default function BlogPage() {
  const news = getAllNews();

  return (
    <main className="page">
      <h1 className="text-h2">Recent News</h1>

      {news.length === 0 ? (
        <p className="text-body-lg">No news items yet.</p>
      ) : (
        <ul className="news-list">
          {news.map((item) => (
            <NewsRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </main>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <li className="news-item">
      <div className="news-content">
        <div className="news-meta">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-title">
              {item.title}
            </a>
          ) : (
            <span className="news-title">{item.title}</span>
          )}
          <time dateTime={item.date} className="news-date">{item.date}</time>
        </div>
        <p className="news-desc">{item.description}</p>
      </div>
    </li>
  );
}

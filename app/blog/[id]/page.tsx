import { getAllNews, getNewsById } from "@/lib/data/news";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const news = getAllNews();
  return news.map((item) => ({ id: item.id }));
}

function formatDateFull(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getNewsById(id);

  if (!item) notFound();

  return (
    <main style={{ paddingLeft: 90, paddingRight: 90, paddingTop: 46, maxWidth: 1200 }}>

      {/* Back link */}
      <Link
        href="/blog"
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 16,
          color: "var(--foreground)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 48,
        }}
      >
        ← Back to News
      </Link>

      {/* Date */}
      <div
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "18px",
          color: "var(--foreground)",
          marginBottom: 16,
          letterSpacing: "0.05em",
        }}
      >
        {formatDateFull(item.date).toUpperCase()}
      </div>

      {/* Title */}
      <h2 style={{ marginBottom: 40, maxWidth: 900 }}>{item.title}</h2>

      {/* Image — only rendered if provided in the JSON */}
      {item.image && (
        <div style={{ marginBottom: 48 }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              maxWidth: 900,
              maxHeight: 500,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          height: 0,
          outline: "1px solid var(--foreground)",
          outlineOffset: -0.5,
          marginBottom: 40,
        }}
      />

      {/* Description */}
      <div
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 400,
          fontSize: 19,
          lineHeight: "32px",
          color: "var(--foreground)",
          maxWidth: 720,
          marginBottom: 48,
          whiteSpace: "pre-wrap",
        }}
      >
        {item.description}
      </div>

      {/* External link — only rendered if provided in the JSON */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "var(--background)",
            background: "var(--foreground)",
            padding: "12px 28px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Read more →
        </a>
      )}

    </main>
  );
}

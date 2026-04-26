import Link from "next/link";
import { getLatestNews } from "@/lib/data/news";
import type { NewsItem } from "@/lib/schemas/newsSchema";
import HeroCarousel from "@/components/home/HeroCarousel";

const DESCRIPTION_WORD_LIMIT = 60;

function truncateWords(text: string, limit: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "…";
}

// Format ISO date string → { month: "JANUARY", year: "2025" }
function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "long" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}


// Chevron-right arrow — exact path from Figma, color via CSS variable
function ChevronRight({ color }: { color: string }) {
  return (
    <svg width="25" height="46" viewBox="0 0 25 46" fill="none">
      <path
        d="M1.09339e-05 3.7343L3.66938 5.74025e-06L23.6555 20.3519C23.9777 20.678 24.2334 21.0658 24.4078 21.493C24.5823 21.9201 24.6721 22.3782 24.6721 22.8409C24.6721 23.3035 24.5823 23.7616 24.4078 24.1888C24.2334 24.6159 23.9777 25.0037 23.6555 25.3298L3.66937 45.6923L0.00346247 41.958L18.7619 22.8462L1.09339e-05 3.7343Z"
        fill={color}
      />
    </svg>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  const { month, year } = formatDate(item.date);
  return (
    <div>
      {/* Row: date | title+description | image */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "108px 1fr 274px",
          gap: 32,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        {/* Date */}
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "var(--foreground)",
            paddingTop: 8,
          }}
        >
          {month}
          <br />
          {year}
        </div>

        {/* Title + description — links to /blog/[id] */}
        <Link
          href={`/blog/${item.id}`}
          style={{ textDecoration: "none", color: "var(--foreground)", display: "block" }}
        >
          <div
            style={{
              fontFamily: "'FreightText Pro', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 50,
              lineHeight: "49px",
              color: "var(--foreground)",
              marginBottom: 16,
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 400,
              fontSize: 19,
              lineHeight: "28px",
              color: "var(--foreground)",
            }}
          >
            {truncateWords(item.description, DESCRIPTION_WORD_LIMIT)}
          </div>
        </Link>

        {/* Image placeholder */}
        <div
          style={{
            width: 274,
            height: 172,
            background: "#D9D9D9",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 0,
          outline: "1px solid var(--foreground)",
          outlineOffset: -0.5,
        }}
      />
    </div>
  );
}

export default async function HomePage() {
  const newsItems = getLatestNews(3);

  return (
    <main style={{ paddingLeft: 125, paddingRight: 125, paddingTop: 46 }}>

      {/* Hero title */}
      <h1
        style={{
          fontSize: 100,
          lineHeight: "90px",
          maxWidth: 989,
          marginBottom: 0,
        }}
      >
        Language Understanding and<br />Representation Lab
      </h1>

      <HeroCarousel />

      {/* Description paragraph */}
      <p
        style={{
          maxWidth: 1243,
          textAlign: "center",
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 400,
          fontSize: 19,
          lineHeight: "28px",
          color: "var(--foreground)",
          marginTop: 40,
          marginBottom: 80,
        }}
      >
        The Language Understanding and Representation (LUNAR) Lab investigates
        how language is understood, represented, and generated — by humans and
        machines alike. We study computational models of language and cognition,
        bridging natural language processing, cognitive science, and
        interpretability research.
      </p>

      {/* Recent News */}
      <section style={{ maxWidth: 1271, marginBottom: 80 }}>

        {/* Section header: "Recent News" + chevron */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 0 }}>
          <h2 style={{ margin: 0 }}>Recent News</h2>
          <div style={{ paddingBottom: 14, color: "var(--foreground)" }}>
            <ChevronRight color="var(--foreground)" />
          </div>
        </div>

        {/* Top divider */}
        <div
          style={{
            width: "100%",
            height: 0,
            outline: "1px solid var(--foreground)",
            outlineOffset: -0.5,
            marginTop: 8,
          }}
        />

        {/* News rows */}
        {newsItems.map((item) => (
          <NewsRow key={item.id} item={item} />
        ))}
      </section>

    </main>
  );
}

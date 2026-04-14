"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsItem } from "@/lib/schemas/newsSchema";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "long" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}

function SearchIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <circle cx="9.5" cy="9.5" r="8.5" stroke="#323C50" strokeWidth="2" />
      <line x1="15.7071" y1="16" x2="22" y2="22.2929" stroke="#323C50" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  const { month, year } = formatDate(item.date);
  return (
    <Link href={`/blog/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          width: "100%",
          border: "1px solid var(--foreground)",
          display: "grid",
          gridTemplateColumns: "477px 1fr auto",
          alignItems: "start",
          minHeight: 366,
          marginTop: 32,
          cursor: "pointer",
        }}
      >
        {/* Image or placeholder */}
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 477, height: 366, objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: 477, height: 366, background: "#D9D9D9", flexShrink: 0 }} />
        )}

        {/* Title only */}
        <div style={{ padding: "34px 32px" }}>
          <div
            style={{
              fontFamily: "'FreightText Pro', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 50,
              lineHeight: "49px",
              color: "var(--foreground)",
            }}
          >
            {item.title}
          </div>
        </div>

        {/* Date */}
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "var(--foreground)",
            padding: "34px 32px",
            whiteSpace: "nowrap",
          }}
        >
          {month}
          <br />
          {year}
        </div>
      </div>
    </Link>
  );
}

function GridCard({ item }: { item: NewsItem }) {
  const { month, year } = formatDate(item.date);
  return (
    <Link href={`/blog/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          border: "1px solid var(--foreground)",
          padding: "32px",
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        {/* Image or placeholder */}
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100%", height: 160, objectFit: "cover", display: "block", marginBottom: 24 }}
          />
        ) : (
          <div style={{ width: "100%", height: 160, background: "#D9D9D9", marginBottom: 24 }} />
        )}

        {/* Title */}
        <div
          style={{
            fontFamily: "'FreightText Pro', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 50,
            lineHeight: "41px",
            color: "var(--foreground)",
            marginBottom: 24,
          }}
        >
          {item.title}
        </div>

        {/* Date */}
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "var(--foreground)",
          }}
        >
          {month} {year}
        </div>
      </div>
    </Link>
  );
}

export default function BlogList({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const featured = filtered[0] ?? null;
  const gridItems = filtered.slice(1);

  return (
    <>
      {/* Search bar */}
      <div style={{ position: "relative", width: 409, height: 47, marginBottom: 40 }}>
        <div
          style={{
            width: 409,
            height: 47,
            background: "#F9E4C8",
            borderRadius: 16,
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              position: "absolute",
              left: 15,
              top: 11,
              width: 340,
              height: 24,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 16,
              color: "#323C50",
            }}
          />
          <div style={{ position: "absolute", left: 372, top: 12 }}>
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Featured article */}
      {featured && <FeaturedCard item={featured} />}

      {/* 2-column grid */}
      {gridItems.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 38,
            marginTop: 38,
          }}
        >
          {gridItems.map((item) => (
            <GridCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 19,
            color: "var(--foreground)",
            marginTop: 40,
          }}
        >
          No news items match your search.
        </div>
      )}
    </>
  );
}

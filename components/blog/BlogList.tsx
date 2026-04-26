"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import type { NewsItem } from "@/lib/schemas/newsSchema";

interface BlogListProps {
  posts: NewsItem[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "long" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}

// Hardcoded #323C50 — always sits on #F9E4C8 search bar background
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="#323C50"/>
    </svg>
  );
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPosts = useMemo(() => {
    if (searchQuery === "") return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(q));
  }, [posts, searchQuery]);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return posts
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [posts, searchQuery]);

  return (
    <div style={{ color: "var(--foreground)" }}>
      {/* Search bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 27 }}>
        <div ref={searchRef} style={{ position: "relative", zIndex: 20 }}>
          <div
            style={{
              width: 409,
              height: 47,
              background: "#F9E4C8",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Type to search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              style={{
                position: "absolute",
                left: 15.5,
                top: 11.5,
                width: 340,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: "24px",
                color: "#323C50",
              }}
            />
            <div style={{ position: "absolute", left: 372, top: 12 }}>
              <SearchIcon />
            </div>
          </div>

          {isSearchFocused && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: 51,
                left: 0,
                width: 409,
                background: "var(--background)",
                borderRadius: 16,
                outline: "1px solid #F9E4C8",
                overflow: "hidden",
                zIndex: 30,
              }}
            >
              {suggestions.map((post) => (
                <button
                  key={post.id}
                  onClick={() => {
                    setSearchQuery(post.title);
                    setIsSearchFocused(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 20px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 19,
                    lineHeight: "24px",
                    color: "var(--foreground)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F9E4C8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {post.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 0, outline: "1px solid var(--foreground)", outlineOffset: -0.5 }} />

      {/* Posts list */}
      {filteredPosts.length === 0 ? (
        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 19,
            color: "var(--foreground)",
            padding: "40px 0",
            fontStyle: "italic",
          }}
        >
          No posts found.
        </p>
      ) : (
        filteredPosts.map((post) => {
          const { month, year } = formatDate(post.date);
          return (
            <article
              key={post.id}
              style={{
                display: "grid",
                gridTemplateColumns: "145px 1fr",
                minHeight: 124,
                position: "relative",
                borderBottom: "1px solid var(--foreground)",
              }}
            >
              {/* Date */}
              <div style={{ paddingTop: 9, paddingLeft: 9, paddingRight: 12 }}>
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "18px",
                    color: "var(--foreground)",
                  }}
                >
                  {month}
                  <br />
                  {year}
                </div>
              </div>

              {/* Title */}
              <div style={{ paddingTop: 0, color: "var(--foreground)" }}>
                <Link
                  href={`/blog/${post.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "flex-start",
                    textDecoration: "none",
                    color: "var(--foreground)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'FreightText Pro', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: 25,
                      lineHeight: "28px",
                      maxWidth: 352,
                    }}
                  >
                    {post.title}
                  </span>
                </Link>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}

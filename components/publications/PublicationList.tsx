"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Paper } from "@/lib/schemas/paperSchema";
import type { Tag } from "@/lib/schemas/tagSchema";

interface PublicationListProps {
  papers: Paper[];
  tags: Tag[];
}

// Uses currentColor so it inherits var(--foreground) from parent
function ArrowExternalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9907 4.75C11.1896 4.75 11.3804 4.67098 11.5211 4.53033C11.6617 4.38968 11.7407 4.19891 11.7407 4C11.7407 3.80109 11.6617 3.61032 11.5211 3.46967C11.3804 3.32902 11.1896 3.25 10.9907 3.25V4.75ZM16.7407 9C16.7407 8.80109 16.6617 8.61032 16.5211 8.46967C16.3804 8.32902 16.1896 8.25 15.9907 8.25C15.7918 8.25 15.601 8.32902 15.4604 8.46967C15.3197 8.61032 15.2407 8.80109 15.2407 9H16.7407ZM15.4907 15.25H4.49072V16.75H15.4907V15.25ZM4.74072 15.5V4.5H3.24072V15.5H4.74072ZM4.49072 4.75H10.9907V3.25H4.49072V4.75ZM15.2407 9V15.5H16.7407V9H15.2407ZM4.74072 4.5C4.74072 4.5663 4.71438 4.62989 4.6675 4.67678C4.62062 4.72366 4.55703 4.75 4.49072 4.75V3.25C4.1592 3.25 3.84126 3.3817 3.60684 3.61612C3.37242 3.85054 3.24072 4.16848 3.24072 4.5H4.74072ZM4.49072 15.25C4.55703 15.25 4.62062 15.2763 4.6675 15.3232C4.71438 15.3701 4.74072 15.4337 4.74072 15.5H3.24072C3.24072 15.8315 3.37242 16.1495 3.60684 16.3839C3.84126 16.6183 4.1592 16.75 4.49072 16.75V15.25ZM15.4907 16.75C15.8222 16.75 16.1402 16.6183 16.3746 16.3839C16.609 16.1495 16.7407 15.8315 16.7407 15.5H15.2407C15.2407 15.4337 15.2671 15.3701 15.3139 15.3232C15.3608 15.2763 15.4244 15.25 15.4907 15.25V16.75ZM15.8925 5.159C16.0331 5.01834 16.1122 4.82755 16.1122 4.62862C16.1122 4.4297 16.0331 4.23891 15.8925 4.09825C15.7518 3.95759 15.561 3.87856 15.3621 3.87856C15.1632 3.87856 14.9724 3.95759 14.8317 4.09825L15.8925 5.159ZM8.46747 10.4622C8.39782 10.5319 8.34258 10.6146 8.30489 10.7056C8.2672 10.7967 8.24781 10.8942 8.24782 10.9927C8.24784 11.1917 8.3269 11.3825 8.4676 11.5231C8.60829 11.6638 8.79911 11.7428 8.99806 11.7428C9.19701 11.7428 9.38781 11.6637 9.52847 11.523L8.46747 10.4622ZM14.8317 4.09825L8.46747 10.4622L9.52822 11.5232L15.8925 5.159L14.8317 4.09825Z" fill="currentColor"/>
      <path d="M16.2902 5.55689L14.4342 3.70064C14.161 3.42739 14.3167 2.95964 14.6992 2.90514L16.4937 2.64889C16.609 2.63243 16.7265 2.64303 16.8369 2.67985C16.9474 2.71667 17.0477 2.7787 17.1301 2.86103C17.2124 2.94335 17.2744 3.04372 17.3112 3.15417C17.3481 3.26462 17.3587 3.38213 17.3422 3.49739L17.0857 5.29164C17.0312 5.67414 16.5632 5.82989 16.2902 5.55664" fill="currentColor"/>
      <path d="M16.2902 5.55689L14.4342 3.70064C14.161 3.42739 14.3167 2.95964 14.6992 2.90514L16.4937 2.64889C16.609 2.63243 16.7265 2.64303 16.8369 2.67985C16.9474 2.71667 17.0477 2.7787 17.1301 2.86103C17.2124 2.94335 17.2744 3.04372 17.3112 3.15417C17.3481 3.26462 17.3587 3.38213 17.3422 3.49739L17.0857 5.29164C17.0312 5.67414 16.5632 5.82989 16.2902 5.55664" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Hardcoded #323C50 — always sits on #F9E4C8 search bar background
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="#323C50"/>
    </svg>
  );
}

export default function PublicationList({ papers, tags }: PublicationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch =
        searchQuery === "" ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === null || paper.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [papers, searchQuery, selectedTag]);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return papers
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [papers, searchQuery]);

  return (
    <div style={{ color: "var(--foreground)" }}>
      {/* Search + tags row */}
      <div style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 27 }}>

        {/* Search bar — fixed #F9E4C8 accent, always dark text inside */}
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

          {/* Dropdown suggestions */}
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
              {suggestions.map((paper) => (
                <button
                  key={paper.id}
                  onClick={() => {
                    setSearchQuery(paper.title);
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
                  {paper.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tag pills */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
          {tags.map((tag) => {
            const active = selectedTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(active ? null : tag.id)}
                style={{
                  height: 47,
                  paddingLeft: 18,
                  paddingRight: 18,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 16,
                  outline: "1px solid var(--foreground)",
                  outlineOffset: -1,
                  background: active ? "var(--foreground)" : "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: 19,
                    lineHeight: "24px",
                    color: active ? "var(--background)" : "var(--foreground)",
                  }}
                >
                  {tag.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 0, outline: "1px solid var(--foreground)", outlineOffset: -0.5 }} />

      {/* Papers list */}
      {filteredPapers.length === 0 ? (
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 19,
          color: "var(--foreground)",
          padding: "40px 0",
          fontStyle: "italic",
        }}>
          No publications found.
        </p>
      ) : (
        filteredPapers.map((paper) => (
          <article
            key={paper.id}
            style={{
              display: "grid",
              gridTemplateColumns: "145px 1fr 487px",
              minHeight: 124,
              position: "relative",
              borderBottom: "1px solid var(--foreground)",
            }}
          >
            {/* Venue & year */}
            <div style={{ paddingTop: 9, paddingLeft: 9, paddingRight: 12 }}>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "18px",
                  color: "var(--foreground)",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {paper.venue.toUpperCase()}
                <br />
                {paper.year}
              </div>
            </div>

            {/* Title + arrow */}
            <div style={{ paddingTop: 0, color: "var(--foreground)" }}>
              <a
                href={paper.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "flex-start",
                  gap: 8,
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
                  {paper.title}
                </span>
                <span style={{ marginTop: 4, flexShrink: 0 }}>
                  <ArrowExternalIcon />
                </span>
              </a>

              {(paper.codeUrl || paper.dataUrl) && (
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  {paper.codeUrl && (
                    <a href={paper.codeUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: "var(--foreground)", textDecoration: "none" }}>
                      Code
                    </a>
                  )}
                  {paper.dataUrl && (
                    <a href={paper.dataUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 14, color: "var(--foreground)", textDecoration: "none" }}>
                      Data
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Authors */}
            <div style={{ paddingTop: 33 }}>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 19,
                  lineHeight: "28px",
                  color: "var(--foreground)",
                }}
              >
                {paper.authors.join(", ")}
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

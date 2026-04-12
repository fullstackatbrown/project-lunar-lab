"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Paper } from "@/lib/schemas/paperSchema";
import type { Tag } from "@/lib/schemas/tagSchema";

interface PublicationListProps {
  papers: Paper[];
  tags: Tag[];
}

export default function PublicationList({ papers, tags }: PublicationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
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
        paper.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesTag =
        selectedTag === null || paper.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [papers, searchQuery, selectedTag]);

  // Suggestions for the search dropdown
  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return papers
      .filter((paper) => 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [papers, searchQuery]);

  const handleTagClick = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? null : tagId);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Search Bar Wrapper with fixed height to prevent layout shift */}
        <div className="relative z-20 w-full max-w-md h-[54px]" ref={searchRef}>
          <div 
            className={`rounded-xl bg-[#F5EAD7] p-1 transition-all duration-200 ${
              isSearchFocused && (suggestions.length > 0 || searchQuery.length > 0)
                ? "absolute inset-x-0 top-0 shadow-lg ring-1 ring-black/5" 
                : ""
            }`}
          >
            <div className="flex items-center px-4 py-2">
              <input
                type="text"
                placeholder="Type to search here..."
                className="w-full bg-transparent text-lg outline-none placeholder:text-black/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <svg
                className="h-5 w-5 text-black/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Dropdown suggestions */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="mt-1 border-t border-black/10 py-4">
                {suggestions.map((paper) => (
                  <button
                    key={paper.id}
                    className="w-full px-5 py-3 text-left hover:bg-black/5"
                    onClick={() => {
                      setSearchQuery(paper.title);
                      setIsSearchFocused(false);
                    }}
                  >
                    <span className="font-serif text-lg text-black/80 leading-snug">
                      {paper.title.length > 70
                        ? paper.title.substring(0, 70) + "..."
                        : paper.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={`rounded-lg border px-5 py-2 text-sm transition-colors font-serif ${
                selectedTag === tag.id
                  ? "border-[#2D3748] bg-[#2D3748] text-white"
                  : "border-[#CBD5E0] bg-white text-black/60 hover:bg-gray-50"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-0 border-t border-black/10">
        {filteredPapers.length === 0 ? (
          <p className="py-12 italic text-black/50">No publications found.</p>
        ) : (
          filteredPapers.map((paper) => (
            <article
              key={paper.id}
              className="grid gap-8 border-b border-black/10 py-10 md:grid-cols-[140px_1fr_300px]"
            >
              {/* Venue & Year */}
              <div className="text-sm uppercase tracking-wider text-black/60">
                <div className="font-semibold text-black/80">{paper.venue}</div>
                <div>{paper.year}</div>
              </div>

              {/* Title */}
              <div>
                <h2 className="group italic text-2xl font-medium leading-tight">
                  <a
                    href={paper.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-2 hover:underline"
                  >
                    <span>{paper.title}</span>
                    <svg
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </h2>
                
                {/* Secondary links (Code/Data) if any */}
                {(paper.codeUrl || paper.dataUrl) && (
                  <div className="mt-4 flex gap-4 text-sm">
                    {paper.codeUrl && (
                      <a
                        href={paper.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Code
                      </a>
                    )}
                    {paper.dataUrl && (
                      <a
                        href={paper.dataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Data
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Authors */}
              <div className="text-right text-sm text-black/80 md:pl-8">
                {paper.authors.join(", ")}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

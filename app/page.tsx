import { getLatestNews } from "@/lib/data/news";
import type { NewsItem } from "@/lib/schemas/newsSchema";

// Format ISO date string → { month: "JANUARY", year: "2025" }
function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "long" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}

// Lunar phase dots — exact SVG paths from Figma, always use brand colors
function LunarDots() {
  return (
    <div style={{ position: "relative", width: 155.63, height: 15 }}>
      {/* moon1 left */}
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" fill="#323C50" />
          <path d="M5.19043 0.363281C3.26147 1.72041 2 3.96226 2 6.5C2 10.6421 5.35786 14 9.5 14C10.3057 14 11.0811 13.8709 11.8086 13.6357C10.5891 14.4937 9.10431 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 4.16383 2.17855 1.33727 5.19043 0.363281Z" fill="#F9E4C8" />
        </svg>
      </div>
      {/* moon2 */}
      <div style={{ position: "absolute", left: 31, top: 0 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" fill="#323C50" />
          <path d="M7.5 0C7.78731 0 8.07071 0.0173766 8.34961 0.0488281C6.90302 1.41608 6 3.35242 6 5.5C6 9.35446 8.90788 12.5277 12.6494 12.9502C11.3059 14.22 9.49454 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0Z" fill="#F9E4C8" />
        </svg>
      </div>
      {/* full circle */}
      <div style={{ position: "absolute", left: 62, top: 0 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" fill="#F9E4C8" />
        </svg>
      </div>
      {/* moon2 mirrored */}
      <div style={{ position: "absolute", left: 93, top: 0 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" transform="matrix(-1 0 0 1 15 0)" fill="#323C50" />
          <path d="M7.5 0C7.21269 0 6.92929 0.0173766 6.65039 0.0488281C8.09698 1.41608 9 3.35242 9 5.5C9 9.35446 6.09212 12.5277 2.35059 12.9502C3.6941 14.22 5.50546 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0Z" fill="#F9E4C8" />
        </svg>
      </div>
      {/* moon1 mirrored */}
      <div style={{ position: "absolute", left: 124, top: 0 }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" transform="matrix(-1 0 0 1 15 0)" fill="#323C50" />
          <path d="M9.80957 0.363281C11.7385 1.72041 13 3.96226 13 6.5C13 10.6421 9.64214 14 5.5 14C4.69426 14 3.91885 13.8709 3.19141 13.6357C4.41088 14.4937 5.89569 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 4.16383 12.8215 1.33727 9.80957 0.363281Z" fill="#F9E4C8" />
        </svg>
      </div>
    </div>
  );
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

        {/* Title + description */}
        <div>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "var(--foreground)" }}
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
            </a>
          ) : (
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
          )}
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 400,
              fontSize: 19,
              lineHeight: "28px",
              color: "var(--foreground)",
            }}
          >
            {item.description}
          </div>
        </div>

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

      {/* Hero image carousel placeholder */}
      <div
        style={{
          width: "100%",
          maxWidth: 1243,
          height: 492,
          background: "#D9D9D9",
          marginTop: 48,
          position: "relative",
        }}
      >
        {/* Lunar phase dots — centered at bottom of image */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <LunarDots />
        </div>
      </div>

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

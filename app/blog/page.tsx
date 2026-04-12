export default function BlogPage() {
  return (
    <main style={{ width: "min(86vw, 1120px)", margin: "0 auto", padding: "4.2rem 0 6rem" }}>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--font-display), "Times New Roman", serif',
          fontSize: "clamp(2.4rem, 5.4vw, 4rem)",
          fontStyle: "italic",
          fontWeight: 500,
          lineHeight: 0.98,
          letterSpacing: "-0.01em",
        }}
      >
        Blog
      </h1>
      <p
        style={{
          margin: "0.6rem 0 0",
          fontFamily: 'var(--font-display), "Times New Roman", serif',
          fontSize: "clamp(1.4rem, 2.8vw, 2.15rem)",
          fontStyle: "italic",
          lineHeight: 1.08,
          color: "var(--muted-foreground)",
        }}
      >
        Blog posts will appear here.
      </p>
    </main>
  );
}

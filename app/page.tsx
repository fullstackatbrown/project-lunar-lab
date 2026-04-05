export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px"}}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1.2 }}>
          LUNAR Lab
        </h1>
        <p style={{ marginTop: 12, fontSize: 18, lineHeight: 1.6 }}>
          Placeholder landing page for the LUNAR Lab website rebuild. Design will
          be added later — the focus right now is content structure and a
          GitHub-based CMS workflow.
        </p>
      </header>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ marginBottom: 10, fontSize: 22 }}>What this site will support</h2>
        <ul style={{ marginTop: 0, lineHeight: 1.8 }}>
          <li>Landing / Join the Lab / Members / Publications pages</li>
          <li>A GitHub-based content workflow (no database)</li>
          <li>Tagging + filtering across content</li>
          <li>News-style updates (optional)</li>
          <li>Links to external media (YouTube, X, etc.)</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ marginBottom: 10, fontSize: 22 }}>External links</h2>
        <p style={{ marginTop: 0, lineHeight: 1.8 }}>
          YouTube: <a href="#" target="_blank" rel="noreferrer">TBD</a>
          <br />
          X (Twitter): <a href="#" target="_blank" rel="noreferrer">TBD</a>
        </p>
        <p style={{ marginTop: 8, fontSize: 14, opacity: 0.75 }}>
          (Links will be updated once the lab confirms official URLs.)
        </p>
      </section>

      <section>
        <h2 style={{ marginBottom: 10, fontSize: 22 }}>Next steps</h2>
        <ol style={{ marginTop: 0, lineHeight: 1.8 }}>
          <li>Define content schemas and sample content files</li>
          <li>Render content on pages (papers/talks/news)</li>
          <li>Add CI validation so bad content cannot break builds</li>
          <li>Design pass in Figma → apply styles to components</li>
        </ol>
      </section>
    </main>
  );
}

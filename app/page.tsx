const articleSections = [
  {
    title: "Understanding Neural Networks Under the Hood",
    description:
      "description description description description description description",
  },
  {
    title: "Connecting Language to the Non-Linguistic World",
    description:
      "description description description description description description",
  },
  {
    title: "Grounded Semantics and Human-Centered AI",
    description:
      "description description description description description description",
  },
];

export default function HomePage() {
  return (
    <main className="lunar-home">
      <section className="hero-wrap">
        <h1 className="hero-title">Language Understanding and Representation Lab</h1>
        <p className="hero-subtitle">
          description description description dddfsf description descriionxa
        </p>
        <div className="hero-image-placeholder" aria-hidden="true" />
      </section>

      <section className="featured-wrap" aria-label="Featured article">
        <div className="feature-dots" aria-hidden="true">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>

        <article className="feature-card">
          <h2>Understanding Neural Networks Under the Hood</h2>
          <p>description description description description description description</p>
          <div className="article-image-placeholder" aria-hidden="true" />
        </article>
      </section>

      <section className="timeline-wrap" aria-label="Recent articles">
        {articleSections.map((article) => (
          <article className="timeline-item" key={article.title}>
            <div className="timeline-rail" aria-hidden="true">
              <span className="timeline-dot-primary" />
              <span className="timeline-dot-accent" />
              <span className="timeline-line" />
            </div>
            <div className="timeline-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className="article-image-placeholder" aria-hidden="true" />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <main className="page">

      {/* Hero */}
      <section className="hero">
        <h1 className="text-h2 hero-title">
          Language Understanding and Representation Lab
        </h1>

        <div className="hero-carousel">
          <div className="carousel-placeholder" />

          <div className="carousel-dots">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <p className="hero-description text-body-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </section>

      {/* News */}
      <section className="news-section">
        <div className="news-header">
          <h2 className="text-h4">Recent News</h2>
          <span className="arrow">{'>'}</span>
        </div>

        <div className="news-list">
          {[1, 2, 3].map((item) => (
            <div key={item} className="news-item">
              <div className="news-thumbnail" />

              <div className="news-content">
                <div className="news-title text-h4">
                  How Can Deep Neural Networks Inform Theory in Psychological Science?
                </div>

                <div className="news-meta">
                  <span className="news-desc text-body-sm">
                    Lorem ipsum dolor sit amet...
                  </span>

                  <span className="news-date text-label">
                    JANUARY 2025
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
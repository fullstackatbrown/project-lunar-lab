export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© {new Date().getFullYear()} LUNAR Lab</p>
        <div>
          <a href="#" target="_blank" rel="noreferrer">
            YouTube
          </a>{" "}
          |{" "}
          <a href="#" target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </div>
    </footer>
  );
}

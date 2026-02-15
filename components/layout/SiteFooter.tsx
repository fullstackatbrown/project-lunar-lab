export default function SiteFooter() {
    return (
      <footer style={{ padding: 24, borderTop: "1px solid #eee" }}>
        <p>© {new Date().getFullYear()} LUNAR Lab</p>
        <div style={{ marginTop: 8 }}>
          <a href="#" target="_blank">YouTube</a> |{" "}
          <a href="#" target="_blank">X</a>
        </div>
      </footer>
    );
  }
  
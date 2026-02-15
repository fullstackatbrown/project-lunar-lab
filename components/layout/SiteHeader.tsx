import NavLinks from "./NavLinks";

export default function SiteHeader() {
  return (
    <header style={{ padding: 24, borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>LUNAR Lab</strong>
        <NavLinks />
      </div>
    </header>
  );
}

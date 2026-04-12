import Link from "next/link";
import NavLinks from "./NavLinks";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Lunar Lab home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core">LUNAR</span>
          </span>
          <span className="brand-label">Lunar Lab</span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}

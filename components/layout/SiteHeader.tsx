/*import NavLinks from "./NavLinks";

export default function SiteHeader() {
  return (
    <header style={{ padding: 24, borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>LUNAR Lab</strong>
        <NavLinks />
      </div>
    </header>
  );
}*/

import Link from "next/link";
import NavLinks from "./NavLinks";
import Logo from "@/components/theme/logo";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function SiteHeader() {
    return (
        <header
            style={{
                color: "#323C50",
                padding: "50px 60px",
                borderBottom: "1px solid #ddd",
                backgroundColor: "#ffffff",
                height: 150,
                maxWidth: 1728,
            }}
        >
            <div
                style={{
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                }}
            >
                {/* LEFT: Logo + Title → links to landing page */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: "inherit" }}>
                    <Logo size={82} />
                    <h4
                        style={{
                            fontFamily: "FreightText Pro",
                            fontStyle: "italic",
                            transform: "skewX(5deg)",
                            fontSize: 40,
                            fontWeight: 400,
                        }}
                    >
                        Lunar Lab
                    </h4>
                </Link>

                {/* RIGHT: Links + Moon */}
                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    <NavLinks />

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
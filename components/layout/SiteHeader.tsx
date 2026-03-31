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

import NavLinks from "./NavLinks";
import Logo from "@/components/logo";

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
                {/* LEFT: Logo + Title */}
                <div style={{ display: "flex", alignItems: "center", gap: 16,}}>
                    <Logo size = {82}/>

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
                </div>

                {/* RIGHT: Links + Moon */}
                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    <NavLinks />

                    {/* Moon button (visual only) */}
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <svg width="26" height="26" fill="none" stroke="black">
                            <path
                                strokeWidth="2"
                                d="M21 12.79A9 9 0 1111.21 3
                   7 7 0 0021 12.79z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
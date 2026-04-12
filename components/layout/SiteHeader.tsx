"use client";

import NavLinks from "./NavLinks";
import Logo from "@/components/logo";
import Link from "next/link";
import { useTheme } from "@/context/themeContext";

export default function SiteHeader() {
    const { theme, toggleTheme } = useTheme();
    return (
        <header
            className={"header"}
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
                    <Link href={"/"}>
                        <Logo size = {82} /> </Link>
                        <h3 style={{fontSize: "45"}} >
                            <Link href={"/"}>Lunar Lab </Link>
                        </h3>

                </div>

                {/* RIGHT: Links + Moon */}
                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    <NavLinks />

                    {/* Moon button */}
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick = {toggleTheme}
                    >
                        {theme === "dark" ? (
                            <svg width="26" height="26" fill="#F9E4C8" stroke="#F9E4C8" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                        ) : (
                            <svg width="26" height="26" fill="none" stroke="#323C50" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
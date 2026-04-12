"use client";

import Link from "next/link";
import { useTheme } from "../theme/ThemeProvider";

const links = [
  { href: "/member", label: "People" },
  { href: "/publications", label: "Research" },
  { href: "/blog", label: "Blog" },
];

export default function NavLinks() {
  const { toggleTheme, theme } = useTheme();

  return (
    <nav className="nav-links">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="nav-link-item">
          {link.label}
        </Link>
      ))}
      <button
        type="button"
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {theme === "dark" ? "☀" : "◐"}
      </button>
    </nav>
  );
}

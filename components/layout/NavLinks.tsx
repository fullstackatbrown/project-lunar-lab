/*import Link from "next/link";
"use client";

import Link from "next/link";
import { useTheme } from "../theme/ThemeProvider";

const links = [
  { href: "/publications", label: "Research" },
  { href: "/member", label: "Members" },
  { href: "/blog", label: "News" },
  { href: "/join", label: "Join the Lab" },
];

export default function NavLinks() {
  const { toggleTheme } = useTheme();

  return (
    <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
      <button onClick={toggleTheme}>
        🌙
      </button>
    </nav>
  );
}*/

import Link from "next/link";

const links = [
  { href: "/member", label: "People" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/join", label: "Join the Lab"}
];

export default function NavLinks() {
  return (
      <p className="menu" >
        {links.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                style={{ textDecoration: "none", color: "inherit", }}
            >
              {link.label}
            </Link>
        ))}
      </p>
  );
}

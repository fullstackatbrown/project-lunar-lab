"use client";

import Link from "next/link";

const links = [
  { href: "/publications", label: "Research" },
  { href: "/member", label: "Members" },
  { href: "/blog", label: "News" },
  { href: "/about", label: "Join the Lab" },
];

export default function NavLinks() {
  return (
    <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

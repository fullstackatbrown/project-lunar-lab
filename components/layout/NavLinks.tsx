import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
];

export default function NavLinks() {
  return (
    <nav style={{ display: "flex", gap: 16 }}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

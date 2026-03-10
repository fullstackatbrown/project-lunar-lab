import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Join the Lab" },
  { href: "/member", label: "Members" },
  { href: "/publications", label: "Research" },
  { href: "/blog", label: "News" },
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

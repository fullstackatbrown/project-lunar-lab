import Link from "next/link";

const links = [
  { href: "/people", label: "People" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
];

export default function NavLinks() {
  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-[13px] font-sans tracking-tight hover:opacity-100 opacity-70 transition-opacity"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

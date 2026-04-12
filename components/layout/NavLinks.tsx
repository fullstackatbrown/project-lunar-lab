/*import Link from "next/link";

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

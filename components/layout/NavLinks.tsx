import Link from "next/link";

const links = [
  { href: "/member", label: "People" },
  { href: "/publications", label: "Research" },
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

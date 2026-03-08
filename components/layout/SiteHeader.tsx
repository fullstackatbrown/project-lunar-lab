import Link from "next/link";
import NavLinks from "./NavLinks";

export default function SiteHeader() {
  return (
    <header className="bg-[#fcfbf4] px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-sm font-sans tracking-tight opacity-80 group-hover:opacity-100 transition-opacity">
            Lunar Lab
          </span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}

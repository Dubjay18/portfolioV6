"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { title: "home", href: "/" },
  { title: "about", href: "/about" },
  { title: "projects", href: "/projects" },
  { title: "other work", href: "/other-work" },
  { title: "blog", href: "/blog" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="md:flex hidden items-center gap-1">
      {LINKS.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`font-mono text-[13px] px-[13px] py-2 rounded-[7px] transition-colors duration-200 ${
              active
                ? "text-accent bg-accent-soft"
                : "text-ink-muted hover:text-accent hover:bg-accent-soft"
            }`}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}

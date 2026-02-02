import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/rome", label: "Rome" },
  { href: "/weekend-trips", label: "Weekend Trips" },
  { href: "/food", label: "Food" }
];

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
        isActive
          ? "bg-slate-100 text-slate-900"
          : "text-slate-200 hover:bg-slate-800/80"
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            Semester Abroad
          </span>
        </Link>

        <nav className="flex gap-2 rounded-full bg-slate-900/80 px-2 py-1 ring-1 ring-slate-800">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { siteMeta, navItems } from "../../data/siteContent";

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`text-xs uppercase tracking-[0.2em] ${
        isActive ? "font-semibold" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg">
          {siteMeta.siteName}
        </Link>
        <nav className="flex gap-6">
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


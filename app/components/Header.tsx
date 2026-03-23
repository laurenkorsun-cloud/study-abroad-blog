"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { siteMeta, navItems } from "../../data/siteContent";
import { useIsMobile } from "../hooks/useIsMobile";

function NavLink({
  href,
  children,
  onClick
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-inter block text-xs font-medium uppercase tracking-[0.18em] ${
        isActive ? "font-semibold text-journal-accent" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navContent = (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          onClick={() => setMenuOpen(false)}
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-journal-paper/95 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-4 py-5 md:px-8 md:py-6">
        <Link
          href="/"
          className="font-title text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 md:text-base"
        >
          {siteMeta.siteName}
        </Link>

        {isMobile ? (
          <>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Menu</span>
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 top-[57px] z-40 bg-slate-900/20"
                  aria-hidden="true"
                  onClick={() => setMenuOpen(false)}
                />
                <nav
                  className="absolute right-0 top-full z-50 mt-0 flex w-56 flex-col gap-4 border-b border-l border-slate-200/90 bg-journal-paper px-6 py-5 shadow-lg"
                  role="navigation"
                >
                  {navContent}
                </nav>
              </>
            )}
          </>
        ) : (
          <nav className="flex gap-6" role="navigation">
            {navContent}
          </nav>
        )}
      </div>
    </header>
  );
}

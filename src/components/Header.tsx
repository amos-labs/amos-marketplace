"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bounties", label: "Bounties" },
  { href: "/agents", label: "Agents" },
  { href: "/economy", label: "Economy" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-lg font-semibold tracking-tight">
            AMOS <span className="text-[var(--muted)]">Marketplace</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm transition-colors rounded-md hover:bg-white/5 ${
                pathname === link.href
                  ? "text-[var(--foreground)] font-medium"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://app.amoslabs.com"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors hidden sm:block"
          >
            Dashboard
          </a>
          <ConnectWalletButton />
          <button
            className="sm:hidden p-2 text-[var(--muted)] hover:text-[var(--foreground)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-[var(--card-border)] bg-[var(--background)]">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-[var(--foreground)] font-medium bg-white/5"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://app.amoslabs.com"
              className="px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Dashboard
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

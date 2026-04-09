import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AMOS Marketplace",
  description:
    "Browse bounties, discover AI agents, and participate in the AMOS token economy",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bounties", label: "Bounties" },
  { href: "/agents", label: "Agents" },
  { href: "/economy", label: "Economy" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
                  className="px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-md hover:bg-white/5"
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
              <button className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-light)] transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--card-border)] py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--muted)]">
              AMOS Marketplace &mdash; Autonomous Management Operating System
            </p>
            <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
              <a href="https://amoslabs.com" className="hover:text-[var(--foreground)] transition-colors">
                amoslabs.com
              </a>
              <a href="https://docs.amoslabs.com" className="hover:text-[var(--foreground)] transition-colors">
                Docs
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

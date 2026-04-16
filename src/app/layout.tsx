import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WalletProvider from "@/components/WalletProvider";
import Header from "@/components/Header";
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
        <WalletProvider>
          <Header />
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
        </WalletProvider>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  { value: "infrastructure", label: "Infrastructure", desc: "Core systems, DevOps, deployment tooling" },
  { value: "research", label: "Research", desc: "Token economics, market analysis, simulations" },
  { value: "growth", label: "Growth", desc: "Marketing, partnerships, community building" },
  { value: "content", label: "Content", desc: "Documentation, tutorials, educational material" },
];

const CAPABILITIES = [
  "rust_development",
  "solana_dev",
  "web_development",
  "security_analysis",
  "database_migration",
  "api_integration",
  "testing",
  "documentation",
  "data_analysis",
  "devops",
];

export default function PostBountyPage() {
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("infrastructure");
  const [deadlineDays, setDeadlineDays] = useState(14);
  const [rewardTokens, setRewardTokens] = useState(0);
  const [selectedCaps, setSelectedCaps] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleCap = (cap: string) => {
    setSelectedCaps((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setSubmitting(true);
    setError(null);

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + deadlineDays);

    try {
      const res = await fetch("/api/bounties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          reward_tokens: rewardTokens,
          deadline: deadline.toISOString(),
          required_capabilities: selectedCaps,
          poster_wallet: publicKey.toBase58(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Error ${res.status}`);
      }

      router.push("/bounties?status=open&sort=newest");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post bounty");
    } finally {
      setSubmitting(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post a Bounty</h1>
        <p className="text-[var(--muted)] mb-6">
          Connect your Solana wallet to post bounties on the AMOS marketplace.
          Your wallet address will be recorded as the bounty poster.
        </p>
        <button
          onClick={() => setVisible(true)}
          className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--accent-light)] transition-colors"
        >
          Connect Wallet to Continue
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      <Link
        href="/bounties"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        &larr; Back to bounties
      </Link>

      <h1 className="mt-4 text-2xl font-bold">Post a Bounty</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Describe the work you need done. AI agents will compete to complete it.
        {rewardTokens === 0 && " Leave reward at 0 to let the system auto-calculate points based on complexity."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            required
            maxLength={500}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Build token economics simulation framework"
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            required
            rows={6}
            maxLength={50000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the deliverables, acceptance criteria, and any technical requirements..."
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-y"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  category === cat.value
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
                }`}
              >
                <p className="text-sm font-medium">{cat.label}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Deadline (days from now)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={90}
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(Number(e.target.value))}
              className="flex-1 accent-[var(--accent)]"
            />
            <span className="text-sm font-mono w-16 text-right">
              {deadlineDays} day{deadlineDays !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Reward */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Reward (AMOS tokens)
          </label>
          <input
            type="number"
            min={0}
            max={16000}
            value={rewardTokens}
            onChange={(e) => setRewardTokens(Number(e.target.value))}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            Set to 0 for automatic point calculation based on complexity, importance, and deadline.
          </p>
        </div>

        {/* Required Capabilities */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Required Capabilities
          </label>
          <div className="flex flex-wrap gap-2">
            {CAPABILITIES.map((cap) => (
              <button
                key={cap}
                type="button"
                onClick={() => toggleCap(cap)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  selectedCaps.includes(cap)
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-light)]"
                    : "border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                }`}
              >
                {cap.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Poster info */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
          <p className="text-xs text-[var(--muted)]">Posting as</p>
          <p className="mt-1 text-sm font-mono text-[var(--accent-light)]">
            {publicKey.toBase58()}
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !title || !description}
          className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--accent-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Posting..." : "Post Bounty"}
        </button>
      </form>
    </div>
  );
}

import { listBounties, listAgents } from "@/lib/api";
import { formatPoints } from "@/lib/utils";
import { StatCard, BountyCard, AgentCard } from "@/components/cards";
import Link from "next/link";

export default async function HomePage() {
  let bounties, agents;
  try {
    [bounties, agents] = await Promise.all([
      listBounties({ status: "open", sort: "priority", per_page: 6 }),
      listAgents({ per_page: 6 }),
    ]);
  } catch {
    return <OfflineState />;
  }

  const openBounties = bounties.filter((b) => b.status === "open");
  const shownPoints = bounties.reduce((sum, b) => sum + b.reward_tokens, 0);
  const activeAgents = agents.filter((a) => a.status === "active");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AMOS <span className="text-[var(--accent)]">Marketplace</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          An alpha look at the AMOS agent economy: bounties, autonomous agents,
          and token-based settlement. Early-stage research on Solana &mdash; not
          a live financial product.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open bounties shown"
          value={String(openBounties.length)}
          sub="In this preview, up to 6 listings"
        />
        <StatCard
          label="Contribution points shown"
          value={formatPoints(shownPoints)}
          sub="Listed points, not guaranteed payouts"
        />
        <StatCard
          label="Active profiles shown"
          value={String(activeAgents.length)}
          sub="Reported status within this preview"
        />
        <StatCard
          label="Agent profiles shown"
          value={String(agents.length)}
          sub="Up to 6 profiles, not network totals"
        />
      </section>

      {/* Recent Bounties */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Recent Bounties</h2>
          <Link
            href="/bounties"
            className="text-sm text-[var(--accent-light)] hover:underline"
          >
            View all
          </Link>
        </div>
        {bounties.length === 0 ? (
          <p className="text-[var(--muted)]">
            No open bounties returned for this preview.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bounties.map((b) => (
              <BountyCard key={b.id} bounty={b} />
            ))}
          </div>
        )}
      </section>

      {/* Top Agents */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Recent Agent Profiles</h2>
          <Link
            href="/agents"
            className="text-sm text-[var(--accent-light)] hover:underline"
          >
            View all
          </Link>
        </div>
        {agents.length === 0 ? (
          <p className="text-[var(--muted)]">
            No agent profiles returned for this preview.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function OfflineState() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AMOS <span className="text-[var(--accent)]">Marketplace</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          An alpha look at the AMOS agent economy: bounties, autonomous agents,
          and token-based settlement. Early-stage research on Solana &mdash; not
          a live financial product.
        </p>
      </section>
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Marketplace Temporarily Unavailable</h2>
        <p className="text-[var(--muted)]">
          Unable to reach the relay service. Please try again in a moment.
        </p>
      </div>
    </div>
  );
}

import { listBounties, listAgents } from "@/lib/api";
import { formatTokens } from "@/lib/utils";
import { StatCard, BountyCard, AgentCard } from "@/components/cards";
import Link from "next/link";

export default async function HomePage() {
  let bounties, agents;
  try {
    [bounties, agents] = await Promise.all([
      listBounties({ per_page: 6 }),
      listAgents({ per_page: 6 }),
    ]);
  } catch {
    return <OfflineState />;
  }

  const openBounties = bounties.filter((b) => b.status === "open");
  const totalRewards = bounties.reduce((sum, b) => sum + b.reward_tokens, 0);
  const activeAgents = agents.filter((a) => a.status === "active");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AMOS <span className="text-[var(--accent)]">Marketplace</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          Post bounties, discover autonomous agents, and participate in the
          token economy. Powered by AMOS tokens on Solana.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open Bounties"
          value={String(openBounties.length)}
          sub="Available now"
        />
        <StatCard
          label="Total Rewards"
          value={formatTokens(totalRewards)}
          sub="Across all bounties"
        />
        <StatCard
          label="Active Agents"
          value={String(activeAgents.length)}
          sub="Ready to work"
        />
        <StatCard
          label="Registered Agents"
          value={String(agents.length)}
          sub="In the network"
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
            No bounties yet. Check back after mainnet launch.
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
          <h2 className="text-xl font-semibold">Top Agents</h2>
          <Link
            href="/agents"
            className="text-sm text-[var(--accent-light)] hover:underline"
          >
            View all
          </Link>
        </div>
        {agents.length === 0 ? (
          <p className="text-[var(--muted)]">
            No agents registered yet.
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
          Post bounties, discover autonomous agents, and participate in the
          token economy. Powered by AMOS tokens on Solana.
        </p>
      </section>
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Marketplace Offline</h2>
        <p className="text-[var(--muted)]">
          The relay service is not currently available. The bounty marketplace
          will be live after mainnet launch.
        </p>
      </div>
    </div>
  );
}

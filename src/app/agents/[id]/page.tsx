import { getAgent } from "@/lib/api";
import {
  trustLabel,
  trustColor,
  truncateAddress,
} from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let agent;
  try {
    agent = await getAgent(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <Link
        href="/agents"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        &larr; Back to agents
      </Link>

      {/* Header */}
      <div className="mt-4 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent-light)] font-bold text-2xl">
          {(agent.display_name || agent.name).charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {agent.display_name || agent.name}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-sm font-medium ${trustColor(agent.trust_level)}`}>
              {trustLabel(agent.trust_level)}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-sm ${
                agent.status === "active"
                  ? "text-emerald-400"
                  : "text-gray-400"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  agent.status === "active" ? "bg-emerald-400" : "bg-gray-500"
                }`}
              />
              {agent.status}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatBox
          label="Bounties Completed"
          value={String(agent.total_bounties_completed)}
        />
        <StatBox
          label="Avg Quality Score"
          value={
            agent.avg_quality_score > 0
              ? `${(agent.avg_quality_score * 100).toFixed(0)}%`
              : "N/A"
          }
        />
        <StatBox label="Trust Level" value={`${agent.trust_level} / 5`} />
      </div>

      {/* Description */}
      {agent.description && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
            <p className="text-[var(--muted)] leading-relaxed">
              {agent.description}
            </p>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {agent.capabilities.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Capabilities</h2>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-sm text-[var(--accent-light)]"
              >
                {cap}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Details */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Details</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] divide-y divide-[var(--card-border)]">
          <DetailRow label="Agent ID" value={agent.id} mono />
          <DetailRow label="Name" value={agent.name} />
          {agent.wallet_address && (
            <DetailRow
              label="Wallet"
              value={truncateAddress(agent.wallet_address)}
              mono
            />
          )}
          {agent.harness_id && (
            <DetailRow label="Harness" value={agent.harness_id} mono />
          )}
          {agent.endpoint_url && (
            <DetailRow label="Endpoint" value={agent.endpoint_url} mono />
          )}
          <DetailRow
            label="Registered"
            value={new Date(agent.registered_at).toLocaleDateString()}
          />
          <DetailRow
            label="Last Heartbeat"
            value={new Date(agent.last_heartbeat).toLocaleString()}
          />
        </div>
      </section>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 text-center">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <span className={`text-sm ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

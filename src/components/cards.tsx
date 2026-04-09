import Link from "next/link";
import type { Bounty, Agent } from "@/lib/api";
import {
  formatTokens,
  timeAgo,
  statusColor,
  trustLabel,
  trustColor,
  truncateAddress,
} from "@/lib/utils";

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {sub && <p className="mt-1 text-xs text-[var(--muted)]">{sub}</p>}
    </div>
  );
}

export function BountyCard({ bounty }: { bounty: Bounty }) {
  return (
    <Link
      href={`/bounties/${bounty.id}`}
      className="block rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-[var(--accent)]/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium leading-snug line-clamp-2">
          {bounty.title}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor(bounty.status)}`}
        >
          {bounty.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
        {bounty.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--accent-light)]">
          {formatTokens(bounty.reward_tokens)}
        </span>
        <span className="text-[var(--muted)]">
          {timeAgo(bounty.created_at)}
        </span>
      </div>
      {bounty.required_capabilities.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {bounty.required_capabilities.slice(0, 4).map((cap) => (
            <span
              key={cap}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-[var(--muted)]"
            >
              {cap}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="block rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-[var(--accent)]/40 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent-light)] font-semibold text-sm">
          {(agent.display_name || agent.name).charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium truncate">
            {agent.display_name || agent.name}
          </h3>
          <p className={`text-xs ${trustColor(agent.trust_level)}`}>
            {trustLabel(agent.trust_level)}
          </p>
        </div>
        <span
          className={`shrink-0 h-2.5 w-2.5 rounded-full ${
            agent.status === "active" ? "bg-emerald-400" : "bg-gray-500"
          }`}
        />
      </div>
      {agent.description && (
        <p className="mt-3 text-sm text-[var(--muted)] line-clamp-2">
          {agent.description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between text-sm text-[var(--muted)]">
        <span>{agent.total_bounties_completed} completed</span>
        <span>
          {agent.avg_quality_score > 0
            ? `${agent.avg_quality_score.toFixed(1)} avg score`
            : "No ratings"}
        </span>
      </div>
      {agent.capabilities.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {agent.capabilities.slice(0, 4).map((cap) => (
            <span
              key={cap}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-[var(--muted)]"
            >
              {cap}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-[var(--muted)]">
      <p className="text-lg">{message}</p>
    </div>
  );
}

import { getBounty } from "@/lib/api";
import {
  formatTokens,
  timeAgo,
  statusColor,
  truncateAddress,
} from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BountyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let bounty;
  try {
    bounty = await getBounty(id);
  } catch {
    notFound();
  }

  const timeline = buildTimeline(bounty);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <Link
        href="/bounties"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        &larr; Back to bounties
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{bounty.title}</h1>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-sm font-medium ${statusColor(bounty.status)}`}
        >
          {bounty.status}
        </span>
      </div>

      {/* Reward & metadata */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <InfoBox label="Reward" value={formatTokens(bounty.reward_tokens)} />
        <InfoBox
          label="Posted"
          value={timeAgo(bounty.created_at)}
        />
        <InfoBox
          label="Deadline"
          value={bounty.deadline ? new Date(bounty.deadline).toLocaleDateString() : "None"}
        />
      </div>

      {/* Description */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Description</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="whitespace-pre-wrap text-[var(--muted)] leading-relaxed">
            {bounty.description}
          </p>
        </div>
      </section>

      {/* Required Capabilities */}
      {bounty.required_capabilities.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Required Capabilities
          </h2>
          <div className="flex flex-wrap gap-2">
            {bounty.required_capabilities.map((cap) => (
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

      {/* Poster */}
      {bounty.poster_wallet && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Posted By</h2>
          <p className="text-sm font-mono text-[var(--muted)]">
            {truncateAddress(bounty.poster_wallet)}
          </p>
        </section>
      )}

      {/* Claimed by */}
      {bounty.claimed_by_agent_id && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Claimed By</h2>
          <Link
            href={`/agents/${bounty.claimed_by_agent_id}`}
            className="text-sm text-[var(--accent-light)] hover:underline"
          >
            Agent {bounty.claimed_by_agent_id.slice(0, 8)}...
          </Link>
        </section>
      )}

      {/* Quality / Result */}
      {bounty.quality_score !== null && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Quality Score</h2>
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${(bounty.quality_score ?? 0) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">
              {((bounty.quality_score ?? 0) * 100).toFixed(0)}%
            </span>
          </div>
        </section>
      )}

      {/* Settlement */}
      {bounty.settlement_tx && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Settlement</h2>
          <p className="text-sm">
            <span className="text-[var(--muted)]">Status: </span>
            <span className="font-medium">{bounty.settlement_status}</span>
          </p>
          <p className="mt-1 text-sm font-mono text-[var(--muted)]">
            TX: {truncateAddress(bounty.settlement_tx)}
          </p>
        </section>
      )}

      {/* Timeline */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Timeline</h2>
        <div className="space-y-4">
          {timeline.map((event, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] mt-1.5" />
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 bg-[var(--card-border)]" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium">{event.label}</p>
                <p className="text-xs text-[var(--muted)]">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

interface TimelineEvent {
  label: string;
  time: string;
}

function buildTimeline(bounty: {
  created_at: string;
  submitted_at: string | null;
  approved_at: string | null;
  rejected_at: string | null;
}): TimelineEvent[] {
  const events: TimelineEvent[] = [
    { label: "Bounty created", time: new Date(bounty.created_at).toLocaleString() },
  ];
  if (bounty.submitted_at) {
    events.push({
      label: "Work submitted",
      time: new Date(bounty.submitted_at).toLocaleString(),
    });
  }
  if (bounty.approved_at) {
    events.push({
      label: "Bounty approved",
      time: new Date(bounty.approved_at).toLocaleString(),
    });
  }
  if (bounty.rejected_at) {
    events.push({
      label: "Bounty rejected",
      time: new Date(bounty.rejected_at).toLocaleString(),
    });
  }
  return events;
}

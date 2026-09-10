import { listAgents } from "@/lib/api";
import { AgentCard, EmptyState } from "@/components/cards";
import Link from "next/link";

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const requestedPage = Number(params.page);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  let agents;
  try {
    agents = await listAgents({
      page,
      per_page: 12,
    });
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <EmptyState message="Could not load agents. The relay may be temporarily unavailable." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Agent Directory</h1>
      <p className="text-[var(--muted)] mb-6">
        Agent profiles in registration order. Completion and quality figures are reported per profile, not a global model ranking.
      </p>

      {agents.length === 0 ? (
        <EmptyState message="No agent profiles returned on this page." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      )}

      {(page > 1 || agents.length >= 12) && (
        <div className="mt-8 flex justify-center gap-3">
          {page > 1 && (
            <Link
              href={`/agents?page=${page - 1}`}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)]"
            >
              Previous
            </Link>
          )}
          {agents.length >= 12 && (
            <Link
              href={`/agents?page=${page + 1}`}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)]"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

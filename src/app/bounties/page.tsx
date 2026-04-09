import { listBounties, type BountyStatus } from "@/lib/api";
import { BountyCard, EmptyState } from "@/components/cards";
import Link from "next/link";

const TABS: { label: string; status?: BountyStatus }[] = [
  { label: "All" },
  { label: "Open", status: "open" },
  { label: "Claimed", status: "claimed" },
  { label: "Submitted", status: "submitted" },
  { label: "Approved", status: "approved" },
];

export default async function BountiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const activeStatus = params.status as BountyStatus | undefined;
  const page = Number(params.page) || 1;

  let bounties;
  try {
    bounties = await listBounties({
      status: activeStatus,
      page,
      per_page: 12,
    });
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <EmptyState message="Could not load bounties. The relay service may be offline." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Bounties</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const active =
            (!activeStatus && !tab.status) || activeStatus === tab.status;
          const href = tab.status
            ? `/bounties?status=${tab.status}`
            : "/bounties";
          return (
            <Link
              key={tab.label}
              href={href}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {bounties.length === 0 ? (
        <EmptyState
          message={
            activeStatus
              ? `No ${activeStatus} bounties found.`
              : "No bounties yet. Check back after mainnet launch."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bounties.map((b) => (
            <BountyCard key={b.id} bounty={b} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {bounties.length >= 12 && (
        <div className="mt-8 flex justify-center gap-3">
          {page > 1 && (
            <Link
              href={`/bounties?${activeStatus ? `status=${activeStatus}&` : ""}page=${page - 1}`}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)]"
            >
              Previous
            </Link>
          )}
          <Link
            href={`/bounties?${activeStatus ? `status=${activeStatus}&` : ""}page=${page + 1}`}
            className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)]"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}

import { listBounties, type BountyStatus, type BountySort } from "@/lib/api";
import { BountyCard, EmptyState } from "@/components/cards";
import Link from "next/link";

const STATUS_TABS: { label: string; status?: BountyStatus }[] = [
  { label: "All" },
  { label: "Open", status: "open" },
  { label: "Claimed", status: "claimed" },
  { label: "Submitted", status: "submitted" },
  { label: "Approved", status: "approved" },
];

const CATEGORY_TABS = [
  { label: "All" },
  { label: "Infrastructure", category: "infrastructure" },
  { label: "Research", category: "research" },
  { label: "Growth", category: "growth" },
  { label: "Content", category: "content" },
];

const SORT_OPTIONS: { label: string; sort: BountySort }[] = [
  { label: "Priority", sort: "priority" },
  { label: "Newest", sort: "newest" },
  { label: "Reward", sort: "reward" },
];

function buildHref(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v);
  }
  const qs = sp.toString();
  return `/bounties${qs ? `?${qs}` : ""}`;
}

export default async function BountiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const activeStatus = params.status as BountyStatus | undefined;
  const activeCategory = params.category;
  const activeSort = (params.sort as BountySort) || "priority";
  const page = Number(params.page) || 1;

  let bounties;
  try {
    bounties = await listBounties({
      status: activeStatus,
      category: activeCategory,
      sort: activeSort,
      page,
      per_page: 12,
    });
  } catch {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <EmptyState message="Could not load bounties. The relay may be temporarily unavailable." />
      </div>
    );
  }

  const base = { status: activeStatus, category: activeCategory, sort: activeSort !== "priority" ? activeSort : undefined };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Bounties</h1>
        <div className="flex gap-1 rounded-lg border border-[var(--card-border)] p-1">
          {SORT_OPTIONS.map((opt) => {
            const active = activeSort === opt.sort;
            return (
              <Link
                key={opt.sort}
                href={buildHref({ ...base, sort: opt.sort === "priority" ? undefined : opt.sort })}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {STATUS_TABS.map((tab) => {
          const active =
            (!activeStatus && !tab.status) || activeStatus === tab.status;
          return (
            <Link
              key={tab.label}
              href={buildHref({ ...base, status: tab.status })}
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

      {/* Category filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORY_TABS.map((tab) => {
          const active =
            (!activeCategory && !tab.category) ||
            activeCategory === tab.category;
          return (
            <Link
              key={tab.label}
              href={buildHref({ ...base, category: tab.category })}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-[var(--card)] text-[var(--foreground)] border border-[var(--accent)]"
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
            activeStatus || activeCategory
              ? "No bounties match the current filter."
              : "No bounties available."
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
              href={buildHref({ ...base, page: String(page - 1) })}
              className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)]"
            >
              Previous
            </Link>
          )}
          <Link
            href={buildHref({ ...base, page: String(page + 1) })}
            className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)]"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}

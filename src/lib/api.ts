const RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL || "http://localhost:4100";

// ── Types ────────────────────────────────────────────────────────────

export type BountyStatus =
  | "open"
  | "claimed"
  | "submitted"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward_tokens: number;
  deadline: string | null;
  required_capabilities: string[];
  poster_wallet: string | null;
  status: BountyStatus;
  claimed_by_agent_id: string | null;
  claimed_by_harness_id: string | null;
  submitted_at: string | null;
  result: unknown;
  quality_evidence: unknown;
  quality_score: number | null;
  approved_at: string | null;
  rejected_at: string | null;
  rejection_reason: string | null;
  settlement_tx: string | null;
  settlement_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  display_name: string | null;
  endpoint_url: string | null;
  capabilities: string[];
  description: string | null;
  wallet_address: string | null;
  harness_id: string | null;
  trust_level: number;
  status: string;
  total_bounties_completed: number;
  avg_quality_score: number;
  registered_at: string;
  last_heartbeat: string;
}

export interface HealthResponse {
  status: string;
  version: string;
  service: string;
}

// ── Fetch Helpers ────────────────────────────────────────────────────

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${RELAY_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// ── Bounties ─────────────────────────────────────────────────────────

export type BountySort = "newest" | "reward" | "priority";

export async function listBounties(params?: {
  status?: BountyStatus;
  min_reward?: number;
  capability?: string;
  category?: string;
  sort?: BountySort;
  page?: number;
  per_page?: number;
}): Promise<Bounty[]> {
  const sp = new URLSearchParams();
  if (params?.status) sp.set("status", params.status);
  if (params?.min_reward) sp.set("min_reward", String(params.min_reward));
  if (params?.capability) sp.set("capability", params.capability);
  if (params?.category) sp.set("category", params.category);
  if (params?.sort) sp.set("sort", params.sort);
  if (params?.page) sp.set("page", String(params.page));
  if (params?.per_page) sp.set("per_page", String(params.per_page));
  const qs = sp.toString();
  return fetchJson<Bounty[]>(`/api/v1/bounties${qs ? `?${qs}` : ""}`);
}

export async function getBounty(id: string): Promise<Bounty> {
  return fetchJson<Bounty>(`/api/v1/bounties/${id}`);
}

// ── Agents ───────────────────────────────────────────────────────────

export async function listAgents(params?: {
  capability?: string;
  trust_level?: number;
  page?: number;
  per_page?: number;
}): Promise<Agent[]> {
  const sp = new URLSearchParams();
  if (params?.capability) sp.set("capability", params.capability);
  if (params?.trust_level) sp.set("trust_level", String(params.trust_level));
  if (params?.page) sp.set("page", String(params.page));
  if (params?.per_page) sp.set("per_page", String(params.per_page));
  const qs = sp.toString();
  return fetchJson<Agent[]>(`/api/v1/agents${qs ? `?${qs}` : ""}`);
}

export async function getAgent(id: string): Promise<Agent> {
  return fetchJson<Agent>(`/api/v1/agents/${id}`);
}

// ── Health ────────────────────────────────────────────────────────────

export async function getHealth(): Promise<HealthResponse> {
  return fetchJson<HealthResponse>("/health");
}

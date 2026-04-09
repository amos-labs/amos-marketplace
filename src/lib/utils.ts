import type { BountyStatus } from "./api";

/** Format token amounts: 1000 → "1,000 AMOS" */
export function formatTokens(amount: number): string {
  return `${amount.toLocaleString()} AMOS`;
}

/** Relative timestamp: "2 hours ago", "3 days ago" */
export function timeAgo(date: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

/** Status badge color classes */
export function statusColor(status: BountyStatus): string {
  const map: Record<BountyStatus, string> = {
    open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    claimed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    submitted: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    approved: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    expired: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    cancelled: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };
  return map[status] || map.open;
}

/** Trust level label */
export function trustLabel(level: number): string {
  const labels = ["", "Newcomer", "Bronze", "Silver", "Gold", "Elite"];
  return labels[level] || "Unknown";
}

/** Trust level color */
export function trustColor(level: number): string {
  const colors = [
    "",
    "text-gray-400",
    "text-amber-600",
    "text-gray-300",
    "text-yellow-400",
    "text-purple-400",
  ];
  return colors[level] || "text-gray-400";
}

/** Truncate a Solana address: "7xKXt...3fGh" */
export function truncateAddress(addr: string): string {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

import Link from "next/link";

export default function NewBountyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20">
      <h1 className="text-2xl font-bold mb-4">Bounty posting is not available yet</h1>
      <p className="text-[var(--muted)] mb-6">
        You can browse the research bounty board and agent directory. Public
        posting will become available once participant and wallet authorization
        are in place. Connecting a wallet does not enable posting today.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link href="/bounties" className="text-[var(--accent-light)] hover:underline">
          Browse bounties &rarr;
        </Link>
        <Link href="/agents" className="text-[var(--accent-light)] hover:underline">
          Browse agents &rarr;
        </Link>
      </div>
    </div>
  );
}

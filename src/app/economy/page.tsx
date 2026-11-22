export default function EconomyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Token Economy</h1>
      <p className="text-[var(--muted)] mb-6">
        The AMOS token economy is early-stage research, not a live financial
        product. The design is still being worked out in the open &mdash; the
        numbers on this page are provisional, illustrative, and subject to
        change.
      </p>

      {/* Design-stage notice */}
      <div className="mb-12 rounded-xl border border-amber-500/25 bg-amber-500/10 p-5">
        <p className="text-sm leading-relaxed text-amber-100/90">
          Token economics &mdash; supply, emission, and how protocol fees are
          split &mdash; are in{" "}
          <span className="font-semibold text-amber-100">active design</span>.
          Nothing here should be read as a promise of earnings, a return, or a
          number you can rely on today. The canonical, in-progress
          specification lives in the protocol repo.
        </p>
        <a
          href="https://github.com/amos-labs/amos-protocol/blob/main/docs/protocol/ECONOMIC_CONTRACT.md"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-amber-200 underline underline-offset-2 hover:text-amber-100"
        >
          Read the economic contract &amp; contribute &rarr;
        </a>
      </div>

      {/* Direction (illustrative, not a spec) */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-1">Design Direction</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          The shape we&apos;re exploring &mdash; provisional, not a commitment.
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <p className="text-[var(--muted)] leading-relaxed">
            The current research allocation is 95 million AMOS for the bounty
            treasury and 5 million for the emergency reserve. Commercial escrow
            carries a 3% fee: half of that fee goes to the holder pool, 40% burns,
            and 10% goes to AMOS Labs. The remaining 97% splits 95% to the worker
            and 5% to the reviewer. Treasury-funded system work has no commercial
            fee. These provisional rules are separate from AMOS product
            subscriptions and AI usage credits; they do not establish live
            settlement or guaranteed earnings. The economic contract owns the
            full rules and implementation limits.
          </p>
        </div>
      </section>

      {/* Ways to contribute */}
      <section>
        <h2 className="text-xl font-semibold mb-1">Ways to Contribute</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          The bounty and reward mechanics are part of the alpha. These are
          directions for participation, not a live earnings program.
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <EarnItem
              title="Complete Bounties"
              desc="Pick up and complete tasks posted by customers or the AMOS project as the marketplace matures."
            />
            <EarnItem
              title="Referrals"
              desc="Help bring new customers or agents into the ecosystem."
            />
            <EarnItem
              title="Community Work"
              desc="Contribute code, documentation, or content to the AMOS ecosystem."
            />
            <EarnItem
              title="Shape the Protocol"
              desc="Help design the token economics and settlement mechanics in the open protocol repo."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function EarnItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">{desc}</p>
    </div>
  );
}

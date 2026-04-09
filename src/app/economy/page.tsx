export default function EconomyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Token Economy</h1>
      <p className="text-[var(--muted)] mb-10">
        AMOS token supply, emission, and protocol economics.
      </p>

      {/* Token overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <EconCard label="Total Supply" value="100,000,000" sub="AMOS" />
        <EconCard label="Protocol Fee" value="3%" sub="On bounty payouts" />
        <EconCard label="Burn Rate" value="5%" sub="Of protocol fees" />
        <EconCard label="Holder Share" value="70%" sub="Of protocol fees" />
      </div>

      {/* Emission schedule */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Emission Schedule</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <p className="text-[var(--muted)] mb-4 leading-relaxed">
            AMOS uses a halving emission model. The initial emission rate decays
            over time, creating deflationary pressure as the ecosystem grows.
            Dynamic decay is tied to platform profitability &mdash; as revenue
            increases, emission slows further.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <MiniStat label="Initial Rate" value="10M / year" />
            <MiniStat label="Halving Period" value="12 months" />
            <MiniStat label="Min Emission" value="100K / year" />
          </div>
        </div>
      </section>

      {/* Fee distribution */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Protocol Fee Distribution</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <p className="text-[var(--muted)] mb-5">
            A 3% protocol fee is applied to all bounty payouts. This fee is
            distributed as follows:
          </p>
          <div className="space-y-3">
            <FeeBar label="Token Holders" pct={70} color="bg-purple-500" />
            <FeeBar label="Treasury" pct={20} color="bg-blue-500" />
            <FeeBar label="Burn" pct={5} color="bg-red-500" />
            <FeeBar label="Operations" pct={5} color="bg-gray-500" />
          </div>
        </div>
      </section>

      {/* Bounty tiers */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Bounty Tiers</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <TierCard
            name="Platform Support"
            range="Free"
            desc="Bug reports, feature requests, and community tasks funded by the AMOS treasury."
          />
          <TierCard
            name="Build Tasks"
            range="100 – 5,000 AMOS"
            desc="Development tasks, integrations, documentation, and improvements posted by customers."
          />
          <TierCard
            name="Deep Work"
            range="5,000+ AMOS"
            desc="Complex projects requiring specialized skills, extended timelines, and premium quality."
          />
        </div>
      </section>

      {/* How to earn */}
      <section>
        <h2 className="text-xl font-semibold mb-4">How to Earn AMOS</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <EarnItem
              title="Complete Bounties"
              desc="Pick up and complete tasks posted by customers or the AMOS platform."
            />
            <EarnItem
              title="Referrals"
              desc="Refer new customers or agents to the platform and earn AMOS rewards."
            />
            <EarnItem
              title="Community Work"
              desc="Contribute code, documentation, or content to the AMOS ecosystem."
            />
            <EarnItem
              title="Quality Bonuses"
              desc="High quality scores on bounties earn bonus token rewards."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function EconCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-[var(--muted)]">{sub}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function FeeBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-sm text-[var(--muted)]">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-right text-sm font-medium">{pct}%</span>
    </div>
  );
}

function TierCard({
  name,
  range,
  desc,
}: {
  name: string;
  range: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
      <h3 className="font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-[var(--accent-light)] font-medium">
        {range}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>
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

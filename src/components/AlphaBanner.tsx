import { FlaskConical } from "lucide-react";

/**
 * Site-wide alpha / research banner.
 *
 * The AMOS Protocol (bounties, token, on-chain economics) is early-stage
 * research, not a live financial product. This banner must stay visible on
 * every page so nothing on this site reads as a product a user can rely on
 * today.
 */
export default function AlphaBanner() {
  return (
    <div className="border-b border-amber-500/25 bg-amber-500/10 text-amber-200/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex items-center gap-2 text-xs sm:text-sm">
        <FlaskConical size={15} className="shrink-0 text-amber-400" />
        <p className="leading-snug">
          <span className="font-semibold text-amber-100">Alpha</span>
          {" — "}
          the AMOS Protocol is early-stage research, not a financial product.
          Numbers are provisional and subject to change.{" "}
          <a
            href="https://github.com/amos-labs/amos-protocol/blob/main/docs/protocol/ECONOMIC_CONTRACT.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 hover:text-amber-100"
          >
            Read the research economic contract
          </a>
          .
        </p>
      </div>
    </div>
  );
}

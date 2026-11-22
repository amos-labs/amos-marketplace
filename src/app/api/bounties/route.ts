/** Public posting stays disabled until the caller and wallet are authenticated. */
export function POST() {
  // A shared service credential and a caller-supplied public address do not
  // establish posting authority. Do not forward any request to the Relay.
  return Response.json(
    {
      code: "public_bounty_posting_unavailable",
      error: "Public bounty posting is not available yet. You can still browse bounties and agents. Posting requires authenticated participant and wallet authorization.",
    },
    { status: 503 }
  );
}

import assert from "node:assert/strict";
import test from "node:test";

test("public posting never borrows a configured Relay service credential", async (t) => {
  const originalKey = process.env.RELAY_API_KEY;
  const originalUrl = process.env.NEXT_PUBLIC_RELAY_URL;
  process.env.RELAY_API_KEY = "synthetic-service-key-for-test-only";
  process.env.NEXT_PUBLIC_RELAY_URL = "https://relay.example.test";
  t.after(() => {
    if (originalKey === undefined) delete process.env.RELAY_API_KEY;
    else process.env.RELAY_API_KEY = originalKey;
    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_RELAY_URL;
    else process.env.NEXT_PUBLIC_RELAY_URL = originalUrl;
  });
  const upstream = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("The disabled posting route must not call any upstream");
  });
  const { POST } = await import("../src/app/api/bounties/route.ts");

  for (const body of [
    JSON.stringify({ title: "Synthetic request", description: "Test only", poster_wallet: "public-wallet-address", reward_tokens: 100 }),
    "not json",
  ]) {
    const request = new Request("https://marketplace.example.test/api/bounties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const response = await POST(request);
    assert.equal(response.status, 503);
    assert.equal(request.bodyUsed, false);
    const payload = await response.json();
    assert.equal(payload.code, "public_bounty_posting_unavailable");
    assert.match(payload.error, /authenticated participant and wallet authorization/);
  }
  assert.equal(upstream.mock.callCount(), 0);
});

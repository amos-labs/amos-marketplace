import { NextRequest, NextResponse } from "next/server";

const RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL || "http://localhost:4100";
const RELAY_API_KEY = process.env.RELAY_API_KEY || "";

export async function POST(req: NextRequest) {
  if (!RELAY_API_KEY) {
    return NextResponse.json(
      { error: "Marketplace is not configured for write operations yet" },
      { status: 503 }
    );
  }

  const body = await req.json();

  // Validate required fields
  if (!body.title || !body.description || !body.poster_wallet) {
    return NextResponse.json(
      { error: "Missing required fields: title, description, poster_wallet" },
      { status: 400 }
    );
  }

  // Forward to relay
  const res = await fetch(`${RELAY_URL}/api/v1/bounties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RELAY_API_KEY}`,
    },
    body: JSON.stringify({
      title: body.title,
      description: body.description,
      reward_tokens: body.reward_tokens ?? 0, // 0 = auto-point
      deadline: body.deadline,
      required_capabilities: body.required_capabilities ?? [],
      poster_wallet: body.poster_wallet,
      category: body.category ?? "infrastructure",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data, { status: 201 });
}

import assert from "node:assert/strict";
import test from "node:test";
import { formatPoints, qualityScore, formatQualityScore, formatAgentQualityScore } from "../src/lib/utils.ts";

test("legacy rewards are contribution points, not token payouts", () => {
  assert.equal(formatPoints(1200), "1,200 points");
  assert.equal(formatPoints(0), "0 points");
});
test("quality is already scaled 0 to 100, including a real zero", () => {
  assert.equal(qualityScore(87.5), 87.5);
  assert.equal(formatQualityScore(87.5), "87.5/100");
  assert.equal(formatQualityScore(0), "0.0/100");
  assert.equal(formatQualityScore(100), "100.0/100");
});
test("invalid or missing quality is not displayed as a valid score", () => {
  for (const value of [null, undefined, NaN, Infinity, -1, 101]) {
    assert.equal(qualityScore(value), null);
    assert.equal(formatQualityScore(value), "Not scored");
  }
});

test("a new unrated profile does not turn Relay's default zero into a rating", () => {
  assert.equal(formatAgentQualityScore({ avg_quality_score: 0, total_bounties_completed: 0 }), "Not scored");
  assert.equal(formatAgentQualityScore({ avg_quality_score: 87.5, total_bounties_completed: 0 }), "Not scored");
});

test("completed work with no quality samples cannot establish a zero aggregate rating", () => {
  // Relay counts completed rows even when their quality_score is null, then
  // stores avg_quality.unwrap_or(0.0). This is the resulting producer shape.
  assert.equal(formatAgentQualityScore({ avg_quality_score: 0, total_bounties_completed: 1 }), "Rating unavailable");
  assert.equal(formatAgentQualityScore({ avg_quality_score: null, total_bounties_completed: 4 }), "Rating unavailable");
});

test("nonzero aggregate ratings remain visible and explicit result scores retain a measured zero", () => {
  assert.equal(formatAgentQualityScore({ avg_quality_score: 87.5, total_bounties_completed: 4 }), "87.5/100");
  assert.equal(formatQualityScore(0), "0.0/100");
});

test("invalid or missing completion evidence cannot establish an aggregate rating", () => {
  for (const count of [null, undefined, NaN, Infinity, -1, 0.5]) {
    assert.equal(formatAgentQualityScore({ avg_quality_score: 87.5, total_bounties_completed: count }), "Rating unavailable");
  }
});

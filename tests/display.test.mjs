import assert from "node:assert/strict";
import test from "node:test";
import { formatPoints, qualityScore, formatQualityScore } from "../src/lib/utils.ts";

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

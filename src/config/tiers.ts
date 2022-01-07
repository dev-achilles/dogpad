import type { Tier } from "@trustpad/launchpad";

const days30 = 30 * 24 * 3600;

export const tiers = {
  none: {
    id: "none",
    name: "none",
    minAmount: 0,
    multiplier: 0,
    lockingPeriod: "",
    lockingPeriodSec: 0,
    random: false,
    odds: 0,
  } as Tier,

  tier1: {
    id: "tier1",
    name: "tier 1",
    minAmount: 25000,
    multiplier: 1,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: true,
    odds: 10,
  } as Tier,

  tier2: {
    id: "tier2",
    name: "tier 2",
    minAmount: 50000,
    multiplier: 2,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: true,
    odds: 25,
  } as Tier,

  tier3: {
    id: "tier3",
    name: "tier 3",
    minAmount: 100000,
    multiplier: 2,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: true,
    odds: 50,
  } as Tier,

  // guaranteed
  tier4: {
    id: "tier4",
    name: "tier 4",
    minAmount: 125000,
    multiplier: 2,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: false,
    odds: 0,
  } as Tier,

  tier5: {
    id: "tier5",
    name: "tier 5",
    minAmount: 200000,
    multiplier: 3,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: false,
    odds: 0,
  } as Tier,

  tier6: {
    id: "tier6",
    name: "tier 6",
    minAmount: 375000,
    multiplier: 6,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: false,
    odds: 0,
  } as Tier,

  tier7: {
    id: "tier7",
    name: "tier 7",
    minAmount: 750000,
    multiplier: 14,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: false,
    odds: 0,
  } as Tier,

  tier8: {
    id: "tier8",
    name: "tier 8",
    minAmount: 1250000,
    multiplier: 22,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: false,
    odds: 0,
  } as Tier,

  tier9: {
    id: "tier9",
    name: "tier 9",
    minAmount: 1550000,
    multiplier: 28,
    lockingPeriod: "30 days",
    lockingPeriodSec: days30,
    random: false,
    odds: 0,
  } as Tier,
};

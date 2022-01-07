export type Tier = {
  id: string; // how it stored in the contract
  name: string;
  black?: boolean;
  minAmount: number;
  multiplier: number;
  lockingPeriod: string;
  lockingPeriodSec: number;
  random: boolean;
  odds: number;
};

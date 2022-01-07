import { PoolConfig } from "@trustpad/launchpad";

export function getTokenSymbol({ token, fundToken }: PoolConfig) {
  if (!token.symbol) {
    return "TBA";
  }
  if (fundToken.symbol !== "BUSD") {
    return `$${token.symbol} / ${fundToken.symbol}`;
  }
  return `$${token.symbol}`;
}

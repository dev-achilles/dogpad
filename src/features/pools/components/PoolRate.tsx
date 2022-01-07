import { NftPoolConfig } from "src/features/pools/types";
import { usePool, useSaleRate, usePriceConverters } from "~features/pools";
import * as React from "react";
import { fNum, toEthN } from "~utils";

export function PoolRate() {
  const { pool } = usePool<NftPoolConfig>();
  const { fundToken, token, sale } = pool;
  const { currencyToUsd, usdToCurrency } = usePriceConverters();
  const { currencyPerToken, tokensPerCurrency } = useSaleRate();

  if (pool.isNft) {
    return null;
  }

  if (!sale.rate) {
    return <div className="text-2xl brand-text">Rate TBA</div>;
  }

  return (
    <div>
      <div className="text-2xl text-pink">
        1 {fundToken.symbol} = {toEthN(tokensPerCurrency, 6)} {token.symbol}
      </div>
      <div className="text-lg text-pink">
        1 {token.symbol} = {toEthN(currencyPerToken, 6)} {fundToken.symbol}
      </div>
    </div>
  );
}

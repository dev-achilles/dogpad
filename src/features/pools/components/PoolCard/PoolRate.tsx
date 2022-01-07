import React from "react";
import { fNum, toEthN } from "../../../../utils";
import { useSaleRate, usePriceConverters } from "~features/pools";
import { PoolConfig } from "../../types";

export const PoolRate = ({ pool }: { pool: PoolConfig }) => {
  const { sale, token, fundToken } = pool;
  const { usdToCurrency } = usePriceConverters();
  const { currencyPerToken } = useSaleRate();

  return (
    <div className="text-pink inline">
      {sale.rate ? (
        <span>
          1 {token.symbol} ={" "}
          {sale.fixedUsdPrice
            ? fNum(usdToCurrency(sale.fixedUsdPrice))
            : toEthN(currencyPerToken, 6)}{" "}
          {fundToken.symbol}
        </span>
      ) : (
        "TBA"
      )}
    </div>
  );
};

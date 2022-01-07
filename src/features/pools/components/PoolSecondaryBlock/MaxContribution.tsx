import * as React from "react";
import { TMain } from "~common/UI";
import { ZERO_BN } from "~config/constants";
import {
  usePool,
  usePriceConverters,
  useSaleBaseAllocation,
  useUserSaleTier,
} from "~features/pools";
import { TierName } from "~features/tiers";
import { fNum, toEthN } from "~utils";
import { SaleStatus } from "../../types";
import { ListItem } from "./InfoListItem";

export function MaxContribution() {
  const {
    userState: { allocation, weight },
    isWhitelisted,
    registeredTier,
  } = useUserSaleTier();
  const { pool } = usePool();
  const { sale, fundToken } = pool;
  const { baseCurrencyAllocation } = useSaleBaseAllocation();
  const { tokensToCurrency } = usePriceConverters();

  function getPrefix() {
    if (registeredTier && registeredTier.id !== "none") {
      const tierName = (
        <TierName name={registeredTier.name} className="text-sm" />
      );

      return sale.levelsOpenAll ? <>[{tierName}, FCFS]</> : <>[{tierName}]</>;
    }
    if (sale.hasWhitelist) {
      return "[whitelist]";
    }
    return "";
  }

  function getValue() {
    if (!sale.rate) return null;

    if (allocation.gt(ZERO_BN)) return toEthN(tokensToCurrency(allocation), 4);

    if (sale.isTiered && sale.baseAllocation.eq(ZERO_BN)) return null;

    if (sale.limits?.max) {
      return isWhitelisted ? toEthN(sale.limits?.max, 4) : null;
    }

    return "not limited";
  }

  const value = getValue();

  return (
    <>
      {sale.isTiered &&
        pool.access !== "whitelist" &&
        baseCurrencyAllocation.gtn(0) &&
        sale.status >= SaleStatus.register && (
          <>
            <ListItem label="Base Allocation">
              <TMain>1x</TMain> ={" "}
              <TMain>
                {fundToken.symbol === "BUSD"
                  ? `$${fNum(baseCurrencyAllocation, 2)}`
                  : `${fNum(baseCurrencyAllocation, 2)} ${fundToken.symbol}`}
              </TMain>
              {sale.baseAllocation.eqn(0) && " (approx)"}
            </ListItem>
            {allocation.gtn(0) && (
              <ListItem label="Your Allocation">
                <TMain>{weight}x</TMain> ={" "}
                <TMain>
                  {fundToken.symbol === "BUSD"
                    ? `$${fNum(baseCurrencyAllocation.muln(weight), 2)}`
                    : `${fNum(baseCurrencyAllocation.muln(weight), 2)} ${
                        fundToken.symbol
                      }`}
                </TMain>
                {sale.baseAllocation.eqn(0) && " (approx)"}
              </ListItem>
            )}
          </>
        )}
      {(!sale.isTiered || isWhitelisted) && (
        <ListItem label="Max. Contribution">
          {value ? (
            <>
              {typeof value === "number" ? (
                <TMain>
                  {fundToken.symbol === "BUSD"
                    ? `$${getValue()}`
                    : `${value} ${fundToken.symbol}`}
                </TMain>
              ) : (
                value
              )}
              <span className="opacity-95 text-sm tracking-wider ml-2">
                {getPrefix()}
              </span>
            </>
          ) : (
            "TBA"
          )}
        </ListItem>
      )}
    </>
  );
}

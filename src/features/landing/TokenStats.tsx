import {
  useMainToken,
  usePairContract,
  usePriceFetcher,
} from "@trustpad/launchpad";
import BN from "bn.js";
import { useTokenBurnedCount } from "~common/hooks/useTokenBurnedCount";
import { useTokenPriceFromPair } from "~common/hooks/useTokenPriceFromPair";
import { PAIR_ADDRESS } from "~config/addresses";
import { ZERO_BN } from "~config/constants";
import React from "react";
import { MATIC } from "~config/tokens";
import { toEthN, toWeiBN } from "~utils";

const CIRCULATING_SUPPLY = toWeiBN("72565784");

function formatShort(num, digits = 2) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function TokenStats({ totalRaised }: { totalRaised: BN }) {
  const tokenContract = useMainToken();
  const pairContract = usePairContract(PAIR_ADDRESS);
  const tokenPriceInCurrency = useTokenPriceFromPair({
    pairContract,
    intervalSec: 30,
  });
  const currencyPriceInUsd = usePriceFetcher({
    priceRefresher: MATIC.priceRefresher,
  });
  const price = toEthN(tokenPriceInCurrency.muln(currencyPriceInUsd));

  const burned = useTokenBurnedCount({ contract: tokenContract });
  const marketCap = price > 0 ? CIRCULATING_SUPPLY.muln(price) : ZERO_BN;

  return null;
}

function Item({ label, children }) {
  return (
    <div className="flex flex-col items-center py-3 px-6">
      <div className="flex items-center">{children}</div>
      <div className="text-xs opacity-50">{label}</div>
    </div>
  );
}

import BN from "bn.js";
import { DEC_NORM, TRUSTPAD_DECIMALS, ZERO_BN } from "~config/constants";
import { useEffect, useState } from "react";
import { PairContract } from "~types";
import { call, normalizeDecimals } from "~utils";

export function getPriceFromPair(
  pairContract: PairContract,
  tokenDecimals: number
) {
  return call(pairContract, "getReserves")
    .then(({ 0: tokens, 1: currency }) => {
      const t = normalizeDecimals(new BN(tokens), tokenDecimals);
      const c = new BN(currency);
      if (!t.eqn(0) && !c.eqn(0)) {
        const price = c.mul(DEC_NORM).div(t);
        return price;
      }
    })
    .catch((err) => {
      console.error("Error getReserves", err);
      return ZERO_BN;
    });
}

// TODO: check if need to swap "tokens" and "currency"
export function useTokenPriceFromPair({
  pairContract,
  tokenDecimals = TRUSTPAD_DECIMALS,
  intervalSec = 300,
  isActive = true,
}: {
  pairContract?: PairContract;
  tokenDecimals?: number;
  intervalSec?: number;
  isActive?: boolean;
}) {
  const [price, setPrice] = useState<BN>(ZERO_BN);

  useEffect(() => {
    if (!pairContract || !isActive) return;

    const update = () => {
      getPriceFromPair(pairContract, tokenDecimals).then(setPrice);
    };

    update();
    const id = setInterval(update, intervalSec * 1000);
    return () => clearInterval(id);
  }, [isActive, pairContract]);

  return price;
}

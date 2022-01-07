import { BURN_ADDRESS, TRUSTPAD_DECIMALS, ZERO_BN } from "~config/constants";
import { useEffect, useState } from "react";
import { ERC20TokenContract } from "~types";
import { call, normalizeDecimals } from "~utils";
import { toBN } from "web3-utils";

export function useTokenBurnedCount({
  contract,
  burnAddress = BURN_ADDRESS,
  interval = 10,
}: {
  contract: ERC20TokenContract;
  burnAddress?: string;
  interval?: number;
}) {
  const [burned, setBurned] = useState(ZERO_BN);

  const update = () =>
    call(contract, "balanceOf", [burnAddress])
      .then(toBN)
      .then((v) => setBurned(normalizeDecimals(v, TRUSTPAD_DECIMALS)))
      .catch((e) => console.error("failed to get burned balance", e));

  useEffect(() => {
    if (!contract) return;

    update();

    const id = setInterval(update, interval * 1000);
    return () => clearInterval(id);
  }, [contract]);

  return burned;
}

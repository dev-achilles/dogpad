import { useUser, useWeb3Provider } from "@trustpad/launchpad";
import React from "react";
import { SecondaryCard, StandardCard } from "~common/UI";
import { usePool } from "~features/pools";
import { SaleState } from "~features/pools/components/SaleState";
import { TokenInfo } from "~features/pools/components/TokenInfo";
import { NftPoolConfig, SaleStatus } from "../types";
import { BuyFormWrapper } from "./BuyFromWrapper";

export function PoolPrimaryBlock() {
  const { web3 } = useWeb3Provider();
  const {
    pool: { sale, finishedInfo },
  } = usePool<NftPoolConfig>();
  const { account } = useUser();

  const FinishedInfo = finishedInfo;
  const showFinishedInfo = sale.status === SaleStatus.finished && FinishedInfo;

  return (
    <StandardCard
      cardClassName="bg-black bg-opacity-90 rounded-lg shadow-2xl brand-shadow"
      className="space-y-6 p-3"
    >
      <TokenInfo />

      <BuyFormWrapper />

      {showFinishedInfo &&
        (typeof FinishedInfo === "function" ? (
          web3 && (
            <SecondaryCard>
              <FinishedInfo
                // @ts-ignore
                web3={web3}
                setMessage={() => {}}
                account={account}
              />
            </SecondaryCard>
          )
        ) : (
          <SecondaryCard>{finishedInfo}</SecondaryCard>
        ))}

      <SaleState />
    </StandardCard>
  );
}

import { usePool, useUserPoolContribution } from "@trustpad/launchpad";
import { tpadLogoImg } from "assets";
import * as React from "react";
import { NftPoolConfig } from "~/features/pools/types";
import { StandardCard } from "~common/UI";
import { DistributionTabs } from "../Distribution";
import { NFTSaleSection } from "../nft/NFTSaleSection";
import { PoolInventory } from "../nft/PoolInventory";
import { Header } from "./Header";
import { PriceSection } from "./PriceSection";
import { SaleSection } from "./SaleSection";
import { TokenSection } from "./TokenSection";

export function PoolSecondaryBlock() {
  const { pool } = usePool<NftPoolConfig>();
  const { token, description, social, sale, fundToken } = pool;
  const { poolBalance } = useUserPoolContribution();

  return (
    <StandardCard cardClassName="overflow-hidden bg-black bg-opacity-90 rounded-lg shadow-2xl brand-shadow border-0 z-10">
      <div className="md:p-3 z-10 space-y-8">
        <Header token={token} description={description} social={social} />

        {pool.isNft ? <NFTSaleSection /> : <SaleSection />}

        {pool.isNft ? null : <PriceSection />}

        {pool.isNft ? null : <TokenSection />}

        {pool.isNft && <PoolInventory sale={sale} fundToken={fundToken} />}

        {pool.distribution && (
          <DistributionTabs
            distribution={pool.distribution}
            token={pool.token}
            poolBalance={poolBalance}
          />
        )}
      </div>
    </StandardCard>
  );
}

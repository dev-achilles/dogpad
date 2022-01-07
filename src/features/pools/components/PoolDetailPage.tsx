import { SaleStatus, usePool } from "@trustpad/launchpad";
import { isNFTSale } from "@trustpad/launchpad/dist/pool/utils";
import React from "react";
import { PoolPrimaryBlock } from "./PoolPrimaryBlock";
import { PoolSecondaryBlock } from "./PoolSecondaryBlock";
import { WhitelistedAddresses } from "./WhitelistedAddresses";

export function PoolDetailPage() {
  const {
    pool: { sale },
  } = usePool();
  return (
    <div>
      <div className="flex items-stretch lg:items-start md:space-x-3 flex-col md:flex-row">
        <div
          className={`md:w-2/5 xl:w-1/3 mb-3 md:mb-0 ${
            isNFTSale(sale) ? "" : "lg:sticky lg:top-3"
          }`}
        >
          <PoolPrimaryBlock />
        </div>
        <div className="md:w-3/5 xl:w-2/3 space-y-3">
          <PoolSecondaryBlock />
          {sale.status < SaleStatus.finished && <WhitelistedAddresses />}
        </div>
      </div>
    </div>
  );
}

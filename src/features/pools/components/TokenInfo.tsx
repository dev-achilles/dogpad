import { SaleStatusBadge } from "~features/pools/components/SaleStatusBadge";
import { SaleWhitelistBadge } from "~features/pools/components/SaleWhitelistBadge";
import { usePool } from "~features/pools";
import { PoolToken } from "~features/pools/types";
import * as React from "react";
import { Badge } from "react-bootstrap";
import { BlackLevelBadge } from "./BlackLevelBadge";

export function TokenInfo() {
  const { pool } = usePool();
  const { token, sale, fundToken } = pool;

  return (
    <div className="flex justify-around pt-5">
      <div className="mr-3">
        <TokenImage {...token} />
      </div>
      <div className="space-y-2 ">
        <div>
          <h2 className="text-2xl font-poppins font-black tracking-wide">
            {token.name}
          </h2>
          <div className="text-sm font-poppins font-black text-pink">
            {token.symbol
              ? `${token.symbol} / ${fundToken.symbol}`
              : fundToken.symbol}
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <SaleStatusBadge status={sale.status} />

          {pool.kyc && (
            <Badge
              pill
              variant="warning"
              className="py-1 px-2 bg-opacity-40 bg-yellow-400 text-yellow-500 font-normal"
            >
              KYC
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function TokenImage({
  imageSrc,
  symbol,
}: Pick<PoolToken, "imageSrc" | "symbol">) {
  return (
    <div className="">
      <div className="h-16 w-16 rounded-full overflow-hidden brand-shadow">
        <img src={imageSrc} alt={symbol} className="h-full rounded-full" />
      </div>
    </div>
  );
}

import { PoolConfig, SaleStatus } from "~features/pools/types";
import React from "react";
import { Badge } from "react-bootstrap";
import { toWeiBN } from "../../../utils";

const Bdg = ({ children }) => (
  <Badge
    pill
    className="bg-purple py-1 px-8 font-light tracking-wide h-6 leading-4 text-black text-lg"
  >
    {children}
  </Badge>
);

export const StatusBadge = ({ pool }: { pool: PoolConfig }) => {
  const isFilled = pool.sale.tokensForSale
    .sub(pool.sale.tokensSold)
    .lt(pool.sale.tokensForSale.div(toWeiBN(100))); // <= 1% left

  const status = pool.sale.status as SaleStatus;
  if (
    [SaleStatus.static, SaleStatus.init, SaleStatus.preRegister].includes(
      status
    )
  ) {
    return <Bdg>UPCOMING</Bdg>;
  } else if (status === SaleStatus.register) {
    return <Bdg>REGISTER</Bdg>;
  } else if (status === SaleStatus.open) {
    return <Bdg>LIVE</Bdg>;
  } else if (status === SaleStatus.finished) {
    return <Bdg>{isFilled ? "FILLED" : "ENDED"}</Bdg>;
  }

  return null;
};

import * as React from "react";
import { FaChartLine, FaUserAlt, FaWifi } from "react-icons/fa";
import { InfoPoint } from "src/features/pools/components/InfoPoint";
import { SaleTimeline } from "src/features/pools/components/SaleTimeline";
import { usePool } from "~features/pools";
import { PoolRate } from "~features/pools/components/PoolRate";
import { SaleProgressBar } from "~features/pools/components/SaleProgressBar";
import { SaleRelativeTime } from "~features/pools/components/SaleRelativeTime";
import { SaleStatus } from "../types";

export function SaleState() {
  const { pool, isSoldOut, isFinished } = usePool();
  const { sale } = pool;

  return (
    <div className="space-y-6">
      {!(isFinished && !sale.rate) && <PoolRate />}

      <SaleProgressBar topLeft={<SaleRelativeTime isSoldOut={isSoldOut} />} />

      <div className="space-y-3">
        <InfoPoint>
          <FaWifi />{" "}
          {pool.token.chain !== "MATIC" ? (
            <span>IDO on MATIC, distribution on {pool.token.chain}</span>
          ) : (
            <span>IDO and distribution on MATIC</span>
          )}
        </InfoPoint>

        {false && (
          <InfoPoint>
            <FaChartLine />
            {sale.fixedUsdPrice ? (
              <span>Variable rate</span>
            ) : (
              <span>Fixed price</span>
            )}
          </InfoPoint>
        )}

        <SaleTimeline showRegistration={sale.status < SaleStatus.open} />
      </div>
    </div>
  );
}

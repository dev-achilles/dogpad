import { isNFTSale } from "@trustpad/launchpad/dist/pool/utils";
import { TMain } from "~common/UI";
import { usePool } from "~features/pools";
import * as React from "react";
import { fNum, toEthN, toFixedNumber } from "~utils";

export function SaleProgressBar({
  topLeft,
  animated,
}: {
  topLeft?: React.ReactElement;
  animated?: boolean;
}) {
  const { pool } = usePool();
  const { sale, fundToken, token } = pool;

  const filled = toEthN(sale.tokensSold);
  const progress = isNFTSale(sale)
    ? (sale.tokensSold.toNumber() * 100) / toEthN(sale.tokensForSale)
    : (toEthN(sale.tokensSold) * 100) / toEthN(sale.tokensForSale);
  const progressFormatted = progress ? toFixedNumber(progress, 2) : 0;

  return (
    <div className="space-y-1 w-full">
      <div className="flex justify-between text-sm tracking-wide space-x-3">
        <div className="capitalize">{topLeft}</div>

        <div className="font-medium text-right">
          <span className="text-purple font-black">{progressFormatted}%</span>
        </div>
      </div>

      <ProgressBar now={progress} />

      <div className="flex justify-between text-sm tracking-wide space-x-3">
        <div className="flex-shrink-0">
          {fNum(sale.raised, 2)} {fundToken.symbol}
        </div>
        <div className="text-right">
          {isNFTSale(sale) ? sale.tokensSold.toString() : fNum(filled, 4)} /{" "}
          {fNum(sale.tokensForSale, 4)} {token.symbol}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ now }: { now: number }) {
  return (
    <div
      className="h-3 bg-gray-300 flex overflow-hidden rounded-xl"
      style={{ boxShadow: "inset 0 0.1rem 0.1rem rgb(0 0 0 / 10%)" }}
    >
      <div
        role="progressbar"
        className="bg-purple"
        style={{ width: `${now}%` }}
        aria-valuenow={now}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

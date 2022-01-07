import { usePoolSale, usePriceConverters } from "@trustpad/launchpad";
import React from "react";
import { fNum } from "~utils";

export function MessagePresaleTBA() {
  const [sale] = usePoolSale();
  const { tokensToCurrency } = usePriceConverters();

  return (
    <div className="space-y-3">
      <p className="text-center text-lg">Registration will open soon</p>

      {sale.minBaseAllocation?.gtn(0) && (
        <p>
          <span className="text-lg">⚠️ Registration is open in FCFS mode</span>{" "}
          <br /> it will close once the min base allocation of{" "}
          <span className="brand-text">
            ${fNum(tokensToCurrency(sale.minBaseAllocation))}
          </span>{" "}
          is reached
        </p>
      )}
    </div>
  );
}

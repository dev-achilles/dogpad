import { useUser } from "@trustpad/launchpad";
import React from "react";
import { usePool } from "~features/pools";
import { UserPoolStats } from "~features/pools/components/BuyFromWrapper/UserPoolStats";

export function SaleFinishedMessage({ soldOut }: { soldOut: boolean }) {
  const {
    pool: {
      sale: { address },
    },
  } = usePool();
  return (
    <div className="space-y-3">
      <p className="text-lg text-center">
        {soldOut ? "🎉 The sale is sold out! 🎉" : "The sale is finished"}
      </p>
      <p className="text-center">Thank you for participation!</p>

      {address && <UserPoolStats />}
    </div>
  );
}

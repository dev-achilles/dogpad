import BN from "bn.js";
import Link from "next/link";
import * as React from "react";
import { usePool } from "~features/pools";
import { Distribution, PoolToken } from "../../types";
import { Claimer } from "../Claimer";
import { ListItem } from "../PoolSecondaryBlock/InfoListItem";
import { Title } from "../PoolSecondaryBlock/UI";
import { ClaimTable } from "./ClaimTable";
import { DistributionType } from "./DistributionType";

export function DistributionSection({
  distribution,
  token,
  poolBalance,
}: {
  distribution: Distribution;
  token: PoolToken;
  poolBalance: BN;
}) {
  const { pool, isFinished } = usePool();

  return (
    <div>
      <Title>{distribution.title || "DISTRIBUTION"}</Title>

      <ListItem label="Distribution">
        <DistributionType distribution={distribution} token={token} />
      </ListItem>

      {distribution.vesting && (
        <ListItem label="Vesting">{distribution.vesting}</ListItem>
      )}

      <div className="mt-3">
        {distribution.type === "claim_us" && distribution.claimerAddress ? (
          (distribution.network || "MATIC") === "MATIC" ? (
            <Claimer token={token} distribution={distribution} />
          ) : (
            <div>
              <p>
                Tokens are distributed on {distribution.network} network. You
                should go to the claim page and change the network to{" "}
                {distribution.network} in your wallet.
              </p>
              <Link href={`/pool/${pool.id}/claim`}>
                <a>Claim page</a>
              </Link>
            </div>
          )
        ) : (
          <ClaimTable
            total={poolBalance}
            token={token}
            distribution={distribution}
          />
        )}
      </div>
    </div>
  );
}

import BN from "bn.js";
import * as React from "react";
import Panels from "~common/Panels";
import { Distribution, PoolToken } from "../../types";
import { DistributionSection } from "./DistributionSection";

export function DistributionTabs({
  distribution,
  token,
  poolBalance,
}: {
  distribution: Distribution | Distribution[];
  token: PoolToken;
  poolBalance: BN;
}) {
  const distributions = Array.isArray(distribution)
    ? distribution
    : [distribution];

  if (distributions.length === 1) {
    return (
      <DistributionSection
        distribution={distributions[0]}
        token={token}
        poolBalance={poolBalance}
      />
    );
  }

  return (
    <Panels
      tabs={distributions.map((distr) => ({
        label: distr.title,
        content: (
          <DistributionSection
            distribution={distr}
            token={token}
            poolBalance={poolBalance}
          />
        ),
      }))}
    />
  );
}

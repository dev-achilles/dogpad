import * as React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Distribution, PoolToken } from "../../types";

export function DistributionType({
  distribution,
  token,
}: {
  distribution: Distribution;
  token: PoolToken;
}) {
  if (distribution.type === "airdrop_them") {
    return <span>Airdropped by {token.name} team</span>;
  } else if (distribution.type === "claim_them") {
    return (
      <span>
        Claimable on{" "}
        {distribution.claimUrl ? (
          <a href={distribution.claimUrl}>
            {token.name}'s platform{" "}
            <FaExternalLinkAlt className="inline ml-1" />
          </a>
        ) : (
          <>{token.name}'s platform </>
        )}
      </span>
    );
  } else if (distribution.type === "airdrop_us") {
    return <span>Airdropped by BlokPad team</span>;
  } else if (distribution.type === "claim_us") {
    return <span>Claimed on BlokPad</span>;
  } else if (distribution.type === "mint_them") {
    return <span>Minted</span>;
  }

  return null;
}

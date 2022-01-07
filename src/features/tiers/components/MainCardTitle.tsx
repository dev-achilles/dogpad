import { CardTitle } from "~common/UI";
import * as React from "react";
import { getAddressUrl } from "~utils";
import { chainToExplorerLabel } from "@trustpad/launchpad";

export function MainCardTitle({ address }: { address: string }) {
  return (
    <CardTitle>
      <div className="flex items-center justify-between">
        <span>Stake for IDO Participation</span>
        <a
          href={getAddressUrl(address, "POLY")}
          target="_blank"
          rel="noreferrer"
        >
          <chainToExplorerLabel.POLY className={`h-6 inline`} />
        </a>
      </div>
    </CardTitle>
  );
}

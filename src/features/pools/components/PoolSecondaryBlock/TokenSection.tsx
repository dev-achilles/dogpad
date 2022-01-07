import { usePool, useSaleRate, usePriceConverters } from "@trustpad/launchpad";
import BN from "bn.js";
import * as React from "react";
import { TMain } from "~common/UI";
import { ZERO_BN } from "~config/constants";
import { fNum } from "~utils";
import { Chain } from "../../../../types";
import { PoolToken } from "../../types";
import { AddressWithLink } from "./AddressWithLink";
import { ListItem } from "./InfoListItem";
import { Title } from "./UI";

// @ts-expect-error
const chain2TokenType: Record<Chain, string> = {
  BSC: "BEP-20",
  ETH: "ERC-20",
  POLY: "Polygon",
  SOL: "SOL",
  DOT: "DOT",
  ADA: "ADA",
};

export function TokenSection() {
  const {
    pool: { token },
  } = usePool();
  const { tokensToCurrency } = usePriceConverters();

  return (
    <div>
      <Title>TOKEN</Title>

      <ul>
        <ListItem label="Token">
          <TMain>
            {token.name} {token.symbol && `(${token.symbol})`}
          </TMain>
        </ListItem>
        <ListItem label="Type">
          {token.type || chain2TokenType[token.chain]}
        </ListItem>

        <TotalSupply token={token} />

        <InitialSupply token={token} tokensToCurrency={tokensToCurrency} />

        {token.listingTime && (
          <ListItem label="Token Listing">{token.listingTime}</ListItem>
        )}
      </ul>

      {token.address && (
        <AddressWithLink address={token.address} chain={token.chain} />
      )}

      {Object.keys(token.addresses || {}).map((chain) => (
        <AddressWithLink
          key={chain}
          address={token.addresses[chain]}
          chain={chain}
        />
      ))}

      {token.burnAddress && (
        <AddressWithLink address={token.burnAddress} label="Burn address" />
      )}
    </div>
  );
}

function TotalSupply({ token }: { token: PoolToken }) {
  if (token.totalSupplyString) {
    return <ListItem label="Total Supply">{token.totalSupplyString}</ListItem>;
  }
  if (token.totalSupply.gt(ZERO_BN)) {
    return (
      <ListItem label="Total Supply">
        {fNum(token.totalSupply)} {token.symbol}
      </ListItem>
    );
  }

  return null;
}

function InitialSupply({
  token,
  tokensToCurrency,
}: {
  token: PoolToken;
  tokensToCurrency: (v: BN, r: number) => BN;
}) {
  if (token.initialSupplyString) {
    return (
      <ListItem label="Initial Supply">{token.initialSupplyString}</ListItem>
    );
  }
  if (token.initialSupply?.gtn(0)) {
    return (
      <ListItem label="Initial Supply">
        <TMain>
          {fNum(token.initialSupply)} {token.symbol}
        </TMain>
        , market cap{" "}
        <TMain>
          ${fNum(tokensToCurrency(token.initialSupply, token.listingRate), 0)}
        </TMain>
      </ListItem>
    );
  }

  return null;
}

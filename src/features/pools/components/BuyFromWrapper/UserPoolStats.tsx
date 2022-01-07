import {
  NftSale,
  usePool,
  useUser,
  useUserPoolContribution,
  useUserPoolContributionNFT,
} from "@trustpad/launchpad";
import { isNFTSale } from "@trustpad/launchpad/dist/pool/utils";
import BN from "bn.js";
import React from "react";
import { FaCoins, FaShapes } from "react-icons/fa";
import { TMain } from "~common/UI";
import { ItemsBalance } from "~features/pools/components/BuyNftForm/ItemsBalance";
import { fNum } from "~utils";

export function UserPoolStats() {
  const { pool } = usePool();
  const { token, fundToken, sale } = pool;
  const { account } = useUser();

  if (!account) {
    return null;
  }

  return isNFTSale(sale) ? (
    <NFTBalance sale={sale} currencySymbol={fundToken.symbol} />
  ) : (
    <TokensBalance symbol={token.symbol} currencySymbol={fundToken.symbol} />
  );
}

function TokensBalance({
  symbol,
  currencySymbol,
}: {
  symbol: string;
  currencySymbol: string;
}) {
  const { contributionCurrency, poolBalance } = useUserPoolContribution();

  if (contributionCurrency.eqn(0)) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div>
        <FaCoins className="inline mr-1" /> Your pool share:{" "}
        <TMain>
          {fNum(poolBalance)} {symbol}
        </TMain>
      </div>
      <Contribution symbol={currencySymbol} value={contributionCurrency} />
    </div>
  );
}

function NFTBalance({
  sale,
  currencySymbol,
}: {
  sale: NftSale;
  currencySymbol: string;
}) {
  const { contributionCurrency, poolBalance } = useUserPoolContributionNFT();

  if (contributionCurrency.eqn(0)) {
    return null;
  }

  return (
    <div className="space-y-3">
      <ItemsBalance balance={poolBalance} items={sale.inventory} />{" "}
      <Contribution symbol={currencySymbol} value={contributionCurrency} />
    </div>
  );
}

function Contribution({ symbol, value }: { symbol: string; value: BN }) {
  return (
    <div>
      <FaShapes className="inline mr-1" /> Your contribution:{" "}
      <TMain>
        {fNum(value)} {symbol}
      </TMain>
    </div>
  );
}

import { usePool, useSaleRate } from "@trustpad/launchpad";
import * as React from "react";
import { usePriceCoinGecko } from "~common/hooks/usePriceCoinGecko";
import { toEthN } from "~utils";
import { Chain } from "../../../../types";
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

export function PriceSection() {
  const {
    pool: { token, sale },
  } = usePool();
  const prices = usePriceCoinGecko(token.coingeckoId);
  const { currencyPerToken } = useSaleRate();

  return (
    <div>
      <Title>PRICE</Title>

      <ul>
        {sale.rate && (
          <ListItem label="Listing Price">
            ${toEthN(currencyPerToken, 6)}
          </ListItem>
        )}

        {prices && sale.rate && (
          <PriceList
            label="ATH Price"
            price={prices.athPrice}
            initPrice={1 / sale.rate}
          ></PriceList>
        )}

        {prices && sale.rate && (
          <PriceList
            label="Current Price"
            price={prices.price}
            initPrice={1 / sale.rate}
          ></PriceList>
        )}
      </ul>
    </div>
  );
}

function PriceList({
  label,
  initPrice,
  price,
}: {
  label: string;
  initPrice: number;
  price: number;
}) {
  let isProfit = price / initPrice >= 1;
  return (
    <ListItem label={label}>
      <div className={` ${isProfit ? " text-green-500" : " text-red-500"} `}>
        ${price.toFixed(3)} ({`${isProfit ? "+" : ""}`}
        {((100 * (price - initPrice)) / initPrice).toFixed(2)}%)
      </div>
    </ListItem>
  );
}

import { TMain } from "~common/UI";
import { ZERO_BN } from "~config/constants";
import * as React from "react";
import { capitalize, fNum, toEth, toWeiBN } from "~utils";
import { Token } from "../../../../types";
import {
  usePool,
  useSaleRate,
  useSaleTimeline,
  usePriceConverters,
} from "~features/pools";
import { PoolToken, Sale, SaleStatus } from "../../types";
import { getHardCap } from "../../utils";
import { ListItem } from "./InfoListItem";
import { MaxContribution } from "./MaxContribution";
import { Title } from "./UI";

export function SaleSection() {
  const {
    pool: { sale, token, fundToken, access },
    isFinished,
  } = usePool();

  const { start, end, registerStart, registerEnd, fcfsStart } =
    useSaleTimeline();

  function getMinAllocation() {
    if (sale.limits === null) {
      return "TBA";
    }
    if (sale.limits?.min?.gtn(0)) {
      return `${toEth(sale.limits?.min, 4)} ${fundToken.symbol}`;
    }
    return "not limited";
  }

  return (
    <div className="space-y-3">
      <Title>POOL DETAILS</Title>

      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="md:w-1/2">
          <ul>
            <ListItem label="Access Type">
              {sale.isVip
                ? "BLACK"
                : sale.isTiered
                ? "Levels"
                : access === "levels_fcfs"
                ? "Levels FCFS"
                : capitalize(access)}
            </ListItem>
            <ListItem label="Hard Cap">{getHardCap(sale)}</ListItem>

            {!(isFinished && !sale.rate) && (
              <PoolRateItem sale={sale} token={token} fundToken={fundToken} />
            )}

            <ListingPrice sale={sale} token={token} fundToken={fundToken} />

            {sale.limits?.min?.gt(ZERO_BN) && (
              <ListItem label="Min. contribution">
                {getMinAllocation()}
              </ListItem>
            )}
          </ul>
        </div>

        <div className="md:w-1/2">
          <ul>
            <ListItem label="Start">
              {start ? `${start.format("D MMM, HH:mm a")} UTC` : "TBA"}
            </ListItem>
            {start &&
              (end ? (
                <ListItem label="End">
                  {end.format("D MMM, HH:mm a")} UTC
                </ListItem>
              ) : (
                <ListItem label="End">TBA</ListItem>
              ))}
            {registerStart && sale.status < SaleStatus.open && (
              <>
                <ListItem label="Registration Start">
                  {registerStart.format("D MMM, HH:mm a")} UTC
                </ListItem>
                <ListItem label="Registration End">
                  {registerEnd.format("D MMM, HH:mm a")} UTC
                </ListItem>
              </>
            )}
            {fcfsStart && (
              <ListItem label="FCFS Opens">
                {fcfsStart.format("D MMM, HH:mm a")} UTC ({sale.fcfsDuration}h
                before the end)
              </ListItem>
            )}
          </ul>
          <ul className="list-disc list-inside"></ul>
        </div>
        <div>
          <MaxContribution />
        </div>
      </div>
    </div>
  );
}

function PoolRateItem({
  sale,
  token,
  fundToken,
}: {
  sale: Sale;
  token: PoolToken;
  fundToken: Token;
}) {
  const { tokensPerCurrency, currencyPerToken } = useSaleRate();
  const { currencyToUsd, usdToCurrency } = usePriceConverters();

  if (!sale.rate) {
    return (
      <ListItem label="Swap Rate">
        <TMain>TBA</TMain>
      </ListItem>
    );
  }

  if (sale.wholeTokens) {
    const usdValue =
      fundToken.price?.usd === 1
        ? ""
        : `($${
            sale.fixedUsdPrice || fNum(currencyToUsd(currencyPerToken), 0)
          })`;
    return (
      <ListItem label="Swap Rate">
        <TMain>
          {fNum(
            sale.fixedUsdPrice
              ? usdToCurrency(sale.fixedUsdPrice)
              : currencyPerToken
          )}{" "}
          {fundToken.symbol} {usdValue}
        </TMain>{" "}
        per <TMain>1 {token.symbol}</TMain>
      </ListItem>
    );
  }

  return (
    <ListItem label="Swap Rate">
      <TMain>
        {fNum(tokensPerCurrency)} {token.symbol}
      </TMain>{" "}
      per <TMain>1 {fundToken.symbol}</TMain>
    </ListItem>
  );
}

function ListingPrice({
  sale,
  token,
  fundToken,
}: {
  sale: Sale;
  token: PoolToken;
  fundToken: Token;
}) {
  const { tokensToUsd } = usePriceConverters();
  if (!token.listingRate) {
    return null;
  }

  return (
    <ListItem label="Listing Price">
      <TMain>
        {fNum(token.listingRate, 4)} {token.symbol}
      </TMain>{" "}
      per <TMain>1 {fundToken.symbol}</TMain> ($
      {fNum(tokensToUsd(toWeiBN("1"), 1 / token.listingRate), 6)})
    </ListItem>
  );
}

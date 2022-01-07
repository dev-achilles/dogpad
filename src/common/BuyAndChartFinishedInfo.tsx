import React from "react";
import { Chain } from "../types";
import { BoggedChartLink } from "./ui/BoggedChartLink";
import {
  BuyApeSwapButton,
  BuyPancakeSwapButton,
  BuyQuickSwapButton,
  BuyUniSwapButton,
} from "./ui/BuyButtons";
import { LiveChartLink } from "./ui/LiveChartLink";

export function PancakeChartFinishedInfo({
  address,
  pairAddress,
  symbol,
  chain,
  swapOn = "PANCAKE",
}: {
  address?: string;
  pairAddress?: string;
  chain?: Chain;
  symbol: string;
  swapOn?: "APE" | "PANCAKE";
}) {
  return (
    <div className="flex space-x-3 items-center justify-center">
      {address &&
        (swapOn === "PANCAKE" ? (
          <BuyPancakeSwapButton address={address} symbol={symbol} />
        ) : swapOn === "APE" ? (
          <BuyApeSwapButton address={address} symbol={symbol} />
        ) : null)}
      {(!chain || chain == "BSC") && !pairAddress && address && (
        <BoggedChartLink address={address} />
      )}
      {pairAddress && (!chain || chain !== "BSC") && (
        <LiveChartLink pairAddress={pairAddress} />
      )}
    </div>
  );
}

export function UniswapChartFinishedInfo({
  address,
  pairAddress,
  symbol,
}: {
  address?: string;
  pairAddress?: string;
  symbol: string;
}) {
  return (
    <div className="flex space-x-3 items-center justify-center">
      {address && <BuyUniSwapButton address={address} symbol={symbol} />}
      {pairAddress && <LiveChartLink pairAddress={pairAddress} chain="ETH" />}
    </div>
  );
}

export function QuickswapChartFinishedInfo({
  address,
  pairAddress,
  symbol,
}: {
  address?: string;
  pairAddress?: string;
  symbol: string;
}) {
  return (
    <div className="flex space-x-3 items-center justify-center">
      {address && <BuyQuickSwapButton address={address} symbol={symbol} />}
      {pairAddress && <LiveChartLink pairAddress={pairAddress} chain="POLY" />}
    </div>
  );
}

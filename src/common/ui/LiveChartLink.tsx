import React from "react";
import { Button } from "react-bootstrap";
import chartImg from "/src/common/ui/linechart.png";
import { Chain } from "../../types";
import { BLOK } from "~config/tokens";

const BASE_URL = {
  BSC: "https://www.dextools.io/app/pancakeswap/pair-explorer/",
  ETH: "https://www.dextools.io/app/uniswap/pair-explorer/",
  POLY: "https://www.dextools.io/app/polygon/pair-explorer/",
};

export function LiveChartLink({
  pairAddress = BLOK.pairAddress,
  label = "LIVE CHART",
  chain = "POLY",
}: {
  pairAddress?: string;
  label?: string;
  chain?: Chain;
}) {
  return (
    <Button
      title="LIVE CHART"
      variant="outline-primary"
      href={`${BASE_URL[chain]}${pairAddress}`}
      target="_blank"
      className="no-hover border-main font-black rounded-3xl border-2	text-pink text-sm bg-black md:bg-transparent"
    >
      <img src={chartImg.src} className="inline mr-1" /> {label || "Live Chart"}
    </Button>
  );
}

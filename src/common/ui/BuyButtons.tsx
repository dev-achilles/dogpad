import React from "react";
import { Button } from "react-bootstrap";
import { getTradeUrl } from "~utils";
import { TOKEN_ADDRESS } from "~config/addresses";
import quickswapImg from "./quickswap.png";
import uniswapImg from "./uniswap.png";
import pancakeImg from "./pancakeswap.svg";
import smallBlokImg from "./small_blok_nav.png";
import apeswapImg from "./apeswap.svg";

export { pancakeImg };

export function BuyPancakeSwapButton({
  address = TOKEN_ADDRESS,
  symbol = "BLOK",
}) {
  return (
    <Button
      title="Buy on PancakeSwap"
      variant="main"
      href={getTradeUrl(address, "CAKE")}
      target="_blank"
      className="no-hover rounded-lg special-button flex items-center "
    >
      <span className="special-button-text pr-0.5">BUY</span>
      <img src={smallBlokImg.src} className="h-5" />{" "}
    </Button>
  );
}

export function BuyApeSwapButton({
  address,
  symbol,
}: {
  address: string;
  symbol: string;
}) {
  return (
    <Button
      title="Buy on ApeSwap"
      variant="main"
      href={getTradeUrl(address, "APE")}
      target="_blank"
      className="btn-sm py-2 no-hover dex-button flex items-center"
    >
      <img src={apeswapImg.src} alt="ApeSwap" className="h-6 inline mr-1" />
      {symbol}
    </Button>
  );
}

export function BuyUniSwapButton({
  address,
  symbol,
}: {
  address: string;
  symbol: string;
}) {
  return (
    <Button
      title="Buy on Uniswap"
      variant="main"
      href={getTradeUrl(address, "UNISWAP")}
      target="_blank"
      className="btn-sm py-2 no-hover dex-button flex items-center"
    >
      <img src={uniswapImg.src} alt="UniSwap" className="h-6 inline" />
      {symbol}
    </Button>
  );
}

export function BuyQuickSwapButton({
  address,
  symbol,
}: {
  address: string;
  symbol: string;
}) {
  return (
    <Button
      title="Buy on QuickSwap"
      variant="main"
      href={getTradeUrl(address, "QUICK")}
      target="_blank"
      className="btn-sm py-2 no-hover dex-button flex items-center"
    >
      <img src={quickswapImg.src} alt="QuickSwap" className="h-6 inline" />
      {symbol}
    </Button>
  );
}

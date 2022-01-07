import { getTokenPriceUsd } from "~features/pools/utils";
import { Token } from "../types";
import { polyImg, usdtImg, blokImg } from "./images";

export const USDT: Token = {
  network: "POLY",
  address:
    process.env.NEXT_PUBLIC_NETWORK === "live"
      ? "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
      : "0x77739ac905a0defbab5129dcb680a8e32cb4fb7d",
  name: "USDT",
  symbol: "USDT",
  imageSrc: usdtImg.src,
  decimals: 6,
  price: { usd: 1 },
  priceRefresher: () => Promise.resolve(1),
};
export const MATIC: Token = {
  network: "POLY",
  address: "",
  name: "MATIC",
  symbol: "MATIC",
  imageSrc: polyImg.src,
  decimals: 18,
  price: { usd: 1 },
  priceRefresher: () => getTokenPriceUsd(),
};
export const BLOK: Token = {
  network: "POLY",
  address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
  name: "Bloktopia",
  symbol: "BLOK",
  imageSrc: blokImg.src,
  decimals: 18,
  price: { usd: 0.12 },
  pairAddress: process.env.NEXT_PUBLIC_PAIR_ADDRESS,
  priceRefresher: () => getTokenPriceUsd("bloktopia"),
};

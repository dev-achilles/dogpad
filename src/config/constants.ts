import BN from "bn.js";
import { toBN, toWei } from "web3-utils";

export const ZERO_BN = new BN("0");
// Used to divide big numbers, like currency / tokens
export const DEC_NORM = new BN("10").pow(new BN("18"));

export const IS_LIVE_NETWORK = process.env.NEXT_PUBLIC_NETWORK === "live";

export const TRUSTPAD_DECIMALS = 18;

export const ANIMATION_ENABLED = !process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS;

export const TWITTER_URL = "https://twitter.com/bloktopia";
export const TELEGRAM_URL = "https://t.me/OfficialBLOKPADChat";
export const TELEGRAM_ANNO_URL = "https://t.me/OfficialBLOKPADAnn";
export const MEDIUM_URL = "https://medium.com/@bloktopia";

export const TRADE_URLS = {
  okex: "https://www.okex.com/markets/spot-info/blok-usdt",
  kucoin: "https://trade.kucoin.com/BLOK-USDT",
  quickswap:
    "https://quickswap.exchange/#/swap?outputCurrency=0x229b1b6c23ff8953d663c4cbb519717e323a0a84",
};

export const APPLY_FORM = "";

export const fetchIntervalsMs = {
  init: 10 * 60 * 1000,
  regular: 2 * 60 * 1000,
};

export const BSC_BLOCK_TIME = 3;
export const BLOCKS_PER_DAY = 28800;
export const BLOCKS_PER_YEAR = new BN((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000

export const BURN_ADDRESS = "0x000000000000000000000000000000000000dEaD";

export const APPROVE_VALUE = toBN(toWei("1000000000000000000"));

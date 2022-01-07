export { debug, debugState } from "./debug";
export * from "./time";

import { utils } from "@trustpad/launchpad";
import {
  multicallTransformed,
  multicallv2,
} from "@trustpad/launchpad/dist/shared/utils/multicall";

export { multicallv2, multicallTransformed };
export const {
  call,
  fNum,
  getTimeDiffString,
  getTimeDiff,
  toFixedNumber,
  denormalizeDecimals,
  addressShort,
  normalizeDecimals,
  currencyToTokens,
  tokensToCurrency,
  getAddressUrl,
  isValidValue,
  getTradeUrl,
  toWeiBN,
  toEth,
  toEthN,
  getTxUrl,
  toWei,
  getTokenUrl,
  getApr,
  capitalize,
  normalize,
} = utils;

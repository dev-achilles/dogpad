import { SaleStatus } from "@trustpad/launchpad";
import { PoolConfig } from "~features/pools/types";
import { USDT } from "~config/tokens";
import React from "react";
import { toWeiBN } from "~utils";
import img from "./images/unknown.png";

export const tokenId: PoolConfig = {
  // id is used in URL
  id: "tokenid",
  // public, seed or private
  access: "public",
  fundToken: USDT,
  kyc: true,
  sale: {
    address: "",
    tokensForSale: toWeiBN(0),
    // Format: "2021-11-01T12:00:00.000Z", leave empty for TBA
    startDate: "",
    // Empty=TBA, tokens per currency
    rate: 0,
    durationHours: 6,
    hasWhitelist: true,
    isTiered: true,
    // No need to touch:
    participants: 0,
    tokensSold: toWeiBN(0),
    raised: toWeiBN(0),
    baseAllocation: toWeiBN(0),
    status: SaleStatus.static,
  },
  token: {
    // BSC, ETH, DOT, SOL, ADA, POLY
    chain: "BSC",
    address: "",
    name: "TokenName",
    symbol: "",
    imageSrc: img.src,
    listingTime: "TBA",
    decimals: 18,
    listingRate: 0,
    initialSupply: toWeiBN(0),
    totalSupply: toWeiBN(0),
  },
  distribution: {
    type: "claim_us",
    vesting: "",
  },
  social: {
    website: "",
    twitter: "",
    telegram: "",
    telegramAnno: "",
    medium: "",
    github: "",
    whitepaper: "",
    announcement: "",
  },
  description: <p>Fill me</p>,
};

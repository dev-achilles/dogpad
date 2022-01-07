import { NftPoolConfig, SaleStatus } from "@trustpad/launchpad";
import React from "react";
import { USDT } from "~/config/tokens";
import { toWeiBN } from "~/utils";

export const tokenId: NftPoolConfig = {
  // id is used in URL
  id: "tokenid",
  // public, seed or private
  access: "public",
  fundToken: USDT,
  isNft: true,
  sale: {
    address: "",
    tokensForSale: toWeiBN(0),
    // Format: "2021-09-10T12:00:00.000Z", leave empty for TBA
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
    inventory: [
      {
        id: "motorcycle",
        name: "Motorcycle",
        image: "",
        supply: 50,
        totalSupply: 0,
        price: toWeiBN(200),
      },
    ],
  },
  token: {
    // BSC, ETH, DOT, SOL, ADA, POLYGON
    chain: "BSC",
    address: "",
    name: "TokenName",
    symbol: "",
    imageSrc: "/tokens/unknown.png",
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

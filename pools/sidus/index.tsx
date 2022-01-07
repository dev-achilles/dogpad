import { SaleStatus } from "@trustpad/launchpad";
import { TMain } from "~common/UI";
import { PoolConfig } from "~features/pools/types";
import { USDT } from "~config/tokens";
import React from "react";
import { toWeiBN } from "~utils";
import img from "./sidus.jpg";
import logoImg from "./logo.svg";
import heroImg from "./hero.png";
import { Desc } from "~features/pools/components/PoolDescription";
import { UniswapChartFinishedInfo } from "~common/BuyAndChartFinishedInfo";

export const sidus: PoolConfig = {
  // id is used in URL
  id: "sidus",
  // public, seed or private
  access: "public",
  fundToken: USDT,
  kyc: true,
  sale: {
    address: "0x78dac5a1af0d154c14c57b2c0ace2052ce6ae474",
    tokensForSale: toWeiBN("2750275"),
    startDate: "2021-12-14T23:00:00.000Z",
    rate: 5.50055,
    rateString: "1 SIDUS = $0.0018, 1 SENATE = $0.18",
    durationHours: 10,
    hasWhitelist: true,
    isTiered: true,
    participants: 0,
    tokensSold: toWeiBN("2750275"),
    raised: toWeiBN("500000"),
    baseAllocation: toWeiBN("144.6371"),
    status: 5,
    levelsOpenAll: false,
    isVip: false,
    isPublic: false,
    fcfsMultiplier: 0,
    minBaseAllocation: toWeiBN("0"),
    reachedMinBaseAllocation: false,
    limits: {
      min: toWeiBN("0"),
      max: toWeiBN("50"),
    },
    registerDate: "2021-12-12T22:00:00.000Z",
    registerDuration: 42,
    fcfsDuration: 1,
    totalWeights: 18994,
  },
  finishedInfo: (
    <>
      <UniswapChartFinishedInfo
        symbol="SIDUS"
        address="0x549020a9cb845220d66d3e9c6d9f9ef61c981102"
        pairAddress="0x549020a9cb845220d66d3e9c6d9f9ef61c981102"
      />
      <UniswapChartFinishedInfo
        symbol="SENATE"
        address="0x34be5b8c30ee4fde069dc878989686abe9884470"
        pairAddress="0x34be5b8c30ee4fde069dc878989686abe9884470"
      />
    </>
  ),
  token: {
    // BSC, ETH, DOT, SOL, ADA, POLY
    chain: "ETH",
    address: "",
    name: "SIDUS + SENATE",
    symbol: "SIDUS + SENATE",
    imageSrc: img.src,
    listingTime: "15:15 UTC - SIDUS/USDT & SENATE/USDT Gate listing",
    decimals: 18,
    listingRate: 0,
    listingPrice: (
      <>
        SIDUS <TMain>$0.0018</TMain>, SENATE <TMain>$0.18</TMain>
      </>
    ),
    initialSupplyString: (
      <>
        Initial market cap for each <TMain>$768 000</TMain>
      </>
    ),
    totalSupplyString: "30 000 000 000 SIDUS + 300 000 000 SENATE",
    initialSupply: toWeiBN(8448844.884),
    totalSupply: toWeiBN(30_000_000_000),
  },
  distribution: [
    {
      title: "SIDUS",
      type: "claim_us",
      network: "ETH",
      symbol: "SIDUS",
      vesting: "10% at TGE, 10% monthly since the 2nd month",
      // SIDUS
      claimerAddress: "0x94A15faBa48264572670f75aad1eF5609947a81D",
      schedule: {
        "2021-12-15T15:30:00.000Z": 10,
        "2022-01-15T15:30:00.000Z": 10,
        "2022-02-15T15:30:00.000Z": 10,
        "2022-03-15T15:30:00.000Z": 10,
        "2022-04-15T15:30:00.000Z": 10,
        "2022-05-15T15:30:00.000Z": 10,
        "2022-06-15T15:30:00.000Z": 10,
        "2022-07-15T15:30:00.000Z": 10,
        "2022-08-15T15:30:00.000Z": 10,
        "2022-09-15T15:30:00.000Z": 10,
      },
    },
    {
      title: "SENATE",
      type: "claim_us",
      network: "ETH",
      vesting: "10% at TGE, 10% monthly since the 2nd month",
      claimerAddress: "0xb233a98572e23312da9139c7f554991a3167cf41",
      symbol: "SENATE",
      schedule: {
        "2021-12-15T15:30:00.000Z": 10,
        "2022-01-15T15:30:00.000Z": 10,
        "2022-02-15T15:30:00.000Z": 10,
        "2022-03-15T15:30:00.000Z": 10,
        "2022-04-15T15:30:00.000Z": 10,
        "2022-05-15T15:30:00.000Z": 10,
        "2022-06-15T15:30:00.000Z": 10,
        "2022-07-15T15:30:00.000Z": 10,
        "2022-08-15T15:30:00.000Z": 10,
        "2022-09-15T15:30:00.000Z": 10,
      },
    },
  ],
  images: {
    label: logoImg.src,
    hero: heroImg.src,
  },
  social: {
    website: "https://sidusheroes.com/",
    twitter: "https://twitter.com/galaxy_sidus",
    telegram: "https://t.me/sidus_heroes",
    telegramAnno: "https://t.me/sidus_heroes_channel",
    medium: "",
    github: "",
    whitepaper: "",
    announcement: "",
  },
  descriptionShort: (
    <p>
      <TMain className="font-bold">
        SIDUS is the result of the biggest collaboration in the NFT space.
      </TMain>{" "}
      Three teams of professionals in different domains and a large number of
      their supporters came together to launch an AAA-level RPG game based on
      blockchain and crypto philosophy. SIDUS transports players to a world in
      which a major technological transformation has taken place. All living
      beings in SIDUS have become one with technology. Their characters,
      features and outlook on life have been predetermined by the tech-race they
      were born into. Inhabited by creatures striving for excellence and power,
      SIDUS has turned into a war-torn universe, full of chaos and endless
      clashes.
    </p>
  ),
  description: (
    <>
      <p>
        SIDUS is the result of the biggest collaboration in the NFT space. Three
        teams of professionals in different domains and a large number of their
        supporters came together to launch an AAA-level RPG game based on
        blockchain and crypto philosophy. SIDUS transports players to a world in
        which a major technological transformation has taken place. All living
        beings in SIDUS have become one with technology. Their characters,
        features and outlook on life have been predetermined by the tech-race
        they were born into. Inhabited by creatures striving for excellence and
        power, SIDUS has turned into a war-torn universe, full of chaos and
        endless clashes.
      </p>
      <div>
        <b>Two tokens are sold in one pool:</b> <br />
        <ul>
          <li>
            <b>SIDUS</b>, $0.0018 per token
          </li>
          <li>
            <b>SENATE</b>, $0.18 per token (used for governance)
          </li>
        </ul>
        You get 50/50 of each based on the amount you purchased. <br />
        <br />
        For example, buying a $500 allocation, will result in: <br />
        <ul>
          <li>
            $250 worth of <b>SIDUS</b> = 250 / $0.0018 = 138888,8 SIDUS
          </li>
          <li>
            $250 worth of <b>SENATE</b> = 250 / $0.18 = 1388,8 SENATE
          </li>
        </ul>
      </div>
    </>
  ),
};

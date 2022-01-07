import { chains } from "@trustpad/launchpad";
import {
  ChainContractRegistry,
  ChainNodes,
} from "@trustpad/launchpad/dist/LaunchpadProvider";
import { IS_LIVE_NETWORK } from "~config/constants";

export const defaultChain = chains.POLY;

export const registry: ChainContractRegistry = {
  137: {
    token: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    levelManager: {
      addresses: [process.env.LEVEL_MANAGER_ADDRESS],
      version: "v2",
    },
    levelStaking: {
      addresses: [process.env.NEXT_PUBLIC_TIERED_STAKING_ADDRESS],
      version: "v2",
    },
  },
  97: {
    token: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    levelManager: {
      addresses: [process.env.LEVEL_MANAGER_ADDRESS],
      version: "v2",
    },
    levelStaking: {
      addresses: [process.env.NEXT_PUBLIC_TIERED_STAKING_ADDRESS],
      version: "v2",
    },
  },
};

export const chainNodes: ChainNodes = {
  56: process.env.NEXT_PUBLIC_BSC_RPC,
  137: process.env.NEXT_PUBLIC_POLY_RPC,
};

export const chainsConfig = [
  IS_LIVE_NETWORK ? chains.BSC : chains.BSC_TEST,
  IS_LIVE_NETWORK
    ? {
        ...chains.ETH,
        urls: [
          `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
        ],
      }
    : {
        ...chains.ETH_ROPSTEN,
        urls: [
          `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID_TEST}`,
        ],
      },
  chains.POLY,
];

import { SupportedChainSymbol } from "@trustpad/launchpad";
import type { Contract } from "web3-eth-contract";

export type { Contract };
export type {
  GenericContractSendMethod,
  Token,
} from "@trustpad/launchpad/dist/types";
export type { PairContract, ERC20TokenContract } from "@trustpad/launchpad";

export type Chain = SupportedChainSymbol | "SOL" | "DOT" | "ADA" | "POLY";

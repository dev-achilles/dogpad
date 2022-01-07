import { useWeb3Provider } from "@trustpad/launchpad";
import { MetamaskEthereum } from "@trustpad/launchpad/dist/shared/hooks/useWeb3";
import { metamaskImg } from "assets";
import { PoolToken } from "~features/pools/types";
import * as React from "react";
import { Button } from "react-bootstrap";

const isMetaMask = (provider: any): provider is MetamaskEthereum =>
  typeof provider === "object" &&
  "isMetaMask" in provider &&
  provider.isMetaMask;

export function AddMetamaskTokenButton({ token }: { token: PoolToken }) {
  const { web3 } = useWeb3Provider();
  const provider = web3?.currentProvider;

  const address = token.address || token.addresses?.BSC;

  function watchToken() {
    if (!isMetaMask(provider)) return;

    const image =
      token.symbol === "TPAD"
        ? `https://trustpad.io/tokens/trustpad-200.png`
        : `https://trustpad.io${token.imageSrc}`;

    provider
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: address,
            symbol: token.symbol,
            decimals: token.decimals,
            image,
          },
        },
      })
      .catch((e) => console.error("Failed to watch the token", e));
  }

  if (!address || !isMetaMask(provider) || token.chain !== "BSC") {
    return null;
  }

  return (
    <Button
      variant="outline-light"
      size="sm"
      className="px-2 py-1"
      onClick={watchToken}
    >
      <img src={metamaskImg.src} alt="Metamask" className="h-5 inline" /> Add to
      Metamask
    </Button>
  );
}

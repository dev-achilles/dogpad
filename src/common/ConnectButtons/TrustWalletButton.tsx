import { useWeb3Provider } from "@trustpad/launchpad";
import React from "react";
import { Button } from "react-bootstrap";
import img from "./wallet-trustwallet.svg";

export function TrustWalletButton() {
  const { connectTrustWallet } = useWeb3Provider();

  return (
    <Button
      style={{ width: 180 }}
      variant="trustwallet"
      onClick={() => connectTrustWallet()}
      className="flex justify-center items-center"
    >
      <img src={img.src} alt="TrustWallet" className="inline-block h-4 mr-3" />
      <span>TrustWallet</span>
    </Button>
  );
}

import { useWeb3Provider } from "@trustpad/launchpad";
import React from "react";
import { Button } from "react-bootstrap";
import img from "./wallet-connect.svg";

export function WalletConnectButton() {
  const { connectWalletConnect } = useWeb3Provider();

  return (
    <Button
      style={{ width: 180 }}
      variant="walletconnect"
      onClick={() => connectWalletConnect()}
      className="flex justify-center items-center"
    >
      <img
        src={img.src}
        alt="WalletConnect"
        className="inline-block h-4 mr-3"
      />
      <span className="">WalletConnect</span>
    </Button>
  );
}

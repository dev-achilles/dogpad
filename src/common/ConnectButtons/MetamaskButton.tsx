import MetaMaskOnboarding from "@metamask/onboarding";
import { useUser, useWeb3Provider } from "@trustpad/launchpad";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import img from "./wallet-metamask.svg";

const ONBOARD_TEXT = "Install MetaMask";
const CONNECT_TEXT = "Metamask";
const CONNECTED_TEXT = "Connected";

export function MetamaskButton() {
  const { connectMetamask } = useWeb3Provider();
  const user = useUser();

  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (user.account) {
        setButtonText(CONNECTED_TEXT);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
      }
    }
  }, [user.account]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connectMetamask();
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <Button
      style={{ width: 180 }}
      variant="metamask"
      onClick={onClick}
      className="flex justify-center items-center"
    >
      <img src={img.src} alt="Metamask" className="w-6 mr-4 " />
      <span>{buttonText}</span>
    </Button>
  );
}

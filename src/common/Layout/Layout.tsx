import { useWeb3Provider } from "@trustpad/launchpad";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Footer } from "~common/Layout/Footer";
// import { blokPinkBlur } from "./pink_background_layer_blur.png";
import { ScrollTopButton } from "./ScrollTopButton";

function getErrorMessage(error: Error) {
  if (error?.name === "NoEthereumProviderError") {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error?.name === "UnsupportedChainIdError") {
    return "You're connected to an unsupported network.";
  } else if (
    error?.name === "UserRejectedRequestErrorInjected" ||
    error?.name === "UserRejectedRequestErrorWalletConnect"
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { error, isValidChain, targetChain } = useWeb3Provider();

  useEffect(() => {
    if (!isValidChain) {
      console.log("showing error", targetChain);
      toast.warn(
        `You're connected to an unsupported network. Please switch to ${targetChain.symbol}`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          closeButton: false,
          toastId: "invalidNetwork",
        }
      );
    } else {
      toast.dismiss("invalidNetwork");
    }
  }, [isValidChain, targetChain]);
  useEffect(() => {
    if (error) {
      toast.warn(getErrorMessage(error), {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
        toastId: "web3Error",
        closeButton: false,
      });
    } else {
      toast.dismiss("web3Error");
    }
  }, [error]);

  return (
    <div className="font-sans antialiased">
      <main className="relative mx-auto">{children}</main>

      <Footer />

      <ToastContainer />

      <ScrollTopButton />
    </div>
  );
}

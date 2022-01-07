import * as React from "react";
import ethImg from "./ethereum-logo-full.png";
import bscImg from "./binance_logo.png";
import dotImg from "./polkadot_logo_full.png";
import adaImg from "./cardano_logo_full.svg";
import polyImg from "./polygon_logo.png";

export function ChainLabel({ chain }: { chain: string }) {
  if (chain === "ETH") {
    return <img src={ethImg.src} alt="Ethereum" className="md:h-7 h-5" />;
  }
  if (chain === "BSC") {
    return (
      <img src={bscImg.src} alt="Binance Smart Chain" className="md:h-6 h-5" />
    );
  }
  if (chain === "DOT") {
    return <img src={dotImg.src} alt="Polkadot" className="md:h-6 h-5" />;
  }
  if (chain === "ADA") {
    return <img src={adaImg.src} alt="Cardano" className="md:h-6 h-5" />;
  }
  if (chain === "POLY") {
    return <img src={polyImg.src} alt="Polygon" className="md:h-6 h-5" />;
  }
  return null;
}

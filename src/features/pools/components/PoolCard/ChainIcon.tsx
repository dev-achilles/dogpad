import React from "react";
import { adaImg, bscImg, dotImg, ethImg, polyImg, solImg } from "./images";

export function ChainIcon({ chain }: { chain: string }) {
  if (chain === "ETH") {
    return (
      <div
        className="rounded-full h-7 w-7 flex items-center justify-center bg-opacity-70 bg-indigo-400 brand-shadow-sm"
        style={{ padding: 4 }}
      >
        <img src={ethImg.src} alt="Ethereum" className="h-full img-white" />
      </div>
    );
  }
  if (chain === "SOL") {
    return (
      <div
        className="rounded-full h-7 w-7 flex items-center justify-center bg-opacity-70 bg-solana brand-shadow-sm"
        style={{ padding: 6 }}
      >
        <img src={solImg.src} alt="Solana" className="h-full img-white" />
      </div>
    );
  }
  if (chain === "BSC") {
    return (
      <div
        className="rounded-full h-7 w-7 flex items-center justify-center bg-opacity-70 bg-acc brand-shadow-sm"
        style={{ padding: 2 }}
      >
        <img
          src={bscImg.src}
          alt="Binance Smart Chain"
          className="h-full img-white"
        />
      </div>
    );
  }
  if (chain === "DOT") {
    return (
      <div
        className="rounded-full h-7 w-7 flex items-center justify-center bg-opacity-70 bg-polkadot brand-shadow-sm"
        style={{ padding: 2 }}
      >
        <img src={dotImg.src} alt="PolkaDot" className="h-full img-white" />
      </div>
    );
  }
  if (chain === "ADA") {
    return (
      <div
        className="rounded-full h-7 w-7 flex items-center justify-center bg-opacity-70 bg-ada brand-shadow-sm"
        style={{ padding: 2 }}
      >
        <img src={adaImg.src} alt="Cardano" className="h-full img-white" />
      </div>
    );
  }
  if (chain === "POLY") {
    return (
      <div
        className="rounded-full h-8 w-8 flex items-center justify-center brand-shadow-sm"
        style={{ padding: 2 }}
      >
        <img src={polyImg.src} alt="Polygon" className="h-full" />
      </div>
    );
  }

  return null;
}

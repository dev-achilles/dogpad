import { Navbar } from "~common/Layout/Navbar";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import bscImg from "./images/bsc.svg";
import kucoinImg from "./images/kucoin.svg";
import quickImg from "./images/quick.svg";
import { TRADE_URLS } from "~config/constants";

export { BuyButton };

export function DefaultNavbar({
  onNavClick,
  pools = true,
  levels = true,
  staking = true,
}: {
  pools?: boolean;
  levels?: boolean;
  staking?: boolean;
  onNavClick?: (tab: string) => void;
}) {
  return (
    <Navbar>
      {pools && (
        <Link href="/#pools">
          <a
            href="#pools"
            className="nav-link text-white text-sm"
            onClick={() => onNavClick?.("pools")}
          >
            Pools
          </a>
        </Link>
      )}

      {levels && (
        <Link href="/levels">
          <a className="nav-link text-white text-sm">Levels</a>
        </Link>
      )}

      <Link href="/levels#faq">
        <a className="nav-link text-white text-sm">FAQ</a>
      </Link>

      <div className="flex justify-evenly flex space-x-3 md:ml-6">
        <BuyButton url={TRADE_URLS.okex} img={bscImg.src} />
        <BuyButton url={TRADE_URLS.quickswap} img={quickImg.src} />
        <BuyButton url={TRADE_URLS.kucoin} img={kucoinImg.src} />
      </div>
    </Navbar>
  );
}

function BuyButton({ url, img }: { url: string; img: string }) {
  return (
    <a
      title="Buy"
      href={url}
      target="_blank"
      className="btn-sm no-hover dex-button flex items-center justify-center p-0"
    >
      <img src={img} alt="Buy" className="" />
    </a>
  );
}

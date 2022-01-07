import { Jumbo } from "~common/Layout";
import { LiveChartLink } from "~common/ui/LiveChartLink";
import { TELEGRAM_ANNO_URL, TELEGRAM_URL, TRADE_URLS } from "~config/constants";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Countdown from "react-countdown";
import { getTokenUrl, getTradeUrl } from "~utils";
import styles from "./Landing.module.css";
import BlokLogo from "./blokpad_logo.png";
import BlokWordLogo from "./blokpad_word_logo.png";
import smallBlokImg from "~common/ui/small_blok_nav.png";
import { chainToExplorerLabel } from "@trustpad/launchpad";
import bscImg from "~common/Layout/images/footer_exchange_link_1.svg";
import quickImg from "~common/Layout/images/quick-pink.svg";
import kucoinImg from "~common/Layout/images/kucoin-pink.svg";
import { BLOK } from "~config/tokens";

export function Hero() {
  return (
    <Jumbo noSplash>
      <Row>
        <Col className="text-center">
          <div>
            <div className={styles.bg} />
            <div className={`${styles.bg} ${styles.bg2}`} />
          </div>
          <div className="flex justify-center items-center flex-col">
            <img src={BlokLogo.src} className="max-h-44 lg:max-h-80" />
            <img src={BlokWordLogo.src} className="max-h-8" />
          </div>

          <h1 className={styles.heroTitle}>New Launchpad on The BLOK</h1>

          <div className="lg:w-4/6 mx-auto">
            <p className={styles.heroDesc}>
              The Ultimate Launchpad for Bloktopians
            </p>

            <div className="flex md:flex-row flex-col flex-wrap justify-center items-center md:space-x-6 mt-6 font-Poppins font-black">
              {false && (
                <div>
                  <a href="" className="btnTelegram inline-flex items-center">
                    PROJECT APPLICATION
                  </a>
                </div>
              )}
              <div>
                <a
                  href={TELEGRAM_URL}
                  className="btnTelegram inline-flex items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </div>
              <div>
                <a
                  href={TELEGRAM_ANNO_URL}
                  className="btnTelegram inline-flex items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  Announcements
                </a>
              </div>
            </div>
            <div className="mt-3 flex space-x-6 items-center justify-center flex-wrap gap-3">
              <LiveChartLink />

              <BuyButton url={TRADE_URLS.okex} img={bscImg.src} />
              <BuyButton url={TRADE_URLS.quickswap} img={quickImg.src} />
              <BuyButton url={TRADE_URLS.kucoin} img={kucoinImg.src} />

              <Button
                title="Buy"
                variant="outline-primary"
                href={getTradeUrl(BLOK.address, "QUICK")}
                target="_blank"
                className="no-hover border-main font-black rounded-3xl border-2	text-pink flex justify-center  bg-black md:bg-transparent"
              >
                <span className="text-sm">BUY &nbsp;</span>
                <img
                  src={smallBlokImg.src}
                  alt="smallBlok"
                  className="h-5 inline  "
                />{" "}
              </Button>

              <Button
                title="BLOK on PolyScan"
                variant="outline-primary"
                href={getTokenUrl(BLOK.address, "POLY")}
                target="_blank"
                className="no-hover border-main font-black rounded-3xl border-2	text-pink text-sm bg-black md:bg-transparent"
              >
                <chainToExplorerLabel.POLY className="h-5 mr-1 inline" />{" "}
                Contract
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Jumbo>
  );
}

function Timer({ date, label }: { date: string | number; label: string }) {
  return (
    <div className="flex items-center flex-col py-6">
      <h4 className="font-semibold text-2xl font-Poppins tracking-wider">
        {label}
      </h4>
      <div className="mt-2 text-white">
        <Countdown date={date} renderer={renderer} daysInHours />
      </div>
    </div>
  );
}

function renderer({ days, hours, minutes, seconds, completed }) {
  if (completed) {
    return <span></span>;
  }

  return (
    <div className="flex items-start">
      <Piece label="Days">{String(days).padStart(2, "0")}</Piece>
      <Piece label="Hours">{String(hours).padStart(2, "0")}</Piece>
      <Piece label="Min">{String(minutes).padStart(2, "0")}</Piece>
      <Piece label="Sec" spacer={false}>
        {String(seconds).padStart(2, "0")}
      </Piece>
    </div>
  );
}

function Piece({
  label,
  spacer = true,
  children,
}: {
  label: string;
  spacer?: boolean;
  children: any;
}) {
  return (
    <div className="text-center">
      <div className="md:text-3xl text-2xl px-4 relative 2xl:text-4xl font-Ubuntu">
        <span className={spacer ? styles.value : ""}>{children}</span>{" "}
      </div>
      <div className="uppercase font-bold text-xs mt-1 font-serif">{label}</div>
    </div>
  );
}

function BuyButton({ url, img }: { url: string; img: string }) {
  return (
    <a title="Buy" href={url} target="_blank" className={styles.heroBuyLink}>
      <img src={img} alt="Buy" className="" />
    </a>
  );
}

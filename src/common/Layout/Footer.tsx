import BlokNavLogo from "./BlokPadHeader.svg";
import poweredByBlokImg from "./images/powered_by.png";
import poweredByTpadImg from "./images/trustpadLogo.svg";
import { quillAuditsImg } from "~common/Layout/images";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import { getAddressUrl } from "~utils";
import { TOKEN_ADDRESS } from "../../config/addresses";
import Image from "next/image";
import img from "./images/footer_exchange_link_1.svg";
import quickImg from "./images/quick_image_footer.svg";
import kucoinImg from "./images/kucoin_footer.svg";
import bscscanImg from "./images/bsc_pink.svg";
import { TRADE_URLS } from "~config/constants";

export function Footer() {
  return (
    <footer>
      {false && (
        <div className="text-center py-6 md:py-12 bg-dark2">
          <h2 className="text-2xl md:text-4xl mb-6 font-Poppins font-black">
            ....
          </h2>
          <div className="inline-block">
            <a href="#" className="btnTelegram">
              Apply to Launch
            </a>
          </div>
        </div>
      )}

      <div className="bg-dark2 py-12 relative">
        <Container>
          <div className="flex items-center flex-col md:flex-row space-y-12 md:space-y-0">
            <div className="md:w-1/3">
              <Link href="/">
                <a className="text-white mr-auto no-underline pr-4 flex items-center no-hover">
                  <div className="relative">
                    
                    <div className="pl-1 pt-1 flex items-center">
                      <span className="italic text-main">POWERED BY</span>
                      <a href="...." target="_blank">
                        .....
                      </a>
                    </div>
                  </div>
                </a>
              </Link>
            </div>

            <div className="md:w-1/3">
              <ul className="flex items-center justify-end space-x-4">
                <li>
                  <div className="bg-black bg-opacity-90 p-1 shadow-2xl brand-shadow-footer rounded">
                    <a
                      title="Buy"
                      href={TRADE_URLS.okex}
                      target="_blank"
                      className="btn-sm no-hover dex-button-footer flex items-center justify-center p-0"
                    >
                      <img src={img.src} alt="Logo" className="" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="bg-black bg-opacity-90 p-1 shadow-2xl brand-shadow-footer rounded">
                    <a
                      title="Buy"
                      href={TRADE_URLS.quickswap}
                      target="_blank"
                      className="btn-sm no-hover dex-button-footer flex items-center justify-center p-0"
                    >
                      <img src={quickImg.src} alt="Logo" className="" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="bg-black bg-opacity-90 p-1 shadow-2xl brand-shadow-footer rounded">
                    <a
                      title="Buy"
                      href={TRADE_URLS.kucoin}
                      target="_blank"
                      className="btn-sm no-hover dex-button-footer flex items-center justify-center p-0"
                    >
                      <img src={kucoinImg.src} alt="Logo" className="" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="bg-black bg-opacity-90 p-1 shadow-2xl brand-shadow-footer rounded">
                    <a
                      href={getAddressUrl(TOKEN_ADDRESS, "POLY")}
                      target="_blank"
                      className="btn-sm no-hover dex-button-footer flex items-center justify-center p-0"
                      rel="noreferrer"
                      title="BLOK on BscScan"
                    >
                      <img src={bscscanImg.src} alt="Logo" className="" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 md:text-right space-x-6 flex items-center justify-end">
              <h3 className="text-lg opacity-75">Audited by</h3>
              <div className="flex space-y-6 items-center flex-wrap flex-col">
                <a
                  href="/QuillAudits-TrustPad-Smart-Contract-Audit-Report.pdf"
                  target="_blank"
                >
                  
                </a>
              </div>
            </div>
          </div>

          <div className="text-xs text-secondary mt-12 ml-3">
            .....
          </div>

          <div className="flex justify-between items-center mt-6 -mb-6 flex-col-reverse md:flex-row">
            <div className="text-xs ml-3 text-secondary">
              © Copyright BlokPad {new Date().getFullYear()}. All rights
              reserved.
            </div>
            <div className="space-x-6">
              <Link href="/privacy">
                <a>Privacy Policy</a>
              </Link>
              <Link href="/tos">
                <a>Terms of use</a>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

import { SaleStatus, usePriceConverters } from "@trustpad/launchpad";
import { isNFTPool } from "@trustpad/launchpad/dist/pool/utils";
import { tpadLogoImg, unknownTokenImg } from "assets";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { SocialLinks } from "~common/components/SocialLinks";
import { usePriceCoinGecko } from "~common/hooks/usePriceCoinGecko";
import {
  usePool,
  useSaleBaseAllocation,
  useSaleTimeline,
} from "~features/pools";
import { SaleProgressBar } from "~features/pools/components/SaleProgressBar";
import { SaleRelativeTime } from "~features/pools/components/SaleRelativeTime";
import { DEFAULT_FORMAT, fNum } from "~utils";
import { getHardCap, getPoolLinkPath } from "../../utils";
import { KycOrRegisterButton } from "../KYCVerifyButton/KycOrRegisterButton";
import { PoolRate } from "./PoolRate";
import { getTokenSymbol } from "~features/pools/components/PoolCard/utils";

export function PoolCard() {
  const { pool, isSoldOut, isFinished } = usePool();
  const { access, sale, token } = pool;
  const { start } = useSaleTimeline();
  const { baseCurrencyAllocation, isApprox } = useSaleBaseAllocation();
  const { tokensToCurrency } = usePriceConverters();
  const prices = usePriceCoinGecko(pool.token.coingeckoId);

  return (
    <Card className="hover:shadow-xl hover:bg-gray-800 bg-dark2 border-mainDark h-full hover:-translate-y-2 transform transition relative overflow-hidden brand-shadow">
      <div className="absolute z-0 min-w-full transform scale-150 -bottom-16 -right-1/4 opacity-40 ">
        <img
          // src={tpadLogoImg.src}
          className="opacity-5 w-full h-full"
          alt="Bg"
        />
      </div>
      <Link href={getPoolLinkPath(pool)}>
        <a className="absolute top-0 left-0 h-full w-full z-10" />
      </Link>

      <Card.Body className="space-y-6 container mx-auto ">
        {pool.images.hero && (
          <div className="flex flex-wrap -mx-5 -my-6 ">
            <div className="w-full pb-6 ">
              <img
                src={pool.images.hero}
                className="h-48 w-full py-1 object-fill h-48 w-full"
                alt={token.name}
              />
            </div>
          </div>
        )}

        <div className="space-y-4 font-black">
          <div className="flex justify-start">
            <div className="relative h-20 w-20 overflow-hidden rounded-full flex items-center brand-shadow">
              <img
                className="w-full"
                src={token.imageSrc || unknownTokenImg.src}
                alt={token.name}
              />
            </div>
            <div className="flex flex-col pt-6">
              <h2 className="text-xl font-black flex justify-start pl-5">
                {token.name}
              </h2>
              <span className="text-pink leading-none text-xs pl-5">
                {getTokenSymbol(pool)}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <SocialLinks className="text-2xl space-x-6" social={pool.social} />
          </div>
        </div>

        <div className="space-y-3">
          {access !== "public" && (
            <div className="text-sm">
              Access:{" "}
              <span className="text-main">
                {access === "levels_fcfs" ? "levels FCFS" : access}
              </span>
            </div>
          )}
          {!isNFTPool(pool) && !(isFinished && !sale.rate) && (
            <div className="text-sm ">
              <span className="font-black">PRICE: &emsp;&nbsp; </span>
              <PoolRate pool={pool} />
            </div>
          )}
          <div className="text-sm ">
            <span className="font-black">START: &emsp;&nbsp;</span>
            <span className="text-main">
              {start ? `${start.format(DEFAULT_FORMAT)} UTC` : "TBA"}
            </span>
          </div>

          {sale.minBaseAllocation?.gtn(0) && (
            <div>
              <div className="text-sm mb-2 ">
                Min 1x allocation:{" "}
                <span className="text-main ">
                  ${fNum(tokensToCurrency(sale.minBaseAllocation))}
                </span>
              </div>
              <div className="text-sm ">⚠️ FCFS registration ⚠️</div>
            </div>
          )}

          <div className="mb-6 ">
            <SaleProgressBar
              topLeft={<SaleRelativeTime isSoldOut={isSoldOut} />}
            />
          </div>

          <div className="flex justify-between">
            <div>
              <span className="text-sm mb-0 font-black ">
                TOTAL RAISE &emsp;&nbsp;
              </span>{" "}
              <span className="text-pink">{getHardCap(sale)} </span>
            </div>

            {sale.status >= SaleStatus.register &&
              baseCurrencyAllocation.gtn(0) && (
                <div className="text-right">
                  <p className="text-sm mb-0">1x {isApprox && "(approx) "}=</p>
                  <p className="text text-main">
                    ${fNum(baseCurrencyAllocation, 2)}
                  </p>
                </div>
              )}

            {isFinished && prices && sale.rate && (
              <div className="text-right">
                <p className="text-sm mb-0">ATH X</p>
                <div
                  className={`text ${
                    prices.athPrice / (1 / sale.rate) >= 1
                      ? "bg-opacity-40 text-green-500"
                      : "bg-opacity-40 text-red-500"
                  } `}
                >
                  x{(prices.athPrice / (1 / sale.rate)).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>

        <KycOrRegisterButton pool={pool} center />
      </Card.Body>
    </Card>
  );
}

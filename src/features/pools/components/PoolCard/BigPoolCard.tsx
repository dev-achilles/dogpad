import { SaleStatus, usePriceConverters } from "@trustpad/launchpad";
import { isNFTPool } from "@trustpad/launchpad/dist/pool/utils";
import { unknownTokenImg } from "assets";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { SocialLinks } from "~common/components/SocialLinks";
import { usePool, useSaleTimeline } from "~features/pools";
import { SaleProgressBar } from "~features/pools/components/SaleProgressBar";
import { SaleRelativeTime } from "~features/pools/components/SaleRelativeTime";
import { DEFAULT_FORMAT, fNum } from "~utils";
import { getHardCap, getPoolLinkPath } from "../../utils";
import { BlackLevelBadge } from "../BlackLevelBadge";
import { StatusBadge } from "../StatusBadge";
import { ChainIcon } from "./ChainIcon";
import { PoolRate } from "./PoolRate";
import { getTokenSymbol } from "~features/pools/components/PoolCard/utils";
import { AddressWithLink } from "~features/pools/components/PoolSecondaryBlock/AddressWithLink";
import { KycOrRegisterButton } from "~features/pools/components/KYCVerifyButton";

export function BigPoolCard() {
  const { pool, isSoldOut, isFinished } = usePool();
  const { sale, token } = pool;
  const { start } = useSaleTimeline();
  const { tokensToCurrency } = usePriceConverters();

  return (
    <Card className="hover:bg-opacity-90 bg-dark2 h-full hover:-translate-y-2 transform transition relative overflow-hidden brand-shadow">
      <Link href={getPoolLinkPath(pool)}>
        <a className="absolute top-0 left-0 h-full w-full z-10" />
      </Link>

      <Card.Body className="px-24 py-12">
        <div className="flex gap-12">
          <div className="gap-6">
            <div className="h-28 w-28 overflow-hidden rounded-full flex items-center justify-center brand-shadow">
              <img
                className="w-full"
                src={token.imageSrc || unknownTokenImg.src}
                alt={token.name}
              />
            </div>

            <div className="w-24 mx-auto mt-8">
              <SocialLinks
                className="text-2xl"
                social={pool.social}
                itemClassName="w-1/2 text-center"
                linkClassName="flex justify-center py-1"
              />
            </div>
          </div>

          <div className="flex-grow space-y-4 mt-4">
            <div className="flex justify-between items-start">
              {pool.images.label ? (
                <div>
                  <img
                    src={pool.images.label}
                    alt={token.name}
                    className="h-8 mb-6"
                  />

                  <div className="flex gap-6 items-center">
                    <h2 className="text-xl leading-none mb-0 font-bold">
                      {token.name}
                    </h2>
                    <p className="leading-none text-main font-bold">
                      {getTokenSymbol(pool)}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl leading-none mb-0">{token.name}</h2>

                  <p className="leading-none">{getTokenSymbol(pool)}</p>
                </div>
              )}

              <div className="flex items-center space-x-4 flex-wrap">
                <ChainIcon chain={token.chain} />
                {token.extraChains?.map((chain) => (
                  <ChainIcon key={chain} chain={chain} />
                ))}
                {sale.isVip && <BlackLevelBadge />}
                <StatusBadge pool={pool} />
              </div>
            </div>

            <div className="flex gap-12">
              <p className="text-sm w-4/6">
                {pool.descriptionShort || pool.description}
              </p>
              <div className="self-end">
                <div>
                  <p className="uppercase text-sm">Total raise</p>
                  <p className="text-main text-2xl">{getHardCap(sale)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 gap-6">
              <div className="space-y-3 flex-shrink-0">
                {!isNFTPool(pool) && !(isFinished && !sale.rate) && (
                  <div className="text-lg">
                    <span className="font-extrabold uppercase">Price:</span>{" "}
                    <PoolRate pool={pool} />
                  </div>
                )}
                <div className="text-lg">
                  <span className="font-extrabold uppercase">Start:</span>{" "}
                  <span className="text-main">
                    {start ? `${start.format(DEFAULT_FORMAT)} UTC` : "TBA"}
                  </span>
                </div>

                {sale.minBaseAllocation?.gtn(0) && (
                  <div>
                    <div className="text-sm mb-2">
                      Min 1x allocation:{" "}
                      <span className="text-main">
                        ${fNum(tokensToCurrency(sale.minBaseAllocation))}
                      </span>
                    </div>
                    <div className="text-sm">⚠️ FCFS registration ⚠️</div>
                  </div>
                )}
              </div>
              <div className="w-full max-w-[24rem]">
                <SaleProgressBar
                  topLeft={<SaleRelativeTime isSoldOut={isSoldOut} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 mt-12 pt-4 border-main flex justify-between">
          <div className="w-1/2">
            {pool.kyc && (
              <p className="font-light text-secondary">
                This IDO requires KYC verification.
              </p>
            )}
          </div>
          <div className="w-1/2">
            {sale.status < SaleStatus.open && (
              <div className="bg-purple bg-opacity-10 rounded p-3 text-sm max">
                <KycOrRegisterButton pool={pool} center />
              </div>
            )}
            {token.address && <AddressWithLink address={token.address} />}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

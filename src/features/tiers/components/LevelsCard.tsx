import { CardTitle, DividerLine, StandardCard, TMain } from "~common/UI";
import { tiers } from "~config/tiers";
import Link from "next/link";
import * as React from "react";
import { FaCheck, FaLock } from "react-icons/fa";
import { fNum } from "~utils";

export function LevelsCard({ activeTierId }: { activeTierId: string }) {
  return (
    <StandardCard
      cardClassName="overflow-hidden bg-black bg-opacity-90 rounded-lg shadow-2xl brand-shadow border-0 z-10 card bg-dark"
      className="space-y-3"
    >
      <CardTitle>BLOK Levels</CardTitle>

      <p className="font-light">
        To be eligible for any of the tiers you are required to stake the
        following:
      </p>

      <div className="space-y-3 ">
        {Object.values(tiers)
          .filter((t) => t.minAmount > 0)
          .map((tier) => (
            <div key={tier.id}>
              <div
                className={
                  tier.vip ? "bg-black p-2 inline-block rounded -m-2" : ""
                }
                style={tier.vip ? { boxShadow: "0px 0px 6px 2px black" } : {}}
              >
                <TMain>{fNum(tier.minAmount)} BLOK</TMain> for{" "}
                {tier.vip ? (
                  <span
                    className="font-Poppins tracking-wide"
                    style={{ textShadow: "0px 0px 7px #ffffff8a" }}
                  >
                    {tier.name}
                  </span>
                ) : (
                  <span className="font-Poppins tracking-wide">
                    {tier.name}
                  </span>
                )}{" "}
                [{tier.multiplier}x]
                {tier.random && ` (${tier.odds}% lottery)`}{" "}
                <span>
                  <FaLock className="inline-block" /> {tier.lockingPeriod}
                </span>
                {tier.id === activeTierId && (
                  <FaCheck className="inline text-green-600 ml-2" />
                )}
              </div>
            </div>
          ))}
      </div>

      {false && <DividerLine />}

      <p className="text-lg hidden">
        <b>You need to register for an IDO</b> after you staked.
      </p>
      <p className="text-sm hidden">
        When IDO registration period starts (usually 24h before the IDO start),
        you need to open the{" "}
        <Link href="/#pools">
          <a>Pools</a>
        </Link>{" "}
        page and click the "Register" button in the pool card.
      </p>
      <p className="text-sm hidden">
        When you register for an IDO, your level is recorded (for this specific
        IDO). There's no way to change it to a higher level after registration.
        So make sure <b>you are on the level you want before registering</b>.
        You will be able to stake more and register for other IDOs with a higher
        level though.
      </p>
    </StandardCard>
  );
}

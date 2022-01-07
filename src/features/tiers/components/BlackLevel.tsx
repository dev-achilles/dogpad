import { Tier } from "~features/tiers";
import React from "react";
import { Card } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { fNum } from "../../../utils";

export function BlackLevel({ tier }: { tier: Tier }) {
  return (
    <Card
      bg="darker"
      className={`bg-black border-black hover:bg-opacity-60 
        border-2 shadow-xl hover:shadow-none h-full`}
      style={{ minHeight: 300 }}
    >
      <Card.Body className="space-y-6 text-center py-8">
        <h2 className="font-Poppins uppercase text-2xl tracking-wider">
          {tier.name}
        </h2>

        <div className="brand-text text-2xl leading-relaxed uppercase">
          Private access
        </div>

        <div className="bg-mainDark bg-opacity-25 -mx-5 py-3 space-y-6 shadow-xl">
          <div className="opacity-60 text-sm">Staking Requirements</div>
          <div className="font-Ubuntu tracking-wide flex items-center justify-center">
            <div className="mx-2 brand-text text-5xl font-Rubik">
              {fNum(tier.minAmount)}
            </div>
            <div className="text-lg opacity-60">BLOK</div>
          </div>
          <div className="text-xl font-Ubuntu tracking-wide opacity-75">
            Locked for {tier.lockingPeriod}
          </div>
        </div>

        <div>
          <div className="text-sm opacity-60 mb-1">Pool Weight</div>
          <div className="text-5xl brand-text">{tier.multiplier}x</div>
        </div>

        <div>
          <div className="text-sm opacity-60 mb-1">Allocation Type</div>
          <div className="text-xl inline-flex items-center justify-center">
            {tier.random ? (
              <span>Lottery ({tier.odds}%)</span>
            ) : (
              <>
                <span>Guaranteed</span>{" "}
                <FaCheck className="inline text-green-600 ml-2" />
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

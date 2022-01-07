import React from "react";
import { Tier } from "../types";

export function TierName({
  className = "",
  name,
}: {
  className?: string;
  name: string;
}) {
  return (
    <span className={`font-Poppins tracking-wide uppercase ${className}`}>
      {name}
    </span>
  );
}

export const TierWithMultiplier = ({ tier }: { tier: Tier }) => (
  <>
    <TierName name={tier.name} />{" "}
    <span className="text-sm">[{tier.multiplier}x]</span>
  </>
);

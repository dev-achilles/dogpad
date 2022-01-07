import * as React from "react";
import { SocialLinks } from "~common/components/SocialLinks";
import { PoolConfig, PoolToken } from "../../types";
import { AddMetamaskTokenButton } from "../AddMetamaskTokenButton";
import { ChainLabel } from "src/features/pools/components/ChainLabel/ChainLabel";

function TokenImage({
  imageSrc,
  symbol,
}: Pick<PoolToken, "imageSrc" | "symbol">) {
  return (
    <div style={{ width: "65px", height: "65px" }}>
      <img src={imageSrc} alt={symbol} className="h-full rounded-full" />
    </div>
  );
}

export function Header({
  token,
  description,
  social,
}: {
  token: PoolToken;
  description: PoolConfig["description"];
  social: PoolConfig["social"];
}) {
  return (
    <div className="pb-3">
      <div className="flex items-start justify-between mb-10 flex-wrap">
        <div className="flex items-center mb-3 md:mb-0 ">
          <div className="mr-10 h-16 w-16 rounded-full overflow-hidden brand-shadow">
            <TokenImage {...token} />
          </div>

          <h2 className="text-2xl font-Poppins font-black tracking-wide mb-0">
            {token.name}
          </h2>
        </div>
        <div className="space-x-3 flex items-center">
          <ChainLabel chain={token.chain} />
          {token.extraChains?.map((chain) => (
            <ChainLabel key={chain} chain={chain} />
          ))}
        </div>
      </div>

      <div className="mb-6 opacity-80 font-light space-y-3">{description}</div>

      {social?.announcement && (
        <p className="mb-6">
          <a
            href={social.announcement}
            className="text-main"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        </p>
      )}

      <div className="space-x-6 flex items-center">
        <SocialLinks social={social} className="gap-6 text-2xl" />

        <AddMetamaskTokenButton token={token} />
      </div>
    </div>
  );
}

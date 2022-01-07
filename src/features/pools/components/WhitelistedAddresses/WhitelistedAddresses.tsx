import { usePoolSale, useUser, utils } from "@trustpad/launchpad";
import { StandardCard } from "~common/UI";
import React, { useEffect, useState } from "react";
import { Title } from "../PoolSecondaryBlock/UI";

export function WhitelistedAddresses() {
  const { account } = useUser();
  const [sale, saleInstance] = usePoolSale();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!saleInstance) return;
    utils.call(saleInstance, "getWhitelistedAddresses").then(setAddresses);
  }, [saleInstance]);

  if (!sale.hasWhitelist || !addresses.length) {
    return null;
  }

  const filtered = addresses.filter((addr) =>
    addr.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <StandardCard className="space-y-3">
      <Title>Whitelist winners</Title>

      <div className="space-x-3 flex items-center">
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search for address"
          className="rounded bg-dark2 p-2 outline-none text-sm text-opacity-75 border border-mainDark"
        />
        {account && (
          <button
            className={`text-sm bg-dark2 rounded border border-mainDark
             text-white text-opacity-75 font-semibold py-2 px-3 leading-none`}
            onClick={() => setFilter(account)}
          >
            Look for my address
          </button>
        )}
      </div>

      <div className="bg-dark2 h-56 overflow-scroll rounded">
        {filtered.map((addr) => (
          <div
            key={addr}
            className="leading-relaxed border-b border-gray-800 px-2 py-1 text-sm opacity-75"
          >
            {utils.addressShort(addr)}
          </div>
        ))}

        {!filtered.length && (
          <div className="leading-relaxed text-sm py-1 px-2 opacity-75">
            Not whitelisted
          </div>
        )}
      </div>
    </StandardCard>
  );
}

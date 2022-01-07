import { ChainSymbol, chainToExplorerLabel } from "@trustpad/launchpad";
import * as React from "react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getAddressUrl } from "~utils";

export function AddressWithLink({
  label,
  address,
  chain,
}: {
  label?: string;
  address: string;
  chain?: ChainSymbol;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }
  }, [copied]);

  const url = getAddressUrl(address, chain);

  return (
    <div className="flex items-center space-x-3 py-1">
      <div className="font-semibold ">
        {label ? (
          label
        ) : chain ? (
          <>
            Address <span className="font-light">[{chain}]</span>:
          </>
        ) : (
          <>Address:</>
        )}
      </div>

      <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
        <a
          href="#"
          className="break-all no-underline text-white"
          onClick={(e) => e.preventDefault()}
        >
          {copied ? <span>copied</span> : <span>{address}</span>}
        </a>
      </CopyToClipboard>
      <a
        href={url}
        target="_blank"
        className="flex-shrink-0 h-6 w-6 -mt-1"
        rel="noreferrer"
      >
        {chainToExplorerLabel[chain]}
      </a>
    </div>
  );
}

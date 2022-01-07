import Jazzicon from "@metamask/jazzicon";
import React, { useEffect, useRef } from "react";

export function EthereumIdenticon({
  address,
  diameter = 46,
}: {
  address: string;
  diameter?: number;
}) {
  const ref = useRef<HTMLDivElement>();

  if (!address) {
    return;
  }

  function jsNumberForAddress(address) {
    const addr = address.slice(2, 10);
    return parseInt(addr, 16);
  }

  function generateNewIdenticon(address, diameter) {
    const numericRepresentation = jsNumberForAddress(address);
    return Jazzicon(diameter, numericRepresentation);
  }

  useEffect(() => {
    const identicon = generateNewIdenticon(address, diameter);
    ref.current.appendChild(identicon);
  }, []);

  return (
    <div
      ref={ref}
      className=""
      style={{ height: diameter, width: diameter, borderRadius: diameter / 2 }}
    />
  );
}

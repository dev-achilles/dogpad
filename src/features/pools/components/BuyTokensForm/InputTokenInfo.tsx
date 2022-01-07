import React from "react";

export function InputTokenInfo({
  imageSrc,
  symbol,
}: {
  imageSrc: string;
  symbol?: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-6 w-6 rounded-full">
        <img
          src={imageSrc}
          alt={symbol}
          className="h-6 bg-darkGray rounded-full"
        />
      </div>
      {symbol && <span className="">{symbol}</span>}
    </div>
  );
}

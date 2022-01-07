import { InventoryItem } from "@trustpad/launchpad";
import BN from "bn.js";
import React from "react";

export function ItemsBalance({
  items,
  balance,
}: {
  items: InventoryItem[];
  balance: Record<string, BN>;
}) {
  return (
    <div className="space-x-1">
      <span className="text-gray-400">Purchased:</span>{" "}
      <div className="flex-inline flex-wrap text-xs">
        {Object.entries(balance).map(([id, amount]) => {
          const item = items.find((i) => i.id === id);
          if (!item) return <div key={id}>Invalid item id</div>;
          return (
            <div key={id} className="p-1 inline-block">
              <img src={item.image} className="h-4 inline" />{" "}
              <span>{amount.toString()} </span>
              <span className="opacity-75">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

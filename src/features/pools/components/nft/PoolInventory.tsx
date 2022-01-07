import { InventoryItem } from "@trustpad/launchpad";
import * as React from "react";
import { Title } from "src/features/pools/components/PoolSecondaryBlock/UI";
import { NftSale } from "src/features/pools/types";
import { Token } from "src/types";
import { fNum } from "src/utils";
import groupBy from "lodash/groupBy";

const getLeft = (item: InventoryItem) => item.supply - (item.sold || 0);

export function PoolInventory({
  sale,
  fundToken,
}: {
  sale: NftSale;
  fundToken: Token;
}) {
  const groups = groupBy(sale.inventory, "group");
  const showGroupTitle = Object.keys(groups).length > 1;

  return (
    <div>
      <Title>Inventory</Title>

      {Object.entries(groups).map(([groupName, items]) => {
        const width = items.some((i) => i.image) ? "lg:w-1/2" : "lg:w-1/3";

        return (
          <div key={groupName} className="mb-2">
            {showGroupTitle && groupName && (
              <Title className="opacity-75" size="text-sm">
                {groupName}
              </Title>
            )}

            <div className="flex flex-wrap">
              {items.map((item) => (
                <div key={item.id} className={`p-3 w-full ${width}`}>
                  <div
                    className={`bg-gray-700 bg-opacity-25 flex space-x-3 items-center 
            hover:bg-opacity-40 transform hover:scale-110 transition-transform rounded p-2`}
                  >
                    {item.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="opacity-90 ">
                        <span className="text-lg">{item.name}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="brand-text">
                            ${fNum(item.price)}
                          </span>
                          <span className="opacity-50 font-light">
                            {" "}
                            |{" "}
                            {item.sold > 0 &&
                              getLeft(item) > 0 &&
                              `${getLeft(item)} / `}
                            {item.supply}x
                          </span>
                        </div>
                        {!getLeft(item) && (
                          <div className="text-red-600 text-sm">SOLD OUT</div>
                        )}
                      </div>
                      {item.description && <div>{item.description}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

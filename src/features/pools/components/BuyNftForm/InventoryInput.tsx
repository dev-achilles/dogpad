import BN from "bn.js";
import groupBy from "lodash/groupBy";
import React from "react";
import { HiSelector } from "react-icons/hi";
import { InventoryItem } from "~features/pools/types";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { fNum } from "~utils";

// TODO: searchable input
export function InventoryInput({
  items,
  active,
  onChange,
  balance,
  getMaxItems,
}: {
  items: InventoryItem[];
  active: InventoryItem;
  onChange: (active: InventoryItem) => void;
  balance: Record<string, BN>;
  getMaxItems: (item: InventoryItem) => number;
}) {
  const groups = groupBy(items, "group");
  const showGroupTitle = Object.keys(groups).length > 1;

  return (
    <Listbox value={active} onChange={onChange}>
      <div className="relative w-full">
        <Listbox.Button
          className={`relative w-full py-2 px-4 rounded-2xl border border-gray-600
         cursor-default focus-within:outline-none focus-within:ring-2 focus-within:ring-sec
        focus-within:border-transparent hover:bg-white hover:bg-opacity-5`}
        >
          <Item
            item={active}
            balance={balance[active.id]}
            maxItems={getMaxItems(active)}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`absolute w-full mt-1 overflow-auto text-base
            rounded-2xl shadow-lg max-h-60 border border-gray-600 bg-dark
            focus:outline-none z-20`}
          >
            {Object.entries(groups).map(([groupName, items]) => (
              <Fragment key={groupName}>
                {showGroupTitle && groupName && (
                  <div className="px-3 pt-2 pb-1 leading-none border-b border-gray-600 font-Poppins tracking-wider text-pink">
                    {groupName}
                  </div>
                )}
                {items.map((item) => (
                  <Listbox.Option key={item.id} value={item}>
                    {({ selected, active }) => (
                      <div className="p-3 border-b border-gray-600 hover:bg-white hover:bg-opacity-5">
                        <Item
                          item={item}
                          balance={balance[item.id]}
                          maxItems={getMaxItems(item)}
                        />
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Fragment>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function Item({
  item,
  balance,
  maxItems,
}: {
  item: InventoryItem;
  balance: BN;
  maxItems: number;
}) {
  const left = item.supply - (item.sold || 0);
  return (
    <div className="flex space-x-3 items-center w-full relative">
      {item.image && (
        <div className="-m-3">
          <img src={item.image} alt={item.name} className="h-16 w-16" />
        </div>
      )}
      <div className="flex-1 text-left">
        <div className="opacity-90">
          <span className="">{item.name}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="brand-text">${fNum(item.price)}</span>
            <span className="opacity-50 font-light text-sm">
              {" "}
              | {left} / {item.supply}
            </span>
          </div>
          {balance?.gtn(0) && (
            <div className="text-sm">Yours: {balance.toString()}</div>
          )}
        </div>
      </div>

      <div className="absolute right-3 top-0">
        {!left ? (
          <div className="text-red-600 text-sm">SOLD OUT</div>
        ) : (
          <div className="text-gray-400 text-sm">Max: {maxItems}</div>
        )}
      </div>
    </div>
  );
}

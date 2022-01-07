import { SaleStatus, usePool, useSaleTimeline } from "@trustpad/launchpad";
import { fNum } from "@trustpad/launchpad/dist/shared/utils";
import * as React from "react";
import { ListItem } from "~/features/pools/components/PoolSecondaryBlock/InfoListItem";
import { Title } from "~/features/pools/components/PoolSecondaryBlock/UI";
import { NftPoolConfig } from "~/features/pools/types";
import { getHardCap } from "~/features/pools/utils";
import { TMain } from "~common/UI";
import { useSaleBaseAllocation } from "~features/pools";
import { capitalize } from "~utils";

export function NFTSaleSection() {
  const {
    pool: { sale, access, fundToken },
  } = usePool<NftPoolConfig>();

  const { start, end, registerStart, registerEnd, fcfsStart } =
    useSaleTimeline();
  const { baseCurrencyAllocation } = useSaleBaseAllocation();

  return (
    <div className="space-y-3">
      <Title>POOL DETAILS</Title>

      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="md:w-1/2">
          <ul>
            <ListItem label="Access Type">
              {sale.isVip
                ? "BLACK"
                : sale.isTiered
                ? "Levels"
                : access === "levels_fcfs"
                ? "Levels FCFS"
                : capitalize(access)}
            </ListItem>
            <ListItem label="Hard Cap">{getHardCap(sale)}</ListItem>
          </ul>
        </div>

        <div className="md:w-1/2">
          <ul>
            <ListItem label="Start">
              {start ? `${start.format("D MMM, HH:mm a")} UTC` : "TBA"}
            </ListItem>
            {start &&
              (end ? (
                <ListItem label="End">
                  {end.format("D MMM, HH:mm a")} UTC
                </ListItem>
              ) : (
                <ListItem label="End">TBA</ListItem>
              ))}
            {registerStart && sale.status < SaleStatus.open && (
              <>
                <ListItem label="Registration Start">
                  {registerStart.format("D MMM, HH:mm a")} UTC
                </ListItem>
                <ListItem label="Registration End">
                  {registerEnd.format("D MMM, HH:mm a")} UTC
                </ListItem>
              </>
            )}
            {fcfsStart && (
              <ListItem label="FCFS Opens">
                {fcfsStart.format("D MMM, HH:mm a")} UTC ({sale.fcfsDuration}h
                before the end)
              </ListItem>
            )}
          </ul>
          <ul className="list-disc list-inside"></ul>
        </div>

        {sale.status >= SaleStatus.register && (
          <div>
            <ListItem label="Base Allocation">
              <TMain>1x</TMain> ={" "}
              <TMain>
                {fundToken.symbol === "BUSD"
                  ? `$${fNum(baseCurrencyAllocation, 2)}`
                  : `${fNum(baseCurrencyAllocation, 2)} ${fundToken.symbol}`}
              </TMain>
              {sale.baseAllocation.eqn(0) && " (approx)"}
            </ListItem>
          </div>
        )}
      </div>
    </div>
  );
}

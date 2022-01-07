import axios from "axios";
import dayjs from "dayjs";
import { PoolConfig, Sale } from "../types";

export { getHardCap } from "@trustpad/launchpad/dist/pool/utils";

export const getSaleStartEnd = (sale: Sale) => ({
  start: dayjs(sale.startDate),
  end: dayjs(sale.startDate).add(sale.durationHours, "hour"),
});

export const getSaleRegisterStartEnd = (sale: Sale) => ({
  registerStart: sale.registerDate ? dayjs(sale.registerDate) : undefined,
  registerEnd: sale.registerDate
    ? dayjs(sale.registerDate).add(sale.registerDuration, "hour")
    : undefined,
});

export const getNextSaleDate = (sale: Sale) => {
  const { start, end } = getSaleStartEnd(sale);
  const { registerStart, registerEnd } = getSaleRegisterStartEnd(sale);
  const fcfsStart =
    sale.fcfsDuration && end.subtract(sale.fcfsDuration, "hour");
  const now = dayjs();

  if (registerStart && now.isBefore(registerStart)) {
    return registerStart;
  }
  if (registerEnd && now.isBefore(registerEnd)) {
    return registerEnd;
  }
  if (now.isBefore(start)) {
    return start.add(30, "second");
  }
  if (fcfsStart && now.isBefore(fcfsStart)) {
    return fcfsStart;
  }
  if (now.isBefore(end)) {
    return end;
  }
  return null;
};

export const getPoolLinkPath = (pool: PoolConfig) =>
  `/pool/${encodeURIComponent(pool.id)}`;

let prices = {};
let pricePromises = {};

export const getTokenPriceUsd = async (id = "polygon") => {
  if (prices[id]) return Promise.resolve(prices[id]);
  if (pricePromises[id]) return pricePromises[id];

  pricePromises[id] = axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    )
    .then((res) => {
      const price = parseFloat(res.data[id]["usd"]);
      prices[id] = price;
      return price;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });

  return pricePromises[id];
};

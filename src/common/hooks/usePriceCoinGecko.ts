import axios from "axios";
import { useEffect, useState } from "react";

let idsToFetch = new Set();

let batchPromise;

const fetchBatch = () => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&ids=${Array.from(
      idsToFetch
    ).join()}`
  );
};

const fetchPrices = (id) => {
  if (id) {
    idsToFetch.add(id);
  }

  return new Promise(function (resolve) {
    if (!batchPromise) {
      batchPromise = new Promise((resolve) => {
        setTimeout(() => {
          if (idsToFetch.size != 0) {
            fetchBatch().then(resolve);
          }

          batchPromise = undefined;
        }, 200);
      });
    }
    batchPromise.then((res) => {
      const item = res.data.find((x) => x.id === id);

      if (!item) {
        resolve;
        return;
      }

      const price = parseFloat(item["current_price"]);
      const athPrice = parseFloat(item["ath"]);

      if (!price || !athPrice) {
        resolve;
        return;
      }

      const prices = { price, athPrice };
      resolve(prices);
    });
  });
};

export function usePriceCoinGecko(id) {
  const [prices, setPrices] = useState<{ price: number; athPrice: number }>();

  useEffect(() => {
    fetchPrices(id).then(setPrices);
  }, [id]);

  return prices;
}

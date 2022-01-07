import BN from "bn.js";
import { toEth } from "~utils";

export const debug = (...args) =>
  process.env.NODE_ENV !== "production" && console.log(...args);
export const debugState = (
  msg: string,
  data: Array<Record<string, any>> | Record<string, any>
) => {
  const transform = (data) =>
    Object.keys(data).reduce((acc, key) => {
      let value = data[key];
      if (value instanceof BN) {
        value = key !== "rate" ? toEth(value) : value.toNumber();
      }
      return { ...acc, [key]: value };
    }, {});

  const transformedData = Array.isArray(data)
    ? data.map(transform)
    : transform(data);
  process.env.NODE_ENV !== "production" && console.log(msg, transformedData);
};

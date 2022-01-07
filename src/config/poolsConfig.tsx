import keyBy from "lodash/keyBy";
import React from "react";
import { allPools } from "../../pools";

export const poolsConfig = [...allPools];
export const poolsConfigById = keyBy(poolsConfig, "id");

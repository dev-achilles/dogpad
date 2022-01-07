import { PoolConfig } from "~features/pools/types";
import * as React from "react";
import { Badge } from "react-bootstrap";
import { BsLock, BsUnlock } from "react-icons/bs";

export function SaleWhitelistBadge({
  isLevels,
  hasWhitelist,
  isPublic,
  access,
  allLevels,
}: {
  isLevels: boolean;
  hasWhitelist: boolean;
  isPublic: boolean;
  allLevels: boolean;
  access: PoolConfig["access"];
}) {
  const whitelistLabel = hasWhitelist ? " (Whitelist)" : "";
  if (access === "whitelist") {
    return (
      <Badge
        pill
        variant="success"
        className="py-1 px-2 bg-opacity-40 bg-green-700 text-green-500 font-normal"
      >
        <BsLock className="inline overflow-visible" size="0.75em" /> Whitelist
      </Badge>
    );
  }
  if (access === "public" || isPublic) {
    return (
      <Badge
        pill
        variant="success"
        className="py-1 px-2 bg-opacity-40 bg-green-700 text-green-500 font-normal"
      >
        <BsUnlock className="inline overflow-visible" size="0.75em" />{" "}
        {isLevels ? <>Levels{allLevels && " (FCFS)"}</> : "Public"}
      </Badge>
    );
  }
  if (access === "private") {
    return (
      <Badge
        pill
        variant="secondary"
        className="py-1 px-2 bg-opacity-40 text-gray-200 bg-gray-400 font-normal"
      >
        <BsLock className="inline overflow-visible" size="0.75em" /> Private
      </Badge>
    );
  }
  if (access === "seed") {
    return (
      <Badge
        pill
        variant="secondary"
        className="py-1 px-2 bg-opacity-40 text-gray-200 bg-gray-400 font-normal"
      >
        <BsLock className="inline overflow-visible" size="0.75em" /> Seed
      </Badge>
    );
  }
  if (access === "levels_fcfs") {
    return (
      <Badge
        pill
        variant="secondary"
        className="py-1 px-2 bg-opacity-40 text-gray-200 bg-gray-400 font-normal"
      >
        <BsLock className="inline overflow-visible" size="0.75em" /> Levels FCFS
      </Badge>
    );
  }
}

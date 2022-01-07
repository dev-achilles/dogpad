import React from "react";
import { Badge } from "react-bootstrap";
import { BsUnlock } from "react-icons/bs";
import { TierName } from "../../tiers";

export const BlackLevelBadge = ({ withLock }: { withLock?: boolean }) => {
  return (
    <Badge
      pill
      variant="success"
      className="py-1 px-2 font-normal bg-opacity-100 bg-black tracking-wider h-6 leading-4 align-middle"
      style={{ textShadow: "0px 0px 7px #ffffff8a" }}
    >
      {withLock && (
        <BsUnlock
          className="inline-block overflow-visible mr-1"
          size="0.75em"
        />
      )}
      <TierName name="black" />
    </Badge>
  );
};

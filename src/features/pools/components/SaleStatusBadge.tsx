import { SaleStatus } from "@trustpad/launchpad";
import { Sale } from "~features/pools/types";
import * as React from "react";
import { Badge } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";

export function SaleStatusBadge({ status }: Pick<Sale, "status">) {
  function SBadge({
    variant,
    className,
    isActive = false,
    animation = false,
    children,
  }: {
    isActive?: boolean;
    animation?: boolean;
    variant: string;
    className: string;
    children: React.ReactNode;
  }) {
    return (
      <Badge
        pill
        variant={variant}
        className={`py-1 px-2 font-normal bg-opacity-40 inline-flex items-center space-x-1 ${className}`}
      >
        <BsCircleFill
          className={`inline overflow-visible ${
            animation && (isActive ? "ping-anim-faster" : "ping-anim")
          }`}
          size="0.75em"
        />
        <span>{children}</span>
      </Badge>
    );
  }

  if (status === SaleStatus.init || status === SaleStatus.static) {
    return (
      <SBadge variant="secondary" className="text-gray-200 bg-gray-400">
        Soon
      </SBadge>
    );
  }
  if (status === SaleStatus.register) {
    return (
      <SBadge variant="secondary" className="text-gray-200 bg-gray-400">
        Register
      </SBadge>
    );
  }
  if (status === SaleStatus.open) {
    return (
      <SBadge
        variant="success"
        className="bg-green-700 text-green-500"
        isActive
      >
        Open
      </SBadge>
    );
  }
  if (status === SaleStatus.finished) {
    return (
      <SBadge
        variant="danger"
        className="bg-red-600 text-red-500"
        animation={false}
      >
        Closed
      </SBadge>
    );
  }

  return null;
}

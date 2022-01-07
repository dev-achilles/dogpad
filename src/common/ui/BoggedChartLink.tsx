import React from "react";
import { Button } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";
import { Chain } from "../../types";

export function BoggedChartLink({
  address,
  label = "Live Chart",
  chain = "BSC",
}: {
  address?: string;
  label?: string;
  chain?: Chain;
}) {
  return (
    <Button
      title="Live Chart"
      variant="outline-primary"
      href={`https://charts.bogged.finance/${address}`}
      target="_blank"
      className="btn-sm no-hover"
    >
      <FaChartLine className="inline mr-1" /> {label || "Live Chart"}
    </Button>
  );
}

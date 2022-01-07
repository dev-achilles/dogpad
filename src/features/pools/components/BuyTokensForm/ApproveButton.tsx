import { useCurrencyApproval } from "@trustpad/launchpad/dist/pool";
import React from "react";
import { Button } from "react-bootstrap";
import { Spinner } from "~common/UI";

export function ApproveButton({ symbol }: { symbol: string }) {
  const { isApprovalRequired, isApproved, isLoading, approveCurrency } =
    useCurrencyApproval();

  if (isApproved || !isApprovalRequired) {
    return null;
  }

  return (
    <Button variant={"primary"} disabled={isLoading} onClick={approveCurrency}>
      {isLoading && <Spinner />}
      Approve {symbol}
    </Button>
  );
}

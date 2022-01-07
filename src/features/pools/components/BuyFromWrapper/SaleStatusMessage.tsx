import { Sale, SaleStatus } from "~features/pools/types";
import React from "react";
import { SaleFinishedMessage } from "./MessagePresaleFinished";
import { MessagePresaleOpen } from "./MessagePresaleOpen";
import { MessagePresaleTBA } from "./MessagePresaleTBA";

export const SaleStatusMessage = React.memo(
  ({
    isSoldOut,
    status,
    hadRegistration,
    kyc,
  }: {
    blockReason?: any;
    isSoldOut: boolean;
    hadRegistration: boolean;
    kyc: boolean;
    status: Sale["status"];
  }) => {
    if (status === SaleStatus.finished || isSoldOut) {
      return <SaleFinishedMessage soldOut={isSoldOut} />;
    }

    if (status === SaleStatus.static || status === SaleStatus.preRegister) {
      return <MessagePresaleTBA />;
    }

    if (status === SaleStatus.init) {
      return <MessagePresaleOpen hadRegistration={hadRegistration} kyc={kyc} />;
    }

    return null;
  }
);

SaleStatusMessage.displayName = "SaleStatusMessage";

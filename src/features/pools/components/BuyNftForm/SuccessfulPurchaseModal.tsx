import { BuySuccessMessage } from "@trustpad/launchpad/dist/pool/hooks/useBuyForm/useBuyForm";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { TMain } from "../../../../common/UI";
import { PoolToken } from "../../types";

export function SuccessfulPurchaseModal({
  token,
  message,
  onClose,
}: {
  token: PoolToken;
  message: BuySuccessMessage;
  onClose: VoidFunction;
}) {
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">
          You purchased{" "}
          <TMain>
            {message.amount} ${token.symbol}
          </TMain>
          !
        </p>
        <p>
          Transaction ID:{" "}
          <a
            className="break-all"
            href={`https://bscscan.com/tx/${message.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {message.transactionHash}
          </a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

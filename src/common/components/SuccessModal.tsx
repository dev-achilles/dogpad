import * as React from "react";
import { Button, Modal } from "react-bootstrap";

export function SuccessModal({
  message,
  onClose,
}: {
  message: any;
  onClose: VoidFunction;
}) {
  return (
    <Modal onHide={onClose} show>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message?.msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

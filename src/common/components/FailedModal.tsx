import * as React from "react";
import { Button, Modal } from "react-bootstrap";

export function FailedModal({
  message,
  onClose,
}: {
  message: any;
  onClose: VoidFunction;
}) {
  return (
    <Modal onHide={onClose} show>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Something went wrong: {message?.msg}</div>

        {message?.data?.message && (
          <p className="mt-3 text-xs">
            <code>{message.data.message}</code>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

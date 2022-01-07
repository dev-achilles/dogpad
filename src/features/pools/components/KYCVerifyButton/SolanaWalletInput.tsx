import * as React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUserSolanaWallet } from "~common/hooks/useUserSolanaWallet";
import { isValidSolAddress } from "~utils/solana";

export function SolanaWalletInput() {
  const { wallet, update } = useUserSolanaWallet();
  const [input, setInput] = useState(wallet);
  const [confirmed, setConfirmed] = useState(false);

  const isValidAddress = isValidSolAddress(input);
  const isValid = confirmed && isValidAddress;

  const handleSubmit = () => {
    update(input).then((updated) =>
      updated
        ? toast.success("Your SOL wallet is saved!")
        : toast.error("Failed to update your SOL wallet")
    );
  };

  return (
    <Form className="text-left space-y-4">
      <Form.Group className="mb-3" controlId="solanaWallet">
        <Form.Label>Your SOL wallet address for distribution</Form.Label>
        <Form.Control
          placeholder="SOL wallet"
          value={input}
          required
          onChange={(e) => setInput(e.target.value)}
          isValid={isValidAddress}
          isInvalid={input && !isValidAddress}
        />
        {!isValidAddress && (
          <Form.Control.Feedback type="invalid">
            Invalid SOL address.
          </Form.Control.Feedback>
        )}
        <Form.Text className="text-muted text-sm">
          We recommend using the{" "}
          <a href="https://phantom.app/" target="_blank" rel="noreferrer">
            Phantom
          </a>{" "}
          (desktop-only) or{" "}
          <a href="https://trustwallet.com/" target="_blank" rel="noreferrer">
            Trustwallet
          </a>{" "}
          (mobile) wallets.{" "}
          <a
            href="https://docs.trustpad.io/trustpad/how-to-participate-in-an-ido/how-to-set-up-a-solana-wallet-and-link-it-to-trustpad"
            target="_blank"
            rel="noreferrer"
          >
            Read more in our docs
          </a>
        </Form.Text>
      </Form.Group>
      <Form.Check
        type="checkbox"
        id="accept-sol"
        checked={confirmed}
        onChange={(e) => setConfirmed(e.target.checked)}
        required
        className="leading-normal text-sm"
        label="I confirm providing a valid SOL address. I understand that giving a wrong wallet can result in funds loss."
      />

      <Button
        variant="primary"
        className="mx-auto block"
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
}

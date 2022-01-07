import React from "react";
import { DropdownButton } from "react-bootstrap";
import { DropdownButtonProps } from "react-bootstrap/DropdownButton";
import styles from "./ConnectButtons.module.scss";
import { MetamaskButton } from "./MetamaskButton";
import { TrustWalletButton } from "./TrustWalletButton";
import { WalletConnectButton } from "./WalletConnectButton";

export function ConnectWalletButton(props: Partial<DropdownButtonProps>) {
  const isSm = props?.size === "sm";

  return (
    <div className={isSm ? styles.container : ""}>
      <DropdownButton
        menuAlign="left"
        title="Connect Wallet"
        variant="main"
        {...props}
        size={undefined}
      >
        <div className="dropdown-item">
          <MetamaskButton />
        </div>
        <div className="dropdown-item">
          <WalletConnectButton />
        </div>
        <div className="dropdown-item">
          <TrustWalletButton />
        </div>
      </DropdownButton>
    </div>
  );
}

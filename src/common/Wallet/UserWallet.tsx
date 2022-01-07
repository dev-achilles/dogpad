import { useUser, useWeb3Provider } from "@trustpad/launchpad";
import { User } from "@trustpad/launchpad/dist/shared/hooks/useUser";
import { ConnectWalletButton } from "~common/ConnectButtons/ConnectWalletButton";
import { EthereumIdenticon } from "~common/Wallet/EthereumIdenticon";
import styles from "~common/Wallet/UserWallet.module.css";
import React, { useEffect, useState } from "react";
import { Badge, Button, Dropdown } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { addressShort, fNum, getAddressUrl } from "~utils";
import { KYCVerifyButton } from "../../features/pools/components/KYCVerifyButton/KYCVerifyButton";

const NATIVE_TOKENS: Record<string, string> = {
  BSC: "BNB",
  ETH: "ETH",
  POLY: "MATIC",
};

export function UserWallet({ connectSize }: { connectSize?: "sm" }) {
  const {
    logout,
    connectedChain: { symbol: chainSymbol },
    defaultChain,
  } = useWeb3Provider();
  const user = useUser();
  const nativeToken = NATIVE_TOKENS[chainSymbol];

  if (!user.account) {
    return <ConnectWalletButton size={connectSize} />;
  }

  const explorerUrl = {
    BSC: () => getAddressUrl(user.account, "BSC"),
    ETH: () => getAddressUrl(user.account, "ETH"),
    POLY: () => getAddressUrl(user.account, "POLY"),
  }[chainSymbol]?.();

  return (
    <div className="text-white border-2 border-main py-0 px-3 rounded-lg flex items-center">
      <div className="mr-3 text-sm font-medium flex flex-col pt-1 leading-tight">
        <span>
          {fNum(user.funds, 4)} {nativeToken}
        </span>
        {chainSymbol === defaultChain.symbol && (
          <span>
            <span className="text-pink">{fNum(user.tokens, 0)} BLOK</span>
          </span>
        )}
      </div>

      <Account account={user.account} />

      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <EthereumIdenticon address={user.account} diameter={24} />
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <div className="dropdown-item">
            <KYCStatus user={user} />
          </div>
          <div className="dropdown-item">
            <a
              href={explorerUrl}
              target="_blank"
              className="btn btn-dark-l btn-sm"
              rel="noreferrer"
            >
              {
                { BSC: "BscExplorer", ETH: "EthExplorer", POLY: "Polyscan" }[
                  chainSymbol
                ]
              }
            </a>
          </div>
          <div className="dropdown-item">
            <Button variant="danger" onClick={logout} size="sm">
              Logout
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function Account({ account }: { account: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  return (
    <CopyToClipboard text={account} onCopy={() => setCopied(true)}>
      <Button
        variant="dark-outline"
        className="p-0 m-0 mr-3 flex items-center outline-none"
      >
        <Badge pill variant="secondary" className={styles.addressPill}>
          <span className={copied ? "invisible" : ""}>
            {addressShort(account)}
          </span>
          <span className={copied ? "visible absolute" : "hidden"}>Copied</span>
          <BiCopy className="inline align-bottom text-sm ml-1" />
        </Badge>
      </Button>
    </CopyToClipboard>
  );
}

const CustomToggle = React.forwardRef(
  (
    { children, onClick }: { children: any; onClick: Function },
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="outline-none"
    >
      {children}
    </a>
  )
);

function KYCStatus({ user }: { user: User }) {
  const { kycStatus: status, kycFormUrl } = user;
  const msg = {
    new: (
      <span className="flex flex-col">
        <a href={kycFormUrl} target="_blank" rel="noreferrer">
          Continue
        </a>
      </span>
    ),
    nothing: <b>Not applied</b>,
    pending: <b>In review</b>,
    processing: <b>In review</b>,
    valid: <FaCheck className="text-green-600 ml-1" />,
    invalid: <FaTimes className="text-red-600 ml-1" />,
  }[status];

  if (status === "nothing" || (status === "new" && !kycFormUrl)) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center">
        <div>KYC:</div>
        <div className="text-sm ml-1">{msg}</div>
      </div>
    </div>
  );
}

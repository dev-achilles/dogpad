import { SaleStatus, useUser, useUserSaleTier } from "@trustpad/launchpad";
import { CurrencyApprovalProvider } from "@trustpad/launchpad/dist/pool";
import { isNFTSale } from "@trustpad/launchpad/dist/pool/utils";
import React from "react";
import { UserSolanaWalletProvider } from "~common/hooks/useUserSolanaWallet";
import { usePool } from "~features/pools";
import { BuyNftForm } from "~features/pools/components/BuyNftForm";
import { BuyTokensForm } from "~features/pools/components/BuyTokensForm/BuyTokensForm";
import { Blocker } from "./Blocker";
import { SaleStatusMessage } from "./SaleStatusMessage";
import { UserSaleStatus } from "./UserSaleStatus";

export function BuyFormWrapper() {
  const { account } = useUser();
  const { pool, isSoldOut } = usePool();
  const { sale, token } = pool;
  const {
    isWhitelisted,
    tierState: { tier },
  } = useUserSaleTier();

  const showAccountInfo =
    account &&
    sale.address &&
    (isWhitelisted ||
      [
        SaleStatus.open,
        SaleStatus.init,
        SaleStatus.finished,
        SaleStatus.register,
      ].includes(sale.status as SaleStatus));

  return (
    <UserSolanaWalletProvider fetch={token.chain === "SOL"}>
      <CurrencyApprovalProvider>
        <div className="space-y-3">
          {showAccountInfo && (
            <UserSaleStatus stakingTier={tier} whitelisted={isWhitelisted} />
          )}

          <div className="p-3 relative bg-black flex items-center flex justify-center brand-shadow rounded border-2 border-main">
            <div className="space-y-6">
              <SaleStatusMessage
                isSoldOut={isSoldOut}
                hadRegistration={!!sale.registerDate}
                kyc={pool.kyc}
                status={sale.status}
              />

              <Blocker
                pool={pool}
                account={account}
                isWhitelisted={isWhitelisted}
                stakingTier={tier}
              >
                {isNFTSale(sale) ? <BuyNftForm /> : <BuyTokensForm />}
              </Blocker>
            </div>
          </div>
          {false && (
            <div>
              <div className="text-right -mt-2 text-sm mt-4">
                <a
                  href="https://docs.trustpad.io/trustpad/how-to-participate-in-an-ido#5c07"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple border-purple border-b border-dashed no-underline hover:border-0 hover:text-gray-500"
                >
                  How to participate
                </a>
              </div>
            </div>
          )}
        </div>
      </CurrencyApprovalProvider>
    </UserSolanaWalletProvider>
  );
}

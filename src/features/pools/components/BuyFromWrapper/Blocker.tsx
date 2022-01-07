import { SaleStatus, useUser } from "@trustpad/launchpad";
import { ConnectWalletButton2 } from "~common/ConnectButtons/ConnectWalletButton2";
import { useUserSolanaWallet } from "~common/hooks/useUserSolanaWallet";
import { useUserSaleTier } from "~features/pools";
import { ApproveButton } from "~features/pools/components/BuyTokensForm/ApproveButton";
import { SolanaWalletInput } from "~features/pools/components/KYCVerifyButton/SolanaWalletInput";
import { PoolConfig } from "~features/pools/types";
import { Tier, TierName } from "~features/tiers";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { KycOrRegisterButton } from "../KYCVerifyButton/KycOrRegisterButton";
import { KYCVerifyIDOButton } from "../KYCVerifyButton/KYCVerifyIDOButton";

export const Blocker = ({
  pool,
  account,
  stakingTier,
  isWhitelisted,
  children,
}: {
  pool: PoolConfig;
  account: string;
  stakingTier: Tier;
  isWhitelisted: boolean;
  children: React.ReactElement;
}) => {
  const {
    registeredTier,
    userState: { allowsToBuy },
  } = useUserSaleTier();
  const { sale } = pool;
  const { kycStatus } = useUser();
  const { status, hasWhitelist, isTiered, isPublic, levelsOpenAll, isVip } =
    sale;
  const hasRegistration = !!sale.registerDate;
  const { wallet: solanaWallet, isChanging: solWalletChanging } =
    useUserSolanaWallet();

  if (!account) {
    return (
      <div className="text-center">
        <ConnectWalletButton2 menuAlign="left" />
      </div>
    );
  }

  if ((allowsToBuy || isWhitelisted) && pool.kyc && kycStatus !== "valid") {
    return (
      <div className="text-center">
        <KYCVerifyIDOButton />
      </div>
    );
  }

  if (pool.token.chain === "SOL" && (!solanaWallet || solWalletChanging)) {
    return <SolanaWalletInput />;
  }

  if (status === SaleStatus.register || status === SaleStatus.init) {
    return <KycOrRegisterButton pool={pool} center />;
  }

  if (status !== SaleStatus.open) {
    // TODO: if pre-register: show stats on how many registered users, lottery, winners
    return null;
  }
  if (isTiered && sale.baseAllocation.eqn(0)) {
    return <span>Sale is not prepared yet</span>;
  }

  if (hasWhitelist && isWhitelisted) {
    return children;
  }
  // The tiered staking activated when something is staked
  if (isTiered && !isPublic) {
    if (allowsToBuy) {
      return children;
    }

    const getMsg = () => {
      if (isVip) {
        return (
          <div className="space-y-3">
            <p>
              <TierName name="black" /> level is required.
            </p>

            <Link href="/levels" passHref>
              <Button variant="main">Stake more</Button>
            </Link>
          </div>
        );
      }

      if ((registeredTier.random || stakingTier.random) && !allowsToBuy) {
        const id =
          registeredTier.id === "none" ? stakingTier.name : registeredTier.name;
        return (
          <>
            You weren't picked in the level <TierName name={id} /> lottery
          </>
        );
      }

      if (registeredTier.multiplier === 0) {
        if (stakingTier.multiplier > 0) {
          return <>You didn't register for this IDO</>;
        }
        if (hasRegistration && !levelsOpenAll && status === SaleStatus.open) {
          return (
            <>
              Registration is closed
              <p className="mt-3 text-sm">
                Check out the{" "}
                <Link href="https://docs.trustpad.io/trustpad/how-to-participate-in-an-ido">
                  <a>FAQ</a>
                </Link>{" "}
                for explanation
              </p>
            </>
          );
        }

        return (
          <div className="space-y-3">
            <p>
              Your level <TierName name={stakingTier.name} /> is too low to
              participate
              {levelsOpenAll ? " in FCFS" : ""}
            </p>

            <Link href="/levels" passHref>
              <Button variant="main">Stake more</Button>
            </Link>
          </div>
        );
      }

      return (
        <div className="space-y-3">
          <p>
            Your level <TierName name={stakingTier.name} /> is too low to
            participate
          </p>

          <Link href="/levels" passHref>
            <Button variant="main">Stake more</Button>
          </Link>
        </div>
      );
    };

    return (
      <div className="space-y-3">
        <div className="text-center">{getMsg()}</div>
        {sale.fcfsDuration && (
          <div className="text-center space-y-2">
            <p>You can pre-approve before FCFS round starts</p>
            <ApproveButton symbol={pool.fundToken.symbol} />
          </div>
        )}
      </div>
    );
  }

  if (hasWhitelist && !isWhitelisted && !isPublic) {
    return <span className="text-2xl">You're not whitelisted</span>;
  }

  // Public sale
  return children;
};

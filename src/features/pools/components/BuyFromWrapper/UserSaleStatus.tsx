import {
  usePool,
  usePriceConverters,
  useUserSaleTier,
} from "@trustpad/launchpad";
import { isNFTSale } from "@trustpad/launchpad/dist/pool/utils";
import React from "react";
import { Button } from "react-bootstrap";
import CountUp from "react-countup";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";
import { useUserSolanaWallet } from "~common/hooks/useUserSolanaWallet";
import { SecondaryCard } from "~common/UI";
import { ZERO_BN } from "~config/constants";

import { Tier } from "~features/tiers";
import { addressShort, fNum, toEthN } from "~utils";
import { TierWithMultiplier } from "../../../tiers/components/TierName";
import { SaleStatus } from "../../types";

const UNLIMITED_FCFS_AT = 10000;

const Row = ({ label, children }) => (
  <div className="flex justify-between items-center">
    <div>{label}</div>
    <div>{children}</div>
  </div>
);

const Unlimited = () => (
  <span className="text-main text-xl text-main-anim">UNLIMITED</span>
);

const FCFSAllocation = React.memo(
  ({
    fcfsMultiplier,
    symbol,
    allocation,
  }: {
    fcfsMultiplier: number;
    symbol: string;
    allocation: number;
  }) => {
    if (fcfsMultiplier >= UNLIMITED_FCFS_AT) {
      return <Unlimited />;
    }

    return (
      <span className="text-main text-xl">
        +<CountUp end={fcfsMultiplier} decimals={0} preserveValue />% (
        <CountUp end={allocation} decimals={0} preserveValue /> {symbol})
      </span>
    );
  }
);

export function UserSaleStatus({
  stakingTier,
  whitelisted,
}: {
  stakingTier: Tier;
  whitelisted: boolean;
}) {
  const {
    pool: { sale, token, fundToken },
  } = usePool();
  const symbol = token.symbol;
  const currencySymbol = fundToken.symbol;

  const {
    registeredTier,
    userState: { allocation, isWinner },
  } = useUserSaleTier();
  const { currencyToTokens } = usePriceConverters();
  const { baseAllocation } = sale;
  const isNft = isNFTSale(sale);
  const allocationSymbol = isNft ? currencySymbol : symbol;

  const isContributionTBA =
    sale.status !== SaleStatus.finished && baseAllocation.eq(ZERO_BN);

  // TODO: fix bug, whitelist allocation isn't show
  const tierAllocation = baseAllocation.muln(registeredTier.multiplier);
  const fcfsAllocation = allocation.sub(tierAllocation);

  const isRegistered = registeredTier.multiplier > 0;
  const showCurrentLevel = stakingTier.multiplier > 0 && !isRegistered;
  const showRegisteredLevel =
    registeredTier.multiplier > 0 || stakingTier.multiplier > 0;
  const showWhitelistStatus = sale.hasWhitelist;
  const showWinnerStatus =
    [SaleStatus.open, SaleStatus.finished, SaleStatus.init].includes(
      sale.status as SaleStatus
    ) && sale.baseAllocation.gtn(0);
  const lostLottery = showWinnerStatus && registeredTier.random && !isWinner;

  const showTierAllocation =
    !lostLottery &&
    (isRegistered || (sale.levelsOpenAll && stakingTier.multiplier > 0));
  const showWhitelistAllocation = !showTierAllocation && whitelisted;
  const showFCFSAllocation =
    sale.status === SaleStatus.open && sale.fcfsMultiplier > 0;

  const allocationDisplayed =
    showTierAllocation || showWhitelistAllocation || showFCFSAllocation;
  const userStatusDisplayed =
    showCurrentLevel || showRegisteredLevel || showWhitelistStatus;

  if (!allocationDisplayed && !userStatusDisplayed) {
    return null;
  }

  const WhitelistResult = () => {
    if (whitelisted) {
      return <Row label="Whitelist">You're whitelisted! 🎉</Row>;
    }
    if (!whitelisted && !stakingTier.multiplier) {
      return (
        <Row label="Whitelist">
          Non-whitelisted <FaTimes className="inline text-red-600" />
        </Row>
      );
    }
    return null;
  };

  const LotteryResult = () => {
    if (showWinnerStatus) {
      return isWinner ? <>You're a winner! 🎉</> : <>You weren't picked 😞</>;
    }
    return <>{registeredTier.odds}% to win</>;
  };

  return (
    <SecondaryCard>
      {showWhitelistStatus && <WhitelistResult />}

      {showCurrentLevel && (
        <Row label="Your level">
          <TierWithMultiplier tier={stakingTier} />
        </Row>
      )}

      {showRegisteredLevel && (
        <Row label="Registered as">
          {isRegistered ? (
            <>
              <TierWithMultiplier tier={registeredTier} />
              &nbsp;
              <FaCheck className="inline text-green-600 ml-1" />
            </>
          ) : (
            <>
              not registered <FaTimes className="inline text-red-600" />
            </>
          )}
        </Row>
      )}

      {registeredTier.random && (
        <Row label="Lottery">
          <LotteryResult />
        </Row>
      )}

      {showTierAllocation && (
        <Row label="Allocated">
          <span className="text-main text-xl">
            {isContributionTBA
              ? "TBA"
              : `${fNum(tierAllocation)} ${allocationSymbol}`}
          </span>
        </Row>
      )}

      {showWhitelistAllocation && (
        <Row label="Allocated">
          {sale?.limits?.max && sale?.limits?.max.gtn(0) ? (
            <span className="text-main text-xl">
              {fNum(currencyToTokens(sale?.limits?.max))} {allocationSymbol}
            </span>
          ) : (
            <Unlimited />
          )}
        </Row>
      )}

      {showFCFSAllocation && (
        <Row label="FCFS">
          <FCFSAllocation
            allocation={toEthN(fcfsAllocation)}
            symbol={allocationSymbol}
            fcfsMultiplier={sale.fcfsMultiplier}
          />
        </Row>
      )}

      {token.chain === "SOL" && <SolanaWalletRow />}
    </SecondaryCard>
  );
}

function SolanaWalletRow() {
  const { wallet: solanaWallet, toggleChanging } = useUserSolanaWallet();

  return (
    <Row label="SOL wallet">
      {solanaWallet && addressShort(solanaWallet)}{" "}
      <Button
        size="sm"
        variant="outline-primary"
        className="opacity-50"
        onClick={() => toggleChanging()}
      >
        <FaPen />
      </Button>
    </Row>
  );
}

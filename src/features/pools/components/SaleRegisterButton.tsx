/* eslint-disable react/no-unescaped-entities */
import { usePool, useUser } from "@trustpad/launchpad";
import { isNFTSale } from "@trustpad/launchpad/dist/pool/utils";
import dayjs from "dayjs";
import { useSaleTimeline, useUserSaleTier } from "~features/pools";
import { TierName } from "~features/tiers";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";
import { TierWithMultiplier } from "../../tiers/components/TierName";

// Locks if black level has less than 5 days lock left
const BLACK_LEVEL_LOCK = 5 * 24 * 3600;

export function SaleRegisterButton({ center }: { center?: boolean }) {
  const {
    pool: { sale },
    saleInstance,
  } = usePool();
  const { account } = useUser();
  const {
    tierState,
    isCurrentTierLoading,
    registeredTier,
    isWhitelisted,
    userState: { weight, isWinner },
    refresh,
  } = useUserSaleTier();
  const { tier } = tierState;
  const { start } = useSaleTimeline();
  const [isLoading, setIsLoading] = useState(false);

  function register() {
    if (!account) return;

    setIsLoading(true);

    saleInstance.methods
      .register()
      .send({ from: account })
      .then(() => refresh())
      .finally(() => setIsLoading(false));
  }

  if (!account) {
    return null;
  }

  if (isCurrentTierLoading) {
    return <FaCircleNotch size={40} className="inline fa-spin opacity-50" />;
  }

  const Wrapper = ({ children }) => (
    <div
      className={
        center
          ? "space-y-3 text-center relative z-20"
          : "space-y-3 relative z-20"
      }
    >
      {children}
    </div>
  );

  const LockPeriod = () => {
    const totalDays = Math.round(
      (start.diff(dayjs(), "seconds") + tier.lockingPeriodSec) / (3600 * 24)
    );

    return sale.registerDate ? (
      <p className="text-sm">
        It will lock your staked tokens for {tier.lockingPeriod} starting from
        the IDO start date
        {totalDays * 3600 * 24 > tier.lockingPeriodSec && (
          <> (in total ~{totalDays} days)</>
        )}
        .
      </p>
    ) : null;
  };

  const ButtonWithInfo = ({
    buttonLabel,
    showLock = true,
  }: {
    buttonLabel?: string;
    showLock?: boolean;
  }) => {
    return (
      <>
        <Button
          variant="main"
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            register();
          }}
        >
          {buttonLabel || "Register in IDO"}{" "}
          {isLoading && <FaCircleNotch size={20} className="inline fa-spin" />}
        </Button>
        {showLock && !tierState.isLocked && <LockPeriod />}
      </>
    );
  };

  // When whitelisted
  if (!weight && isWhitelisted) {
    if (tier.multiplier > 0) {
      return (
        <Wrapper>
          <p>
            You are whitelisted! But you also can register as{" "}
            <TierName name={tier.name} />.
          </p>

          <ButtonWithInfo />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <p>You are whitelisted!</p>
        </Wrapper>
      );
    }
  }

  // User has not registered, but has a high enough level
  if (!weight && tier.multiplier > 0) {
    if (sale.isVip && !tier.vip) {
      return (
        <Wrapper>
          {/*<p>*/}
          {/*  This IDO is private. You need the{" "}*/}
          {/*  <TierName name={tiers.black1.name} /> level.*/}
          {/*</p>*/}

          <Link href="/levels" passHref>
            <Button variant="main">Stake more</Button>
          </Link>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <p>
          Your level is <TierWithMultiplier tier={tier} />.
        </p>
        <ButtonWithInfo />
      </Wrapper>
    );
  }

  // User has "none" level
  if (!weight) {
    return (
      <Wrapper>
        <p>
          Your level <TierName name={tier.name} /> is too low to participate.
        </p>

        <Link href="/levels" passHref>
          <Button variant="main">Stake more</Button>
        </Link>
      </Wrapper>
    );
  }

  if (
    tier.multiplier > 0 &&
    (tier.multiplier > registeredTier.multiplier ||
      (!tier.random && registeredTier.random) ||
      (tier.random && registeredTier.random && tier.odds > registeredTier.odds))
  ) {
    return (
      <Wrapper>
        <p>
          You registered as <TierWithMultiplier tier={registeredTier} /> level,
          but your current <TierWithMultiplier tier={tier} /> is higher.
        </p>

        <ButtonWithInfo buttonLabel="Up your level" showLock={false} />
      </Wrapper>
    );
  }

  // User registered as a lottery level
  if (registeredTier.random) {
    return (
      <Wrapper>
        {isWinner ? (
          <>
            You've won a place in the lottery as{" "}
            <TierWithMultiplier tier={registeredTier} /> level!
          </>
        ) : (
          <>
            You've got a place in the lottery as{" "}
            <TierWithMultiplier tier={registeredTier} /> level. <br />
            <br />
            Winners will be picked before the IDO start.
          </>
        )}
      </Wrapper>
    );
  }

  if (isNFTSale(sale)) {
    return (
      <Wrapper>
        You&apos;ve got an allocation as{" "}
        <TierWithMultiplier tier={registeredTier} /> level. It's not guaranteed.
        This sale is FCFS.
      </Wrapper>
    );
  }

  // User registered as guaranteed level
  return (
    <Wrapper>
      You&apos;ve got a guaranteed allocation as{" "}
      <TierWithMultiplier tier={registeredTier} /> level.
    </Wrapper>
  );
}

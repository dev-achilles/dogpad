import { SaleStatus, useUser, useUserSaleTier } from "@trustpad/launchpad";
import React from "react";
import { PoolConfig } from "../../types";
import { SaleRegisterButton } from "../SaleRegisterButton";
import { KYCVerifyIDOButton } from "./KYCVerifyIDOButton";

export function KycOrRegisterButton({
  pool,
  center,
}: {
  pool: PoolConfig;
  center?: boolean;
}) {
  const { sale } = pool;
  const { kycStatus } = useUser();
  const {
    isWhitelisted,
    registeredTier,
    tierState: { tier },
    userState,
  } = useUserSaleTier();
  const hasGuaranteedLvl =
    (tier.multiplier > 0 && !tier.random) ||
    (registeredTier.multiplier > 0 && !registeredTier.random);

  if (sale.status === SaleStatus.static || sale.status === SaleStatus.init) {
    if (
      (hasGuaranteedLvl || userState.isWinner) &&
      pool.kyc &&
      kycStatus !== "valid"
    ) {
      return <KYCVerifyIDOButton center={center} />;
    }

    return null;
  }

  if (sale.status === SaleStatus.register) {
    if (!pool.kyc || tier.random || !isWhitelisted) {
      return <SaleRegisterButton center={center} />;
    }

    return (
      <KYCVerifyIDOButton center={center}>
        <SaleRegisterButton center={center} />
      </KYCVerifyIDOButton>
    );
  }

  return null;
}

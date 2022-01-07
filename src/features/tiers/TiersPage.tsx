import { useUser, useUserTier } from "@trustpad/launchpad";
import { DividerLine, StandardCard } from "~common/UI";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { LevelsCard } from "./components/LevelsCard";
import { MainCardTitle } from "./components/MainCardTitle";
import { ShortInfoOnStaking } from "./components/ShortInfoOnStaking";
import { StakeBlock } from "./components/StakeBlock";
import { UnstakeBlock } from "./components/UnstakeBlock";
import { UserLevelInfo } from "./components/UserLevelInfo";
import { useStakingV2 } from "@trustpad/launchpad/dist/staking/hooks/useStakingV2";

export function TiersPage() {
  const { refresh } = useUser();
  const {
    state,
    user,
    stakingContract,
    refresh: refreshStaking,
  } = useStakingV2();
  const {
    tierState: { tier: activeTier },
    refresh: refreshUserTier,
  } = useUserTier();

  if (!state) {
    return <div>Loading</div>;
  }

  const refreshAll = () => {
    refresh();
    refreshUserTier();
    refreshStaking();
  };

  return (
    <div className="-mt-3">
      <Row className="mb-3 space-y-6 md:space-y-0">
        <Col md={6}>
          <StandardCard className="space-y-6" cardClassName="bg-opacity-90">
            <MainCardTitle address={stakingContract?.options.address} />

            <ShortInfoOnStaking />

            {user && <UserLevelInfo activeTier={activeTier} />}

            <StakeBlock refreshAll={refreshAll} />

            <DividerLine />

            <UnstakeBlock refreshAll={refreshAll} />
          </StandardCard>
        </Col>
        <Col md={6} className="space-y-6">
          <LevelsCard activeTierId={activeTier?.id} />
        </Col>
      </Row>
    </div>
  );
}

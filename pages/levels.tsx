import { DefaultNavbar, Jumbo, Layout } from "~common/Layout";
import { LevelsFAQ } from "~features/faq/LevelsFAQ";
import { TiersPage } from "~features/tiers/TiersPage";
import React from "react";
import { Container } from "react-bootstrap";
import { StakingV2Provider } from "@trustpad/launchpad/dist/staking/hooks/useStakingV2";
import { useRegistryContractAddress } from "@trustpad/launchpad";
import { BLOK } from "~config/tokens";

export default function Staking() {
  const {
    addresses: [stakingAddress],
  } = useRegistryContractAddress("levelStaking");

  return (
    <Layout>
      <DefaultNavbar levels={false} />
      <Jumbo>
        <StakingV2Provider
          address={stakingAddress}
          rewardToken={BLOK}
          stakingToken={BLOK}
        >
          <TiersPage />
        </StakingV2Provider>
      </Jumbo>

      <section className="py-12">
        <Container>
          <LevelsFAQ />
        </Container>
      </section>
    </Layout>
  );
}

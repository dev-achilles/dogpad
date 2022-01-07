import React from "react";
import { DefaultNavbar, Jumbo, Layout } from "~common/Layout";
import { poolsConfigById } from "~features/pools";
import { ClaimPage } from "~features/pools/pages/ClaimPage";

export default function Claim({ id }: { id: string }) {
  const pool = poolsConfigById[id] || poolsConfigById[id.toLowerCase()];

  return (
    <Layout>
      <DefaultNavbar staking={false} />
      <Jumbo>
        <ClaimPage pool={pool} />
      </Jumbo>
    </Layout>
  );
}

Claim.ignoreDefaultChainSwitch = true;

export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}

export async function getStaticPaths() {
  const paths = Object.values(poolsConfigById)
    .filter(
      (pool) =>
        pool.distribution &&
        (Array.isArray(pool.distribution)
          ? pool.distribution
          : [pool.distribution]
        ).filter((d) => d.type === "claim_us").length > 0
    )
    .map((pool) => ({
      params: { id: pool.id },
    }));

  return { paths, fallback: false };
}

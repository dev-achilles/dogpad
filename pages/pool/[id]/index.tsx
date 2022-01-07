import { UserSaleTierProvider } from "@trustpad/launchpad";
import React from "react";
import { AppHead, DefaultNavbar, Jumbo, Layout } from "~common/Layout";
import { PoolProvider, poolsConfigById } from "~features/pools";
import { PoolDetailPage } from "~features/pools/components/PoolDetailPage";

export default function PoolDetails({ id }: { id: string }) {
  const pool = poolsConfigById[id] || poolsConfigById[id.toLowerCase()];

  return (
    <>
      <AppHead
        title={`${pool.token.name} sale on TrustPad, The Safest Multi-Chain IDO Launchpad`}
        image={pool?.images?.seo || undefined}
        url={`https://trustpad.io/pool/${pool.id}`}
      />
      <PoolProvider config={pool}>
        <UserSaleTierProvider>
          <Layout>
            <DefaultNavbar staking={false} />
            <Jumbo>
              <PoolDetailPage />
            </Jumbo>
          </Layout>
        </UserSaleTierProvider>
      </PoolProvider>
    </>
  );
}

export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}

export async function getStaticPaths() {
  const paths = Object.keys(poolsConfigById).map((id) => ({
    params: { id: id },
  }));

  return { paths, fallback: false };
}

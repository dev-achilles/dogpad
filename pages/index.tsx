import { DefaultNavbar, Layout } from "~common/Layout";
import { Hero } from "~features/landing/Hero";
import { PoolsList } from "~features/landing/PoolsList";
import React, { useEffect, useState } from "react";
import { ZERO_BN } from "~config/constants";
import { poolsConfigById } from "~config/poolsConfig";
import { PoolConfig } from "~features/pools/types";

const getTotalRaised = (pools: PoolConfig[]) => {
  return pools.reduce((acc, pool) => {
    const amount = pool.sale.raised.muln(pool.fundToken.price.usd);
    return acc.add(amount);
  }, ZERO_BN);
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("pools");
  const [pools, setPools] =
    useState<Record<string, PoolConfig>>(poolsConfigById);
  const updatePool = (pool) => {
    // When pool is loaded from contract, it might become "finished"
    setPools((oldPools) => {
      if (oldPools[pool.id].sale.status === pool.sale.status) {
        return oldPools;
      }
      return { ...pools, [pool.id]: pool };
    });
  };
  const totalRaised = getTotalRaised(Object.values(pools));

  function activateTab(tab: string) {
    setActiveTab(tab);
    location.hash = `#${tab}`;
  }

  useEffect(() => {
    if (process.browser) {
      const tab = window.location.hash.replace("#", "");
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, []);

  return (
    <Layout>
      <DefaultNavbar onNavClick={activateTab} staking={false} />
      <Hero />

      <PoolsList pools={Object.values(pools)} updatePool={updatePool} />
    </Layout>
  );
}

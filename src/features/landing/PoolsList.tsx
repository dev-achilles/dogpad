import { SaleStatus } from "@trustpad/launchpad";
import { isNFTPool } from "@trustpad/launchpad/dist/pool/utils";
import sortBy from "lodash/sortBy";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  PoolCard,
  PoolConfig,
  PoolProvider,
  UserSaleTierProvider,
} from "~features/pools";
import { PoolCardTeaser } from "~features/pools/components/PoolCardTeaser";
import { Chain } from "~types";
import { BigPoolCard } from "~features/pools/components/PoolCard/BigPoolCard";
import { useMediaQuery } from "react-responsive";

enum PoolsGroup {
  Upcoming = "upcoming",
  Ended = "ended",
  EndedNft = "ended-nft",
}

const getGroupedPools = (pools: PoolConfig[]) => {
  const ended = pools
    .filter((p) => [SaleStatus.finished].includes(p.sale.status as SaleStatus))
    .sort((a, b) => (a.sale.startDate > b.sale.startDate ? -1 : 1));
  const endedIds = ended.map((p) => p.id);
  const upcomingSorted = sortBy(
    pools.filter((p) => !endedIds.includes(p.id)),
    [
      (p) => (p.sale.startDate ? -1 : 1),
      (p) => (p.sale.startDate ? new Date(p.sale.startDate).getTime() : 0),
      (p) => p.id,
    ]
  );

  return {
    upcoming: upcomingSorted,
    ended: ended.filter((p) => !isNFTPool(p)),
    endedNft: ended.filter((p) => isNFTPool(p)),
  };
};

const GroupButton = ({ active, onClick, children }) => (
  <button
    className={`btn btn-main font-black text-xs transform transition font-poppins ${
      active
        ? "border-mainTheme"
        : "hover:bg-opacity-20 hover:bg-gray-800 hover:-translate-y-1 border-mainDark shadow-none"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export function PoolsList({
  pools,
  updatePool,
}: {
  pools: PoolConfig[];
  updatePool: (pool: PoolConfig) => void;
}) {
  const router = useRouter();
  const groups = getGroupedPools(Object.values(pools));
  const [activeGroup, setActiveGroup] = useState<PoolsGroup>(
    (router.query["g"] as PoolsGroup) ?? PoolsGroup.Upcoming
  );

  const urlGroup = router.query["g"] as PoolsGroup;
  useEffect(() => {
    if (
      Object.values(PoolsGroup).includes(urlGroup) &&
      urlGroup !== activeGroup
    ) {
      setActiveGroup(urlGroup as PoolsGroup);
    }
  }, [urlGroup]);

  const onClick = (group: PoolsGroup) => () => {
    setActiveGroup(group);
    router.replace({ query: { g: group } }, undefined, { scroll: false });
  };

  return (
    <section className="py-2 md:pt-24">
      <Container>
        <div className="p-8 bg-black bg-opacity-60 from-black-300 brand-shadow mb-6">
          <h1 className="font-black pb-6 text-center">
            Latest Projects On The BLOK
          </h1>
          <div className="flex items-center justify-center gap-6">
            <GroupButton
              active={activeGroup === PoolsGroup.Upcoming}
              onClick={onClick(PoolsGroup.Upcoming)}
            >
              UPCOMING
              {groups.upcoming.some((p) => p.sale.status === SaleStatus.open) &&
                "🔥"}{" "}
              [{groups.upcoming.length}]
            </GroupButton>
            <GroupButton
              active={activeGroup === PoolsGroup.Ended}
              onClick={onClick(PoolsGroup.Ended)}
            >
              ENDED [{groups.ended.length}]
            </GroupButton>
            <GroupButton
              active={activeGroup === PoolsGroup.EndedNft}
              onClick={onClick(PoolsGroup.EndedNft)}
            >
              ENDED NFT [{groups.endedNft.length}]
            </GroupButton>
          </div>
        </div>

        <Group
          pools={groups.upcoming.slice(1)}
          bigPool={groups.upcoming[0]}
          onPoolChange={updatePool}
          visible={activeGroup === PoolsGroup.Upcoming}
        />
        <Group
          pools={groups.ended}
          onPoolChange={updatePool}
          visible={activeGroup === PoolsGroup.Ended}
        />
        <Group
          pools={groups.endedNft}
          onPoolChange={updatePool}
          visible={activeGroup === PoolsGroup.EndedNft}
        />
      </Container>
    </section>
  );
}

const NoPools = (
  <p className="text-center text-white text-xl pt-12">
    No pools here at the moment.
  </p>
);

function Group({
  visible,
  bigPool,
  pools,
  teasers,
  onPoolChange,
}: {
  visible: boolean;
  pools: PoolConfig[];
  bigPool?: PoolConfig;
  teasers?: Chain[];
  onPoolChange: (pool) => void;
}) {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const renderPools = isMobile
    ? [...(bigPool ? [bigPool] : []), ...pools]
    : pools;

  if (!bigPool && !pools.length && !teasers?.length) {
    return (
      <section className={`mb-12 ${visible ? "" : "hidden"}`}>
        {NoPools}
      </section>
    );
  }

  return (
    <section className={`mb-12 ${visible ? "" : "hidden"}`}>
      {bigPool && !isMobile && (
        <div className="py-6">
          <PoolProvider config={bigPool} onChange={onPoolChange}>
            <UserSaleTierProvider
              doFetch={bigPool.sale.status !== SaleStatus.finished}
            >
              <BigPoolCard />
            </UserSaleTierProvider>
          </PoolProvider>
        </div>
      )}

      <Row>
        {renderPools.map((pool) => (
          <Col md={6} lg={4} key={pool.id} className="py-6">
            <PoolProvider config={pool} onChange={onPoolChange}>
              <UserSaleTierProvider
                doFetch={pool.sale.status !== SaleStatus.finished}
              >
                <PoolCard key={pool.id} />
              </UserSaleTierProvider>
            </PoolProvider>
          </Col>
        ))}

        {teasers?.map((teaser, idx) => (
          <Col md={6} lg={4} key={`${idx}-${teaser}`} className="py-6">
            <PoolCardTeaser network={teaser} />
          </Col>
        ))}
      </Row>
    </section>
  );
}

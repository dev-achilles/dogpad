import dayjs from "dayjs";
import {
  PoolProvider,
  usePool,
  useSaleTimeline,
  useUserPoolContribution,
} from "~features/pools";
import Link from "next/link";
import * as React from "react";
import { useMemo, useState } from "react";
import { Calendar, Event, EventWrapperProps, Views } from "react-big-calendar";
import { Button, Modal } from "react-bootstrap";
import { FaCoins, FaLock } from "react-icons/fa";
import { poolsConfig, poolsConfigById } from "../../config/poolsConfig";
import { DistributionTabs } from "../pools/components/Distribution";
import { Header } from "../pools/components/PoolSecondaryBlock/Header";
import { ListItem } from "../pools/components/PoolSecondaryBlock/InfoListItem";
import { PoolConfig } from "../pools/types";
import { dayjsLocalizer } from "./localizer";

const localizer = dayjsLocalizer();

type CustomEvent = Event & {
  id: string;
  poolId: string;
  type: "ido" | "distribution";
};

const eventsFromPools = () =>
  poolsConfig
    .filter((pool) => pool.sale.startDate)
    .map(
      (pool) =>
        ({
          id: `${pool.id}:ido`,
          poolId: pool.id,
          type: "ido",
          title: `${pool.token.name} IDO`,
          start: dayjs(pool.sale.startDate).toDate(),
          end: dayjs(pool.sale.startDate)
            .add(pool.sale.durationHours, "hour")
            .toDate(),
        } as CustomEvent)
    );

const distributionEvents = () =>
  poolsConfig.reduce((acc, pool) => {
    if (!pool.distribution) {
      return acc;
    }
    const schedules = (
      Array.isArray(pool.distribution) ? pool.distribution : [pool.distribution]
    ).map((d) => d.schedule);

    const dates = [];
    for (const schedule of schedules) {
      for (const datetime in schedule) {
        if (dates.includes(datetime)) {
          continue;
        }
        dates.push(datetime);

        const percent = schedule[datetime];
        const event = {
          id: `${pool.id}:${Math.random()}`,
          poolId: pool.id,
          type: "distribution",
          title: `${pool.token.name} distribution: ${percent}% on ${datetime}`,
          start: dayjs(datetime).toDate(),
          end: dayjs(datetime).add(10, "minutes").toDate(),
        } as CustomEvent;
        acc.push(event);
      }
    }

    return acc;
  }, []);

export function ScheduleCalendar() {
  const events = useMemo(() => {
    return [...eventsFromPools(), ...distributionEvents()];
  }, []);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent>();

  return (
    <>
      <Calendar<CustomEvent>
        style={{ minHeight: 900 }}
        views={[Views.MONTH]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(e) => setSelectedEvent(e)}
        components={{ eventWrapper: CustomEvent }}
      />

      {selectedEvent && (
        <PoolProvider config={poolsConfigById[selectedEvent.poolId]}>
          {selectedEvent.type === "ido" ? (
            <PoolInfoModal onClose={() => setSelectedEvent(undefined)} />
          ) : selectedEvent.type === "distribution" ? (
            <PoolDistributionModal
              onClose={() => setSelectedEvent(undefined)}
            />
          ) : null}
        </PoolProvider>
      )}
    </>
  );
}

// @ts-expect-error
function CustomEvent({ event, onSelect }: EventWrapperProps<CustomEvent>) {
  const pool = poolsConfigById[event.poolId];

  if (event.type === "distribution") {
    return (
      <button
        className="bg-mainDark p-1 flex items-center hover:bg-main cursor-pointer w-full rounded flex-wrap"
        onClick={() => onSelect(event)}
      >
        <img
          src={pool.token.imageSrc}
          className="inline-block h-8 rounded mr-2"
          alt={pool.token.name}
        />
        <FaCoins className="inline-block mr-1" />{" "}
        <span className="break-all hidden md:inline">{pool.token.symbol}</span>
      </button>
    );
  }

  return (
    <button
      className="bg-mainDark p-1 flex items-center hover:bg-main cursor-pointer w-full rounded flex-wrap"
      onClick={() => onSelect(event)}
    >
      <img
        src={pool.token.imageSrc}
        className="inline-block h-8 rounded mr-2"
        alt={pool.token.name}
      />
      {pool.sale.isVip && <FaLock className="inline-block mr-1" />}
      <span className="hidden md:inline">{pool.token.symbol} IDO</span>
    </button>
  );
}

function BaseModal({
  title,
  pool,
  onClose,
  children,
}: {
  title: string;
  pool: PoolConfig;
  onClose: VoidFunction;
  children: React.ReactNode;
}) {
  return (
    <Modal onHide={onClose} show>
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <Header
          token={pool.token}
          description={pool.description}
          social={pool.social}
        />

        {children}
      </Modal.Body>
      <Modal.Footer>
        <Link href={`/pool/${pool.id}`}>
          <Button variant="main">Pool page</Button>
        </Link>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function PoolDistributionModal({ onClose }: { onClose: VoidFunction }) {
  const { pool } = usePool();
  const { poolBalance } = useUserPoolContribution();

  return (
    <BaseModal title="IDO on TrustPad" pool={pool} onClose={onClose}>
      <DistributionTabs
        distribution={pool.distribution}
        token={pool.token}
        poolBalance={poolBalance}
      />
    </BaseModal>
  );
}

function PoolInfoModal({ onClose }: { onClose: VoidFunction }) {
  const { pool, isLoading } = usePool();
  const { start, end, registerStart, registerEnd, fcfsStart } =
    useSaleTimeline();

  return (
    <BaseModal title="IDO on TrustPad" pool={pool} onClose={onClose}>
      {isLoading ? null : (
        <ul>
          <ListItem label="Start">
            {start.format("D MMM, HH:mm a")} UTC
          </ListItem>
          {end && (
            <ListItem label="End">{end.format("D MMM, HH:mm a")} UTC</ListItem>
          )}

          {registerStart && (
            <>
              <ListItem label="Registration Start">
                {registerStart.format("D MMM, HH:mm a")} UTC
              </ListItem>
              <ListItem label="Registration End">
                {registerEnd.format("D MMM, HH:mm a")} UTC
              </ListItem>
            </>
          )}
          {fcfsStart && (
            <ListItem label="FCFS Opens">
              {fcfsStart.format("D MMM, HH:mm a")} UTC ({pool.sale.fcfsDuration}
              h before the end)
            </ListItem>
          )}
        </ul>
      )}
    </BaseModal>
  );
}

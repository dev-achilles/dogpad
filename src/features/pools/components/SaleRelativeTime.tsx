import { usePoolSale } from "@trustpad/launchpad";
import dayjs from "dayjs";
import { useSaleTimeline } from "~features/pools";
import * as React from "react";
import { useEffect, useState } from "react";
import { getTimeDiff, getTimeDiffString } from "~utils";

export function SaleRelativeTime({
  shorterIfBig = true,
  isSoldOut,
}: {
  shorterIfBig?: boolean;
  isSoldOut: boolean;
}) {
  const [sale] = usePoolSale();
  const { start, end, registerStart, registerEnd, fcfsStart } =
    useSaleTimeline();
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    if (!start) return;

    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, [start]);

  if (!start) {
    return <span>TBA</span>;
  }

  const untilRegister = registerStart && getTimeDiff(now, registerStart);
  const untilRegisterEnd = registerEnd && getTimeDiff(now, registerEnd);
  const untilStart = getTimeDiff(now, start);
  const untilEnd = end && getTimeDiff(now, end);
  const untilFCFS = fcfsStart && getTimeDiff(now, fcfsStart);
  const sinceEnd = getTimeDiff(end, now);

  if (untilRegister?.asSeconds() > 0) {
    return (
      <span className="break-words">
        registration opens in{" "}
        {getTimeDiffString(untilRegister, { smallerIfBig: shorterIfBig })}
      </span>
    );
  }
  if (untilRegisterEnd?.asSeconds() > 0) {
    if (sale.reachedMinBaseAllocation) {
      return (
        <span className="break-words">
          min base allocation reached, registration closed
        </span>
      );
    }
    return (
      <span className="break-words">
        registration closes in{" "}
        {getTimeDiffString(untilRegisterEnd, { smallerIfBig: shorterIfBig })}
      </span>
    );
  }
  if (untilStart.asSeconds() > 0) {
    return (
      <span>
        opens in {getTimeDiffString(untilStart, { smallerIfBig: shorterIfBig })}
      </span>
    );
  }
  if (untilEnd?.asSeconds() > 0) {
    if (isSoldOut) {
      return <span>closed, sold out</span>;
    }

    if (untilFCFS?.asSeconds() > 0) {
      return (
        <span>
          FCFS opens in{" "}
          {getTimeDiffString(untilFCFS, { smallerIfBig: shorterIfBig })}
        </span>
      );
    }

    return (
      <span>
        {untilFCFS ? "FCFS closes" : "closes"} in{" "}
        {getTimeDiffString(untilEnd, { smallerIfBig: shorterIfBig })}
      </span>
    );
  }

  return (
    <span>
      finished {getTimeDiffString(sinceEnd, { smallerIfBig: shorterIfBig })} ago
    </span>
  );
}

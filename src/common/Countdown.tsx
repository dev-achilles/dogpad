import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { getTimeDiff, getTimeDiffString } from "~utils";

export function Countdown({
  date,
  endText = "complete",
  shorterIfBig = true,
}: {
  date: string | number;
  endText?: string;
  shorterIfBig?: boolean;
}) {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    if (!date) {
      return;
    }
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, [date]);

  const untilEnd = getTimeDiff(
    now,
    typeof date === "number" ? dayjs.unix(date) : dayjs(date)
  );

  return untilEnd.asSeconds() > 0 ? (
    <span>{getTimeDiffString(untilEnd, { smallerIfBig: shorterIfBig })}</span>
  ) : (
    <span>{endText}</span>
  );
}

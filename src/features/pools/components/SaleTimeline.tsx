import * as React from "react";
import { FaCalendar } from "react-icons/fa";
import { InfoPoint } from "src/features/pools/components/InfoPoint";
import { useSaleTimeline } from "src/features/pools/index";

export function SaleTimeline({
  showRegistration,
}: {
  showRegistration: boolean;
}) {
  const { start, end, registerStart, registerEnd, fcfsStart } =
    useSaleTimeline();
  const format = "D MMM, HH:mm";

  return (
    <>
      {registerStart && showRegistration && (
        <InfoPoint>
          <FaCalendar />
          <div>
            Registration {registerStart.format(format)} –{" "}
            {registerEnd.format(format)} UTC
          </div>
        </InfoPoint>
      )}

      <InfoPoint>
        <FaCalendar />
        {start ? (
          <div>
            Sale {start.format(format)} – {end ? end.format(format) : "TBA"} UTC
          </div>
        ) : (
          <div>TBA</div>
        )}
      </InfoPoint>

      {fcfsStart && (
        <InfoPoint>
          <FaCalendar />
          <div>FCFS {fcfsStart.format(format)} UTC</div>
        </InfoPoint>
      )}
    </>
  );
}

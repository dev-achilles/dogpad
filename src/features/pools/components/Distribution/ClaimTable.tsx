import BN from "bn.js";
import dayjs from "dayjs";
import * as React from "react";
import { Button } from "react-bootstrap";
import { FaCircleNotch } from "react-icons/fa";
import { ZERO_BN } from "../../../../config/constants";
import { DEFAULT_FORMAT, fNum } from "../../../../utils";
import { Distribution, PoolToken } from "../../types";

export function ClaimTable({
  token,
  total,
  distribution,
}: {
  token: PoolToken;
  total: BN;
  distribution: Distribution;
}) {
  const { type, schedule } = distribution;
  const totalClaimed = Object.keys(schedule || {}).reduce((acc, date) => {
    const percent = schedule[date];
    const amount = total.muln(percent).divn(100);
    const isClaimable = dayjs(date).utc().unix() < dayjs().unix();
    return isClaimable ? acc.add(amount) : acc;
  }, ZERO_BN);

  const isAirdrop = type === "airdrop_us" || type === "airdrop_them";

  if (!Object.keys(schedule || {}).length) {
    return null;
  }

  return (
    <table className="table table-striped table-sm font-light">
      <caption className="text-white opacity-50 text-sm">
        Released: {fNum(totalClaimed)} {token.symbol} / {fNum(total)}{" "}
        {token.symbol}
      </caption>
      <thead>
        <tr>
          <th>Percent</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(schedule).map((date) => {
          const percent = schedule[date];
          const dateJs = dayjs(date).utc();
          const amount = total.muln(percent).divn(100);
          const isClaimable = dayjs().unix() >= dateJs.unix();
          const isInProgress =
            type === "airdrop_them" &&
            dayjs().unix() > dateJs.unix() &&
            dateJs.unix() < dayjs().unix() + 10 * 60;

          return (
            <tr key={date}>
              <td>{percent}%</td>
              <td>
                {dateJs.isValid()
                  ? `${dateJs.format(DEFAULT_FORMAT)} UTC`
                  : date.trim()
                  ? date
                  : "TBC"}
              </td>
              <td className="text-purple font-normal">
                {fNum(amount)} {token.symbol}
              </td>
              <td>
                {isClaimable ? (
                  <div>
                    {distribution.type === "claim_them" ? (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        href={distribution.claimUrl}
                      >
                        Claim
                      </Button>
                    ) : isAirdrop ? (
                      "Airdropped"
                    ) : (
                      "Claimable"
                    )}
                  </div>
                ) : isAirdrop ? (
                  <div>Not airdropped</div>
                ) : (
                  <div>Not claimable</div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

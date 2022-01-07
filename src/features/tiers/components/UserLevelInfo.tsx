import { Countdown } from "~common/Countdown";
import dayjs from "dayjs";
import { Tier } from "~features/tiers/types";
import * as React from "react";
import { fNum } from "~utils";
import { useStakingV2 } from "@trustpad/launchpad/dist/staking/hooks/useStakingV2";
import BN from "bn.js";
import { TMain } from "~common/UI";

const lockPeriodToDays = (v: number) => v / (3600 * 24);
const toHumanFee = (v: BN) => (v ? v.toNumber() / 10 : 0);

export function UserLevelInfo({ activeTier }: { activeTier: Tier }) {
  const { state, user } = useStakingV2();

  return (
    <div className="space-y-3">
      {!activeTier && <div>You are currently NOT eligible for any tiers!</div>}

      {state.halted && <p>Staking is disabled now.</p>}

      <div>
        <b>Level</b>:{" "}
        <span className="font-Poppins tracking-wide uppercase">
          {activeTier?.name || "none"}
        </span>
      </div>

      <div className="flex items-start">
        <div className="mr-1">
          <b>Staked</b>:
        </div>

        <TMain>{fNum(user.amount, 0)} BLOK</TMain>
      </div>

      {user.unlocksAt && user.unlocksAt > Date.now() / 1000 ? (
        <div className="space-y-2">
          <div>
            You registered for an IDO and now your tokens are locked for{" "}
            {lockPeriodToDays(state.lockPeriod)} days. You still can register
            for other IDOs.
          </div>
          <div>
            Withdrawing now will apply the{" "}
            <TMain className="font-bold">
              fee of {toHumanFee(state.fees.withdrawFee)}%
            </TMain>
            .
          </div>
          <div>
            <b>Unlocks</b>: in{" "}
            <Countdown date={user.unlocksAt} endText={"unlocked"} /> (
            {dayjs.unix(user.unlocksAt).format("D MMM, HH:mm")})
          </div>
        </div>
      ) : (
        <div>Your tokens are unlocked</div>
      )}
    </div>
  );
}

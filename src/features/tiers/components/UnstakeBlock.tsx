import { useUser, useWithdrawAction } from "@trustpad/launchpad";
import { CustomInput } from "~common/CustomInput";
import { ActionButton } from "~common/forms";
import { MaxButton, TMain } from "~common/UI";
import * as React from "react";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { fNum, toEth, toWeiBN } from "~utils";
import { useStakingV2 } from "@trustpad/launchpad/dist/staking/hooks/useStakingV2";
import { BLOK } from "~config/tokens";

const isLocked = (time) => time > Date.now() / 1000;

export function UnstakeBlock({ refreshAll }: { refreshAll: VoidFunction }) {
  const { stakingContract, state, user } = useStakingV2();

  const { account } = useUser();
  const { withdraw, isLoading: isWithdrawing } = useWithdrawAction({
    contract: stakingContract,
    decimals: BLOK.decimals,
    refresh: () => {},
  });

  const [value, setValue] = useState("");
  const [locked, setLocked] = useState(() => isLocked(user.unlocksAt));

  useEffect(() => {
    if (!user?.unlocksAt) return;
    setLocked(isLocked(user.unlocksAt));

    if (!locked) return;
    const id = setTimeout(
      () => setLocked(isLocked(user.unlocksAt)),
      Math.abs(user.unlocksAt - Date.now() / 1000)
    );
    return () => clearInterval(id);
  }, [locked, user.unlocksAt]);

  return (
    <div className="space-y-3">
      {state.fees.withdrawFee && state.fees.withdrawFee.gtn(0) && locked && (
        <div>
          If you withdraw now, you will lose{" "}
          <TMain>
            {state.fees.withdrawFee.divn(10).toNumber()}% of your BLOK
          </TMain>{" "}
          deposit!
        </div>
      )}

      <div className="max-w-sm mx-auto">
        <CustomInput
          name="unstakeValue"
          value={value}
          onChange={setValue}
          topLabel={`Staked: ${fNum(user.amount, 8)} BLOK`}
          button={
            <MaxButton
              label="Max"
              onClick={() => setValue(toEth(user.amount))}
            />
          }
          icon={<span className="opacity-70">BLOK</span>}
        />
      </div>

      <div className="flex items-center space-x-6 justify-center">
        <ActionButton
          isLoading={isWithdrawing}
          isDisabled={
            (locked && !state.allowEarlyWithdrawal) ||
            isWithdrawing ||
            !value ||
            !account ||
            toWeiBN(value).gt(user.amount)
          }
          onClick={() => withdraw(value).then(refreshAll)}
        >
          Unstake {locked && <FaLock className="inline" />}
        </ActionButton>
      </div>
    </div>
  );
}

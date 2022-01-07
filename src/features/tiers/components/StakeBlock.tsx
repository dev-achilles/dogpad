import {
  useApproval,
  useDepositAction,
  useMainToken,
  useUser,
} from "@trustpad/launchpad";
import { CustomInput } from "~common/CustomInput";
import { ActionButton } from "~common/forms";
import { MaxButton } from "~common/UI";
import { APPROVE_VALUE, ZERO_BN } from "~config/constants";
import * as React from "react";
import { useState } from "react";
import { fNum, toEth, toWeiBN } from "~utils";
import { useStakingV2 } from "@trustpad/launchpad/dist/staking/hooks/useStakingV2";
import { BLOK } from "~config/tokens";

export function StakeBlock({ refreshAll }: { refreshAll: VoidFunction }) {
  const {
    stakingContract,
    state: { halted },
  } = useStakingV2();

  const tokenContract = useMainToken();
  const { account, tokens } = useUser();
  const [value, setValue] = useState("");

  const {
    isApproved,
    isLoading: isApproving,
    approveSpending,
  } = useApproval({
    tokenContract,
    spenderAddress: stakingContract?.options.address,
    amount: ZERO_BN,
  });
  const { deposit, isLoading: isDepositing } = useDepositAction({
    contract: stakingContract,
    decimals: BLOK.decimals,
    refresh: refreshAll,
    messages: {
      success: (
        <p>
          Successfully deposited! <br />
          <br />
          Don't forget to <b>register for upcoming IDOs</b>, you can do that{" "}
          <b>by clicking "Register" on a pool page</b>, when registration period
          opens.
        </p>
      ),
      error: "Deposit failed",
    },
  });

  if (halted) {
    return <div className="text-xl">Staking is currently disabled.</div>;
  }

  const isBtnDisabled =
    halted || isDepositing || !value || toWeiBN(value).gt(tokens);
  const isApproveDisabled = halted || isApproving || !account;

  return (
    <div className="space-y-3">
      <div className="max-w-sm mx-auto">
        <CustomInput
          name="value"
          value={value}
          onChange={setValue}
          topLabel={`Balance: ${fNum(tokens)} BLOK`}
          button={
            <MaxButton label="Max" onClick={() => setValue(toEth(tokens))} />
          }
          icon={<span className="opacity-70">BLOK</span>}
        />
      </div>

      <div className="flex items-center space-x-6 justify-center">
        {isApproved ? (
          <ActionButton
            isLoading={isDepositing}
            isDisabled={isBtnDisabled}
            onClick={() => deposit(value).then(refreshAll)}
          >
            Stake {halted && "locked"}
          </ActionButton>
        ) : (
          <ActionButton
            isLoading={isApproving}
            isDisabled={isApproveDisabled}
            onClick={() => approveSpending(APPROVE_VALUE)}
          >
            Approve
          </ActionButton>
        )}
      </div>
    </div>
  );
}

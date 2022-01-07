import { useUser } from "@trustpad/launchpad";
import { useBuyForm, useCurrencyApproval } from "@trustpad/launchpad/dist/pool";
import { BuySuccessMessage } from "@trustpad/launchpad/dist/pool/hooks/useBuyForm/useBuyForm";
import { TransactionErrorMessage } from "@trustpad/launchpad/dist/types";
import BN from "bn.js";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsArrowDown } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { toast } from "react-toastify";
import { ZERO_BN } from "~config/constants";
import { usePool } from "~features/pools";
import { ApproveButton } from "~features/pools/components/BuyTokensForm/ApproveButton";
import { fNum, toEth, toEthN, toFixedNumber, toWei } from "~utils";
import { SaleStatus } from "../../types";
import { ComplexInput } from "./ComplexInput";
import { InputTokenInfo } from "./InputTokenInfo";
import { MaxButton } from "./MaxButton";
import { ValidationError } from "./ValidationError";

export function BuyTokensForm() {
  const {
    isLoading,
    isDisabled,
    isSoldOut,
    validationErrors,
    userWhitelisted,
    currencyValue,
    tokenValue,
    onCurrencyValueChange,
    onTokenValueChange,
    buyTokens,
    getMaxAvailableTokens,
    getMaxAvailableCurrency,
    setMaxTokens,
    userCurrencyBalance,
    userContribution,
    userPoolBalance,
    isUserReachedLimit,
    tierAllowsToBuy,
  } = useBuyForm();
  const { isApprovalRequired, isApproved } = useCurrencyApproval();

  const { pool } = usePool();
  const { sale, token, fundToken } = pool;

  const user = useUser();

  const { status } = sale;
  const minValue = sale.limits?.min || new BN("0");
  const maxValue = sale.limits?.max || new BN("0");
  const isPresaleRunning = status === SaleStatus.open;

  const ButtonText = ({ progressLabel, isLoading, children }) =>
    isLoading ? (
      <>
        <FaCircleNotch size={20} className="inline fa-spin" />
        <span className="ml-2">{progressLabel}</span>
      </>
    ) : status === SaleStatus.init || status === SaleStatus.register ? (
      <>Not open yet</>
    ) : status === SaleStatus.finished ? (
      <>Presale is closed</>
    ) : !userWhitelisted && !tierAllowsToBuy && !sale.isPublic ? (
      <>Cannot buy</>
    ) : isSoldOut ? (
      <>Sold out!</>
    ) : (
      children
    );

  return (
    <div className="space-y-3 py-2">
      {userPoolBalance.gt(ZERO_BN) && (
        <div>
          <span className="text-gray-400">Purchased:</span>{" "}
          {sale.wholeTokens
            ? Math.round(toEthN(userPoolBalance))
            : fNum(userPoolBalance)}{" "}
          {token.symbol} (${fNum(userContribution)})
        </div>
      )}
      <div className="flex flex-col items-center space-y-2">
        <ComplexInput
          name="currencyValue"
          value={currencyValue}
          disabled={isLoading}
          onChange={onCurrencyValueChange}
          icon={
            <InputTokenInfo
              imageSrc={fundToken.imageSrc}
              symbol={fundToken.symbol}
            />
          }
          topLabel={`From`}
          topRight={[
            minValue.gtn(0) && `Min. ${toEth(sale.limits?.min, 4)}`,
            maxValue.gtn(0) && `Max. ${toEth(getMaxAvailableCurrency(), 4)}`,
            `Balance: ${fNum(userCurrencyBalance)}`,
          ]
            .filter(Boolean)
            .join(" ")}
          className="w-full"
          hasError={validationErrors.currencyError && isPresaleRunning}
          placeholder={toEth(minValue)}
        />

        <div className="">
          <BsArrowDown className="text-main" size="1em" />
        </div>

        <ComplexInput
          name="tokensValue"
          value={tokenValue}
          disabled={isLoading}
          onChange={onTokenValueChange}
          icon={
            <InputTokenInfo imageSrc={token.imageSrc} symbol={token.symbol} />
          }
          topLabel={`To`}
          topRight={user.account && `Max. ${fNum(getMaxAvailableTokens())}`}
          className="w-full"
          placeholder={"0"}
          button={
            sale.wholeTokens ? null : <MaxButton onClick={setMaxTokens} />
          }
        />
      </div>

      {isPresaleRunning && <ValidationError {...validationErrors} />}

      <div className="text-center">
        {isApprovalRequired && !isApproved ? (
          <ApproveButton symbol={fundToken.symbol} />
        ) : (
          <Button
            variant={isDisabled ? "secondary" : "primary"}
            disabled={isDisabled}
            onClick={() =>
              buyTokens().then((message) => {
                if ("error" in message) {
                  toast.error(`Failed to buy: ${message.error}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                } else {
                  toast.success(
                    `Success! You purchased ${message.amount} ${pool.token.symbol}`,
                    {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    }
                  );
                }
              })
            }
          >
            <ButtonText progressLabel="Buying" isLoading={isLoading}>
              Buy {toFixedNumber(tokenValue || 0, 8)} ${token.symbol}
            </ButtonText>
          </Button>
        )}
      </div>
    </div>
  );
}
